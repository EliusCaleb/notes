import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";

const Forming = ({ getNotes }) => {
  const { state } = useAppState();
  const { token } = state;
  const params = useParams();
  const action = params.action;
  const navigate = useNavigate();
  const [formData, setFormData] = useState(state[action]);

  const actions = {
    new: () => {
      return fetch(state?.url + "notes/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      }).then((resp) => resp.json());
    },
    edit: () => {
      return fetch(state?.url + "notes/" + state.edit.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }).then((resp) => resp.json());
    },
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const defaultAction = () => {
    return Promise.reject(new Error("Invalid action"));
  };

  const actionFunction = actions[action] || defaultAction;
  console.log("params.action:", params.action);
  console.log("token",token)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state",state)
    actionFunction()
      .then((data) => {
        console.log("data", data);
        getNotes();
        navigate("dashboard/");
      })
      .catch((error) => {
        console.error("Error executing action:", error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData?.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="body"
          value={formData?.body}
          onChange={handleChange}
        />
        <button type="submit" value={action}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forming;
