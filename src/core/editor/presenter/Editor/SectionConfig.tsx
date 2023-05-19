import { useContext, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ConfigContext } from "@/core";
import {
  Node,
  Section,
  Image,
  BackgroundColor,
  hexToRgba,
  rgbaToHexOpacity,
} from "@/core/editor";
import { Size } from "@/config";
import { EditorContext } from "./context";

import {
  Flex,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  Switch,
} from "@chakra-ui/react";
import { SelectImageDrawer } from "../SelectImageDrawer";

type Props = {
  node: Node<Section>;
};

export function SectionConfig({ node }: Props) {
  const { useCase } = useContext(ConfigContext);
  const { screen, updateNode, updateNodeTemporarily, setDraftNodeMap } =
    useContext(EditorContext);
  const config = useCase.useGetByUser("");
  const selectImageDisclousure = useDisclosure();

  const initialPadding = node.role.padding.getValueOfScreen(screen);
  const [topPadding, setTopPadding] = useState(initialPadding[0]);
  const [bottomPadding, setBottomPadding] = useState(initialPadding[1]);
  const [isWrapped, setIsWrapped] = useState(node.role.isWrapped);
  const [background, setBackground] = useState<BackgroundColor | null>(
    node.role.background ? rgbaToHexOpacity(node.role.background) : null
  );
  const [backgroundImage, setBackgroundImage] = useState(
    node.role.backgroundImage
  );
  const [isSemantic, setIsSemantic] = useState(node.role.isSemantic);

  const onFocus = (image: Image) => {
    updateNodeTemporarily(
      node.id,
      Node.generate({
        ...node,
        role: Section.generate({
          padding: node.role.padding.replaceValueOfScreen(screen, [
            topPadding,
            bottomPadding,
          ]),
          isWrapped,
          background: background
            ? hexToRgba(background.hex, background.opacity)
            : null,
          backgroundImage: image,
          isSemantic,
        }),
      })
    );
  };
  const onCloseSelectImage = () => {
    setDraftNodeMap(null);
    selectImageDisclousure.onClose();
  };
  const onSubmitSelectImage = (image: Image) => {
    setBackgroundImage(image);
    selectImageDisclousure.onClose();
  };

  useEffect(() => {
    const initialPadding = node.role.padding.getValueOfScreen(screen);
    const initialHeight = node.role.height.getValueOfScreen(screen);

    setTopPadding(initialPadding[0]);
    setBottomPadding(initialPadding[1]);
  }, [screen]);

  useEffect(() => {
    updateNode(
      node.id,
      Node.generate({
        ...node,
        role: Section.generate({
          padding: node.role.padding.replaceValueOfScreen(screen, [
            topPadding,
            bottomPadding,
          ]),
          isWrapped,
          background: background
            ? hexToRgba(background.hex, background.opacity)
            : null,
          backgroundImage,
          isSemantic,
        }),
      })
    );
  }, [
    topPadding,
    bottomPadding,
    isWrapped,
    background,
    backgroundImage,
    isSemantic,
  ]);

  if (config.isLoading) {
    return <p>Loading...</p>;
  }

  if (config.isError || !config.data) {
    return <p>An error has occured.</p>;
  }

  const userColor = config.data.color;

  return (
    <Flex alignItems="center" gap={`${Size.grid}px`}>
      <Flex flexDirection="column" alignItems="center">
        <Switch
          isChecked={isWrapped}
          onChange={(e) => setIsWrapped(e.target.checked)}
        />
        <Text fontSize=".5rem">Wrapped</Text>
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
            value={topPadding}
            onChange={(e) => setTopPadding(parseFloat(e.target.value))}
          />
          <InputRightAddon children="box" />
        </InputGroup>
        <Text fontSize=".5rem">Top padding</Text>
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
            value={bottomPadding}
            onChange={(e) => setBottomPadding(parseFloat(e.target.value))}
          />
          <InputRightAddon children="box" />
        </InputGroup>
        <Text fontSize=".5rem">Bottom padding</Text>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center" gap={`${Size.grid * 0.5}px`}>
          <Switch
            isChecked={background !== null}
            onChange={(e) =>
              setBackground(
                e.target.checked
                  ? {
                      hex: userColor.theme,
                      opacity: 1,
                    }
                  : null
              )
            }
          />
          <Input
            type="color"
            value={background?.hex || "#ffffff"}
            onChange={(e) =>
              setBackground((v) => {
                return v !== null
                  ? {
                      hex: e.target.value,
                      opacity: v.opacity,
                    }
                  : null;
              })
            }
            disabled={background === null}
            width={`${Size.grid * 4}px`}
            size="sm"
            list="user-color"
          />
          <datalist id="user-color">
            <option>{userColor.theme}</option>
            <option>{userColor.accent}</option>
            <option>{userColor.background}</option>
            <option>{userColor.black}</option>
            <option>{userColor.white}</option>
          </datalist>

          <Input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={background ? background.opacity : "1"}
            onChange={(e) =>
              setBackground((v) => {
                return v !== null
                  ? {
                      hex: v.hex,
                      opacity: parseFloat(e.target.value),
                    }
                  : null;
              })
            }
            disabled={background === null}
            width={`${Size.grid * 4}px`}
            size="sm"
          />
        </Flex>
        <Text fontSize=".5rem">Backgroud color</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        width={`${Size.grid * 8}px`}
      >
        <Button onClick={selectImageDisclousure.onOpen} size="sm">
          Select image
        </Button>
        <Text fontSize=".5rem">Background image</Text>
      </Flex>

      <SelectImageDrawer
        isOpen={selectImageDisclousure.isOpen}
        onClose={onCloseSelectImage}
        onFocus={onFocus}
        onSubmit={onSubmitSelectImage}
      />
    </Flex>
  );
}
