import { Context } from "@nuxt/types";
import { setClient } from "~/services/http-client";

export default ({ app }: Context) => {
  setClient(app.$axios);
};
