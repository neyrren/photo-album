import type { Metadata } from 'next';
import { ReactNode } from 'react';
// @ts-expect-error: allow side-effect css import without type declarations
import './globals.css';

export const metadata: Metadata = {
  title: 'PhotoAlbum - Organize Your Memories',
  description: 'A modern photo album application built with Next.js and TypeScript',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}