import { useEffect, useState } from 'react'
import CRUDWithFetch from './cau5/CRUDWithFetch'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filterData, setFilterData] = useState([])
  const [selectId, setSelectId] = useState(null)

  const url = "https://jsonplaceholder.typicode.com/posts"

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url)
      const duLieu = await res.json()
      setData(duLieu)
    }
    fetchData()
  }, [])

  const handleSelect = (e) => {
    const value = e.target.value
    setSelectId(value ? Number(value) : null)
  }

  useEffect(() => {
    let result = data

    if (searchValue.trim() !== "") {
      result = result.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    if (selectId !== null) {
      result = result.filter(item => item.id === selectId)
    }

    setFilterData(result)
  }, [searchValue, selectId, data])

  return (
    <>
      <CRUDWithFetch />

      <br /><br /><br />

      <select onChange={handleSelect} value={selectId || ''}>
        <option value="">-- Chon ID --</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tim theo title..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {filterData.length === 0 ? (
        <p>Khong co post nao</p>
      ) : (
        filterData.map((item) => (
          <h2 key={item.id}>{item.title}</h2>
        ))
      )}
    </>
  )
}

export default App