# Calibration and Startup

This section covers the first start up checks and calibrating the EMU with Happy Hare v4. It's meant to be read alongside the Happy Hare [Calibration](https://moggieuk.github.io/Happy-Hare-Doc/Calibration/) documentation. If you use AFC instead of Happy Hare, follow the [AFC calibration guide](https://www.afcproject.dev/installation/calibration.html).

> [!NOTE]
> **Running Happy Hare v3?** Use the [legacy v3 Calibration and Startup guide](/docs/software_setup/legacy_hhv3/03-calibration-and-startup.md). The v3 parameter names and the `proportional` extruder homing option don't exist in v4.

## Table of Contents

- [First start up](#first-start-up)
- [Calibrating the unit](#calibrating-the-unit)
  - [Check the calibration settings](#check-the-calibration-settings)
  - [Calibrate the EMU Sync PSF sensor (PSF only)](#calibrate-the-emu-sync-psf-sensor-psf-only)
  - [Bowden length auto-calibration](#bowden-length-auto-calibration)
  - [Toolhead dimensions](#toolhead-dimensions)
- [Manual unit calibration (optional - if not satisfied with automated calibrations)](#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations)
  - [Lane rotation distance calibration](#lane-rotation-distance-calibration)
  - [Bowden tube calibration](#bowden-tube-calibration)


## First start up
Follow the first start up procedure below to check that the EMU is wired and working correctly. Use `MMU_SENSORS` at any point to see the live state of every sensor.

1. **Lane sensors.** Insert filament into each lane. The lane grabs it and parks it just before the post-stepper sensor. Run `MMU_SENSORS` and check that, for that lane, the pre-gate (entry) sensor `mmu_entry_N` shows **TRIGGERED** and the post-stepper (exit) sensor `mmu_exit_N` shows **Open**. If they're the other way round, the two sensors are wired backwards. Swap that lane's pins in `menuconfig` under **Pins / TMC → Mmu entry sensor pins** and **Mmu exit sensor pins**.
2. **Lane stepper.** Run the commands below, replacing `0` with the lane number. The filament should move forward (away from the spool), and `mmu_exit_N` should now show **TRIGGERED**. If the filament moves backwards, invert that lane's **Gear dir pin** by adding a `!` in front of it (**Pins / TMC → Gear pins**). If the sensor doesn't trigger, you may have a wire break.
   ```
   MMU_SELECT GATE=0
   MMU_TEST_MOVE MOVE=50
   ```
3. **Eject button.** Press the lane's eject button. The filament should be ejected from the lane. If not, you may have a wire break.
4. **LEDs.** Check that the LEDs change as filament is inserted. The eject button LEDs show the gate status, and the LED inside the dry box shows the filament colour (white if you're not using Spoolman). If they don't light, check the power to the LEDs and the in/out order of the LED chain. Run `MMU_LED` to see which effect is set for each LED group.
5. **EMU Sync.**
   - **Dual switches:** Push the two sides of the EMU Sync together. `filament_tension` should show **TRIGGERED**. Pull them apart until the other switch clicks. `filament_compression` should show **TRIGGERED**. If these are the wrong way round, swap the tension and compression pins in `menuconfig` under **Pins / TMC → Sync-feedback Buffer**.
   - **PSF:** Covered in [Calibrate the EMU Sync PSF sensor](#calibrate-the-emu-sync-psf-sensor-psf-only).
6. **First load.** If you're using the PSF, first do Steps 1 and 2 of [Calibrate the EMU Sync PSF sensor](#calibrate-the-emu-sync-psf-sensor-psf-only). The installer's placeholder PSF values can make the first load fail. Then home the printer, load filament to the first lane and run `T0`. The hotend heats up and the lane loads filament to the nozzle. If this is the lane's first load, its bowden length is auto-calibrated first. If the filament crashes into the extruder entry, your bowden length calibration is off. If too much material comes out of the nozzle, your toolhead dimensions are off.

**After you have set up your filament cutter** (tip cutting, see [toolhead cutter setup](/docs/software_setup/02-software-setup.md#toolhead-cutter)):
1. Run `MMU_UNLOAD`. The toolhead should cut the filament and rewind it back to the EMU.
2. If the toolhead fails to cut, the cutter settings aren't right. See the Happy Hare [tip cutting](https://moggieuk.github.io/Happy-Hare-Doc/Macro-Toolhead-Tip-Cutting/) docs.

## Calibrating the unit

The EMU's sensors let Happy Hare calibrate the unit automatically, so **in most setups you don't need to run any calibration commands by hand**:

- **Bowden length** is measured automatically for each lane the first time that lane is loaded. This uses the [extruder homing method](/docs/software_setup/02-software-setup.md#extruder-homing-method) you chose in Step 4.
- **Lane rotation distance** doesn't need calibrating. During printing, the EMU Sync keeps each lane stepper synchronised with the extruder.
- **The EMU Sync PSF sensor** (if fitted) needs a one-off calibration with `MMU_CALIBRATE_PSENSOR`.
- **Toolhead dimensions** come from the toolhead you picked in `menuconfig`, or from your own measurements.

All of the settings below are changed in `menuconfig`. To open it, run `./install.sh -i` from your `Happy-Hare` folder. Save when you're done, and restart Klipper.

### Check the calibration settings

The EMU defaults are under **Other Settings → Calibration/Autotuning** and should look like this:

| Setting | EMU value | What it does |
|---|---|---|
| Auto calibrate bowden length (`autocal_bowden_length`) | `1` | Calibrates each lane's bowden length on its first load |
| Autotune bowden length (`autotune_bowden_length`) | `0` | Keeps the calibrated bowden length fixed. It isn't adjusted over time |
| Don't force rotation distance calibration (`skip_cal_rotation_distance`) | `1` | Uses the default lane rotation distance. The EMU Sync corrects it while printing |
| Autotune rotation distance (`autotune_rotation_distance`) | `0` | Leave it off |

There's no encoder on the EMU, so encoder calibration doesn't apply.

### Calibrate the EMU Sync PSF sensor (PSF only)

Skip this section if you're using the dual-switch EMU Sync. The switches don't need calibrating.

The installer's default PSF values (`analog_max_compression: 1.0`, `analog_max_tension: 0.0`, `analog_neutral_point: 0.5`) are placeholders. **Replace them before the first load.** Happy Hare uses these values to detect the extruder during bowden calibration, so placeholder values can make the first load fail.

**Step 1: Check the sensor and take rough readings.** With the filament unloaded, run:
```
MMU_SENSORS
```
Look at the `filament_proportional` raw value. The EMU Sync rests in the tension position, so with filament unloaded the raw value should be close to 0.

1. Pull the bowden tubes apart to fully expand the EMU Sync (compression), and run `MMU_SENSORS` again. Note the raw value. It should be above ~0.9.
2. Push the tubes together to fully squeeze the EMU Sync (tension), and run `MMU_SENSORS` again. Note the raw value. It should be below ~0.1.

> [!IMPORTANT]
> If the raw value barely changes as you move the EMU Sync, check your wiring. The PSF signal must go to an analog (thermistor) pin.
>
> **If the sensor reads close to 1.0 with filament unloaded**, the magnet is in the wrong way round. Flip the magnet. If you can't flip it, the calibration values below will come out swapped (the high value becomes `analog_max_tension`).

**Step 2: Enter the rough values.** In `menuconfig`, go to **MMU Features / Additions → Buffer config**. Enter the expanded reading as `analog_max_compression` and the squeezed reading as `analog_max_tension`. For `analog_neutral_point`, enter the average of the two. Save and restart Klipper.

**Step 3: Calibrate the sensor.**

1. Load filament from any lane to the toolhead using a Tx command (T0, T1, etc.). This first load also auto-calibrates that lane's bowden length.
2. Run:
   ```
   MMU_CALIBRATE_PSENSOR
   ```
   If you have a long bowden tube with a lot of slack, give it more travel: `MMU_CALIBRATE_PSENSOR MOVE=40`.
3. Enter the three reported values (`analog_max_compression`, `analog_max_tension` and `analog_neutral_point`) in **MMU Features / Additions → Buffer config**. Save and restart Klipper.

The results should look like this:
```ini
analog_max_compression: 0.9435
analog_max_tension:     0.0982
analog_neutral_point:   0.5275
```

> [!IMPORTANT]
> If the calibrated values differ from your Step 1 readings by more than ~0.1, the calibration was probably thrown off by bowden slack or friction in the sensor. Check that the EMU Sync moves freely, then run the calibration again (with `MOVE=40` for long bowdens).

**Step 4: Re-measure the first lane.** The lane you loaded in Step 3 was calibrated using the rough values, so measure it again. Unload it, keep that gate selected, and run `MMU_CALIBRATE_BOWDEN RESET=1`. Its bowden length will be measured again on its next load.

### Bowden length auto-calibration

With `autocal_bowden_length: 1`, the first time you load a lane it feeds filament until the extruder endstop triggers. It then saves that distance as the lane's bowden length. Each lane has its own bowden length, because each lane has a different path to the combiner.

This needs the [extruder homing method](/docs/software_setup/02-software-setup.md#extruder-homing-method) set in Step 4. Bowden auto-calibration won't work if the method is `none`.

> [!IMPORTANT]
> Auto-calibration can take a few minutes per lane, especially when homing with the PSF. To avoid this happening during your first print, load each lane once beforehand using Tx commands (T0, T1, etc.) until every lane has been calibrated.

**Re-calibrating after maintenance:** Anything that changes a lane's bowden length or effective rotation distance needs its bowden length measured again. For example, replacing a bowden tube, re-routing the combiner or refurbishing a lane. With the filament unloaded (parked in the lane), select the lane and reset its value:
```
MMU_SELECT GATE=2
MMU_CALIBRATE_BOWDEN RESET=1
```
The lane is re-calibrated automatically on its next load. To measure it straight away instead, follow [Bowden tube calibration](#bowden-tube-calibration) below.

If you'd rather not rely on the automatic values, or you don't have the required sensors, the calibrations can also be [run manually as described later on this page](#manual-unit-calibration-optional---if-not-satisfied-with-automated-calibrations).

### Toolhead dimensions

Happy Hare also needs your toolhead's dimensions to load and unload accurately. For EMU users there are three ways to get them:

1. **Your toolhead is in the `menuconfig` Toolhead list.** Selecting it pre-fills community-measured values. This is a good starting point.
2. **Your toolhead has a toolhead sensor.** You can measure the values with `MMU_CALIBRATE_TOOLHEAD`. See the Happy Hare [Toolhead calibration](https://moggieuk.github.io/Happy-Hare-Doc/Calibration-Toolhead/) guide.
3. **Measure the values by hand** using the EMU guides:
   - [Manual Sensorless Toolhead Calibration](/docs/software_setup/07-manual-toolhead-calibration.md)
   - [Manual Toolhead Calibration with Two Sensors](/docs/software_setup/08-manual_toolhead_calibration_two_sensors.md)

   With v4, enter the measured values in `menuconfig` under **Toolhead sensors/settings → Toolhead dimensions** rather than editing `mmu_parameters.cfg` directly. Enter the cutter values (`blade_pos`, `retract_length`) under **Macro Variables → Toolhead tip cutting (`_MMU_CUT_TIP`)** as **Blade position** and **Retract length**. This way they aren't overwritten when you next run the installer.

## Manual unit calibration (optional - if not satisfied with automated calibrations)
Both calibrations below work the same way in Happy Hare v4 as they did in v3. Every calibration command also accepts `SAVE=0` to measure and report a value without saving it, and `RESET=1` to clear the saved value for the selected lane. The results are stored in `mmu_vars.cfg`.

### Lane rotation distance calibration
This calibration is optional on the EMU. The EMU Sync corrects the rotation distance while printing (see [Check the calibration settings](#check-the-calibration-settings)). Calibrating each lane still makes the non-synced bowden moves more accurate.

Before you start, remove all bowden tubes from the rear of the dry boxes that go to the combiner. Add a short length of PTFE tubing (50mm is enough) to the first lane's dry box exit. This guides the filament and stops it grinding on the ECAS connector. Then load some filament and follow the steps below to grip it and feed it.

**Step 1:** Select the gate, load filament and move it 200mm (or more) until filament shows at the lane's exit ECAS connector.
```
MMU_SELECT GATE=0
MMU_TEST_MOVE MOVE=200 # run this once or more until filament comes out of the dry box.
```
**Step 2:** Cut the filament poking out of the short PTFE tube flush with the end of the tube. Then run:
```
MMU_TEST_MOVE MOVE=100
```
Cut the filament flush with the PTFE tube again, and measure the piece you cut off. Use that measurement to calibrate the lane's rotation distance:
```
MMU_CALIBRATE_GEAR MEASURED=102.5 #102.5 is an example value and should correspond to the value measured.
```
**Step 3:** Repeat for all lanes:
```
MMU_SELECT GATE=1 # then 2,3,4, etc etc.
MMU_TEST_MOVE MOVE=200 # run this once or more until filament comes out of the dry box.
..... cut the filament at the box ptfe tube exit .....
MMU_TEST_MOVE MOVE=100
MMU_CALIBRATE_GEAR MEASURED=102.5 #102.5 is an example value and should correspond to the value measured.
```

> [!IMPORTANT]
> If you see a big difference between gates, check that your BMG gears are centred with the filament path and that the tension is as close to equal as possible between them.

Rotation distance calibration is now done! `MMU_CALIBRATE_GEAR RESET=1` puts the selected lane back to the default.

> [!NOTE]
> A lane's bowden length depends on its rotation distance. If you re-calibrate a lane's rotation distance, calibrate its bowden length again too.

### Bowden tube calibration
Now remove the short PTFE tube from the rear of the dry box. Connect the combiner and your bowden tube to the EMU Sync, and from there to the toolhead. The last calibration measures the length of bowden tube from each lane's filament parking position to the toolhead. Each lane has a different length, so each one needs to be calibrated separately using the procedure below. The filament must be unloaded (parked in the lane) before you start.

> [!IMPORTANT]
> While calibrating each lane's bowden length, hold the EMU Sync in the tension position by hand (the two tubes pushed towards each other). This is required for the dual-switch EMU Sync, and recommended for the PSF. The calibration measures how much filament the lane feeds before the extruder endstop triggers. If the EMU Sync is left free, its springs can compress or expand unpredictably and give an incorrect result. Holding it in tension also makes the measured bowden length slightly shorter. This helps stop the filament hitting the extruder if the lane rotation distance is slightly off.

```
MMU_SELECT GATE=0
MMU_CALIBRATE_BOWDEN
```
Repeat this for each lane, for example:
```
MMU_SELECT GATE=1 # then 2,3,4, etc etc.
MMU_CALIBRATE_BOWDEN
```
The unit is now fully calibrated and ready to use!

---

← [Step 4: Software Setup](/docs/software_setup/02-software-setup.md) | [Step 6: Slicer Setup →](/docs/software_setup/05-slicer-setup.md)
