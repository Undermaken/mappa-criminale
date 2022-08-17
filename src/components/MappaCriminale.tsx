import { Box, useMediaQuery } from "@chakra-ui/react";
import GoogleMapReact, { Coords } from "google-map-react";
import { Place } from "../types/place";
import { MarkerMemo } from "./MarkerCriminale";
import { RightDrawer } from "./RightDrawer";
import { record as R, function as F } from "fp-ts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { evalutationRangeAtom, menuOpenAtom } from "../state/menu";
import { selectedPlaceAtom, selectedTourAtom } from "../state/map";
import { FranchinoFab } from "./FranchinoFab";
import { BottomDrawer } from "./BottomDrawer";
import { useEffect, useState } from "react";
import { type } from "os";

const tripsCriminali: Record<
  string,
  Place[]
> = require("./../../scripts/data.json");

export const MappaCriminale = () => {
  const evaluationRange = useAtomValue(evalutationRangeAtom);
  const [center, setCenter] = useState<Coords | undefined>();
  const [selectedTour, setSelectedTour] = useAtom(selectedTourAtom);
  const selectedPlace = useAtomValue(selectedPlaceAtom);
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const tours = F.pipe(tripsCriminali, R.toArray, tc =>
    tc.map(kv => ({
      key: kv[0],
      count: kv[1].length
    }))
  ).sort((a, b) => (a.count === b.count ? 0 : b.count - a.count));
  const selectedTourKey = selectedTour || tours[0].key;
  const places = tripsCriminali[selectedTourKey].filter(
    p =>
      p.evaluation &&
      p.evaluation >= evaluationRange.min &&
      p.evaluation <= evaluationRange.max
  );
  useEffect(() => {
    if (selectedPlace !== undefined) {
      setCenter(selectedPlace.coordinates);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (selectedTour !== undefined) {
      setCenter(places[0]?.coordinates);
    }
  }, [places, selectedTour]);

  return (
    <>
      <Box w={"100%"} flex={1} backgroundColor={"red"}>
        <GoogleMapReact
          style={{ zIndex: 0 }}
          options={{
            mapTypeId: "roadmap",
            gestureHandling: "greedy",
            fullscreenControl: false,
            zoomControl: false
          }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string,
            language: "it",
            region: "it"
          }}
          center={center ?? places[0]?.coordinates}
          defaultZoom={11}
        >
          {places.map((p, idx) => (
            <MarkerMemo
              key={`${selectedTourKey}.${idx}`}
              place={p}
              {...p.coordinates}
            />
          ))}
        </GoogleMapReact>
        <FranchinoFab places={places.length} selectedTour={selectedTourKey} />
        <RightDrawer
          onClose={() => setMenuOpen(false)}
          tours={tours}
          onSelectedTour={mk => {
            setSelectedTour(mk);
            setMenuOpen(false);
          }}
        />
        <BottomDrawer />
      </Box>
    </>
  );
};
