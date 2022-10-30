import "./globals.css";
import "@tremor/react/dist/esm/tremor.css";

import { AnalyticsWrapper } from "./components/analytics";

// doesnt work with next 13 yet
// export { reportWebVitals } from "next-axiom";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <head>
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <title>TikTok TTS</title>
          <meta
            name="description"
            content="Generate TTS for free online! Powered by TikTok."
          />
          <meta property="og:title" content="TikTok TTS" />
          <meta
            property="og:description"
            content="Generate TTS for free online! Powered by TikTok."
          />
        </head>
      </head>
      <body>
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
