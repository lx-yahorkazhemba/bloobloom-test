import { ECollectionColor, ECollectionShape } from "~/constants";

interface IMedia {
  file_location: "colours" | "glass_variants";
  file_name: string;
  id: number;
  medium_type: "colour" | "image";
  mime_type: string;
  original_file_name: string;
  position: number;
  size: number;
  url: string;
}

interface IFrameVariant {
  barcode: unknown;
  colour: { id: number; name: string; media: IMedia[] };
  configuration_name: string;
  harmonized_system_code: unknown;
  id: number;
  name: string;
  status: string;
  stock_keeping_unit: unknown;
}

interface IGlassVariant {
  id: number;
  barcode: unknown;
  default_glass_variant: boolean;
  harmonized_system_code: unknown;
  home_trial_available: boolean;
  inventory: boolean;
  price: number;
  stock_keeping_unit: unknown;
  frame_variant: IFrameVariant[];
  media: IMedia[];
}

export interface IGlasses {
  configuration_name: string;
  cost_breakdown: {
    [key: string]: number;
  };
  default_collection_name: unknown;
  glass_variants: IGlassVariant[];
  id: number;
  name: string;
}

export interface ICollectionFilters {
  colour: ECollectionColor[];
  shape: ECollectionShape[];
}

export interface IGetCollectionResponse {
  glasses: IGlasses[];
  meta: {
    total_count: number;
  };
}
