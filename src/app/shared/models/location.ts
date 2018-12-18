export class Coords {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export class Location {
  datetime: Date;
  coords: Coords;
  comment: string;
  user: string;
}
