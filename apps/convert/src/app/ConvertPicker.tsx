"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface ConversionRoute {
  from: string;
  to: string;
  path: string;
  description: string;
}

const conversionMap: ConversionRoute[] = [
  { from: "PDF", to: "JPG", path: "/pdf-to-jpg", description: "Render PDF pages as JPG images" },
  { from: "PDF", to: "PNG", path: "/pdf-to-png", description: "Render PDF pages as lossless PNG" },
  { from: "JPG", to: "PDF", path: "/jpg-to-pdf", description: "Bundle JPG images into a PDF" },
  { from: "PNG", to: "PDF", path: "/png-to-pdf", description: "Bundle PNG images into a PDF" },
  { from: "JPG", to: "PNG", path: "/jpg-to-png", description: "Convert JPG to lossless PNG" },
  { from: "PNG", to: "JPG", path: "/png-to-jpg", description: "Compress PNG to compact JPG" },
  { from: "JPG", to: "WebP", path: "/jpg-to-webp", description: "Optimise JPG for the web" },
  { from: "PNG", to: "WebP", path: "/png-to-webp", description: "Compress PNG to modern WebP" },
  { from: "WebP", to: "JPG", path: "/webp-to-jpg", description: "Convert WebP to universal JPG" },
  { from: "WebP", to: "PNG", path: "/webp-to-png", description: "Convert WebP to lossless PNG" },
  { from: "BMP", to: "JPG", path: "/bmp-to-jpg", description: "Compress BMP to compact JPG" },
  { from: "BMP", to: "PNG", path: "/bmp-to-png", description: "Convert BMP to lossless PNG" },
  { from: "GIF", to: "PNG", path: "/gif-to-png", description: "Convert GIF to full-colour PNG" },
  { from: "JPG", to: "GIF", path: "/jpg-to-gif", description: "Convert JPG to GIF format" },
  { from: "TIFF", to: "JPG", path: "/tiff-to-jpg", description: "Compress TIFF to JPG" },
  { from: "TIFF", to: "PNG", path: "/tiff-to-png", description: "Convert TIFF to lossless PNG" },
  { from: "SVG", to: "PNG", path: "/svg-to-png", description: "Rasterise SVG to PNG" },
  { from: "MP4", to: "AVI", path: "/mp4-to-avi", description: "Convert MP4 to legacy AVI" },
  { from: "FLV", to: "MP4", path: "/flv-to-mp4", description: "Modernise Flash FLV to MP4" },
  { from: "MP4", to: "MP3", path: "/mp4-to-mp3", description: "Extract audio from video" },
  { from: "MP4", to: "GIF", path: "/mp4-to-gif", description: "Create animated GIF from video" },
  { from: "MP4", to: "WebM", path: "/mp4-to-webm", description: "Re-encode as open WebM" },
  { from: "AVI", to: "MP4", path: "/avi-to-mp4", description: "Modernise AVI to MP4" },
  { from: "MOV", to: "MP4", path: "/mov-to-mp4", description: "Convert Apple MOV to MP4" },
  { from: "MKV", to: "MP4", path: "/mkv-to-mp4", description: "Convert MKV to universal MP4" },
  { from: "WebM", to: "MP4", path: "/webm-to-mp4", description: "Convert WebM to MP4" },
  { from: "WAV", to: "MP3", path: "/wav-to-mp3", description: "Compress WAV to MP3" },
  { from: "MP3", to: "WAV", path: "/mp3-to-wav", description: "Decode MP3 to uncompressed WAV" },
  { from: "OGG", to: "MP3", path: "/ogg-to-mp3", description: "Convert OGG to universal MP3" },
  { from: "FLAC", to: "MP3", path: "/flac-to-mp3", description: "Compress lossless FLAC to MP3" },
  { from: "AAC", to: "MP3", path: "/aac-to-mp3", description: "Transcode AAC to MP3" },
  { from: "M4A", to: "MP3", path: "/m4a-to-mp3", description: "Convert M4A audio to MP3" },
  { from: "OGG", to: "WAV", path: "/ogg-to-wav", description: "Decode OGG to uncompressed WAV" },
  { from: "FLAC", to: "WAV", path: "/flac-to-wav", description: "Decompress FLAC to WAV" },
  { from: "JSON", to: "CSV", path: "/json-to-csv", description: "Transform JSON to CSV" },
  { from: "CSV", to: "JSON", path: "/csv-to-json", description: "Parse CSV into JSON" },
  { from: "YAML", to: "JSON", path: "/yaml-to-json", description: "Convert YAML to JSON" },
  { from: "JSON", to: "XML", path: "/json-to-xml", description: "Convert JSON to XML" },
  { from: "Markdown", to: "HTML", path: "/markdown-to-html", description: "Render Markdown as HTML" },
  { from: "HTML", to: "Markdown", path: "/html-to-markdown", description: "Convert HTML to Markdown" },
  // Currency conversions
  { from: "USD", to: "EUR", path: "/usd-to-eur", description: "Convert US Dollars to Euros" },
  { from: "EUR", to: "USD", path: "/eur-to-usd", description: "Convert Euros to US Dollars" },
  { from: "USD", to: "GBP", path: "/usd-to-gbp", description: "Convert US Dollars to British Pounds" },
  { from: "GBP", to: "USD", path: "/gbp-to-usd", description: "Convert British Pounds to US Dollars" },
  { from: "USD", to: "JPY", path: "/usd-to-jpy", description: "Convert US Dollars to Japanese Yen" },
  { from: "JPY", to: "USD", path: "/jpy-to-usd", description: "Convert Japanese Yen to US Dollars" },
  { from: "USD", to: "INR", path: "/usd-to-inr", description: "Convert US Dollars to Indian Rupees" },
  { from: "INR", to: "USD", path: "/inr-to-usd", description: "Convert Indian Rupees to US Dollars" },
  { from: "EUR", to: "GBP", path: "/eur-to-gbp", description: "Convert Euros to British Pounds" },
  { from: "GBP", to: "EUR", path: "/gbp-to-eur", description: "Convert British Pounds to Euros" },
  { from: "USD", to: "CAD", path: "/usd-to-cad", description: "Convert US Dollars to Canadian Dollars" },
  { from: "CAD", to: "USD", path: "/cad-to-usd", description: "Convert Canadian Dollars to US Dollars" },
  { from: "USD", to: "AUD", path: "/usd-to-aud", description: "Convert US Dollars to Australian Dollars" },
  { from: "AUD", to: "USD", path: "/aud-to-usd", description: "Convert Australian Dollars to US Dollars" },
  { from: "USD", to: "CHF", path: "/usd-to-chf", description: "Convert US Dollars to Swiss Francs" },
  { from: "CHF", to: "USD", path: "/chf-to-usd", description: "Convert Swiss Francs to US Dollars" },
  { from: "USD", to: "MXN", path: "/usd-to-mxn", description: "Convert US Dollars to Mexican Pesos" },
  { from: "USD", to: "BRL", path: "/usd-to-brl", description: "Convert US Dollars to Brazilian Reais" },
  { from: "EUR", to: "JPY", path: "/eur-to-jpy", description: "Convert Euros to Japanese Yen" },
  { from: "GBP", to: "JPY", path: "/gbp-to-jpy", description: "Convert British Pounds to Japanese Yen" },
  // Text case conversions
  { from: "Text", to: "UPPERCASE", path: "/text-to-uppercase", description: "Convert text to all uppercase" },
  { from: "Text", to: "lowercase", path: "/text-to-lowercase", description: "Convert text to all lowercase" },
  { from: "Text", to: "Title Case", path: "/text-to-titlecase", description: "Capitalize first letter of each word" },
  { from: "Text", to: "camelCase", path: "/text-to-camelcase", description: "Convert text to camelCase" },
  { from: "Text", to: "snake_case", path: "/text-to-snakecase", description: "Convert text to snake_case" },
  { from: "Text", to: "kebab-case", path: "/text-to-kebabcase", description: "Convert text to kebab-case" },
  { from: "Text", to: "PascalCase", path: "/text-to-pascalcase", description: "Convert text to PascalCase" },
  { from: "Text", to: "URL Slug", path: "/text-to-slug", description: "Generate URL-friendly slug" },
  { from: "Text", to: "Reversed", path: "/text-reverse", description: "Reverse text characters" },
  // Encoding conversions
  { from: "Text", to: "Base64", path: "/text-to-base64", description: "Encode text as Base64" },
  { from: "Base64", to: "Text", path: "/base64-to-text", description: "Decode Base64 to text" },
  { from: "Text", to: "URL Encoded", path: "/text-to-url-encoded", description: "URL-encode text" },
  { from: "URL Encoded", to: "Text", path: "/url-encoded-to-text", description: "Decode URL-encoded text" },
  { from: "Text", to: "HTML Entities", path: "/text-to-html-entities", description: "Encode HTML entities" },
  { from: "HTML Entities", to: "Text", path: "/html-entities-to-text", description: "Decode HTML entities" },
  // Number base conversions
  { from: "Decimal", to: "Binary", path: "/decimal-to-binary", description: "Convert decimal to binary" },
  { from: "Binary", to: "Decimal", path: "/binary-to-decimal", description: "Convert binary to decimal" },
  { from: "Decimal", to: "Hex", path: "/decimal-to-hex", description: "Convert decimal to hexadecimal" },
  { from: "Hex", to: "Decimal", path: "/hex-to-decimal", description: "Convert hexadecimal to decimal" },
  { from: "Decimal", to: "Octal", path: "/decimal-to-octal", description: "Convert decimal to octal" },
  { from: "Octal", to: "Decimal", path: "/octal-to-decimal", description: "Convert octal to decimal" },
  { from: "Decimal", to: "Roman", path: "/decimal-to-roman", description: "Convert decimal to Roman numerals" },
  { from: "Roman", to: "Decimal", path: "/roman-to-decimal", description: "Convert Roman numerals to decimal" },
  // Unit conversions — Length
  { from: "km", to: "miles", path: "/km-to-miles", description: "Convert kilometers to miles" },
  { from: "miles", to: "km", path: "/miles-to-km", description: "Convert miles to kilometers" },
  { from: "feet", to: "meters", path: "/feet-to-meters", description: "Convert feet to meters" },
  { from: "meters", to: "feet", path: "/meters-to-feet", description: "Convert meters to feet" },
  { from: "inches", to: "cm", path: "/inches-to-cm", description: "Convert inches to centimeters" },
  { from: "cm", to: "inches", path: "/cm-to-inches", description: "Convert centimeters to inches" },
  { from: "feet", to: "cm", path: "/feet-to-cm", description: "Convert feet to centimeters" },
  { from: "yards", to: "meters", path: "/yards-to-meters", description: "Convert yards to meters" },
  { from: "mm", to: "inches", path: "/mm-to-inches", description: "Convert millimeters to inches" },
  { from: "meters", to: "cm", path: "/meters-to-cm", description: "Convert meters to centimeters" },
  { from: "miles", to: "feet", path: "/miles-to-feet", description: "Convert miles to feet" },
  // Unit conversions — Weight
  { from: "kg", to: "lbs", path: "/kg-to-lbs", description: "Convert kilograms to pounds" },
  { from: "lbs", to: "kg", path: "/lbs-to-kg", description: "Convert pounds to kilograms" },
  { from: "oz", to: "grams", path: "/oz-to-grams", description: "Convert ounces to grams" },
  { from: "grams", to: "oz", path: "/grams-to-oz", description: "Convert grams to ounces" },
  { from: "stones", to: "kg", path: "/stones-to-kg", description: "Convert stones to kilograms" },
  { from: "kg", to: "stones", path: "/kg-to-stones", description: "Convert kilograms to stones" },
  { from: "kg", to: "grams", path: "/kg-to-grams", description: "Convert kilograms to grams" },
  // Unit conversions — Temperature
  { from: "\u00B0C", to: "\u00B0F", path: "/celsius-to-fahrenheit", description: "Convert Celsius to Fahrenheit" },
  { from: "\u00B0F", to: "\u00B0C", path: "/fahrenheit-to-celsius", description: "Convert Fahrenheit to Celsius" },
  { from: "\u00B0C", to: "K", path: "/celsius-to-kelvin", description: "Convert Celsius to Kelvin" },
  { from: "\u00B0F", to: "K", path: "/fahrenheit-to-kelvin", description: "Convert Fahrenheit to Kelvin" },
  // Unit conversions — Volume
  { from: "liters", to: "gallons", path: "/liters-to-gallons", description: "Convert liters to US gallons" },
  { from: "gallons", to: "liters", path: "/gallons-to-liters", description: "Convert US gallons to liters" },
  { from: "cups", to: "ml", path: "/cups-to-ml", description: "Convert cups to milliliters" },
  { from: "ml", to: "cups", path: "/ml-to-cups", description: "Convert milliliters to cups" },
  // Unit conversions — Speed
  { from: "km/h", to: "mph", path: "/kmh-to-mph", description: "Convert km/h to mph" },
  { from: "mph", to: "km/h", path: "/mph-to-kmh", description: "Convert mph to km/h" },
  // Unit conversions — Digital
  { from: "MB", to: "GB", path: "/mb-to-gb", description: "Convert megabytes to gigabytes" },
  { from: "GB", to: "TB", path: "/gb-to-tb", description: "Convert gigabytes to terabytes" },
  // Color conversions
  { from: "HEX", to: "RGB", path: "/hex-to-rgb", description: "Convert HEX color to RGB" },
  { from: "RGB", to: "HEX", path: "/rgb-to-hex", description: "Convert RGB color to HEX" },
  { from: "HEX", to: "HSL", path: "/hex-to-hsl", description: "Convert HEX color to HSL" },
  { from: "HSL", to: "HEX", path: "/hsl-to-hex", description: "Convert HSL color to HEX" },
  { from: "RGB", to: "HSL", path: "/rgb-to-hsl", description: "Convert RGB color to HSL" },
  { from: "HSL", to: "RGB", path: "/hsl-to-rgb", description: "Convert HSL color to RGB" },
  { from: "RGB", to: "CMYK", path: "/rgb-to-cmyk", description: "Convert RGB to CMYK for print" },
  { from: "CMYK", to: "RGB", path: "/cmyk-to-rgb", description: "Convert CMYK to RGB for screen" },
  { from: "HEX", to: "CMYK", path: "/hex-to-cmyk", description: "Convert HEX to CMYK for print" },
  { from: "RGB", to: "HSB", path: "/rgb-to-hsb", description: "Convert RGB to HSB/HSV" },
  { from: "HSB", to: "RGB", path: "/hsb-to-rgb", description: "Convert HSB/HSV to RGB" },
  { from: "HEX", to: "OKLCH", path: "/hex-to-oklch", description: "Convert HEX to OKLCH" },
  // Date format conversions
  { from: "US Date", to: "EU Date", path: "/us-to-eu-date", description: "Convert MM/DD/YYYY to DD/MM/YYYY" },
  { from: "EU Date", to: "US Date", path: "/eu-to-us-date", description: "Convert DD/MM/YYYY to MM/DD/YYYY" },
  { from: "Date", to: "Unix Timestamp", path: "/date-to-timestamp", description: "Get Unix epoch timestamp" },
  { from: "Unix Timestamp", to: "Date", path: "/timestamp-to-date", description: "Convert timestamp to readable date" },
  { from: "Date", to: "ISO 8601", path: "/date-to-iso", description: "Convert to YYYY-MM-DD format" },
  { from: "ISO 8601", to: "Date", path: "/iso-to-date", description: "Convert ISO date to other formats" },
  // Timezone conversions
  { from: "EST", to: "UTC", path: "/est-to-utc", description: "Convert Eastern Time to UTC" },
  { from: "UTC", to: "EST", path: "/utc-to-est", description: "Convert UTC to Eastern Time" },
  { from: "PST", to: "EST", path: "/pst-to-est", description: "Convert Pacific to Eastern Time" },
  { from: "EST", to: "PST", path: "/est-to-pst", description: "Convert Eastern to Pacific Time" },
  { from: "GMT", to: "EST", path: "/gmt-to-est", description: "Convert GMT to Eastern Time" },
  { from: "EST", to: "GMT", path: "/est-to-gmt", description: "Convert Eastern Time to GMT" },
  { from: "UTC", to: "IST", path: "/utc-to-ist", description: "Convert UTC to India Standard Time" },
  { from: "IST", to: "UTC", path: "/ist-to-utc", description: "Convert India Standard Time to UTC" },
  { from: "UTC", to: "JST", path: "/utc-to-jst", description: "Convert UTC to Japan Standard Time" },
  { from: "JST", to: "UTC", path: "/jst-to-utc", description: "Convert Japan Standard Time to UTC" },
];

