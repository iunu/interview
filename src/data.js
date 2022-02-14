export class Raft {
  capacity = 60;
  used = 0;

  get open() {
    return this.capacity - this.used;
  }
}

export class Tray {
  capacity = 240;
  used = 0;

  get open() {
    return this.capacity - this.used;
  }
}

export const varieties = [
  {
    id: "1",
    name: "Thai Basil",
    actions: [
      {
        action_type: "move",
        day: 15
      },
      {
        action_type: "harvest",
        day: 30
      }
    ]
  },
  {
    id: "2",
    name: "Rocket Lettuce"
  },
  {
    id: "3",
    name: "Bib Lettuce"
  },
  {
    id: "4",
    name: "Vine Tomato"
  }
];

export const varietiesw = [
  { name: "Thai Basil" },
  { name: "Rocket Lettuce" },
  { name: "Baby Spinach" },
  { name: "Vine Tomato" }
];
