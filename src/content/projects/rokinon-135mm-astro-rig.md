---
title: "Rokinon 135mm Astrophotography Rig"
description: "A custom 3D-printed ring mounting system and belt-driven focuser built around a Rokinon 135mm f/2 lens for wide-field astrophotography."
date: "2026-02-01"
status: "completed"
tags: ["astrophotography", "3D printing", "CAD", "optics"]
image: "rokinon-ring-system-top.jpg"
draft: false
accent: "#3b6fd1"
---

## Overview

The Rokinon (Samyang) 135mm f/2 is an all-manual lens — no electronic
aperture or focus-by-wire — which is exactly why it's popular for
wide-field astrophotography, but also why it needs extra hardware around
it to be usable on a tracking mount: a rigid way to bridge the lens to a
dedicated astro camera and mount, and a way to nail focus precisely on
stars, where the stock focus ring's throw and grip make fine adjustment
next to impossible. Built a two-part solution: a chain of 3D-printed
rings that clamp the lens and bridge it to the camera, and a belt-driven
focuser that rides on top.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so paths below are hardcoded to the current /Portfolio/
     base. If the repo or base path ever changes, update paths like these. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/rokinon-focuser-mount.jpg" alt="Angled view of the printed focuser mount and camera-side rings on the Rokinon 135mm" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 02</span>FOCUSER MOUNT AND CAMERA-SIDE RINGS, PACKED FOR TRANSPORT</p>

## Ring mounting system

The lens's biggest limitation wasn't optical — on paper the Rokinon
135mm f/2 is close to ideal for wide-field astrophotography — it was
mechanical. There was no way to attach a dedicated astro camera to it and
have the whole assembly sit level and rigid on a tracking mount; the
stock lens mount was never built to carry that load at a fixed
orientation for hours at a time. The fix is three 3D-printed rings — a
lens ring, a mid ring, and a camera ring, each printed in two halves for
easier printing and assembly — plus a camera hold bracket, all modeled
in CAD to follow the exact contours of the lens barrel and clamp it at a
consistent height all the way through to the camera. Holding that
height constant matters more than it sounds: any
flexure in the stack introduces tilt in the imaging plane, which shows up
as elongated stars in one corner of the frame and a soft, out-of-focus
corner in the opposite one. A hex-profile ring at the rear carries the
mounting interface to the tracker's dovetail.

## Custom focuser

Focus went through two full design iterations, both driven by the same
ZWO EAF electronic autofocuser. The first version was a double-helical
gear pair — a 37-tooth and a 68-tooth gear, for roughly a 1.84:1
mechanical reduction, with the double-helical tooth profile chosen
specifically to cancel axial thrust and cut backlash compared to a
straight spur gear. Against most lenses that reduction would have been
plenty. But the Rokinon 135mm f/2 has a critical focus zone only about
14 microns wide, and even a well-cut gear pair carries enough backlash at
that reduction for the image to drift in and out of that zone before the
teeth fully re-engage.

V2 replaced the gears with a GT2 timing-belt drive: a
<a href="https://www.amazon.com/WINSINN-Aluminum-Synchronous-Timing-Printer/dp/B07CXR7SFL/" target="_blank" rel="noopener noreferrer">20-tooth, 6mm-bore pulley</a>
on the focus motor, a
<a href="https://www.amazon.com/uxcell-Timing-Closed-350-2GT-6-Printer/dp/B0CMHXXVM1/" target="_blank" rel="noopener noreferrer">350mm belt</a>,
and a pulley ring of roughly
146–147 teeth wrapped around the lens's focus collar — about a 7.3:1
mechanical reduction, close to four times the reduction of the original
gear pair. A belt drive also runs with none of a gear pair's backlash,
since the belt stays under tension across the whole loop instead of
relying on tooth-to-tooth contact that can separate under reversal. The
ZWO EAF itself steps a 7.5° stepper motor through an internal 1:128
gearbox; stacked with the roughly 4x larger external reduction of the
belt drive, each motor step turns the lens's focus collar in an
increment about four times finer than the V1 gear pair produced for the
same step — enough to reliably land inside, rather than hunt around, the
lens's 14-micron critical focus zone.

## Downloads

3D-printable files for the ring system and focuser mount, for reference or
reuse:

<div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 1.25rem 0 2rem;">
  <a href="/Portfolio/files/rokinon-rig/v2-lens-ring-1.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Lens Ring ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-lens-ring-2.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Lens Ring 2 ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-mid-ring-1.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Mid Ring 1 ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-mid-ring-2.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Mid Ring 2 ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-camera-ring-1.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Camera Ring 1 ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-camera-ring-2.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Camera Ring 2 ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-cam-hold.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Camera Hold ↓</a>
  <a href="/Portfolio/files/rokinon-rig/v2-focuser-mount.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">V2 Focuser Mount ↓</a>
  <a href="/Portfolio/files/rokinon-rig/gear-ring.stl" download class="mono" style="color: var(--paper); text-decoration: none; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.45rem 0.9rem; font-size: 0.78rem; letter-spacing: 0.03em;">Gear Ring ↓</a>
</div>

## Outcome

Switching to the belt-drive focuser solved the actual problem: focus now
lands inside the lens's critical zone reliably, instead of the V1 gear
pair hunting in and out of it. The rig is now the go-to setup for
wide-field, fast-glass targets that suit a 135mm lens's frame better than
the reach of a full telescope — see the
[Astrophotography](/Portfolio/astrophotography) page for the gear list,
imaging workflow, and gallery this rig feeds into.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so this path is hardcoded to the current /Portfolio/ base.
     If the repo or base path ever changes, update paths like this one. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/rokinon-california-nebula.jpg" alt="The California Nebula, shot with the Rokinon 135mm rig" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 03</span>THE CALIFORNIA NEBULA, SHOT WITH THIS RIG</p>
