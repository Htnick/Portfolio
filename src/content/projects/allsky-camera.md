---
title: "Allsky Camera"
description: "A fisheye-lensed, weatherproofed all-sky camera for continuous night-sky monitoring and timelapses."
date: "2026-06-27"
status: "completed"
tags: ["astrophotography", "electronics", "3D printing"]
image: "allsky-camera-hero.jpg"
draft: false
---

## Overview

A fun side build: a fixed, always-on camera aimed straight up so sky
conditions can be checked from inside the house before hauling the rest
of the gear outside. The design leans on off-the-shelf parts wherever
possible to keep the build simple — the optical tube is an old guide
scope already on hand, repurposed rather than bought new for the job —
with the 3D-printed housing doing the structural and environmental work:
a clear printed dome bolted over the front end, sealing the optics off
from the weather while keeping the sky in frame.

The hardest problem wasn't optical, it was thermal. A sealed housing
sitting outside overnight is exactly the kind of enclosure that invites
condensation, and any dew forming on the dome or the lens would have
made the whole thing useless. Two small computer fans handle it: one
mounted axially to push air in across the electronics, and a second
exhausting air out through the bottom of the housing, keeping continuous
airflow moving through the enclosure so moisture never has a still,
cold surface to condense on. That airflow does double duty — it also
keeps the housing itself cool enough that it could be printed in plain
PLA without worrying about the plastic softening or warping in the sun.

<p class="editable-note">
Henry — fill in the camera/sensor board itself (Raspberry Pi HQ camera?
something else?) and what capture software you're running, plus how it's
powered and networked outdoors.
</p>

## Outcome

The camera runs a monochrome sensor rather than color, which pulls in
meaningfully more light per pixel since there's no Bayer filter throwing
away two out of every three photons — useful for a fixed, wide-angle
allsky view where every exposure is already fighting a bright sky
background. That tradeoff cuts both ways: with no light-pollution filter
in front of the sensor, the camera is picking up the full spectrum of
skyglow along with the stars, so how much a given frame shows is as much
a function of local light pollution that night as it is the sky itself.

<p class="editable-note">
Henry — drop in the images you mentioned here, plus a sentence or two on
what they show (a clear-night frame vs. a light-polluted one is a great
pairing if you have it).
</p>
