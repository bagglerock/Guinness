export const getPagesToDisplay = (pageCount: number, currentIndex: number, adjacents: number) => {
  const allPages = [...Array(pageCount).keys()];

  if (currentIndex <= adjacents) {
    return allPages.slice(0, adjacents * 2 + 1);
  }

  if (currentIndex >= pageCount - adjacents) {
    return allPages.slice(pageCount - adjacents * 2 + 1);
  }

  if (currentIndex > adjacents && currentIndex < pageCount - adjacents) {
    return allPages.slice(currentIndex - adjacents, currentIndex + adjacents + 1);
  }

  return [];
};
