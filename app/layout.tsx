import './globals.css';

import SessionProviderWrapper from "../SessionProvider/SessionProviderWrapper";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <SessionProviderWrapper>
        <html lang="en">
        <body>{children}</body>
        </html>
      </SessionProviderWrapper>

  );
}
