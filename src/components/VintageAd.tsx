"use client";

import Script from "next/script";

export function VintageAd() {
    return (
        <Script id="vintage-push-ad" strategy="afterInteractive">
            {`
        (function(d,z,s){
          s.src = 'https://' + d + '/401/' + z;
          try {
            (document.body || document.documentElement).appendChild(s);
          } catch(e) {}
        })('gizokraijaw.net', 9532947, document.createElement('script'));
      `}
        </Script>
    );
}
