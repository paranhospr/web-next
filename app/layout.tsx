
import "./globals.css";
import Providers from "./providers";
export const metadata = { title: "Paranhos PR" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="pt-BR"><body><Providers>{children}</Providers></body></html>);
}
