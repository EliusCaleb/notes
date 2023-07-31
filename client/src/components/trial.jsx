import React, { useEffect } from "react";
import { useAppState } from "../AppState";
import { Link, Route, Routes} from "react-router-dom";
import Forming from "../components/Forming";

const Dashboard = () => {
  const { state, dispatch} = useAppState();
  const { url, notes, token, username } = state;


  const getNotes = async () => {
    try {
      const response = await fetch(url + "notes/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token, // Include a space after "Bearer"
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch notes.");
      }
  
      const notesData = await response.json();
      // Assuming you have a 'dispatch' function in your useAppState hook
      dispatch({ type: "getNotes", payload: notesData });
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  

  useEffect(() => {
    getNotes();
  }, []);

  const loaded = () => (
    <div className="dashboard">
      <h1>Welcome {username}</h1>
      <Link to="/dashboard/new">
        <button>New Note</button>
      </Link>
      <Routes>
        {/* Use singular 'note' for route parameter instead of 'action' */}
        <Route path="/dashboard/:note" element={<Forming getNotes={getNotes} />} />
      </Routes>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <div className="note" key={note.id}>
              <h2>{note.title}</h2>
              <h4>{note.body}</h4>
            </div>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );

  return notes ? loaded() : <h1>Loading</h1>;
};

export default Dashboard;
