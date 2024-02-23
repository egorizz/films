import React from 'react'
import './moviePagination.scss'
import { Pagination } from 'antd'
const MoviePagination = ({ totalResults, setPage }) => {
  console.log(totalResults)
  return (
    <Pagination
      total={totalResults}
      pageSize={6}
      onChange={(page) => setPage(page)}
      showSizeChanger={false}
      className="pagination"
    />
  )
}
export default MoviePagination
