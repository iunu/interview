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

  constructor(variety) {
    this.variety = variety;
  }

  get open() {
    return this.capacity - this.used;
  }

  get name() {
    return this.variety.name;
  }
}

export const varieties = [
  {
    id: "1",
    name: "Thai Basil",
    actions: [
      {
        type: "transplant",
        day: 10
      },
      {
        type: "harvest",
        day: 30
      }
    ]
  },
  {
    id: "2",
    name: "Sweet Lettuce",
    actions: [
      {
        type: "transplant",
        day: 14
      },
      {
        type: "harvest",
        day: 38
      }
    ]
  },
  {
    id: "3",
    name: "Astro Arugula",
    actions: [
      {
        type: "transplant",
        day: 3
      },
      {
        type: "harvest",
        day: 21
      }
    ]
  }
];
