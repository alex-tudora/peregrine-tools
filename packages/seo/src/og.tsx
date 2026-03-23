import { ImageResponse } from "next/og";

export interface OGImageOptions {
  title: string;
  siteName: string;
  accentColor: string;
  description?: string;
}

export function createOGImageResponse({
  title,
  siteName,
  accentColor,
  description,
}: OGImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: 12,
            height: "100%",
            backgroundColor: accentColor,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              color: accentColor,
              marginBottom: 24,
            }}
          >
            {siteName}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              marginBottom: description ? 24 : 0,
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              {description.length > 160
                ? `${description.slice(0, 157)}...`
                : description}
            </div>
          )}

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 18,
              color: "#9ca3af",
            }}
          >
            Free &middot; No sign-up &middot; 100% private
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
