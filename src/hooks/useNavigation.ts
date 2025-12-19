"use client";

import { useRouter } from "next/navigation";
import { useNavigationLoading } from "@/providers/NavigationLoadingProvider";

export function useNavigation() {
  const router = useRouter();
  const { setNavigating } = useNavigationLoading();

  const push = (href: string) => {
    setNavigating(true);
    router.push(href);
  };

  const replace = (href: string) => {
    setNavigating(true);
    router.replace(href);
  };

  const back = () => {
    setNavigating(true);
    router.back();
  };

  return {
    push,
    replace,
    back,
  };
}
