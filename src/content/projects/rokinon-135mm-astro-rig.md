---
title: "Rokinon 135mm Astrophotography Rig"
description: "A custom 3D-printed ring mounting system and geared focuser built around a Rokinon 135mm f/2 lens for wide-field astrophotography."
date: "2026-02-01"
status: "completed"
tags: ["astrophotography", "3D printing", "CAD", "optics"]
image: "rokinon-ring-system-top.jpg"
draft: false
---

## Overview

The Rokinon (Samyang) 135mm f/2 is an all-manual lens — no electronic
aperture or focus-by-wire — which is exactly why it's popular for
wide-field astrophotography, but also why it needs extra hardware around
it to be usable on a tracking mount: a rigid way to bridge the lens to a
camera body and mount, and a way to nail focus precisely on stars, where
the stock focus ring's throw and grip make fine adjustment difficult.
Built a two-part solution: a chain of 3D-printed rings that clamp the
lens and bridge it to the camera, and a geared focuser that rides on top.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so paths below are hardcoded to the current /Portfolio/
     base. If the repo or base path ever changes, update paths like these. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/rokinon-focuser-mount.jpg" alt="Angled view of the printed focuser mount and camera-side rings on the Rokinon 135mm" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 02</span>FOCUSER MOUNT AND CAMERA-SIDE RINGS, PACKED FOR TRANSPORT</p>

## Ring mounting system

A chain of 3D-printed rings — two lens-side rings, two mid rings, two
camera-side rings, and a camera hold bracket — clamp around the lens
barrel with cap screws and bridge it to the camera at a fixed, rigid
spacing, keeping the whole optical stack aligned through handling and
transport. A hex-profile ring at the rear carries the mounting interface
to the tracker/dovetail.

<p class="editable-note">
Henry — fill in what problem the stock lens mount had that this solved,
how many iterations it took to get the fit right, and what mount/tracker
and camera body it's paired with.
</p>

## Custom focuser

Focus is handled by a 3D-printed gear ring that wraps the lens's stock
focus collar, driven through a dedicated focuser mount bracket — geared
control instead of relying on the lens's stock grip, which is hard to
adjust precisely by hand once the lens is buried in rings and mounting
hardware.

<p class="editable-note">
Henry — fill in how you verified focus (Bahtinov mask, star-size metric,
etc.) and anything you'd change about the gear ratio or mounting for a V3.
</p>

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

<p class="editable-note">
Henry — wrap up with what the finished rig let you shoot, and drop in a
sample image or two once you have them — they can also go straight into
the Astrophotography gallery.
</p>
