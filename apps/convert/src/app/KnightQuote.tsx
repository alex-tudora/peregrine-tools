"use client";

import { useState, useEffect } from "react";

const knightQuotes = [
  "We joust with file formats so you don't have to.",
  "'Tis but a file format!",
  "One does not simply change a file extension and hope for the best.",
  "Hear ye, hear ye! Thy conversion awaits.",
  "May your files be converted and your inbox be empty.",
  "To convert, or not to convert? That's not even a question.",
  "We put the 'knight' in... okay there's no pun there.",
  "Ye olde file converter.",
  "Court dismissed. Your file is ready.",
  "Our knight in shining armor... is more of a knight in slightly dented aluminum.",
  "He tried slaying a dragon once. It did not go well.",
  "Dropped his lance. Grabbed your file.",
  "Converting files since the Middle Ages.",
  "No round table. No square deal. Just free conversions.",
  "Couldn't rescue a princess. Could rescue your PowerPoint.",
];

export function KnightQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(knightQuotes[Math.floor(Math.random() * knightQuotes.length)]);
  }, []);

  if (!quote) return null;

  return (
    <p className="mt-2 text-sm italic text-[color:var(--color-text-muted)] font-display animate-arrive delay-1">
      &ldquo;{quote}&rdquo;
    </p>
  );
}
