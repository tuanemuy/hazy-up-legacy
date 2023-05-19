import { useEffect } from "react";
import {
  Component,
  Structure,
  Node,
  Page,
  Section,
  Columns,
  Image,
  ImageAsset,
  Template,
  Responsive,
} from "@/core/editor";
import { Size, Color } from "@/config";
import { EditorContext, useEditorState } from "./context";

import { ZoomableFrame } from "./ZoomableFrame";
import { Viewer } from "./Viewer";
import { Toolbar } from "./Toolbar";

type Props = {};

const structure = Structure.generate({
  role: Page.generate({ name: "ホーム", path: "" }),
  children: [
    Structure.generate({
      role: Section.generate({
        padding: new Responsive([[0, 0]]),
        isWrapped: false,
      }),
      children: [
        Structure.generate({
          role: Columns.generate({
            spacing: new Responsive([0]),
            repeat: new Responsive([1]),
          }),
          children: [
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "MainVisual",
                  url: "./MainVisualTemplateSample.tsx",
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
                props: {
                  title:
                    "Building a Platform in Space to Benefit Life on Earth",
                  subtitle:
                    "Space stations that open the next chapter of human space exploration and development",
                  backgroundImage: Image.generate({
                    src: "https://source.unsplash.com/1600x900/?astronaut",
                  }),
                },
              }),
              children: [],
            }),
          ],
        }),
      ],
    }),
    Structure.generate({
      role: Section.generate({
        padding: new Responsive([[2, 2]]),
        isWrapped: true,
        background: "rgba(0, 0, 0, 0.1)",
      }),
      children: [
        Structure.generate({
          role: Columns.generate({
            spacing: new Responsive([0]),
            repeat: new Responsive([1]),
            justifyContent: "center",
          }),
          children: [
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "SectionTitle",
                  url: "./SectionTitleTemplateSample.tsx",
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
                props: {
                  title: "Section Title",
                  subtitle: "セクションタイトル",
                },
              }),
              children: [],
            }),
          ],
        }),
        Structure.generate({
          role: Columns.generate({
            spacing: new Responsive([1]),
            justifyContent: "space-between",
            alignItems: "center",
            repeat: new Responsive([1, 1, -1]),
            gap: new Responsive([2]),
            flexWrap: true,
          }),
          children: [
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "Sample",
                  url: "./TemplateSample.tsx",
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
                props: {
                  name: "リスト1",
                  description: "説明です。",
                },
              }),
              children: [],
            }),
            Structure.generate({
              role: Columns.generate({
                spacing: new Responsive([0]),
                gap: new Responsive([2]),
                repeat: new Responsive([1, 1, -1]),
                flexWrap: true,
              }),
              children: [
                Structure.generate({
                  role: Component.generate({
                    template: Template.generate({
                      name: "Sample",
                      url: "./TemplateSample.tsx",
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
                    props: {
                      name: "リスト1",
                      description: "説明です。",
                    },
                  }),
                  children: [],
                }),
                Structure.generate({
                  role: Component.generate({
                    template: Template.generate({
                      name: "Sample",
                      url: "./TemplateSample.tsx",
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
                    props: {
                      name: "リスト2",
                      description: "説明です。",
                    },
                  }),
                  children: [],
                }),
                Structure.generate({
                  role: Component.generate({
                    template: Template.generate({
                      name: "Sample",
                      url: "./TemplateSample.tsx",
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
                    props: {
                      name: "リスト3",
                      description: "説明です。",
                    },
                  }),
                  children: [],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    Structure.generate({
      role: Section.generate({
        padding: new Responsive([[2, 2]]),
        isWrapped: true,
        background: "rgba(0, 0, 0, .25)",
        backgroundImage: Image.generate({
          src: "https://source.unsplash.com/1600x900/?astronaut",
        }),
      }),
      children: [
        Structure.generate({
          role: Columns.generate({
            spacing: new Responsive([0]),
            repeat: new Responsive([0]),
            justifyContent: "center",
          }),
          children: [
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "SectionTitle",
                  url: "./SectionTitleTemplatesample.tsx",
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
                props: {
                  title: "Section Title",
                  subtitle: "セクションタイトル",
                  reverse: true
                },
              }),
              children: [],
            }),
          ],
        }),
        Structure.generate({
          role: Columns.generate({
            spacing: new Responsive([1]),
            repeat: new Responsive([1, 1, 2]),
            gap: new Responsive([2]),
            flexWrap: true,
          }),
          children: [
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "Sample",
                  url: "./TemplateSample.tsx",
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
                props: {
                  name: "リスト1",
                  description: "説明です。",
                },
              }),
              children: [],
            }),
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "Sample",
                  url: "./TemplateSample.tsx",
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
                props: {
                  name: "リスト1",
                  description: "説明です。",
                },
              }),
              children: [],
            }),
            Structure.generate({
              role: Component.generate({
                template: Template.generate({
                  name: "Sample",
                  url: "./TemplateSample.tsx",
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
                props: {
                  name: "リスト3",
                  description: "説明です。",
                },
              }),
              children: [],
            }),
          ],
        }),
      ],
    }),
    Structure.generate({
      role: Section.generate({
        padding: new Responsive([[2, 2]]),
        isWrapped: true,
      }),
      children: [
        Structure.generate({
          role: Columns.generateDefault(),
          children: [],
        }),
      ],
    }),
  ],
});

export const Editor = ({}: Props) => {
  // DBのID使う？
  const editorState = useEditorState("root");

  useEffect(() => {
    editorState.setHistory([structure.getNodeMap("root")]);
  }, []);

  return (
    <EditorContext.Provider value={{ ...editorState }}>
      <Toolbar key={editorState.focusedNode?.id} />

      <ZoomableFrame>{editorState.nodeMap["root"] && <Viewer />}</ZoomableFrame>
    </EditorContext.Provider>
  );
};
