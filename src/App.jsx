import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const generateData = async()=> {
    try {
      const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const ans = await res.json();
      setData(ans);
      setSelected(ans.slice(0,10));
    } catch (error) {
      alert('failed to fetch data')
    }
  }

  const handleNext = () =>{
    setSelected(data.slice((page*10),((page+1)*10)));
    setPage((num)=>setPage(num+1));
  }

  const handlePrevious = () =>{
    console.log(((page-1)*10))
    setSelected(data.slice(((page-2)*10),(page-1)*10));
    setPage((num)=>setPage(num-1)); 
  }

  useEffect(()=>{
    generateData();
  },[])

  useEffect(()=>{
    if(page==0 || page==1){
      setPage(1);
      setSelected(data.slice(0,10))
    }
    if(page>Math.ceil((data.length)/10)){
      setPage(Math.ceil((data.length/10)))
      setSelected(data.slice((Math.ceil(data.length/10)-1)*10));
    }
  },[page])

  return (
    <>
      <h1 className='heading'>Employee Data Table</h1>
      <table className='table'>
        <thead key={'title'}>
          <th className='first'>ID</th>
          <th className='second'>Name</th>
          <th className='third'>Email</th>
          <th className='fourth'>Role</th>
        </thead>
        <tbody>
          {selected.map((item)=>{
            return(
              <>
                <tr key={item.id}>
                  <th className='content1'>{item.id}</th>
                  <th className='content2'>{item.name}</th>
                  <th className='content3'>{item.email}</th>
                  <th className='content4'>{item.role}</th>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
      <div className='button'>
        <button onClick={handlePrevious} >Previous</button>
        <span>{page}</span>
        <button onClick={handleNext} >Next</button>
      </div>
    </>
  )
}

export default App
