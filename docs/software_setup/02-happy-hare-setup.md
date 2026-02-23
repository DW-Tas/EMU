# Happy Hare Setup Guide

This is a provisional sofware setup guide for the EMU using Happy Hare v3. This guide is meant to be read in conjunction with the Happy Hare setup guide as found here: https://github.com/moggieuk/Happy-Hare/wiki

## Table of Contents

- [Installing Happy Hare](#installing-happy-hare)
- [Configuring the EMU hardware](#configuring-the-emu-hardware)
- [Configuring Happy Hare parameters](#configuring-happy-hare-parameters)
- [Configuring PSF and Flowguard](#configuring-psf-and-flowguard)
- [EMUSync PSF insights](#emusync-psf-insights)

## Installing Happy Hare
Install Happy Hare. More detailed instructions can be found here: https://github.com/moggieuk/Happy-Hare/wiki/Installation
```
cd ~
git clone https://github.com/moggieuk/Happy-Hare.git
cd ~/Happy-Hare
./install.sh -i
```
**Select MMU:** Pick option 16 - Other/Custom. <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7a0875fe-fc19-4172-8f1c-deb0e7f4bb1c" alt="Installer screen: Pick option 16 - Other/Custom" width="80%">
</p>

**Select MMU type:** Pick option 7 - Type-B (multiple filament drive steppers) with individual post-gear sensors, No Encoder <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/d1ddd2f6-689f-45ee-a54c-eb8dbc09bf76" alt="Installer screen: Pick option 7 - Type-B with individual post-gear sensors, no encoder" width="80%">
</p>

**Select lane number:** Type the number of lanes you have set up. In my example below it is 8. <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/cc2bfdec-5ab5-4715-9762-552189d4da7f" alt="Enter number of lanes (example: 8)" width="80%">
</p>

**Select the board used:** Pick option 15 - Not in list / Unknown <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/23d291e3-ea6b-45d7-888f-879e93633102" alt="Select board: option 15 Not in list / Unknown" width="80%">
</p>

**LED Support:** Enable LED support <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b77bf49f-08e1-41dd-a3e1-17870d80b37b" alt="Enable LED support" width="80%">
</p>

**Endless Spool Support:** Enable Endless Spool support <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b967c996-0aa4-4c02-9de8-6f7dc08fde91" alt="Enable Endless Spool support" width="80%">
</p>

**Include all the MMU config files:** Include all mmu config files in the printer.cfg <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/e1668ab6-4c4b-4392-bc74-ed01228eb570" alt="Include MMU config files in printer.cfg" width="80%">
</p>

**(Optional) Mini 12864 screen support:** If you have a Mini 12864 screen, enabe the Happy Hare screen menu <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/83d4cb41-0651-4f1d-aebf-6e1c41ed148a" alt="Enable Happy Hare menu for Mini 12864 (optional)" width="80%">
</p>

**Default pause/resume macros:** Include the default pause/resume macros from Happy Hare. Once the installation is complete, make sure you disable/remove any custom pause/resume macros that you may have in your existing Klipper installation! <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4141828a-493c-4bae-92ce-3db9b4941633" alt="Include default pause/resume macros from Happy Hare" width="80%">
</p>

**EREC support:** Decline the installation of the EREC filament cutter <br/><br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7f0d3412-4ee3-42e5-bbed-569f64db7d8a" alt="Decline EREC filament cutter installation" width="80%">
</p>

**Moonraker.conf update:** Make sure your moonraker.conf contains [mmu_server] (should be inserted by HappyHare setup). Update it as per the below if it doesn't match:
```
[file_manager]
enable_object_processing: True

[mmu_server]
enable_file_preprocessor: True
enable_toolchange_next_pos: True
update_spoolman_location: True
```
![image](https://github.com/user-attachments/assets/ac85bba6-3346-47cf-b396-6b29552069f5)
<br/><br/>
Baseline setup is now complete!
<br/><br/>
## Configuring the EMU hardware

### Update mmu/base/mmu.cfg
The Happy hare installer generates a generic mmu.cfg file that needs re-writing for the EMU. 

**Step 1: Clear the mmu.cfg file.** <br/><br/>
Start by completely deleting the content of that file and hitting save.

**Step 2: Update mmu.cfg with the EMU mcu boards definitions** <br/><br/>
For each lane you will need one distinct mcu mmu block defining the board name and the canbus UUID as noted earlier. In the example below I am using an 8 lane configuration. For a two lane setup, for example, you'd use `[mcu mmu0]` and `[mcu mmu1]` only.
```
[mcu mmu0]
canbus_uuid: your uuid 
canbus_interface: can0 # if you have multiple canbus buses, define here which canbus has the EMU units on it.

[mcu mmu1]
canbus_uuid: your uuid  
canbus_interface: can0

[mcu mmu2]
canbus_uuid: your uuid  
canbus_interface: can0

[mcu mmu3]
canbus_uuid: your uuid  
canbus_interface: can0

[mcu mmu4]
canbus_uuid: your uuid 
canbus_interface: can0

[mcu mmu5]
canbus_uuid: your uuid 
canbus_interface: can0

[mcu mmu6]
canbus_uuid: your uuid 
canbus_interface: can0

[mcu mmu7]
canbus_uuid: your uuid  
canbus_interface: can0
```

**Step 3: Update mmu.cfg with the EMU mcu board pin aliases** <br/><br/>
After the board definitions, insert the board pin aliases. 

> [!IMPORTANT]
> **Important note:** The first board defines the aliases for the tension and compression sensor too, so it is different to the rest. In the example below I am using an 8 lane configuration. Remove the corresponding `mmuN` reference from the mcu line to match the number of lanes you have (eg. `mcu: mmu0, mmu1` for a two lane setup).
```
[board_pins mmu]
mcu: mmu0, mmu1, mmu2, mmu3, mmu4, mmu5, mmu6, mmu7
aliases:
    MMU_GEAR_UART=PA15,
    MMU_GEAR_STEP=PD0,
    MMU_GEAR_DIR=PD1,
    MMU_GEAR_ENABLE=PD2,
    MMU_GEAR_DIAG=,

    MMU_NEOPIXEL=PD3,
    MMU_NEOPIXEL_LOGO=,

    MMU_PRE_GATE=PB7,
    MMU_POST_GEAR=PB5,

    MMU_TENSION=PB8,
    MMU_COMPRESSION=PB9,

    MMU_TH=PA3,

    MMU_FAN=PA0,

    EJECT_BUTTON=PB6,
```
This file is now complete! 


### Update mmu/base/mmu_hardware.cfg

**Step 1: Clear the mmu_hardware.cfg file.** <br/><br/>
Start by completely deleting the content of that file and hitting save.

**Step 2: Paste the below configuration in the mmu_hardware.cfg file**<br/><br/>
The below starter setup is for an 8 lane unit. To set up a lower lane count, paste the complete content below and change the below:
1. **num_gates: 8 -> to equal to the number of lanes you have**
2. **Delete the unecessary tmc and stepper blocks**. For example if you have a 5 lane unit, delete `[tmc2209 stepper_mmu_gear_5]`, `[tmc2209 stepper_mmu_gear_6]`, `[tmc2209 stepper_mmu_gear_7]` blocks from the below.
3. **Delete the uncesessary pre_gate_switch_pin lines and post_gear_switch_pin lines**. For example for a 5 lane setup, remove `pre_gate_switch_pin_5`, `pre_gate_switch_pin_6`, `pre_gate_switch_pin_7`, `post_gear_switch_pin_5`, `post_gear_switch_pin_6`, `post_gear_switch_pin_7`
4. **Delete the uncesessary LED blocks**: add or remove `[neopixel mmuN_leds]` to match your number of lanes
5. ***Delete the uncesessary LED effect exit leds**: Add / remove `neopixel:mmuN_leds (2)` and `neopixel:mmuN_leds (1)` from the corresponding entry and exit sections in the `[mmu_leds unit0]` block.

If you have more than 8 lanes, insert accordingly additional blocks, following the patterns illustrated in the full configuration file below.

> [!TIP]
> If during testing you see that the EMU stepper spins backwards, invert the dir_pin by adding a ! infront of it (!dir_pin).

Finally, update your toolhead sensors definition to match your setup. Here I have the extruder entry (top) sensor in my toolhead can board named EBBCan connected to pin PB6 and the toolhead sensor (post extruder) at pin PB5.
```
extruder_switch_pin: ^EBBCan: PB6
toolhead_switch_pin: ^EBBCan: PB5
```

File contents - mmu_hardware.cfg:

```
[mmu_machine]
num_gates: 8			
mmu_vendor: EMU			
mmu_version: 1.0			

selector_type: VirtualSelector
variable_bowden_lengths: 1		
variable_rotation_distances: 1		
require_bowden_move: 1		
filament_always_gripped: 1	
has_bypass: 1 

# Add your temperature and humidity sensors here for them to be visible in mainsail. One line per lane.
# Supported in HH vesion 3.42 and above.
environment_sensors:   temperature_sensor Lane_0, 
						            temperature_sensor Lane_1,
                        temperature_sensor Lane_2,
                        temperature_sensor Lane_3,
                        temperature_sensor Lane_4,
                        temperature_sensor Lane_5,
                        temperature_sensor Lane_6,
                        temperature_sensor Lane_7 

# FILAMENT DRIVE GEAR STEPPER  -----------------------------------------------------------------------------------------
[tmc2209 stepper_mmu_gear]
uart_pin: mmu0:MMU_GEAR_UART
run_current: 0.8		
hold_current: 0.2	
interpolate: False
sense_resistor: 0.110	
stealthchop_threshold: 1		

[stepper_mmu_gear]
step_pin: mmu0:MMU_GEAR_STEP
dir_pin: mmu0:MMU_GEAR_DIR
enable_pin: !mmu0:MMU_GEAR_ENABLE
rotation_distance: 22.7574		
gear_ratio: 1:1			
microsteps: 32				
full_steps_per_rotation: 200		

# Filament Drive Gear_1 --------------------------
[tmc2209 stepper_mmu_gear_1]
uart_pin: mmu1:MMU_GEAR_UART

[stepper_mmu_gear_1]
step_pin: mmu1:MMU_GEAR_STEP
dir_pin: mmu1:MMU_GEAR_DIR
enable_pin: !mmu1:MMU_GEAR_ENABLE

# Filament Drive Gear_2 --------------------------
[tmc2209 stepper_mmu_gear_2]
uart_pin: mmu2:MMU_GEAR_UART

[stepper_mmu_gear_2]
step_pin: mmu2:MMU_GEAR_STEP
dir_pin: mmu2:MMU_GEAR_DIR
enable_pin: !mmu2:MMU_GEAR_ENABLE

# Filament Drive Gear_3 --------------------------
[tmc2209 stepper_mmu_gear_3]
uart_pin: mmu3:MMU_GEAR_UART

[stepper_mmu_gear_3]
step_pin: mmu3:MMU_GEAR_STEP
dir_pin: mmu3:MMU_GEAR_DIR
enable_pin: !mmu3:MMU_GEAR_ENABLE

# Filament Drive Gear_4 --------------------------
[tmc2209 stepper_mmu_gear_4]
uart_pin: mmu4:MMU_GEAR_UART

[stepper_mmu_gear_4]
step_pin: mmu4:MMU_GEAR_STEP
dir_pin: mmu4:MMU_GEAR_DIR
enable_pin: !mmu4:MMU_GEAR_ENABLE

# Filament Drive Gear_5 --------------------------
[tmc2209 stepper_mmu_gear_5]
uart_pin: mmu5:MMU_GEAR_UART

[stepper_mmu_gear_5]
step_pin: mmu5:MMU_GEAR_STEP
dir_pin: mmu5:MMU_GEAR_DIR
enable_pin: !mmu5:MMU_GEAR_ENABLE

# Filament Drive Gear_6 --------------------------
[tmc2209 stepper_mmu_gear_6]
uart_pin: mmu6:MMU_GEAR_UART

[stepper_mmu_gear_6]
step_pin: mmu6:MMU_GEAR_STEP
dir_pin: mmu6:MMU_GEAR_DIR
enable_pin: !mmu6:MMU_GEAR_ENABLE

# Filament Drive Gear_7 --------------------------
[tmc2209 stepper_mmu_gear_7]
uart_pin: mmu7:MMU_GEAR_UART

[stepper_mmu_gear_7]
step_pin: mmu7:MMU_GEAR_STEP
dir_pin: mmu7:MMU_GEAR_DIR
enable_pin: !mmu7:MMU_GEAR_ENABLE

[mmu_sensors]
pre_gate_switch_pin_0: ^mmu0:MMU_PRE_GATE
pre_gate_switch_pin_1: ^mmu1:MMU_PRE_GATE
pre_gate_switch_pin_2: ^mmu2:MMU_PRE_GATE
pre_gate_switch_pin_3: ^mmu3:MMU_PRE_GATE
pre_gate_switch_pin_4: ^mmu4:MMU_PRE_GATE
pre_gate_switch_pin_5: ^mmu5:MMU_PRE_GATE
pre_gate_switch_pin_6: ^mmu6:MMU_PRE_GATE
pre_gate_switch_pin_7: ^mmu7:MMU_PRE_GATE

post_gear_switch_pin_0: ^mmu0:MMU_POST_GEAR
post_gear_switch_pin_1: ^mmu1:MMU_POST_GEAR
post_gear_switch_pin_2: ^mmu2:MMU_POST_GEAR
post_gear_switch_pin_3: ^mmu3:MMU_POST_GEAR
post_gear_switch_pin_4: ^mmu4:MMU_POST_GEAR
post_gear_switch_pin_5: ^mmu5:MMU_POST_GEAR
post_gear_switch_pin_6: ^mmu6:MMU_POST_GEAR
post_gear_switch_pin_7: ^mmu7:MMU_POST_GEAR

extruder_switch_pin: ^EBBCan: PB6
toolhead_switch_pin: ^EBBCan: PB5


# Section below if using the dual switch version of the EMU Sync. 
sync_feedback_tension_pin: ^mmu0:MMU_TENSION         # Compression is when you pull the bowden tubes (entry/exit) away from each other. Tension when you push the tubes together.
sync_feedback_compression_pin: ^mmu0:MMU_COMPRESSION

# Section below if using the Proportional (PSF) version of the EMU Sync. Run the calibration routine (MMU_CALIBRATE_PSENSOR) and
# update the sync_feedback_analog_max_compression, sync_feedback_analog_max_tension and sync_feedback_analog_neutral_point accordingly.
# Comment out/delete the dual switch section above and uncomment the section below to use.
#sync_feedback_analog_pin: mmu0:MMU_TH
#sync_feedback_analog_max_compression: 0.9435
#sync_feedback_analog_max_tension:     0.0982
#sync_feedback_analog_neutral_point:   0.5275

# MMU NEOPIXEL LED SUPPORT ------------------------------------------------------------------------------------

[neopixel mmu0_leds] # one block per lane (Lane 0)
pin: mmu0:MMU_NEOPIXEL
chain_count: 2			# one for the box and one for the eject button
color_order: GRBW		

[neopixel mmu1_leds] # one block per lane (Lane 1)
pin: mmu1:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW		

[neopixel mmu2_leds] # one block per lane (Lane 2)
pin: mmu2:MMU_NEOPIXEL
chain_count: 2		
color_order: GRBW	

[neopixel mmu3_leds] # one block per lane (Lane 3)
pin: mmu3:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW

[neopixel mmu4_leds] # one block per lane (Lane 4)
pin: mmu4:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW

[neopixel mmu5_leds] # one block per lane (Lane 5)
pin: mmu5:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW

[neopixel mmu6_leds] # one block per lane (Lane 6)
pin: mmu6:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW

[neopixel mmu7_leds] # one block per lane (Lane 7)
pin: mmu7:MMU_NEOPIXEL
chain_count: 2			
color_order: GRBW	

# MMU LED EFFECT SEGMENTS ----------------------------------------------------------------------------------------------
[mmu_leds unit0]
exit_leds:
  neopixel:mmu0_leds (1) # add/remove to match number of lanes
  neopixel:mmu1_leds (1)
  neopixel:mmu2_leds (1)
  neopixel:mmu3_leds (1)
  neopixel:mmu4_leds (1)
  neopixel:mmu5_leds (1)
  neopixel:mmu6_leds (1)
  neopixel:mmu7_leds (1)
entry_leds:
  neopixel:mmu0_leds (2) # add/remove to match number of lanes
  neopixel:mmu1_leds (2)
  neopixel:mmu2_leds (2)
  neopixel:mmu3_leds (2)
  neopixel:mmu4_leds (2)
  neopixel:mmu5_leds (2)
  neopixel:mmu6_leds (2)
  neopixel:mmu7_leds (2)
frame_rate: 24

enabled: True                           # LEDs are enabled at startup
animation: True                         # Use led-animation-effects
exit_effect: gate_status                # gate_status in the eject buttons
entry_effect: filament_color            # filament_color in the dry box LED
status_effect: off                      # no status LED is on the unit
logo_effect: (0, 0, 0)                  # no Logo LED is on the unit
white_light: (1, 1, 1)                  # RGB color for static white light
black_light: (1, 1, 1)                  # RGB color used to represent "black" filament
empty_light: (0.0, 0.0, 0.0)            # Empty gate has eject button "off"

effect_loading:            mmu_blue_clockwise_slow, (0, 0, 0.4)
effect_loading_extruder:   mmu_blue_clockwise_fast, (0, 0, 1)
effect_unloading:          mmu_blue_anticlock_slow, (0, 0, 0.4)
effect_unloading_extruder: mmu_blue_anticlock_fast, (0, 0, 1)
effect_heating:            mmu_breathing_red,       (0.3, 0, 0)
effect_selecting:          mmu_white_fast,          (0.2, 0.2, 0.2)
effect_checking:           mmu_white_fast,          (0.8, 0.8, 0.8)
effect_initialized:        mmu_rainbow,             (0.5, 0.2, 0)
effect_error:              mmu_strobe,              (1, 0, 0)
effect_complete:           mmu_sparkle,             (0.3, 0.3, 0.3)
effect_gate_selected:      mmu_static_blue,         (0, 0, 1)
effect_gate_available:     mmu_static_white_dim,    (0.3, 0.3, 0.3)
effect_gate_available_sel: mmu_ready_white,         (0.75, 0.75, 0.75)
effect_gate_unknown:       mmu_static_orange,       (0.5, 0.2, 0)
effect_gate_unknown_sel:   mmu_ready_orange,        (0.75, 0.3, 0)
effect_gate_empty:         mmu_static_black,        (0, 0, 0)
effect_gate_empty_sel:     mmu_ready_red,           (0.2, 0, 0)
```

### Update mmu/addons/mmu_eject_buttons_hw.cfg
**Step 1: Clear the mmu_eject_buttons_hw.cfg file.** <br/><br/>
Start by completely deleting the content of that file and hitting save.

**Step 2: Paste the below configuration in the mmu_eject_buttons_hw.cfg file**<br/><br/>
The below starter setup is for an 8 lane unit. To set up a lower lane count, paste the complete content below and delete the corresponding `[gcode_button mmu_eject_button_N]` sections. If you have more than 8 lanes, add more blocks following the patterns below.
```
[gcode_button mmu_eject_button_0]
pin: mmu0:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=0

[gcode_button mmu_eject_button_1]
pin: mmu1:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=1

[gcode_button mmu_eject_button_2]
pin: mmu2:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=2

[gcode_button mmu_eject_button_3]
pin: mmu3:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=3

[gcode_button mmu_eject_button_4]
pin: mmu4:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=4

[gcode_button mmu_eject_button_5]
pin: mmu5:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=5

[gcode_button mmu_eject_button_6]
pin: mmu6:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=6

[gcode_button mmu_eject_button_7]
pin: mmu7:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=7
```

### Upload the emu_macros.cfg file and reference it in your printer.cfg
The [linked file here](https://github.com/DW-Tas/EMU/tree/main/macros) contains a set of configurations and definitions that are required for EMU to function. In addition, it contains a fan auto control macro, to minimize noise and ensure adequate unit cooling.

Upload that file in your klipper environment and add the below line to include it in your printer.cfg file:
```[include emu_macros.cfg]```

That file contains the **BME temperature and humidity sensor definitions** as below. It is set up for an 8 lane unit, so if you have less lanes, delete the corresponding blocks from the file.
```
[temperature_sensor Lane_N]
sensor_type: BME280
i2c_address: 118
i2c_mcu: mmu0  # mmu0=First lane, mmu1=second lane etc.
i2c_software_scl_pin: mmu0:PB3
i2c_software_sda_pin: mmu0:PB4
```
It also contains the definition of the onboard EBB temperature sensors used to control the unit fans. Similarly, it is set up for an 8 lane unit, so if you have less lanes, delete the corresponding blocks from the file.
```
[temperature_sensor _Lane_N_onboard]
sensor_type: temperature_mcu
sensor_mcu: mmu0 # mmu0=First lane, mmu1=second lane etc.
min_temp: 0
max_temp: 130
```
In addition, it contains the fan definitions for the unit as below. Similarly, it is set up for an 8 lane unit, so if you have less lanes, delete the corresponding blocks from the file.
```
[fan_generic _emu_fan_N]
pin: mmu0:MMU_FAN # mmu0=First lane, mmu1=second lane etc.
max_power: 1
kick_start_time: 0.5
```
Finally it contains the fan control macro that controls the fans on a by-lane basis. In the variable_sensors add the names of the **_Lane_N_onboard temperature sensors**, separated by a comma. In the variable_fans add the names of the **base unit fans**, separated by a comma. 

> [!NOTE]
> Prefixing the fans and board temperature sensors with a _ will hide them from the Mainsail UI, which is helpful to reduce clutter once you have your setup tuned and validated.

> [!IMPORTANT]
> The length of these two lists must match and correspond to each other (ie lane 0 fan and lane 0 onboard temp sensor must be first on the list etc).
> Make sure you include the **onboard temperature sensors in the fan control macro, not the BME sensors!**

Finally you can set the temperature where the fans turn on and off. By default, they are set to turn on at 39C and turn off at 37C.

```[gcode_macro MMU_FAN_CFG]
description: Holds configuration/state for multi fan controller.
variable_on_temp: 39.0
variable_off_temp: 37.0
variable_poll_s: 5.0
variable_enabled: True
variable_forced: -1                 # -1=AUTO, 0=all OFF, 1=all ON (global)
variable_sensors: "_Lane_0_onboard,_Lane_1_onboard,_Lane_2_onboard,_Lane_3_onboard,_Lane_4_onboard,_Lane_5_onboard,_Lane_6_onboard,_Lane_7_onboard"   # Comma-separated temperature_sensor names
variable_fans:    "_emu_fan_0,_emu_fan_1,_emu_fan_2,_emu_fan_3,_emu_fan_4,_emu_fan_5,_emu_fan_6,_emu_fan_7"  # Comma-separated fan_generic names
variable_warned_len_mismatch: False # internal: warn once per enable
gcode:
```
That file also contains some bespoke LED effects for the EMU, which are used earlier in the LED setup section.

### Save, restart and confirm lanes are visible
Once all of the above steps are completed hit save and restart klipper. The MMU hardware should now all be set up and all your lanes visible in the machine panel as below:

<p align="center">
  <img src="https://github.com/user-attachments/assets/ec2f4983-2228-4a1b-92f5-a9b0ec7f4e13" alt="Installer screen" width="80%">
</p>

## Configuring Happy Hare parameters
Now that the hardware is set up and visible to klipper, the next step is to configure the Happy Hare software to match the EMU capabilities and general Type B MMU good practice. That configuration will be predominately done in the mmu/base/mmu_parameters.cfg file. The indicated configuration below is geared towards reliability of feeding vs. filament swap speed. Use that as a starting point and tune to your liking once the unit is fully configured and operational.

### Setting up the EMU software parameters in mmu/base/mmu_parameters.cfg
Unlike the hardware setup files, do not delete the content of this file. We will be making targeted changes to match the EMU capabilities as validated through our testing.

**MMU Hardware Limits:** The EMU can operate up to a maximum of 500mm/sec feeding velocity and 400mm/sec2 acceleration. Adjust the maximum hardware limits as below.</br>
```
gear_max_velocity: 500
gear_max_accel: 400
```
**Logging:** Reduce log verbosity to reduce SD Card wear and system load</br></br>
```
log_level: 1
log_file_level: 1		
log_statistics: 0 		
log_visual: 1			
log_startup_status: 1		
log_m117_messages: 1
```			
**Speeds:** Our objective is reliability with operation. While the EMU can operate at 500mm/sec feeding, any snag in the filament path risks the lane stepper skipping steps. As such, it is recommended that conservative values are used in the speed set up, and tune up from there.</br>
```
gear_from_spool_speed: 250
gear_from_spool_accel: 120
#gear_from_buffer_speed: 250 # This is not necessary. Delete this line as there is no buffer.
#gear_from_buffer_accel: 120 # This is not necessary. Delete this line as there is no buffer.
gear_unload_speed: 250
gear_unload_accel: 120

gear_short_move_speed: 100
gear_short_move_accel: 100
gear_short_move_threshold: 100
gear_homing_speed: 100

extruder_load_speed: 16
extruder_unload_speed: 20
extruder_sync_load_speed: 16
extruder_sync_unload_speed: 20
extruder_homing_speed: 16

macro_toolhead_max_accel: 0
macro_toolhead_min_cruise_ratio: 0.5
```
**Gate load:** The EMU uses the post stepper (gear) switch sensor as the filament homing point for the lanes. That means that when swapping colors, the filament will retract all the way into the EMU dry box. This has three benefits which maximise flexibility in lane / base unit arrangements and reliability in feeding filament:
1. The filament is kept as dry as possible as it is now fully in the dry box. This results in lower probability of the filament snapping in the lane stepper gear due to it absorbing humidity from the environment.
2. There is no need for a sensor at the combiner, simplifying wiring setup and configuration.
3. You can expand to as many lanes as you want with any combination of passive combiners to bring the lane bowden tubes together to one that feeds the toolhead.

The downside is that the full bowden length needs to be traversed when loading, resulting in slightly longer loading times (however that is almost insignificant) and that the bowden length for each lane needs to be calibrated before first use (this is an automated process described later in this guide).

In addition, conservative homing max and preload homing max value have been selected, to allow the user time to load the filament and ensure it is gripped by the EMU lane stepper. 

It is therefore recommended to use the below values as is and do not modify unless trying to troubleshoot a specific issue.</br>
```
gate_homing_endstop: mmu_gear	
gate_homing_max: 600
gate_preload_homing_max: 600
gate_preload_parking_distance: 1
gate_unload_buffer: 100
gate_parking_distance: 1          # park the filament 1mm before the stepper exit switch. Do not increase this value beyond this as you are then risking the filament walking past the stepper gears.
gate_autoload: 1
gate_final_eject_distance: 100
```
**Bowden load:** As the EMU can accomodate long bowden tubes feeding to the printer, the bowden_homing_max is increased to allow Happy Hare to feed a longer run. 

In addition the correction and unload test moves are disabled as the encoder is not fitted in the base setup. From experience, encoders tend to accumulate dust after a few thousand swap cycles requiring ongoing maintenance. In addition they materially elevate the noise profile of the unit and add a point of "filament impact" in the bowden loading path.</br>
```
bowden_homing_max: 3000	# if the EMU lane to toolhead distance is larger than 3 meters, increase this value.

bowden_apply_correction: 0	
bowden_allowable_load_delta: 10.0

bowden_pre_unload_test: 0	
bowden_pre_unload_error_tolerance: 60 
```
**Extruder homing:** The below values are tuned to improve overall feeding reliability. The extruder homing max value has been increased, allowing for slight slippage during the bowden load to be compensated for. In addition, the homing buffer has been increased reducing the fast load speed 50mm before the filament arrives at the toolhead, to reduce possibility of filament impacting the gears.</br>
```
extruder_homing_max: 400			# Larger than the default HH value. This allows for homing to complete even if the filament skips steps during the load/
extruder_homing_endstop: extruder	
extruder_homing_buffer: 50
extruder_collision_homing_current: 100

extruder_force_homing: 0
```
**Toolhead Load:** This section needs to be populated following toolhead dimension calibration. Starter values from the community are available here: https://link.3dcoded.xyz/tipconfigs/ . 

In addition, the below settings have been adjusted to allow more tolerance in case of the extruder delaying grabbing the filament, which improves feeding reliability and allows for more "flex" in a slightly miss-tuned setup</br>
```
toolhead_homing_max: 250			# Increased from default of 40, to allow more tolerance in the extruder not grabbing the filament immediately.
toolhead_unload_safety_margin: 90	# Increased from the default of 10, to ensure filament is for sure clear of the extruder during unload.
toolhead_post_load_tighten: 0		# this is ignored as EMU is a Type B MMU - set to 0
toolhead_post_load_tension_adjust: 1	# Adjust tension post load to attemt to centre the sync feedback sensor. 
toolhead_entry_tension_test: 0		# Not required - toolhead sensor ensures feeding has happened.
```
**Tip Forming:** A toolhead cutter is highly recommended. Venture into tip forming at your own risk!</br>
```
force_form_tip_standalone: 1		  # Always standalone tip forming (TURN SLICER OFF!)
form_tip_macro: _MMU_CUT_TIP	
extruder_form_tip_current: 130		  # Bump up extruder current during tip forming. Helps ensure no skipped steps on the extruder if cutting is not 100% clean
slicer_tip_park_pos: 0			      # This specifies the position of filament in extruder after slicer completes tip forming. (TURN SLICER TIP FORMING OFF!)
```
**Purging:** If you have the blobifier set up, enable it here. For a baseline, starter setup, the below is recommended. Setting up the blobifier is recommended to be done after this guide is complete and your first test print is completed successfully.</br>
```
force_purge_standalone: 0 		# Use slicer purging (purge block) - set to 1 for blobifier
purge_macro: 			            # Replace this with BLOBIFIER when set up. Leave empty if not using the blobifier. 
extruder_purge_current: 100		# leave this unchanged. If the extruder is skipping during purging with the blobifier you are most likely exceeding your hotend flow limit.
```
**Motor sync:** Setup sync feedback sensor (EMUSync) here. The sync multiplier high and low values allow for +/- 10% tolerance in rotation distance variation between your EMU lane and your extruder. If you find you need more than this for the unit to stay in sync then most likely either your extruder or EMU lane is not calibrated correctly.</br>
```
sync_gear_current: 50			    # 50% EMU stepper current during printing -> ~0.4A when printing. Higher than 0.5A can cause PLA to clog the EMU stepper in hot environments.
sync_feedback_enabled: 1		    # Enable EMU Sync sync feedback sensor
sync_feedback_buffer_range: 12		# EMU Sync switch to switch distance
sync_feedback_buffer_maxrange: 25	# EMU Sync max travel
sync_multiplier_high: 1.10		    # over-feed by 10% when in tension
sync_multiplier_low: 0.90		    # under-feed by 10% when in compression
```
**Filament Management:** Disable clog detection (as the encoder is not fitted to the unit) and enable endless spool (automated failover to the next available spool as defined in the gate map, administered via the Mainsail UI or Klipperscreen).</br>
```
enable_clog_detection: 0		
enable_endless_spool: 1			    # enable endless spool
endless_spool_on_load: 0	
endless_spool_eject_gate: -1		# Eject filament in the current gate
```
Here you can also configure spoolman filament management (highly recommended - instructions here:https://github.com/moggieuk/Happy-Hare/wiki/Spoolman-Support). </br></br>

**Calibration:** While happy hare can auto calibrate both the bowden tube length and lane rotation distance, I personally recommend a manual calibration for run to run consistency. Therefore all automated calibrations are disabled to ensure run-to-run consistency.</br>
```
autocal_bowden_length: 0	# Disable automated bowden length calibration
autotune_bowden_length: 0	# Disable automated bowden length tuning
skip_cal_rotation_distance: 0	# Require gate rotation distance calibration
autotune_rotation_distance: 0	# Disable automated gate calibration/tuning.
skip_cal_encoder: 0		# Encoder not fitted
autotune_encoder: 0		# Encoder not fitted
```

**Misc:** Minor options tuning and instructing Happy Hare that a filamentalist rewinder is used instead of a buffer </br>
```
timeout_pause: 86400		    # Idle time out in seconds. Set to 24 hours, to allow you to react and fix a pause if a swap issue materialises.
disable_heater: 60		        # Disable the hotend heater 60 seconds after an error is detected to reduce oozing.
default_extruder_temp: 230	    # Default temperature for performing swaps and forming tips when not in print (overridden by gate map). 230C is a good all around temperature for most material types.
extruder_temp_variance: 30	    # When waiting for extruder temperature this is the +/- permissible variance in degrees (>= 1).

startup_home_if_unloaded: 0	    # 0 = do nothing
startup_reset_ttg_map: 0	    #  0 = do nothing
show_error_dialog: 0		    # 0 = show error in console only. No mainsail pop-up
preload_attempts: 5		        # How many "grabbing" attempts are made to pick up the filament with preload feature
strict_filament_recovery: 0	    # If enabled with MMU with toolhead sensor, this will cause filament position recovery to
                                # perform extra moves to look for filament trapped in the space after extruder but before sensor
                                # This is largely uncessary but can be enabled if your toolhead setup is not particularly reliable.
filament_recovery_on_pause: 1	# Run a quick check to determine current filament position on pause/error.
retry_tool_change_on_error: 1	# Automatically retry a failed tool change. While this may mask a unit issue, we are aiming for relability during print.
bypass_autoload: 1		        # If extruder sensor fitted, this controls the automatic loading of extruder for bypass operation
has_filament_buffer: 0          # We are using a Filamentalist so no separate filament buffer is installed
#
# Advanced options. Don't mess unless you fully understand. Read documentation.
#
encoder_move_validation: 0	     # ADVANCED: 1 = Normally Encoder validates move distances are within given tolerance
                                 #           0 = Validation is disabled (eliminates slight pause between moves but less safe)
print_start_detection: 1	     # ADVANCED: Enabled for Happy Hare to automatically detect start and end of print and call
                                 # ADVANCED: MMU_PRINT_START and MMU_PRINT_END automatically. Harmless to leave enabled but can disable
                                 #           if you think it is causing problems and known START/END is covered in your macros
extruder: extruder		         # ADVANCED: Name of the toolhead extruder that MMU is using
gcode_load_sequence: 0		     # VERY ADVANCED: Gcode loading sequence 1=enabled, 0=internal logic (default)
gcode_unload_sequence: 0	     # VERY ADVANCED: Gcode unloading sequence, 1=enabled, 0=internal logic (default)
```

**Klipper:** Enable klipper timer too close (TTC) mitigations.</br>
```
update_trsync: 1		    # 1 = Increase TRSYNC_TIMEOUT, 0 = Leave the klipper default
canbus_comms_retries: 3		# Number of retries. Recommend the default of 3.
update_bit_max_time: 1		# 1 = Increase BIT_MAX_TIME, 0 = Leave the klipper default
update_aht10_commands: 0	# BTT ViViD specific setting. Leave at 0.
```

### Setting up the EMU software parameters in mmu/base/mmu_macro_vars.cfg
Unlike the hardware setup files, do not delete the content of this file. The below are some common settings that I have found usefull to change from default. However, the **detailed guide on Happy hare must be followed to set up your cut tip macro and to configure the system for your specific printer setup**. For more read here: https://github.com/moggieuk/Happy-Hare/wiki/Configuring-mmu_macro_vars.cfg

> [!WARNING]
> **WARNING: DO NOT RUN A PRINT WITHOUT CONFIGURING THE ABOVE.** The stock cut tip macro will most likely not work for your setup and you will crash the hotend on the cutter.

```
variable_min_toolchange_z       : 15.0 # Be safe and dont scratch the bed
variable_park_travel_speed      : 450  # Travel a bit faster to avoid stringing
```

## Configuring PSF and Flowguard
EMU and Happy Hare supports using a [proportional sync feedback sensor](https://github.com/DW-Tas/EMU/tree/main/STL/Tension-compression-sensor/Proportional%20Sync%20Feedback%20(PSF)%20Version) to accurately measure filament tension in the bowden tube. This is used in place of and instead of the dual switch EMUSync. The sensor [is available to purchase from Aliexpress](https://www.aliexpress.com/item/1005010470743517.html).

The proportional sensor offers the below key advantages:
1. Real time tension/compression monitoring in the bowden tube
2. Precise syncronisation between the extruder and EMU steppers
3. Real time detection of both clogs and tangles

### PSF Configuration:
The sensor is plugged in [as per the wiring diagram](https://github.com/DW-Tas/EMU/tree/main/docs/assembly_wiring#wiring-instructions-and-diagrams) - ground and signal plug into the EBB thermistor port and 5V to any unused 5V pins on the EBB.

**Step 1:** Comment out or delete the below section in the mmu_hardware.cfg file: 
```
# sync_feedback_tension_pin: ^mmu0:MMU_TENSION         # Compression is when you pull the bowden tubes (entry/exit) away from each other. Tension when you push the tubes together.
# sync_feedback_compression_pin: ^mmu0:MMU_COMPRESSION
```

**Step 2:** Uncomment or add the below section right below in the mmu_hardware.cfg file:
```
# Section below if using the Proportional (PSF) version of the EMU Sync. Run the calibration routine (MMU_CALIBRATE_PSENSOR) and
# update the sync_feedback_analog_max_compression, sync_feedback_analog_max_tension and sync_feedback_analog_neutral_point accordingly.
# Comment out/delete the dual switch section above and uncomment the section below to use.
sync_feedback_analog_pin: mmu0:MMU_TH
sync_feedback_analog_max_compression: 0.9435
sync_feedback_analog_max_tension:     0.0982
sync_feedback_analog_neutral_point:   0.5275
```
**Step 3:** Restart and test the sensor. 
1. Pull the bowden tube and expand the EMUSync PSF sensor. While holding in the expanded position run the below macro in the printer console: `MMU_QUERY_PSENSOR`.
2. Compress the sensor by pushing the ends together and run the same macro again. Record both values.
> [!IMPORTANT]
> You should see a **max raw value** greater than ~0.9 and a **min raw value** or less than ~0.1. If the values do not change when expanding and compressing the sensor recheck your wiring!

**Step 4:** Set the EMUSync dimensions in the mmu_parameters.cfg file as below. Save and restart.
```
sync_feedback_enabled: 1		
sync_feedback_buffer_range: 16		# Travel in "buffer" between compression/tension or one sensor and end
sync_feedback_buffer_maxrange: 16	# Absolute maximum end-to-end travel (mm) provided by buffer
sync_feedback_speed_multiplier: 5	# % "twolevel" gear speed delta to keep filament neutral in buffer
sync_feedback_boost_multiplier: 3	# % "twolevel" extra gear speed boost for finding initial neutral position
sync_feedback_extrude_threshold: 5	# Extruder movement (mm) for updates
```

**Step 5:** Calibrate the sensor.
1. Load filament from any lane to the toolhead using a Tx (T0,T1 etc) command.
2. In the console run `MMU_CALIBRATE_PSENSOR`
3. Note down the produced values
> [!IMPORTANT]
> If the max and min values differ significantly (>0.1) from the min and max raw values above, your calibration has failed due to excess bowden tube slack or because the sensor is getting jammed due to excess friction. Validate that the sensor moves freely and run the calibration command as follows: `MMU_CALIBRATE_PSENSOR MOVE=50`

The produced values should look like the below:
```
sync_feedback_analog_max_compression: 0.9435
sync_feedback_analog_max_tension:     0.0982
sync_feedback_analog_neutral_point:   0.5275
```

Update the corresponding values in the mmu_hardware.cfg file, save and restart.

**Step 6:** Configure flowguard (clog/tangle detection) <br/>
Edit the mmu_parameters.cfg file and amend the values below to match the suggested configuration.

```
flowguard_enabled: 1	
flowguard_max_relief: 2
flowguard_encoder_mode: 0
```
Save and restart. 

**Step 7:** You can now start a print and test the sensor in a print
1. Start a print and monitor the flowguard value in the MMU panel. It should remain close to the neutral (0) threshold
2. Expand the sensor manually - flowguard should trigger a pause. Let go, and click resume. The print should continue uninterrupted.

<img width="436" height="780" alt="image" src="https://github.com/user-attachments/assets/077a016e-9157-475b-a02c-4390ebe10665" />

### EMUSync PSF insights:
You can use the sync sensor to visualise your printer's extrusion consistency, checking whether you are pushing the hotend to its limits. To do so, enable logging `sync_feedback_debug_log: 1` in the mmu_parameters.cfg file and restart. Run a print and after it is complete, execute the below command in the printer shell `~/Happy-Hare/utils/plot_sync_feedback.sh ~/printer_data/logs/sync_5.jsonl` where sync_N being the lane number in use.

You can read more on how to interpret the sync feedback telemetry data in the [Happy Hare wiki](https://github.com/moggieuk/Happy-Hare/wiki/Synchronized-Gear-Extruder#interpreting-telemetry).

**Normal telemetry data with an "unstressed" hotend** </br>
Notice how the orange line is **pretty flat and consistent**. This indicates that there is very little dynamic variation during printing between the EMU and the extruder, meaning the extruder can maintain ideal flow easily throughout the print. Also how the blue line (EMU rotation distance) converges and stabilises fairly quickly to a perfectly stable value.</br></br>
<img width="1800" height="900" alt="image" src="https://github.com/user-attachments/assets/73aedbd2-5938-4414-8442-36321fd1d819" />

**Telemetry data showing a tangle developing towards the end of the print** </br>
Notice how the orange and blue lines slowly creep away from neutral and then flowguard (red vertical line) triggers saving the print.</br></br>
<img width="1800" height="900" alt="T2 sim_plot" src="https://github.com/user-attachments/assets/c6760dec-85cd-4502-81f9-8a0fd76c5387" />

**Telemetry data showing a hotend that is struggling to keep up with flow when printing at higher flow rates** </br>
Notice how the blue line (RD) and orange line (sensor position) rapidly deviate from neutral when an object with high flow rate is printed.</br></br>
<img width="1800" height="900" alt="image" src="https://github.com/user-attachments/assets/63324652-7d46-47a6-ad3e-42b72f09fb5a" />




