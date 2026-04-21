# EMU Software Setup

This section covers the software setup for the EMU using Happy Hare v3. Happy Hare is an open-source filament changer controller for multi-color printing and is required for the EMU to function. These steps are meant to be read in conjunction with the [Happy Hare wiki](https://github.com/moggieuk/Happy-Hare/wiki). The board setup step also references [Esoterical's CANBus setup](https://canbus.esoterical.online).

## Table of Contents

- [EMU Board Setup](/docs/software_setup/01-board-setup.md)
  - [Setting up CAN Bus](/docs/software_setup/01-board-setup.md#setting-up-can-bus)
  - [Flashing the EBB boards](/docs/software_setup/01-board-setup.md#flashing-the-ebb-boards)
  - [Updating the boards with the latest klipper version](/docs/software_setup/01-board-setup.md#updating-the-boards-with-the-latest-klipper-version)
- [Happy Hare Setup](/docs/software_setup/02-happy-hare-setup.md)
  - [Installing Happy Hare](/docs/software_setup/02-happy-hare-setup.md#installing-happy-hare)
  - [Configuring the EMU hardware](/docs/software_setup/02-happy-hare-setup.md#configuring-the-emu-hardware)
    - [Update your printer.cfg](/docs/software_setup/02-happy-hare-setup.md#update-your-printercfg)
    - [Update mmu/base/mmu.cfg](/docs/software_setup/02-happy-hare-setup.md#update-mmubasemmucfg)
    - [Update mmu/base/mmu_hardware.cfg](/docs/software_setup/02-happy-hare-setup.md#update-mmubasemmu_hardwarecfg)
    - [Update mmu/addons/mmu_eject_buttons_hw.cfg](/docs/software_setup/02-happy-hare-setup.md#update-mmuaddonsmmu_eject_buttons_hwcfg)
    - [Upload the emu_macros.cfg file and reference it in your printer.cfg](/docs/software_setup/02-happy-hare-setup.md#upload-the-emu_macroscfg-file-and-reference-it-in-your-printercfg)
    - [Save, restart and confirm lanes are visible](/docs/software_setup/02-happy-hare-setup.md#save-restart-and-confirm-lanes-are-visible)
  - [Configuring Happy Hare parameters](/docs/software_setup/02-happy-hare-setup.md#configuring-happy-hare-parameters)
  - [Configuring PSF and Flowguard (optional)](/docs/software_setup/02-happy-hare-setup.md#configuring-psf-and-flowguard)
  - [EMUSync PSF insights (optional)](/docs/software_setup/02-happy-hare-setup.md#emusync-psf-insights)
- [Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md)
  - [Calibrating the unit](/docs/software_setup/03-calibration-and-startup.md#calibrating-the-unit)
  - [First start up](/docs/software_setup/03-calibration-and-startup.md#first-start-up)
  - [Manual unit calibration (optional - if not satisfied with automated calibrations)](/docs/software_setup/03-calibration-and-startup.md#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations)
    - [Lane rotation distance calibration](/docs/software_setup/03-calibration-and-startup.md#lane-rotation-distance-calibration)
    - [Bowden tube calibration](/docs/software_setup/03-calibration-and-startup.md#bowden-tube-calibration)
- [Expanding the Unit](/docs/software_setup/04-expanding-the-unit.md)
- [Slicer Setup and Optimisation for Multi Color Prints](/docs/software_setup/05-slicer-setup.md)
  - [Orca slicer mandatory setup](/docs/software_setup/05-slicer-setup.md#orca-slicer-mandatory-setup)
  - [Orca slicer profile tuning for multi-color printing](/docs/software_setup/05-slicer-setup.md#orca-slicer-profile-tuning-for-multi-color-printing)

## After Setup
Once you have completed the steps above you should have a fully functioning EMU unit. You can optionally also set up:
1. [KlipperScreen integration](https://github.com/moggieuk/Happy-Hare/wiki/KlipperScreen)
2. [Mainsail / Fluidd MMU panel](https://github.com/moggieuk/Happy-Hare/wiki/Mainsail-Fluidd-Integration)
3. [Spoolman support](https://github.com/moggieuk/Happy-Hare/wiki/Spoolman-Support)

## Seeking Help

If you get stuck, the [Happy Hare Discord](https://discord.gg/aABQUjkZPk) is a great resource — both the general channel and the dedicated EMU channel.

---

← [Documentation Hub](/docs)
