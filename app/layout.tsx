import "./globals.css";
import "@tremor/react/dist/esm/tremor.css";

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
        {children} {/* not this */}
        {/* you can remove this - for hosted version tracking */}
        <script
          async
          defer
          data-website-id="7db7a649-2dd4-49f4-9f05-a95a89a24c16"
          src="https://umami-cc.vercel.app/umami.js"
        />
      </body>
    </html>
  );
}
