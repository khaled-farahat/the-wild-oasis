import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const supabaseUrl = "https://ortbhqwctxtvaakejoeb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ydGJocXdjdHh0dmFha2Vqb2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NTIzMzAsImV4cCI6MjAxMjQyODMzMH0.QWjH8MPfYUd5Dx00Plza6bxak1-536NC_hN92SgJTHM";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;

// to create types for your database:
// 1. install supabase cli as dev dependency
// 2. run `npx supabase login` as you need to be logged in to create types
// 3. create access token in supabase
// 4. see see script 'generate:types' in package.json
// 5. add your project id from settings in supabase in place after --project-id
// 6. run `npm run generate:types`
// 7. this types are not sync with your database, so you need to run this script every time you change your database
