/* MC Management — where this page finds the club's books.
 *
 * Put your anon key between the quotes below, upload this file next to
 * app.html, and the page will never ask again on any machine.
 *
 * Supabase → Settings → API Keys → View legacy API keys → the row marked
 * "anon  public". It starts with eyJ and is three long blocks separated by
 * dots.
 *
 * This key is MEANT to be public — it is readable by anyone who opens the
 * page, and that is how Supabase is designed to work. Every rule that
 * matters lives in the database: without signing in it opens nothing at
 * all, and signed in it gives a man only what his office allows.
 *
 * The service_role key is the opposite of that and must NEVER go in here.
 * It ignores every rule in the database.
 */
window.__MCF_CONFIG__ = {
  url:     "https://bnitopfcuqqdbjkszrek.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI"
};
