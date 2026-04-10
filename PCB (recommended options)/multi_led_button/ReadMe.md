## EMU LED PCB

The **EMU LED PCB** is a dedicated PCB designed for the EMU to enable dynamic lighting effects on the eject button assembly. It also simplifies wiring and reduces the need for soldering.

![LED PCB](https://github.com/user-attachments/assets/14425b43-296c-47e2-9205-70350bf1aeb9)

## BOM variations vs. baseline EMU BOM
Do not purchase the below from the base BOM:
1. 1 less neopixel
2. 1 less D2F-L switch
3. 4 less 6x3mm magnets

Add the below to the base BOM, depending on your LED PCB source:
1. 1x JST-XH 5 pin PCB header

## Manual
Assembly and wiring instructions are outlined [in the manual](https://github.com/DW-Tas/EMU/blob/main/PCB%20(recommended%20options)/multi_led_button/EMU%20LED%20Button%20PCB%20Assembly%20Manual.pdf).

## Sourcing
The LED button PCBs can be sourced from the below location:
1. [Aliexpress](https://www.aliexpress.com/item/1005011529532141.html) in sets of 5

Alternatively use the supplied gerber, BOM and pick and place files to order from your favourite PCB manufacturer.

## Software setup

Update your **LED definitions** in the mmu_hardware.cfg as below. **Key change is chain count is equal to 5 instead of 2.**
```
[neopixel mmu0_leds] # one block per lane (Lane 0)
pin: mmu0:MMU_NEOPIXEL
chain_count: 5			# four for the eject button and one for the box
color_order: GRBW		

[neopixel mmu1_leds] # one block per lane (Lane 1)
pin: mmu1:MMU_NEOPIXEL
chain_count: 5			# four for the eject button and one for the box
color_order: GRBW	

[....]

[neopixel mmuN_leds] # one block per lane (Lane 1)
pin: mmuN:MMU_NEOPIXEL
chain_count: 5			# four for the eject button and one for the box
color_order: GRBW
```
Update your **LED allocation** to exit and entry LEDs in the mmu_hardware.cfg as below. **Key change is that leds 1 through to 4 are exit LEDs and LED 5 is the entry LED.**
```
[mmu_leds unit0]
exit_leds:
  neopixel:mmu0_leds (1,2,3,4) # add/remove lines to match number of lanes. LED 1-4 is for the button
  neopixel:mmu1_leds (1,2,3,4)
  [...]
  neopixel:mmuN_leds (1,2,3,4)
entry_leds:
  neopixel:mmu0_leds (5) # add/remove lines to match number of lanes. LED 5 is for the box
  neopixel:mmu1_leds (5)
  [...]
  neopixel:mmuN_leds (5)
frame_rate: 24
```
Update the **mmu eject button hardware configuration** in the **mmu_eject_buttons_hw.cfg file**<br/><br/>
The below example setup is for an 8 lane unit. To set up a lower lane count, delete the corresponding `[gcode_button mmu_eject_button_N]` sections. If you have more than 8 lanes, add more blocks following the pattern below. 

Please note the `!` which is different to the software setup that uses D2F switches!

```
[gcode_button mmu_eject_button_0]
pin: ^!mmu0:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=0

[gcode_button mmu_eject_button_1]
pin: ^!mmu1:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=1

[gcode_button mmu_eject_button_2]
pin: ^!mmu2:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=2

[gcode_button mmu_eject_button_3]
pin: ^!mmu3:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=3

[gcode_button mmu_eject_button_4]
pin: ^!mmu4:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=4

[gcode_button mmu_eject_button_5]
pin: ^!mmu5:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=5

[gcode_button mmu_eject_button_6]
pin: ^!mmu6:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=6

[gcode_button mmu_eject_button_7]
pin: ^!mmu7:EJECT_BUTTON
press_gcode: _MMU_EJECT_BUTTON GATE=7
```


## Wiring variations
The DOut pin (LED out) should connect to a 600mm AWG26-28 wire going to the LED IN pin of the lane dry box. That way the third wago can be omitted.

## Lighting effects
The multiple LEDs incorporated in the eject button allow you to create loading/unloading animations like the below. Also the integrated SMD switch provides a more tactile feel vs. the D2F switch and magnet assembly. 

The lighting effects are enabled automatically by happy hare.

https://github.com/user-attachments/assets/2f268710-e0a5-41e1-b007-02235ff379cc



## This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

## License clarification regarding non-commercial use:
The non-commercial aspect of this license is for cases where EMU is the product, not the use of EMU to create products.<br/>
I.e. If you wish to sell EMU as a product, you would need to seek a commercial license before doing so. </br>
It is NOT intended to prevent the use of EMU with a printer that you use to provide commercial services. If you want to run EMU in your print farm, go right ahead.

