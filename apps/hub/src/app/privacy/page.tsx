import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Peregrine Tools",
  description:
    "Privacy policy for Peregrine Tools. Learn how we protect your data — all processing happens in your browser with no server uploads.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
        Effective date: March 1, 2026
      </p>

      <div className="mt-8 space-y-8 text-[color:var(--color-text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Overview
          </h2>
          <p className="mt-3">
            Peregrine Tools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we handle information when you use our website at
            peregrinetools.com and our family of sites including peregrinepdf.com,
            peregrinepix.com, peregrinevid.com, peregrinedev.com, and
            peregrinekit.com (collectively, the &quot;Service&quot;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Data Processing &amp; Your Data
          </h2>
          <p className="mt-3">
            All file conversions, text processing, calculations, and tool
            operations happen entirely client-side in your web browser. Your
            data is never uploaded to our servers or any third-party servers.
            Data remains on your device throughout the entire process. We have
            no access to the content you process at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Personal Information
          </h2>
          <p className="mt-3">
            We do not require account creation or sign-up to use our tools. We
            do not collect personal information such as your name, email
            address, or payment details through the use of our tools. We do
            not track or store the data you process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Analytics
          </h2>
          <p className="mt-3">
            We use standard web analytics to understand how visitors use our
            site. This may include anonymized data such as pages visited,
            approximate geographic region, browser type, device type, and
            referral source. This information is used solely to improve the
            Service and does not identify individual users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Advertising
          </h2>
          <p className="mt-3">
            We use Google AdSense to display advertisements on our site. Google
            AdSense may use cookies and similar technologies to serve ads based
            on your prior visits to our site or other websites. You can opt out
            of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-accent)] underline hover:text-[color:var(--color-accent-hover)]"
            >
              Google&apos;s Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Cookies
          </h2>
          <p className="mt-3">
            Our site uses cookies for the following purposes:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Analytics cookies:</strong> To measure site traffic and
              usage patterns in an anonymized manner.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google AdSense to
              serve relevant advertisements and measure ad performance.
            </li>
          </ul>
          <p className="mt-3">
            You can control cookie preferences through your browser settings.
            Disabling cookies may affect the functionality of certain features
            on the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Third-Party Services
          </h2>
          <p className="mt-3">
            We may use third-party services for analytics and advertising.
            These services have their own privacy policies governing their use
            of your information. We encourage you to review the privacy
            policies of any third-party services that interact with our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. Your
            continued use of the Service after changes are posted constitutes
            your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Contact Us
          </h2>
          <p className="mt-3">
            If you have questions or concerns about this Privacy Policy, please
            contact us at{" "}
            <a
              href="mailto:privacy@peregrinetools.com"
              className="text-[color:var(--color-accent)] underline hover:text-[color:var(--color-accent-hover)]"
            >
              privacy@peregrinetools.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
