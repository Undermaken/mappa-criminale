import { Box, Center } from "@chakra-ui/react";
import GoogleMapReact, { Coords } from "google-map-react";
import { MarkerMemo } from "./MarkerCriminale";
import { RightDrawer } from "./RightDrawer";
import { record as R, function as F } from "fp-ts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { menuOpenAtom } from "../state/menu";
import {
  placesSelector,
  selectedPlaceAtom,
  selectedTourAtom,
  tourCriminaliAtom
} from "../state/map";
import { FranchinoFab } from "./FranchinoFab";
import { BottomDrawer } from "./BottomDrawer";
import { useEffect, useState } from "react";
import { isStringNotNullishOrEmpty } from "../utils/string";

const googleMapAPIKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
export const MapCriminale = () => {
  const [center, setCenter] = useState<Coords | undefined>();
  const [selectedTour, setSelectedTour] = useAtom(selectedTourAtom);
  const selectedPlaces = useAtomValue(placesSelector);
  const selectedPlace = useAtomValue(selectedPlaceAtom);
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const tourCriminali = useAtomValue(tourCriminaliAtom);
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
      // see https://github.com/google-map-react/google-map-react/issues/590
      setCenter(selectedTour.places[0]?.coordinates);
    }
  }, [selectedTour]);
  if (!isStringNotNullishOrEmpty(googleMapAPIKey)) {
    return (
      <Center color={"red"} w={"100%"} height={"100vh"}>
        Please add a valid Google Maps API KEY in your .env file
      </Center>
    );
  }
  return (
    <Box w={"100%"} flex={1}>
      <GoogleMapReact
        style={{ zIndex: 0 }}
        options={{
          mapTypeId: "roadmap",
          gestureHandling: "greedy",
          fullscreenControl: false,
          zoomControl: false
        }}
        bootstrapURLKeys={{
          key: googleMapAPIKey,
          language: "it",
          region: "it"
        }}
        zoom={selectedPlace ? 13 : 11}
        center={center ?? selectedTour?.places[0]?.coordinates}
        defaultZoom={11}
      >
        {selectedPlaces.map((p, idx) => (
          <MarkerMemo
            key={`marker.${idx}`}
            place={p}
            {...p.coordinates}
            selected={selectedPlace?.id === p.id}
          />
        ))}
      </GoogleMapReact>

      <FranchinoFab
        places={selectedPlaces.length}
        selectedTour={selectedTour?.name ?? ""}
      />
      <RightDrawer
        onClose={() => setMenuOpen(false)}
        tours={tours}
        onSelectedTour={setSelectedTour}
      />
      <BottomDrawer />
    </Box>
  );
};
