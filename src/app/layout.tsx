import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nyle Health PWA",
  description: "Multimodal clinical intake engine for Dr. Neha Jain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
