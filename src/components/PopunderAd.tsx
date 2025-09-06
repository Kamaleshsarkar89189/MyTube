// app/components/PopunderAd.tsx
// 'use client';

// import { useEffect } from 'react';

// export default function PopunderAd() {
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.dataset.zone = '9519379';
//         script.src = 'https://al5sm.com/tag.min.js';
//         document.body.appendChild(script);
//     }, []);

//     return null;
// }

'use client';

import { useEffect, useState } from 'react';

export default function PopunderAd() {
    const [shouldShowAd, setShouldShowAd] = useState(false);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const res = await fetch('https://api64.ipify.org?format=json');
                const data = await res.json();
                const userIP = data.ip;

                const blockedIPs = ['2409:4061:381:8bb:e983:7a85:5f4d:5d74'];

                if (!blockedIPs.includes(userIP)) {
                    setShouldShowAd(true);
                }
            } catch (err) {
                console.error('Failed to fetch IP:', err);
                // fallback: show ad for everyone if error
                setShouldShowAd(true);
            }
        };

        fetchIP();
    }, []);

    useEffect(() => {
        if (shouldShowAd) {
            const script = document.createElement('script');
            script.dataset.zone = '9519379';
            script.src = 'https://al5sm.com/tag.min.js';
            document.body.appendChild(script);
        }
    }, [shouldShowAd]);

    return null;
}

