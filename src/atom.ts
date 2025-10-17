import { atom } from "recoil";

interface ITosoState {
  [key:string]:string[]
}

export const todoState = atom<ITosoState>({
  key: "todo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});