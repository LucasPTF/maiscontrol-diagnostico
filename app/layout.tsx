import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    title: "Diagnóstico dos 4 Furos do Balde | MaisControl",
    description: "Descubra onde sua empresa está perdendo dinheiro e qual problema resolver primeiro em uma aula prática de 2h30 com Wellington Camaleão.",
    openGraph: {
      title: "Diagnóstico dos 4 Furos do Balde | MaisControl",
      description: "Sua empresa fatura. Descubra onde o dinheiro está vazando e por onde começar.",
      type: "website",
      locale: "pt_BR",
      url: origin,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Diagnóstico dos 4 Furos do Balde — aula ao vivo MaisControl" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Diagnóstico dos 4 Furos do Balde | MaisControl",
      description: "Sua empresa fatura. Descubra onde o dinheiro está vazando e por onde começar.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
