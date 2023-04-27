import { useContext } from "react";
import { Section } from "@/core/editor";
import { ConfigContext } from "@/core";
import { EditorContext } from "./context";

import { Box, Image } from "@chakra-ui/react";
import { ColumnsView } from "./ColumnsView";
import { Selectable } from "./Selectable";
import { Selector } from "./Selector";

type Props = {
  section: Section;
};

export function SectionView({ section }: Props) {
  const { useCase } = useContext(ConfigContext);
  const editorState = useContext(EditorContext);
  const config = useCase.useGetByUser("");

  if (config.isLoading) {
    return <p>Loading...</p>;
  }

  if (config.isError || !config.data) {
    return <p>An error has occured.</p>;
  }

  const size = config.data.size;

  return (
    <Box
      as="section"
      position="relative"
      padding={`${
        section.padding.getValueOfScreen(editorState.screen)[0] *
        size.basePadding
      }px  0 ${
        section.padding.getValueOfScreen(editorState.screen)[1] *
        size.basePadding
      }px 0`}
    >
      <Box
        position="relative"
        zIndex="4"
        width={section.isWrapped ? editorState.screen.getWrap() : "100%"}
        margin="0 auto"
      >
        {section.children.length > 0 &&
          section.children.map((child, j) => (
            <Selectable key={j.toString()} index={j}>
              <ColumnsView columns={child} />
            </Selectable>
          ))}
      </Box>

      <Selector zIndex="3" />

      {section.background && (
        <Box
          position="absolute"
          top="0"
          left="0"
          zIndex="2"
          width="100%"
          height="100%"
          background={section.background}
        />
      )}

      {section.backgroundImage && (
        <Box
          position="absolute"
          zIndex="1"
          top="0"
          left="0"
          width="100%"
          height="100%"
        >
          <Image
            src={section.backgroundImage.src}
            srcSet={section.backgroundImage.getSrcset()}
            alt="背景"
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </Box>
      )}
    </Box>
  );
}
