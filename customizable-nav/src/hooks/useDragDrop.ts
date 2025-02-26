/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggedItem {
  id: string;
  index: number;
  parentId?: string;
}

export function useDragDrop(
  id: string,
  index: number,
  moveItem: (dragId: string, hoverId: string, parentId?: string) => void,
  isEditMode: boolean,
  parentId?: string,
  onDrop?: (id: string, fromIndex: number, toIndex: number) => void
) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DraggedItem>({
    accept: "ACCORDION_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.id !== id && isEditMode) {
        moveItem(draggedItem.id, id, draggedItem.parentId);
      }
    },
    drop: (draggedItem) => {
      if (onDrop && isEditMode) {
        onDrop(draggedItem.id, draggedItem.index, index);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ACCORDION_ITEM",
    item: { id, index, parentId },
    canDrag: isEditMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return ref;
}