import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Repository Search | Itaú",
  description: "Busque e explore repositórios no GitHub de forma fácil e acessível. Aplicação desenvolvida com Next.js e TypeScript.",
  keywords: ["github", "repositórios", "busca", "pesquisa", "open source"],
  authors: [{ name: "Itaú" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={instrumentSans.className}>
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
