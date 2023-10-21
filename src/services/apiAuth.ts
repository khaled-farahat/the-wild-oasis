import { UserAttributes } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

type SignupParams = {
  fullName: string;
  email: string;
  password: string;
};

export async function signup({ fullName, email, password }: SignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

type LoginParams = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export type UserType = Awaited<ReturnType<typeof getCurrentUser>>;

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

type UpdateCurrentUserParams = {
  password?: string;
  fullName?: string;
  avatar?: File;
};

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateCurrentUserParams) {
  // 1. Update password Or fullName

  let updateData;

  if (password) updateData = { password };

  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(
    updateData as UserAttributes
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data?.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }
  // 3. Update the avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
