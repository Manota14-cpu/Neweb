import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=geist@400,500,600&display=swap" rel="stylesheet" />
        <meta name="description" content="Journey through worlds, discoveries and the infinite universe. Explore the Solar System with immersive, cinematic design." />
        <meta name="keywords" content="solar system, space, planets, NASA, universe, exploration" />
        <meta name="author" content="COSMOS" />
        <meta property="og:title" content="COSMOS — Solar System Explorer" />
        <meta property="og:description" content="Journey through worlds, discoveries and the infinite universe." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
