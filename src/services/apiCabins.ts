import { NewCabinType } from "@/types";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin: NewCabinType, id?: number) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName =
    newCabin.image instanceof File &&
    `${Math.random()}-${newCabin.image.name}`.replace(/\//g, "");

  const imagePath = hasImagePath
    ? (newCabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (id) query = query.update({ ...newCabin, image: imagePath }).match({ id });

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload Image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName as string, newCabin.image);

    if (storageError) {
      const { id } = data;
      const { error: deleteError } = await supabase
        .from("cabins")
        .delete()
        .match({ id });

      if (deleteError) {
        console.error(deleteError);
        throw new Error("Cabin could not be deleted");
      }
      console.error(storageError);
      throw new Error("Image could not be uploaded");
    }
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
