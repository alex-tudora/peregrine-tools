import { ToolCard } from "@peregrine/ui";

const tools = [
  {
    icon: "\u{1F4C4}",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    href: "/merge-pdf",
  },
  {
    icon: "\u2702\uFE0F",
    name: "Split PDF",
    description: "Extract pages or split into individual files",
    href: "/split-pdf",
  },
  {
    icon: "\u{1F5DC}\uFE0F",
    name: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    href: "/compress-pdf",
  },
  {
    icon: "\u{1F5BC}\uFE0F",
    name: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    href: "/pdf-to-jpg",
  },
  {
    icon: "\u{1F4F8}",
    name: "JPG to PDF",
    description: "Convert JPG images to a PDF document",
    href: "/jpg-to-pdf",
  },
  {
    icon: "\u{1F3A8}",
    name: "PDF to PNG",
    description: "Convert PDF pages to high-quality PNG images",
    href: "/pdf-to-png",
  },
  {
    icon: "\u{1F5BC}\uFE0F",
    name: "PNG to PDF",
    description: "Convert PNG images to PDF",
    href: "/png-to-pdf",
  },
  {
    icon: "\u{1F504}",
    name: "Rotate PDF",
    description: "Rotate PDF pages to any angle",
    href: "/rotate-pdf",
  },
  {
    icon: "\u{1F4A7}",
    name: "Watermark PDF",
    description: "Add text or image watermarks to PDFs",
    href: "/watermark-pdf",
  },
  {
    icon: "\u{1F513}",
    name: "Unlock PDF",
    description: "Remove password protection from PDFs",
    href: "/unlock-pdf",
  },
  {
    icon: "\u{1F512}",
    name: "Protect PDF",
    description: "Add password protection to your PDFs",
    href: "/protect-pdf",
  },
  {
    icon: "\u270D\uFE0F",
    name: "Sign PDF",
    description: "Add your signature to PDF documents",
    href: "/sign-pdf",
  },
  {
    icon: "\u{1F522}",
    name: "Page Numbers",
    description: "Add page numbers to PDF documents",
    href: "/add-page-numbers",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The Fastest PDF Tools Online
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Merge, split, compress, and convert PDF files instantly. Free.
            No sign-up. Processed in your browser.
          </p>
        </div>
      </section>

      {/* Tool grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.href}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            All tools are free, work instantly in your browser, and require no
            sign-up. Your files never leave your device.
          </p>
        </div>
      </section>
    </>
  );
}
