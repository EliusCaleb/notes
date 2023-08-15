import React, { useEffect } from "react";
import { useAppState } from "../AppState";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ getNotes }) => {
  const { state, dispatch } = useAppState();
  const { url, notes, username, token } = state;
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const loaded = () => (
    <div className="dashboard">
      <h1>Welcome {username}</h1>
      <Link to="/dashboard/new">
        <button>New Note</button>
      </Link>
      {notes.length > 0 ? (
        <ul>
          {state.notes.map((note) => (
            <div className="note" key={note.id}>
              <h2>{note.title}</h2>
              <h4>{note.body}</h4>
              <button className="edit"
                onClick={() => {
                  dispatch({ type: "select", payload: note });
                  navigate("/dashboard/edit");
                }}
              >
                Edit Notes
              </button>

              <button className="delete"
                onClick={() => {
                  fetch(url + "notes/" + note.id, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }).then(() => getNotes());
                }}
              >
                Delete Notes
              </button>
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
