import { FC } from "react";
import { useDragDrop } from "@/hooks/useDragDrop";
import { NavItem } from "@/hooks/useNavigation";

interface DraggableChildItemProps {
  item: NavItem;
  parentId: string;
  index: number;
  moveItem: (dragId: string, hoverId: string, parentId?: string) => void;
  isEditMode: boolean;
}

const DraggableChildItem: FC<DraggableChildItemProps> = ({
  item,
  parentId,
  index,
  moveItem,
  isEditMode,
}) => {
  const ref = useDragDrop(item.id, index, moveItem, isEditMode, parentId);

  return (
    <div
      ref={ref}
      style={{ cursor: isEditMode ? "grab" : "default", opacity: 1 }}
    >
      <span>{item.title}</span>
    </div>
  );
};

export default DraggableChildItem;
