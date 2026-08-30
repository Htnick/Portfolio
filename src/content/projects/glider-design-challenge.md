---
title: "Glider Design Challenge"
description: "MATLAB performance simulation and Excel-based manufacturability tracking for a team-built competition glider."
date: "2026-01-01"
status: "completed"
tags: ["aircraft design", "MATLAB", "Excel", "flight testing"]
image: "glider-design-hero.jpg"
draft: false
accent: "#3ba7c4"
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

## Excel manufacturability tracking

Alongside the MATLAB performance work, I used Excel to track the design against manufacturability constraints, keeping tabs on part mass budgets, material availability, and build tolerances so the design stayed something the team could actually produce with the tools on hand, not just something that looked good in simulation.

## Outcome

The elevator mechanism hit its 20° trim range at under a gram of mass, and the completed glider was validated through flight testing, successfully carrying a 160g payload over a 100-meter distance.
