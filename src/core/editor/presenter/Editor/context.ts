import { createContext, useState, useEffect } from "react";
import {
  Responsive,
  Screen,
  ID,
  Node,
  NodeMap,
  Page,
  Section,
  Columns,
  Component,
  GenerateComponentArgs,
} from "../../";

export type EditorState = {
  rootId: ID;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  screen: Screen;
  history: NodeMap[];
  setHistory: React.Dispatch<React.SetStateAction<NodeMap[]>>;
  nodeMap: NodeMap;
  historyPointer: number;
  rootNode: Node<Page> | null;
  focusedNode: Node<any> | null;
  getChildren: (node: Node<any>) => Node<any>[];
  setFocusedNode: React.Dispatch<React.SetStateAction<Node<any> | null>>;
  focus: (node: Node<any>) => void;
  unFocus: () => void;
  updateNodeMap: (newNodeMap: NodeMap) => void;
  updateNode: (nodeId: ID, newNode: Node<any>) => void;
  updateNodeTemporarily: (nodeId: ID, newNode: Node<any>) => void;
  setDraftNodeMap: (nodeMap: NodeMap | null) => void;
  undo: () => void;
  redo: () => void;
  addSection: () => void;
  addColumns: () => void;
  addComponent: (args: GenerateComponentArgs) => void;
  moveBack: () => void;
  moveForward: () => void;
  removeFocused: () => void;
};

export const EditorContext = createContext<EditorState>({
  rootId: "",
  width: 0,
  setWidth: () => {},
  screen: new Screen("base"),
  history: [],
  setHistory: () => {},
  nodeMap: {},
  historyPointer: 0,
  rootNode: null,
  getChildren: () => [],
  focusedNode: null,
  setFocusedNode: () => {},
  focus: () => {},
  unFocus: () => {},
  updateNodeMap: () => {},
  updateNode: () => {},
  updateNodeTemporarily: () => {},
  setDraftNodeMap: () => {},
  undo: () => {},
  redo: () => {},
  addSection: () => {},
  addColumns: () => {},
  addComponent: () => {},
  moveBack: () => {},
  moveForward: () => {},
  removeFocused: () => {},
});

