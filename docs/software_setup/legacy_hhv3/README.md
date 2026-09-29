# EMU Software Setup – Happy Hare v3 (Legacy Archive)

> [!WARNING]
> **These guides are for Happy Hare v3 only.** They're kept here for existing v3 installs. Happy Hare v4 uses a new `menuconfig` installer, a different config layout and different parameter and sensor names, so v3 instructions and config snippets **do not apply to v4**. For new installs, follow the [current EMU software setup](/docs/software_setup) and the [EMU Getting Started guide for Happy Hare v4](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/).

## Staying on v3 or upgrading to v4

If you have a working v3 install, running `./install.sh` (or updating via Moonraker) with a newer Happy Hare checkout will prompt you to either stay on v3 or upgrade to v4:

- **Staying on v3:** Choose the "stay on v3" option, or run `cd ~/Happy-Hare && ./install.sh -b v3`. This switches your checkout to the `v3` branch and points Moonraker's update manager at it. Your configuration is not changed.
- **Upgrading to v4:** Your v3 `mmu` config folder is renamed to `mmu.V3` (it's not deleted), and you're walked through a fresh v4 setup in `menuconfig`. Nothing is carried over automatically, so keep your `mmu.V3` files open to copy across calibration values and any custom settings. Then follow the [current EMU software setup](/docs/software_setup).

The full details, including how to go back to v3 after a v4 install, are in the Happy Hare [Upgrading from v3 to v4](https://moggieuk.github.io/Happy-Hare-Doc/Upgrade-v3-v4/) guide.

## Table of Contents (v3)

Pages marked *(shared)* are not tied to a Happy Hare version and are used by both v3 and v4 installs.

- [EMU Board Setup](/docs/software_setup/01-board-setup.md) *(shared)*
- [Happy Hare v3 Setup](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md)
  - [Installing Happy Hare](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#installing-happy-hare)
  - [Configuring the EMU hardware](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#configuring-the-emu-hardware)
    - [Update your printer.cfg](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#update-your-printercfg)
    - [Update mmu/base/mmu.cfg](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#update-mmubasemmucfg)
    - [Update mmu/base/mmu_hardware.cfg](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#update-mmubasemmu_hardwarecfg)
    - [Update mmu/addons/mmu_eject_buttons_hw.cfg](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#update-mmuaddonsmmu_eject_buttons_hwcfg)
    - [Upload the emu_macros.cfg file and reference it in your printer.cfg](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#upload-the-emu_macroscfg-file-and-reference-it-in-your-printercfg)
    - [Save, restart and confirm lanes are visible](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#save-restart-and-confirm-lanes-are-visible)
  - [Configuring Happy Hare parameters](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#configuring-happy-hare-parameters)
  - [Configuring PSF and Flowguard (optional)](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#configuring-psf-and-flowguard)
  - [EMUSync PSF insights (optional)](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md#emusync-psf-insights)
- [Calibration and Startup (v3)](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md)
  - [Calibrating the unit](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md#calibrating-the-unit)
  - [First start up](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md#first-start-up)
  - [Manual unit calibration (optional - if not satisfied with automated calibrations)](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations)
    - [Lane rotation distance calibration](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md#lane-rotation-distance-calibration)
    - [Bowden tube calibration](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md#bowden-tube-calibration)
- [Expanding the Unit (v3)](/docs/software_setup/legacy_hhv3/04-expanding-the-unit.md)
- [Slicer Setup and Optimisation for Multi Color Prints](/docs/software_setup/05-slicer-setup.md) *(shared)*
- [Updating CAN Boards with UKAM](/docs/software_setup/06-updating-can-boards.md) *(shared)*
- [Manual Sensorless Toolhead Calibration for Happy Hare](/docs/software_setup/07-manual-toolhead-calibration.md) *(shared)*
- [Manual Toolhead Calibration with Two Sensors for Happy Hare](/docs/software_setup/08-manual_toolhead_calibration_two_sensors.md) *(shared)*

The v3 setup also uses the [`emu_macros.cfg` file and Klipper module patches](/macros) from this repository.

## After Setup (v3)
Once you have completed the steps above you should have a fully functioning EMU unit. You can optionally also set up (Happy Hare v3 wiki):
1. [KlipperScreen integration](https://github.com/moggieuk/Happy-Hare/wiki/KlipperScreen)
2. [Mainsail / Fluidd MMU panel](https://github.com/moggieuk/Happy-Hare/wiki/Mainsail-Fluidd-Integration)
3. [Spoolman support](https://github.com/moggieuk/Happy-Hare/wiki/Spoolman-Support)

## Seeking Help

If you get stuck, the [Happy Hare Discord](https://discord.gg/aABQUjkZPk) is a great resource — both the general channel and the dedicated EMU channel.

---

← [Current Software Setup (Happy Hare v4)](/docs/software_setup) | [Documentation Hub](/docs)
