import axios from 'axios';
import { useEffect, useState } from 'react';
const useFetch = (url) => {
   const [data,setData]=useState(null)
   const [loading,setLoading]=useState(false)
   const [error,setError]=useState(null)
   useEffect(()=>{
    setLoading(true)

    axios.get(url)
    .then(responce=>  {
       setData(responce.data)}
    ).catch(error=>setError(error)
    ).finally(()=>setLoading(false))
   },[url])
   return {data,loading,error,setData}
};

export default useFetch;