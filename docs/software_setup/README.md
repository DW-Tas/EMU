# EMU Software Setup

This section covers the software setup for the EMU using **Happy Hare v4**. Happy Hare is an open-source filament changer controller for multi-color printing, and the EMU needs it to work. Happy Hare v4 supports the EMU natively. The main installation guide is the [EMU Getting Started guide](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/) in the [Happy Hare documentation](https://moggieuk.github.io/Happy-Hare-Doc/). The pages below cover what's specific to the EMU. The board setup step also references [Esoterical's CANBus setup](https://canbus.esoterical.online).

> [!NOTE]
> **Still on Happy Hare v3?** The previous v3 guides are kept in the [legacy Happy Hare v3 archive](/docs/software_setup/legacy_hhv3), along with how to stay on v3 or upgrade to v4.

## Table of Contents

- [EMU Board Setup](/docs/software_setup/01-board-setup.md)
  - [Setting up CAN Bus](/docs/software_setup/01-board-setup.md#setting-up-can-bus)
  - [Setting up the Solo Lane Boards](/docs/software_setup/01-board-setup.md#setting-up-the-solo-lane-boards)
  - [Setting up and flashing the EBB boards](/docs/software_setup/01-board-setup.md#setting-up-and-flashing-the-ebb-boards)
  - [Updating the boards with the latest klipper version](/docs/software_setup/01-board-setup.md#updating-the-boards-with-the-latest-klipper-version)
- [Happy Hare Setup](/docs/software_setup/02-happy-hare-setup.md) – [Getting Started with EMU (Happy Hare v4)](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/)
  - [EMU notes for the v4 installer](/docs/software_setup/02-happy-hare-setup.md#emu-notes-for-the-v4-installer)
  - [After installing](/docs/software_setup/02-happy-hare-setup.md#after-installing)
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
