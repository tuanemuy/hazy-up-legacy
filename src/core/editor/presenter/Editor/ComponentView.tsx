import { useContext, useEffect, useState } from "react";
import {
  Component,
  GenerateTemplateModuleArgs,
  TemplateModule,
} from "@/core/editor";
import { Color, Size } from "@/config";
import { EditorContext } from "./context";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Selector } from "./Selector";

type ComponentViewProps = {
  component: Component;
};

export function ComponentView({ component }: ComponentViewProps) {
  const editorState = useContext(EditorContext);
  const [tm, setTm] = useState<TemplateModule | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const args: GenerateTemplateModuleArgs = await import(component.path);
        setTm(TemplateModule.generate(args));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Box position="relative" width="100%" height="100%">
      {tm instanceof TemplateModule && (
        <tm.Template
          {...component.props}
          className={tm.getStyle(editorState.screen)}
        />
      )}

      {tm === undefined && (
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

      {tm === null && (
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          padding={`${Size.grid * 3}px`}
          border={`3px dashed ${Color.theme}`}
        >
          <p>！</p>
        </Flex>
      )}
      <Selector zIndex="2" />
    </Box>
  );
}
