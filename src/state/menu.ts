import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const menuOpenAtom = atom(false);

export const evaluationRangeAtom = atomWithStorage("evaluationRangeAtom", {
  min: 0,
  max: 10
});
