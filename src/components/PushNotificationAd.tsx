'use client';

import { useEffect } from 'react';

export default function PushNotificationAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://shoukigaigoors.net/act/files/tag.min.js?z=9519381';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.body.appendChild(script);
    }, []);

    return null;
}
