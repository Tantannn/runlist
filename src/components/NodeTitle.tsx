import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd/lib";
import Dropdown from 'antd/es/dropdown';
import { useState } from "react";
import type { DataNode } from "antd/es/tree";

const NodeTitle = ({
  node,
  activeMenuRef,
}: {
  node: DataNode;
  activeMenuRef: React.MutableRefObject<((open: boolean) => void) | null>;
}): React.ReactNode => {
  const [open, setOpen] = useState(false);

  const count = node.children?.length ?? 0;
  const isParent = count > 0;

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      if (activeMenuRef.current && activeMenuRef.current !== setOpen) {
        activeMenuRef.current(false);
      }
      activeMenuRef.current = setOpen;
    } else {
      if (activeMenuRef.current === setOpen) {
        activeMenuRef.current = null;
      }
    }
    setOpen(newOpen);
  };

  const menuItems = [
    { key: "add-child", label: "Add child block" },
    { key: "delete", label: "Delete block", danger: true },
  ];

  return (
    <span className="group flex w-full items-center gap-1">
      <span className="truncate">{node.title as string}</span>

      <Dropdown
        menu={{
          items: menuItems,
          onClick: (info) => {
            info.domEvent.stopPropagation();
            console.log(`Action: ${info.key} on block: ${node.key}`);
            setOpen(false);
          },
        }}
        trigger={["click"]}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined />}
          aria-label={`Add under ${node.title as string}`}
          className={`opacity-0 group-hover:opacity-100 ${isParent ? "" : "ml-auto"} ${open ? "opacity-100" : ""}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    </span>
  );
};

export default NodeTitle
