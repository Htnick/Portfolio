---
title: "GRACE-FO Inter-Satellite Range & Visibility Analysis"
description: "MATLAB pipeline computing inter-satellite range and range-rate between the GRACE-FO twin satellites from real NASA JPL orbit data, cross-validated with numerical differentiation, plus ground-station visibility analysis."
date: "2025-01-01"
status: "completed"
tags: ["orbital mechanics", "MATLAB", "orbit determination", "numerical methods"]
draft: false
accent: "#5b5ce0"
---

## Overview

An ASEN 1320 final project with Jason Cassara, working with real NASA JPL precision orbit data for the twin GRACE-FO (Gravity Recovery and Climate Experiment Follow-On) satellites. The project reconstructs the core measurement GRACE-FO uses to map Earth's gravity field — the range and range-rate between the two satellites — and adds a ground-station visibility analysis on top.

## My contributions

- **`ReadGFO_Orbit.m`** — parses JPL's fixed-format Level-1B orbit product (148 header lines, fixed-width fields) into per-epoch time, ECEF position, and velocity vectors, converting each epoch's "seconds since 01-Jan-2000" timestamp into a UTC decimal year for plotting.
- **`GFO_NUmDiff.m`** — a central-difference numerical differentiator that independently estimates range-rate straight from the range time series, used as a numerical-methods sanity check against the analytically computed range-rate.
- **`writeGFO_CSV.m`** — writes time, range, and range-rate to a CSV deliverable with a labeled header row.
- Co-built the final visualization with Jason: a 3-panel time series of range, range-rate, and ground-station elevation angle, plus a ground-track map.

Jason Cassara built the inter-satellite range (`GFO_Range.m`) and range-rate (`GFO_RangeRate.m`) functions and the ground-station visibility check (`SatVisibility.m`).

## Method

- **Range** is the straightforward Euclidean distance between the two satellites' ECEF position vectors at each epoch.
- **Range-rate** projects the relative velocity vector onto the instantaneous line-of-sight unit vector between the satellites — the same measurement principle behind GRACE-FO's K-band ranging instrument.
- **Numerical cross-check** — since range-rate can be computed two ways (analytically from velocity, or by differentiating the range time series), `GFO_NUmDiff.m` computes the latter with a central-difference scheme and reports the discrepancy between the two as an error signal.

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

## Outcome

Produced a CSV of GFO-1/GFO-2 range and range-rate over a full day, a 3-panel plot of range, range-rate, and station elevation angle, and a ground-track map (via `ecef2lla`) with the ground station marked — turning a raw JPL orbit product into the same range/range-rate measurement GRACE-FO's actual gravity-mapping mission depends on.
