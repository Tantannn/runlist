import {
  DragSortTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { DragDropProvider } from "@dnd-kit/react";
import { Collapse, message, Table } from "antd";
import type { CollapseProps } from "antd/lib";
import { useRef, useState, type Key } from "react";
import DraggableCollapse from "./DraggableCollapse";

const Content = () => {
  const [items, setItems] = useState([
    { id: "1", label: "First Collapse", content: "Content for the first one." },
    {
      id: "2",
      label: "Second Collapse",
      content: "Content for the second one.",
    },
  ]);
  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const source = event.operation?.source;
    if (source?.sortable) {
      // The new API tracks the initial and final index for you
      const { initialIndex, index: newIndex } = source.sortable;

      if (initialIndex !== newIndex) {
        setItems((prev) => {
          const updated = [...prev];
          const [movedItem] = updated.splice(initialIndex, 1);
          updated.splice(newIndex, 0, movedItem);
          return updated;
        });
      }
    }
  };
  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {items.map((item, index) => (
        <DraggableCollapse
          // key={item.id}
          id={item.id}
          index={index}
          // label={item.label}
        >
        </DraggableCollapse>
      ))}
    </DragDropProvider>
  );
};

export default Content;
