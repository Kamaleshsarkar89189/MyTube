// components/InPagePushAd.tsx
"use client";

import Script from "next/script";

export function InPagePushAd() {
  return (
    <Script id="push-banner-ad" strategy="afterInteractive">
      {`
        (function(d,z,s){
          s.src='https://'+d+'/400/'+z;
          try {
            (document.body || document.documentElement).appendChild(s);
          } catch(e){}
        })('vemtoutcheeg.com', 9527582, document.createElement('script'));
      `}
    </Script>
  );
}
