import { useContext } from "react";
import { Node, Section, Columns } from "@/core/editor";
import { ConfigContext } from "@/core";
import { EditorContext } from "./context";

import { Box, Image } from "@chakra-ui/react";
import { Selector } from "./Selector";
import { ColumnsView } from "./ColumnsView";

type Props = {
  node: Node<Section>;
};

export function SectionView({ node }: Props) {
  const { useCase } = useContext(ConfigContext);
  const { screen, getChildren } = useContext(EditorContext);
  const config = useCase.useGetByUser("");

  const section: Section = node.role;
  const children = getChildren(node);

  if (config.isLoading) {
    return <p>Loading...</p>;
  }

  if (config.isError || !config.data || !(section instanceof Section)) {
    return <p>An error has occured.</p>;
  }

  const size = config.data.size;

  return (
    <Box
      as="section"
      position="relative"
      padding={`${
        section.padding.getValueOfScreen(screen)[0] * size.basePadding
      }px  0 ${
        section.padding.getValueOfScreen(screen)[1] * size.basePadding
      }px 0`}
    >
      <Box
        position="relative"
        zIndex="4"
        width={section.isWrapped ? screen.getWrap() : "100%"}
        margin="0 auto"
      >
        {children.length > 0 &&
          children.map((c) => <ColumnsView key={c.id} node={c} />)}
      </Box>

      <Selector node={node} zIndex="3" />

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
