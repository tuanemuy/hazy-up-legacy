import { useContext, useState, useEffect } from "react";
import { ConfigContext } from "@/core";
import { Node, Columns } from "@/core/editor";
import { Size } from "@/config";
import { EditorContext } from "./context";

import {
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightAddon,
  Select,
  Switch,
} from "@chakra-ui/react";

type Props = {
  node: Node<Columns>;
};

export function ColumnsConfig({ node }: Props) {
  const { useCase } = useContext(ConfigContext);
  const { screen, updateNode } = useContext(EditorContext);
  const config = useCase.useGetByUser("");

  const initialSpacing = node.role.spacing.getValueOfScreen(screen);
  const initialRepeat = node.role.repeat.getValueOfScreen(screen);
  const initialGap = node.role.gap.getValueOfScreen(screen);

  const [spacing, setSpacing] = useState(initialSpacing);
  const [justifyContent, setJustifyContent] = useState(
    node.role.justifyContent
  );
  const [alignItems, setAlignItems] = useState(node.role.alignItems);
  const [repeat, setRepeat] = useState(initialRepeat);
  const [gap, setGap] = useState(initialGap);
  const [flexWrap, setFlexWrap] = useState(node.role.flexWrap);

  useEffect(() => {
    const initialSpacing = node.role.spacing.getValueOfScreen(screen);
    const initialRepeat = node.role.repeat.getValueOfScreen(screen);
    const initialGap = node.role.gap.getValueOfScreen(screen);

    setSpacing(initialSpacing);
    setRepeat(initialRepeat);
    setGap(initialGap);
  }, [screen]);

  useEffect(() => {
    updateNode(
      node.id,
      Node.generate({
        ...node,
        role: Columns.generate({
          spacing: node.role.spacing.replaceValueOfScreen(screen, spacing),
          justifyContent,
          alignItems,
          repeat: node.role.repeat.replaceValueOfScreen(screen, repeat),
          gap: node.role.gap.replaceValueOfScreen(screen, gap),
          flexWrap,
        }),
      })
    );
  }, [spacing, justifyContent, alignItems, repeat, gap, flexWrap]);

  if (config.isLoading) {
    return <p>Loading...</p>;
  }

  if (config.isError || !config.data) {
    return <p>An error has occured.</p>;
  }

  return (
    <Flex alignItems="center" gap={`${Size.grid}px`}>
      <Flex
        flexDirection="column"
        alignItems="center"
        width={`${Size.grid * 6}px`}
      >
        <InputGroup size="sm">
          <Input
            type="number"
            min="0"
            value={spacing}
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
          />
          <InputRightAddon children="box" />
        </InputGroup>
        <Text fontSize=".5rem">Spacing</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        width={`${Size.grid * 9}px`}
      >
        <Select
          value={justifyContent}
          onChange={(e) => setJustifyContent(e.target.value)}
          size="sm"
        >
          <option value="normal">normal</option>
          <option value="flex-start">start</option>
          <option value="flex-end">end</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
          <option value="space-evenly">space-evenly</option>
          <option value="stretch">stretch</option>
        </Select>
        <Text fontSize=".5rem">Justify content</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        width={`${Size.grid * 9}px`}
      >
        <Select
          value={alignItems}
          onChange={(e) => setAlignItems(e.target.value)}
          size="sm"
        >
          <option value="normal">normal</option>
          <option value="flex-start">start</option>
          <option value="flex-end">end</option>
          <option value="center">center</option>
          <option value="baseline">baseline</option>
          <option value="stretch">stretch</option>
        </Select>
        <Text fontSize=".5rem">Align items</Text>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center" gap={`${Size.grid * 0.5}px`}>
          <Switch
            isChecked={repeat > -1}
            onChange={(e) => setRepeat(e.target.checked ? 3 : -1)}
            size="sm"
          />
          {repeat > -1 && (
            <Input
              type="number"
              min="1"
              value={repeat || 1}
              onChange={(e) => setRepeat(parseInt(e.target.value, 10))}
              size="sm"
              width={`${Size.grid * 3}px`}
            />
          )}
        </Flex>
        <Text fontSize=".5rem">Repeat</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        width={`${Size.grid * 6}px`}
      >
        <InputGroup size="sm">
          <Input
            type="number"
            min="0"
            value={gap}
            onChange={(e) => setGap(parseFloat(e.target.value))}
          />
          <InputRightAddon children="grid" />
        </InputGroup>
        <Text fontSize=".5rem">Gap</Text>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        <Switch
          type="number"
          isChecked={flexWrap}
          onChange={(e) => setFlexWrap(e.target.checked)}
        />
        <Text fontSize=".5rem">Flex wrap</Text>
      </Flex>
    </Flex>
  );
}
