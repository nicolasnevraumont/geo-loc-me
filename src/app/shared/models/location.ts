import { Address } from "./address";

export class User {
  uid: string;
  email: string;
  displayName: string;

  constructor(obj?: any) {
    if (obj) {
      for (const property in obj) {
        this[property] = obj[property];
      }
    }
  }
}

export class Coords {
  latitude: number;
  longitude: number;
  altitude?: number;

  constructor(obj?: any) {
    if (obj) {
      for (const property in obj) {
        this[property] = obj[property];
      }
    }
  }
}

export class Location {
  id?: string;
  address: Address;
  datetime: Date;
  coords: Coords;
  comment: string;
  user: User;

  constructor(obj?: any) {
    if (obj) {
      for (const property in obj) {
        switch (property) {
          case 'address':
            this.address = new Address(obj.address);
            break;
          case 'datetime':
            this.datetime = new Date(obj.datetime);
            break;
          case 'coords':
            this.coords = new Coords(obj.coords);
            break;
          case 'user':
            this.user = new User(obj.user);
            break;
          default:
            this[property] = obj[property];
            break;
        }
      }
    }
  }
}
