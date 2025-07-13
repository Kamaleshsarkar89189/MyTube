'use client';

import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
    Home,
    Flame,
    History,
    ListVideo,
    ThumbsUp,
    Users,
} from 'lucide-react';

const navItems = [
    {
        label: 'Home',
        href: '/',
        icon: Home,
    },
    {
        label: 'Trending',
        href: '/feed/trending',
        icon: Flame,
    },
    {
        label: 'Subscriptions',
        href: '/feed/subscriptions',
        icon: Users,
    },
    {
        label: 'History',
        href: '/playlists/history',
        icon: History,
    },
    {
        label: 'Liked',
        href: '/playlists/liked',
        icon: ThumbsUp,
    },
    {
        label: 'Playlists',
        href: '/playlists',
        icon: ListVideo,
    },
];


export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow">
            <div className="flex justify-around text-xs text-zinc-600 dark:text-gray-400 py-2">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <a
                            key={label}
                            href={href}
                            className={clsx(
                                'flex flex-col items-center transition-colors duration-150',
                                isActive
                                    ? 'text-primary dark:text-primary'
                                    : 'hover:text-black dark:hover:text-white'
                            )}
                        >
                            <Icon
                                className={clsx('mb-1', isActive ? 'h-7 w-7' : 'h-6 w-6')}
                            />
                            {label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
