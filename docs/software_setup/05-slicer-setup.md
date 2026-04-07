# Slicer Setup and Optimisation for Multi Color Prints

Orca slicer is the recommended slicer for the EMU. This section will take you through a set of mandatory and recommended settings to help you achieve the best results possible from your EMU. It assumes that you are using a toolhead equipped with a cutter. Therefore all tip forming activity in the slicer will be disabled.

<p align="center">
  <img src="https://github.com/user-attachments/assets/6816fb75-d5b3-4e73-a9d2-ad93d89a7320" alt="1 (4)" width="24%"/>
  <img src="https://github.com/user-attachments/assets/c2ceb995-0c45-45b8-80a1-4ba22bdbc27e" alt="1 (5)" width="24%"/>
  <img src="https://github.com/user-attachments/assets/490c0b1e-656f-4c81-82c8-666672659762" alt="1 (2)" width="24%"/>
  <img src="https://github.com/user-attachments/assets/d3fef867-5b20-4a57-a406-df7a284d2550" alt="1 (3)" width="24%"/>
</p>

## Table of Contents

- [Orca slicer mandatory setup](#orca-slicer-mandatory-setup)
  - [Machine G-Code setup](#machine-g-code-setup)
    - [Machine Start G-code](#machine-start-g-code)
    - [Machine End G-code](#machine-end-g-code)
    - [Layer change G-code](#layer-change-g-code)
    - [Change Filament G-code](#change-filament-g-code)
  - [Multi Material setup](#multi-material-setup)
  - [Extruder setup](#extruder-setup)
  - [Filament selection](#filament-selection)
- [Orca slicer profile tuning for multi-color printing](#orca-slicer-profile-tuning-for-multi-color-printing)
  - [Reducing color bleed](#reducing-color-bleed)
    - [Maximise the time spent printing hidden features before moving to the outer wall](#maximise-the-time-spent-printing-hidden-features-before-moving-to-the-outer-wall)
    - [Disable flush into objects' infill and support](#disable-flush-into-objects-infill-and-support)
    - [Use 3 (or more) walls](#use-3-or-more-walls)
    - [Use the blobifier](#use-the-blobifier)
    - [Tune your purge multiplier](#tune-your-purge-multiplier)
    - [Increase your variable_retract_length (mmu_macro_vars.cfg)](#increase-your-variable_retract_length-mmu_macro_varscfg)
  - [Optimising Print Quality](#optimising-print-quality)
    - [Speed settings](#speed-settings)
    - [Quality settings](#quality-settings)


## Orca slicer mandatory setup

### Machine G-Code setup
#### Machine Start G-code:
The Orca Slicer print start gcode is required to be amended to include the below additions. 
```
MMU_START_SETUP INITIAL_TOOL={initial_tool} TOTAL_TOOLCHANGES=!total_toolchanges! REFERENCED_TOOLS=!referenced_tools! TOOL_COLORS=!colors! TOOL_TEMPS=!temperatures! TOOL_MATERIALS=!materials! FILAMENT_NAMES=!filament_names! PURGE_VOLUMES=!purge_volumes!
MMU_START_CHECK
PRINT_START HOTEND=[nozzle_temperature_initial_layer] BED=[bed_temperature_initial_layer_single] CHAMBER=[chamber_temperature]
MMU_START_LOAD_INITIAL_TOOL
SET_PRINT_STATS_INFO TOTAL_LAYER={total_layer_count} ; For pause at layer functionality and better print stats
```
> [!WARNING]
> Replace the print start line with your existing print start command!

#### Machine End G-code:
The Orca Slicer print end gcode is required to be amended to include the below additions. 
```
MMU_END
PRINT_END ; your existing print end macro
```
> [!WARNING]
> Replace the print end line with your existing print end command!

#### Layer change G-code
**After Layer change:**</br>
```
; ... your existing layer change G-code...
SET_PRINT_STATS_INFO CURRENT_LAYER={layer_num + 1}
_MMU_UPDATE_HEIGHT
```

#### Change Filament G-code
If using a purge block set up:
```
T[next_extruder]
```
If you have the blobifier add-on set up, add the below change filament g-code. This will enable purge volume reporting in the slicer. Also the retraction command is necessary to avoid double de-retracting and oozing on the prime tower.
```
T[next_extruder]
G1 E-{old_retract_length} F3000
; FLUSH_START
; EXTERNAL_PURGE {flush_length}
; FLUSH_END
```

### Multi Material setup
Ensure that in the Multi Material tab, the below settings are set up:
1. Single Extruder Multi Material = selected
2. Extruders = 1
3. Manual Filament Change = de-selected
4. Purge in prime tower = selected. Deselect only if using the blobifier or similar purging system
5. Enable filament ramming = de-selected
6. Single extruder multi-material parameters - all set to 0 and high extruder current on filament swap = de-selected
7. Set up the advanced section with the approximate filament swap times - you can get these by typing MMU_STATS in the printer console after you have successfully ran a few multi-color prints

**No blobifier:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/cebbe1c7-d192-4a5f-9df0-6bdd913ec8eb" width="80%">
</p>

**With the blobifier:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/67209c5e-1114-4dbe-afe1-e98adfd7bd88" width="80%">
</p>

### Extruder setup
Ensure that in the Extruder tab, the below settings are set up:
1. Retraction when switching material = 0

<p align="center">
  <img src="https://github.com/user-attachments/assets/15201179-3bc9-4df5-9197-f33bd2f0d86c" width="80%">
</p>

### Filament selection
Using the (+) button, add as many filaments as available lanes in your EMU. 

<p align="center">
  <img src="https://github.com/user-attachments/assets/4b1711ce-7990-44f8-973c-2ef1763e33d0" width="50%">
</p>

## Orca slicer profile tuning for multi-color printing

### Reducing color bleed
One of the biggest downsides to multi-color printing with a single nozzle is **the potential for color bleed**. This is usually the case when:
1. When swapping from **high saturation colors (red, black) to white**
2. Combined with **too low of a purge volume**
3. And using a **long meltzone hotend**

This happens due to the **molten material sticking to the hotend melt zone** and requiring disproportional amount of filament to "disrupt" that boundary layer and flush the color through. This is made worse by the fact that **filament flows in a laminar way**, hence there is little to no "turbulence" in the hotend to disrupt that layer.. 

Ways to mitigate include:
1. Use a regular flow (not a CHT) nozzle. The extra filament channels multiply the surface area that the boundary layer can be created against
2. Use a small meltzone nozzle. For multi-color printing, the vast majority of print time is spent swapping filaments and purging. Hence a lower flow hotend will not impact overall print speed by a significant factor

In addition to the above physical changes, the **below slicer settings can help** contain the color bleed

#### Maximise the time spend printing hidden features before moving to the outer wall
1. Enable Inner Outer Inner wall ordering mode.
2. Enable print infill first.
Printing **infill first results in the printer spending more time printing inside the model** before transitioning to the visible surfaces of the model (outer wall). It, therefore, increases the amount of filament extruded before the outer walls are printed and the probability that the outer walls will not show color bleed. **Inner Outer Inner wall ordering hides the resulting artefacts** from printing infill first.

For comparison, outer inner wall ordering mode must be avoided as it will print the external facing walls first, immediately after a color change!

<p align="center">
  <img src="https://github.com/user-attachments/assets/70c9c6c0-30ad-4c9d-82e4-a267d61823ea" width="50%">
</p>

#### Disable flush into objects' infill and support
Similarly to the point above, disabling these settings ensures that **your defined purge volume is spent outside the model**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/f3c6f5c6-3268-4bba-a54b-7d855ec12663" width="50%">
</p>

#### Use 3 (or more) walls
As above, the more walls printed before the outer perimeter, the higher the chance that the external walls are printed without color bleed.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0a83f7ee-654e-4dba-9126-5d7ea9cbdb4d" width="50%">
</p>

#### Use the blobifier
The blobifier algorithm **executes purging with varying speeds**, which helps **disrupt the laminar flow** of the filament against the walls. If your printer can accomodate the blobifier setup, it is strongly recommended that you set it up.

<p align="center">
  <img src="https://github.com/user-attachments/assets/7b13837f-a33a-4653-87f4-1fb03df35b98" width="80%">
</p>

In the picture above, you can see the no color bleed transition between white and black on the same layer. In addition you can observe the "ripples" created on the purge blobs due to the blobifier varying the purge speed and retracting and de-retracting during the purge, to flush out the filament from the nozzle.

> [!NOTE]
> If you are using the blobifier **do not disable the prime tower**. The prime tower will not be used to "purge" filament, rather **re-prime the nozzle**, clear out any air bubbles in the hotend that may have occured during the purge process and equalize nozzle pressure before resuming printing on the model. <br/>
> Set the prime volume to be equal to your meltzone volume **(meltzone length in mm * 2.4)**

<p align="center">
  <img src="https://github.com/user-attachments/assets/2a07299d-2701-427b-afe2-3da49313cb9a" width="50%">
</p>

#### Tune your purge multiplier
Reducing the purge multiplier to 0.8-0.7 will indeed save some purge material; however more likely than not (unless you are using a particularly small meltzone hotend) it will result in color bleed. Now depending on how clean you want your prints to look, a purge multiplier of 1.2-1.25 (or more) is not unusual.

<p align="center">
  <img src="https://github.com/user-attachments/assets/89101670-cedd-4164-9333-f59f4990fc72" width="50%">
</p>

> [!NOTE]
> Make sure your **nozzle volume is accurately set in the slicer** settings!

<p align="center">
  <img src="https://github.com/user-attachments/assets/ccd1f3a0-1f82-4a1e-b277-c5544ebe2b2e" width="50%">
</p>

#### Increase your variable_retract_length (mmu_macro_vars.cfg)
Reducing the amount of left over filament in the hotend can help reduce slightly the amount of material needing to be purged. I**ncreasing the variable_retract_length value to be ~5-10mm less than the variable_blade_pos** is recommended. 

> [!IMPORTANT]
> Make sure you **enable variable_simple_tip_forming**. It reduces the probability of clogs at the hotend when performing large retractions!<br/>
> Also make sure your variable_pushback_length plus toolhead_ooze_reduction is a mm or two less than your variable_retract_length.<br/>
> <br/>
> If you get persistent clogging with the above mitigations enabled, reduce your variable retract length until it stops. Proportionally also reduce the push back length (even though too large values there will be ignored, however update for configuration correctness)

### Optimising Print Quality
As the vast majority of the time during multi-color printing is spent in tool swapping, you can afford to set conservative print settings which can materially improve the produced output with very little time tradeoff.

The below are my preferred settings for multi-color printing.

**Speed settings:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/3cc166fe-7215-48d8-b702-3d2d00332fa6" alt="1 (4)" width="40%"/>
  <img src="https://github.com/user-attachments/assets/91e6fd06-8e0c-4ed6-ba9a-65b199ebc306" alt="1 (5)" width="40%"/>
</p>

**Quality settings:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/8f891e46-6496-40f6-9f4f-9d0c39c69208" alt="1 (4)" width="27%"/>
  <img src="https://github.com/user-attachments/assets/c00fa686-5b87-4c60-8df4-56440ac92404" alt="1 (5)" width="27%"/>
  <img src="https://github.com/user-attachments/assets/70fa07fd-4f7a-4e46-98f5-a3c245e9162a" alt="1 (5)" width="27%"/>
</p>

---

← [Step 5: Calibration and Startup](/docs/software_setup/03-calibration-and-startup.md) | [Documentation Hub →](/docs)
