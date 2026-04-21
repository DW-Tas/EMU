# Updating the EMU CANBus Boards using UKAM

UKAM (Update Klipper And MCUs) automates Klipper & Kalico firmware updates for your EMU's CAN bus boards so you don't have to manually run `make menuconfig`, `make`, and `flashtool.py` each time and for every lane.

> **Prerequisite:** Your EBB boards must already have Katapult flashed per the [EMU board setup guide](/docs/software_setup/01-board-setup.md). You will need the CAN bus UUID for each board as defined in your `mmu.cfg` file.

---

## Step 1 — Install UKAM

```bash
cd ~
git clone https://github.com/fbeauKmi/update_klipper_and_mcus.git ukam
```

## Step 2 — Download and set up the menuconfig templates

UKAM needs a menuconfig config file **for each board**, and the filename must match the section name in your `mcus.ini` (e.g. `config.emu_0`, `config.emu_1`, etc.).

First, create the config directory and download the correct template for your board type:

**For EBB36/42 boards** (CAN on PB0/PB1):
```bash
mkdir -p ~/printer_data/config/ukam/config
wget -O ~/printer_data/config/ukam/config/config.emu_0 https://raw.githubusercontent.com/DW-Tas/EMU/main/macros/ukam_menuconfig_templates/config.ebb36_42
wget -O ~/printer_data/config/ukam/config/config.emu_1 https://raw.githubusercontent.com/DW-Tas/EMU/main/macros/ukam_menuconfig_templates/config.ebb36_42
# Repeat for each EBB36 board (emu_2, emu_3, etc.)
```

**For SLB boards** (CAN on PB8/PB9):
```bash
wget -O ~/printer_data/config/ukam/config/config.emu_8 https://raw.githubusercontent.com/DW-Tas/EMU/main/macros/ukam_menuconfig_templates/config.slb
wget -O ~/printer_data/config/ukam/config/config.emu_9 https://raw.githubusercontent.com/DW-Tas/EMU/main/macros/ukam_menuconfig_templates/config.slb
# Repeat for each SLB board (emu_10, emu_11, etc.)
```

> [!IMPORTANT]
> Each board **must have its own copy** of the config file. **The filename must match the section name** in `mcus.ini` — so `[emu_0]` needs `config.emu_0`, `[emu_1]` needs `config.emu_1`, and so on for all your boards.

## Step 3 — Create your `mcus.ini`

```bash
nano ~/printer_data/config/ukam/mcus.ini
```
Save and exit. 

Open the mcus.ini in mainsail/fluidd, and add a section for **each EMU board**. The section name (e.g. `[emu_0]`) must match the menuconfig filename you created in Step 2 (e.g. `config.emu_0`). The `klipper_section` must match the MCU name in your Klipper config exactly (case-sensitive).

```ini
[emu_0]
klipper_section: mcu emu_0
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u <UUID_FOR_EMU_0>

[emu_1]
klipper_section: mcu emu_1
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u <UUID_FOR_EMU_1>

# Repeat for each additional board...
```

Replace each `<UUID_FOR_...>` with the actual CAN bus UUIDs you noted during initial setup.

---

## Full worked example

Below is a complete `mcus.ini` for a 13-board EMU setup: 8x EBB36/42 boards (`emu_0`–`emu_7`) and 5x SLB boards (`emu_8`–`emu_12`). Each board has a matching `config.emu_X` menuconfig file in `~/printer_data/config/ukam/config/` downloaded in Step 2.

```ini
# EBB36/42 boards
[emu_0]
klipper_section: mcu mmu0
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u cc8f39d714ce

[emu_1]
klipper_section: mcu mmu1
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u c2357f5873d7

[emu_2]
klipper_section: mcu mmu2
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 31fb8c95fbfd

[emu_3]
klipper_section: mcu mmu3
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 8579c5130649

[emu_4]
klipper_section: mcu mmu4
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 7d42f7c43687

[emu_5]
klipper_section: mcu mmu5
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 3efbe46e5d5f

[emu_6]
klipper_section: mcu mmu6
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u f050daaa5448

[emu_7]
klipper_section: mcu mmu7
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 49abda4839e6

# SLB boards
[emu_8]
klipper_section: mcu mmu8
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 2b62794dd839

[emu_9]
klipper_section: mcu mmu9
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 74d5b2c5d1ca

[emu_10]
klipper_section: mcu mmu10
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 8f4f90d95a7f

[emu_11]
klipper_section: mcu mmu11
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u e78e90e44d82

[emu_12]
klipper_section: mcu mmu12
action_command: ~/klippy-env/bin/python3 ~/katapult/scripts/flashtool.py -i can0 -u 134943460803
```

## Step 4 — Add Moonraker integration (optional)

Add this to your `moonraker.conf` so UKAM appears in your web UI's update manager:

```ini
[update_manager update_klipper_and_mcus]
type: git_repo
primary_branch: main
path: ~/ukam
origin: https://github.com/fbeauKmi/update_klipper_and_mcus.git
is_system_service: False
```

## Step 5 — Update your boards

From now on, updating Klipper and all EMU boards is a single command:

```bash
~/ukam/ukam.sh -f
```

UKAM will compile firmware for your current Klipper/Kalico installed version, and flash each board via Katapult over CAN bus. It skips boards whose firmware is already current.

---

## Useful flags

| Flag | What it does |
|------|-------------|
| `-c` | Check-only — see if an update is available without applying it |
| `-f` | Firmware flash only, skip Klipper repo update |
| `-m` | Show menuconfig before building for all MCUs |
| `-q` | Quiet mode — fully automated, no prompts |
| `-r` | Rollback to a previous klipper/kalico version |
| `-v` | Verbose — debug output showing parsed config |

---

← [Step 6: Slicer Setup](/docs/software_setup/05-slicer-setup.md) | [Documentation Hub →](/docs)
