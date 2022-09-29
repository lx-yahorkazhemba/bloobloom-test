export enum ECollectionColor {
  black = "black",
  tortoise = "tortoise",
  coloured = "coloured",
  crystal = "crystal",
  dark = "dark",
  bright = "bright",
}

export enum ECollectionShape {
  square = "square",
  rectangle = "rectangle",
  round = "round",
  "cat-eye" = "cat-eye",
}

export enum EGlassesTypes {
  spectacles = "spectacles",
  sunglasses = "sunglasses",
}

export enum ESexTypes {
  men = "men",
  women = "women",
}

type TColourFilter = {
  id: "colour";
  value: ECollectionColor;
};

type TShapeFilter = {
  id: "shape";
  value: ECollectionShape;
};

export type TFilter = TColourFilter | TShapeFilter;

export type TSelectedFilters = {
  colour: ECollectionColor[];
  shape: ECollectionShape[];
};
