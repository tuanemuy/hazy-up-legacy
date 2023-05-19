import { useContext } from "react";
import {
  Node,
  Columns,
  Component,
  Template,
  Image,
} from "@/core/editor";
import { ConfigContext } from "@/core";
import { Size, Color } from "@/config";
import { EditorContext } from "./context";

import {
  Flex,
  Box,
  IconButton,
  Icon,
  Text,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverCloseButton,
  Portal,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { RxColumns, RxComponent2 } from "react-icons/rx";
import { ComponentView } from "./ComponentView";
import { Selector } from "./Selector";

type ColumnsProps = {
  node: Node<Columns>;
};

export function ColumnsView({ node }: ColumnsProps) {
  const { screen, getChildren, focusedNode, addColumns, addComponent } =
    useContext(EditorContext);
  const Config = useContext(ConfigContext);
  const config = Config.useCase.useGetByUser("");

  const columns: Columns = node.role;
  const children = getChildren(node);

  if (config.data) {
    const size = config.data.size;
    const itemWidth =
      columns.repeat && columns.repeat.getValueOfScreen(screen) > 0
        ? `calc((100% - ${
            columns.gap.getValueOfScreen(screen) *
            size.grid *
            (columns.repeat.getValueOfScreen(screen) - 1)
          }px) / ${columns.repeat.getValueOfScreen(screen)})`
        : "auto";

    return (
      <Box
        position="relative"
        width={columns.repeat ? "100%" : "auto"}
        paddingTop={`${
          columns.spacing.getValueOfScreen(screen) * size.basePadding
        }px`}
      >
        <Selector node={node} zIndex="1" />

        <Flex
          justifyContent={columns.justifyContent}
          alignItems={columns.alignItems}
          flexWrap={columns.flexWrap ? "wrap" : "nowrap"}
          position="relative"
          gap={
            columns.gap
              ? `${columns.gap.getValueOfScreen(screen) * size.grid}px`
              : "0"
          }
        >
          {children.length > 0 &&
            children.map((c, i) => (
              <Flex
                key={i.toString()}
                position="relative"
                zIndex="2"
                flexShrink={columns.flexWrap ? 0 : 1}
                flexGrow={c.role.repeat?.getValueOfScreen(screen) > 0 ? 1 : 0}
                width={itemWidth}
                maxWidth="100%"
              >
                {c.role instanceof Columns && <ColumnsView node={c} />}

                {c.role instanceof Component && <ComponentView node={c} />}
              </Flex>
            ))}

          {children.length < 1 && (
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
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Add columns"
                    icon={<AddIcon />}
                    alignSelf="center"
                    pointerEvents={
                      focusedNode?.id === node.id ? "auto" : "none"
                    }
                    disabled={focusedNode?.id !== node.id}
                    opacity={focusedNode?.id === node.id ? 1 : 0.5}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Flex gap={`${Size.grid * 0.5}px`}>
                        <Flex
                          direction="column"
                          alignItems="center"
                          gap={`${Size.grid * 0.5}px`}
                        >
                          <IconButton
                            aria-label="Add columns"
                            icon={<Icon as={RxColumns} />}
                            onClick={addColumns}
                          />
                          <Text fontSize="xs">Columns</Text>
                        </Flex>
                        <Flex
                          direction="column"
                          alignItems="center"
                          gap={`${Size.grid * 0.5}px`}
                        >
                          <IconButton
                            aria-label="Add component"
                            icon={<Icon as={RxComponent2} />}
                            onClick={() =>
                              addComponent({
                                template: Template.generate({
                                  name: "",
                                  url: "",
                                  thumbnail: Image.generate({
                                    src: "",
                                    assets: [],
                                  }),
                                }),
                                props: {},
                              })
                            }
                          />
                          <Text fontSize="xs">Component</Text>
                        </Flex>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Flex>
          )}
        </Flex>
      </Box>
    );
  } else {
    return <p>Loading...</p>;
  }
}
