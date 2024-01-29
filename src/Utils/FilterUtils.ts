export function paginate<T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] {

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return paginatedData;
}
