export const getPagesToDisplay = (pageCount: number, currentPage: number, adjacents: number) => {
  const allPages = Array.from(Array(pageCount).keys());

  if (currentPage <= adjacents) {
    return allPages.slice(0, adjacents * 2 + 1);
  }

  if (currentPage >= pageCount - adjacents) {
    return allPages.slice(pageCount - (adjacents * 2 + 1));
  }

  if (currentPage > adjacents && currentPage < pageCount - adjacents) {
    return allPages.slice(currentPage - adjacents, currentPage + adjacents + 1);
  }

  return [];
};
