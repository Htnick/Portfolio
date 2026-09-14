// Per-image overrides for the astrophotography gallery, keyed by filename
// (matching whatever sits in public/images/astrophotography/). Anything
// not listed here falls back to a title-cased version of the filename.
//
// `target` overrides are limited to cases where the filename itself
// already spells out a standard catalog number (M81, NGC 1333, ...) or an
// unambiguous, widely-used common name (Veil Nebula, Rosette Nebula, ...) —
// this is reformatting an identity the file name already claims, not a
// new claim about what's in the photo.
//
// `date`, `integrationTime`, and `equipment` are real per-session facts
// only Henry has (from acquisition logs) — left blank here on purpose
// rather than guessed. Fill them in as real data becomes convenient to
// pull together; the gallery will pick up whatever's present and just
// omit the rest of the caption line for images without it.
export interface GalleryMeta {
  target?: string;
  date?: string;
  integrationTime?: string;
  equipment?: string;
}

export const GALLERY_META: Record<string, GalleryMeta> = {
  "bodes.jpg": { target: "M81 (Bode's Galaxy)" },
  "bubble.jpg": { target: "Bubble Nebula (NGC 7635)" },
  "californianebula.jpg": { target: "California Nebula (NGC 1499)" },
  "crabfl.jpg": { target: "Crab Nebula (M1)" },
  "crescent-nebula.jpg": { target: "Crescent Nebula (NGC 6888)" },
  "dumbbellcrop.jpg": { target: "Dumbbell Nebula (M27)" },
  "finaleagle.jpg": { target: "Eagle Nebula (M16)" },
  "flyspiderflame.jpg": { target: "Fly, Spider & Flame Nebulae" },
  "heart-soul-1.jpg": { target: "Heart & Soul Nebulae (panel 1)" },
  "heart-soul-2.jpg": { target: "Heart & Soul Nebulae (panel 2)" },
  "heart-soul-3.jpg": { target: "Heart & Soul Nebulae (panel 3)" },
  "heart-soul-4.jpg": { target: "Heart & Soul Nebulae (panel 4)" },
  "heart-soul-5.jpg": { target: "Heart & Soul Nebulae (panel 5)" },
  "heasrt.jpg": { target: "Heart Nebula (IC 1805)" },
  "lionnebula.jpg": { target: "Lion Nebula (Sh2-132)" },
  "m106final.jpg": { target: "M106" },
  "m16.jpg": { target: "Eagle Nebula (M16)" },
  "m51.jpg": { target: "Whirlpool Galaxy (M51)" },
  "m63final.jpg": { target: "Sunflower Galaxy (M63)" },
  "m71.jpg": { target: "M71" },
  "m74.jpg": { target: "M74" },
  "m81.jpg": { target: "M81 (Bode's Galaxy)" },
  "markanians.jpg": { target: "Markarian's Chain" },
  "melotte-15.jpg": { target: "Melotte 15 (in the Heart Nebula)" },
  "ngc1333.jpg": { target: "NGC 1333" },
  "orio.jpg": { target: "Orion Nebula (M42)" },
  "orionfinallr.jpg": { target: "Orion Nebula (M42)" },
  "pillar.jpg": { target: "Pillars of Creation (M16 detail)" },
  "rho.jpg": { target: "Rho Ophiuchi Complex" },
  "rosette.jpg": { target: "Rosette Nebula (NGC 2237)" },
  "sadr-2.jpg": { target: "Sadr Region (IC 1318)" },
  "spaghettinebulafinal.jpg": { target: "Spaghetti Nebula (Simeis 147)" },
  "veil-wide.jpg": { target: "Veil Nebula (wide field)" },
  "viel.jpg": { target: "Veil Nebula" },
};
