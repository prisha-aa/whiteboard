

// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import rough from "roughjs";

// const roughGenerator = rough.generator();

// const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool,color,user,socket }) => {
    
//     const [img,setImg]=useState(null);

//     useEffect(()=>{
//         socket.on("whiteBoardDataResponse",(data)=>{
//             setImg(data);
//         })
//     })

//     if(!user?.presenter){
//         return(
//             <div  
//             className="border border-dark border-3 h-100 w-100 overflow-hidden" >
//                     <img src={img} alt="Real time white board image shared by presenter " className='h-100 w-100' />
//             </div>
//         )
//     }

//     const [isDrawing, setIsDrawing] = useState(false);
    

//     useEffect(() => {
//         if (!canvasRef.current) return;
//         const canvas = canvasRef.current;
//         const dpr = window.devicePixelRatio || 1;

//         // Set canvas dimensions for high resolution
//         canvas.width = window.innerWidth * dpr;
//         canvas.height = window.innerHeight * dpr;

//         // Set CSS dimensions
//         canvas.style.width = `${window.innerWidth}px`;
//         canvas.style.height = `${window.innerHeight}px`;

//         const ctx = canvas.getContext("2d");
//         ctx.strokeStyle=color;
//         ctx.lineWidth=2;
//         ctx.lineCap="round";

//         ctx.scale(dpr, dpr); // Scale for high DPI
//         ctxRef.current = ctx;
//     }, [canvasRef, ctxRef]);

   
  

//     useEffect(()=>{
//         ctxRef.current.strokeStyle=color;
//     },[color]);

//     useLayoutEffect(() => {
//         const roughCanvas = rough.canvas(canvasRef.current);
//         const ctx = ctxRef.current;
        
        

//         if (!ctx) return;

//         // Clear the canvas
//         ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//         // Redraw elements
//         elements.forEach((element) => {
//             if (element.type === "pencil") {
//                 roughCanvas.linearPath(element.path,{
//                     stroke:element.stroke,
//                             strokeWidth:5,
//                             roughness:0,
//                 });
//             } else if (element.type === "line") {
//                 roughCanvas.draw(
//                     roughGenerator.line(
//                         element.offsetX,
//                         element.offsetY,
//                         element.width,
//                         element.height,
//                         {
//                             stroke:element.stroke,
//                             strokeWidth:5,
//                             roughness:0,
//                         }
//                     )
//                 );
//             } else if (element.type === "rect") {
//                 roughCanvas.draw(
//                     roughGenerator.rectangle(
//                         element.offsetX,
//                         element.offsetY,
//                         element.width,
//                         element.height,
//                         {
//                             stroke:element.stroke,
//                             strokeWidth:5,
//                             roughness:0,
//                         }
//                     )
//                 );
//             }
//         });
//     }, [elements, canvasRef]);

//     const handleMouseDown = (e) => {
//         const { offsetX, offsetY } = e.nativeEvent;

//         if (tool === "pencil") {
//             setElements((prevElements) => [
//                 ...prevElements,
//                 {
//                     type: "pencil",
//                     offsetX,
//                     offsetY,
//                     path: [[offsetX, offsetY]],
//                     stroke: color,
//                 },
//             ]);
//         } else if (tool === "line") {
//             setElements((prevElements) => [
//                 ...prevElements,
//                 {
//                     type: "line",
//                     offsetX,
//                     offsetY,
//                     width: offsetX,
//                     height: offsetY,
//                     stroke: color,
//                 },
//             ]);
//         } else if (tool === "rect") {
//             setElements((prevElements) => [
//                 ...prevElements,
//                 {
//                     type: "rect",
//                     offsetX,
//                     offsetY,
//                     width: 0,
//                     height: 0,
//                     stroke: color,
//                 },
//             ]);
//         }

//         setIsDrawing(true);
//     };

//     const handleMouseMove = (e) => {
//         const { offsetX, offsetY } = e.nativeEvent;

//         if (!isDrawing) return;

//         if (tool === "pencil") {
//             const { path } = elements[elements.length - 1];
//             const newPath = [...path, [offsetX, offsetY]];
//             setElements((prevElements) =>
//                 prevElements.map((ele, index) =>
//                     index === elements.length - 1 ? { ...ele, path: newPath } : ele
//                 )
//             );
//         } else if (tool === "line") {
//             setElements((prevElements) =>
//                 prevElements.map((ele, index) =>
//                     index === elements.length - 1
//                         ? { ...ele, width: offsetX, height: offsetY }
//                         : ele
//                 )
//             );
//         } else if (tool === "rect") {
//             setElements((prevElements) =>
//                 prevElements.map((ele, index) =>
//                     index === elements.length - 1
//                         ? {
//                               ...ele,
//                               width: offsetX - ele.offsetX,
//                               height: offsetY - ele.offsetY,
//                           }
//                         : ele
//                 )
//             );
//         }
//     };