interface FormatGroup {
  label: string;
  formats: string[];
}

const formatGroups: FormatGroup[] = [
  { label: "Documents", formats: ["PDF"] },
  { label: "Images", formats: ["JPG", "PNG", "WebP", "SVG", "BMP", "GIF", "TIFF"] },
  { label: "Video", formats: ["MP4", "AVI", "MOV", "MKV", "WebM", "FLV"] },
  { label: "Audio", formats: ["MP3", "WAV", "OGG", "FLAC", "AAC", "M4A"] },
  { label: "Data", formats: ["JSON", "CSV", "YAML", "XML"] },
  { label: "Text", formats: ["HTML", "Markdown"] },
  { label: "Currency", formats: ["USD", "EUR", "GBP", "JPY", "INR", "CAD", "AUD", "CHF", "MXN", "BRL"] },
  { label: "Text Case", formats: ["Text", "UPPERCASE", "lowercase", "Title Case", "camelCase", "snake_case", "kebab-case", "PascalCase", "URL Slug", "Reversed"] },
  { label: "Encoding", formats: ["Base64", "URL Encoded", "HTML Entities"] },
  { label: "Number Base", formats: ["Decimal", "Binary", "Hex", "Octal", "Roman"] },
  { label: "Length", formats: ["km", "miles", "feet", "meters", "inches", "cm", "yards", "mm"] },
  { label: "Weight", formats: ["kg", "lbs", "oz", "grams", "stones"] },
  { label: "Temperature", formats: ["\u00B0C", "\u00B0F", "K"] },
  { label: "Volume", formats: ["liters", "gallons", "cups", "ml"] },
  { label: "Speed", formats: ["km/h", "mph"] },
  { label: "Digital", formats: ["MB", "GB", "TB"] },
  { label: "Color", formats: ["HEX", "RGB", "HSL", "CMYK", "HSB", "OKLCH"] },
  { label: "Date Format", formats: ["US Date", "EU Date", "Date", "ISO 8601", "Unix Timestamp"] },
  { label: "Timezone", formats: ["UTC", "EST", "PST", "GMT", "IST", "JST"] },
];

