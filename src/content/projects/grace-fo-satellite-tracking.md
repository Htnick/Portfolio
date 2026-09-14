---
title: "GRACE-FO Inter-Satellite Range & Visibility Analysis"
description: "MATLAB pipeline computing inter-satellite range and range-rate between the GRACE-FO twin satellites from real NASA JPL orbit data, cross-validated with numerical differentiation, plus ground-station visibility analysis."
date: "2025-01-01"
status: "completed"
tags: ["orbital mechanics", "MATLAB", "orbit determination", "numerical methods"]
draft: false
accent: "#5b5ce0"
image: "grace-fo-range-timeseries.png"
role: "Wrote the orbit-file parser, numerical cross-check, and CSV export, and co-built the visualization, on a 2-person team (Jason Cassara wrote the range/range-rate/visibility functions)"
results: "Range held to 179.1-181.2 km over 24 hours; ground station saw 19,869 of 86,400 one-second epochs (about 23%) above the 10° visibility threshold."
---

## Overview

An ASEN 1320 final project with Jason Cassara, working with real NASA JPL precision orbit data for the twin GRACE-FO (Gravity Recovery and Climate Experiment Follow-On) satellites. The project reconstructs the core measurement GRACE-FO uses to map Earth's gravity field (the range and range-rate between the two satellites) and adds a ground-station visibility analysis on top.

## My contributions

- **`ReadGFO_Orbit.m`:** parses JPL's fixed-format Level-1B orbit product (148 header lines, fixed-width fields) into per-epoch time, ECEF position, and velocity vectors, converting each epoch's "seconds since 01-Jan-2000" timestamp into a UTC decimal year for plotting.
- **`GFO_NUmDiff.m`:** a central-difference numerical differentiator that independently estimates range-rate straight from the range time series, used as a numerical-methods sanity check against the analytically computed range-rate.
- **`writeGFO_CSV.m`:** writes time, range, and range-rate to a CSV deliverable with a labeled header row.
- Co-built the final visualization with Jason: a 3-panel time series of range, range-rate, and ground-station elevation angle, plus a ground-track map.

Jason Cassara built the inter-satellite range (`GFO_Range.m`) and range-rate (`GFO_RangeRate.m`) functions and the ground-station visibility check (`SatVisibility.m`).

## Method

- **Range** is the straightforward Euclidean distance between the two satellites' ECEF position vectors at each epoch.
- **Range-rate** projects the relative velocity vector onto the instantaneous line-of-sight unit vector between the satellites, the same measurement principle behind GRACE-FO's K-band ranging instrument.
- **Numerical cross-check:** since range-rate can be computed two ways (analytically from velocity, or by differentiating the range time series), `GFO_NUmDiff.m` computes the latter with a central-difference scheme and reports the discrepancy between the two as an error signal.

```matlab
function [Rho_dot_diff,Rho_dot_ND] = GFO_NUmDiff(dt,rho,Rho_dot)
[N,~] = size(rho);

Rho_dot_ND = zeros(N,1);
Rho_dot_ND(1) = ((rho(2)-rho(1))/dt);
Rho_dot_ND(2:(N-1)) = ((rho(N)-rho(N-2))/(2*dt));
Rho_dot_ND(N) = ((rho(N)-rho(N-1))/dt);

Rho_dot_diff = (Rho_dot_ND-Rho_dot);
end
```

- **Visibility** computes the elevation angle from a fixed ground station to GFO-1 at each epoch and flags the passes where it clears a 10° threshold.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so this path is hardcoded to the current /Portfolio/ base.
     If the repo or base path ever changes, update paths like this one. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/grace-fo-ground-track.png" alt="GFO-1 ground track over 24 hours, a near-polar orbit traced in longitude/latitude with the ground station location marked" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline-text); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 02</span>GFO-1 GROUND TRACK, 24 HR (COMPUTED VIA ECEF-TO-GEODETIC CONVERSION)</p>

## Outcome

Produced a CSV of GFO-1/GFO-2 range and range-rate over a full day, a 3-panel plot of range, range-rate, and station elevation angle (shown at the top of this page), and the ground-track map above, turning a raw JPL orbit product into the same range/range-rate measurement GRACE-FO's actual gravity-mapping mission depends on. Over the 24-hour window, inter-satellite range held to 179.1–181.2 km with the characteristic along-track oscillation from each satellite's orbital motion, and the ground station saw 19,869 of 86,400 one-second epochs (about 23%) above the 10° elevation threshold.
