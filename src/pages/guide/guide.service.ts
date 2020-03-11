export interface Guide {
  id: number,
  avatar: string,
  name: string,
  tagline: string,
  story: string,
  languages: {
    code: string,
    name: string
  }[]
};