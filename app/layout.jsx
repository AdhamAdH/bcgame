import "@/styles/globals.css";

export const metadata = {
  title: "BC.GAME",
  description: "Crypto Casino Games & Casino Slot Games - Crypto Gambling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
