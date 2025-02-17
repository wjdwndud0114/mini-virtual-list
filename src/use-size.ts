import * as React from "react";
import useLayoutEffect from "@react-hook/passive-layout-effect";
import useEvent from "@react-hook/event";

export function useSize<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>
): { width: number; height: number } {
  const getSize = () => {
    const { current } = ref;
    if (current) {
      const computedStyle = getComputedStyle(current);
      const float = parseFloat;
      return {
        width:
          current.clientWidth -
          float(computedStyle.paddingTop) -
          float(computedStyle.paddingBottom),
        height:
          current.clientHeight -
          float(computedStyle.paddingLeft) -
          float(computedStyle.paddingRight),
      };
    }

    return { width: 0, height: 0 };
  };
  const [size, setSize] = React.useState<{ width: number; height: number }>(
    getSize
  );

  const handleResize = () => setSize(getSize());

  useEvent(
    typeof window !== "undefined" ? window : null,
    "resize",
    handleResize
  );

  useEvent(
    typeof window !== "undefined" ? window : null,
    "orientationchange",
    handleResize
  );

  useLayoutEffect(() => {
    setSize(getSize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}
