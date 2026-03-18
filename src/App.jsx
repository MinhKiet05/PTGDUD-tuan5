import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filterData,setFilterData] = useState([])
  var url = "https://jsonplaceholder.typicode.com/posts"
  useEffect(()=>{
    async function fetchData() {
      var res = await fetch(url)
      var duLieu = await res.json()
      console.log(duLieu); 
      setData(duLieu)
      
    }
    fetchData()
  },[])

  useEffect(()=>{
    console.log(searchValue)
    if(searchValue.trim()===""){
      setFilterData(data)
    }else{
      const filterData = data.filter((item)=>{
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilterData(filterData)
    }
  },[searchValue, data])

  return (
    <>
      <input type="text" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
      {filterData.length===0?(<p>Khong co post nao</p>):(filterData.map((item)=>{
        return <h2 key={item.id}>{item.title}</h2>
      }))}
    </>
  )
}

export default App
