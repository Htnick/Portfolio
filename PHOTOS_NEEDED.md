# Photos to add

The site now has a labeled placeholder wherever a real photo belongs (dashed
box with a camera icon), so nothing looks broken without images — but here's
the shot list to actually fill them in, roughly in priority order.

## Must-have

1. **Headshot** — About page. Portrait orientation, min. 800×1000px, decent
   lighting, plain-ish background. This is the single highest-impact photo
   on the site.
2. ~~**Taipan Liquid Rocket Engine**~~ — done. Using two CAD renders of the
   injector plate (`taipan-injector-plate-01.jpg` as the hero/thumbnail,
   `taipan-injector-plate-02.jpg` inline in the "Injector plate redesign"
   section). Swap in a real hardware or hot-fire photo later if you want —
   you actually fired this engine, so a real shot would hit harder than a
   render.
3. **Regeneratively Cooled Liquid Rocket Engine** — since this one's still
   in progress, a Fusion 360 assembly render or injector CAD screenshot is
   a totally reasonable stand-in until there's hardware. (There's already a
   commented-out image hint in that project's markdown file suggesting
   exactly this.)

## Nice-to-have — fills out the rest of the project grid

4. **Newtonian Telescope** — the telescope itself, ideally out in the field
   at night, or the dew-prevention/mounting hardware close up.
5. **Glider Design Challenge** — the built glider, in flight or on the
   ground with the team.
6. **DAQ for Liquid Test Stand** — the DAQ hardware/electronics, or a
   monitor showing a live data readout during a test.

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
