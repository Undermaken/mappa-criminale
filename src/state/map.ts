import { atomWithStorage } from "jotai/utils";

export const selectedTourAtom = atomWithStorage<string | undefined>(
  "selectedTour",
  undefined
);
