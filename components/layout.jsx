import { Inter } from "next/font/google";

// If you need custom font settings
const fontHeading = Inter({
  subsets: ["latin"],
  weight: ["400", "700"], // Use any weights you need
});

export default function Layout({ children }) {
  return (
    <div className={fontHeading.className}>
      {children}
    </div>
  );
}
