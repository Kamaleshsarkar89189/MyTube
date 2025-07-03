// app/components/PopunderAd.tsx
'use client';

import { useEffect } from 'react';

export default function PopunderAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.dataset.zone = '9519379';
        script.src = 'https://al5sm.com/tag.min.js';
        document.body.appendChild(script);
    }, []);

    return null;
}
