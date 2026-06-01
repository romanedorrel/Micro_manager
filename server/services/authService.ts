import { supabase } from "../lib/supabaseServer";

export const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const logInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
