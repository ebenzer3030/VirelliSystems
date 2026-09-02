import Script from "next/script";

// -----------------------------------------------------------------------
// META PIXEL CONFIGURATION
// -----------------------------------------------------------------------
// Set NEXT_PUBLIC_META_PIXEL_ID in .env.local (and in Vercel) once you have
// your Pixel ID from Meta Events Manager. Nothing is invented here — if the
// ID is blank, the pixel simply does not load, and no events fire.
//
// This base code fires the standard PageView event on every route render.
// The Lead event is fired separately, only on successful form submission —
// see lib/pixel.ts and components/LeadForm.tsx.
// -----------------------------------------------------------------------

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
