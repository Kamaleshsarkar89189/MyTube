// app/components/monetag-sw-register.tsx
'use client'

import { useEffect } from 'react';

export default function MonetagSWRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/monetag-worker.js')
                .then((reg) => console.log('Monetag SW registered', reg))
                .catch((err) => console.error('SW registration failed:', err));
        }
    }, []);

    return null; // Nothing to render
}
