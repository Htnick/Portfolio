---
title: "DIABLO: Data Acquisition for the Liquid Test Stand"
description: "Firmware and board bring-up for DIABLO, CU SRL's test-stand DAQ and valve controller: a custom STM32H743 board running Zephyr, commanded over Ethernet from a LabVIEW ground station."
date: "2025-08-01"
status: "completed"
tags: ["avionics", "embedded", "Zephyr", "C", "DAQ", "liquid rockets"]
image: "test-stand-photo.jpg"
draft: false
accent: "#4a6fa5"
role: "Firmware and hardware bring-up on CU SRL's DIABLO team"
results: "The custom STM32H743 board was brought up and successfully flashed with the Zephyr firmware. The project has been handed to SRL's avionics team to finish integration."
---

## Overview

DIABLO is the data acquisition and control system for CU SRL's liquid
engine test stand. It reads every pressure transducer on the stand,
drives the valves, and talks to a LabVIEW ground station over Ethernet,
so the technician running a test never has to touch the stand itself.

The hardware is a custom board built around an STM32H743 (Arm Cortex-M7),
and the firmware runs on Zephyr RTOS. I worked on the firmware and on bringing
the board up: getting a custom board definition to build and flash, and
proving the hardware was alive before the full DAQ firmware went on it.

<div class="stat-strip">
<div><span class="stat-value">STM32H743</span><span class="stat-label">Cortex-M7 on a custom board</span></div>
<div><span class="stat-value">Zephyr</span><span class="stat-label">RTOS, west workspace</span></div>
<div><span class="stat-value">3 ADCs</span><span class="stat-label">Sampled at 10 kHz</span></div>
<div><span class="stat-value">Ethernet</span><span class="stat-label">To the LabVIEW ground station</span></div>
</div>

## What it controls: the test stand P&ID

The P&ID is the stand DIABLO runs. Gaseous nitrogen from a 3 ksi bottle
is regulated down to pressurize the LOX and Jet-A tanks (1 ksi MEOP
each) through motorized ball valves and check valves. Normally closed
pneumatic main valves feed each propellant to the engine, normally open
pneumatic vents dump the tanks if power or air is lost, and passive
relief valves cap the tank lines at 1,300 psi and the LOX fill at
300 psi. Pressure transducers on the nitrogen supply, both tanks and
both engine manifolds are the channels DIABLO samples.

<figure class="fig"><img src="/Portfolio/images/diablo-pid.jpg" alt="Test stand P&ID: a 3 ksi GN2 bottle feeds a regulator and motorized ball valves into LOX and Jet-A tanks rated to 1 ksi MEOP, with check valves, normally open pneumatic vents, normally closed pneumatic main valves to the engine, 1300 psi relief valves on the tank pressurization lines, a 300 psi relief on the LOX fill, and pressure transducers PT-N1, PT-N2, PT-O1, PT-O2, PT-F1 and PT-F2, with a valve symbol legend" loading="lazy" /></figure>

## Firmware architecture

The firmware is deliberately simple. LabVIEW sends a short command
packet over TCP, the firmware parses it, and the command is posted on a
Zephyr zbus channel that wakes whichever thread owns that job. Three
threads split the work by priority:

| Thread | Priority | Job |
|---|---|---|
| TCP | 0 (highest) | Receives and parses command packets, sends responses and data back to LabVIEW |
| Data sample | 1 | Samples ADC1, ADC2 and ADC3 at 10 kHz, drives the GPIO multiplexers, reads digital inputs |
| Stepper | 2 | Runs the TMC429 stepper controller over SPI for the motorized valves, reads quadrature encoders, homes the valves |

Keeping the TCP thread as the only way in, and fanning commands out
over zbus, means the sampling and valve threads never block on the
network and each one can be tested on its own.

## Board bring-up

A custom board is not a dev board, and most of the work was getting
Zephyr to treat it as one. The firmware repo is a west workspace that
also registers itself as a Zephyr module, so the custom `diablo_pcb`
board definition (devicetree, clocks, power, UART and the enabled
peripherals) is found by a plain `west build`. Before putting the full
DAQ firmware on new hardware, a separate minimal blink app drives one
LED channel and prints the readback over the UART, which confirms the
chip, clocks and flashing path work with nothing more than a scope or a
multimeter.

## Status

Completed for my part: the board has been brought up and successfully
flashed, and DIABLO has been handed over to SRL's avionics team to
finish the remaining integration.
