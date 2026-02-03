import { Link } from "react-router";

export function MyLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return <Link to={to}>{children}</Link>;
}
