import { useContext } from "react";
import { EditorContext } from "./context";
import { AddressContext } from "./Selectable";
import { Color } from "@/config";

import { Box } from "@chakra-ui/react";
import { Actions } from "./Actions";

type SelectorProps = {
  zIndex: string;
};

export function Selector({ zIndex }: SelectorProps) {
  const editorState = useContext(EditorContext);
  const address = useContext(AddressContext);
  const isSelected =
    JSON.stringify(editorState.selectedIndex) === JSON.stringify(address);
  const isChildrenSelected =
    JSON.stringify(editorState.selectedParentIndex) === JSON.stringify(address);

  const onClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    if (editorState.selectedIndex && editorState.selectedIndex.length > 0) {
      for (let i = 0; i < editorState.selectedIndex.length; i++) {
        if (editorState.selectedIndex[i] !== address[i]) {
          editorState.setSelectedIndex(address.slice(0, i + 1));
          return;
        }
      }

      editorState.setSelectedIndex(
        address.slice(0, editorState.selectedIndex.length + 1)
      );
    } else {
      editorState.setSelectedIndex([address[0]]);
    }
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
          isSelected ? `2px solid ${Color.accent}` : `3px solid transparent`
        }
        pointerEvents="none"
      />

      {isChildrenSelected && (
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

      {isSelected && <Actions />}
    </>
  );
}
