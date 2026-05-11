import { gsg_male } from "./male/male";
import type { Faction } from "@/core/models/faction";

export const gsg: Faction = {
  id:"gsg",
  name:"GSG-9",
  subfractions:[gsg_male]
}
