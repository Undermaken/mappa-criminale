import { Box } from "@chakra-ui/react";
import GoogleMapReact, { Coords } from "google-map-react";
import { MarkerMemo } from "./MarkerCriminale";
import { RightDrawer } from "./RightDrawer";
import { record as R, function as F } from "fp-ts";
import { useAtomValue, useSetAtom } from "jotai";
import { menuOpenAtom } from "../state/menu";
import {
  selectedPlaceAtom,
  selectedTourAtom,
  selectedTourNameAtom,
  tourCriminaliAtom
} from "../state/map";
import { FranchinoFab } from "./FranchinoFab";
import { BottomDrawer } from "./BottomDrawer";
import { useEffect, useState } from "react";

export const MapCriminale = () => {
  const [center, setCenter] = useState<Coords | undefined>();
  const setSelectedTourName = useSetAtom(selectedTourNameAtom);
  const selectedTour = useAtomValue(selectedTourAtom);
  const selectedPlace = useAtomValue(selectedPlaceAtom);
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const tourCriminali = useAtomValue(tourCriminaliAtom);
  const places = selectedTour.places;
  const tours: ReadonlyArray<{ key: string; count: number }> = F.pipe(
    tourCriminali.places,
    R.toArray,
    tc =>
      tc.map(kv => ({
        key: kv[0],
        count: kv[1].length
      }))
  ).sort((a, b) => (a.count === b.count ? 0 : b.count - a.count));

  useEffect(() => {
    if (selectedPlace !== undefined) {
      setCenter(selectedPlace.coordinates);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (selectedTour !== undefined) {
      // I'm lazy, set the center using the first place, if it exists
      setCenter(selectedTour.places[0]?.coordinates);
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
          center={center ?? selectedTour.places[0]?.coordinates}
          defaultZoom={11}
        >
          {places.map((p, idx) => (
            <MarkerMemo
              key={`${selectedTour.name}.${idx}`}
              place={p}
              {...p.coordinates}
            />
          ))}
        </GoogleMapReact>
        <FranchinoFab places={places.length} selectedTour={selectedTour.name} />
        <RightDrawer
          onClose={() => setMenuOpen(false)}
          tours={tours}
          onSelectedTour={setSelectedTourName}
        />
        <BottomDrawer />
      </Box>
    </>
  );
};
