export interface Address {
  road?: string;
  village?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export interface OpenStreetMapResponse {
  address: Address;
}
