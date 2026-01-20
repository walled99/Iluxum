import { getCollections } from "./src/lib/shopify/client";
import fs from "fs";

async function debug() {
  process.env.SHOPIFY_STORE_DOMAIN = "iluxum-store.myshopify.com";
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = "a0d3356e79206d91475753069151c890";
  
  try {
    const collections = await getCollections();
    const data = collections.map(c => ({ title: c.title, handle: c.handle }));
    fs.writeFileSync("debug_collections.json", JSON.stringify(data, null, 2));
    console.log("Wrote debug_collections.json");
  } catch (e) {
    fs.writeFileSync("debug_error.txt", e.message);
  }
}

debug();
