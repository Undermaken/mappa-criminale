export type Place = {
  coordinates: {
    lat: number;
    lng: number;
  };
  name: string;
  id: number;
  description: string;
  position_link?: string;
  evaluation?: number;
};
