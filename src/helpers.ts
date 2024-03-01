export const paginateResponse = (data: any[], page: number, limit: number, totalCount: number): object => {

  const lastPage =  Math.ceil(totalCount / limit)

  return {
    data: data,
    current_page: page,
    last_page: lastPage,
    total: totalCount,
    per_page: limit
  }
}
