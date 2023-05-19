import { useState } from "react";
import { Image, ImageAsset } from "@/core/editor";
import { Size, Color } from "@/config";

import {
  Flex,
  Box,
  Image as Img,
  Button,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from "@chakra-ui/react";

const images = [
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?astronaut",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?astronaut",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?plane",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?plane",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?car",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?car",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?bycycle",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?bycycle",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
  Image.generate({
    src: "https://source.unsplash.com/1600x900/?rocket",
    assets: [
      ImageAsset.generate({
        label: "750w",
        mimeType: "image/jpeg",
        path: "astronaut",
        url: "https://source.unsplash.com/1600x900/?rocket",
      }),
    ],
  }),
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onFocus: (image: Image) => void;
  onSubmit: (image: Image) => void;
};

export function SelectImageDrawer({
  isOpen,
  onClose,
  onFocus,
  onSubmit,
}: Props) {
  const [focused, setFocused] = useState<number | null>(null);

  const close = () => {
    setFocused(null);
    onClose();
  };

  const submit = () => {
    if (focused) {
      setFocused(null);
      onSubmit(images[focused]);
    } else {
      close();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={close}>
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader borderBottomWidth="1px">Select Image</DrawerHeader>

        <DrawerBody padding={`${Size.grid * 0.5}px ${Size.grid * 0.5}px`}>
          <Flex
            position="relative"
            flexWrap="wrap"
            margin={`${-1 * Size.grid * 0.25}px`}
          >
            {images.map((image: Image, index: number) => {
              const thumbnail =
                image.assets.filter((asset) => asset.label === "750w")[0]
                  ?.url || image.src;

              return (
                <Box
                  key={index.toString()}
                  position="relative"
                  width="50%"
                  padding={`${Size.grid * 0.25}px`}
                  onClick={() => {
                    setFocused(index);
                    onFocus(images[index]);
                  }}
                >
                  <Box position="relative" width="100%">
                    <Img
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      src={thumbnail}
                      alt=""
                    />

                    <Box
                      position="relative"
                      zIndex="1"
                      width="100%"
                      paddingTop="100%"
                      border={
                        focused === index
                          ? `3px solid ${Color.accent}`
                          : "3px solid transparent"
                      }
                    />
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={close}>
            Cancel
          </Button>

          <Button
            color={Color.white}
            backgroundColor={Color.theme}
            onClick={submit}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
