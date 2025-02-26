/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "./Sidebar.module.scss";
import { useNavigation } from "@/hooks/useNavigation";
import { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableAccordion from "../DraggableAccordion/DraggableAccordion";

export interface NavItem {
  id: string;
  title: string;
  target?: string;
  visible?: boolean;
  children?: NavItem[];
}

// I create the static data outside of the component to NOT be tracked
const apiUrl = "http://localhost:8081/";

const trackDragDrop = async (id: string, from: number, to: number) => {
  try {
    await fetch(`${apiUrl}track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, from, to }),
    });
  } catch (error) {
    console.error("Error tracking drag & drop:", error);
  }
};

const saveNavigation = async (navItems: NavItem[]) => {
  try {
    await fetch(`${apiUrl}nav`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(navItems),
    });
  } catch (error) {
    console.error("Error saving navigation:", error);
  }
};

export default function Sidebar() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { navItems, loading, error } = useNavigation();
  const [items, setItems] = useState<NavItem[]>([]);
  const [originalItems, setOriginalItems] = useState<NavItem[]>([]);

  useEffect(() => {
    setItems(navItems);
    setOriginalItems(navItems); 
  }, [navItems]);

  const moveItem = useCallback(
    (dragId: string, hoverId: string) => {
      setItems((prevItems) => {
        const updatedItems = JSON.parse(JSON.stringify(prevItems));

        const findParent = (items: NavItem[], id: string): NavItem | null => {
          for (const item of items) {
            if (item.children?.some((child) => child.id === id)) return item;
            const found = item.children ? findParent(item.children, id) : null;
            if (found) return found;
          }
          return null;
        };

        const dragParent = findParent(updatedItems, dragId);
        const hoverParent = findParent(updatedItems, hoverId);

        if (dragParent?.id !== hoverParent?.id) return updatedItems;

        const list = dragParent ? dragParent.children! : updatedItems;
        const dragIndex = list.findIndex((item: any) => item.id === dragId);
        const hoverIndex = list.findIndex((item: any) => item.id === hoverId);

        if (dragIndex === -1 || hoverIndex === -1) return updatedItems;

        const [movedItem] = list.splice(dragIndex, 1);
        list.splice(hoverIndex, 0, movedItem);

        return updatedItems;
      });
    },
    []
  );

  const handleDrop = (id: string, fromIndex: number, toIndex: number) => {
    if (fromIndex !== toIndex) {
      trackDragDrop(id, fromIndex, toIndex);
    }
  };

  const handleSave = () => {
    saveNavigation(items);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setItems(originalItems);
    setIsEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error} please reload</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <aside className={`${styles.sidebar} d-flex flex-column p-3`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={styles.menuTitle}>Menu</h5>
          {isEditMode ? (
            <div className="d-flex">
              <div className={`${styles.cancelBtn} bi bi-x`} onClick={handleCancel}></div>
              <div className={`${styles.saveBtn} bi bi-check`} onClick={handleSave}></div>
            </div>
          ) : (
            <button className={styles.settingsBtn} onClick={() => setIsEditMode(true)}>
              <i className="bi bi-gear"></i>
            </button>
          )}
        </div>

        <div className={styles.accordionWrapper}>
          {items.map((item, index) => (
            <div className="mb-2" key={item.id}>
              <DraggableAccordion
                key={item.id}
                index={index}
                item={item}
                moveItem={moveItem}
                onDrop={handleDrop}
                isEditMode={isEditMode}
              />
            </div>
          ))}
        </div>
      </aside>
    </DndProvider>
  );
}