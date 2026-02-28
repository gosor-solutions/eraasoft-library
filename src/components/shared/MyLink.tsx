import { Link } from "react-router";

export function MyLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
