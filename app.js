var crypto = require('crypto');
const generate = (str) =>
  new Uint8Array(
    [...unescape(encodeURIComponent(str))].map((c) => c.charCodeAt(0))
  );

app.get("/integry-params", function (req, res) {
  const appSecret = "123";
  const appKey = "345";
  const userId = "yasir@integry.io";

  const message = generate(userId);
  const key = generate(appSecret);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );

  const signed = await crypto.subtle.sign("HMAC", cryptoKey, message);

  const hash = [...new Uint8Array(signed)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  res.json({
    hash,
    appKey,
    userId,
  });
});
