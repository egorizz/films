import React from 'react'
import { Pagination } from 'antd'
const MoviePagination = ({ totalResults, setPage }) => {
  console.log(totalResults)
  return <Pagination total={totalResults} pageSize={20} onChange={(page) => setPage(page)} showSizeChanger={false} />
}
export default MoviePagination
