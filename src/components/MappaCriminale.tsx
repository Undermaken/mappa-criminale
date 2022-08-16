import { Avatar, Box, HStack, Text, useMediaQuery } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { Place } from "../types/place";
import { MarkerMemo } from "./MarkerCriminale";
import { DrawerMenu } from "./DrawerMenu";
import { record as R, function as F } from "fp-ts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { evalutationRangeAtom, menuOpenAtom } from "../state/menu";
import { selectedTourAtom } from "../state/map";

const tripsCriminali: Record<
  string,
  Place[]
> = require("./../../scripts/data.json");

export const MappaCriminale = () => {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const evalutationRange = useAtomValue(evalutationRangeAtom);
  const [selectedTour, setSelectedTour] = useAtom(selectedTourAtom);
  const tours = F.pipe(tripsCriminali, R.toArray, tc =>
    tc.map(kv => ({
      key: kv[0],
      count: kv[1].length
    }))
  ).sort((a, b) => (a.count === b.count ? 0 : b.count - a.count));
  const selectedTourKey = selectedTour ?? tours[0].key;
  const center = tripsCriminali[selectedTourKey][0].coordinates;
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Box h={"100vh"} w={"100%"}>
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
          center={center}
          defaultZoom={11}
        >
          {tripsCriminali[selectedTourKey]
            .filter(
              p =>
                p.evaluation &&
                p.evaluation >= evalutationRange.min &&
                p.evaluation <= evalutationRange.max
            )
            .map((p, idx) => (
              <MarkerMemo
                key={`${selectedTourKey}.${idx}`}
                place={p}
                {...p.coordinates}
              />
            ))}
        </GoogleMapReact>
        <Box
          style={{ zIndex: 1, position: "absolute", left: 4 }}
          bottom={isMobile ? 16 : 8}
        >
          <HStack
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMenuOpen(pv => !pv);
            }}
          >
            <Avatar
              src={"/franchino.png"}
              size={"lg"}
              bgColor={"whiteAlpha.700"}
              borderWidth={2}
              p={1}
              borderColor={"blue.700"}
            />
            <Text p={2} bgColor={"whiteAlpha.900"} borderRadius={4}>
              {`${selectedTourKey} (${
                tours.find(t => t.key === selectedTourKey)?.count ?? ""
              })`}
            </Text>
          </HStack>
          <DrawerMenu
            onClose={() => setMenuOpen(false)}
            tours={tours}
            onSelectedTour={mk => {
              setSelectedTour(mk);
              setMenuOpen(false);
            }}
          />
        </Box>
      </Box>
    </>
  );
};
