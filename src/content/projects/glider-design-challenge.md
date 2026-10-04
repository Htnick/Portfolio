---
title: "Glider Design Challenge"
description: "MATLAB performance simulation and Excel-based manufacturability tracking for a team-built competition glider."
date: "2026-01-01"
status: "completed"
tags: ["aircraft design", "MATLAB", "Excel", "flight testing"]
image: "glider-design-hero.jpg"
draft: false
accent: "#3ba7c4"
role: "Performance simulation (MATLAB) and elevator mechanism design, on a 6-person team"
results: "Elevator mechanism achieved a 20° trim range at under 1 g of added mass; the glider carried a 160 g payload 100 m in flight testing."
---

## Overview

A semester-long team project with a six-member team to design, simulate, and flight-test a competition glider. My focus was on the performance side: making sure the design would actually fly the way the team needed it to, and stayed manufacturable within the team's build capabilities.

## MATLAB performance modeling

The team used MATLAB to simulate glider performance before committing to a build, so design changes could be tested against performance requirements without cutting new hardware every time.

- Built and ran simulations to evaluate lift, drag, and stability characteristics across candidate design configurations.
- Used simulation results to drive the elevator deflection mechanism design, targeting a 20° trim range while keeping the mechanism under 1 gram and minimizing added drag.
- Iterated the model against flight test data as it came in, closing the loop between predicted and actual performance.

<!--
  <AstroImage src="/images/glider/matlab-sim-output.png" alt="MATLAB glider performance simulation output" figNo="01" caption="MATLAB PERFORMANCE SIMULATION: LIFT/DRAG SWEEP" />
-->


## Design: from sketches to CAD

Sizing started as hand sketches in late February, then moved into CAD, where the geometry was refined before anything was built. Between the two, the overall length came down from 0.843&nbsp;m to 0.773&nbsp;m and the dihedral from 6.5° to 3.5°.

| | Value (CAD) |
|---|---|
| Wingspan | 0.998 m |
| Overall length | 0.773 m |
| Wing root chord | 0.114 m |
| Wing tip chord | 0.044 m |
| Dihedral | 3.5° |
| Horizontal tail span | 0.363 m |
| Vertical tail height | 0.139 m |

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/sketch-top.jpg" alt="Hand sketch of the glider planform with dimensions" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">First sizing sketch: planform</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/sketch-side.jpg" alt="Hand sketch of the glider side profile with dimensions" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Side profile</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/sketch-front.jpg" alt="Hand sketch of the glider front view showing 6.5 degree dihedral" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Front view, 6.5° dihedral</figcaption></figure>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/dims-top.jpg" alt="CAD top view annotated with chord and tail span dimensions" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">CAD planform: chords and tail span</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/dims-front.jpg" alt="CAD front view annotated with 0.998 m span and 3.5 degree dihedral" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Front view: 0.998 m span, 3.5° dihedral</figcaption></figure>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/dims-side.jpg" alt="CAD side view annotated with 0.773 m length" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Side view: 0.773 m overall</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/cad-side.jpg" alt="Clean CAD side view of the glider" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Fuselage, payload bay and tail</figcaption></figure>
</div>

## Build

### 3D-printed fuselage

The first fuselage was 3D-printed in sections. Printing thin, curved shells took several attempts: tree supports under the overhangs, surface scarring where supports pulled away, and stringing inside the cutouts. One fuselage section alone weighed 98&nbsp;g.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-fuselage-white.jpg" alt="White 3D-printed fuselage section held in hand" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">First printed fuselage</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-supports.jpg" alt="Fuselage section printing with tree supports" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Printing with tree supports</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-tree-supports.jpg" alt="Printed shell section with tree supports still attached" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Supports still attached</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-surface.jpg" alt="Printed nose with surface scarring from supports" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Surface scarring from supports</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-nose-cutout.jpg" alt="Printed nose cone with a cutout and stringing inside" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Cutout with stringing</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/print-fuselage-98g.jpg" alt="Printed fuselage sections on a kitchen scale reading 98 grams" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">98 g for one section</figcaption></figure>
</div>
<div style="max-width:520px;margin:1.5rem 0;"><figure style="margin:0;"><img src="/Portfolio/images/glider/print-fuselages-carbon.jpg" alt="Two printed fuselages laid out with carbon fiber tail booms" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Two printed fuselages with carbon tail booms</figcaption></figure></div>

### Foam build

