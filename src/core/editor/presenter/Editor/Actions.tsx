import { useContext } from "react";
import { Section, Columns, Component } from "@/core/editor";
import { Size } from "@/config";
import { EditorContext } from "./context";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  AddIcon,
  DeleteIcon,
  CopyIcon,
} from "@chakra-ui/icons";

export function Actions() {
  const { selected, selectedParent, removeSelected } = useContext(EditorContext);

  return (
    <Box
      position="absolute"
      zIndex="999"
      right={`${Size.grid * 0.75}px`}
      bottom={`${Size.grid * 0.75}px`}
    >
      <Flex gap={`${Size.grid * 0.5}px`}>
        {(selectedParent === null || selectedParent instanceof Section) && (
          <>
            <IconButton aria-label="Move up" icon={<ArrowUpIcon />} />
            <IconButton aria-label="Move down" icon={<ArrowDownIcon />} />
          </>
        )}

        {selectedParent instanceof Columns && (
          <>
            {selectedParent.children.length > 1 && (
              <>
                <IconButton aria-label="Move left" icon={<ArrowBackIcon />} />
                <IconButton
                  aria-label="Move right"
                  icon={<ArrowForwardIcon />}
                />
              </>
            )}
          </>
        )}

        {(selected instanceof Section || selected instanceof Columns) && (
          <IconButton aria-label="Add" icon={<AddIcon />} />
        )}

        {selected instanceof Component && (
          <IconButton aria-label="Duplicate" icon={<CopyIcon />} />
        )}

        <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={removeSelected} />
      </Flex>
    </Box>
  );
}
