import Link from "next/link";
import { FalconLogo } from "@peregrine/ui";

const suggestedTools = [
  { name: "Compress Video", href: "/compress-video" },
  { name: "Trim Video", href: "/trim-video" },
  { name: "Video to MP3", href: "/video-to-mp3" },
  { name: "Video to GIF", href: "/video-to-gif" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <FalconLogo size={64} className="mb-6" />

      <p className="text-8xl font-bold text-falcon-navy">404</p>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        Page Not Found
      </h1>

      <p className="mt-3 max-w-md text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-[#F43F5E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E11D48]"
      >
        Back to Home
      </Link>

      <div className="mt-10">
        <p className="text-sm font-medium text-slate-500">
          Or try one of our tools:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {suggestedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 transition-colors hover:border-[#F43F5E] hover:text-[#F43F5E]"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
