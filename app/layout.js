import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Fantasy Empire",
  description:
    "Città, carte e dungeon infiniti. Beta gratuita 18+, Italia. Nessun pagamento in Fase 0.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
