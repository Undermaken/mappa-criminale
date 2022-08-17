import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { Place } from "../types/place";

export const selectedTourAtom = atomWithStorage<string | undefined>(
  "selectedTour",
  undefined
);

export const selectedPlaceAtom = atom<Place | undefined>(undefined);
