---
title: "Injector Plate Design & Topology Optimization"
description: "Impingement geometry, manifold layout, and a topology-optimized mass distribution for the injector plate on CU SRL's 2,000 lbf regeneratively cooled engine."
date: "2026-01-01"
status: "in-progress"
tags: ["propulsion", "liquid rockets", "injector design", "topology optimization", "additive manufacturing"]
image: "regen-injector-topology.jpg"
draft: false
accent: "#e0942c"
---

## Overview

The injector plate for CU SRL's regeneratively cooled engine (see the
[engine project](/Portfolio/projects/regeneratively-cooled-engine) for
the chamber sizing this feeds into) is an unlike-doublet impinging
design, additively manufactured, with an integrated ASI (augmented
spark igniter) and pressure sensor mounts. This page covers the
injector-specific work: the impingement math, the manifold layout, and
the topology optimization pass that shaped the final plate.

Most of the layout decisions started from NASA SP-8089, *Liquid Rocket
Engine Injectors*, the 1976 NASA Space Vehicle Design Criteria
monograph that's still the standard reference for impinging-injector
geometry, orifice sizing, and manifold design.

## Injector layout

**Math first.** Before modeling anything, I worked through the
impingement geometry math (orifice sizing, doublet impingement angle,
and momentum ratio between the fuel and oxidizer streams) to get
atomization and mixing characteristics that matched the mass flow rates
coming out of the chamber sizing work. I also weighed a radially
symmetric orifice pattern early on, but settled on the doublet layout
because it gave more direct control over the impingement angle and
momentum balance between propellants than a fully radial pattern would
have.

**Then CAD: a lot of it.** Getting from that math to an actual 3D
model took many iterations. Early passes focused just on getting flow
paths and manifolds to fit within the envelope; later passes folded in
manufacturability and structural constraints as they came up. Every
part on the plate was designed against a 45° maximum overhang limit,
since it's being additively manufactured and anything steeper needs
support material that's difficult (or impossible) to clear out of an
internal flow passage.

- Designed a stacked distribution ring and manifold on the oxidizer side to feed the doublet orifices evenly.
- Used a gothic-arch geometry on the fuel side, the same profile masonry has used for centuries to span an opening without exceeding an overhang or shear limit, to maximize usable space for preheated kerosene routing into the regenerative cooling channels while staying inside that 45° rule.

## Topological optimization

Once the injector's flow geometry was locked in, I ran it through
topological optimization to address manufacturability and mass:

- Defined the load cases directly from the combustion chamber sizing math (pressure and thermal-gradient estimates at the injector face) so the optimizer was solving against the environment the plate would actually see, not a generic load case.
- Optimized the plate's structure for 3D printability, removing material that wasn't load-bearing while keeping the part buildable within the same 45°-overhang constraint as the rest of the design.
- Ran the process multiple times, iterating between the optimizer's output and the printer's manufacturing constraints. A mathematically optimal shape isn't useful if it can't be printed reliably, so each pass fed back into the next. I kept iterating until the resulting mass distribution matched what the pressures and temperatures from the chamber analysis actually called for, not just what the optimizer converged on first.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so this path is hardcoded to the current /Portfolio/ base.
     If the repo or base path ever changes, update paths like this one. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/regen-injector-topology.jpg" alt="Topology-optimized injector plate, CAD render showing the scalloped lightening cutouts and central orifice boss" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 02</span>INJECTOR PLATE: TOPOLOGY-OPTIMIZED MASS DISTRIBUTION, CAD RENDER</p>

## Calculations

The impingement and orifice sizing math above is worked out in this
[Desmos calculator](https://www.desmos.com/calculator/yzwcyebbm7). It's
a running sheet of the governing equations rather than a rendered plot,
so it's most useful for checking or re-deriving the numbers behind the
layout decisions above.

## Status

In progress: currently finalizing the injector plate design alongside
the engine's cooling channel geometry ahead of manufacturing.
