import { createContext, useState } from "react";
import { Screen, Section, Columns, Component } from "../../";

export type EditorState = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  screen: Screen;
  selectedIndex: number[] | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number[] | null>>;
  selected: Section | Columns | Component | null;
  selectedParentIndex: number[] | null;
  selectedParent: Section | Columns | Component | null;
  structure: Section[] | null;
  setStructure: React.Dispatch<React.SetStateAction<Section[] | null>>;
  prevStructures: Section[][];
  nextStructures: Section[][];
  undo: () => void;
  redo: () => void;
  addSection: () => void;
  addColumns: () => void;
  addComponent: () => void;
  removeSelected: () => void;
};

export const EditorContext = createContext<EditorState>({
  width: 0,
  setWidth: () => {},
  screen: new Screen("base"),
  selectedIndex: null,
  setSelectedIndex: () => {},
  selected: null,
  selectedParentIndex: null,
  selectedParent: null,
  structure: null,
  setStructure: () => {},
  prevStructures: [],
  nextStructures: [],
  undo: () => {},
  redo: () => {},
  addSection: () => {},
  addColumns: () => {},
  addComponent: () => {},
  removeSelected: () => {},
});

export function useEditorState() {
  const [width, setWidth] = useState(1440);
  const [selectedIndex, setSelectedIndex] = useState<number[] | null>(null);
  const [structure, setStructure] = useState<Section[] | null>(null);
  const [prevStructures, setPrevStructures] = useState<Section[][]>([]);
  const [nextStructures, setNextStructures] = useState<Section[][]>([]);
  // selected系を始める

  const screen = Screen.fromWidth(width);

  const selectedParentIndex =
    selectedIndex?.slice(0, selectedIndex.length - 1) || null;
  let selected = null;
  let selectedParent = null;
  if (structure && selectedIndex && selectedIndex.length > 0) {
    const section = structure[selectedIndex[0]];

    let t: any = section;
    let tp: any = null;
    for (let i = 1; i < selectedIndex.length; i++) {
      try {
        tp = t;
        t = t.children[selectedIndex[i]];
      } catch (e) {
        t = null;
        tp = null;
      }
    }

    selected = t;
    selectedParent = tp;
  }

  const undo = () => {
    if (structure && prevStructures.length > 0) {
      const now = [...structure];
      setStructure(prevStructures[0]);
      setPrevStructures((v) => v.slice(1));
      setNextStructures((v) => [now, ...v]);
    }
  };

  const redo = () => {
    if (structure && nextStructures.length > 0) {
      const now = [...structure];
      setStructure(nextStructures[0]);
      setPrevStructures((v) => [now, ...v]);
      setNextStructures((v) => v.slice(1));
    }
  };

  const addSection = () => {
    if (structure) {
      const now = [...structure];
      setStructure([...now, Section.generateDefault()]);
      setPrevStructures((v) => [now, ...v]);
      setNextStructures([]);
      setSelectedIndex([now.length]);
    }
  };

  // isSelectedの場合はselectedを表示する。selectedは編集可能
  // 編集されたselectedはonEditedでsync
  const syncConfig = () => {};

  const replaceSelected = () => {};

  // replaceSelectedで置き換え可能
  const removeSelected = () => {
    if (!structure || !selectedIndex || selectedIndex.length < 1) {
      return;
    }

    const newStructure = structure
      .map((section, i) => {
        if (i !== selectedIndex[0]) {
          return section;
        } else if (selectedIndex.length === 1) {
          return null;
        } else {
          const nextIndex = selectedIndex.slice(1);
          return Section.generate({
            ...section,
            children: section.children
              // !ComponentでフィルターすればGenericにかける
              .map((columns, j) => {
                if (j !== nextIndex[0]) {
                  return columns;
                } else if (nextIndex.length === 1) {
                  return null;
                } else {
                  return Columns.generate({
                    ...columns,
                    children: getRemoved(columns.children, nextIndex.slice(1)),
                  });
                }
              })
              .filter(
                (columns: Columns | null): columns is Columns =>
                  columns !== null
              ),
          });
        }
      })
      .filter(
        (section: Section | null): section is Section => section !== null
      );

    const now = [...structure];
    setStructure(newStructure);
    setPrevStructures((v) => [now, ...v]);
    setNextStructures([]);
  };

  function replaceChild(
    children: (Columns | Component)[],
    newValue: Columns | Component | null,
    nextIndex: number[]
  ): (Columns | Component)[] {
    return children
      .map((c, i) => {
        if (i !== nextIndex[0]) {
          return c;
        } else if (nextIndex.length === 1 && newValue === null) {
          return null;
        } else if (nextIndex.length === 1 && newValue instanceof Columns) {
          return c instanceof Columns ? newValue : c;
        } else if (nextIndex.length === 1 && newValue instanceof Component) {
          return c instanceof Component ? newValue : c;
        } else if (c instanceof Component) {
          throw new Error("Unreachable");
        } else {
          return Columns.generate({
            ...c,
            children: replaceChild(c.children, newValue, nextIndex.slice(1)),
          });
        }
      })
      .filter(
        (c: Columns | Component | null): c is Columns | Component => c !== null
      );
  }

  function getRemoved(
    list: (Columns | Component)[],
    nextIndex: number[]
  ): (Columns | Component)[] {
    return list
      .map((c, i) => {
        if (i !== nextIndex[0]) {
          return c;
        } else if (nextIndex.length === 1) {
          return null;
        } else if (c instanceof Component) {
          throw new Error("Unreachable");
        } else {
          return Columns.generate({
            ...c,
            children: getRemoved(c.children, nextIndex.slice(1)),
          });
        }
      })
      .filter(
        (c: Columns | Component | null): c is Columns | Component => c !== null
      );
  }

  const addColumns = () => {};

  const addComponent = () => {};

  return {
    width,
    setWidth,
    screen,
    selectedIndex,
    setSelectedIndex,
    selected,
    selectedParentIndex,
    selectedParent,
    structure,
    setStructure,
    prevStructures,
    nextStructures,
    undo,
    redo,
    addSection,
    addColumns,
    addComponent,
    removeSelected,
  };
}
