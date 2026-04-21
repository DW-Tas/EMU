# EMU – Custom macros and Klipper modules

This folder contains three sets of files:
1. `emu_macros.cfg`
2. Klipper module patches for the AHT and BME sensors
3. UKAM menuconfig templates to automate Klipper firmware updates

## Using the emu_macros.cfg file
Place the `emu_macros.cfg` file in your printer configuration folder. Update your `printer.cfg` to use it by adding the following line after all the MMU macro inclusions:

`[include emu_macros.cfg]`

Configure the macros [as per the instructions](https://github.com/DW-Tas/EMU/blob/main/docs/software_setup/02-happy-hare-setup.md#upload-the-emu_macroscfg-file-and-reference-it-in-your-printercfg).

## Using the custom Klipper modules
The stock Klipper setup has two shortcomings when using a BME or AHT sensor:
1. The BME sensor polls every 0.8 seconds, placing needless load on the MCU.
2. The AHT sensor does not report humidity to 1 decimal place; instead, it rounds to a whole number.

The two included files are drop-in replacements for Klipper modules and address these two shortcomings. Specifically for the BME sensor, the default polling behaviour is set to 5 seconds and is also configurable from your `emu_macros.cfg` file as shown below:

```
[temperature_sensor Lane_0]
sensor_type: BME280
bme280_report_time: 120 # new parameter controlling polling frequency
i2c_address: 118
i2c_mcu: mmu0
i2c_software_scl_pin: mmu0:PB3
i2c_software_sda_pin: mmu0:PB4
```
To use these files, download them from the EMU repo and upload them to your SBC in the following location, overwriting the default files: `~/klipper/klippy/extras`



