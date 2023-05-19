import { useContext, useEffect, useState } from "react";
import {
  Node,
  Component,
  GenerateTemplateModuleArgs,
  TemplateModule,
} from "@/core/editor";
import { Color, Size } from "@/config";
import { EditorContext } from "./context";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Selector } from "./Selector";

type ComponentViewProps = {
  node: Node<Component>;
};

export function ComponentView({ node }: ComponentViewProps) {
  const { screen } = useContext(EditorContext);
  const [tm, setTm] = useState<TemplateModule | null>(null);

  const component = node.role;

  useEffect(() => {
    (async () => {
      try {
        const args: GenerateTemplateModuleArgs = await import(
          component.template.url
        );
        setTm(TemplateModule.generate(args));
      } catch (e) {
        setTm(null);
      }
    })();
  }, [node.role.template]);

  return (
    <Box position="relative" width="100%" height="100%">
      {tm instanceof TemplateModule && (
        <tm.Template {...component.props} className={tm.getStyle(screen)} />
      )}

      {tm === null && (
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          padding={`${Size.grid * 3}px`}
          border={`3px dashed ${Color.theme}`}
        >
          <Spinner />
        </Flex>
      )}

      <Selector node={node} zIndex="2" />
    </Box>
  );
}
