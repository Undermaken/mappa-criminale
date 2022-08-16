import { atomWithStorage } from "jotai/utils";

export const menuOpenAtom = atomWithStorage("menuOpenAtom", false);

export const evalutationRangeAtom = atomWithStorage("evalutationRangeAtom", {
  min: 0,
  max: 10
});
