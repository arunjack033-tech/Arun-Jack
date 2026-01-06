import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
    "https://udecpjkuzuintileltby.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY
);
