export interface Experience { 
  id: number, 
  city_id: number,
  name: string, 
  img: string, 
  guide_id: number, 
  tagline: string, 
  description: string,
  essentials: string,
  rating: number,
  currency: string,
  price: number,
  sessions: {
    day: string,
    time_start: string,
    time_end: string
  }[],
  locations: {
    label: string,
    longitude: number,
    latitude: number
  }[]
};
