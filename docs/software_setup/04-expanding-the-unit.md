# EMU Happy Hare Hardware and Software Setup

This section covers adding lanes to an existing EMU installation. It is meant to be read in conjunction with the [Happy Hare wiki](https://github.com/moggieuk/Happy-Hare/wiki).

## Table of Contents

- [Expanding the unit with more lanes](#expanding-the-unit-with-more-lanes)

## Expanding the unit with more lanes

Beyond the electrical connections, the below steps need to be undertaken when adding additional lanes to the EMU unit.

**mmu.cfg**

Add an additional MCU block for each new lane:

```ini
[mcu mmuN]
canbus_uuid: UUID
canbus_interface: can0
```

Add the additional mmu board to the board pins section:

```ini
[board_pins mmu]
mcu: mmu0, mmu1, mmu2, mmu3, mmu4, mmu5, mmu6, mmuN
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

**mmu_hardware.cfg:**

Update the below to reflect your current lane count:

```ini
[mmu_machine]
num_gates: 8
```

Add the additional environment sensors block.

```ini
environment_sensors:   temperature_sensor Lane_0,
      temperature_sensor Lane_1,
                        temperature_sensor Lane_2,
                        temperature_sensor Lane_3,
                        ...
                        temperature_sensor Lane_N
```

Add additional stepper definitions, where N is the lane number:

```ini
...
[tmc2209 stepper_mmu_gear_N]
uart_pin: mmuN:MMU_GEAR_UART_N

[stepper_mmu_gear_N]
step_pin: mmuN:MMU_GEAR_STEP_N
dir_pin: mmuN:MMU_GEAR_DIR_N
enable_pin: !mmuN:MMU_GEAR_ENABLE_N
...
```

Define the additional pre-gate and post gear sensors (pre-stepper, post-stepper)

```ini
[mmu_sensors]
...
pre_gate_switch_pin_N: ^mmuN:MMU_PRE_GATE
post_gear_switch_pin_N: ^mmuN:MMU_POST_GEAR
...
```

Add another neopixel LED's block

```ini
[neopixel mmuN_leds]
pin: mmuN:MMU_NEOPIXEL
chain_count: 2
color_order: GRBW
```

Update the mmu_led's entry and exit LED numbers

```ini
[mmu_leds unit0]
exit_leds:
  neopixel:mmu0_leds (1) # add/remove to match number of lanes
  neopixel:mmu1_leds (1)
  neopixel:mmu2_leds (1)
  neopixel:mmu3_leds (1)
  neopixel:mmu4_leds (1)
  neopixel:mmu5_leds (1)
  neopixel:mmu6_leds (1)
  ...
  neopixel:mmuN_leds (1)
entry_leds:
  neopixel:mmu0_leds (2) # add/remove to match number of lanes
  neopixel:mmu1_leds (2)
  neopixel:mmu2_leds (2)
  neopixel:mmu3_leds (2)
  neopixel:mmu4_leds (2)
  neopixel:mmu5_leds (2)
  neopixel:mmu6_leds (2)
  ...
  neopixel:mmuN_leds (2)
frame_rate: 24
```

**mmu_eject_buttons_hw.cfg**

Define the additional eject buttons in the mmu_eject_buttons_hw.cfg file:

```ini
[gcode_button mmu_eject_button_N]
pin: ^!mmuN:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=N
```

**mmu_macro_vars.cfg:**

Add an additional tool change gcode macro at the end of the file for each new lane:

```ini
[gcode_macro TN]
gcode: MMU_CHANGE_TOOL TOOL=N
```

**emu_macros.cfg**

Add additional temperature sensor, fan and BME sensor definitions and update the custom fan control macro to use them

Finally dont forget to execute the 2 calibrations for the new lanes - MMU_CALIBRATE_BOWDEN and MMU_CALIBRATE_GEAR as described in the calibration section.

```ini
[temperature_sensor Lane_N]
sensor_type: BME280
i2c_address: 118
i2c_mcu: mmuN
i2c_software_scl_pin: mmuN:PB3
i2c_software_sda_pin: mmuN:PB4

[temperature_sensor _Lane_N_onboard]
sensor_type: temperature_mcu
sensor_mcu: mmuN
min_temp: 0
max_temp: 130

[fan_generic _emu_fan_N]
pin: mmuN:MMU_FAN
max_power: 1
kick_start_time: 0.5

[gcode_macro MMU_FAN_CFG]
...
variable_sensors: ".....,_Lane_N_onboard"
variable_fans:    "......,_emu_fan_N"
...
```

---

← [Documentation Hub](/docs)
