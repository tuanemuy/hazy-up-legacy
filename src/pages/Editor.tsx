import { Box } from "@chakra-ui/react";
import { Editor } from "@/core/editor/presenter/Editor";

type Props = {};

export const EditorPage = ({}: Props) => {
  return (
    <Box width="100vw" height="100vh" overflow="hidden">
      <Editor />
    </Box>
  );
};
