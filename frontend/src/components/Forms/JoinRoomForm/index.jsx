// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// function JoinRoomForm(uuid, socket,setUser) {
//   const [roomId,setRoomId]=useState("");
//   const [name,setName]=useState("");

//   const navigate=useNavigate();

//   const handleRoomJoin=(e)=>{
//     e.preventDefault();
//   }

//   const roomData={
//     name,
//     roomId,
//     userId:uuid(),
//     host:false,
//     presenter:false,
//   }
//   setUser(roomData);
//   navigate(`/${roomId}`);
//   socket.emit("userJoined",roomData)

//   return (
//     <div>
//         <form className="form col-md-12 mt-5">
//       <div className="form-group">
//         <input
//           type="text"
//           className="form-control my-2"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e)=>setName(e.target.value)}
//         />
//       </div>
//       <div className="form-group ">
       
//           <input
//             type="text"
//             className="form-control my-2 "
//             placeholder="Enter room code"
//             value={roomId}
//             onChange={(e)=>setRoomId(e.target.value)}
//           />
//           </div>
     
//       <button type="submit" onClick={()=>handleRoomJoin()} className="mt-4 btn-primary btn-block form-control" >Join Room</button>
      
//     </form>
//     </div>
//   )
// }

// export default JoinRoomForm


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoomForm({ uuid, socket, setUser }) {
  const [roomId, setRoomId] = useState("");  // For entering room code
  const [name, setName] = useState("");       // For entering user name

  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();  // Prevent form from reloading the page

    // Validation
    if (!roomId || !name) {
      alert("Please fill in both the name and room code.");
      return;
    }

    // Generate user data
    const roomData = {
      name,
      roomId,
      userId: uuid(),  // Use the passed uuid function to generate userId
      host: false,
      presenter: false,
    };

    // Set user data
    setUser(roomData);

    // Emit the "userJoined" event with room data
    socket.emit("userJoined", roomData);

    // Navigate to the room
    navigate(`/${roomId}`);
  };

  return (
    <div>
      <form className="form col-md-12 mt-5" onSubmit={handleRoomJoin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Correctly set the name
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)} // Update roomId correctly
          />
        </div>
        <button
          type="submit"
          className="mt-4 btn-primary btn-block form-control"
        >
          Join Room
        </button>
      </form>
    </div>
  );
}

export default JoinRoomForm;
