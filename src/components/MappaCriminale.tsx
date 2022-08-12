import { Box } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { Place } from "../types/place";
import { MarkerCriminale } from "./MarkerCriminale";

const tripsCriminali: Record<
  string,
  Place[]
> = require("./../../scripts/data.json");

export const MappaCriminale = () => {
  const selectedKey = "Gelati Criminali";
  const defaultProps = {
    center: {
      lat: 41.919841,
      lng: 12.508648
    },
    zoom: 11
  };
  return (
    <Box h={"100vh"} w={"100%"}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {tripsCriminali[selectedKey].map((p, idx) => (
          <MarkerCriminale
            key={`${selectedKey}.${idx}`}
            place={p}
            {...p.coordinates}
          />
        ))}
      </GoogleMapReact>
    </Box>
  );
};