//     const canvasImage=canvasRef.current.toDataURL();
//     socket.emit("whiteboardData",canvasImage)

//     const handleMouseUp = () => {
//         setIsDrawing(false);
//     };

    

//     return (
//         <div
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             className="border border-dark border-3 h-100 w-100 overflow-hidden"
//         >
//             <canvas ref={canvasRef} />
//         </div>
//     );
// };

// export default Whiteboard;



import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Whiteboard = ({ 
    canvasRef, 
    ctxRef, 
    elements, 
    setElements, 
    tool, 
    color, 
    user, 
    socket 
}) => {
    const [img, setImg] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        
            socket.on("whiteBoardDataResponse", (data) => {
                console.log("Socket connected:", socket.id);
                console.log(data)
                console.log(data.imgURL)
                setImg(data.imgURL);
            });
        
    }, []);
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
    
        socket.on("whiteBoardDataResponse", (data) => {
            console.log("Received whiteboard data:", data);
            console.log(data.imgURL); // Ensure the data contains imgURL
            setImg(data.imgURL);
        });
    
        return () => {
            socket.off("whiteBoardDataResponse"); // Clean up when component unmounts
        };
    }, [socket]); // Ensure the socket instance is passed as a dependency
    

    // Non-presenter view
    if (!user?.presenter) {
        return (
            <div className="border border-dark border-3 h-100 w-100 overflow-hidden">
                <img 
                    src={img} 
                    alt="Real-time whiteboard image shared by the presenter" 
                    className="h-100 w-100" 
                />
            </div>
        );
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas dimensions for high resolution
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.scale(dpr, dpr);

        ctxRef.current = ctx;
    }, [canvasRef, ctxRef, color]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);
        const ctx = ctxRef.current;

        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Redraw elements
        elements.forEach((element) => {
            if (element.type === "pencil") {
                roughCanvas.linearPath(element.path, {
                    stroke: element.stroke,
                    strokeWidth: 2,
                    roughness: 0,
                });
            } else if (element.type === "line") {
                roughCanvas.draw(
                    roughGenerator.line(
                        element.offsetX,
                        element.offsetY,
                        element.width,
                        element.height,
                        {
                            stroke: element.stroke,
                            strokeWidth: 2,
                            roughness: 0,
                        }
                    )
                );
            } else if (element.type === "rect") {
                roughCanvas.draw(
                    roughGenerator.rectangle(
                        element.offsetX,
                        element.offsetY,
                        element.width,
                        element.height,
                        {
                            stroke: element.stroke,
                            strokeWidth: 2,
                            roughness: 0,
                        }
                    )
                );
            }
        });
    }, [elements, canvasRef]);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (tool === "pencil") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color,
                },
            ]);
        } else if (tool === "line") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: color,
                },
            ]);
        } else if (tool === "rect") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color,
                },
            ]);
        }

        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (!isDrawing) return;

        if (tool === "pencil") {
            const { path } = elements[elements.length - 1];
            const newPath = [...path, [offsetX, offsetY]];
            setElements((prevElements) =>
                prevElements.map((ele, index) =>
                    index === elements.length - 1 ? { ...ele, path: newPath } : ele
                )
            );
        } else if (tool === "line") {
            setElements((prevElements) =>
                prevElements.map((ele, index) =>
                    index === elements.length - 1
                        ? { ...ele, width: offsetX, height: offsetY }
                        : ele
                )
            );
        } else if (tool === "rect") {
            setElements((prevElements) =>
                prevElements.map((ele, index) =>
                    index === elements.length - 1
                        ? {
                              ...ele,
                              width: offsetX - ele.offsetX,
                              height: offsetY - ele.offsetY,
                          }
                        : ele
                )
            );
        }
    };

    const handleMouseUp = () => {
        console.log("Mouse up triggered");
        setIsDrawing(false);
        console.log("jello")

        // Send updated canvas image to the socket
        if (canvasRef.current) {
            const canvasImage = canvasRef.current.toDataURL();
            console.log(canvasImage)
            console.log("hello")
            console.log("Emitting whiteboard data:", canvasImage);

            
            socket.emit("whiteboardData", canvasImage);
        }
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="border border-dark border-3 h-100 w-100 overflow-hidden"
        >
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Whiteboard;













