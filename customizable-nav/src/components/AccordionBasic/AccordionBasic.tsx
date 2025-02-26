/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/navigation";
import styles from "./AccordionBasic.module.scss";
import { NavItem } from "@/hooks/useNavigation";
import DraggableChildItem from "../DraggableChildItem/DraggableChildItem";

interface AccordionBasicProps {
  id: string;
  header: string;
  expand?: boolean;
  item: NavItem;
  expandable?: boolean;
  moveItem: (dragId: string, hoverId: string, parentId?: string) => void;
  isEditMode: boolean; 
}

function AccordionBasic({
  item,
  header,
  expand,
  expandable = true,
  moveItem,
  isEditMode,
}: AccordionBasicProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const router = useRouter();

  const handleItemClick = (chatItem: NavItem) => {
    setActiveItem(chatItem.id);
    if (chatItem.target === "/") {
      router.push(`/dashboard`);
    } else {
      router.push(`/other`);
    }
  };

  return (
    <>
      {expandable ? (
        <div className={styles.accordionWrapper}>
          <Accordion
            defaultActiveKey={
              expandable ? (expand ? "0" : undefined) : undefined
            }
          >
            {" "}
            <Accordion.Item
              eventKey={expandable ? "0" : "no-expand"}
              className={styles.accordionItem}
            >
              <Accordion.Header
                className={styles.accordionHeader}
                aria-expanded={expandable && expand ? "true" : "false"}
              >
                {header}
              </Accordion.Header>

              {
                <Accordion.Body className={styles.accordionBody}>
                  {item.children?.map((child, idx) => (
                    <div key={child.id} className="py-2">
                      <DraggableChildItem
                        item={child}
                        index={idx}
                        parentId={item.id}
                        moveItem={moveItem}
                        isEditMode={isEditMode} 
                      />
                    </div>
                  ))}
                </Accordion.Body>
              }
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <div className={`${styles.simpleItem}`}>
          <span onClick={() => handleItemClick(item)} className={styles.link}>
            {header}
          </span>
        </div>
      )}
    </>
  );
}

export default AccordionBasic;
