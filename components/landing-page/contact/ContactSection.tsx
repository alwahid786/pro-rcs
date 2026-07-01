"use client";

import { contactSectionContent } from "./data";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/ui/Button";
import MailIcon from "@iconify-react/pixelarticons/mail";
import MapIcon from "@iconify-react/pixelarticons/map";
import PhoneIcon from "@iconify-react/pixelarticons/phone";
import { cn } from "@/lib/utils";
import { FormEvent, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from "react";

const detailIcons = [PhoneIcon, MailIcon, MapIcon];

type UnderlineFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const UnderlineField = ({ label, className, id, ...props }: UnderlineFieldProps) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={fieldId} className={cn("flex flex-col gap-3", className)}>
      <span className="font-sans text-sm font-medium text-text-secondary">{label}</span>
      <input
        id={fieldId}
        className="w-full border-0 border-b border-border bg-transparent pb-3 font-sans text-base text-text outline-none transition-colors placeholder:text-text-secondary/50 focus:border-primary"
        {...props}
      />
    </label>
  );
};

type UnderlineTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

const UnderlineTextarea = ({ label, className, id, rows = 3, ...props }: UnderlineTextareaProps) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={fieldId} className={cn("flex flex-col gap-3", className)}>
      <span className="font-sans text-sm font-medium text-text-secondary">{label}</span>
      <textarea
        id={fieldId}
        rows={rows}
        className="w-full resize-none border-0 border-b border-border bg-transparent pb-3 font-sans text-base text-text outline-none transition-colors placeholder:text-text-secondary/50 focus:border-primary"
        {...props}
      />
    </label>
  );
};

const ContactSection = () => {
  const { title, subtitle, details, form } = contactSectionContent;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (!statusMessage) return;

    const timer = window.setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setStatusType(null);
    setIsSubmitting(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to send your message.");
      }

      setStatusType("success");
      setStatusMessage(result.message ?? "Message sent successfully.");
      formElement.reset();
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : "Failed to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto p-4 bg-white shadow-2xl rounded-md">
        <div className="overflow-hidden  bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid lg:grid-cols-[minmax(0,360px)_1fr]">
          <aside className="relative flex flex-col justify-between gap-10 bg-linear-to-br from-primary via-[#ef7840] to-[#f5935c] px-8 py-10 sm:px-10 sm:py-12 lg:min-h-150 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute right-0 bottom-0 size-72 translate-x-1/4 translate-y-1/4 rounded-full bg-black/10 blur-3xl" aria-hidden />

            <div className="relative z-10 flex flex-col gap-3">
              <h2 className="font-sans text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">{title}</h2>
              <p className="font-sans text-base font-medium text-white/85 sm:text-lg">{subtitle}</p>
            </div>

            <ul className="relative z-10 flex flex-col gap-5">
              {details.map((detail, index) => {
                const Icon = detailIcons[index];
                const content = (
                  <>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                      <Icon width="18" height="18" />
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-white sm:text-base">{detail.value}</span>
                  </>
                );

                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a href={detail.href} className="flex items-center gap-4 transition-opacity hover:opacity-90">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10">
              <UnderlineField
                label={form.firstName.label}
                name="firstName"
                placeholder={form.firstName.placeholder}
                autoComplete="given-name"
                required
              />
              <UnderlineField label={form.lastName.label} name="lastName" placeholder={form.lastName.placeholder} autoComplete="family-name" />
              <UnderlineField
                label={form.email.label}
                name="email"
                type="email"
                placeholder={form.email.placeholder}
                autoComplete="email"
                required
              />
              <UnderlineField label={form.phone.label} name="phone" type="tel" placeholder={form.phone.placeholder} autoComplete="tel" />
            </div>

            <UnderlineTextarea label={form.message.label} name="message" placeholder={form.message.placeholder} required />

            <div className="flex flex-col items-end gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRightIcon className="text-white" />}
                iconPosition="left"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : form.submit}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {statusMessage && statusType && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "fixed right-6 bottom-6 z-60 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-xl",
            statusType === "success" ? "bg-[#16a34a]" : "bg-[#dc2626]",
          )}
        >
          {statusMessage}
        </div>
      )}
    </section>
  );
};

export default ContactSection;
