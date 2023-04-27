import { ReactNode, useContext, useState, useEffect, useRef } from "react";
import { EditorContext } from "./context";

import { Box } from "@chakra-ui/react";

const CANVAS_SIZE = 6000;
const MAX_SCALE = 3;
const MIN_SCALE = 0.25;
const MAX_WIDTH = 3000;
const MIN_WIDTH = 300;

type ZoomableFrameProps = {
  children: ReactNode;
};

export const ZoomableFrame = ({ children }: ZoomableFrameProps) => {
  const { width, setWidth, setSelectedIndex } = useContext(EditorContext);
  const ref = useRef<HTMLDivElement>(null);
  const leftResizeBarRef = useRef<HTMLDivElement>(null!);
  const rightResizeBarRef = useRef<HTMLDivElement>(null!);
  const resizeDirectionRef = useRef<"left" | "right" | null>(null!);

  const [resizeDirection, setResizeDirection] = useState<
    "left" | "right" | null
  >(null);
  resizeDirectionRef.current = resizeDirection;

  const changeScale = (prev: number, delta: number) => {
    if (delta < 0) {
      return prev < MAX_SCALE ? prev - delta : prev;
    } else {
      return prev > MIN_SCALE ? prev - delta : prev;
    }
  };

  const onWheelHandler = (event: WheelEvent) => {
    event.preventDefault();

    if (/*Math.abs(event.wheelDeltaX) === 240*/ event.deltaX % 1 !== 0) {
      setScale((value) => changeScale(value, event.deltaX * 0.01));
    } else if (/*Math.abs(event.wheelDeltaY) === 240*/ event.deltaY % 1 !== 0) {
      setScale((value) => changeScale(value, event.deltaY * 0.01));
    } else {
      if (ref.current) {
        ref.current.scrollBy({
          top: event.deltaY / 2,
          left: event.deltaX / 2,
        });
      }
    }
  };

  const changeWidth = (
    prev: number,
    delta: number,
    direction: "left" | "right"
  ) => {
    let changed = prev;
    if (direction === "left") {
      changed = prev - delta * 2;
    } else {
      changed = prev + delta * 2;
    }

    return changed >= MIN_WIDTH && changed <= MAX_WIDTH ? changed : prev;
  };

  const getOnDownHandler = (direction: "left" | "right") => {
    return () => {
      setResizeDirection(direction);
    };
  };

  const onUpHandler = () => {
    setResizeDirection(null);
  };

  const onResizeHandler = (event: PointerEvent) => {
    event.preventDefault();

    setWidth((value) => {
      return resizeDirectionRef.current !== null
        ? changeWidth(value, event.movementX, resizeDirectionRef.current)
        : value;
    });
  };

  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("wheel", onWheelHandler);
      ref.current.addEventListener("pointermove", onResizeHandler);
      ref.current.addEventListener("pointerup", onUpHandler);

      ref.current.scroll({
        top: CANVAS_SIZE / 2,
        left: CANVAS_SIZE / 2,
      });
    }

    if (leftResizeBarRef.current && rightResizeBarRef.current) {
      leftResizeBarRef.current.addEventListener(
        "pointerdown",
        getOnDownHandler("left")
      );

      rightResizeBarRef.current.addEventListener(
        "pointerdown",
        getOnDownHandler("right")
      );
    }

    setResizeDirection(null);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", onWheelHandler);
        ref.current.removeEventListener("pointermove", onResizeHandler);
        ref.current.removeEventListener("pointerup", onUpHandler);
      }

      if (leftResizeBarRef.current) {
        leftResizeBarRef.current.removeEventListener(
          "pointerdown",
          getOnDownHandler("left")
        );
      }

      if (rightResizeBarRef.current) {
        rightResizeBarRef.current.removeEventListener(
          "pointerdown",
          getOnDownHandler("right")
        );
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      position="relative"
      w="100vw"
      h="100vh"
      bgColor="gray.200"
      overflow="scroll"
    >
      <Box
        position="relative"
        border={`${CANVAS_SIZE / 2}px solid transparent`}
        onClick={() => setSelectedIndex(null)}
      >
        <Box
          position="absolute"
          top="0"
          left={`calc(50vw - ${width / 2}px)`}
          w={`${width}px`}
          minH="900px"
          bgColor="white"
          transform={`scale(${scale})`}
          onClick={(e) => e.stopPropagation()}
        >
          <Box position="absolute" top="-4rem" left="0">
            <p>{width}px</p>
            <p>{scale * 100}%</p>
          </Box>

          <Box
            ref={leftResizeBarRef}
            position="absolute"
            h="100%"
            w="1rem"
            top="0"
            left="-1.5rem"
            background="gray.50"
            borderRadius="3px"
            cursor="ew-resize"
          ></Box>

          <Box
            ref={rightResizeBarRef}
            position="absolute"
            h="100%"
            w="1rem"
            top="0"
            right="-1.5rem"
            background="gray.50"
            borderRadius="3px"
            cursor="ew-resize"
          ></Box>

          {children}
        </Box>
      </Box>
    </Box>
  );
};
