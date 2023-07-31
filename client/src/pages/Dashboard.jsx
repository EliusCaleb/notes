import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppState } from "../AppState";
import { Link, Route, Routes } from "react-router-dom";
import Forming from "../components/Forming";

const Dashboard = ({getNotes}) => {
  const { state } = useAppState();
  const {  notes,  username } = state;

  // const getNotes = async () => {
  //   try {
  //     const response = await fetch(url + "notes/", {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token, 
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch notes.");
  //     }

  //     const notesData = await response.json();
  //     dispatch({ type: "getNotes", payload: notesData });
  //   } catch (error) {
  //     console.error("Error fetching notes:", error.message);
  //   }
  // };

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
        <Route
          path="/dashboard/:action"
          element={<Forming getNotes={getNotes}  />}
        />
      </Routes>
      <Outlet/>
      {notes.length > 0 ? (
        <ul>
          {state.notes.map((note) => (
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
