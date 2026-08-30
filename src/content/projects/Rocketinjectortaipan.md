---
title: "Taipan Liquid Rocket Engine"
description: "Injector redesign and propellant transition from ethanol/N2O to RP-1/LOX for a 650lbf liquid bipropellant rocket engine."
date: "2025-08-01"
status: "completed"
tags: ["propulsion", "liquid rockets", "Python", "CEA"]
image: "taipan-injector-plate-01.jpg"
draft: false
accent: "#d6524a"
---

## Overview

Taipan is a 650lbf liquid bipropellant rocket engine developed by CU's Sounding Rocket Lab (CU SRL). I worked on the propulsion team verifying performance calculations, redesigning the injector plate, and building the Python toolset that supported the engine's transition from ethanol/N₂O to RP-1/LOX.

## Injector plate redesign

The injector plate had to be redesigned around a fixed chamber pressure of 700 psi without changing the overall engine geometry, meaning every change to flow area, orifice count, or impingement pattern had to work within the same envelope as the original design.

<!-- Plain markdown can't reach import.meta.env.BASE_URL like the .astro
     pages can, so this path is hardcoded to the current /Portfolio/ base.
     If the repo or base path ever changes, update paths like this one. -->
<figure style="margin: 1.75rem 0; border: 1px solid var(--line-500); background: var(--ink-800); padding: 0.4rem; line-height: 0;">
  <img src="/Portfolio/images/taipan-injector-plate-02.jpg" alt="CAD render of the Taipan injector plate, angled detail view showing the impinging orifice pattern" style="display: block; width: 100%; height: auto;" />
</figure>
<p class="mono" style="margin-top: 0.5rem; margin-bottom: 1.5rem; font-size: 0.72rem; text-transform: none; letter-spacing: 0.02em;"><span style="color: var(--redline); margin-right: 0.5rem; letter-spacing: 0.06em;">FIG. 02</span>INJECTOR PLATE: IMPINGING ORIFICE PATTERN, CAD RENDER</p>

- Performed iterative flow and combustion calculations to size orifice diameters and impingement angles for consistent atomization across the new propellant combination.
- Verified performance calculations against analytical models to confirm the redesigned plate would deliver the expected thrust output.
- Applied NASA's Chemical Equilibrium Analysis (CEA) in Python to run parametric trade studies across mixture ratio, chamber pressure, and expansion ratio, mapping how sensitive performance was to each variable before committing to a final geometry.

## Propellant transition: ethanol/N₂O → RP-1/LOX (Keralox)

The engine was originally designed around an ethanol/N₂O propellant combination. Moving to RP-1/LOX (kerolox) changed the combustion chemistry, density, and injection behavior enough that the injector and performance models needed to be re-validated rather than just re-scaled.

Key differences that drove the redesign:

- **Density and flow rate.** RP-1 and LOX have different densities than ethanol/N₂O, which shifted the required orifice sizing to hit the same mass flow and mixture ratio targets.
- **Combustion performance.** Re-ran CEA sweeps specific to RP-1/LOX to find the characteristic velocity (c*) and specific impulse the new propellant pair would actually deliver at 700 psi.
- **Ignition and atomization behavior.** Kerolox combinations are less forgiving on atomization quality than ethanol/N₂O, which fed directly back into the impingement geometry chosen for the injector.

Developed Python-based optimization workflows, using AI-assisted methods to speed up iteration, to converge on injector and performance parameters through the propellant transition.

## Python toolset

I built and maintained a set of Python scripts that CEA data and engine models flowed through, rather than doing a string of calculations in a spreadsheet each time. The values that are used for this example are for the newest engine in our fleet that I have been working on, but this script itself was built around taipan. 

- **CEA wrapper scripts:** automated running NASA CEA across mixture ratio, chamber pressure, and expansion ratio sweeps, and collected the outputs into structured performance tables.
- **Sizing calculator:** takes target thrust, chamber pressure, and propellant combination as inputs and returns key sizing outputs (mass flow rate, orifice sizing, expected c* and Isp) used to check the injector redesign against requirements.

