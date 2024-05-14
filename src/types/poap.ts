export interface OsNftResponse {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string | null;
  description: string | null;
  image_url: string | null;
  metadata_url: string | null;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface PoapResponse {
  event: {
    id: number;
    fancy_id: string;
    name: string;
    event_url: string;
    image_url: string;
    country: string;
    city: string;
    description: string;
    year: number;
    start_date: string;
    end_date: string;
    expiry_date: string;
    supply: number;
  };
  tokenId: string;
  owner: string;
  chain: string;
  created: string;
}

export interface OsNft extends Omit<OsNftResponse, 'metadata_url'> {
  metadata: {
    name: string;
    image: string;
    description: string;
    attributes: { value: string; trait_type: string }[];
    external_url?: string;
  } | null;
  floorPrice: number;
}
