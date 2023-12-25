import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <Link href="/">صفحه اصلی</Link>
        <Link href="/test">صفحه تست</Link>
      </div>
      {children}
    </div>
  );
}