const availableFromFormats = new Set(conversionMap.map((c) => c.from));

export function ConvertPicker() {
  const router = useRouter();
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");

  const validToFormats = useMemo(() => {
    if (!fromFormat) return [];
    return conversionMap.filter((c) => c.from === fromFormat).map((c) => c.to);
  }, [fromFormat]);

  const selectedConversion = useMemo(() => {
    if (!fromFormat || !toFormat) return null;
    return conversionMap.find((c) => c.from === fromFormat && c.to === toFormat) ?? null;
  }, [fromFormat, toFormat]);

  const toFormatGroups = useMemo(() => {
    const validSet = new Set(validToFormats);
    return formatGroups
      .map((g) => ({ ...g, formats: g.formats.filter((f) => validSet.has(f)) }))
      .filter((g) => g.formats.length > 0);
  }, [validToFormats]);

  const handleFromChange = (value: string) => {
    setFromFormat(value);
    setToFormat("");
  };

  const handleConvert = () => {
    if (selectedConversion) router.push(selectedConversion.path);
  };

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  return (
    <div>
      <div className="rounded-3xl bg-[color:var(--color-bg-card)] border-2 border-[color:var(--color-border)] p-6 sm:p-8 shadow-xl shadow-orange-900/[0.04]">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* FROM */}
          <div className="flex-1">
            <label htmlFor="from" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
              I have a
            </label>
            <select
              id="from"
              value={fromFormat}
              onChange={(e) => handleFromChange(e.target.value)}
              className={selectClass}
              style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">Choose format...</option>
              {formatGroups.map((group) => {
                const gf = group.formats.filter((f) => availableFromFormats.has(f));
                if (!gf.length) return null;
                return (
                  <optgroup key={group.label} label={group.label}>
                    {gf.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* Arrow */}
          <div className="flex items-end justify-center pb-1 md:pb-0 md:items-end">
            <div className="w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] border-2 border-[color:var(--color-accent)]/20 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[color:var(--color-accent)] animate-pulse-arrow hidden md:block" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <svg className="w-5 h-5 text-[color:var(--color-accent)] md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              </svg>
            </div>
          </div>

          {/* TO */}
          <div className="flex-1">
            <label htmlFor="to" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
              I need a
            </label>
            <select
              id="to"
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
              disabled={!fromFormat}
              className={`${selectClass} disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-[color:var(--color-bg-elevated)]`}
              style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">{fromFormat ? "Choose target..." : "Pick source first"}</option>
              {toFormatGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.formats.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleConvert}
          disabled={!selectedConversion}
          className="mt-6 w-full h-14 rounded-2xl bg-[color:var(--color-accent)] text-white text-lg font-bold font-display tracking-wide transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[color:var(--color-accent)] disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
        >
          Convert
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>

        {/* Subtext */}
        <p className="mt-4 text-center text-xs text-[color:var(--color-text-muted)]">
          {selectedConversion ? (
            <>
              {fromFormat} → {toFormat} —{" "}
              <span className="font-semibold text-[color:var(--color-text-secondary)]">
                {selectedConversion.description}
              </span>
            </>
          ) : (
            "Free forever · No sign-up · Files stay on your device"
          )}
        </p>
      </div>
    </div>
  );
}
