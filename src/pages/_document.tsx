import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://images-assets.nasa.gov" />

        <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" as="style" />
        <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=geist@400,500,600&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" as="style" />

        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=geist@400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <meta charSet="utf-8" />
        <title>BWL Studios — Solar System &amp; Space Exploration</title>
        <meta name="description" content="Journey across the Solar System through an immersive, cinematic experience. Explore planets, discoveries, black holes, and the infinite universe." />
        <meta name="keywords" content="solar system, space, planets, NASA, universe, exploration, astronomy, cosmos, BWL Studios" />
        <meta name="author" content="BWL Studios" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://neweb-two.vercel.app" />

        <meta property="og:title" content="BWL Studios — Explore the Solar System" />
        <meta property="og:description" content="Journey across the Solar System through an immersive, cinematic experience. Explore planets, black holes, and the infinite universe." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://neweb-two.vercel.app" />
        <meta property="og:image" content="https://neweb-two.vercel.app/logo.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content="BWL Studios" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BWL Studios — Explore the Solar System" />
        <meta name="twitter:description" content="Journey across the Solar System through an immersive, cinematic experience. Explore planets, black holes, and the infinite universe." />
        <meta name="twitter:image" content="https://neweb-two.vercel.app/logo.png" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BWL Studios",
              "url": "https://neweb-two.vercel.app",
              "description": "Journey across the Solar System through an immersive, cinematic experience.",
              "author": { "@type": "Organization", "name": "BWL Studios" },
              "inLanguage": ["en", "pt", "es", "fr"],
            }),
          }}
        />
      </Head>
      <body className="will-change-scroll">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
