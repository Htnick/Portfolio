// Shared data for the astrophotography pages (src/pages/astrophotography/).
import fs from "node:fs";
import path from "node:path";
import { GALLERY_META } from "./astro-gallery-meta";

// Auto-discovered gallery: every JPG/PNG dropped into
// public/images/astrophotography/ shows up here on the next build — no
// code changes needed to add a new photo. See PHOTOS_NEEDED.md. Per-image
// target/date/integration-time overrides live in src/data/astro-gallery-meta.ts.
export const galleryDir = path.join(process.cwd(), "public/images/astrophotography");
export const galleryFiles = fs.existsSync(galleryDir)
  ? fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort((a, b) => a.localeCompare(b))
  : [];

export function labelFor(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatMonthYear(iso?: string) {
  const m = iso?.match(/^(\d{4})-(\d{2})/);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : undefined;
}

export const galleryItems = galleryFiles.map((file) => {
  const meta = GALLERY_META[file] ?? {};
  const label = meta.target ?? labelFor(file);
  const dateLabel = formatMonthYear(meta.date);
  const captionParts = [dateLabel, meta.integrationTime, meta.equipment].filter(Boolean);
  const webpFile = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const hasWebp = fs.existsSync(path.join(galleryDir, webpFile));
  return {
    url: `${import.meta.env.BASE_URL}images/astrophotography/${file}`,
    // Pre-generated WebP sibling (see scripts, or regenerate with sharp)
    // — same content, ~40% smaller. Falls back to the JPG/PNG when a
    // browser doesn't support it or no .webp was generated for a file.
    webpUrl: hasWebp ? `${import.meta.env.BASE_URL}images/astrophotography/${webpFile}` : undefined,
    label,
    filename: file,
    date: meta.date ?? "",
    dateLabel,
    detail: captionParts.length > 0 ? captionParts.join(" · ") : undefined,
  };
})
  // Newest first, by capture date (see astro-gallery-meta.ts). Undated
  // photos fall to the end; ties break alphabetically for a stable order.
  .sort((a, b) => b.date.localeCompare(a.date) || a.filename.localeCompare(b.filename));

export const BASE = import.meta.env.BASE_URL;
export const WF = `${BASE}images/astro-workflow/`;
export const PX = `${BASE}images/astro-processing/`;
export const TS = `${BASE}images/astro-telescope/`;
export const NT = `${BASE}images/astro-night/`;

// Every change made to the CarbonStar 200 since buying it.
export const MODS = [
  { tag: "Focus", title: "ESATTO 2\" robotic focuser", note: "Replaced the stock focuser. I designed the mounting plate, prototyped it in 3D print, then had it made in matte black anodized aluminum." },
  { tag: "Stray light", title: "Dew shield", note: "3D-printed; its inner diameter matches the tube's outer diameter so it never vignettes the aperture." },
  { tag: "Stray light", title: "Flocked upper tube", note: "Dark stick-on flocking inside the tube to kill internal reflections and lift contrast." },
  { tag: "Stray light", title: "Primary mirror mask", note: "A DIY mask over the primary's edge." },
  { tag: "Thermal", title: "Mirror fan", note: "Fan, speed controller and a 3D-printed housing to bring the mirror down to air temperature fast. The intake mask took two versions to balance dust protection against airflow." },
  { tag: "Optics", title: "New coma corrector", note: "Apertura 1× corrector at 55 mm back focus, with the exact spacing dialed in remotely through the tilt adjuster." },
  { tag: "Optics", title: "Electronic tilt adjuster", note: "Wanderer ETA, leveled automatically by NINA's Hocus Focus plugin." },
  { tag: "Guiding", title: "Off-axis guider", note: "ZWO OAG-L with an ASI174MM Mini, its prism set back to 14.5 mm from center so it no longer shadows the sensor." },
  { tag: "Calibration", title: "Motorized flat panel", note: "Opens and closes on its own and shoots flats at the end of every session." },
  { tag: "Next", title: "Secondary mirror mask", note: "A 3D-printed mask over the secondary's over-beveled edge, the last source of flares (see An Imaging Night)." },
];

// Processing pipeline, in the order it runs (loosely following Philippe
// Bernhard's OSC flowchart). `img` is a file in public/images/astro-processing/;
// a step with `stat` instead of `img` renders as a text tile.
// Example data: the North America Nebula (NGC 7000).
export type Step = { img?: string; stat?: string; statLabel?: string; title: string; note: string };
export type Stage = { stage: string; steps?: Step[]; lanes?: { name: string; steps: Step[] }[] };
export const PIPELINE: Stage[] = [
  {
    stage: "Calibration & stacking",
    steps: [
      { stat: "~50%", statLabel: "of a typical night's subs cut", title: "SubframeSelector", note: "Every calibrated sub is scored on star size, star shape and signal-to-noise. On a usual night I cut about half the data: clouds, wind gusts, satellites and soft focus all cost more than the extra integration time is worth." },
      { img: "01-wbpp.jpg", title: "WBPP", note: "WeightedBatchPreprocessing calibrates the surviving lights against master bias, dark and flat frames, then registers and integrates the stack." },
      { img: "02-stacked-linear.jpg", title: "RGB color stack", note: "The integrated image is still linear: nearly all of the signal sits in the bottom few percent of the range, so it looks almost black." },
      { img: "03-stf.jpg", title: "Screen stretch (STF)", note: "A display-only auto stretch shows what's in the data without changing a single pixel." },
    ],
  },
  {
    stage: "Linear processing",
    steps: [
      { img: "04-graxpert.jpg", title: "Gradient correction", note: "GraXpert's AI gradient removal by subtraction (smoothing 0.40) takes out skyglow and light pollution that vary across the frame." },
      { img: "05-graxpert-model.jpg", title: "Background model", note: "The gradient GraXpert modeled and removed, next to the corrected image." },
      { img: "06-background-neutralization.jpg", title: "Background neutralization", note: "Evens out the background level across the red, green and blue channels." },
      { img: "07-blurx-correct.jpg", title: "BlurXTerminator, correct only", note: "Fixes star shapes (residual aberrations and guiding error) without sharpening anything yet." },
      { img: "08-imagesolver.jpg", title: "Plate solve", note: "ImageSolver matches the stars to a catalog at 800 mm, which SPCC needs to look up each star's spectrum. Observing-site fields blurred." },
      { img: "09-spcc.jpg", title: "SPCC", note: "Spectrophotometric color calibration against Gaia DR3 spectra, using the camera's UV/IR-cut filter curves." },
      { img: "10-spcc-graphs.jpg", title: "White balance fit", note: "468 catalog stars fit for the red/green and blue/green white balance." },
      { img: "11-blurx.jpg", title: "BlurXTerminator", note: "Deconvolution: sharpen stars 0.60, star halos 0.20, nonstellar detail 0.50." },
      { img: "12-dynamic-crop.jpg", title: "DynamicCrop", note: "Trims the ragged stacking edges, down to 1498 × 992 for this binned pass." },
      { img: "13-noisext.jpg", title: "NoiseXTerminator", note: "Noise reduction: intensity 0.65, color 0.50." },
      { img: "14-starxt.jpg", title: "StarXTerminator", note: "Splits the image into a starless nebula and a stars-only layer." },
      { img: "15-starless-stars.jpg", title: "Starless + stars", note: "Linear processing done. From here the two layers are stretched separately." },
    ],
  },
  {
    stage: "Nonlinear processing",
    lanes: [
      {
        name: "Starless",
        steps: [
          { img: "16-statistical-stretch.jpg", title: "Statistical stretch", note: "Stretches the starless image to a target median of 0.25 with a linked stretch, keeping the color balance from SPCC." },
          { img: "18-color-saturation.jpg", title: "Color saturation", note: "A gentle saturation boost on the nebula." },
          { img: "19-lhe.jpg", title: "Local histogram equalization", note: "Local contrast (kernel radius 164, contrast limit 2.0, amount 0.11) to bring out structure in the clouds." },
        ],
      },
      {
        name: "Stars",
        steps: [
          { img: "17-star-stretch.jpg", title: "Star stretch", note: "A separate stretch for the stars (amount 5, color boost 1), so they stay small and keep their color." },
        ],
      },
    ],
  },
];

// Rolling hero at the top of the page: filenames from the gallery, in
// display order. Each slide links to the same lightbox as the gallery.
export const HERO_FILES = ["viel.jpg", "rosette.jpg", "californianebula.jpg", "heasrt.jpg", "m16.jpg", "flyspiderflame.jpg"];
export const heroSlides = HERO_FILES.map((f) => ({ item: galleryItems.find((g) => g.filename === f), index: galleryItems.findIndex((g) => g.filename === f) }))
  .filter((s) => s.item);

// Sub-pages of the astrophotography section, in reading order.
export const ASTRO_PAGES = [
  { slug: "", title: "Studio", note: "The gallery" },
  { slug: "gear", title: "Gear & Telescope", note: "The kit, and every change to the CarbonStar 200" },
  { slug: "capture", title: "Planning & Capture", note: "Target planning, remote control, the NINA sequence" },
  { slug: "processing", title: "Processing", note: "The PixInsight pipeline, step by step" },
  { slug: "imaging-night", title: "An Imaging Night", note: "One night of optical debugging, start to finish" },
];
export const astroHref = (slug: string) => `${BASE}astrophotography/${slug ? slug + "/" : ""}`;

export const optics = [
  {
    name: "William Optics RedCat 51",
    role: "Refractor",
    note: "Compact f/4.9 petzval apo, small and light enough to travel with, used for wide-field targets that don't need the reach of a full telescope.",
    url: "https://williamoptics.com/products/redcat-51-ii",
  },
  {
    name: "Apertura CarbonStar 200",
    role: "Newtonian",
    note: "8\" f/4 imaging Newtonian, carbon-fiber tube: the OTA behind the second rendition in the Newtonian telescope project.",
    url: "https://www.highpointscientific.com/apertura-carbonstar-200-imaging-newtonian",
  },
  {
    name: "Celestron EdgeHD 8",
    role: "SCT",
    note: "8\" aplanatic Schmidt-Cassegrain, a flat, coma-free field at longer focal length for targets that need more reach than the Newtonian or the 135mm.",
    url: "https://agenaastro.com/celestron-edgehd-800-cge-ota-91030-xlt.html",
  },
  {
    name: "Samyang/Rokinon 135mm f/2",
    role: "Telephoto lens",
    note: "Fast, all-manual telephoto lens for wide-field targets. See the Rokinon rig project for the custom mounting and focusing hardware built around it.",
    url: "https://rokinon.com/products/135mm-f2-0-full-frame-telephoto",
  },
];

export const gear = [
  {
    name: "ZWO AM3",
    role: "Mount",
    note: "Strain-wave harmonic-drive equatorial mount, carrying the imaging train with essentially none of the backlash or periodic error of a traditional worm-gear mount.",
    url: "https://agenaastro.com/shop-by-brand/zwo-am3-strain-wave-drive-equatorial-mount-head.html",
  },
  {
    name: "ZWO TC40",
    role: "Tripod",
    note: "Carbon-fiber tripod built for the AM3's harmonic-drive mount family, rigid enough to keep vibration out of long guided exposures.",
    url: "https://agenaastro.com/zwo-tc40-carbon-fiber-tripod.html",
  },
  {
    name: "ZWO PE200",
    role: "Pier extension",
    note: "200mm of extra height between tripod and mount head, clearing tripod-leg interference at higher declinations.",
    url: "https://agenaastro.com/zwo-200mm-7-9-pier-extension-for-am3-am5-mount-pe200.html",
  },
  {
    name: "MeLE Quieter 4C",
    role: "Control PC",
    note: "Fanless mini PC that runs the full capture stack (NINA, guiding, drivers) on the mount without adding its own fan noise or vibration.",
    url: "https://www.amazon.com/MeLE-Mini-Quieter-4C-Astrophotography/dp/B0CP3YL6J7",
  },
  {
    name: "SVBONY SV241",
    role: "Power distribution",
    note: "Splits a single 12V feed out to the mount, camera, dew heaters, and focuser. This is the base SV241: manual switching, no ASCOM/computer control.",
    url: "https://www.svbony.com/products/sv241-astronomical-powerbox",
  },
  {
    name: "WandererCover V4-EC, 225mm",
    role: "Motorized flat panel",
    note: "Motorized flip-flat cover with a built-in flat panel for the wide-field train, closing automatically, then evening out vignetting and dust motes across the larger aperture.",
    url: "https://www.wandererastro.com/sys-pd/14.html",
  },
  {
    name: "WandererCover V4-EC, 100mm",
    role: "Motorized flat panel",
    note: "Same motorized flip-flat design, sized for the narrower guide/OAG optical path.",
    url: "https://agenaastro.com/wandererastro-wanderer-cover-v4-ec-100mm.html",
  },
  {
    name: "ZWO OAG",
    role: "Off-axis guider",
    note: "Picks guide-star light from just outside the imaging sensor's field through a small prism, so guiding sees the same optical path, and the same flexure, as the imaging camera.",
    url: "https://agenaastro.com/zwo-oag-off-axis-guider.html",
  },
  {
    name: "ZWO ASI174MM Mini",
    role: "Guide camera",
    note: "Small, sensitive mono guide camera feeding the OAG.",
    url: "https://agenaastro.com/zwo-asi174mm-mini-cmos-monochrome-astronomy-imaging-camera.html",
  },
  {
    name: "PrimaLuceLab ESATTO 2\"",
    role: "Robotic focuser",
    note: "Motorized Crayford focuser with 15mm of travel and 0.04-micron step resolution, controlled over USB-C or Wi-Fi for repeatable, temperature-compensated focus moves without touching the scope.",
    url: "https://optcorp.com/products/primalucelab-esatto-2",
  },
  {
    name: "ZWO EAF",
    role: "Autofocuser",
    note: "Electronic focus motor in service since 2024, driving a 7.5-degree stepper through a 1:128 internal gearbox; see the Rokinon rig project for the belt-drive focuser built around this same motor.",
    url: "https://www.zwoastro.com/product/eaf/",
  },
];
