---
title: "Modeling the Heating and Cooling of Buildings"
description: "A linear ODE model of a building's indoor temperature — outdoor forcing, occupant/equipment heat, and thermostat control — solved analytically and validated against a custom 4th-order Runge-Kutta integrator in MATLAB."
date: "2025-08-01"
status: "completed"
tags: ["differential equations", "MATLAB", "numerical methods", "Runge-Kutta"]
image: "heating-cooling-hero.jpg"
draft: false
---

## Overview

An APPM 2360 (Differential Equations) team project with Logan Sebeck and Abigail Lindly, modeling a building's indoor temperature as a first-order ODE:

dT/dt = κ[M(t) − T(t)] + H(t) + Q(t)

where M(t) is the outdoor temperature, H(t) is heat contributed by people/lights/machinery, Q(t) is artificial heating or cooling from furnaces and air conditioning, and κ is a positive constant tied to the building's insulation.

## Existence, uniqueness, and the base case

- Classified the governing equation (linear, constant- or variable-coefficient depending on how Q(t) is defined) and confirmed it satisfies Picard's theorem on the interval of interest, guaranteeing a unique solution through any initial condition.
- Solved the simplified case — no occupants, no HVAC, constant outdoor temperature M₀ — in closed form and showed the building's temperature approaches M₀ asymptotically, a stable equilibrium.
- Derived the time constant of that response (−1/κ) and connected it physically to insulation quality: a smaller κ means a more resistant building that responds more slowly to outdoor temperature swings.

## Numerical validation via Runge-Kutta

- Implemented a 4th-order Runge-Kutta solver in MATLAB to numerically integrate the ODE over a 24-hour interval (240 points, h = 0.1).
- Checked the RK4 approximation against the closed-form analytical solution for the base case and plotted the error directly, confirming the numerical scheme tracks the true solution closely, with error growing as the trajectory moves away from the known initial condition.

## Adding realistic complexity

Built the model back up in stages, each time re-solving with the RK4 integrator:

- **Varying outdoor temperature.** Replaced the constant M₀ with a sinusoidal daily cycle and compared the resulting indoor and outdoor temperature curves — the indoor temperature lags and dampens the outdoor swing, as expected physically.
- **Occupant/equipment heat.** Modeled H(t) as a bell-shaped (sech) pulse centered on the workday and examined how it shifts the indoor temperature curve.
- **Thermostat-controlled HVAC.** Modeled Q(t) as proportional to the gap between indoor temperature and a thermostat setpoint, and compared how different proportionality constants (κ_d) changed how quickly the building reached and held the setpoint.
- **All three combined**, used to solve a practical constraint: keeping indoor temperature under an 81°F equipment safety limit given occupancy heat and a hot outdoor day, and evaluating how much thermostat "efficiency" (κ_d) was needed to hold that line.
- **A 72-hour weekend scenario** — people present Friday, building vacant through the weekend — showing the temperature settle into a bounded, periodic transient response driven purely by the day/night outdoor cycle once occupancy heat drops out.

## Outcome

The model correctly predicted stable equilibrium behavior, matched RK4 numerical approximations against known analytical solutions, and was flexible enough to answer a practical question — whether HVAC and thermostat settings could keep sensitive equipment under a hard temperature limit through a realistic day/weekend cycle.
