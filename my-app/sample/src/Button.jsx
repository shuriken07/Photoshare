import { useState } from "react";

function Button(){
    const [count,setCount]= useState(0);
    return(
        <div>
            <hr></hr>
            <h1>Count:{count}</h1>
            <button onClick={() => setCount(count+1)} className="button">INCREASE</button>
            <button onClick={() => setCount(count-1)} className="button">DECREASE</button>
            <hr />
        </div>
    
    );



}

export default Button;