export class Address {
  road?: string;
  village?: string;
  town?: string
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;

  constructor(obj: any) {
    if (obj) {
      for (const property in obj) {
        this[property] = obj[property];
      }
    }
  }

  public get location_name(): string {
    return (this.village !== null) ? this.village : this.town;
  }
}

export interface OpenStreetMapResponse {
  address: Address;
}
