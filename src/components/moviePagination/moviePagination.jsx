import React from 'react'
import './moviePagination.scss'
import { Pagination } from 'antd'
const MoviePagination = ({ totalResults, setPage }) => {
  return (
    <Pagination
      total={totalResults}
      pageSize={20}
      onChange={(page) => setPage(page)}
      showSizeChanger={false}
      className="pagination"
    />
  )
}
export default MoviePagination
