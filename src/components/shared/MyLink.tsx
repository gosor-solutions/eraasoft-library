import Link from "next/link";

export function MyLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return <Link href={to}>{children}</Link>;
}
