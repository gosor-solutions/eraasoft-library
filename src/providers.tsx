import QueryProvider from "./providers/QueryProvider";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
