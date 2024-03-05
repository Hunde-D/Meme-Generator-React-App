// import React from "react";
import { useState } from "react";

export default function Temp() {
  const [firstName, setFirstName] = useState("");

  function handleChange(event) {
    console.log(event.target);
  }

  return (
    <form>
      <input type="text" placeholder="First Name" onChange={handleChange} />
    </form>
  );
}
