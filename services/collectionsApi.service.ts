import { stringify } from "qs";
import httpClient from "./http-client";
import { ICollectionFilters, IGetCollectionResponse } from "./collectionsApi.types";

export default {
  getCollection(
    collection: string,
    filters: ICollectionFilters,
    pageNumber: number,
  ): Promise<IGetCollectionResponse> {
    const query = stringify(
      {
        sort: {
          type: "collection_relations_position",
          order: "asc",
        },
        page: {
          limit: 12,
          number: pageNumber,
        },
        filters: {
          glass_variant_frame_variant_colour_tag_configuration_names: [...filters.colour],
          glass_variant_frame_variant_frame_tag_configuration_names: [...filters.shape],
          lens_variant_prescription: ["fashion"],
          lens_variant_types: ["classic"],
          frame_variant_home_trial_available: false,
        },
      },
      { arrayFormat: "brackets", encode: false },
    );
    return httpClient.get(`/collections/${collection}/glasses?${query}`);
  },
};
