export class Timestamp {
  nanoseconds: number;
  seconds: number;
}

export class GeoPoint {
  latitude: number;
  longitude: number;
}

export class Location {
  comment: string;
  datetime: Timestamp;
  location: GeoPoint
  user: string;

  public get date(): Date {
    return new Date(this.datetime.seconds);
  }
}
