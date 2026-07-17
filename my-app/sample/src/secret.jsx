import { useState } from "react";

function Secret() {

  const [show, setShow] = useState(false);
  console.log(show)

  return (
    <div>

      <button onClick={() => setShow(!show)} className="button" >
        Toggle
      </button>
      {
        show &&
        <h3>Secret Content</h3>
      }

    </div>
  );
}

export default Secret;