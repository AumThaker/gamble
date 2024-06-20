import React, { useContext, useReducer, useState } from "react";
import { NameContext } from "./App";
import "./game.css";
import { Link } from "react-router-dom";

export default function Game() {
  let UserInfo = useContext(NameContext);
  let initialState = {
    credits: 50000,
    betStatus: false,
    mines: 0,
    betAmt: 0,
    mines_in_grid: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "BET_AMOUNT":
        return {
          ...state,
          betStatus: !state.betStatus,
          credits: state.credits - state.betAmt,
          mines_in_grid: action.MINES_IN_GRID,
        };
      case "mines_selected":
        return {
          ...state,
          mines: action.UPDATED_MINES,
        };
      case "amount_selected":
        return {
          ...state,
          betAmt: action.UPDATED_AMOUNT,
        };
      case "LOST":
        return {
          ...state,
          betStatus: action.betStatus,
          credits: state.credits,
          mines_in_grid: [],
          mines: 0,
          betAmt: 0,
        };
      case "WON":
        return {
          ...state,
          betStatus: action.betStatus,
          credits: state.credits + action.WON_CREDITS,
          mines_in_grid: [],
          mines: 0,
          betAmt: 0,
        };
      case "CASHOUT":
        return {
          ...state,
          betStatus: action.betStatus,
          credits: state.credits + action.CASH_IN_HAND,
          mines_in_grid: [],
          mines: 0,
          betAmt: 0,
        };
      default:
        return state;
    }
  }
  let [state, dispatch] = useReducer(reducer, initialState);
  function generateMines(mines) {
    const minesSet = new Set();
    while (minesSet.size < mines) {
      const randomMine = Math.floor(Math.random() * 25) + 1;
      minesSet.add(randomMine);
    }
    return Array.from(minesSet);
  }
  function bet() {
    if (state.mines === 0 || state.betAmt === 0) {
      alert("Mines and Amount not Mentioned");
    } else {
      const mig = generateMines(state.mines);
      setGridId([]);
      dispatch({ type: "BET_AMOUNT", MINES_IN_GRID: mig });
    }
  }
  function minesSelected(e) {
    dispatch({ type: "mines_selected", UPDATED_MINES: Number(e.target.value) });
  }
  function amountSelected(e) {
    if (state.credits >= Number(e.target.value)) {
      dispatch({
        type: "amount_selected",
        UPDATED_AMOUNT: Number(e.target.value),
      });
    } else {
      alert("Not enough credits");
    }
  }
  const grid = Array.from({ length: 25 }, (_, i) => i + 1);
  let [gridId, setGridId] = useState([]);
  function gridOpen(id) {
    if (gridId.includes(id)) return;
    if (state.mines_in_grid.includes(id)) {
      lost();
    } else {
      setGridId((prevGridId) => {
        let newGrid = [...prevGridId, id];
        if (newGrid.length + state.mines === 25) {
          won(newGrid.length);
        }
        return newGrid;
      });
    }
  }
  function lost() {
    alert("You hit a mine! Game over.");
    dispatch({ type: "LOST" });
  }
  function won(gridLength) {
    let calc1 = state.mines / 10;
    let calc2 = calc1 * gridLength;
    let finalCalc = calc2 * state.betAmt;
    let cashWon = finalCalc;
    dispatch({ type: "WON", WON_CREDITS: cashWon });
    alert(`You won ${cashWon} $`);
  }
  function cashOut() {
    let calc1 = state.mines / 10;
    let calc2 = calc1 * gridId.length + 1;
    let finalCalc = calc2 * state.betAmt;
    let cashWon = finalCalc;
    dispatch({ type: "CASHOUT", CASH_IN_HAND: cashWon });
    alert(`You Won ${cashWon} $`)
  }
  let value = 0;
  function valueReset(e) {
    e.target.value = value;
  }
  return (
    <>
      <span id="title">Gambling</span>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </Link>
      <div className="gamble-settings">
        <span id="user-name">{UserInfo.Username}</span>
        <span id="credits">Credits : {state.credits} $</span>
        <div className="game-info">
          <div className="game">
            <label htmlFor="mines">No Of Mines ( 1 - 24 )</label>
            <input
              type="number"
              onChange={minesSelected}
              id="mines"
              min={1}
              max={24}
              onClick={valueReset}
              placeholder={value}
            ></input>
          </div>
          <div className="game">
            <label htmlFor="bet_amt">Bet Amount</label>
            <input
              type="number"
              onChange={amountSelected}
              id="bet_amt"
              min={1}
              max={state.credits}
              onClick={valueReset}
              placeholder={value}
            ></input>
          </div>
          <button id="bet" onClick={bet}>
            Bet Now
          </button>
        </div>
      </div>
      {state.betStatus === true ? (
        <div className="diamond-game">
          <div className="grid">
            {grid.map((i) => {
              return (
                <div
                  className="grid-element"
                  onClick={() => gridOpen(i)}
                  key={i}
                >
                  {gridId.includes(i) ? (
                    state.mines_in_grid.includes(i) ? (
                      <h1>mine</h1>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-suit-diamond-fill" viewBox="0 0 16 16">
  <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2"/>
</svg>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <button id="cash_out" onClick={cashOut}>
        Cash Out
      </button>
    </>
  );
}
