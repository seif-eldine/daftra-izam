import { FC } from "react";
import AccordionBasic from "@/components/AccordionBasic/AccordionBasic";
import { useDragDrop } from "@/hooks/useDragDrop";
import { NavItem } from "@/hooks/useNavigation";

interface DraggableAccordionProps {
  index: number;
  item: NavItem;
  moveItem: (dragId: string, hoverId: string, parentId?: string) => void;
  onDrop?: (id: string, fromIndex: number, toIndex: number) => void;
  isEditMode: boolean;
}

const DraggableAccordion: FC<DraggableAccordionProps> = ({
  item,
  index,
  moveItem,
  isEditMode,
  onDrop,
}) => {
  const ref = useDragDrop(item.id, index, moveItem, isEditMode, undefined, onDrop);

  return (
    <div ref={ref} style={{ cursor: isEditMode ? "grab" : "default", opacity: 1 }}>
      <AccordionBasic
        id={item.id}
        header={item.title}
        expand={false}
        item={item}
        expandable={(item.children?.length ?? 0) > 0}
        moveItem={moveItem}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default DraggableAccordion;