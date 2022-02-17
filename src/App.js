import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Raft, Tray, varieties } from "./data";
import { useState } from "react";
import _ from "lodash";

// Note: there are several CSS animation thta match this speed, so you should update
//       those as well if changing this value
const GAME_SPEED = 3000;

// Initial state of the game
const INIT = {
  day: 1,
  germination: [],
  transplant: {
    rafts: [...Array(3)]
  },
  ponds: [...Array(3)].map(() => ({
    rafts: [...Array(10)]
  }))
};

export default function App() {
  const [intervalId, setIntervalId] = useState();
  const [day, setDay] = useState(INIT.day);
  const [timer, setTimer] = useState(false);
  const [germination, setGermination] = useState(INIT.germination);
  const [transplant, setTransplant] = useState(INIT.transplant);
  const [ponds, setPonds] = useState(INIT.ponds);

  const gameLoop = () => {
    cyclePonds();
    resetTimer();
    setDay((day) => day + 1);
    console.log("tick");
  };

  const resetTimer = () => {
    // A bit of a hack to reset the animation on the timer
    setTimer(false);
    setTimer(true);
  };

  // Empty out the tranplant array and add each into a separate pond queue
  const cyclePonds = () => {
    let transplants = [];
    setTransplant((transplant) => {
      transplants = _.cloneDeep(transplant);
      return INIT.transplant;
    });
    setPonds((ponds) => {
      const newPonds = _.cloneDeep(ponds);
      newPonds.forEach((pond, i) => {
        const raft = transplants.rafts[i];
        pond.rafts.unshift(raft);
        pond.rafts.pop();
      });
      return newPonds;
    });
  };

  const start = () => {
    setIntervalId(setInterval(gameLoop, GAME_SPEED));
    setTimer(true);
  };

  const reset = () => {
    clearInterval(intervalId);
    setDay(INIT.day);
    setGermination(INIT.germination);
    setTransplant(INIT.transplant);
    setPonds(INIT.ponds);
    setTimer(false);
  };

  const debug = () => {
    console.log({
      day,
      germination,
      transplant,
      ponds,
      timer
    });
  };

  const addRaft = (pondIndex) => {
    const newTransplant = _.cloneDeep(transplant);
    newTransplant.rafts[pondIndex] = new Raft();
    setTransplant(newTransplant);
  };

  const addThaiBasil = () => {
    let germCopy = [...germination];
    germCopy.push(new Tray(varieties[0]));
    setGermination(germCopy);
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-4 text-start">
            <h1>Greenhouse</h1>
          </div>
          <div className="col-4 mt-0">
            <span className="fs-3">Day {day}</span>
            <div className="timer mt-2">
              {timer && <div className="timer-value"></div>}
            </div>
          </div>
          <div className="col-4 text-end">
            <button className="btn btn-success" onClick={start}>
              Start
            </button>
            <button className="btn btn-warning ms-2" onClick={reset}>
              Reset
            </button>
            <button className="btn btn-ghost ms-2" onClick={debug}>
              Debug
            </button>
          </div>
        </div>
      </div>

      {/* Germination */}
      <h2 className="fs-3">Germination</h2>
      <div className="container mb-4">
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={addThaiBasil}>
              Thai Basil
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="container my-2 py-1 border border-2 rounded-3"
              style={{ width: "655px", height: "170px" }}
            >
              <div className="row">
                {germination.map((tray, ti) => (
                  <div
                    className="col border border-success m-1 rounded-1 p-1"
                    key={ti}
                    style={{
                      minWidth: "70px",
                      maxWidth: "70px",
                      minHeight: "70px",
                      maxHeight: "70px"
                    }}
                  >
                    {tray.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ponds */}
      <h2 className="fs-3">Growing Ponds</h2>
      <div
        className="border border-2 rounded-3 container py-2 mb-5"
        style={{ minWidth: "932px" }}
      >
        {ponds.map((pond, pi) => (
          <div className="row mx-2 mb-3 g-0 align-items-center" key={pi}>
            <h3 className="fs-5 text-start">Pond {pi + 1}</h3>
            <div className="pond-bg"></div>
            <div className="col-1">
              <button
                className="btn btn-light position-relative"
                style={{ left: "-60px" }}
                onClick={() => addRaft(pi)}
              >
                Transplant
              </button>
            </div>
            {pond.rafts.map((raft, ri) => (
              <div
                className={`col-1 ${timer && "moveRight"} ${
                  raft != null && "border raft"
                }`}
                style={{ height: "120px", maxWidth: "80px" }}
                key={`${pi}-${ri}`}
              >
                {raft?.used}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
