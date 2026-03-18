import { useEffect, useState } from "react"

export default function CRUDWithFetch() {
    const [data, setData] = useState([])
    const [idValue,setIdValue] = useState('')
    const [nameValue,setNameValue] = useState('')
    const [namSinhValue,setNamSinhValue] = useState('')
    const [queQuanValue,setQueQuanValue] = useState('')
    var url = "https://69853ee96964f10bf252acf9.mockapi.io/api/v1/students"
    useEffect(() => {
        async function fetchData() {

            var res = await fetch(url)
            var duLieu = await res.json()
            console.log(duLieu)
            setData(duLieu)
        }
        fetchData()
    }, []);

    async function handleAdd(){
        console.log(idValue);
        console.log(nameValue);
        console.log(namSinhValue);
        console.log(queQuanValue);
        const newStudent = {
            id: idValue,
            name: nameValue,
            namSinh: namSinhValue,
            queQuan: queQuanValue
        };
        try{
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)   
            });
            const data  = await res.json();
            console.log("Da them thanh cong ", data )

            //cap nhat sinh vien vua them tren UI
            setData(prev => [...prev, data]);

            setIdValue('');
            setNameValue('');
            setNamSinhValue('');
            setQueQuanValue('');
        }catch(error){
            throw new error(error)
        }
    }
    return (
  <>
    <div>
      <h2>Thêm người</h2>
      <label>ID</label>
      <input type="text" id="id" value={idValue} onChange={(e)=>{setIdValue(e.target.value)}}/>
      <label>Tên</label>
      <input type="text" id="name" value={nameValue} onChange={(e)=>{setNameValue(e.target.value)}}/>
      <label>Năm sinh</label>
      <input type="number" id="namSinh" value={namSinhValue} onChange={(e)=>{ setNamSinhValue(e.target.value)}}/>
      <label>Quê quán</label>
      <input type="text" id="queQuan" value={queQuanValue} onChange={(e)=>{setQueQuanValue(e.target.value)}}/>
      <button onClick={handleAdd}>Thêm</button>
      <div className="result" id="result"></div>
    </div>
    {data.length === 0 ? (
        <p>Khong co du lieu nao</p>
      ) : (
        data.map((item) => (
          <h2 key={item.id}>{item.name}</h2>
        ))
      )}
  </>
);
}