import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export function Add() {
  return (
    <IconButton
      aria-label="Add row"
      icon={<AddIcon />}
      position="absolute"
      top="50%"
      right="0"
      transform="translateX(50%) translateY(-50%)"
    />
  );
}
