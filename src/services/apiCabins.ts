import { Cabin } from "@/types";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin: Cabin) {
  const { data, error } = await supabase.from("cabins").insert([newCabin]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
