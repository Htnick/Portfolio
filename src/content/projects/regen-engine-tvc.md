---
title: "Thrust Vector Control for the 2,000 lbf Regen Engine"
description: "Actuator sizing, mount layout and joint design for two-axis gimbal control of CU SRL's regeneratively cooled engine: ±10° per axis on two linear actuators."
date: "2026-09-01"
status: "in-progress"
tags: ["propulsion", "TVC", "mechanical design", "structures", "Python"]
draft: false
role: "Actuator sizing, kinematics, mount layout and joint analysis for the TVC system on CU SRL's regen engine"
results: "Recommended layout reaches ±12° (requirement ±10°) with the lightest candidate actuator at +0.67 continuous and +0.69 peak margin of safety."
---

## Overview

The 2,000 lbf RP-1/LOX [regeneratively cooled engine](/Portfolio/projects/regeneratively-cooled-engine/) is gimbaled for thrust vector control by two linear actuators mounted 90° apart, one per axis. I worked through the full sizing chain: requirements, kinematics, gimbal torque, actuator selection, a clearance check of the mount layout against the chamber, and margins of safety on every joint in the load path.

| Requirement | Value |
|---|---|
| Gimbal angle, per axis | ±10° |
| Gimbal rate / acceleration | 20 °/s, 30 °/s² |
| Thrust | 2,000 lbf (8.90 kN) |
| Gimbaled mass | 20 lb (9.07 kg) |
| Load margin / structural factor of safety | 1.5 / 1.5 on yield |

## Kinematics

The model is planar, one gimbal axis at a time, with the origin at the gimbal pivot. The actuator's rear pin is fixed to the thrust structure and its front pin rides on the chamber, so gimbaling the chamber by θ rotates the front pin about the pivot. Differentiating the pin-to-pin length L with respect to θ gives the actuator's moment arm, and multiplying by the gimbal rate gives the actuator speed.

Over the full ±10° range the actuator uses 54.8 mm of stroke, the smallest moment arm is 143.7 mm (at −10°), and the peak speed is 59 mm/s.

## Gimbal torque and actuator selection

Running torque at ±10° builds up from inertia, bearing friction, thrust misalignment, the pendulum term and propellant-line stiffness: 114.7 N·m in total. The holding torque at startup, driven by a 10% side load at the nozzle exit, is 372 N·m. Divided by the moment arm and multiplied by the 1.5 load margin, the actuator needs:

- **1.20 kN** running force (worst case at −10°, smallest arm)
- **3.55 kN** holding force at startup
- **59 mm/s** speed

I compared five candidates from the Tolomatic IMA family. The single-stack IMA33 was the lightest and narrowest that passed: 2.00 kN continuous and 6.01 kN peak (margins of +0.67 and +0.69 with the 1.5 load margin already applied), 4.1× speed margin, 6.1 kg, and a 76 mm minimum stroke where the larger options start at 152 mm.

## Layout: the first mounts hit the injector flange

Checking clearance meant rotating each chamber profile point by θ, projecting it onto the actuator's line of action, and subtracting the actuator body's half-width and a 3 mm minimum gap. The first layout touched the injector flange at −5.6° and overlapped it by 5.9 mm at −10°.

Dropping both mounts made the actuator more upright, tipping its body away from the flange without moving it outboard. I picked the new pin positions by sweeping both mounts and keeping the smallest outer radius that passed every check at ±12°. The recommended layout now reaches ±12° in both directions with a 6.8 mm gap at −10°, at a 221.8 mm outer radius.

## Joint design

The joints are sized to what the actuator can physically push, not just the predicted load: 1.5 × the actuator's 6.0 kN peak, 9.0 kN in total. That way the joints stay below yield even if the controller drives into a hard stop at full current. Load path: printed GRCop-42 chamber lugs → Ø16 mm front pin → spherical rod end → actuator → Ø12 mm rear pin → 6061-T6 tongue on the thrust structure.

| Check | Margin of safety |
|---|---|
| Rod end tilt vs. gimbal angle | +0.00 |
| Chamber lug shear-out | +0.20 |
| Chamber lug root bending (before fillet K<sub>t</sub>) | +0.50 |
| Actuator, continuous / peak | +0.67 / +0.69 |
| Rod end thread engagement | +0.85 |
| Chamber lug net section / bearing | +1.08 / +1.77 |
| Rear joint (pin, tongue) | +2.83 and above |
| Front pin shear / bending | +15.86 / +6.08 |

The lowest margins all sit at the chamber end of the load path: the rod end's tilt and the printed lug.

## Open items

- The lug's edge distance (e/d = 0.875, below the 1.5 where simple lug formulas hold) needs Bruhn's lug-efficiency curves or FEA, or a wider ligament.
- The rod end's 10° tilt rating has zero margin; a 15° equivalent part solves it.
- Lug temperature sets the GRCop-42 allowables and still needs a thermal result.
- Hose stiffness is 44% of the running torque and is still an estimate, so it's the most valuable number to measure.
- A 3D clearance check with both axes at full deflection, where the chamber tilts about 1.41× further than in the per-axis model.
