# EMU - BOM, Printing, Assembly and Wiring Guide

## Table of Contents
- [BOM](#bom)
- [Print Settings](#print-settings)
  - [Filamentalist components and Lane stepper components](#filamentalist-components-and-lane-stepper-components)
  - [Dry Box components](#dry-box-components)
  - [Base unit components](#base-unit-components)
- [Assembly Videos](#assembly-videos)
  - [Part 1: Filamentalist and Stepper Assembly Guide](#part-1-filamentalist-and-stepper-assembly-guide)
  - [Part 2: Drybox Assembly Guide](#part-2-drybox-assembly-guide)
  - [Part 3: Base Assembly Guide](#part-3-base-assembly-guide)
  - [Part 4: Electronics Assembly Guide](#part-3-base-assembly-guide)
  - [Part 5: EMU Sync Assembly images](#part-5-emu-sync-assembly-images)
- [Wiring Instructions and Diagrams](#wiring-instructions-and-diagrams)

<p align="center">
  <img src="/docs/assets/images/EMU_multi_lane_unit.png" width="100%">
</p>

## BOM  
The EMU Bill of Materials can be found here: [Draft BOM](https://docs.google.com/spreadsheets/d/1jYJXBgpc_iLDfC17fC2LTYKrSEy5ocPbGEQ_EEOGCvI)

## Print Settings

### Filamentalist components and Lane stepper components:
The below print settings are recommended for the filamentalist and lane stepper components. These are structural parts hence require print settings optimised for strength:
- 0.2 mm layer height
- 0.2 mm first layer height
- 4 walls
- 40% infill
- 0.4mm extrusion width (line width) throughout
- Gyroid sparse infill is recommended as it tends to warp less
- Inner Outer wall ordering, to ensure overhangs and supported areas do not sag
- Arachne wall generator
- One wall top and bottom surfaces (optional but recommended - parts look nicer)
- Disable thick bridges
- Z hop enabled to avoid nozzle scraping (0.2 is sufficient)

> [!IMPORTANT]
> **Parts are not shrinkage compensated** - calibrate your filament shrinkage first! If the bearings are loose, you're either under extruding, or over compensating for shrinkage.<br/>
> **Disable thick bridges** in your slicer and make sure your flow rate (EM) is on point! **Over extrusion, thick bridges and insufficient cooling will cause your sensor magnets and bearings not to fit as the bridges will sag.**

**For the TPU filamentalist CDR ring:**
- 0.2 mm layer height
- 0.2 mm first layer height
- 0.4mm extrusion width (line width) throughout
- 6 walls, so that the object is printed solid
- Avoid crossing walls enabled
- Random seam. This is important to avoid an aligned seam bump
- Inner Outer wall ordering, to ensure overhangs and supported areas do not sag
- Z Hop turned off to reduce stringing
  
> [!IMPORTANT]
> Printing TPU can be a challenge - print by object and a slight negative (-0.1) extra length on retract can help reduce stringing.

### Dry Box components:
The below print settings are recommended for the dry boxes and the desiccant holder. The dry boxes need to be as air tight as possible, hence the recommended print settings below are tuned to achieve this while keeping filament use under control.
- 0.2 mm layer height
- 0.2 mm first layer height
- 3 walls
- 15% infill
- For the lid specifically, use 4 walls and 30% infill to ensure strength in the front lip.
- 0.4mm extrusion width (line width) throughout
- Gyroid sparse infill is recommended as it tends to warp less
- Inner Outer wall ordering, to ensure dry box hatch features print with minimal sagging.
- Arachne wall generator
- One wall top and bottom surfaces (optional but recommended - parts look nicer)
- Disable thick bridges
- Z hop enabled to avoid nozzle scraping (0.2 is sufficient)

> [!IMPORTANT]
> Print with **extra first layer squish, use an adhesion promoter on the bed and in a pre-heated chamber with low fan** to prevent warping and ensure better layer adhesion. Mouse ears on the box corners may be required. Slight lifting will not impact part function.<br/>
> **Do not use mouse ears on the lid** as the slicer wrongly fills in the aesthetic lines.<br/>
> **Over extrude (only) the box and lid by ~2% (0.02)** to ensure air tightness. Increase your slicer flow multiplier (EM) by 0.02.

### Base unit components:
The below print settings are recommended for the base units and their accessories. 
- 0.2 mm layer height
- 0.2 mm first layer height
- 3 walls
- 15% infill
- 0.4mm extrusion width (line width) throughout
- Gyroid sparse infill is recommended as it tends to warp less
- Inner Outer Inner wall ordering to improve visual appearance
- Arachne wall generator
- One wall top and bottom surfaces (optional but recommended - parts look nicer)
- Disable thick bridges
- Z hop enabled to avoid nozzle scraping (0.2 is sufficient)
- For the **Eject button lens, 99 walls are recommended,** to reduce possibility of infill shining through the natural ABS

> [!IMPORTANT]
> Print with **extra first layer squish, use an adhesion promoter on the bed and in a pre-heated chamber with low fan** to prevent warping. Slight lifting will not impact part function.

> [!NOTE]
> **Paint on fuzzy skin** on the outer walls of the base unit will improve appearance.<br/>
> Paint on ONLY, not full model fuzzy skin. <br/>
> 0.1 distance, 0.1 or 0.2mm depth. Displacement method (orca slicer)

## Assembly Videos

### Part 1: Filamentalist and Stepper Assembly Guide
[![EMU Filamentalist and Stepper Assembly Guide](https://img.youtube.com/vi/FNcXC9HXUmI/0.jpg)](https://www.youtube.com/watch?v=FNcXC9HXUmI)
<br/>
**Errata:**
1. BMG Gear insertion is not visible in the video. Do this before adding the stepper main body and screwing it on.
2. Switch sensor screws are M2x10 self taping or m2x8 bhcs/shcs
3. Filament path - BMG gear alignment step is not shown in the video. Insert some filament through the unit manually, loosen the BMG gear set screw and move it back and forth. Screw down the BMG gear.
4. For the BMG tensioning arm, the bushing is no longer an option. 
5. Add a washer to the stepper tensioning arm on both sides of the spring.
6. Stepper body screws are all M3x20

### Part 2: Drybox Assembly Guide
[![EMU Dry Box Assembly Guide](https://img.youtube.com/vi/JZzMyOBCdSM/0.jpg)](https://www.youtube.com/watch?v=JZzMyOBCdSM)
<br/>

**Errata:**
1. A threaded stand off is inserted in the front lip of the lid and secured from either side with M3x40 FHCS bolts.
2. Box and wiring hatch changes - the wiring hatch now is screwed in from the outside of the unit. Push through the hole from the inside out and then screw in place.
3. Wiring hatch foam is now glued on the box itself. The foam chord channel is on the outside of the box. 
4. The BME sensor has been relocated to the LED cover.

### Part 3: Base Assembly Guide
[![EMU Base Assembly Guide](https://img.youtube.com/vi/2SmAMuXas38/0.jpg)](https://www.youtube.com/watch?v=2SmAMuXas38)
<br/>

### Part 4: Electronics Assembly Guide
[![EMU Elecrronics Assembly Guide](https://img.youtube.com/vi/Iang2JYkTh8/0.jpg)](https://www.youtube.com/watch?v=Iang2JYkTh8)
<br/>

**Errata:**
1. Base unit top clamping screws (M3x8 FHCS) now screw into heatset inserts inserted on the other side of the frame.
2. External combiner sensor is no longer specified in the default setup. That wiring part can be omitted.
3. Encoder is no longer specified in the default setup. That wiring part can be omitted.

### Part 5: EMU Sync Assembly images
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a6ed3cc1-94bc-4ced-ba34-3ada3b6d1ab7" alt="Step 1" title="Step 1" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/d3149cf1-f560-41a3-a0df-14186119fd8c" alt="Step 2" title="Step 2" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/082b3623-a154-4694-bea5-f0d3bacd42ce" alt="Step 3" title="Step 3" width="260"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f69eb6d1-7551-43fa-bf63-bef8f88a4b4e" alt="Step 4" title="Step 4" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/9446431d-ec45-4a40-9f84-90bec7771a69" alt="Step 5" title="Step 5" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/b8387c21-7a64-45e5-a4e4-22349f332325" alt="Step 6" title="Step 6" width="260"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/647e8999-7d55-4544-b1c8-61a09ac85993" alt="Step 7" title="Step 7" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/88401b0d-2823-4eea-afb0-aed03d34f71f" alt="Step 8" title="Step 8" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/a8add605-8989-4c88-9c0b-201614890c5b" alt="Step 9" title="Step 9" width="260"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/74f27a82-6c06-4229-b128-bb8074d70efe" alt="Step 10" title="Step 10" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/f8df4ac3-6fc5-4a27-a4a9-10f9019631a6" alt="Step 11" title="Step 11" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/df0cf87b-0db0-4988-ba6a-75a16d724592" alt="Step 12" title="Step 12" width="260"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9c6053eb-bc29-4636-bdd3-927f1290f9cd" alt="Step 13" title="Step 13" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/5f7a9d4a-76ad-45ba-a63f-ca94b55183c7" alt="Step 14" title="Step 14" width="260"/></td>
    <td><img src="https://github.com/user-attachments/assets/f0e292be-39b0-4fcc-955d-34bc72faa14d" alt="Step 15" title="Step 15" width="260"/></td>
  </tr>
</table>

### Combiner:
Make sure the PTFE tube is pushed all the way inside the combiner. Not just at the ecas entry!

<img width="717" height="1073" alt="image" src="https://github.com/user-attachments/assets/f6e5625f-79d0-4c14-8d80-2ed4bd63bbb4" />



## Wiring Instructions and Diagrams
Depending on the number of lanes assembled, the wiring will vary slightly. Below are some initial wiring key notes to get your started.<br/>

**Multi-lane setup wiring notes (2+ lanes)**
1. Please note that the sync feedback sensor is connected to the first lane board. The encoder and combiner endstop is connected to the second lane EBB board.
2. The CAN bus umbilical from the printer feeds power and the CAN H / L wires to the WAGO connectors in the first lane. 
3. A 24V and Ground "bus" is established throughout the base unit using the two rearward WAGO connectors (WAGO 3 and WAGO 4).
4. The EBB boards connect to the power bus for power via their XT ports.
5. The EBB boards are daisy chained to establish the CANbus network. The first lane canbus High / Low / Power wires are connected to the first lane WAGO connectors.
7. The second lane canbus High / Low wires are connected to the CAN out dupont connectors on the first board itself. Creates the daisy chain
9. The last EBB board needs the 120Ohm resistor installed.
10. The second lane, third lane etc 2nd WAGO connector is used to connect the Neopixel Out wire from the eject button to the Neopixel In wire on the dry box.
11. The second lane, third lane etc 1st WAGO connector is used to connect the Neopixel Out wire from the dry box to the next lane Neopixel In wire on the eject button.

**Adding a second base unit** <br/>
You can daisy chain as many base units as you desire. Simply wire the XT30+2 CAN out port next to the last lane to the power bus and CAN H / L dupont connectors on the last EBB board. The next base unit can connect using a standard CAN Bus cable to the first unit.


**Single-lane setup wiring notes (2+ lanes)** <br/>
1. A single lane setup does not support an encoder/combiner. Instead, the Post Extruder sensor is configured in the Happy Hare configuration as the gate sensor.
2. There is no daisy chaining required. The single EBB board is connected to the first lane WAGO connectors.
3. There is no daisy chaining of subsequent lane Neopixels. 

**EBB 42 wiring diagram**<br/>
<p align="center">
  <img src="/docs/assets/wiring_diagrams/EMU_wiring_ebb42.png" width="95%">
</p>

**EBB 36 wiring diagram**<br/>
Please note, the EBB36 uses identical pin definitions to the EBB42.
<p align="center">
  <img src="/docs/assets/wiring_diagrams/EMU_wiring_ebb36.png" width="95%">
</p>

**Printer PSU**<br/>
> [!WARNING]
> You need to evaluate whether your PSU has enough power headroom to operate the number of lanes of your choosing. This entirely depends on your printer's overall setup and how many lanes of the EMU you are planning to build.

Key factors to consider:
1. PSU wattage
2. How many A-B/X-Y and Z steppers 
3. At what current the main printer steppers are operating at 
4. Your heater cartridge wattage 
5. What other power consuming accessories are connected to the printer (cpap, heater bed if 24V etc)
6. How many EMU lanes you are planning to build

Depending on the combined power consumption, you may need to consider whether a PSU upgrade is needed. 

As a rule of thumb, a 12 lane EMU build with 4 Z steppers and 2 AB steppers running moderately high currents and high print speeds on a Voron 2.4 may require a 350Watt power supply to ensure adequate power headroom.
