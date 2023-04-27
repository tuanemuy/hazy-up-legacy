import { useEffect } from "react";
import { Component, Section, Columns, Image, Responsive } from "@/core/editor";
import { Size } from "@/config";
import { EditorContext, useEditorState } from "./context";

import { Flex, Spinner } from "@chakra-ui/react";
import { ZoomableFrame } from "./ZoomableFrame";
import { Viewer } from "./Viewer";
import { Toolbar } from "./Toolbar";

type Props = {};

const nodes = {
  "1": Section.generateDefault()
};

export const Editor = ({}: Props) => {
  const editorState = useEditorState();

  useEffect(() => {
    editorState.setStructure([
      Section.generate({
        padding: new Responsive([[2, 2]]),
        isWrapped: true,
        background: "rgba(0, 0, 0, 0.25)",
        backgroundImage: Image.generate({
          src: "https://source.unsplash.com/1600x900/?astronaut",
        }),
        children: [
          Columns.generate({
            spacing: new Responsive([0]),
            repeat: new Responsive([1]),
            justifyContent: "center",
            children: [
              new Component("./TemplateSample.tsx", {
                name: "セクションタイトル",
              }),
            ],
          }),
          Columns.generate({
            spacing: new Responsive([1]),
            justifyContent: "space-between",
            alignItems: "center",
            repeat: new Responsive([1, 1, -1]),
            gap: new Responsive([2]),
            flexWrap: true,
            children: [
              new Component("./TemplateSample.tsx", { name: "リスト1" }),
              Columns.generate({
                spacing: new Responsive([0]),
                gap: new Responsive([2]),
                flexWrap: true,
                children: [
                  new Component("./TemplateSample.tsx", { name: "リスト1" }),
                  new Component("./TemplateSample.tsx", { name: "リスト2" }),
                  new Component("./TemplateSample.tsx", {
                    name: "リスト3リスト3リスト3リスト3リスト3リスト3リスト3リスト3リスト3",
                  }),
                ],
              }),
            ],
          }),
          Columns.generate({
            spacing: new Responsive([1]),
            justifyContent: "space-between",
            alignItems: "center",
            repeat: new Responsive([1, 1, -1]),
            gap: new Responsive([2]),
            flexWrap: true,
            children: [
              new Component("./TemplateSample.tsx", { name: "リスト1" }),
              Columns.generate({
                spacing: new Responsive([0]),
                repeat: new Responsive([1, 2, 3]),
                gap: new Responsive([2]),
                flexWrap: true,
                children: [
                  new Component("./TemplateSample.tsx", { name: "リスト1" }),
                  new Component("./TemplateSample.tsx", { name: "リスト2" }),
                  new Component("./TemplateSample.tsx", {
                    name: "リスト3リスト3リスト3リスト3リスト3リスト3リスト3リスト3リスト3",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      Section.generate({
        padding: new Responsive([[2, 2]]),
        isWrapped: true,
        background: "#eaeaea",
        children: [
          Columns.generate({
            spacing: new Responsive([0]),
            justifyContent: "center",
            children: [
              new Component("./TemplateSample.tsx", {
                name: "セクションタイトル",
              }),
            ],
          }),
          Columns.generate({
            spacing: new Responsive([1]),
            repeat: new Responsive([1, 2]),
            gap: new Responsive([2]),
            flexWrap: true,
            children: [
              new Component("./TemplateSample.tsx", { name: "リスト1" }),
              new Component("./TemplateSample.tsx", { name: "リスト2" }),
              new Component("./TemplateSample.tsx", { name: "リスト3" }),
            ],
          }),
          Columns.generate({
            spacing: new Responsive([1]),
            repeat: new Responsive([1, 2]),
            gap: new Responsive([2]),
            flexWrap: true,
            children: [],
          }),
        ],
      }),
      Section.generate({
        padding: new Responsive([[1, 1]]),
        isWrapped: true,
        background: "var(--white)",
        children: [
          Columns.generate({
            spacing: new Responsive([0]),
            children: [],
          }),
        ],
      }),
    ]);
  }, []);

  return (
    <EditorContext.Provider value={{ ...editorState }}>
      <Toolbar />

      <ZoomableFrame>
        {editorState.structure && <Viewer structure={editorState.structure} />}
        {!editorState.structure && (
          <Flex
            justifyContent="center"
            alignItems="center"
            width="100%"
            padding={`${Size.grid * 3}px`}
          >
            <Spinner />
          </Flex>
        )}
      </ZoomableFrame>
    </EditorContext.Provider>
  );
};
