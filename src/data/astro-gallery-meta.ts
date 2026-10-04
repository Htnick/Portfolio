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
// `date` (YYYY-MM-DD) drives the gallery's sort order (newest first) and
// is shown as "Mon YYYY". The exported JPGs carry no EXIF, so these come
// from the file dates of the finished originals in ~/Desktop/FInals
// (2024 astro / 2025astro / 2026 astro) — close to, but not exactly, the
// capture night. Correct any of them from acquisition logs as needed.
//
// `integrationTime` and `equipment` are real per-session facts only Henry
// has — left blank on purpose rather than guessed. The gallery picks up
// whatever's present and omits the rest of the caption line.
export interface GalleryMeta {
  target?: string;
  date?: string;
  integrationTime?: string;
  equipment?: string;
}

export const GALLERY_META: Record<string, GalleryMeta> = {
  "bodes.jpg": { target: "M81 (Bode's Galaxy)", date: "2026-03-21" },
  "bubble.jpg": { target: "Bubble Nebula (NGC 7635)", date: "2025-10-24" },
  "californianebula.jpg": { target: "California Nebula (NGC 1499)", date: "2024-12-09" },
  "caliuvir.jpg": { date: "2025-09-27" },
  "crabfl.jpg": { target: "Crab Nebula (M1)", date: "2025-10-17" },
  "crescent-nebula.jpg": { target: "Crescent Nebula (NGC 6888)", date: "2026-05-26" },
  "dumbbellcrop.jpg": { target: "Dumbbell Nebula (M27)", date: "2025-07-28" },
  "final-mos.jpg": { date: "2026-06-14" },
  "finaleagle.jpg": { target: "Eagle Nebula (M16)", date: "2025-07-19" },
  "flyspiderflame.jpg": { target: "Fly, Spider & Flame Nebulae", date: "2025-12-20" },
  "heart-soul-1.jpg": { target: "Heart & Soul Nebulae (panel 1)", date: "2025-10-23" },
  "heart-soul-2.jpg": { target: "Heart & Soul Nebulae (panel 2)", date: "2025-10-23" },
  "heart-soul-3.jpg": { target: "Heart & Soul Nebulae (panel 3)", date: "2025-10-23" },
  "heart-soul-4.jpg": { target: "Heart & Soul Nebulae (panel 4)", date: "2025-10-23" },
  "heart-soul-5.jpg": { target: "Heart & Soul Nebulae (panel 5)", date: "2025-10-23" },
  "heasrt.jpg": { target: "Heart Nebula (IC 1805)", date: "2026-04-04" },
  "lionnebula.jpg": { target: "Lion Nebula (Sh2-132)", date: "2025-06-23" },
  "m106final.jpg": { target: "M106", date: "2025-02-23" },
  "m16.jpg": { target: "Eagle Nebula (M16)", date: "2026-06-20" },
  "m51.jpg": { target: "Whirlpool Galaxy (M51)", date: "2025-03-02" },
  "m63final.jpg": { target: "Sunflower Galaxy (M63)", date: "2026-02-04" },
  "m71.jpg": { target: "M71", date: "2026-05-13" },
  "m74.jpg": { target: "M74", date: "2025-10-29" },
  "m81.jpg": { target: "M81 (Bode's Galaxy)", date: "2025-12-23" },
  "markanians.jpg": { target: "Markarian's Chain", date: "2026-02-27" },
  "mel.jpg": { date: "2025-10-31" },
  "melotte-15.jpg": { target: "Melotte 15 (in the Heart Nebula)", date: "2024-11-30" },
  "ngc1333.jpg": { target: "NGC 1333", date: "2025-09-19" },
  "o-shot.jpg": { date: "2025-11-27" },
  "orio.jpg": { target: "Orion Nebula (M42)", date: "2026-01-28" },
  "orionfinallr.jpg": { target: "Orion Nebula (M42)", date: "2024-11-28" },
  "pillar.jpg": { target: "Pillars of Creation (M16 detail)", date: "2025-08-24" },
  "rho.jpg": { target: "Rho Ophiuchi Complex", date: "2025-04-01" },
  "rosette.jpg": { target: "Rosette Nebula (NGC 2237)", date: "2026-03-03" },
  "sadr-2.jpg": { target: "Sadr Region (IC 1318)", date: "2025-06-10" },
  "spaghettinebulafinal.jpg": { target: "Spaghetti Nebula (Simeis 147)", date: "2025-02-06" },
  "sunnus.jpg": { date: "2026-02-22" },
  "veil-wide.jpg": { target: "Veil Nebula (wide field)", date: "2026-07-14" },
  "viel.jpg": { target: "Veil Nebula", date: "2026-06-17" },
  "waterfallnebula.jpg": { date: "2025-05-28" },
};