export function useEditorState(rootId: ID) {
  const [width, setWidth] = useState(1440);
  const [history, setHistory] = useState<NodeMap[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(0);

  const [draftNodeMap, setDraftNodeMap] = useState<NodeMap | null>(null);
  const nodeMap = draftNodeMap || history[historyPointer] || {};
  const [focusedNode, setFocusedNode] = useState<Node<any> | null>(null);

  const screen = Screen.fromWidth(width);
  const rootNode =
    nodeMap[rootId]?.role instanceof Page ? nodeMap[rootId] : null;

  useEffect(() => {
    if (focusedNode === null) {
      setFocusedNode(rootNode);
    }
  }, [rootNode]);

  const getParents: (node: Node<any>) => Node<any>[] = (node: Node<any>) => {
    if (!node.parentId) {
      return [node];
    } else {
      return [...getParents(nodeMap[node.parentId]), node];
    }
  };

  const getChildren: (node: Node<any>) => Node<any>[] = (node: Node<any>) => {
    let children = [];
    let next = node.firstChild || null;
    while (next !== null) {
      children.push(nodeMap[next]);
      next = nodeMap[next].next;
    }

    return children;
  };

  const focus = (node: Node<any>) => {
    setDraftNodeMap(null);
    if (!focusedNode) {
      return;
    }

    const requestStack = getParents(node);
    const focusedStack = getParents(nodeMap[focusedNode.id]);

    for (let i = 0; i < requestStack.length; i++) {
      if (!focusedStack[i] || requestStack[i].id !== focusedStack[i].id) {
        setFocusedNode(requestStack[i]);
        return;
      }
    }
    setFocusedNode(node);
  };

  const unFocus = () => {
    setFocusedNode(nodeMap[rootId] || null);
  };

  const undo = () => {
    if (historyPointer < history.length - 1) {
      setHistoryPointer((v) => v + 1);
    }
  };

  const redo = () => {
    if (historyPointer > 0) {
      setHistoryPointer((v) => v - 1);
    }
  };

  const getAdded = (map: NodeMap, targetId: ID, node: Node<any>) => {
    const targetNode = map[targetId];
    if (!targetNode) {
      return map;
    }

    if (node.role instanceof Page || targetNode.role instanceof Component) {
      return map;
    }

    if (node.role instanceof Section && !(targetNode.role instanceof Page)) {
      return map;
    }

    if (node.role instanceof Columns && targetNode.role instanceof Page) {
      return map;
    }

    if (
      node.role instanceof Component &&
      !(targetNode.role instanceof Columns)
    ) {
      return map;
    }

    const lastChildId = targetNode.lastChild;
    const newNodeMap = { ...map };
    if (lastChildId !== null && map[lastChildId]) {
      newNodeMap[targetId] = Node.generate({
        ...targetNode,
        lastChild: node.id,
      });

      newNodeMap[lastChildId] = Node.generate({
        ...map[lastChildId],
        next: node.id,
      });
    } else {
      newNodeMap[targetId] = Node.generate({
        ...targetNode,
        firstChild: node.id,
        lastChild: node.id,
      });
    }
    newNodeMap[node.id] = node;

    return newNodeMap;
  };

  const updateNodeMap = (newNodeMap: NodeMap) => {
    setDraftNodeMap(null);
    setHistory((v) => [newNodeMap, ...v.slice(historyPointer)]);
    setHistoryPointer(0);
    if (focusedNode) {
      setFocusedNode(newNodeMap[focusedNode.id]);
    }
  };

  const updateNode = (nodeId: ID, newNode: Node<any>) => {
    const newNodeMap = { ...nodeMap };
    newNodeMap[nodeId] = newNode;
    updateNodeMap(newNodeMap);
  };

  const updateNodeTemporarily = (nodeId: ID, newNode: Node<any>) => {
    const newNodeMap = { ...nodeMap };
    newNodeMap[nodeId] = newNode;
    setDraftNodeMap(newNodeMap);
  };

  const addSection = () => {
    const sectionId = Node.generateId();
    let newNodeMap = getAdded(
      nodeMap,
      rootId,
      Node.generate({
        id: sectionId,
        parentId: rootId,
        prev: nodeMap[rootId].lastChild,
        role: Section.generateDefault(),
      })
    );

    const columnsId = Node.generateId();
    newNodeMap = getAdded(
      newNodeMap,
      sectionId,
      Node.generate({
        id: columnsId,
        parentId: sectionId,
        role: Columns.generate({
          spacing: new Responsive([0]),
          gap: new Responsive([1]),
        }),
      })
    );

    updateNodeMap(newNodeMap);
  };

  const addColumns = () => {
    if (!focusedNode) {
      return;
    }

    const columnsId = Node.generateId();
    const newNodeMap = getAdded(
      nodeMap,
      focusedNode.id,
      Node.generate({
        id: columnsId,
        parentId: focusedNode.id,
        prev: focusedNode.lastChild,
        role: Columns.generateDefault(),
      })
    );

    updateNodeMap(newNodeMap);
  };

  const addComponent = (args: GenerateComponentArgs) => {
    if (!focusedNode) {
      return;
    }

    const componentId = Node.generateId();
    const newNodeMap = getAdded(
      nodeMap,
      focusedNode.id,
      Node.generate({
        id: componentId,
        parentId: focusedNode.id,
        prev: focusedNode.lastChild,
        role: Component.generate(args),
      })
    );

    updateNodeMap(newNodeMap);
  };

  const moveBack = () => {
    if (!focusedNode || focusedNode.prev === null) {
      return;
    }

    const prevNode = nodeMap[focusedNode.prev];
    const newNodeMap = { ...nodeMap };

    newNodeMap[focusedNode.id] = Node.generate({
      ...focusedNode,
      prev: prevNode.prev,
      next: prevNode.id,
    });

    newNodeMap[focusedNode.prev] = Node.generate({
      ...prevNode,
      prev: focusedNode.id,
      next: focusedNode.next,
    });

    if (focusedNode.next) {
      const nextNode = nodeMap[focusedNode.next];
      newNodeMap[focusedNode.next] = Node.generate({
        ...nextNode,
        prev: prevNode.id,
      });
    }

    if (prevNode.prev) {
      const prevPrevNode = nodeMap[prevNode.prev];
      newNodeMap[prevNode.prev] = Node.generate({
        ...prevPrevNode,
        next: focusedNode.id,
      });
    }

    if (focusedNode.parentId) {
      const parentNode = nodeMap[focusedNode.parentId];

      if (parentNode.firstChild === prevNode.id) {
        newNodeMap[focusedNode.parentId] = Node.generate({
          ...parentNode,
          firstChild:
            parentNode.firstChild === prevNode.id
              ? focusedNode.id
              : parentNode.firstChild,
          lastChild:
            parentNode.lastChild === focusedNode.id
              ? prevNode.id
              : parentNode.lastChild,
        });
      }
    }

    updateNodeMap(newNodeMap);
  };

  const moveForward = () => {
    if (!focusedNode || focusedNode.next === null) {
      return;
    }

    const nextNode = nodeMap[focusedNode.next];
    const newNodeMap = { ...nodeMap };

    newNodeMap[focusedNode.id] = Node.generate({
      ...focusedNode,
      prev: nextNode.id,
      next: nextNode.next,
    });

    newNodeMap[focusedNode.next] = Node.generate({
      ...nextNode,
      prev: focusedNode.prev,
      next: focusedNode.id,
    });

    if (focusedNode.prev) {
      const prevNode = nodeMap[focusedNode.prev];
      newNodeMap[focusedNode.prev] = Node.generate({
        ...prevNode,
        next: nextNode.id,
      });
    }

    if (nextNode.next) {
      const nextNextNode = nodeMap[nextNode.next];
      newNodeMap[nextNode.next] = Node.generate({
        ...nextNextNode,
        prev: focusedNode.id,
      });
    }

    if (focusedNode.parentId) {
      const parentNode = nodeMap[focusedNode.parentId];

      newNodeMap[focusedNode.parentId] = Node.generate({
        ...parentNode,
        firstChild:
          parentNode.firstChild === focusedNode.id
            ? nextNode.id
            : parentNode.firstChild,
        lastChild:
          parentNode.lastChild === nextNode.id
            ? focusedNode.id
            : parentNode.lastChild,
      });
    }

    updateNodeMap(newNodeMap);
  };

  const removeFocused = () => {
    if (!focusedNode) {
      return;
    }

    const prevNode = focusedNode.prev ? nodeMap[focusedNode.prev] : null;
    const nextNode = focusedNode.next ? nodeMap[focusedNode.next] : null;
    const parentNode = focusedNode.parentId
      ? nodeMap[focusedNode.parentId]
      : null;
    const newNodeMap = { ...nodeMap };

    if (prevNode) {
      newNodeMap[prevNode.id] = Node.generate({
        ...prevNode,
        next: focusedNode.next,
      });
    }

    if (nextNode) {
      newNodeMap[nextNode.id] = Node.generate({
        ...nextNode,
        prev: focusedNode.prev,
      });
    }

    if (parentNode) {
      newNodeMap[parentNode.id] = Node.generate({
        ...parentNode,
        firstChild:
          parentNode.firstChild === focusedNode.id
            ? focusedNode.next
            : parentNode.firstChild,
        lastChild:
          parentNode.lastChild === focusedNode.id
            ? focusedNode.prev
            : parentNode.lastChild,
      });
    }

    delete newNodeMap[focusedNode.id];

    updateNodeMap(newNodeMap);
    setFocusedNode(newNodeMap[rootId] || null);
  };

  return {
    rootId,
    width,
    setWidth,
    screen,
    history,
    setHistory,
    historyPointer,
    rootNode,
    nodeMap,
    getChildren,
    focusedNode,
    setFocusedNode,
    focus,
    unFocus,
    updateNodeMap,
    updateNode,
    updateNodeTemporarily,
    setDraftNodeMap,
    undo,
    redo,
    addSection,
    addColumns,
    addComponent,
    moveBack,
    moveForward,
    removeFocused,
  };
}
