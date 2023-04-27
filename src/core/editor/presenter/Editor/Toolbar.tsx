import { useContext } from "react";
import { Box, Flex, Divider, Text, Icon } from "@chakra-ui/react";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RxSection, RxColumns, RxComponent2 } from "react-icons/rx";
import { Section, Columns, Component } from "@/core/editor";
import { EditorContext } from "./context";
import { Size, Color } from "@/config";

import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type Props = {};

export function Toolbar({}: Props) {
  const { selected, undo, redo } = useContext(EditorContext);

  return (
    <Box width="100%" boxShadow="0px 0px 4px rgba(0, 0, 0, .25)">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={`${Size.grid * 0.25}px ${Size.grid * 1}px`}
        backgroundColor={Color.white}
      >
        <Text fontSize="sm">ページ名</Text>

        <Flex>
          <IconButton
            aria-label="undo"
            icon={<ArrowBackIcon boxSize="4" />}
            size="xs"
            backgroundColor="transparent"
            onClick={undo}
          />
          <IconButton
            aria-label="redo"
            icon={<ArrowForwardIcon boxSize="4" />}
            size="xs"
            backgroundColor="transparent"
            onClick={redo}
          />
        </Flex>
      </Flex>

      <Divider />

      <Flex
        width="100%"
        height={`${Size.grid * 3}px`}
        padding={`${Size.grid * 0.5}px ${Size.grid * 1}px`}
        backgroundColor={Color.white}
        alignItems="center"
        gap={`${Size.grid * 1}px`}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!selected && (
            <>
              <Icon as={HiOutlineDocumentDuplicate} boxSize={5} />
              <Text fontSize=".5rem">Page</Text>
            </>
          )}

          {selected instanceof Section && (
            <>
              <Icon as={RxSection} />
              <Text fontSize=".5rem">Section</Text>
            </>
          )}

          {selected instanceof Columns && (
            <>
              <Icon as={RxColumns} />
              <Text fontSize=".5rem">Columns</Text>
            </>
          )}

          {selected instanceof Component && (
            <>
              <Icon as={RxComponent2} />
              <Text fontSize=".5rem">Component</Text>
            </>
          )}
        </Flex>

        <Divider orientation="vertical" />

        <p>設定</p>
      </Flex>
    </Box>
  );
}
