import { Avatar, Box } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";

type MarkerProps = {
  lat: number;
  lng: number;
  text: string;
};
const Marker = ({ text }: MarkerProps) => {
  return <Avatar name={text} src="https://bit.ly/dan-abramov" />;
};

export const MappaCriminale = () => {
  const defaultProps = {
    center: {
      lat: 41.919841,
      lng: 12.508648
    },
    zoom: 11
  };
  return (
    <Box h={"100vh"} w={"100%"} backgroundColor={"red"}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          key={123}
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text={"text"}
        />
      </GoogleMapReact>
    </Box>
  );
};
