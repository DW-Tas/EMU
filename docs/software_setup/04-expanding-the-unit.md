# Expanding the Unit

This section covers adding lanes to an existing EMU installation running Happy Hare v4. It's meant to be read alongside the [Happy Hare EMU guide](https://moggieuk.github.io/Happy-Hare-Doc/GettingStarted-EMU/).

> [!NOTE]
> **Running Happy Hare v3?** Use the [legacy v3 Expanding the Unit guide](/docs/software_setup/legacy_hhv3/04-expanding-the-unit.md). It covers editing `mmu.cfg`, `mmu_hardware.cfg` and the other config files by hand.

## Table of Contents

- [Expanding the unit with more lanes](#expanding-the-unit-with-more-lanes)

## Expanding the unit with more lanes

With Happy Hare v4 you don't edit any config files by hand to add lanes. The installer generates the MCU, stepper, sensor, LED, eject button, environment sensor and fan sections for every lane, based on the number of gates.

Lanes on an additional EMU base are added the same way. All EMU lanes stay part of the same Happy Hare unit.

**Step 1: Build and flash the new lanes.** Assemble and wire the new lanes. Then flash their boards as described in [Step 3: EMU Board Setup](/docs/software_setup/01-board-setup.md). Note down each new board's `canbus_uuid` and which lane it belongs to.

**Step 2: Re-run the installer.** From your `Happy-Hare` folder, run:
```bash
cd ~/Happy-Hare
./install.sh -i
```
You don't need the `-e` flag again. The installer remembers that per-lane MCU support is enabled.

**Step 3: Update the configuration in `menuconfig`.**

1. **MMU Type → Number of gates:** Set this to your new total lane count.
2. **MCU connection:** Enter the `canbus_uuid` for each new lane. Existing lanes keep their UUIDs.
3. **MMU Features / Additions → Gate N config:** Check each new gate's environment sensor, managed fan and other per-lane options match what's fitted.

Save and exit. The installer regenerates your config files. Restart Klipper if it doesn't restart automatically.

**Step 4: Check the new lanes are visible.** Run `MMU_STATUS` and `MMU_SENSORS` and check that the new gates and their `mmu_entry_N` / `mmu_exit_N` sensors are listed. If Klipper fails to start, check the new `canbus_uuid` values.

**Step 5: Validate and calibrate the new lanes.**

1. Run the [First start up](/docs/software_setup/03-calibration-and-startup.md#first-start-up) checks for each new lane: sensors, gear direction, eject button and LEDs. If a new lane runs backwards, add a `!` to its **Gear dir pin** in `menuconfig`.
2. Bowden length is auto-calibrated the first time each new lane is loaded. To get this done before your next print, load each new lane once with its Tx command. See [Bowden length auto-calibration](/docs/software_setup/03-calibration-and-startup.md#bowden-length-auto-calibration).
3. Optionally, run the [manual rotation distance and bowden calibrations](/docs/software_setup/03-calibration-and-startup.md#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations) for the new lanes.

If you're also adding lanes in your slicer, remember to add a filament/extruder for each new lane. See [Step 6: Slicer Setup](/docs/software_setup/05-slicer-setup.md).

---

← [Documentation Hub](/docs)
