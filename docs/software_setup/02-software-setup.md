# Software Setup

The EMU needs MMU control software running alongside Klipper. Both of the options below support the EMU natively. The EMU was developed on Happy Hare and it's the software we have the most experience with. However, AFC is equally an option if you prefer it or already use it, with its setup covered in the AFC documentation.

- **[Happy Hare v4](#happy-hare-v4):** Set up with the Happy Hare `menuconfig` installer. The EMU-specific notes are below.
- **[AFC (AFC-Klipper-Add-On)](#afc-afc-klipper-add-on):** Set up with the AFC installer, following the AFC documentation.

## Table of Contents

- [Happy Hare v4](#happy-hare-v4)
  - [EMU notes for the v4 installer](#emu-notes-for-the-v4-installer)
  - [After installing](#after-installing)
- [AFC (AFC-Klipper-Add-On)](#afc-afc-klipper-add-on)

## Happy Hare v4

The EMU is supported natively in **Happy Hare v4**. Select **EMU** in the new `menuconfig` installer and it sets up the EMU defaults for you: per-lane MCUs, SLB or EBB pin mappings, LEDs, eject buttons, environment sensors, fans, the EMU Sync (PSF) buffer and the recommended speeds. You no longer need to hand-edit `mmu.cfg`, `mmu_hardware.cfg` or `mmu_parameters.cfg`.

The step-by-step installation guide is maintained in the Happy Hare documentation:

**➡️ [Getting Started with EMU – Happy Hare v4](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/)**

> [!NOTE]
> **Still running Happy Hare v3?** The previous v3 setup guide is kept in the [legacy v3 archive](/docs/software_setup/legacy_hhv3/02-happy-hare-setup.md). The v3 instructions and config snippets don't apply to v4. If you're moving from v3 to v4, read the Happy Hare [Upgrading from v3 to v4](https://moggieuk.github.io/Happy-Hare-Doc/Upgrade-v3-v4/) guide first.

### EMU notes for the v4 installer

Keep these in mind as you work through the Happy Hare guide:

1. **Run the installer with `-e`.** `./install.sh -e` enables per-lane MCU support, which the EMU needs (each lane has its own board).
2. **MMU Type: EMU.** Set **Number of gates** to your lane count.
3. **EMU Sync version.**
   - **EMU Sync PSF (proportional):** Leave **PSF buffer** selected. This is the default and recommended option.
   - **EMU Sync with dual switches:** Deselect **PSF buffer**. The compression and tension switches are then enabled instead.
4. **Board type.** **SLB** (Solo Lane Board) is pre-selected. If you built your EMU with EBB36/42 boards, select **EBB36/42 gen1 MCU** instead.
5. **MCU connection.** Enter the `canbus_uuid` for each lane. These are the UUID-to-lane values you noted in [Step 3: EMU Board Setup](/docs/software_setup/01-board-setup.md). Lane 0 is gate 0, lane 1 is gate 1, and so on.
6. **MMU Features / Additions.** Enable or disable the environment sensors, managed fans and eject buttons to match what's fitted on your lanes. Then review each **Gate N config** menu.
7. **Toolhead.** If your extruder/hotend combination is in the **Toolhead** list, select it for community-measured starting values. If it isn't, see [Step 5: Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md#toolhead-dimensions).
8. <a id="extruder-homing-method"></a>**Extruder homing method.** Happy Hare needs a sensor to detect when the filament reaches the extruder. It uses this when loading, and bowden auto-calibration depends on it. Set it in **Endstops and Bowden movement → Extruder endstop method** (`extruder_homing_endstop`):

   | Your setup | Extruder endstop method | `extruder_homing_endstop` |
   |---|---|---|
   | EMU Sync PSF (proportional), no extruder or toolhead sensor | Filament compression | `filament_compression` |
   | EMU Sync with dual switches, no extruder or toolhead sensor | Filament compression | `filament_compression` |
   | Toolhead with an extruder entry sensor (any EMU Sync version) | Extruder entry sensor + advance | `extruder` |

   - **PSF, no extruder or toolhead sensor:** Happy Hare v4 uses the PSF as a virtual compression switch, so choose `filament_compression`. This replaces the `proportional` setting used with v3. It's the default when the PSF buffer option is selected.
   - **Dual-switch EMU Sync, no extruder or toolhead sensor:** The installer may not pick `filament_compression` for you. Check this setting and select **Filament compression** if needed.
   - **Toolhead with an extruder entry sensor:** Enable the sensor under **Toolhead sensors/settings** first. You can then choose either the entry sensor or filament compression. Both work well.
   - **Toolhead with a toolhead sensor** (after the extruder gears): The extruder endstop method is only shown when **Force extruder homing** is enabled.

   Don't leave this set to `none`, or bowden auto-calibration won't work.
9. <a id="toolhead-cutter"></a>**Toolhead cutter (highly recommended).** A toolhead filament cutter, such as the [Crossbow Filament Cutter](https://github.com/DW-Tas/Crossbow-Filament-Cutter), gives cleaner and more reliable filament swaps than tip forming. The EMU [slicer setup](/docs/software_setup/05-slicer-setup.md) assumes you have one. To set it up in `menuconfig`:
   - **Toolhead sensors/settings → Has toolhead cutter?:** Enable it.
   - **Tip Forming / Cutting → Select standalone tip shaping option:** Choose **Tip cutting using toolhead cutter**. Leave **Happy Hare controlled in-print tip forming/cutting** enabled, and turn off tip forming in your slicer.
   - **Macro Variables → Toolhead tip cutting (`_MMU_CUT_TIP`):** Set the cutter geometry for your printer. At a minimum, set **Pin location (X,Y)**, **Compressed pin location (X,Y)**, **Cutting axis**, **Blade position** and **Retract length**. The pin locations depend on your printer, so measure your own rather than copying them from another build.

   See the Happy Hare [Toolhead Cutting](https://moggieuk.github.io/Happy-Hare-Doc/Macro-Toolhead-Tip-Cutting/) guide for every setting. See [Toolhead dimensions](/docs/software_setup/03-calibration-and-startup.md#toolhead-dimensions) for how to measure the blade position and retract length. Once it's configured, test the cutter as described in [First start up](/docs/software_setup/03-calibration-and-startup.md#first-start-up).
10. **Speeds.** The EMU defaults (250 mm/s bowden moves, 80 mm/s short moves, 16 mm/s extruder moves) are the same conservative values validated on the EMU with Happy Hare v3. Start with these, and only raise them once the unit is running reliably.
11. **Changing settings later.** Run `./install.sh -i` from the `Happy-Hare` folder to re-open `menuconfig`. Make changes there rather than editing the generated `.cfg` files. This keeps them from being overwritten on the next install.

### After installing

1. Complete the **Validating Hardware Setup** section of the [Happy Hare EMU guide](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/#validating-hardware-setup). This covers gear direction, sensors, the sync-feedback buffer and LEDs.
2. Continue with [Step 5: Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md) for the EMU first start up checks and calibration.
3. Then set up your slicer with [Step 6: Slicer Setup](/docs/software_setup/05-slicer-setup.md).

For anything else, the [Happy Hare v4 documentation](https://moggieuk.github.io/Happy-Hare-Doc/) covers every feature in detail, including [Sync-Feedback Buffer](https://moggieuk.github.io/Happy-Hare-Doc/Feature-Sync-Feedback-Buffer/), [FlowGuard](https://moggieuk.github.io/Happy-Hare-Doc/Feature-FlowGuard/), [Environment Manager](https://moggieuk.github.io/Happy-Hare-Doc/Feature-Environment-Manager/) and [Eject Buttons](https://moggieuk.github.io/Happy-Hare-Doc/Feature-Eject-Buttons/).

## AFC (AFC-Klipper-Add-On)

AFC also supports the EMU natively. In the AFC installer (`install-afc.sh`), choose **EMU** as the unit type, then set your lane count and board type (SLB or EBB). Follow the [AFC documentation](https://www.afcproject.dev/) for the full process:

- [AFC installation guide](https://www.afcproject.dev/installation/getting-started.html)
- [AFC Initial Startup & Commissioning guide](https://www.afcproject.dev/initial-startup/01-overview.html) (select the EMU tab)
- [AFC calibration guide](https://www.afcproject.dev/installation/calibration.html)
- [AFC slicer setup guide](https://www.afcproject.dev/installation/slicer-setup.html)

The [Happy Hare notes](#happy-hare-v4) above, [Step 5: Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md), [Expanding the Unit](/docs/software_setup/04-expanding-the-unit.md) and the machine G-code in [Step 6: Slicer Setup](/docs/software_setup/05-slicer-setup.md) are written for Happy Hare. They don't apply to AFC.

---

← [Step 3: EMU Board Setup](/docs/software_setup/01-board-setup.md) | [Step 5: Calibration and Startup →](/docs/software_setup/03-calibration-and-startup.md)
