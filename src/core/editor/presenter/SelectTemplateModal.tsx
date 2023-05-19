import { useState } from "react";
import { Image, ImageAsset, Template, TemplateCollection } from "@/core/editor";
import { Size, Color } from "@/config";

import {
  Flex,
  Box,
  Image as Img,
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

const templateCollections = [
  TemplateCollection.generate({
    slug: "Category 1",
    name: "カテゴリー1",
    templates: [
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "SectionTitle",
        url: "http://localhost:5173/templates/SectionTitleTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_title_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_title_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_title_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "Sample",
        url: "http://localhost:5173/templates/TemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
    ],
  }),
  TemplateCollection.generate({
    slug: "Category 2",
    name: "カテゴリー2",
    templates: [
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "SectionTitle",
        url: "http://localhost:5173/templates/SectionTitleTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_title_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_title_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_title_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "Sample",
        url: "http://localhost:5173/templates/TemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
      Template.generate({
        name: "MainVisual",
        url: "http://localhost:5173/templates/MainVisualTemplateSample.tsx",
        thumbnail: Image.generate({
          src: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
          assets: [
            ImageAsset.generate({
              label: "750w",
              mimeType: "image/jpeg",
              path: "images/thumbnail_mv_sample.jpg",
              url: "http://localhost:5173/images/thumbnail_mv_sample.jpg",
            }),
          ],
        }),
      }),
    ],
  }),
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (template: Template) => void;
};

export function SelectTemplateModal({ isOpen, onClose, onSubmit }: Props) {
  const [focused, setFocused] = useState<[number, number] | null>(null);

  const close = () => {
    setFocused(null);
    onClose();
  };

  const submit = () => {
    if (focused) {
      setFocused(null);
      onSubmit(templateCollections[focused[0]].templates[focused[1]]);
    } else {
      close();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      isCentered
      size="6xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent width="90vw">
        <ModalCloseButton />
        <ModalHeader borderBottomWidth="1px">Select Template</ModalHeader>
        <ModalBody padding={`${Size.grid * 0.5}px ${Size.grid * 0.5}px`}>
          <Tabs>
            <TabList>
              {templateCollections.map(
                (category: TemplateCollection, i: number) => {
                  return <Tab key={i.toString()}>{category.name}</Tab>;
                }
              )}
            </TabList>

            <TabPanels>
              {templateCollections.map(
                (category: TemplateCollection, i: number) => {
                  return (
                    <TabPanel key={i.toString()}>
                      <Flex
                        position="relative"
                        flexWrap="wrap"
                        margin={`${-1 * Size.grid * 0.25}px`}
                      >
                        {category.templates.map(
                          (template: Template, j: number) => {
                            const thumbnail =
                              template.thumbnail.assets.filter(
                                (asset) => asset.label === "750w"
                              )[0]?.url || template.thumbnail.src;

                            return (
                              <Box
                                key={`${i}${j}`}
                                position="relative"
                                width="25%"
                                padding={`${Size.grid * 0.5}px`}
                                onClick={() => {
                                  setFocused([i, j]);
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
                                      JSON.stringify(focused) ===
                                      JSON.stringify([i, j])
                                        ? `3px solid ${Color.accent}`
                                        : "3px solid transparent"
                                    }
                                  />
                                </Box>
                              </Box>
                            );
                          }
                        )}
                      </Flex>
                    </TabPanel>
                  );
                }
              )}
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter borderTopWidth="1px">
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
