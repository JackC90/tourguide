export interface City { 
  id: number, 
  name: string, 
  img: string,
  location: {
    longitude: number,
    latitude: number
  } 
};