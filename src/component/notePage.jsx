import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./notePage.css";

const NotePage = (props) => {
  const [Markdown, setMarkdown] = useState("# Enter the text here...");
  const [addNotes, setAddNotes] = useState([
    JSON.parse(localStorage.getItem("notes")),
  ]);
  const [Id, setId] = useState(0);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setAddNotes(JSON.parse(storedNotes));
      // console.log("new");
    }
  }, []);

  // Update localStorage whenever 'addNotes' state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(addNotes));
  }, [addNotes]);

  // Function to add a new note
  function addNewNote() {
    const newNote = {
      id: generateUniqueId(),
      body: Markdown,
    };
    setAddNotes((prevNotes) => {
      if (!Array.isArray(prevNotes)) {
        return [newNote];
      }
      return [...prevNotes, newNote];
    });
  }

  // Function to handle changes in the textarea input
  function inputChange(e) {
    const txt = e.target.value;
    setMarkdown(txt);

    const updated = addNotes.map((items, idx) => {
      if (idx == e.target.id) {
        items.body = Markdown;
      }
      return items;
    });

    props.info.setuserInfo(() => {
      localStorage.setItem("notes", JSON.stringify(updated));
      return updated;
    });
  }

  // Function to generate a unique ID for notes
  function generateUniqueId() {
    return Math.random() * 20;
  }

  // Function to retrieve the content of a selected note
  function getcontents(e) {
    setId(e.target.id);
    addNotes.map((value, indx) => {
      if (indx == e.target.id) {
        setMarkdown(value.body);
        // console.log(indx);
      }
      // console.log(indx);
    });
  }

  // Function to show the text preview page
  function showtextPage() {
    let show = document.querySelector(".Previewpage");
    let hide = document.querySelector(".writeconatiner");
    hide.style.display = "none";
    show.style.display = "block";
  }

  // Function to hide the text preview page
  function hidetextPage() {
    let show = document.querySelector(".Previewpage");
    let hide = document.querySelector(".writeconatiner");
    hide.style.display = "block";
    show.style.display = "none";
  }

  // Function to remove a note from the list

  function removesavenotes(e) {
    const index = parseInt(e.target.id); // Get the index of the note
    const updatedNotes = addNotes.filter((note, idx) => idx !== index); // Remove the note from the list

    // Update state and local storage with the modified notes (after removing the selected note)
    setAddNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    if (updatedNotes.length === 0) {
      localStorage.clear();
      // props.set.setValue(false);
      window.location.reload();
    }
  }

  const addFormatting = (type) => {
    switch (type) {
      case "heading":
        setMarkdown((prevData) => `### ${prevData}`);
        break;
      case "bold":
        setMarkdown((prevData) => `**${prevData}**`);
        break;
      case "italic":
        setMarkdown((prevData) => `*${prevData}*`);
        break;
      case "strikethrough":
        setMarkdown((prevData) => `~~${prevData}~~`);
        break;
      case "link":
        setMarkdown((prevData) => `${prevData}[title]()`);
        break;
      case "quote":
        setMarkdown((prevData) => `> ${prevData}`);
        break;
      case "code":
        setMarkdown((prevData) => `\`${prevData}\``);
        break;
      case "image":
        setMarkdown((prevData) => `![alt text](imageURL)`);
        break;
      case "unorderedList":
        setMarkdown((prevData) => `- ${prevData}`);
        break;
      case "orderedList":
        setMarkdown((prevData) => `1. ${prevData}`);
        break;
      case "checkList":
        setMarkdown((prevData) => `- [ ] ${prevData}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="notepage">
      <div className="sidebar">
        <div className="upperhead">
          <h1>NOTES</h1>
          <button onClick={addNewNote}>+</button>
        </div>
        <div className="lowerhead">
          {addNotes.map((items, index) => (
            <div className="notess">
              <button id={index} className="type" onClick={getcontents}>
                # Enter your title here
              </button>
              <button className="fa" onClick={removesavenotes}>
                <i id={index} class="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mainContainer">
        <div className="writeconatiner">
          <div className="Allbuttons">
            <button>Write</button>
            <button onClick={showtextPage}>Preview</button>
            <button className="icons" onClick={() => addFormatting("heading")}>
              <i class="fa-solid fa-heading"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("bold")}>
              <i class="fa-solid fa-bold"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("italic")}>
              <i class="fa-solid fa-italic"></i>
            </button>
            <button
              className="icons"
              onClick={() => addFormatting("strikethrough")}
            >
              <i class="fa-solid fa-strikethrough"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("link")}>
              <i className="fa-solid fa-link"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("quote")}>
              <i className="fa-solid fa-quote-right"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("code")}>
              <i className="fa-solid fa-code"></i>
            </button>
            <button className="icons" onClick={() => addFormatting("image")}>
              <i className="fa-solid fa-image"></i>
            </button>
            <button
              className="icons"
              onClick={() => addFormatting("unorderedList")}
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>
            <button
              className="icons"
              onClick={() => addFormatting("orderedList")}
            >
              <i className="fa-solid fa-list-ol"></i>
            </button>
            <button
              className="icons"
              onClick={() => addFormatting("checkList")}
            >
              <i className="fa-solid fa-list-check"></i>
            </button>
          </div>
          <textarea value={Markdown} onChange={inputChange} id={Id} />
        </div>
        <div className="Previewpage">
          <div className="Allbuttons">
            <button onClick={hidetextPage}>Write</button>
            <button>Preview</button>
          </div>
          <div>
            <ReactMarkdown>{Markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotePage;
