[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

# EMU – Expandable Multi-material Unit Documentation
### A new take on a MMU by <a href="https://github.com/DW-Tas">DW-Tas</a> and <a href="https://github.com/igiannakas">igiannakas</a><br/>
<a href="https://ko-fi.com/O5O5OCC0K"><img src="/docs/assets/images/Ko-fi_smol.png"> Ko-Fi</a>

<p align="center">
  <img src="/docs/assets/images/EMU_multi_lane_unit.png" width="100%">
</p>

## Step 1: [Sourcing](/docs/sourcing.md)
The dedicated [sourcing page](/docs/sourcing.md) contains kit, certification and BOM information.

## Step 2: [Printing, Assembly and Wiring](/docs/assembly_wiring)
This page explains the EMU assembly and wiring. It links the BOM, detailed print settings for all of the EMU parts, including tips on how to achieve the optimal print results. It also includes the assembly videos, covers multi-lane and single-lane wiring for both EBB42/36 boards.

- [Print Settings](/docs/assembly_wiring/#print-settings)
  - [Filamentalist components and Lane stepper components](/docs/assembly_wiring/#filamentalist-components-and-lane-stepper-components)
  - [Dry Box components](/docs/assembly_wiring/#dry-box-components)
  - [Base unit components](/docs/assembly_wiring/#base-unit-components)
- [Assembly Videos](/docs/assembly_wiring/#assembly-videos)
  - [Part 1: Filamentalist and Stepper Assembly Guide](/docs/assembly_wiring/#part-1-filamentalist-and-stepper-assembly-guide)
  - [Part 2: Drybox Assembly Guide](/docs/assembly_wiring/#part-2-drybox-assembly-guide)
  - [Part 3: Base Assembly Guide](/docs/assembly_wiring/#part-3-base-assembly-guide)
  - [Part 4: Electronics Assembly Guide](/docs/assembly_wiring/#part-4-electronics-assembly-guide)
- [Wiring Instructions and Diagrams](/docs/assembly_wiring/#wiring-instructions-and-diagrams)

## Step 3: [EMU Board Setup](/docs/software_setup/01-board-setup.md)
This page explains in detail how to setup your EMU boards with CANBus, how to flash Katapult and klipper as well as the procedure to update the klipper firmware.

- [Setting up CAN Bus](/docs/software_setup/01-board-setup.md#setting-up-can-bus)
- [Flashing the EBB boards](/docs/software_setup/01-board-setup.md#flashing-the-ebb-boards)
- [Updating the boards with the latest klipper version](/docs/software_setup/01-board-setup.md#updating-the-boards-with-the-latest-klipper-version)

## Step 4: [Happy Hare Setup](/docs/software_setup/02-happy-hare-setup.md)
This page explains the step by step process to install and set up Happy Hare, the MMU management software that drives the EMU.

- [Installing Happy Hare](/docs/software_setup/02-happy-hare-setup.md#installing-happy-hare)
- [Configuring the EMU hardware](/docs/software_setup/02-happy-hare-setup.md#configuring-the-emu-hardware)
- [Configuring Happy Hare parameters](/docs/software_setup/02-happy-hare-setup.md#configuring-happy-hare-parameters)
      
## Step 5: [Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md)
This page explains the step by step process to calibrate the unit and the initial start up checks required to ensure successful first operation.

- [Lane rotation distance calibration](/docs/software_setup/03-calibration-and-startup.md#lane-rotation-distance-calibration)
- [Bowden tube calibration](/docs/software_setup/03-calibration-and-startup.md#bowden-tube-calibration)
- [First start up](/docs/software_setup/03-calibration-and-startup.md#first-start-up)

## Step 6: [Slicer Setup and Optimisation for Multi Color Prints](/docs/software_setup/05-slicer-setup.md)
Describes the mandatory Orca slicer setup required for single extruder multi-material printing, including print profile settings to achieve optimal quality results.

- [Orca slicer mandatory setup](/docs/software_setup/05-slicer-setup.md#orca-slicer-mandatory-setup)
- [Orca slicer profile tuning for multi-color printing](/docs/software_setup/05-slicer-setup.md#orca-slicer-profile-tuning-for-multi-color-printing)

## Next steps
Once you have completed the steps above you should have a fully functioning EMU unit! Optionally you can also set up:
1. Klipper screen integration: https://github.com/moggieuk/Happy-Hare/wiki/KlipperScreen
2. Mainsail / Fluid MMU panel: https://github.com/moggieuk/Happy-Hare/wiki/Mainsail-Fluidd-Integration
3. Spoolman: https://github.com/moggieuk/Happy-Hare/wiki/Spoolman-Support

In addition, to add further lanes, follow  the instructions here: [Expanding the unit](/docs/software_setup/04-expanding-the-unit.md)

## Seeking help

Join our active communities on Discord using the links below. We are active on both the Armchair Engineering and Happy Hare discord servers below.

[![Join me on Discord](https://discord.com/api/guilds/1029426383614648421/widget.png?style=banner2)](https://discord.gg/hG2NRazKG3)   
<br>
**HappyHare Discord:** https://discord.gg/Yt8Fe7FkNc


#### This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

### License clarification regarding non-commercial use:
The non-commercial aspect of this license is for cases where EMU is the product, not the use of EMU to create products.<br/>
I.e. If you wish to sell EMU as a product, you would need to seek a commercial license before doing so. </br>
It is NOT intended to prevent the use of EMU with a printer that you use to provide commercial services. If you want to run EMU in your print farm, go right ahead.


---

← [Main README](/) | [Step 1: Sourcing →](/docs/sourcing.md)
