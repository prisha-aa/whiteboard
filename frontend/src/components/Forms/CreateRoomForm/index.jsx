// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// function CreateRoomForm({uuid,socket,setUser}) {

//   const [roomId,setRoomId]=useState(uuid());
//   const [name,setName]=useState("");
//   const navigate=useNavigate();

//   const handleCreateRoom=(e)=>{ 
//     e.preventDefault();
//     const roomData={
//       name,
//       roomId,
//       userId: uuid(),
//       host:true,
//       presenter:true

//     };
//     setUser(roomData);
//     navigate(`/${roomId}`);
//     console.log(roomData);
//     socket.emit("userJoined",roomData);
//   }



//   return (
//     <form className="form col-md-12 mt-5">
//       <div className="form-group">
//         <input
//           type="text"
//           className="form-control my-2"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)} 
//         />
//       </div>
//       <div className="form-group ">
//         <div className="input-group d-flex align-items-center justify-content-center">
//           <input
//             type="text"
//             value={uuid()}
//             className="form-control my-2 border-0"
//             disabled
//             placeholder="Generate room code"
//           />
//           <div className="input-group-append ">
//             <button className="btn btn-primary btn-sm me-1" type="button"
//             onClick={()=>setRoomId(uuid())}>
//               generate
//             </button>
//             <button
//               className="btn btn-outline-danger btn-sm me-2"
//               type="button"
//             >
//               {" "}
//               copy
//             </button>
//           </div>
//         </div>
//       </div>
//       <button type="submit" className="mt-4 btn-primary btn-block form-control" 
//       onClick={handleCreateRoom}
//       >Generate Room</button>
//     </form>
//   );
// }

// export default CreateRoomForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRoomForm({ uuid, socket, setUser }) {
  const [roomId, setRoomId] = useState(uuid()); // Initialize with a single UUID
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId} // Use state instead of calling uuid()
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate room code"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-sm me-1"
              type="button"
              onClick={() => setRoomId(uuid())} // Update roomId state
            >
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
              onClick={() => navigator.clipboard.writeText(roomId)} // Copy to clipboard
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 btn-primary btn-block form-control"
        onClick={handleCreateRoom}
      >
        Generate Room
      </button>
    </form>
  );
}

export default CreateRoomForm;
