"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "warning" | "success" | "error";
}

export default function Modal({ isOpen, onClose, title, message, type = "warning" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-border/40 transition-all animate-in zoom-in-95 duration-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
              type === "warning" ? "bg-amber-50 text-amber-600 border border-amber-200" :
              type === "error" ? "bg-rose-50 text-rose-600 border border-rose-200" : 
              "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}>
              {type === "warning" ? "!" : type === "error" ? "✕" : "✓"}
            </div>
            <h3 className="text-base font-bold text-secondary">{title}</h3>
          </div>
          
          <p className="text-xs text-text-secondary leading-relaxed">
            {message}
          </p>
          
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-secondary text-white font-semibold rounded-xl text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Okay, I understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