By April the aircraft had moved to foam: foam-board fuselage with an internal payload bay and pink foam wings with a wooden spar, each wing panel coming in around 20&nbsp;g.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-payload-bay.jpg" alt="Foam-board fuselage with payload bay open" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Fuselage and payload bay</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-wing.jpg" alt="Shaped pink foam wing panel" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Shaped foam wing panel</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-wing-19g.jpg" alt="Foam wing panel on a scale reading 19 grams" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Wing panel: 19 g</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-wing-spar-20g.jpg" alt="Foam wing panel with a wood spar on a scale reading 20 grams" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">With spar: 20 g</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-fuselage-nose.jpg" alt="Foam-board fuselage with painted shark nose" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Fuselage, with a shark nose</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/printed-clevises.jpg" alt="Three small 3D-printed U-shaped parts in hand" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Small printed fittings</figcaption></figure>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-layout.jpg" alt="Glider components laid out flat with calipers" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Laid out for measurement</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/foam-assembled.jpg" alt="Assembled glider on carpet" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Assembled</figcaption></figure>
<figure style="margin:0;"><img src="/Portfolio/images/glider/transport.jpg" alt="Glider in the back of a car for transport" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);aspect-ratio:3/4;object-fit:cover;" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Headed to testing</figcaption></figure>
</div>

<div style="max-width:420px;margin:1.5rem 0;"><figure style="margin:0;"><img src="/Portfolio/images/glider/shop-build.jpg" alt="Holding the finished glider in the shop" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Finished glider in the shop</figcaption></figure></div>

## Excel manufacturability tracking

Alongside the MATLAB performance work, I used Excel to track the design against manufacturability constraints, keeping tabs on part mass budgets, material availability, and build tolerances so the design stayed something the team could actually produce with the tools on hand, not just something that looked good in simulation.


## Test flights

### Hand-launch hill test (April 17)

The first flights were hand launches off the top of a hill, on a cold, overcast day with snow still on the ground, to check that the glider was stable and trimmed before launch day.

<div style="max-width:340px;margin:1.5rem 0;">
<figure style="margin:0;"><video src="/Portfolio/images/glider/flight-hill-test.mp4" poster="/Portfolio/images/glider/flight-hill-test-poster.jpg" controls playsinline preload="none" style="display:block;width:100%;border:1px solid var(--line-500);background:#000;aspect-ratio:9/16;max-height:560px;object-fit:contain;"></video><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Hand launch off the hill</figcaption></figure>
</div>

### Launch day: what went wrong (April 24)

On launch day I threw the glider far too hard. It made far too much lift right off the bat, and because the aircraft was so light it couldn't carry that energy smoothly: instead of settling into a glide, it struggled to recover. The lesson was that a glider this light needs a gentle, level release at close to its trim speed; extra launch speed doesn't buy distance, it just turns into lift the airframe can't manage.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.8rem;margin:1.5rem 0;max-width:720px;"><figure style="margin:0;"><img src="/Portfolio/images/glider/launch-day.jpg" alt="Checking the glider at the launch site" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid var(--line-500);" /><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">At the launch site</figcaption></figure>
<figure style="margin:0;"><video src="/Portfolio/images/glider/flight-overthrow.mp4" poster="/Portfolio/images/glider/flight-overthrow-poster.jpg" controls playsinline preload="none" style="display:block;width:100%;border:1px solid var(--line-500);background:#000;aspect-ratio:9/16;max-height:560px;object-fit:contain;"></video><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Overthrown launch: too much lift off the release</figcaption></figure>
</div>

### Final flights

Later flights launched from the same balcony, recorded by an onboard 360° camera, with a ground-track overlay in the edited cut.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:0.8rem;margin:1.5rem 0;">
<figure style="margin:0;"><video src="/Portfolio/images/glider/flight-onboard.mp4" poster="/Portfolio/images/glider/flight-onboard-poster.jpg" controls playsinline preload="none" style="display:block;width:100%;border:1px solid var(--line-500);background:#000;"></video><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Onboard 360° camera</figcaption></figure>
<figure style="margin:0;"><video src="/Portfolio/images/glider/flight-final-edit.mp4" poster="/Portfolio/images/glider/flight-final-edit-poster.jpg" controls playsinline preload="none" style="display:block;width:100%;border:1px solid var(--line-500);background:#000;"></video><figcaption class="mono" style="margin-top:0.4rem;font-size:0.7rem;text-transform:none;color:var(--paper-dim);">Edited flight with ground-track overlay</figcaption></figure>
</div>

## Outcome

The elevator mechanism hit its 20° trim range at under a gram of mass, and the completed glider was validated through flight testing, successfully carrying a 160g payload over a 100-meter distance.
