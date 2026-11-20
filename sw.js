/* ============================================================
   MC Management - keeping the page on the device
   ------------------------------------------------------------
   One job: the page itself opens with no signal. The books are
   not this file's business; the page looks after those.

   Newest first, always. With a signal the page comes off the
   server exactly as it did before, and the copy here is
   replaced. With no signal, the last copy comes up.

   Nothing of the club's goes through here: anything that is not
   served from this same address - the database above all - is
   left alone entirely.
   ============================================================ */
var CACHE = "mc-management-shell-v1";

self.addEventListener("install", function(){ self.skipWaiting(); });

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k===CACHE? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var url;
  try{ url = new URL(req.url); }catch(err){ return; }
  if(url.origin !== self.location.origin) return;   /* the database is not ours to touch */

  e.respondWith(
    fetch(req).then(function(res){
      if(res && res.ok && res.type === "basic"){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); }).catch(function(){});
      }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){
        if(hit) return hit;
        /* He typed the address rather than following a link he had open */
        if(req.mode === "navigate")
          return caches.match("index.html")
            .then(function(h){ return h || caches.match("./"); });
        return new Response("", {status:504, statusText:"No signal"});
      });
    })
  );
});
