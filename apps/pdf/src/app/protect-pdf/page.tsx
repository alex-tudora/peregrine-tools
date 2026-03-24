import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import ProtectPdfTool from "./ProtectPdfTool";

const toolName = "Protect PDF — Add Password Online Free";
const description =
  "Add password protection to your PDF files. Secure your documents with encryption. Free online tool — no sign-up required.";
const keyword = "protect pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/protect-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF file using the drop zone above",
  "Enter and confirm a strong password for your document",
  "Review the password strength indicator to ensure adequate security",
  "Download your password-protected PDF",
];

const about = `
  <p>
    Sharing sensitive documents without password protection is risky.
    Financial reports, legal contracts, medical records, and personal
    information can end up in the wrong hands when PDF files are forwarded or
    stored without access controls. This free online tool lets you
    <strong>protect PDF</strong> files by adding password encryption, so only
    people with the correct password can open and view the document.
  </p>
  <p>
    Adding a password to a PDF is one of the simplest and most effective ways
    to secure your documents before sharing them via email, cloud storage, or
    messaging platforms. Recipients will be prompted to enter the password
    before they can view any content, providing a reliable layer of access
    control that travels with the file itself.
  </p>
  <p>
    Our <strong>protect PDF</strong> tool is designed with privacy in mind.
    The entire process runs in your browser — your files are never uploaded
    to a remote server. This means you can add password protection to
    confidential or sensitive documents without worrying about third-party
    access. There are no file-size limits, no watermarks, and no daily caps.
  </p>
  <p>
    Whether you need to secure a single contract or protect a batch of files
    before archiving, this tool provides a straightforward solution. Combine
    it with our other PDF utilities — unlock, watermark, sign, merge — to
    build a complete document security workflow without leaving your browser.
  </p>
`;

const faqs = [
  {
    question: "How does PDF password protection work?",
    answer:
      "PDF password protection encrypts the file contents so that a PDF viewer requires the correct password before displaying the document. The encryption standard used in PDFs (typically AES-128 or AES-256) ensures that the content cannot be read without the key derived from your password.",
  },
  {
    question: "Is my file uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using JavaScript. Your PDF file and password are never transmitted to any server, ensuring complete privacy and security for sensitive documents.",
  },
  {
    question: "What makes a strong PDF password?",
    answer:
      "A strong password is at least 8 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid dictionary words, personal information, and common patterns like '123456' or 'password'.",
  },
  {
    question: "Can a password-protected PDF be unlocked?",
    answer:
      "Yes, anyone with the correct password can unlock and view the PDF. You can also use our Unlock PDF tool to permanently remove the password from a protected file if you know the password and want unrestricted access going forward.",
  },
  {
    question: "Will the protected PDF look different from the original?",
    answer:
      "No. Password protection only adds an encryption layer — all pages, text, images, annotations, and formatting remain exactly as they were in the original document. The only difference is that viewers must enter the password to open it.",
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
  { name: "Unlock PDF", href: "/unlock-pdf" },
  { name: "Watermark PDF", href: "/watermark-pdf" },
  { name: "Sign PDF", href: "/sign-pdf" },
  { name: "Merge PDF", href: "/merge-pdf" },
];

export default function ProtectPdfPage() {
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
        subtitle="Add password protection to your PDF. Secure your documents instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
        nextStep={{ label: "Add a watermark?", description: "Add visual watermark to your protected PDF", href: "/watermark-pdf" }}
      >
        <ProtectPdfTool />
      </ToolLayout>
    </>
  );
}
