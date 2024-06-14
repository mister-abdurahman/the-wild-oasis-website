import { createClient } from "@supabase/supabase-js";
import getEnvVariable from "./getEnv";

// export const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );
export const supabase = createClient(
  getEnvVariable("SUPABASE_URL"),
  getEnvVariable("SUPABASE_KEY")
);
