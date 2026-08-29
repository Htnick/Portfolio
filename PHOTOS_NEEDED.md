# Photos to add

The site now has a labeled placeholder wherever a real photo belongs (dashed
box with a camera icon), so nothing looks broken without images — but here's
the shot list to actually fill them in, roughly in priority order.

## Must-have

1. ~~**Headshot**~~ — skipped by request. Henry doesn't want a headshot on
   the site, so the About page placeholder stays as-is on purpose. Leave it
   alone unless he changes his mind.
2. ~~**Taipan Liquid Rocket Engine**~~ — done. Using two CAD renders of the
   injector plate (`taipan-injector-plate-01.jpg` as the hero/thumbnail,
   `taipan-injector-plate-02.jpg` inline in the "Injector plate redesign"
   section). Swap in a real hardware or hot-fire photo later if you want —
   you actually fired this engine, so a real shot would hit harder than a
   render.
3. ~~**Regeneratively Cooled Liquid Rocket Engine**~~ — done. Rendered
   `regen-engine-hero.jpg` (full assembly) and `regen-injector-topology.jpg`
   (the topology-optimized injector plate) directly from the STL CAD files
   you sent over. Two placeholders remain in that project's write-up for
   later — an RPA/DXF nozzle-contour screenshot and an injector CAD
   iteration history shot — both still marked inline in the markdown file.

## Nice-to-have — fills out the rest of the project grid

4. ~~**Newtonian Telescope**~~ — done. `telescope-dew-shield.jpg` (the
   full 8-inch scope) as the hero, plus two detail shots dropped inline:
   `telescope-focus-adapter.jpg` in "Focuser precision" and
   `telescope-fan-housing.jpg` in "Thermal management". A placeholder for
   the first rendition's component set (`v1-components.jpg`, FIG. 02) is
   still open if you ever dig up an old photo of that build.
5. ~~**Glider Design Challenge**~~ — done. Using `glider-design-hero.jpg`,
   a workshop shot of the built glider — cropped to leave out everyone's
   face by request. Swap in a flight-test photo later if you have one.
6. ~~**DAQ for Liquid Test Stand**~~ — done, sort of. Using
   `test-stand-pid.jpg`, the test stand's valve/P&ID reference diagram,
   as the hero — it's a schematic, not a hardware photo, but it's a solid
   stand-in until you have a shot of the actual DAQ hardware or a live
   data readout.

## About-page gallery ("In The Field" row)

7. CU SRL test stand / lab environment
8. Workshop shot — mid-build, CAD on a monitor, tools out
9. Telescope in the field

## How to add one

1. Drop the file in `public/images/` (e.g. `public/images/taipan-hero.jpg`).
2. For a project photo: set `image: "taipan-hero.jpg"` in that project's
   frontmatter (`src/content/projects/*.md`) — filename only, no leading
   slash. It'll automatically show up as both the project-card thumbnail
   and the project-page hero, replacing the placeholder.
3. For the headshot or the About-page gallery: open `src/pages/about.astro`
   and swap the relevant `<ImagePlaceholder ... />` for an `<img>` tag (see
   the comment in `public/images/README.md` for the exact pattern), or use
   `<AstroImage />` (from `src/components/AstroImage.astro`) if you want the
   drafting-sheet frame + figure caption treatment used elsewhere on
   project pages.

Landscape shots around 1600×1000px and portraits around 800×1000px will
match the placeholder boxes closely, but nothing will break if the actual
aspect ratio is a bit different — the frame just crops to fit.
