import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Peregrine PDF",
  description:
    "Terms of service for Peregrine PDF. Read the terms and conditions governing your use of our free online PDF tools.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Effective date: March 1, 2026
      </p>

      <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Acceptance of Terms
          </h2>
          <p className="mt-3">
            By accessing or using Peregrine PDF at peregrinepdf.com (the
            &quot;Service&quot;), you agree to be bound by these Terms of
            Service (&quot;Terms&quot;). If you do not agree to these Terms,
            please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Description of Service
          </h2>
          <p className="mt-3">
            Peregrine PDF provides free, browser-based PDF tools including but
            not limited to merging, splitting, compressing, converting, and
            editing PDF files. The Service is provided as-is and is free to use
            for personal and commercial purposes. All file processing happens
            client-side in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            No Warranties
          </h2>
          <p className="mt-3">
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement. We do not warrant that the results of file
            processing will be accurate, reliable, or error-free. You should
            always verify the output of any PDF operation before relying on it
            for important purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            User Responsibility
          </h2>
          <p className="mt-3">
            You are solely responsible for the files you process using the
            Service. You represent and warrant that you have the right to use,
            modify, and process any files you upload or process through the
            Service. We recommend that you keep backup copies of your original
            files before using any of our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            File Size Limits
          </h2>
          <p className="mt-3">
            Individual files are limited to 100 MB per file. This limit exists
            to ensure a smooth experience across a wide range of devices and
            browsers. Files exceeding this limit may not be processed
            correctly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
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
          <h2 className="text-xl font-semibold text-slate-900">
            Intellectual Property
          </h2>
          <p className="mt-3">
            The Peregrine PDF name, logo, branding, website design, and all
            related intellectual property are owned by Peregrine Tools and are
            protected by applicable intellectual property laws. You may not
            copy, modify, distribute, or create derivative works based on our
            branding or site content without prior written permission.
          </p>
          <p className="mt-3">
            You retain all rights to the files you process through the Service.
            We claim no ownership or rights over your files or their content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            To the fullest extent permitted by law, Peregrine PDF and its
            operators shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of
            profits, data, or goodwill, arising out of or in connection with
            your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
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
          <h2 className="text-xl font-semibold text-slate-900">
            Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about these Terms of Service, please contact
            us at{" "}
            <a
              href="mailto:legal@peregrinetools.com"
              className="text-sky-blue underline hover:text-blue-700"
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
