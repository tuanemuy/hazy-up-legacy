import { useContext } from "react";
import { css } from "@emotion/css";
import { Section } from "@/core/editor";
import { ConfigContext } from "@/core";
import { EditorContext } from "./context";

import { Box, Center, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SectionView } from "./SectionView";
import { Selectable } from "./Selectable";

type Props = {
  structure: Section[];
};

export function Viewer({ structure }: Props) {
  const { addSection } = useContext(EditorContext);
  const { useCase } = useContext(ConfigContext);
  const config = useCase.useGetByUser("");

  if (config.isLoading) {
    return <p>Loading...</p>;
  }

  if (config.isError || !config.data) {
    return <p>An error has occured.</p>;
  }

  const size = config.data.size;
  const color = config.data.color;

  const cssVars = css`
    --grid: ${size.grid}px;
    --base-padding: ${size.basePadding}px;
    --theme: ${color.theme};
    --accent: ${color.accent};
    --background: ${color.background};
    --black: ${color.black};
    --white: ${color.white};
  `;

  return (
    <Box className={cssVars}>
      {structure.map((section, i) => {
        return (
          <Selectable key={i.toString()} index={i}>
            <SectionView section={section} />
          </Selectable>
        );
      })}

      <Center paddingY={`${size.grid * 2}px`}>
        <IconButton
          aria-label="Add row"
          icon={<AddIcon />}
          onClick={(e) => {
            addSection();
            e.stopPropagation();
          }}
        />
      </Center>
    </Box>
  );
}
