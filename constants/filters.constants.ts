const FILTERS = {
  COLOUR: {
    id: "colour",
    options: [
      {
        name: "Black",
        id: "black",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_black_01.png",
      },
      {
        name: "Tortoise",
        id: "tortoise",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_tortoise_02.png",
      },
      {
        name: "Coloured",
        id: "coloured",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_coloured_03.png",
      },
      {
        name: "Crystal",
        id: "crystal",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_crystal_04.png",
      },
      {
        name: "Dark",
        id: "dark",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_dark_05.png",
      },
      {
        name: "Bright",
        id: "bright",
        src: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_bright_06.png",
      },
    ],
    requestParam: "filters[glass_variant_frame_variant_colour_tag_configuration_names]",
  },
  SHAPE: {
    id: "shape",
    options: [
      { name: "Square", id: "square" },
      { name: "Rectangle", id: "rectangle" },
      { name: "Round", id: "round" },
      { name: "Cat-Eye", id: "cat-eye" },
    ],
    requestParam: "filters[glass_variant_frame_variant_frame_tag_configuration_names]",
  },
} as const;

export const FILTERS_LIST = Object.values(FILTERS);
