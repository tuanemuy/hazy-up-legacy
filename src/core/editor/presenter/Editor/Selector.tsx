import { useContext } from "react";
import { ID, Node } from "@/core/editor";
import { EditorContext } from "./context";
import { Color } from "@/config";

import { Box } from "@chakra-ui/react";
import { Actions } from "./Actions";

type SelectorProps = {
  node: Node<any>;
  zIndex: string;
};

export function Selector({ node, zIndex }: SelectorProps) {
  const { nodeMap, focusedNode, focus } = useContext(EditorContext);
  const isFocused = focusedNode?.id === node.id;
  const isChildrenFocused =
    Object.values(nodeMap)
      .filter((n: Node<any>) => n.parentId === node.id)
      .filter((n: Node<any>) => n.id === focusedNode?.id).length > 0;

  const onClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    focus(node);
  };

  return (
    <>
      <Box
        position="absolute"
        zIndex={zIndex}
        top="0"
        left="0"
        width="100%"
        height="100%"
        onClick={onClick}
      />

      <Box
        position="absolute"
        zIndex="998"
        top="0"
        left="0"
        width="100%"
        height="100%"
        border={
          isFocused ? `2px solid ${Color.accent}` : `3px solid transparent`
        }
        pointerEvents="none"
      />

      {isChildrenFocused && (
        <Box
          position="absolute"
          zIndex="997"
          top="-6px"
          left="-6px"
          width="calc(100% + 12px)"
          height="calc(100% + 12px)"
          border={`6px solid ${Color.accent}`}
          opacity="0.5"
          pointerEvents="none"
        />
      )}

      {isFocused && <Actions />}
    </>
  );
}
