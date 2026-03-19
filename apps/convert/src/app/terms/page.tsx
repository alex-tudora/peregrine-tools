import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Convert-a-Lot",
  description:
    "Terms of service for Convert-a-Lot. Read the terms and conditions governing your use of our free online file conversion tools.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
        Effective date: March 1, 2026
      </p>

      <div className="mt-8 space-y-8 text-[color:var(--color-text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Acceptance of Terms
          </h2>
          <p className="mt-3">
            By accessing or using Convert-a-Lot at convert-a-lot.com (the
            &quot;Service&quot;), operated by Peregrine Tools, you agree to be
            bound by these Terms of Service (&quot;Terms&quot;). Convert-a-Lot
            directs users to Peregrine Tools sites including peregrinepdf.com,
            peregrinepix.com, peregrinevid.com, peregrinedev.com, and
            peregrinekit.com for actual file processing. If you do not agree to
            these Terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Description of Service
          </h2>
          <p className="mt-3">
            Convert-a-Lot provides a unified interface for discovering and
            accessing free, browser-based file conversion tools powered by
            Peregrine Tools. The Service helps you find the right tool for
            converting between PDF, image, video, audio, data, and text formats.
            All actual file processing happens client-side in your browser on the
            respective Peregrine Tools sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            No Warranties
          </h2>
          <p className="mt-3">
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement. We do not warrant that the results of any
            processing will be accurate, reliable, or error-free. You should
            always verify the output of any tool before relying on it for
            important purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            User Responsibility
          </h2>
          <p className="mt-3">
            You are solely responsible for the data you process using the
            Service. You represent and warrant that you have the right to use
            and process any content you input through the Service. We recommend
            that you keep backup copies of your original data before using any
            of our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Acceptable Use
          </h2>
          <p className="mt-3">
            You agree not to use the Service to process, create, or distribute
            any content that is illegal, harmful, threatening, abusive,
            defamatory, obscene, or otherwise objectionable. You agree not to
            use the Service in any way that could damage, disable, overburden,
            or impair the site or interfere with any other party&apos;s use of
            the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Intellectual Property
          </h2>
          <p className="mt-3">
            The Convert-a-Lot name, branding, website design, and all related
            intellectual property are owned by Peregrine Tools and are protected
            by applicable intellectual property laws. You may not copy, modify,
            distribute, or create derivative works based on our branding or site
            content without prior written permission.
          </p>
          <p className="mt-3">
            You retain all rights to the content you process through the
            Service. We claim no ownership or rights over your data or its
            content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            To the fullest extent permitted by law, Convert-a-Lot, Peregrine
            Tools, and their operators shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss
            of profits, data, or goodwill, arising out of or in connection with
            your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Changes to Terms
          </h2>
          <p className="mt-3">
            We reserve the right to modify these Terms at any time. Changes
            will be posted on this page with an updated effective date. Your
            continued use of the Service after changes are posted constitutes
            your acceptance of the revised Terms. We encourage you to review
            these Terms periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about these Terms of Service, please contact
            us at{" "}
            <a
              href="mailto:legal@peregrinetools.com"
              className="text-[color:var(--color-accent)] underline hover:text-[color:var(--color-accent-hover)]"
            >
              legal@peregrinetools.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
