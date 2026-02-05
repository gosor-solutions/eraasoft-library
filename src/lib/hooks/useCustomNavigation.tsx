import { useRouter } from "next/navigation";

export function useCustomNavigation() {
  const router = useRouter();
  return router.push;
}
