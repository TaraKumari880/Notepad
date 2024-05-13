import React from "react";
import "./Loading.css";

const PageLoad = (props) => {
  // Function to handle creating a new note
  function handleCreateNote() {
    const newId = Math.random() * 20; // Generate a random ID

    // Setting the new note in localStorage and updating the state
    localStorage.setItem(
      "notes",
      JSON.stringify([
        { id: newId.toString(), body: "# Enter Your title here" },
      ])
    );
    props.info.setuserInfo({
      id: newId.toString(),
      body: "# Enter Your title here",
    });
    props.set.setValue(false);
  }

  return (
    <>
      <div className="Loadingpage">
        <h1>You have no notes</h1>
        <button onClick={handleCreateNote}>Create one now</button>
      </div>
    </>
  );
};

export default PageLoad;
