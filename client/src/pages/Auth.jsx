import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../AppState.jsx";

const Auth = () => {
  const params = useParams();
  const type = params.form;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [userData, setUserData] = useState(null);

  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (userData) {
      console.log(userData);
      const { token, user } = userData;
      dispatch({ type: "auth", payload: { token, username: user?.username } });
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(state?.url + "users/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((resp) => resp.json());
    },
    login: () => {
      return fetch(state?.url + "login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((resp) => resp.json());
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions[type]().then((data) => {
      setUserData(data);
    });
  };
  return (
    <div className="auth">
      <h1>{type}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" value={type} />
      </form>
    </div>
  );
};

export default Auth;
