import { fbi_old_male } from "./male/male";
import type { Faction } from "@/core/models/faction";

export const fbi_old: Faction ={
  id:"fbi_old",
  name:"FBI (old)",
  subfractions:[fbi_old_male]
}
