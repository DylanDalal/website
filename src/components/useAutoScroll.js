/* ---------- 1. custom hook ------------------------------------------ */
import { useEffect } from "react";

function useAutoScroll(ref, scrollStep = 130, interval = 1200) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* reset to 0 on mount */
    node.scrollTo({ left: 120, behavior: "auto" });

    /* allow manual drag / wheel — pause auto-scroll while user active */
    let userActive = false;
    let pauseTimeout;

    const onScroll = () => {
      userActive = true;
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => (userActive = false), 1200);
    };
    node.addEventListener("scroll", onScroll);

    /* autoplay interval */
    const id = setInterval(() => {
      if (userActive) return;

      const atEnd =
        node.scrollWidth - node.scrollLeft <= node.clientWidth + 40;

      if (atEnd) {
        node.scrollTo({ left: 30, behavior: "smooth" });
      } else {
        node.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, interval);

    /* cleanup */
    return () => {
      clearInterval(id);
      node.removeEventListener("scroll", onScroll);
    };
  }, [ref, scrollStep, interval]);
}


export default useAutoScroll;