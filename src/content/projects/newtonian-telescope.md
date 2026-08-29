---
title: "Newtonian Telescope for Astrophotography"
description: "Custom 3D-printed and CNC-milled components for a Newtonian telescope, across two renditions — most recently an 8-inch build."
date: "2024-12-01"
status: "in-progress"
tags: ["astrophotography", "3D printing", "CAD", "electronics"]
image: ""
draft: false
---

## Overview

I started using CAD in high school to make small accessories for astrophotography — nothing ambitious, just parts to make an existing setup work slightly better. It wasn't until this project that I took on something larger: a full custom component set for a Newtonian telescope, followed by a second rendition built around an 8-inch scope.

## First rendition: constraints and design

The first full build had a hard constraint set: everything had to improve thermal stability and imaging performance **without changing the telescope's existing focal geometry**. That meant every new component had to fit into an optical system that was already fixed — I couldn't redesign around the problem, only within it.

One of the most challenging and also most rewarding parts of this process was the thermal managment. To keep dew from forming on the optics of the telescope, I wanted to add a fan to move air through the telescope, keeping a low humidity. The issue with using a fan is that you need to make sure that the fan does not vibrate the telescope. At this scale, even micro vibrations can disturb the scope enough to fall out of focus. I ended up settling on a pc fan to move the air through the scope. I 3d-printed a mounting bracket, and reused a old device to have a consistent voltage that could be provided via usb-c. 

<!--
  <AstroImage src="/images/telescope/v1-components.jpg" alt="First rendition 3D-printed components" figNo="01" caption="RENDITION 1 — 3D-PRINTED COMPONENT SET, HEAT-SET INSERTS" />
-->

## Second rendition: the 8-inch build

The second rendition moved to an 8-inch telescope, and the images it produced exposed problems the first build never had to deal with — mostly related to the larger aperture's increased sensitivity to flexure, cooling, and collimation drift over longer exposures.

This telescope was never meant to become its own project — I just ended up chasing it down a rabbit hole. There were plenty of issues with the scope to begin with, none of them dealbreakers, but none of them letting me get the most out of it either.

### Focuser precision

The first problem I wanted to tackle was the focuser. This telescope has a 200mm aperture and an 800mm focal length, putting it at f/4 — a fast ratio that makes the image respond dramatically to even small errors in the imaging process. A precise focuser goes a long way toward minimizing that, since it determines how consistently you can actually hit focus.

My solution was to swap in one of my own high-resolution focusers instead of the one that came with the scope. That meant 3D-printing a model of the mount I wanted, then having it produced in aluminum by a third party so it could handle the loads in the telescope's focal train.

<!-- <AstroImage src="/images/telescope/v2-focuser.jpg" alt="Custom aluminum focuser mount" figNo="03" caption="8-INCH RENDITION — CUSTOM ALUMINUM FOCUSER MOUNT" /> -->

### Internal reflection and flocking

The next issue was a set of strange spikes peeling away from the center of each star in my images. My first guess was internal reflection, so I designed and 3D-printed a dew shield and flocked the inside of the telescope with a dark, stick-on fabric to cut down on stray light bouncing around inside the tube.

That improved image contrast noticeably, but didn't eliminate the artifacts — which told me I was looking at the wrong cause.

### Thermal management

Heading into the summer months, the telescope would sit in the heat for hours before an imaging session, and getting the tube's internal temperature back down quickly became its own problem. I built a cooling setup similar to what I'd used on the first telescope, but this time with purpose-bought parts instead of repurposed electronics: a new fan, a fan speed controller, and a 3D-printed housing.

The fan also needed a way to keep dust and debris from reaching the optics, so I designed a mask to sit over the intake. The first version didn't move enough air; the second one got the balance right.

<!-- <AstroImage src="/images/telescope/v2-thermal-system.jpg" alt="3D-printed fan housing and intake mask" figNo="04" caption="8-INCH RENDITION — FAN HOUSING AND INTAKE MASK, V2" /> -->

### Root cause: sensor-to-corrector spacing

In the end, the star artifacts weren't internal reflection at all — the actual issue was the spacing between the camera sensor and the coma corrector. Getting that distance right is what finally resolved the problem the flocking and dew shield had only partially masked.