import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPL Portugal - Exam Prep',
  description: 'Local-first PPL exam preparation for Portugal - NAV/IPMA resources, drills, and flashcards',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
