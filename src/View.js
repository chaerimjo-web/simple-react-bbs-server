import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const View = ()=>{//초깃값설정
  console.log(useEffect);
  const [board, setBoard] = useState(null); //기본값 없음
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(()=>{
    Axios.get(`http://localhost:8000/detail?id=${id}`)
    .then((res) => {
      const {data} = res;  
      setBoard({
        title:data[0].BOARD_TITLE,
        content: data[0].BOARD_CONTENT     
      })
    })
    .catch((e)=> {
      // 에러 핸들링
      console.log(e);
    });     
    },[id]);
    console.log(board);

    if(!board) return <div> Loading. . .</div>;


  return (
    <div>
      <h2>{board.title}</h2>
      <h2>본문</h2>
      {board.content}
      <hr/>
      <Button variant='secondary' onClick={()=>{navigate(-1)}}>목록</Button>  
    </div>  
  )
}
export default View;

