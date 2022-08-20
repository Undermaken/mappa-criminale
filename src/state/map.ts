import { atom } from "jotai";
import { Place } from "../types/place";
import { evaluationRangeAtom } from "./menu";
import { function as F, option as O } from "fp-ts";
const tripsCriminali: TourCriminali = require("../../scripts/data.json");

export type TourCriminali = Readonly<{
  places: Record<string, Place[]>;
  created_at: number;
}>;
const firstTourKey: string | undefined = Object.keys(tripsCriminali.places)[0];
const firstTour: Place[] | undefined = firstTourKey
  ? tripsCriminali.places[firstTourKey]
  : undefined;
export const tourCriminaliAtom = atom<TourCriminali>(tripsCriminali);

// the place selected
export const selectedPlaceAtom = atom<Place | undefined>(undefined);

export type SelectedTour = { name: string; places: Place[] };
export const selectedTourAtom = atom<SelectedTour | undefined>(
  firstTourKey && firstTour
    ? { name: firstTourKey, places: firstTour }
    : undefined
);

// selector for retrieve only the places of the selected tour, filtered and ordered by evaluation
export const placesSelector = atom<Place[]>(get => {
  const evaluationRange = get(evaluationRangeAtom);
  const selectedTour = get(selectedTourAtom);
  return F.pipe(
    selectedTour?.places,
    O.fromNullable,
    O.map(places =>
      places.filter(
        p =>
          p.evaluation === undefined ||
          (p.evaluation &&
            p.evaluation >= evaluationRange.min &&
            p.evaluation <= evaluationRange.max)
      )
    ),
    O.map(places =>
      places.sort((a, b) =>
        a.evaluation === b.evaluation
          ? 0
          : (b.evaluation ?? 0) - (a.evaluation ?? 0)
      )
    ),
    O.getOrElse<Place[]>(() => [])
  );
});
