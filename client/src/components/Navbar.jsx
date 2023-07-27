import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";

const Navbar = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>Notes Book</h1>
        <nav>
          <Link to="/">
            <div>Home</div>
          </Link>
          {!state.token ? (
            <>
              {
                <>
                  <Link to="/auth/signup">
                    {" "}
                    <div>Signup </div>
                  </Link>
                  <Link to="/auth/login">
                    {" "}
                    <div>Login</div>
                  </Link>
                </>
              }
            </>
          ) : null}

          {state.token ? (
            <div
              className="logout"
              onClick={() => {
                dispatch({ type: "logout" });
                navigate("/");
              }}
            >
              Logout
            </div>
          ) : null}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
