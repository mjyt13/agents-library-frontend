import { sas_male } from "./male/male";
import type { Faction } from "@/core/models/faction";

export const sas: Faction ={
  id: "sas",
  name: "SAS",
  subfractions: [sas_male]
}
