import { atomWithStorage } from "jotai/utils";

export const menuOpenAtom = atomWithStorage("menuOpenAtom", false);

export const evaluationRangeAtom = atomWithStorage("evaluationRangeAtom", {
  min: 0,
  max: 10
});
