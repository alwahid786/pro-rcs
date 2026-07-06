"use client";

import { use, useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Satisfy, Caveat, Marck_Script } from "next/font/google";
import Modal from "@/components/Modal";
import { formatPhoneNumber } from "@/lib/utils/phoneFormatter";

// Load calligraphy Google Fonts
const satisfy = Satisfy({ weight: "400", subsets: ["latin"], display: "swap" });
const caveat = Caveat({ weight: "400", subsets: ["latin"], display: "swap" });
const marckScript = Marck_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface FddMetadata {
  id: string;
  title: string;
  version: string;
  restaurantName?: string;
  fileSize: number;
  downloadUrl: string;
  uploadedAt: string;
}

export default function SignaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // States
  const [fdd, setFdd] = useState<FddMetadata | null>(null);
  const [loadingFdd, setLoadingFdd] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal alert states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"warning" | "success" | "error">(
    "warning",
  );

  const triggerModal = (
    title: string,
    message: string,
    type: "warning" | "success" | "error" = "warning",
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalOpen(true);
  };

  // Form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signedRecord, setSignedRecord] = useState<{ _id: string } | null>(
    null,
  );

  // Signature customization
  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [signaturePng, setSignaturePng] = useState<string>("");
  const [sigWidth, setSigWidth] = useState(150);
  const [activeTool, setActiveTool] = useState<"signature" | "text" | "date">("signature");

  // Custom Text Input Modal
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [textModalInput, setTextModalInput] = useState("");
  const [textModalTarget, setTextModalTarget] = useState<{
    x: number;
    y: number;
    page: number;
    canvasWidth: number;
    canvasHeight: number;
  } | string | null>(null);

  // PDF Viewer
  const [pdfDoc, setPdfDoc] = useState<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<import("pdfjs-dist").RenderTask | null>(null);

  // Signature placement
  const [placedSignatures, setPlacedSignatures] = useState<
    Array<{
      id: string;
      x: number;
      y: number;
      page: number;
      canvasWidth: number;
      canvasHeight: number;
      isLocked: boolean;
      type: "signature" | "text" | "date";
      textValue: string;
    }>
  >([]);

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const dragStartMousePos = useRef({ x: 0, y: 0 });
  const dragStartSigPos = useRef({ x: 0, y: 0 });
  const draggedSigId = useRef<string | null>(null);

  const activeSig = placedSignatures.find((s) => !s.isLocked);

  const handleMouseDown = (e: React.MouseEvent, sigId: string) => {
    const sig = placedSignatures.find((s) => s.id === sigId);
    if (!sig || sig.isLocked) return;
    e.stopPropagation(); // Stop click handler from firing on the canvas overlay
    setIsDragging(true);
    draggedSigId.current = sigId;
    dragStartMousePos.current = { x: e.clientX, y: e.clientY };
    dragStartSigPos.current = { x: sig.x, y: sig.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedSigId.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const deltaX = e.clientX - dragStartMousePos.current.x;
    const deltaY = e.clientY - dragStartMousePos.current.y;

    let newX = dragStartSigPos.current.x + deltaX;
    let newY = dragStartSigPos.current.y + deltaY;

    // Clamp coordinates inside the canvas dimensions
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    setPlacedSignatures((prev) =>
      prev.map((s) =>
        s.id === draggedSigId.current
          ? {
              ...s,
              x: newX,
              y: newY,
              canvasWidth: rect.width,
              canvasHeight: rect.height,
            }
          : s,
      ),
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    draggedSigId.current = null;
  };

  // Style definitions
  const styles = useMemo(() => [
    { name: "Elegant Cursive", font: "Satisfy", className: satisfy.className },
    { name: "Casual Handwriting", font: "Caveat", className: caveat.className },
    {
      name: "Artistic Script",
      font: "Marck Script",
      className: marckScript.className,
    },
  ], []);

  // Fetch FDD Metadata
  useEffect(() => {
    const fetchFdd = async () => {
      try {
        const res = await fetch(`/api/fdd/metadata/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFdd(data);
        } else {
          setError("Franchise Disclosure Document not found.");
        }
      } catch {
        setError("An unexpected error occurred while loading FDD details.");
      } finally {
        setLoadingFdd(false);
      }
    };
    fetchFdd();
  }, [id]);

  // Generate transparent PNG signature based on font style and typed name
  useEffect(() => {
    let active = true;
    const currentStyle = styles[selectedStyleIndex];

    const generate = async () => {
      if (!fullName) {
        setSignaturePng((prev) => (prev ? "" : prev));
        return;
      }
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure web font is loaded in browser memory
        await document.fonts.load(`72px "${currentStyle.font}"`);
        if (!active) return;

        // Measure text first to scale canvas width dynamically
        ctx.font = `italic 60px "${currentStyle.font}", cursive`;
        const textMetrics = ctx.measureText(fullName);
        const textWidth = Math.max(textMetrics.width + 80, 400); // add padding, minimum 400

        canvas.width = textWidth;
        canvas.height = 160;

        // Re-apply style after resizing canvas
        ctx.font = `italic 60px "${currentStyle.font}", cursive`;
        ctx.clearRect(0, 0, textWidth, 160);
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(fullName, textWidth / 2, 80);

        setSignaturePng(canvas.toDataURL("image/png"));
        setSigWidth(Math.round(textWidth / 4));
      } catch (err) {
        console.error("Font load or signature generation error:", err);
      }
    };

    // Run asynchronously to avoid synchronous setState inside render effect warning
    const timer = setTimeout(() => {
      generate();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [fullName, selectedStyleIndex, styles]);

  // Initialize PDF.js and Load PDF file
  useEffect(() => {
    if (!fdd) return;
    const loadPdfFile = async () => {
      setLoadingPdf(true);
      try {
        const pdfjs = await import("pdfjs-dist");
        // Use CDN unpkg fallback for worker to avoid route bundling errors
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument({ url: fdd.downloadUrl });
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        // Automatically scroll / load the last page where signatures usually go
        setCurrentPage(pdf.numPages);
      } catch (err) {
        console.error("Error loading PDF inline:", err);
      } finally {
        setLoadingPdf(false);
      }
    };
    loadPdfFile();
  }, [fdd]);

  // Render current PDF page on canvas
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc) return;

      // Cancel previous render task if any
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Standard screen size scale
        const viewport = page.getViewport({ scale: 1.3 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };
        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err) {
        const error = err as { name?: string };
        if (error?.name === "RenderingCancelledException") {
          // Normal cancellation, do not log
          return;
        }
        console.error("Page rendering error:", err);
      }
    },
    [pdfDoc],
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, currentPage, renderPage]);

  // Handle click on PDF to position element block
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    // Get local click coordinates within canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "signature") {
      if (!signaturePng) {
        triggerModal(
          "Signature Block Unprepared",
          "Please enter your First Name and Last Name to generate your signature style before placing it on the document.",
          "warning",
        );
        return;
      }

      const newSig = {
        id: Math.random().toString(36).substring(2, 9),
        x,
        y,
        page: currentPage,
        canvasWidth: rect.width,
        canvasHeight: rect.height,
        isLocked: false,
        type: "signature" as const,
        textValue: "",
      };

      // Auto lock all other elements to focus on the new one
      setPlacedSignatures((prev) =>
        prev.map((s) => ({ ...s, isLocked: true })).concat(newSig),
      );
    } else if (activeTool === "date") {
      const d = new Date();
      const dateVal = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;

      const newSig = {
        id: Math.random().toString(36).substring(2, 9),
        x,
        y,
        page: currentPage,
        canvasWidth: rect.width,
        canvasHeight: rect.height,
        isLocked: false,
        type: "date" as const,
        textValue: dateVal,
      };

      setPlacedSignatures((prev) =>
        prev.map((s) => ({ ...s, isLocked: true })).concat(newSig),
      );
    } else if (activeTool === "text") {
      // Fetch default value from localStorage
      let lastText = "";
      if (typeof window !== "undefined") {
        lastText = localStorage.getItem("fdd_last_custom_text") || "";
      }

      setTextModalInput(lastText);
      setTextModalTarget({
        x,
        y,
        page: currentPage,
        canvasWidth: rect.width,
        canvasHeight: rect.height,
      });
      setTextModalOpen(true);
    }
  };

  // Confirm and save text modal input
  const handleTextModalConfirm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textModalInput.trim()) {
      triggerModal(
        "Empty Text",
        "Please enter some text before confirming.",
        "warning",
      );
      return;
    }

    // Store in local storage for convenience
    if (typeof window !== "undefined") {
      localStorage.setItem("fdd_last_custom_text", textModalInput.trim());
    }

    if (typeof textModalTarget === "string") {
      // Edit existing placement text
      setPlacedSignatures((prev) =>
        prev.map((s) =>
          s.id === textModalTarget
            ? { ...s, textValue: textModalInput.trim(), isLocked: true }
            : s,
        ),
      );
    } else if (textModalTarget) {
      // Place a new custom text element
      const newSig = {
        id: Math.random().toString(36).substring(2, 9),
        x: textModalTarget.x,
        y: textModalTarget.y,
        page: textModalTarget.page,
        canvasWidth: textModalTarget.canvasWidth,
        canvasHeight: textModalTarget.canvasHeight,
        isLocked: false,
        type: "text" as const,
        textValue: textModalInput.trim(),
      };

      setPlacedSignatures((prev) =>
        prev.map((s) => ({ ...s, isLocked: true })).concat(newSig),
      );
    }

    setTextModalOpen(false);
    setTextModalTarget(null);
    setTextModalInput("");
  };

  // Submit dynamic signature values
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fdd || !signaturePng || placedSignatures.length === 0 || activeSig) {
      triggerModal(
        "Signature Placement Required",
        "Please configure details, place your signature(s) on the document, and lock their position.",
        "warning",
      );
      return;
    }
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !location.trim()
    ) {
      triggerModal(
        "Missing Fields",
        "Please fill in all required signee details.",
        "warning",
      );
      return;
    }
    if (!accepted) {
      triggerModal(
        "Consent Required",
        "You must check the E-SIGN regulations acknowledgment checkbox to submit.",
        "warning",
      );
      return;
    }

    setSigning(true);
    const formData = new FormData();
    formData.append("fddId", fdd.id);
    formData.append("documentVersion", fdd.version);
    formData.append("originalPdfPath", fdd.downloadUrl);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", phone);
    formData.append("country", fdd.restaurantName || "USA");
    formData.append("state", fdd.restaurantName || "");
    formData.append("location", location);

    // Stamping Details: Send signatures array with tool types
    formData.append("signatureImage", signaturePng);
    formData.append("jobTitle", "");
    formData.append(
      "signatures",
      JSON.stringify(
        placedSignatures.map((s) => ({
          page: s.page,
          x: s.x,
          y: s.y,
          canvasWidth: s.canvasWidth,
          canvasHeight: s.canvasHeight,
          type: s.type,
          textValue: s.textValue,
        })),
      ),
    );

    // Keep single signature fallbacks for old database compatibility
    const firstSig = placedSignatures[0];
    formData.append("sigPage", String(firstSig.page));
    formData.append("sigX", String(firstSig.x));
    formData.append("sigY", String(firstSig.y));
    formData.append("canvasWidth", String(firstSig.canvasWidth));
    formData.append("canvasHeight", String(firstSig.canvasHeight));

    try {
      const res = await fetch("/api/fdd/sign", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setSignedRecord(data);
      } else {
        const err = await res.json();
        triggerModal(
          "E-Signature Error",
          err.error || "Failed to finalize digital signature.",
          "error",
        );
      }
    } catch {
      triggerModal(
        "Network Connection Error",
        "An error occurred while submitting the signed document.",
        "error",
      );
    } finally {
      setSigning(false);
    }
  };

  if (loadingFdd) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-subtle">
        <span className="animate-pulse text-sm text-text-secondary">
          Loading FDD details...
        </span>
      </div>
    );
  }

  if (error || !fdd) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-subtle space-y-4">
        <div className="text-red-500 font-semibold">
          {error || "Document not found."}
        </div>
        <Link
          href="/fdd"
          className="px-6 py-2 bg-secondary text-white font-semibold rounded-xl text-sm"
        >
          Return to FDD Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-subtle py-12 px-4 sm:px-6 md:px-8 flex flex-col items-center">
      {/* Dynamic gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/fdd"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-secondary transition-all"
          >
            ← Back to Listing
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Sign Franchise Disclosure Document
          </h1>
          <p className="text-sm text-text-secondary max-w-xl mx-auto">
            {fdd.title} (Version {fdd.version})
          </p>
        </div>

        {signedRecord ? (
          /* Success Portal */
          <div className="glass shadow-glass rounded-3xl p-8 border border-white/60 bg-white/60 backdrop-blur-md text-center space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-secondary">
                Acknowledgment Submitted Successfully
              </h2>
              <p className="text-sm text-text-secondary">
                Thank you, {firstName}. Your digital signature has been
                permanently embedded onto the PDF document.
              </p>
            </div>

            <div className="p-4 bg-white/40 border border-border/40 rounded-2xl text-xs space-y-1 max-w-md mx-auto text-left">
              <p className="text-text">
                <span className="font-semibold">Signee:</span> {firstName}{" "}
                {lastName}
              </p>
              <p className="text-text">
                <span className="font-semibold">Email:</span> {email}
              </p>
              <p className="text-text">
                <span className="font-semibold">Document:</span> {fdd.title} (
                {fdd.version})
              </p>
              <p className="text-text">
                <span className="font-semibold">Location Interest:</span>{" "}
                {location}
              </p>
              <p className="text-text">
                <span className="font-semibold">Verified Date:</span>{" "}
                {new Date().toLocaleString()}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/api/fdd/download/signed/${signedRecord._id}`}
                className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl shadow-md transition-all hover:bg-secondary/90 text-sm cursor-pointer"
                download
              >
                Download Signed Copy
              </a>
              <Link
                href="/fdd"
                className="px-6 py-3 border border-border text-text-secondary hover:text-secondary font-semibold rounded-xl text-sm transition-all text-center"
              >
                Return to FDD Listing
              </Link>
            </div>
          </div>
        ) : (
          /* Main Form and PDF Viewer Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: E-sign Form & Stylist (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md space-y-5">
                <h3 className="text-lg font-bold text-secondary">
                  Legal Signee Information
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      maxLength={17}
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                    />
                  </div>



                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1">
                      Target Opportunity / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Los Angeles Store #25"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                    />
                  </div>

                  {/* Cursive Signature Generator */}
                  {fullName.trim() && (
                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase">
                        Select Signature Style *
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {styles.map((style, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedStyleIndex(idx)}
                            className={`p-3 rounded-2xl border text-center transition-all bg-white cursor-pointer ${
                              selectedStyleIndex === idx
                                ? "border-secondary ring-2 ring-secondary/20 shadow-md"
                                : "border-border hover:border-text-secondary/30"
                            }`}
                          >
                            <span
                              className={`text-2xl text-secondary block ${style.className}`}
                            >
                              {fullName}
                            </span>
                            <span className="text-[9px] text-text-secondary font-medium">
                              {style.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/40 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="sign-accept"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-secondary focus:ring-secondary/20 cursor-pointer"
                      />
                      <label
                        htmlFor="sign-accept"
                        className="text-[10px] text-text-secondary leading-relaxed cursor-pointer select-none"
                      >
                        I agree that my placement and acknowledgment on this
                        document constitutes a legally binding digital signature
                        matching standard E-SIGN regulations.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !accepted ||
                        placedSignatures.length === 0 ||
                        activeSig !== undefined ||
                        signing
                      }
                      className="w-full py-3 bg-secondary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all text-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      {signing
                        ? "Embedding signature..."
                        : "Acknowledge & Submit E-Signature"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side: Interactive PDF canvas viewer (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col space-y-4">
                {/* PDF Header Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-secondary">
                      Document Interactive Viewer
                    </h3>
                    <p className="text-[11px] text-text-secondary">
                      Scroll, navigate pages, and click directly on the document
                      to place your signature.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      disabled={currentPage <= 1 || loadingPdf}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-2.5 py-1 border border-border/80 rounded-lg text-xs font-semibold hover:bg-white disabled:opacity-30 cursor-pointer"
                    >
                      ◀ Prev
                    </button>
                    <span className="text-xs text-text font-medium min-w-[70px] text-center">
                      Page {currentPage} of {numPages || "—"}
                    </span>
                    <button
                      disabled={currentPage >= numPages || loadingPdf}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-2.5 py-1 border border-border/80 rounded-lg text-xs font-semibold hover:bg-white disabled:opacity-30 cursor-pointer"
                    >
                      Next ▶
                    </button>
                  </div>
                </div>

                {/* Active Tool Selector Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50/50 border border-border/30 rounded-xl">
                  <span className="text-[10px] font-bold text-text-secondary uppercase px-2">
                    Placement Tool:
                  </span>
                  {([
                    { id: "signature", label: "✍ Signature", title: "Place cursive signature" },
                    { id: "text", label: "💬 Text Field", title: "Place custom text field" },
                    { id: "date", label: "📅 Date", title: "Place current date" },
                  ] as const).map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setActiveTool(tool.id)}
                      title={tool.title}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeTool === tool.id
                          ? "bg-secondary text-white shadow-sm scale-[1.02]"
                          : "bg-white/60 text-secondary hover:bg-white border border-border/20"
                      }`}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>

                {/* Main Render Area */}
                {loadingPdf ? (
                  <div className="h-[550px] border border-dashed border-border/60 rounded-2xl flex items-center justify-center text-xs text-text-secondary animate-pulse bg-white/20">
                    Rendering PDF document pages...
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4 items-center">
                    {/* Canvas wrapper with signature overlays */}
                    <div
                      className="relative border border-border/40 rounded-2xl overflow-hidden bg-white shadow-inner flex justify-center max-w-full"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <div
                        style={{ position: "relative" }}
                        className="inline-block max-w-full"
                      >
                        <canvas ref={canvasRef} className="max-w-full" />

                        {/* Overlay to detect click to place */}
                        <div
                          className="absolute inset-0 cursor-crosshair z-20"
                          onClick={(e) => {
                            if (!isDragging) {
                              handlePageClick(e);
                            }
                          }}
                        />

                        {/* Render all placed signatures on this page */}
                        {placedSignatures
                          .filter((sig) => sig.page === currentPage)
                          .map((sig) => (
                            <div
                              key={sig.id}
                              style={{
                                position: "absolute",
                                left: `${sig.x}px`,
                                top: `${sig.y}px`,
                                transform: "translate(-50%, -50%)",
                                pointerEvents: sig.isLocked ? "none" : "auto",
                                cursor: sig.isLocked ? "pointer" : "grab",
                              }}
                              className={`z-30 flex flex-col items-center select-none ${
                                sig.isLocked
                                  ? "hover:ring-1 hover:ring-secondary/20"
                                  : "border border-dashed border-secondary/40 rounded p-0.5"
                              }`}
                              onMouseDown={(e) => handleMouseDown(e, sig.id)}
                              onClick={(e) => {
                                if (sig.isLocked) {
                                  e.stopPropagation();
                                  setPlacedSignatures((prev) =>
                                    prev.map((s) =>
                                      s.id === sig.id
                                        ? { ...s, isLocked: false }
                                        : { ...s, isLocked: true },
                                    ),
                                  );
                                }
                              }}
                            >
                              {(sig.type === "signature" || !sig.type) && signaturePng && (
                                <Image
                                  src={signaturePng}
                                  alt="Signature"
                                  width={sigWidth}
                                  height={40}
                                  unoptimized
                                  className="bg-transparent object-contain pointer-events-none"
                                />
                              )}
                              {sig.type !== "signature" && sig.type && (
                                <div className="px-2.5 py-1 text-xs font-semibold text-slate-800 bg-transparent select-none whitespace-nowrap">
                                  {sig.textValue}
                                </div>
                              )}
                              {!sig.isLocked && (
                                <span className="absolute top-full left-1/2 -translate-x-1/2 text-[8px] font-bold bg-secondary text-white px-1.5 py-0.5 rounded shadow mt-1 pointer-events-none whitespace-nowrap">
                                  Drag to move / Click elsewhere
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Signature Placement confirmation workflow */}
                    {placedSignatures.length > 0 ? (
                      <div className="w-full space-y-3">
                        {/* Active editing/confirmation panel */}
                        {activeSig && (
                          <div className="w-full p-4 bg-white/50 border border-border/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
                            <div className="text-left">
                              <p className="text-xs font-semibold text-secondary">
                                Adjusting {activeSig.type === "signature" ? "Signature" : activeSig.type === "date" ? "Date" : "Text Field"} on Page {activeSig.page}
                              </p>
                              <p className="text-[10px] text-text-secondary mt-0.5">
                                Drag to position it. {activeSig.type === "text" && "Click the element to edit text. "}Click Confirm to lock.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setPlacedSignatures((prev) =>
                                    prev.map((s) =>
                                      s.id === activeSig.id
                                        ? { ...s, isLocked: true }
                                        : s,
                                    ),
                                  )
                                }
                                className="px-4 py-2 bg-secondary text-white font-semibold rounded-xl text-xs hover:bg-secondary/90 transition-all cursor-pointer"
                              >
                                Confirm Position
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPlacedSignatures((prev) =>
                                    prev.filter((s) => s.id !== activeSig.id),
                                  )
                                }
                                className="px-3 py-2 border border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                              >
                                Cancel / Remove
                              </button>
                            </div>
                          </div>
                        )}

                        {/* List of all placed signatures */}
                        <div className="w-full p-4 bg-white/30 border border-border/40 rounded-2xl">
                          <p className="text-xs font-bold text-secondary mb-2">
                            Placed Elements ({placedSignatures.length})
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {placedSignatures.map((sig, idx) => (
                              <div
                                key={sig.id}
                                className="p-2.5 bg-white/60 border border-border/30 rounded-xl flex items-center justify-between text-xs gap-4"
                              >
                                <div>
                                  <span className="font-semibold text-text">
                                    {sig.type === "signature"
                                      ? `Signature #${idx + 1}`
                                      : sig.type === "date"
                                      ? "Date"
                                      : `Text Field ("${(sig.textValue || "").length > 15 ? (sig.textValue || "").substring(0, 15) + "..." : sig.textValue}")`}
                                  </span>
                                  <span className="text-text-secondary text-[10px] block">
                                    Page {sig.page}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCurrentPage(sig.page);
                                      setPlacedSignatures((prev) =>
                                        prev.map((s) =>
                                          s.id === sig.id
                                            ? { ...s, isLocked: false }
                                            : { ...s, isLocked: true },
                                        ),
                                      );
                                      if (sig.type === "text") {
                                        setTextModalInput(sig.textValue || "");
                                        setTextModalTarget(sig.id);
                                        setTextModalOpen(true);
                                      }
                                    }}
                                    className="p-1 text-secondary hover:bg-secondary/10 rounded transition-all text-[10px] font-semibold"
                                    title="Edit location"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPlacedSignatures((prev) =>
                                        prev.filter((s) => s.id !== sig.id),
                                      )
                                    }
                                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-all text-[10px] font-semibold"
                                    title="Delete signature"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full p-4 bg-secondary/5 border border-secondary/10 rounded-2xl text-center text-xs text-text-secondary font-medium animate-in fade-in duration-300">
                        ✍ Navigate to the desired page, then click anywhere
                        directly on the PDF above to place your signature. You
                        can add multiple signatures across different pages.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />

      {/* Dynamic Text Input Modal */}
      {textModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setTextModalOpen(false);
              setTextModalTarget(null);
            }}
          />
          <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-border/40 transition-all animate-in zoom-in-95 duration-200">
            <form onSubmit={handleTextModalConfirm} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold bg-secondary/5 text-secondary border border-secondary/15">
                  💬
                </div>
                <h3 className="text-base font-bold text-secondary">
                  {typeof textModalTarget === "string" ? "Edit Text Field" : "Place Custom Text"}
                </h3>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-text-secondary uppercase">
                  Text Content
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Type anything (e.g. Printed Name, Job Title, Custom info)"
                  value={textModalInput}
                  onChange={(e) => setTextModalInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm font-medium"
                />
                <p className="text-[9px] text-text-secondary leading-normal mt-1">
                  This text will be stamped directly onto the PDF at the selected position. It will default to this value on next placement.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTextModalOpen(false);
                    setTextModalTarget(null);
                  }}
                  className="px-4 py-2 border border-border text-text-secondary hover:bg-slate-50 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-secondary text-white font-semibold rounded-xl text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Confirm & Lock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
