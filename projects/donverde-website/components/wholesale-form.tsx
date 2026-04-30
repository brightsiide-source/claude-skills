"use client";

import { useState } from "react";

export function WholesaleForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("form-name", "wholesale");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
      });
      if (!res.ok) throw new Error("Submission failed");
      setDone(true);
      form.reset();
    } catch (err) {
      setError("Something went wrong. Email info@donverdefarms.com and we'll pick it up.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-verde bg-bone-warm p-12 text-center">
        <p className="eyebrow">Received</p>
        <h3 className="mt-6 font-display text-4xl tracking-tightest text-ink">
          We&rsquo;ll be in touch within two business days.
        </h3>
        <p className="mt-4 text-base text-ink/70">
          Verification of your NM cultivation/retail license is the first step. Keep an eye on
          your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      name="wholesale"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="wholesale" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Title / role" name="title" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <Field label="Dispensary / business name" name="business" required />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="NM license number" name="license" required placeholder="CCD-RETL-..." />
        <Field label="City" name="city" required />
      </div>

      <Select label="Estimated monthly volume" name="volume" required options={[
        "Under 1 lb",
        "1 – 5 lb",
        "5 – 25 lb",
        "25+ lb"
      ]} />

      <TextArea
        label="Notes — what's on your menu, what you're looking for, when you'd want to start"
        name="notes"
      />

      {error && (
        <p className="text-sm text-verde-deep">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-verde text-[11px] disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Submit wholesale inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
        {label}
        {required && <span className="ml-1 text-verde">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-ink/20 bg-bone-warm px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-verde"
      />
    </label>
  );
}

function Select({
  label,
  name,
  required,
  options
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
        {label}
        {required && <span className="ml-1 text-verde">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 w-full border border-ink/20 bg-bone-warm px-4 py-3 text-base text-ink outline-none transition-colors focus:border-verde"
      >
        <option value="" disabled>Select one</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
        {label}
        {required && <span className="ml-1 text-verde">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="mt-2 w-full border border-ink/20 bg-bone-warm px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-verde"
      />
    </label>
  );
}
