import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

type Direction = "N" | "E" | "W" | "S";
type Instruction = Direction | "L" | "R" | "F";
interface Action {
  type: Instruction;
  amt: number;
}

type Input = Action[];

interface State {
  x: number;
  y: number;
  directionFacing: Direction;
}

interface Location {
  x: number;
  y: number;
}

interface Waypoint {
  x: number;
  y: number;
}

export class DaySolution implements Solution {
  parse(input: string): Input {
    return input.split("\n").map((str) => {
      return {
        type: str.charAt(0) as Instruction,
        amt: Number(str.split("").slice(1).join("")),
      };
    });
  }

  part1(input: Input) {
    const finalState = input.reduce(
      (prevState, action) => {
        return this.makeMove(action, prevState);
      },
      {
        x: 0,
        y: 0,
        directionFacing: "E",
      } as State
    );

    return finalState.x + finalState.y;
  }

  makeMove(action: Action, currentState: State): State {
    switch (action.type) {
      case "E":
        return {
          ...currentState,
          x: currentState.x + action.amt,
        };
      case "W":
        return {
          ...currentState,
          x: currentState.x - action.amt,
        };
      case "N":
        return {
          ...currentState,
          y: currentState.y - action.amt,
        };
      case "S":
        return {
          ...currentState,
          y: currentState.y + action.amt,
        };
      case "L":
      case "R":
        return this.turn(action.type, action.amt, currentState);
      case "F":
        return this.makeMove(
          { type: currentState.directionFacing, amt: action.amt },
          currentState
        );
    }
  }

  turn(dir: "L" | "R", amt: number, currentState: State): State {
    let numberOfTurns = amt;
    let currentDir = currentState.directionFacing;
    while (numberOfTurns > 0) {
      if (currentDir === "E") {
        currentDir = dir === "L" ? "N" : "S";
      } else if (currentDir === "N") {
        currentDir = dir === "L" ? "W" : "E";
      } else if (currentDir === "W") {
        currentDir = dir === "L" ? "S" : "N";
      } else if (currentDir === "S") {
        currentDir = dir === "L" ? "E" : "W";
      }

      numberOfTurns -= 90;
    }

    return {
      ...currentState,
      directionFacing: currentDir,
    };
  }

  part2(input: Input) {
    const location: Location = {
      x: 0,
      y: 0,
    };
    const waypoint: Waypoint = {
      x: 10,
      y: 1,
    };

    const { location: final } = input.reduce(
      ({ location, waypoint }, action) => {
        return {
          location: this.moveShip(action, location, waypoint),
          waypoint: this.changeWaypoint(action, waypoint),
        };
      },
      {
        location,
        waypoint,
      }
    );

    return Math.abs(final.x) + Math.abs(final.y);
  }

  changeWaypoint(action: Action, waypoint: Waypoint): Waypoint {
    if (action.type === "L" || action.type === "R") {
      let x = waypoint.x;
      let y = waypoint.y;
      let amt = action.amt;
      while (amt > 0) {
        const oldX = x;
        const oldY = y;
        switch (action.type) {
          case "R":
            y = -1 * oldX;
            x = oldY;
            break;
          case "L":
            y = oldX;
            x = -1 * oldY;
            break;
        }
        amt -= 90;
      }

      return {
        x,
        y,
      };
    } else {
      switch (action.type) {
        case "E":
          return {
            ...waypoint,
            x: waypoint.x + action.amt,
          };
        case "W":
          return {
            ...waypoint,
            x: waypoint.x - action.amt,
          };
        case "N":
          return {
            ...waypoint,
            y: waypoint.y + action.amt,
          };
        case "S":
          return {
            ...waypoint,
            y: waypoint.y - action.amt,
          };
      }
    }
    return waypoint;
  }

  moveShip(action: Action, location: Location, waypoint: Waypoint): Location {
    if (action.type === "F") {
      return {
        x: location.x + waypoint.x * action.amt,
        y: location.y + waypoint.y * action.amt,
      };
    }
    return location;
  }

  async run() {
    const input = readInput("./inputs/d12.txt");
    const parsed = this.parse(input);
    const p1 = this.part2(parsed);
    return p1.toString();
  }
}
