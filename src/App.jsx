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
      console.log(error)
    }
  }

  const handlePrevious = () => {
    let max=0;
    selected.map((item)=>{
      if(item.id>max){
        max=Number(item.id);
      } 
    });
    setPage((num)=>setPage(num-1));
    if(max-10 == 0){
      setSelected(data.slice(0,10));
    }
    else if(max==data.length){
      max = (Math.floor(max/10))*10;
      console.log(max)
      setSelected(data.slice(max-10,max))
    }
    else{
      setSelected(data.slice(max-20,max-10));
    }
  }

  const handleNext = () => {
    let max=0;
    selected.map((item)=>{
      if(item.id>max){
        max=Number(item.id);
      } 
    });
    setPage((num)=>setPage(num+1));
    if(max+10 >data.length){
      setSelected(data.slice(max));
    }
    else{
      setSelected(data.slice(max,max+10));
    }
  }

  useEffect(()=>{
    generateData();
  },[])

  useEffect(()=>{
    if(page==0){
      setPage(1)
    }
  },[page])

  return (
    <>
      <h1 className='heading'>Employee Data Table</h1>
      <table className='table'>
        <tr key={'title'}>
          <th className='first'>ID</th>
          <th className='second'>Name</th>
          <th className='third'>Email</th>
          <th className='fourth'>Role</th>
        </tr>
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
      </table>
      <div className='button'>
        <button onClick={handlePrevious}>Previous</button>
        <span>{page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  )
}

export default App