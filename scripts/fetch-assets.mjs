// Downloads the venue's own photography from its current Squarespace CDN
// and stores web-optimised masters in /public/images. next/image derives
// AVIF/WebP responsive variants from these at request time.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://images.squarespace-cdn.com/content/v1/65e9c93ebd0af41deabc2fba/";
const assets = {
  "library-room": "1dac02de-3301-4a14-afd5-10a69943604f/20250430-DSCF3756-HDR.jpg",
  "gym-hall": "2242059b-200b-4ada-9338-76f8cc372512/20250430-DSCF3612-edit.jpg",
  "parlour": "5145955f-b84e-4f8c-8463-32e36af8d67f/20250430-DSCF3781-HDR.jpg",
  "aerial-night": "55b8a485-0785-4eed-b38a-13fa31f5739e/20250521-DJI_0486-HDR-Pano-Edit.jpg",
  "bar-front": "5a7a6c28-9959-4d7f-8668-1593fa271f3d/20250430-DSCF3481-HDR-Edit.jpg",
  "entrance-sign": "7dbe1c08-8d4c-4516-bab6-9dcde227e4f4/20250521-DSCF7331-HDR.jpg",
  "heavens-door-shelf": "888da587-9af9-41f4-9402-b9d22587b2cd/20250430-DSCF0454.jpg",
  "courtyard-dusk": "8be084a5-1dee-4979-b776-bc225b95a4e8/20250521-DSCF7453-HDR.jpg",
  "crest": "9c38c8c9-ee4d-4a0c-b047-23364115535f/05+TLR+Iconography.png",
  "courtyard-firepit": "bce6c20c-22bf-442d-a6bc-4f759ac363aa/20250521-DSCF7444-HDR-Edit.jpg",
  "exterior-day": "cf900196-51e4-4a86-929c-3a7c5c054618/20250521-DSCF7394-HDR.jpg",
  "chapel-ceiling": "e45e7162-d9e2-459e-90b6-c0d3cfba1dcb/20250521-DSCF7193-HDR-Edit.jpg",
  "windows-closeup": "1a362a38-347e-4a57-97ae-5a6b93f8b8be/Last+Refuge_Exterior_CloseUp.png",
  "patio-day": "262fd92e-3e97-400c-8a6d-bcb302432f77/Last+Refuge_Exterior.png",
  "velvet-lounge": "36521a4c-862d-4837-adc4-7dc8a6a451b6/Last+Refuge+couch+%281+of+1%29-min.jpg",
  "the-pour": "38265b20-3ca3-420d-9f5d-ec9b59f75360/Last+Refuge_Pouring+Drink.png",
  "lounge-window": "3bb8905e-518f-438b-97b8-decf22c42a15/Last+Refuge+welcome+%281+of+1%29-min.jpg",
  "gym-mezzanine": "59a46105-b71f-4bb1-8119-43b51ba50a35/Last+Refuge_Gym+Room.png",
  "bourbon-wall": "7193d9d5-fcea-47e0-90e2-85c4b412b455/Last+Refuge_Bourbon+Wall.png",
  "facade-night": "910edd7c-c3db-465f-b73e-df1ffa1359a2/Last+Refuge_Night+Courtyard.JPG",
  "arrival": "92d5c8fe-5cf7-4190-86fd-62b2d3e4a5a6/Last+Refuge_Friends+Entering+2.png",
  "stained-glass-cocktail": "996b383b-9f0f-452a-a165-cf1c30bd9a66/Last+Refuge+drink+%281+of+1%29-min.jpg",
  "chapel-room": "c49dfa2d-c6a0-4892-9b26-1dcb8a072eb6/Last+Refuge_Chapel+Room.png",
  "spire-dusk": "ce995ee4-aeb7-4561-8fa2-b6e5118d36a1/Last+Refuge_Night+Exterior.jpg",
  "courtyard-aerial": "f70ffc82-1a18-4fae-8865-e69cec0c8b59/Last+Refuge_Exterior+2.png",
  "chapel-wide": "92e01e13-8dc9-428c-aa84-4689dce529bc/Last+Refuge_Chapel+Room_compressed.png",
  "logo": "1bfc4b9e-f478-4390-be4e-fbe3559be707/The-Last-Refuge_Logo_Elements_OUTLINED-02.png",
};

await mkdir("public/images", { recursive: true });
const manifest = {};
for (const [name, path] of Object.entries(assets)) {
  const res = await fetch(`${BASE}${path}?format=2500w`);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const isGraphic = name === "crest" || name === "logo";
  let img = sharp(buf).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true });
  const out = isGraphic ? `public/images/${name}.png` : `public/images/${name}.jpg`;
  img = isGraphic ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 82, mozjpeg: true });
  const info = await img.toFile(out);
  manifest[name] = { width: info.width, height: info.height };
  console.log(name, info.width, info.height, Math.round(info.size / 1024) + "KB");
}
await writeFile("content/image-dimensions.json", JSON.stringify(manifest, null, 2));
