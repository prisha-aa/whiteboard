import React, { useRef, useState } from 'react'
import "./index.css"
import Whiteboard from '../../components/Whiteboard';

const RoomPage = ({user,socket}) => {

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const[elements,setElements]=useState([]);
    const[history,setHistory]=useState([]);
    const canvasRef=useRef(null);
    const ctxRef=useRef(null);

    const handleClearCanvas=()=>{
      const canvas=canvasRef.current;
      const ctx=ctxRef.current;
      ctx.fillRect='white';
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setElements([]);
    }

    const undo=()=>{
      setHistory((prevHistroy)=>[...prevHistroy,elements[elements.length-1]]);
      setElements(
        (prevElements)=>prevElements.slice(0,prevElements.length-1)
      )
    }

    const redo=()=>{
      setElements((prevElements)=>[...prevElements,history[history.length-1]]);
      setHistory(
        (prevHistroy)=>prevHistroy.slice(0,prevHistroy.length-1)
      )
    }

    return (
        <div className="row">
          <h1 className="text-center py-4">White Board Sharing App
            <span className='text=primary'>[Users Online:0]</span>
          </h1>
          {
            user?.presenter&&(<div className="col-md-10 px-5 mt-1 mx-auto mb-3 d-flex align-items-center justify-content-center">
              <div className="d-flex col-md-2 px-5 justify-content-center gap-1">
                  <div className='d-flex gap-1 align-items-center'>
                      <label htmlFor="pencil">Pencil</label>
                <input
                  type="radio"
                  name="tool"
                  id="pencil"
                  value="pencil"
                  className='mt-1'
                  onChange={(e) => setTool(e.target.value)}
                />
                </div>
  
                  <div className='d-flex gap-1 align-items-center'>
                  <label htmlFor="line">Line</label>
                <input
                  type="radio"
                  name="tool"
                  id="line"
                  value="line"
                  className='mt-1'
                  onChange={(e) => setTool(e.target.value)}
                />
                </div>
  
                <div className='d-flex gap-1 align-items-center'>
                <label htmlFor="rect">Rectangle</label>
                <input
                  type="radio"
                  name="tool"
                  id="rect"
                  className='mt-1'
                  value="rect"
                  onChange={(e) => setTool(e.target.value)}
                />
              </div>
              </div>
              <div className="col-md-2 mx-auto">
                  <div className='d-flex flex-column align-items-center justify-content-center'>
                      <label htmlFor="color">Select Color:</label>
                      <input type="color" 
                      id="color" 
                      className='mt-1 ms-3' 
                      value={color}
                      onChange={(e) => setColor(e.target.value)} />
                  </div>
              </div>
              <div className='col-md-3 d-flex gap-2'>
                  <button className='btn btn-primary mt-1'disabled={elements.length===0} onClick={()=>undo()}> Undo</button>
                  <button className='btn btn-primary mt-1'disabled={history.length<1}onClick={()=>redo()}> Redo</button>
  
              </div>
              <div className="col-md-2">
                  <button className='btn btn-danger' onClick={handleClearCanvas}>Clear Canvas</button>
              </div>
            </div>)
          }
          
          <div className='col-md-10 mx-auto mt-2 canvas-box '>
            <Whiteboard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            tool={tool}
            color={color}
            user={user}
            socket={socket}
            />

          </div>
        </div>
      );
      
}

export default RoomPage
