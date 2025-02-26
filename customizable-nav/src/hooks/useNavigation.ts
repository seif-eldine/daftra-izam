
import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  title: string;
  target?: string;
  children?: NavItem[];
  visible?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useNavigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const response = await fetch(`${API_URL}nav`);
        if (!response.ok) throw new Error("Failed to fetch navigation");
        const data = await response.json();
        console.log("El Data links fetched :", data)
        const filteredNavItems = data.filter((item: NavItem) => item.visible !== false);
        setNavItems(filteredNavItems);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchNavigation();
  }, []);

  return { navItems, loading, error };
}
