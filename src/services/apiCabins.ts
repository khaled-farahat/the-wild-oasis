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

export async function createCabin(newCabin: NewCabinType) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://ortbhqwctxtvaakejoeb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    if (data) {
      const { id } = data;
      const { error: deleteError } = await supabase
        .from("cabins")
        .delete()
        .match({ id: id as number });

      if (deleteError) {
        console.error(deleteError);
        throw new Error("Cabin could not be deleted");
      }
    }
    console.error(storageError);
    throw new Error("Image could not be uploaded");
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
