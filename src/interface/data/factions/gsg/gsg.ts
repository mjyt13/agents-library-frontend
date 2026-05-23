import { gsg_male } from "./male/male";
import type { Faction } from "@/core/models/faction";
import { previews } from "./previews";

export const gsg: Faction = {
  id:"gsg",
  name:"GSG-9",
  previews,
  subfractions:[gsg_male]
}
