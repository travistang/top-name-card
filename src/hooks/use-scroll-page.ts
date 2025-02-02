import { RefObject, useEffect, useState } from "react";

export const useScrollPage = (ref: RefObject<HTMLDivElement>) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleScroll = () => {
      // Get the width of each "page" (assuming they all have the same width)
      const pageWidth = container.offsetWidth;

      // Calculate the current page based on the scroll position
      const pageIndex = Math.round(container.scrollLeft / pageWidth);

      setCurrentPage(pageIndex);
    };

    const handleResize = () => {
      // Recalculate the current page on resize
      handleScroll();
    };

    // Add event listeners for scroll and resize
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Call handleScroll initially to set the correct page on mount
    handleScroll();

    return () => {
      // Cleanup event listeners on unmount
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return currentPage;
};
