import { useContext, useState, useEffect } from "react";
import { Node, Page } from "@/core/editor";
import { Size } from "@/config";
import { EditorContext } from "./context";

import { Flex, Text, Input } from "@chakra-ui/react";

type Props = {
  node: Node<Page>;
};

export function PageConfig({ node }: Props) {
  const [name, setName] = useState(node.role.name);
  const [path, setPath] = useState(node.role.path);

  const { nodeMap, updateNodeMap } = useContext(EditorContext);

  useEffect(() => {
    const newNodeMap = { ...nodeMap };
    newNodeMap[node.id] = Node.generate({
      ...node,
      role: Page.generate({
        name,
        path,
      }),
    });
    updateNodeMap(newNodeMap);
  }, [name, path]);

  return (
    <Flex gap={`${Size.grid}px`}>
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="sm"
        />
        <Text fontSize=".5rem">Name</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <Input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          size="sm"
        />
        <Text fontSize=".5rem">Path</Text>
      </Flex>
    </Flex>
  );
}
