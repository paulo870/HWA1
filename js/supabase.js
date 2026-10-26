// ============================================================
// Supabase Client
// ============================================================

const SUPABASE_URL =
    "https://wshwnpsivmmkbtabklna.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Ev1CDyzOV5e3-EQGOFef_A_45wcHoXQ";


// ============================================================
// Create Supabase Client
// ============================================================

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
