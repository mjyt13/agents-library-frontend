import { sas_male } from "./male/male";
import type { Faction } from "@/core/models/faction";
import { previews } from "./previews";

export const sas: Faction ={
  id: "sas",
  name: "SAS",
  previews,
  subfractions: [sas_male]
}
