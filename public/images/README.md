Drop project/about photos in this folder (flat is fine, e.g. `taipan-hero.jpg`).

Then reference them by filename only:
- In a project's frontmatter: `image: "taipan-hero.jpg"`
- In About.astro / index.astro, swap the relevant `<ImagePlaceholder />` for
  an `<img src={`${import.meta.env.BASE_URL}images/your-file.jpg`} alt="..." />`
  (or use `<AstroImage />` for the drafting-sheet frame + caption treatment).

See PHOTOS_NEEDED.md at the repo root for the recommended shot list.
