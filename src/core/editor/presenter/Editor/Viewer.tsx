import { useContext, useState, useEffect } from "react";
import { css } from "@emotion/css";
import { Node, Page, Section, Columns, Component } from "@/core/editor";
import { ConfigContext } from "@/core";
import { EditorContext } from "./context";

import { Box, Center, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SectionView } from "./SectionView";
import { ColumnsView } from "./ColumnsView";
import { ComponentView } from "./ComponentView";

type Props = {};

export function Viewer({}: Props) {
  const { rootId, nodeMap, getChildren, addSection } =
    useContext(EditorContext);
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

  const children = getChildren(nodeMap[rootId]);

  return (
    <Box className={cssVars}>
      {children.map((c) => {
        if (c.role instanceof Section) {
          return <SectionView key={c.id} node={c} />;
        } else if (c.role instanceof Columns) {
          return <ColumnsView key={c.id} node={c} />;
        } else if (c.role instanceof Component) {
          return <ComponentView key={c.id} node={c} />;
        } else {
          throw new Error("Unreachable");
        }
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
