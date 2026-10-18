"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { OPEN_SETTINGS_EVENT, setConsent, useConsent } from "./consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Cookie banner plus consent-gated analytics. Analytics never loads before "Accept". */
export function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setReopened(false);
  };

  const showBanner = consent === "unset" || reopened;

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {showBanner && (
        <section
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-20 z-[55] mx-auto max-w-2xl rounded-2xl border border-line bg-white p-5 shadow-2xl md:bottom-6"
        >
          <p className="text-sm leading-relaxed text-ink">
            We use essential cookies to run this site. With your permission we also use analytics cookies and load
            embedded maps to understand how the site is used. See our{" "}
            <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="md" onClick={() => choose("granted")}>
              Accept all
            </Button>
            <Button size="md" variant="secondary" onClick={() => choose("denied")}>
              Essential only
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}
