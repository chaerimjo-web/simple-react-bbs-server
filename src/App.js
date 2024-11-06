import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './BoardList';
import Write from './Write';
import View from './View';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, redirect } from 'react-router-dom';

function App(){
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [boardId, setBoardId] = useState(false);
  const [redirectToWrite, setRedirectToWrite] = useState(false);
  const [redirectTohome, setRedirectTohome] = useState(false);

  const handleModify = (checkList) => {
    if (checkList.length === 0) {
      alert('수정할 게시글을 선택하세요');
    } else if (checkList.length > 1) {
      alert('하나의 게시글만 선택하세요');
    }else{
      setIsModifyMode(true);
      setBoardId(checkList[0]);
      setRedirectToWrite(true);
    }
  }

  const handleCancel = () => {
    setIsModifyMode(false);
    setIsComplete(false);
    setBoardId(0);
    setRedirectTohome(true);
  }
  useEffect(()=>{
    if(redirectTohome) setRedirectTohome(false);
    if(redirectToWrite) setRedirectToWrite(false);
  },[setRedirectToWrite, setRedirectTohome])


  return (
    <BrowserRouter>
      <div className="container">
        <h1>React Board</h1>
        
        {redirectToWrite && <Navigate to="/write"  />}
        {redirectTohome && <Navigate to="/"  />}
          {/* Navigate로 조건부 리다이렉트 */}
        <Routes>
          <Route path="/" element={<BoardList isComplete={isComplete} handleModify={handleModify} />} />
          <Route path="/write" element={<Write 
            isModifyMode={isModifyMode}
            boardId={boardId}
            handleCancel={handleCancel}
          />}
          />
          <Route path="/view/:id" element={<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 

  export default App;

