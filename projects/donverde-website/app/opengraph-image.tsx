import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Don Verde Farms — New Mexico's craft indoor cannabis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 70% 30%, rgba(229,199,107,0.18), rgba(0,0,0,0) 60%), #0A0A0A",
          color: "#FAFAF7",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#E5C76B"
          }}
        >
          <span>Don Verde Farms</span>
          <span style={{ color: "#3A3A3A" }}>/</span>
          <span style={{ color: "#A8C290" }}>Southern NM</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "120px",
            lineHeight: "0.95",
            letterSpacing: "-4px"
          }}
        >
          <span>The desert</span>
          <span style={{ fontStyle: "italic", color: "#C8A23A" }}>grows quiet.</span>
          <span>We answer back.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "18px",
            color: "rgba(250,250,247,0.6)",
            letterSpacing: "4px",
            textTransform: "uppercase"
          }}
        >
          <span>donverdefarms.com</span>
          <span>License CCD-VICE-2023-0010</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
