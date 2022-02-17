import { Raft } from "./data";

export default class Game {
  constructor(loop, speed) {
    this.loop = loop;
    this.speed = speed;
  }

  start() {
    this.loopId = setInterval(this.loop, this.speed);
    console.log(this.loopId);
  }

  reset() {
    clearInterval(this.loopId);
  }

  get init() {
    return {
      day: 0,
      germination: [],
      transplant: {
        rafts: []
      },
      ponds: [...Array(3)].map(() => ({
        rafts: [...Array(10).fill(new Raft())]
      }))
    };
  }
}
