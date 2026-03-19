import { useEffect, useState } from "react"

export default function CRUDWithFetch() {
    const [data, setData] = useState([])
    const [idValue, setIdValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [namSinhValue, setNamSinhValue] = useState('')
    const [queQuanValue, setQueQuanValue] = useState('')
    const [deleteIDValue, setDeleteIDValue] = useState('')
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

    async function handleAdd() {
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
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)
            });
            const data = await res.json();
            console.log("Da them thanh cong ", data)

            //cap nhat sinh vien vua them tren UI
            setData(prev => [...prev, data]);

            setIdValue('');
            setNameValue('');
            setNamSinhValue('');
            setQueQuanValue('');
        } catch (error) {
            throw new error(error)
        }
    }

    async function hanldeDelete() {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) return;
        try {
            const res = await fetch(`${url}/${deleteIDValue}`, {
                method: "DELETE",
            })
            if (res.ok) {
                setData(data => data.filter(item => item.id !== deleteIDValue))
                console.log("Xóa thành công sinh viên có id là " + deleteIDValue)
            } else {
                console.log("Xóa thất bại")
            }
        } catch(error) {
            throw new error(error)
        }
    }

    return (
        <>
            <div>
                <h2>Thêm người</h2>
                <label>ID</label>
                <input type="text" id="id" value={idValue} onChange={(e) => { setIdValue(e.target.value) }} />
                <label>Tên</label>
                <input type="text" id="name" value={nameValue} onChange={(e) => { setNameValue(e.target.value) }} />
                <label>Năm sinh</label>
                <input type="number" id="namSinh" value={namSinhValue} onChange={(e) => { setNamSinhValue(e.target.value) }} />
                <label>Quê quán</label>
                <input type="text" id="queQuan" value={queQuanValue} onChange={(e) => { setQueQuanValue(e.target.value) }} />
                <button onClick={handleAdd}>Thêm</button>
                <div className="result" id="result"></div>
            </div>
            <br /><br /><br />
            {data.length === 0 ? (
                <p>Khong co du lieu nao</p>
            ) : (
                data.map((item) => (
                    <h2 key={item.id}>id:{item.id}, name: {item.name}</h2>
                ))
            )}
            <br /><br /><br /><br /><br />
            <div>
                <h2>Xóa sinh viên theo ID</h2>
                <input type="number" name="" id="" value={deleteIDValue} onChange={(e) => { setDeleteIDValue(e.target.value) }} />
                <button onClick={hanldeDelete}>Delete</button>
            </div>
        </>
    );
}