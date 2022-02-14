import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { fillGermination, cyclePonds, dayCounter } from "./timeouts";
import { Raft } from "./data";
import { useState } from "react";

const initialPonds = [...Array(3)].map(() => ({
  rafts: [...Array(10).fill(new Raft())]
}));

const initialGerminationRoom = [];

export default function App() {
  const [day, setDay] = useState(0);

  let germinationTimeoutId, pondsTimeoutId, dayIntervalId;
  const [ponds, setPonds] = useState(initialPonds);
  const [transplanting, setTransplanting] = useState({ rafts: [] });
  const [germinationRoom, setGerminationRoom] = useState(
    initialGerminationRoom
  );

  const reset = () => {
    clearInterval(dayIntervalId);
    dayIntervalId = dayCounter(0, setDay);
    clearTimeout(germinationTimeoutId);
    setGerminationRoom(initialGerminationRoom);
    germinationTimeoutId = fillGermination(germinationRoom, setGerminationRoom);

    clearTimeout(pondsTimeoutId);
    setPonds(initialPonds);
    pondsTimeoutId = cyclePonds(ponds, setPonds, transplanting);
  };

  const addRaft = () => {
    transplanting.rafts.push(new Raft());
    setTransplanting({ ...transplanting });
  };

  return (
    <div className="App">
      <h1 className="mt-3 mb-5">Greenhouse</h1>
      <button className="button button-primary" onClick={reset}>
        Reset
      </button>

      <h1>Day {day}</h1>

      <h3>Germination</h3>
      <div
        className="border container mb-5"
        style={{ width: "584px", height: "176px" }}
      >
        <div className="row">
          {germinationRoom.map((plant, index) => (
            <div
              className="border border-success m-1"
              key={index}
              style={{ width: "50px", height: "50px" }}
            >
              {plant?.name}
            </div>
          ))}
        </div>
      </div>

      <h3>Transplanting</h3>
      <button onClick={addRaft}>Add Raft</button>
      <div className="border container mb-5">
        <div className="row moveDown">
          {transplanting.rafts.map((raft, j) => (
            <div className="border col" style={{ height: "100px" }} key={j}>
              {raft.used}
            </div>
          ))}
        </div>
      </div>

      <h3>Growth</h3>
      <div className="border container">
        <div className="row">
          {ponds.map((pond, i) => (
            <div className="col">
              <h4>Pond {i + 1}</h4>
              <div>
                {pond.rafts.map((raft, j) => (
                  <div
                    className={`moveDown ${raft != null && "border"}`}
                    style={{ height: "100px" }}
                    key={`${i}-${j}`}
                  >
                    {raft?.used}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <marquee
        direction="down"
        width="500"
        height="100"
        behavior="alternate"
        scrolldelay="60"
        style={{ border: "solid" }}
      >
        <marquee behavior="alternate" scrolldelay="60">
          <button className="btn btn-primary">Grow some plants!</button>
        </marquee>
      </marquee>
    </div>
  );
}
