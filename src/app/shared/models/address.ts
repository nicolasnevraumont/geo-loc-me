export class Address {
  road?: string;
  village?: string;
  town?: string
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;

  public get location_name(): string {
    console.log(this.village);
    return (this.village !== null) ? this.village : this.town;
  }
}

export interface OpenStreetMapResponse {
  address: Address;
}
