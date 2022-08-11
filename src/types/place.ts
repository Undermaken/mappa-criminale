export type Place = {
  coordinates: {
    lat: number;
    lng: number;
  };
  name: string;
  description: string;
  position_link: string;
  evaluation?: number;
};
