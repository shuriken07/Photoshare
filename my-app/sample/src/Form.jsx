import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, password });
    setName("");
    setPassword("");
  };

  return (
    <div>
      <h1>User Form</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br/>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <br />
        <br/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;