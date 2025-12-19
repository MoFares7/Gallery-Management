"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface NavigationLoadingContextType {
  isNavigating: boolean;
  setNavigating: (value: boolean) => void;
}

const NavigationLoadingContext = createContext<
  NavigationLoadingContextType | undefined
>(undefined);

export function NavigationLoadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setPrevPathname(pathname);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  const setNavigating = (value: boolean) => {
    setIsNavigating(value);
  };

  return (
    <NavigationLoadingContext.Provider value={{ isNavigating, setNavigating }}>
      {children}
    </NavigationLoadingContext.Provider>
  );
}

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext);
  if (context === undefined) {
    throw new Error(
      "Error"
    );
  }
  return context;
}
