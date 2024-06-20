import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NameContext } from "./App";
import "./login.css";

export default function Login() {
  let UserInfo = useContext(NameContext);
  function enterGame() {
    console.log(
      "Entering Game With Name : ",
      UserInfo.Username,
      "and age : ",
      UserInfo.Userage
    );
  }
  return (
    <>
      <div className="form-login">
        <div className="login">
          <div className="inputs-login">
            <label htmlFor="name">Enter Name</label>
            <input type="text" onChange={UserInfo.naming} id="name"></input>
          </div>
          <div className="inputs-login">
            <label htmlFor="age">Enter Age</label>
            <input
              type="number"
              onChange={UserInfo.age_count}
              id="age"
              min={0}
              max={99}
              placeholder=""
            ></input>
          </div>
        </div>
        <Link to="/game">
          <button
            onClick={enterGame}
            id="login-btn"
            disabled={
              UserInfo.Userage < 18 || UserInfo.Userage === "" ? true : false
            }
          >
            Enter Game
          </button>
        </Link>
      </div>
    </>
  );
}
