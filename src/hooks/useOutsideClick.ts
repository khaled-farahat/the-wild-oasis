import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends Node>(
  handler: () => void,
  listenCapturing = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      )
        handler();
    };

    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
    };
  }, [handler, listenCapturing]);

  return ref;
}
