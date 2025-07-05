"use client";

import Script from "next/script";

export function IndustrialAd() {
    return (
        <Script
            id="industrial-push-ad"
            strategy="afterInteractive"
        >
            {`
        (function(d,z,s){
          s.src='https://'+d+'/401/'+z;
          try {
            (document.body || document.documentElement).appendChild(s);
          } catch(e){}
        })('groleegni.net', 9532872, document.createElement('script'));
      `}
        </Script>
    );
}
