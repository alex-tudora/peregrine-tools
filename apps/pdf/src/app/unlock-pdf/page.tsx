import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import UnlockPdfTool from "./UnlockPdfTool";

const toolName = "Unlock PDF — Remove Password Online Free";
const description =
  "Remove password protection from PDF files. Unlock PDFs instantly in your browser. Free online tool — no sign-up required.";
const keyword = "unlock pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/unlock-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your password-protected PDF file using the drop zone above",
  "Enter the password for the PDF document",
  'Click "Unlock PDF" to remove the password protection',
  "Download your unlocked PDF — it can now be opened without a password",
];

const about = `
  <p>
    Password-protected PDFs are great for security, but they can become a
    nuisance when you need to work with the document freely — printing,
    editing, or sharing it without requiring everyone to know the password.
    This free online tool lets you <strong>unlock PDF</strong> files by
    removing the password protection, so you can use the document without
    restrictions.
  </p>
  <p>
    To use this tool, you need to know the document's password. This is not
    a password cracker or brute-force tool — it simply opens the PDF with the
    password you provide and re-saves it without encryption. The resulting
    file is an exact copy of the original content, minus the password
    requirement. All text, images, annotations, and formatting remain intact.
  </p>
  <p>
    The entire process runs locally in your browser using JavaScript and the
    pdf-lib library. Your PDF and password are never sent to any server,
    ensuring complete privacy and security. There are no file-size limits
    beyond what your browser can handle, no daily usage caps, and no
    watermarks added to your output.
  </p>
  <p>
    Whether you need to unlock a single document or remove passwords from
    files before archiving, this tool makes it quick and easy. Pair it with
    our other PDF utilities — compress, merge, split — to build a complete
    document workflow without leaving your browser.
  </p>
`;

const faqs = [
  {
    question: "Is it legal to unlock a PDF?",
    answer:
      "Unlocking a PDF that you own or have authorization to access is perfectly legal. This tool requires you to enter the correct password, so it is intended for legitimate use by document owners or authorized users. Unlocking PDFs you do not have permission to access may violate copyright or privacy laws.",
  },
  {
    question: "Does this tool crack PDF passwords?",
    answer:
      "No. This tool is not a password cracker. You must know and enter the correct password to unlock the PDF. It simply opens the document with your password and re-saves it without encryption.",
  },
  {
    question: "Are my files and password safe?",
    answer:
      "Yes. All processing happens entirely in your browser. Your PDF file and password are never uploaded to any server. Once you close or refresh the page, the data is gone — nothing is stored or transmitted.",
  },
  {
    question: "What happens if I enter the wrong password?",
    answer:
      "The tool will display a clear error message letting you know the password is incorrect. You can try again with the correct password. The PDF file remains unchanged.",
  },
  {
    question: "Will the unlocked PDF look different from the original?",
    answer:
      "No. The unlocked PDF is a faithful copy of the original document. All pages, text, images, annotations, bookmarks, and formatting are preserved — the only difference is that the password requirement is removed.",
  },
];

const schemas = generateToolPageStructuredData({
  toolName,
  description,
  keyword,
  url: `${siteUrl}${path}`,
  siteName,
  siteUrl,
  path,
  faqs,
  howTo,
});

const relatedTools = [
  { name: "Protect PDF", href: "/protect-pdf" },
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
  { name: "Split PDF", href: "/split-pdf" },
];

export default function UnlockPdfPage() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolLayout
        title={toolName}
        subtitle="Remove password protection from your PDF. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
        nextStep={{ label: "Compress the PDF?", description: "Reduce file size of the unlocked PDF", href: "/compress-pdf" }}
      >
        <UnlockPdfTool />
      </ToolLayout>
    </>
  );
}
