import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { Place } from "../types/place";
import { evalutationRangeAtom } from "./menu";
import { function as F, option as O } from "fp-ts";
const tripsCriminali: TourCriminali = require("../../scripts/data.json");

export type TourCriminali = Readonly<{
  places: Record<string, Place[]>;
  created_at: number;
}>;

export const tourCriminaliAtom = atom<TourCriminali>(tripsCriminali);

// the tour name selected
export const selectedTourNameAtom = atomWithStorage<string>(
  "selectedTourNameAtom",
  Object.keys(tripsCriminali.places)[0]
);

// the place selected
export const selectedPlaceAtom = atom<Place | undefined>(undefined);

// selector for retrieve the selected tour within its places
export const selectedTourAtom = atom<{ name: string; places: Place[] }>(get => {
  const evaluationRange = get(evalutationRangeAtom);
  const selectedTourName = get(selectedTourNameAtom);
  const tourCriminali = get(tourCriminaliAtom);
  const places = F.pipe(
    selectedTourName,
    O.fromNullable,
    O.map(stn => tourCriminali.places[stn]),
    O.map(places =>
      places.filter(
        p =>
          p.evaluation === undefined ||
          (p.evaluation &&
            p.evaluation >= evaluationRange.min &&
            p.evaluation <= evaluationRange.max)
      )
    ),
    O.getOrElse<Place[]>(() => [])
  );
  return { name: selectedTourName ?? "n/a", places };
});
