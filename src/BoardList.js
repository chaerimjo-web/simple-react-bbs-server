import React, { Component, useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";


function Board({id , title, registerId, date, onCheckboxChange}){
  return(
    <tr>
      <td>
        <Form.Check // prettier-ignore
          type="checkbox"
          id={`default-checkbox`}
          value={id}
          onChange={(e)=>{
            onCheckboxChange(e.target.checked, e.target.value)
          }}
        />
      </td>
      <td>{id}</td>
      <td><Link to={`/view/${id}`}>{title}</Link></td>
      <td>{registerId}</td>
      <td>{date}</td>
    </tr>
  )
} //this.props 없애기

const BoardList = ({isComplete, handleModify})=>{
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const onCheckboxChange = (checked, id) =>{
    setCheckList((prevList)=>{ //기존값들마다 할 일 prevList는 checkList의 이전값(기존값)
      if(checked){
        return [...prevList,id]; //prevList에 id를 추가, id와 같은 것이 있으면 교체
      }else{
        return prevList.filter(item=> item !== id); //부합하지않는 아이템을 걸러서 새 배열 /같은숫자를 걸러냄
      }
    })
  }

  const getList = useCallback(()=>{ 
    Axios.get('http://localhost:8000/list')
    .then((res) => {
      //const data = res.data;  
      const {data} = res;  //destructuring 비구조할당
        setBoardList(data);
    })
    .catch((e)=> {
      // 에러 핸들링
      console.log(e);
    });  
  },[]);

  useEffect(()=>{
    getList();
  },[getList]) //최초 한번 getList실행, getList객체가 변경ㅇ되면 getList실행

  useEffect(()=>{
    if(isComplete){
      getList();
    }
  },[isComplete]) 

  const handleDelete = ()=>{ 
    if(checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
      return;      
    }    

    let boardIDList = checkList.join(); //1,2,3
 
      Axios.post('http://localhost:8000/delete',{
        boardIDList
      })
      .then((res) => {
        getList();
      })
      .catch((e)=> {
        // 에러 핸들링
        console.log(e);
      });    
  }

  return(
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
       {
          boardList.map(
            item=><Board 
              key={item.BOARD_ID} 
              id={item.BOARD_ID} 
              title={item.BOARD_TITLE} 
              registerId={item.REGISTER_ID} 
              date={item.REGISTER_DATE}
              onCheckboxChange={onCheckboxChange}
            />
          )
       }          
      </tbody>
    </Table>
    <div className="d-flex gap-1">
    <Link to="/write" className='btn btn-primary'>
      글쓰기
    </Link>

      <Button variant="secondary" onClick={()=>{
        handleModify(checkList);
      }}>수정하기</Button>

      <Button variant="danger" onClick={handleDelete}>삭제하기</Button>
    </div>      
  </>
  )
}

export default BoardList;
