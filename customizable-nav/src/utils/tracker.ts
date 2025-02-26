/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const trackDragDrop = async (id: number, from: number, to: number) => {
    try {
      const response = await fetch(`${API_URL}track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, from, to }),
      });
      if (!response.ok) throw new Error("Failed to track movement");
    } catch (error) {
      console.error("Error tracking drag & drop:", error);
    }
  };
  
  export const saveNavTree = async (navTree: any[]) => {
    try {
      const response = await fetch(`${API_URL}nav`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(navTree),
      });
      if (!response.ok) throw new Error("Failed to save navigation");
    } catch (error) {
      console.error("Error saving navigation:", error);
    }
  };
  