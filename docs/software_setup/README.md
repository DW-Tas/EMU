# EMU Software Setup

This section covers the software setup for the EMU. The EMU needs MMU control software running alongside Klipper. Both of the options below support the EMU natively. The EMU was developed on Happy Hare and it's the software we have the most experience with. However, AFC is equally an option if you prefer it or already use it, with its setup covered in the AFC documentation.

- **Happy Hare v4:** The main installation guide is the [EMU Getting Started guide](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/) in the [Happy Hare documentation](https://moggieuk.github.io/Happy-Hare-Doc/). The Happy Hare pages below cover what's specific to the EMU.
- **AFC (AFC-Klipper-Add-On):** Follow the [AFC documentation](https://www.afcproject.dev/), starting with the [Initial Startup & Commissioning guide](https://www.afcproject.dev/initial-startup/01-overview.html) (select the EMU tab). In the AFC installer, choose **EMU** as the unit type.

Board setup and UKAM apply whichever option you choose. The Happy Hare section of Software Setup, Calibration and Startup, Expanding the Unit and the slicer machine G-code are written for Happy Hare. The board setup step also references [Esoterical's CANBus setup](https://canbus.esoterical.online).

> [!NOTE]
> **Still on Happy Hare v3?** The previous v3 guides are kept in the [legacy Happy Hare v3 archive](/docs/software_setup/legacy_hhv3), along with how to stay on v3 or upgrade to v4.

## Table of Contents

- [EMU Board Setup](/docs/software_setup/01-board-setup.md)
  - [Setting up CAN Bus](/docs/software_setup/01-board-setup.md#setting-up-can-bus)
  - [Setting up the Solo Lane Boards](/docs/software_setup/01-board-setup.md#setting-up-the-solo-lane-boards)
  - [Setting up and flashing the EBB boards](/docs/software_setup/01-board-setup.md#setting-up-and-flashing-the-ebb-boards)
  - [Updating the boards with the latest klipper version](/docs/software_setup/01-board-setup.md#updating-the-boards-with-the-latest-klipper-version)
- [Software Setup](/docs/software_setup/02-software-setup.md)
  - [Happy Hare v4](/docs/software_setup/02-software-setup.md#happy-hare-v4) – [Getting Started with EMU (Happy Hare v4)](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/)
    - [EMU notes for the v4 installer](/docs/software_setup/02-software-setup.md#emu-notes-for-the-v4-installer)
    - [After installing](/docs/software_setup/02-software-setup.md#after-installing)
  - [AFC (AFC-Klipper-Add-On)](/docs/software_setup/02-software-setup.md#afc-afc-klipper-add-on)
- [Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md)
  - [First start up](/docs/software_setup/03-calibration-and-startup.md#first-start-up)
  - [Calibrating the unit](/docs/software_setup/03-calibration-and-startup.md#calibrating-the-unit)
    - [Check the calibration settings](/docs/software_setup/03-calibration-and-startup.md#check-the-calibration-settings)
    - [Calibrate the EMU Sync PSF sensor (PSF only)](/docs/software_setup/03-calibration-and-startup.md#calibrate-the-emu-sync-psf-sensor-psf-only)
    - [Bowden length auto-calibration](/docs/software_setup/03-calibration-and-startup.md#bowden-length-auto-calibration)
    - [Toolhead dimensions](/docs/software_setup/03-calibration-and-startup.md#toolhead-dimensions)
  - [Manual unit calibration (optional - if not satisfied with automated calibrations)](/docs/software_setup/03-calibration-and-startup.md#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations)
    - [Lane rotation distance calibration](/docs/software_setup/03-calibration-and-startup.md#lane-rotation-distance-calibration)
    - [Bowden tube calibration](/docs/software_setup/03-calibration-and-startup.md#bowden-tube-calibration)
- [Expanding the Unit](/docs/software_setup/04-expanding-the-unit.md)
- [Slicer Setup and Optimisation for Multi Color Prints](/docs/software_setup/05-slicer-setup.md)
  - [Orca slicer mandatory setup](/docs/software_setup/05-slicer-setup.md#orca-slicer-mandatory-setup)
  - [Orca slicer profile tuning for multi-color printing](/docs/software_setup/05-slicer-setup.md#orca-slicer-profile-tuning-for-multi-color-printing)
- [Updating CAN Boards with UKAM](/docs/software_setup/06-updating-can-boards.md)
- [Manual Sensorless Toolhead Calibration for Happy Hare](/docs/software_setup/07-manual-toolhead-calibration.md)
- [Manual Toolhead Calibration with Two Sensors for Happy Hare](/docs/software_setup/08-manual_toolhead_calibration_two_sensors.md)
- [Legacy Happy Hare v3 guides (archive)](/docs/software_setup/legacy_hhv3)

## After Setup
Once you have completed the steps above you should have a fully working EMU. You can optionally also set up:
1. [KlipperScreen integration](https://moggieuk.github.io/Happy-Hare-Doc/KlipperScreen/)
2. [Mainsail / Fluidd MMU panel](https://moggieuk.github.io/Happy-Hare-Doc/Mainsail-Fluidd-Integration/)
3. [Spoolman support](https://moggieuk.github.io/Happy-Hare-Doc/Feature-Spoolman/)

## Seeking Help

If you get stuck, the [Happy Hare Discord](https://discord.gg/aABQUjkZPk) is a great resource — both the general channel and the dedicated EMU channel.

---

← [Documentation Hub](/docs)
