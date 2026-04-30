"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dvf-age-verified";

export function AgeGate() {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setVerified(stored === "true");
    } catch {
      setVerified(true);
    }
  }, []);

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 px-6 backdrop-blur-md">
      <div className="w-full max-w-lg border border-bone/15 bg-ink p-10 text-center">
        <p className="eyebrow">Don Verde Farms</p>
        <h2 className="mt-6 font-display text-4xl tracking-tightest text-bone">
          Are you 21 or older?
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-bone/70">
          You must be at least 21 years of age to enter this site. By entering, you accept our terms
          and acknowledge that cannabis is for adult use only in compliance with New Mexico law.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(STORAGE_KEY, "true");
              } catch {}
              setVerified(true);
            }}
            className="btn-gold text-[11px]"
          >
            Yes, I am 21+
          </button>
          <a
            href="https://www.google.com"
            className="btn-ghost-bone text-[11px]"
          >
            No, take me back
          </a>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-bone/40">
          License CCD-VICE-2023-0010 · Southern NM
        </p>
      </div>
    </div>
  );
}
