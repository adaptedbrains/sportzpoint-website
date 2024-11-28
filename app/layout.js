import "./globals.css";
import LayoutClient from "./layout-client";

export const metadata = {
  title: "Sportzpoint - Latest Sports News, Live Scores & Updates",
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#39803E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LayoutClient>{children}</LayoutClient>
    </html>
  );
}
