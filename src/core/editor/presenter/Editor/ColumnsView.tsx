import { useContext } from "react";
import { Columns, Component } from "@/core/editor";
import { ConfigContext } from "@/core";
import { Size, Color } from "@/config";
import { EditorContext } from "./context";

import { Flex, Box, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ComponentView } from "./ComponentView";
import { Selectable } from "./Selectable";
import { Selector } from "./Selector";

type ColumnsProps = {
  columns: Columns;
};

export function ColumnsView({ columns }: ColumnsProps) {
  const editorState = useContext(EditorContext);
  const Config = useContext(ConfigContext);
  const config = Config.useCase.useGetByUser("");

  if (config.data) {
    const size = config.data.size;
    const itemWidth =
      columns.repeat && columns.repeat.getValueOfScreen(editorState.screen) > 0
        ? `calc((100% - ${
            columns.gap.getValueOfScreen(editorState.screen) *
            size.grid *
            (columns.repeat.getValueOfScreen(editorState.screen) - 1)
          }px) / ${columns.repeat.getValueOfScreen(editorState.screen)})`
        : "auto";

    return (
      <Box
        position="relative"
        width={columns.repeat ? "100%" : "auto"}
        paddingTop={`${
          columns.spacing.getValueOfScreen(editorState.screen) *
          size.basePadding
        }px`}
      >
        <Selector zIndex="1" />

        <Flex
          justifyContent={columns.justifyContent}
          alignItems={columns.alignItems}
          flexWrap={columns.flexWrap ? "wrap" : "nowrap"}
          position="relative"
          gap={
            columns.gap
              ? `${
                  columns.gap.getValueOfScreen(editorState.screen) * size.grid
                }px`
              : "0"
          }
        >
          {columns.children.length > 0 &&
            columns.children.map((c, i) => (
              <Flex
                key={i.toString()}
                position="relative"
                zIndex="2"
                flexShrink={columns.flexWrap ? 0 : 1}
                flexGrow={c instanceof Columns && c.repeat ? 1 : 0}
                width={itemWidth}
                maxWidth="100%"
              >
                <Selectable key={i.toString()} index={i}>
                  {c instanceof Columns && <ColumnsView columns={c} />}

                  {c instanceof Component && <ComponentView component={c} />}
                </Selectable>
              </Flex>
            ))}

          {columns.children.length < 1 && (
            <Flex
              position="relative"
              zIndex="2"
              justifyContent="center"
              alignItems="center"
              flexShrink={columns.flexWrap ? 0 : 1}
              width={itemWidth}
              maxWidth="100%"
              padding={`${Size.grid * 3}px`}
              border={`3px dashed ${Color.theme}`}
              pointerEvents="none"
            >
              <IconButton
                aria-label="Add columns"
                icon={<AddIcon />}
                alignSelf="center"
                pointerEvents="auto"
              />
            </Flex>
          )}
        </Flex>
      </Box>
    );
  } else {
    return <p>Loading...</p>;
  }
}
