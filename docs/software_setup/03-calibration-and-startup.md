# Calibration and startup guide

This page contains the software calibration and first start up instructions. This guide is meant to be read in conjunction with the Happy Hare setup guide as found here: https://github.com/moggieuk/Happy-Hare/wiki

## Table of Contents

- [Calibrating the unit](#calibrating-the-unit)
- [First start up](#first-start-up)
- [Manual unit calibration (optional)](#manual-unit-calibration)
  - [Lane rotation distance calibration](#lane-rotation-distance-calibration)
  - [Bowden tube calibration](#bowden-tube-calibration)


## Calibrating the unit

The Happy Hare software together with the advanced sensors the EMU utilises, enable a number of auto-calibration features that simplify initial start up. In short, these features **remove the need for any calibration of the unit**.

To enable the auto calibration routines set the below parameters in the mmu_parameters.cfg file:
```
autocal_bowden_length: 1 # on first load of a newly installed lane, the software will automatically calibrate its bowden length.
skip_cal_rotation_distance: 1 # skips the lane stepper rotation distance calibration and relies on EMU Sync to coordinate the RD distances of the extruder and lane steppers
```
The above auto calibration has the below pre-requisites:
1. You are using a **toolhead with an entry sensor**, ie a switch based sensor is present before the extruder and you have enabled `extruder_homing_endstop: extruder` in mmu_parameters.cfg
2. **OR** you are using the **EMU Sync with dual switches** and you have enabled `extruder_homing_endstop: filament_compression` in mmu_parameters.cfg
3. **OR** you are using the **EMU Sync with PSF** and [the newly developed code here](https://github.com/moggieuk/Happy-Hare/pull/936) and you have enabled `extruder_homing_endstop: proportional` in mmu_parameters.cfg

If you are not satisfied with the automatically calibrated values, the above calibrations can also be executed manually. This page describes that manual calibration process.

## First start up
Follow the below first start up procedure to validate correct wiring of the EMU.

1. Load filament to each gate. The filament should be parked right before the post stepper sensor. In the UI, verify that the MMU Pre Gate sensor for the lane is marked as **detected** and the MMU Gear sensor for the lane is marked as **empty**. If not, you have them wired backwards. Swap their position in the mmu_hardware.cfg file.
2. Run the MMU_TEST_MOVE MOVE=50 command. Verify that the MMU Gear sensor for the lane is marked as **detected**. If not, you may have a wire break in the system.
3. Press the eject button. The filament should now be ejected from the unit. If not, you may have a wire break in the system.
4. Verify that the LEDs change color as the filament is inserted. From off to white for the eject button and off to white (if not using spoolman) for the led inside the box. If not, you may have either a power issue to the LED's or the in-out wiring sequence in the LED chain is wrong.
5. Validate your sync feedback sensor wiring. Bring the two sides of the bowden tube together. The tension switch should be showing as **detected** in the UI. Move the two sides of the bowden tube away from each other till the switch clicks. The compression switch should be showing as **detected** in the UI. If not, you have them wired backwards. Swap their position in the mmu_hardware.cfg file.
6. Home the printer, load filament to the first lane and type T0. The hotend should heat up to 230C and load filament to the toolhead. If the filament crashes to the extruder entry, your bowden distance calibration is off. If there is excessive material coming out of the nozzle, the toolhead calibration is off.

**After you have setup your Cut Tip macro** parameters:
1. Type MMU_UNLOAD. The toolhead should cut the filament and rewind to the EMU.
2. If the toolhead fails to cut, the cut tip macro is not configured correctly

## Manual unit calibration
### Lane rotation distance calibration
Before you start with this calibration, remove all bowden tubes from the rear of the dry boxes going to the combiner. Add a short length of PTFE tubing (50mm is enough) to the first lane dry box exit. This will help guide the filament and not grind on the ecas connector. Then proceed to load some filament and execute the below instructions to grip it and feed it.

**Step 1:** Select the gate, load filament and move 200mm (or more) till the filament is showing from the unit exit ECAS connector.
```
MMU_SELECT GATE=0
MMU_TEST_MOVE MOVE=200 # run this once or more till you get filament out from the dry box.
```
**Step 2:** Cut the end of the filament poking out from the short ptfe tube attached to the dry box flush with the ptfe tube. Run the below command:
```
MMU_TEST_MOVE MOVE=100
```
Cut the filament again flush with the ptfe tube attached to the dry box. Measure it. Now use the below command to calibrate the rotation distance of the box.
```
MMU_CALIBRATE_GEAR MEASURED=102.5 #102.5 is an example value and should correspond to the value measured.
```
**Step 3:** Repeat for all lanes
```
MMU_SELECT GATE=1 # then 2,3,4, etc etc.
MMU_TEST_MOVE MOVE=200 # run this once or more till you get filament out from the dry box.
..... cut the filament at the box ptfe tube exit .....
MMU_TEST_MOVE MOVE=100
MMU_CALIBRATE_GEAR MEASURED=102.5 #102.5 is an example value and should correspond to the value measured.
```

> [!IMPORTANT]
> If you observe significant variation between gates, double check that your BMG gears are centred with the filament path and that the tension is approximately as equal as possible between them.

Rotation distance calibration is now done! 

### Bowden tube calibration
Now remove the short PTFE tube from the rear of the dry box and connect the combiner and your bowden tube to the EMU Sync and from there to the toolhead. The final calibration is to measure the length of bowden tube from the lane filament parking location to the toolhead. These will be different for each lane, hence these need to be individually calibrated following the procedure below.

> [!IMPORTANT]
> **IMPORTANT:** When calibrating bowden length for each lane, it is mandatory to keep the EMUSync manually held in the tension position, ie the two tubes brought towards each other. Why? The bowden calibration measures how much filament the lane feeds till the toolhead entry sensor is triggered. If the EMU Sync is left free, the springs can unpredictably compress/expand resulting in incorrect calibration. In addition, holding the EMU Sync in tension means the bowden length is slightly shorter. This helps avoid scenarios where the filament hits against the extruder if the lane rotation distance is slightly off.

```
MMU_SELECT GATE=0
MMU_CALIBRATE_BOWDEN
```
Repeat this for each lane, for example:
```
MMU_SELECT GATE=1 # then 2,3,4, etc etc.
MMU_CALIBRATE_BOWDEN
```
The unit calibration is now done and the unit is ready to be used!




