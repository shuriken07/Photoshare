import { useEffect , useState } from "react";
import User from "./User";
 import { ApiBaseUrl } from "./config";
 import "../"


function DummyJSON({refresh, deletePost}){
    const [users, setUsers]= useState([]);

    useEffect(()=>{ fetch(`${ApiBaseUrl}getpost`)
        .then((response)=> response.json())
        .then((data)=> setUsers(data.data));
    },[refresh]);
   
    return(
        <div>
      
            <User name="Naitik" />
            <hr></hr>
            <h1>Users</h1>
            {users.map((user)=>( 
                <div key={user._id}>
                   <h3 >{user.postName}</h3>
                   <h1 >{user.description}</h1>
                     <div>
              <button onClick={() => startEdit(user)}>
                Edit
              </button>

              <button onClick={() => deletePost(user._id)}>
                Delete
              </button>
            </div>
               </div>
        
        ))}
            <hr></hr>
        </div>
    );
}
export default DummyJSON;