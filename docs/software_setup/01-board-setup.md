# EMU Board Setup

This section covers flashing Katapult and Klipper to the EBB boards over CAN bus for Happy Hare v3. It is meant to be read in conjunction with the [Happy Hare wiki](https://github.com/moggieuk/Happy-Hare/wiki).

## Table of Contents

- [Setting up CAN Bus](#setting-up-can-bus)
- [Flashing the EBB boards](#flashing-the-ebb-boards)
- [Updating the boards with the latest klipper version](#updating-the-boards-with-the-latest-klipper-version)


## Setting up CAN Bus
If your printer does not have canbus set up, follow the excellent guide from Esoterical here: https://canbus.esoterical.online. If you are not familiar with CAN Bus, read through the guide from Esoterical. **CAN Bus is simple to set up and operate, but please do read the guide to familiarise yourselves with the CAN Bus concepts and terminology.**

Do not forget to terminate the last EBB board or CANBus device in your bus (depending on your bus topology).

## Flashing the EBB boards
Prior to setting up the EMU, the EBB boards need to be flashed with Katapult and Klipper. Flashing instructions can be found here https://canbus.esoterical.online/toolhead_flashing.html. The boards are flashed in exactly the same way as if they were used as a toolhead board. Below are some high level instructions; however do refer back to the guide by Esoterical for a more comprehensive guide.<br/>

**Step 1:** Install katapult:<br/>
Katapult is a piece of software that sits on the EBB units (and any CAN Bus device) and acts as an easy way to set your board in "flashing mode" making klipper updates super easy. It is highly recommended that Katapult is flashed on the boards.
```bash
test -e ~/katapult && (cd ~/katapult && git pull) || (cd ~ && git clone https://github.com/Arksine/katapult) ; cd ~
```
**Step 2:** Connect your first EBB board over USB **outside the EMU**. Make sure the **power by USB jumper is set**.<br/>
**Step 3:** Set the board in DFU mode by pressing and holding the reset and boot buttons. Release the reset button first, then release the boot button<br/>
**Step 4:** The board should show as in DFU mode. Run ```lsusb``` and check that something like the below is shown in the command line:<br/>
```bash
Bus 001 Device 005: ID 0483:df11 STMicroelectronics STM Device in DFU Mode
```
**Step 5:** initiate menuconfig for Katapult.<br/>
```bash
cd ~/katapult
make menuconfig
```
![image](https://github.com/user-attachments/assets/9f642d03-d781-4025-bc28-959574c30c8a)

```bash
make
```
**Step 6:** Flash katapult to the EBB board<br/>
```bash
sudo dfu-util -R -a 0 -s 0x08000000:mass-erase:force:leave -D ~/katapult/out/katapult.bin -d 0483:df11
```
**Step 7:** initiate menuconfig for klipper and make the firmware<br/>
```bash
sudo service klipper stop
cd ~/klipper
make clean
make menuconfig
```
![image](https://github.com/user-attachments/assets/f5ab3561-25aa-42c2-b838-8629a2cb38cf)
```bash
make
```
**Step 8:** Prepare to flash klipper<br/>
Now that katapult is loaded, unplug the USB cable, remove the USB power jumper (if installed) and install the EBB on the unit. Power it via the canbus pigtail.

Please note, **you can set up katapult on all the boards and install them back to the unit all at once**. However, identifying which board is which from the UID is more tricky if you have them all installed in the unit. 

You have two options to identify them.
1. Unplug the positive (red) wire from the wagos for all the boards except the one you are intending to flash klipper, Run the command from Step 9, note the UUID, flash klipper and note down the UUID you just used with the lane number in your documentation  _--or--_
2. Run the command from Step 9, pick one UUID, flash Klipper, note which board's led stopped flashing and note down the UUID you just used with the lane number in your documentation.

**Step 9:** Find the board UUID<br/>
Run the command below and note the produced UUID
```bash
python3 ~/katapult/scripts/flashtool.py -i can0 -q
```
**Step 10:** Flash klipper<br/>
```bash
python3 ~/katapult/scripts/flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u youruuid
```
**Flashing the remaining boards:** <br/>

Repeat step 2 (connect via USB),3 (set in DFU mode),4 (lsusb to confirm DFU),6 (flash katapult),8 (install the board),9 (pick the UUID),10 (flash klipper) for each subsequent board. Please note that as the boards are the same you do not need to re-run the menu config and make process.

> [!IMPORTANT]
> Remember to note down the UUID - Lane values for your reference. This combination will be used later to set up Happy Hare.

---

← [Step 2: Printing, Assembly and Wiring](/docs/assembly_wiring) | [Step 4: Happy Hare Setup →](/docs/software_setup/02-happy-hare-setup.md)