```python
# Simplified structure of the Taipan sizing calculator.
# Swap in your actual script here for the live version of this page.

"""
Rocket Engine Geometry Calculator
Calculates required engine geometry for a given thrust level
"""

import numpy as np
import math
from rocketcea.cea_obj import CEA_Obj

# ==================== USER CONFIGURATION ====================
# Desired Performance
DESIRED_THRUST = 2000  # lbf

# Operating Parameters
CHAMBER_PRESSURE = 500  # psia
OF_RATIO = 2.0  # O/F ratio

# ==================== CONSTANTS ====================
AMBIENT_PRESSURE = 12.18316997  # psia (Boulder, CO)
R = 1545.35
G0 = 32.174  # ft/s^2 (standard gravity)
# ==================== CALCULATIONS ====================
print("=" * 70)
print("ROCKET ENGINE GEOMETRY CALCULATOR")
print("=" * 70)

# Initialize RocketCEA
print("\nInitializing RocketCEA...")
cea = CEA_Obj(oxName='LOX', fuelName='RP1')

# Calculate optimal expansion ratio for ambient pressure
pc_over_pe = CHAMBER_PRESSURE / AMBIENT_PRESSURE
expansion_ratio = cea.get_eps_at_PcOvPe(Pc=CHAMBER_PRESSURE, MR=OF_RATIO, PcOvPe=pc_over_pe, frozen=1)
print(f"  Optimal expansion ratio: {expansion_ratio:.2f} (Pe = {AMBIENT_PRESSURE} psia)")

# Get performance from RocketCEA
isp = cea.get_Isp(Pc=CHAMBER_PRESSURE, MR=OF_RATIO, eps=expansion_ratio, frozen=1)
cstar = cea.get_Cstar(Pc=CHAMBER_PRESSURE, MR=OF_RATIO)
tc = cea.get_Tcomb(Pc=CHAMBER_PRESSURE, MR=OF_RATIO)
(mw,gamma) = cea.get_exit_MolWt_gamma(Pc=CHAMBER_PRESSURE, MR=OF_RATIO, eps=expansion_ratio, frozen=1)

# Calculate thrust coefficient: Cf = Isp * g0 / c*
cf = (isp * G0)*.95 / cstar
v_e = math.sqrt(((tc * R * G0) / mw) * ((2 * gamma) / (gamma - 1)) * (1 - (1/pc_over_pe)**((gamma - 1) / gamma)))

# Calculate required throat area: At = F / (Cf × Pc)
pc_lbf_ft2 = CHAMBER_PRESSURE * 144  # Convert psia to lbf/ft²
throat_area = DESIRED_THRUST / (cf * pc_lbf_ft2)  # ft²

# Calculate mass flow: ṁ = (Pc × At) / c*
mass_flow_total = (DESIRED_THRUST)/isp

# Calculate throat diameter
throat_diameter = 2 * np.sqrt(throat_area / np.pi) * 12  # inches

# Calculate exit geometry
exit_area = throat_area * expansion_ratio  # ft²
exit_diameter = 2 * np.sqrt(exit_area / np.pi) * 12  # inches

# Get exit pressure for verification
pc_over_pe = cea.get_PcOvPe(Pc=CHAMBER_PRESSURE, MR=OF_RATIO, eps=expansion_ratio, frozen=1)
exit_pressure = CHAMBER_PRESSURE / pc_over_pe if pc_over_pe > 0 else 0

# Split mass flow into oxidizer and fuel
mdot_ox = mass_flow_total * (OF_RATIO / (1 + OF_RATIO))
mdot_fuel = mass_flow_total / (1 + OF_RATIO)

# ==================== RESULTS ====================
print("\n" + "=" * 70)
print("DESIGN RESULTS")
print("=" * 70)

print(f"\nInput Parameters:")
print(f"  Desired Thrust: {DESIRED_THRUST} lbf")
print(f"  Chamber Pressure: {CHAMBER_PRESSURE} psia")
print(f"  O/F Ratio: {OF_RATIO}")
print(f"  Expansion Ratio: {expansion_ratio:.2f} (optimized for altitude)")

print(f"\nEngine Geometry:")
print(f"  Throat Diameter: {throat_diameter:.3f} inches")
print(f"  Throat Area: {throat_area * 144:.4f} in²")
print(f"  Exit Diameter: {exit_diameter:.3f} inches")
print(f"  Exit Area: {exit_area * 144:.4f} in²")

print(f"\nPerformance:")
print(f"  Isp: {isp:.2f} s")
print(f"  C*: {cstar:.1f} ft/s")
print(f"  Cf: {cf:.3f}")
print(f"  Ve: {v_e:.3f} ft/s")
print(f"  Chamber Temp: {tc:.1f} °R ({tc - 459.67:.1f} °F)")
print(f"  Exit Pressure: {exit_pressure:.2f} psia (= ambient)")

print(f"\nMass Flow Rates:")
print(f"  Total: {mass_flow_total:.3f} lbm/s")
print(f"  Oxidizer (LOX): {mdot_ox:.3f} lbm/s")
print(f"  Fuel (RP-1): {mdot_fuel:.3f} lbm/s")

print("=" * 70)

<!--
USER_HOME_DIR=/Users/htnick
======================================================================
ROCKET ENGINE GEOMETRY CALCULATOR
======================================================================

Initializing RocketCEA...
  Optimal expansion ratio: 5.62 (Pe = 12.18316997 psia)

======================================================================
DESIGN RESULTS
======================================================================

Input Parameters:
  Desired Thrust: 2000 lbf
  Chamber Pressure: 500 psia
  O/F Ratio: 2.0
  Expansion Ratio: 5.62 (optimized for altitude)

Engine Geometry:
  Throat Diameter: 1.822 inches
  Throat Area: 2.6064 in²
  Exit Diameter: 4.319 inches
  Exit Area: 14.6486 in²

Performance:
  Isp: 294.68 s
  C*: 5869.1 ft/s
  Cf: 1.535
  Ve: 8575.180 ft/s
  Chamber Temp: 5939.1 °R (5479.4 °F)
  Exit Pressure: 12.18 psia (= ambient)

Mass Flow Rates:
  Total: 6.787 lbm/s
  Oxidizer (LOX): 4.525 lbm/s
  Fuel (RP-1): 2.262 lbm/s
======================================================================

-->

## Test stand software migration

Helped migrate the test stand software from Rust to C++ and wrote supporting scripts to keep the embedded systems running smoothly through a successful hot fire.

## Outcome

The redesigned injector and the RP-1/LOX propellant transition were validated through a successful hot fire, with the migrated C++ test stand software running reliably throughout.
