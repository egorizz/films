import React from 'react'
import './searchInput.scss'
import { Input } from 'antd'

const SearchInput = ({ onChange }) => {
  const handleInputChange = (e) => {
    onChange(e)
  }

  return <Input placeholder="Введите название фильма" onChange={handleInputChange} style={{ marginBottom: 20 }} />
}

export default SearchInput
