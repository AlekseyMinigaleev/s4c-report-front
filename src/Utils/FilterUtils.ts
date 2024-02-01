export function paginate<T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] {

  const startIndex = (page) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return paginatedData;
}
