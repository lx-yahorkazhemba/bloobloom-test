const MENU_OPTIONS = {
  SPECTACLES: {
    id: "spectacles",
    label: "SPECTACLES",
    hasSubOptions: true,
  },
  SUNGLASSES: {
    id: "sunglasses",
    label: "SUNGLASSES",
    hasSubOptions: true,
  },
  HOME_TRY_ON: {
    id: "home_try_on",
    label: "HOME TRY ON",
    hasSubOptions: false,
  },
  PAIR_FOR_PAIR: {
    id: "pair_for_pair",
    label: "PAIR FOR PAIR",
    hasSubOptions: false,
  },
} as const;

export const SUB_OPTIONS_LIST = [
  {
    id: "women",
    label: "WOMEN",
  },
  { id: "men", label: "MEN" },
];

export const MENU_OPTIONS_LIST = Object.values(MENU_OPTIONS);
