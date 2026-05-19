# Manual Toolhead Calibration with Two Sensors for Happy Hare

A manual calibration procedure for the toolhead dimensions used by Happy Hare, intended for setups with **two toolhead sensors**: a pre-extruder entry sensor (Happy Hare normally names this `extruder`) **and** a post-extruder toolhead sensor (Happy Hare normally names this `toolhead`). Two sensors means you can capture three reference events on a single filament push, and you can also calibrate `toolhead_sensor_to_nozzle` properly.

These are the parameters you will derive and later enter into `mmu_parameters.cfg`:

- `toolhead_extruder_to_nozzle` — extruder drive gears → internal nozzle shoulder
- `toolhead_entry_to_extruder` — entry sensor trigger point → extruder drive gears
- `toolhead_sensor_to_nozzle` — toolhead sensor trigger point → internal nozzle shoulder
- `toolhead_residual_filament` — molten material left in the melt zone after a normal unload
- `variable_blade_pos` and `variable_retract_length` — only if you have a toolhead cutter (set in `mmu_macro_vars.cfg`)

---

## What you need

- A digital calliper or a steel ruler with mm graduations
- A fine, permanent marker (Sharpie ultra-fine) or a sharp scribe — ideally **two colours**, since you will mark the same piece of filament three times in Step 1
- A couple of short lengths (≈ 300 mm) of fresh, unused filament of the type you normally print with
- Side cutters / flush cutters
- Your printer with the bowden tube disconnectable at the **toolhead entry**
- A way to see sensor state in real time. Any of: a Mainsail/Fluidd tab showing the filament sensors, repeated `QUERY_FILAMENT_SENSOR SENSOR=extruder` / `QUERY_FILAMENT_SENSOR SENSOR=toolhead` commands, or simply listening for the sensor microswitch click if your sensors are mechanical

A short reminder before you start: every measurement is a difference between **a reference plane** on the toolhead and **a mark on the filament**. Be religious about always referencing the same physical surface — usually the **top face of the toolhead bowden coupler** (where the bowden tube seats into the push-fit collet). If you reference different surfaces between measurements, your numbers will drift by several mm.

For context, the diagrams below show the filament geometry the measurements below are characterising — tip cutting on the top, tip forming on the bottom:

<p align="center">
  <img src="https://raw.githubusercontent.com/wiki/moggieuk/Happy-Hare/Blobbing-and-Stringing/Unloading_Tip_Cutting.png" alt="Unloading with tip cutting" width="100%"/>
  <img src="https://raw.githubusercontent.com/wiki/moggieuk/Happy-Hare/Blobbing-and-Stringing/Unloading_Tip_Forming.png" alt="Unloading with tip forming" width="100%"/>
</p>

---

## Step 0 — Cold pull the nozzle

Every "clean" measurement assumes the melt zone is completely empty. Perform a cold pull first (heat, purge, cool to ~90 °C for PLA / ~110 °C for PETG, pull firmly). Inspect the pulled tip — it should come out cleanly shaped to the inside of the nozzle. If it tears, repeat.

If you prefer, run `MMU_COLD_PULL MATERIAL=[nylon|pla|abs|petg]` and follow the prompts.

---

## Step 1 — Three-event push: measure A1, A2 and A3 (cold, clean nozzle)

This single push captures everything except the extruder-gear position. With the nozzle empty and cold, you push fresh filament from the toolhead entry all the way to the nozzle shoulder. You stop briefly and mark the filament **at the coupler top** three times: once when the entry sensor triggers, once when the toolhead sensor triggers, once when the tip hits the nozzle shoulder.

1. With the printer **cold** and the extruder empty, disengage the extruder idler so filament can move freely past the drive gears.
2. Disconnect the bowden tube at the toolhead entry. Leave the coupler in place.
3. Open Mainsail/Fluidd (or whatever shows your sensor state live). Confirm both `extruder` and `toolhead` sensors currently read **not triggered**.
4. Take a fresh piece of filament with a **square, flush-cut tip** (recut if it looks bevelled).
5. Begin feeding the filament **down through the toolhead entry**. Push slowly and steadily.
6. The moment the **entry sensor** flips to triggered, **stop**. Holding the filament still, mark it precisely level with the **top face of the toolhead coupler**. Use one colour. Call this mark **M1**.
7. Continue pushing slowly. The moment the **toolhead sensor** flips to triggered, **stop**. Mark again at the coupler top — ideally in a different colour, or with a double tick so you can tell it apart from M1. Call this mark **M2**.
8. Continue pushing until you feel a hard, solid stop — the internal nozzle shoulder. Mark a third time at the coupler top. Call this **M3**.
9. Withdraw the filament carefully without smearing the marks.
10. With callipers, measure tip → M1, tip → M2 and tip → M3. Call those distances **A1**, **A2** and **A3** respectively.

You now have three coupler-anchored positions on the filament:

> A1 = coupler → entry sensor trigger
>
> A2 = coupler → toolhead sensor trigger
>
> A3 = coupler → nozzle shoulder

Repeat the whole push-mark-pull at least once more with a fresh tip and average. The three values should be repeatable to ±0.3 mm. If A1 jumps around by more than that, your sensor probably has hysteresis — always push **in one direction only** (no back-and-forth) on the calibration run.

---

## Step 2 — Measure B (cold, idler engaged)

This is the extruder gear position, anchored to the same coupler reference.

1. Re-engage the extruder idler.
2. Cut a fresh, square tip on a new piece of filament.
3. Feed the filament down through the toolhead entry. Push **gently** until the tip is just caught by the drive gear teeth — you will feel it bite. **Stop immediately**; do not let the extruder pull it in.
4. Holding the filament still, mark it level with the top face of the coupler.
5. Carefully reverse the extruder a few mm (or release the idler) and withdraw the filament with the mark intact.
6. Measure tip → mark with callipers. Call this distance **B**.

You can now derive three parameters:

> `toolhead_extruder_to_nozzle` = **A3 − B**
>
> `toolhead_entry_to_extruder` = **B − A1**
>
> `toolhead_sensor_to_nozzle` = **A3 − A2**

Sanity check: A2 − B should be a small positive number (the distance from the extruder gears down to the toolhead sensor — typically 5–20 mm depending on toolhead). And `(A2 − B) + (A3 − A2)` must equal `(A3 − B)` — if it doesn't, you've made an arithmetic slip.

**These are your first three parameter values. Note them down.**

---

## Step 3 — Dirty the nozzle (simulate a real unload)

This step prepares for measuring residual filament. Pick the branch that matches your toolhead.

### If you use tip forming (no cutter)

1. Heat the nozzle to your normal print temperature.
2. `MMU_LOAD` (or `Tx`).
3. Manually extrude ~30 mm of filament from the web UI to fully prime the melt zone.
4. `MMU_UNLOAD`.
5. Turn the heater off and wait until the hotend is cold to the touch.

### If you use tip cutting

1. Heat the nozzle to print temperature.
2. `MMU_LOAD` (or `Tx`).
3. Manually extrude ~30 mm.
4. `MMU_UNLOAD SKIP_TIP=1` — this is important; you want the unload **without** the cutting action, so the residual reflects what tip forming would have left.
5. Turn the heater off and let the hotend cool fully.

---

## Step 4 — Measure `toolhead_residual_filament` (cold, dirty nozzle)

The hotend is now cold and contains the frozen plug of residual filament left after a normal unload.

1. Disengage the extruder idler.
2. Cut a fresh, square tip on a new piece of filament.
3. Feed it down through the toolhead entry into the extruder and on toward the nozzle. You will hit a soft stop — the cold residual plug — *before* you reach the metal nozzle shoulder. Push with the same firmness as in Step 1; you should feel the plug compress slightly then resist.
4. Mark the filament level with the top face of the coupler.
5. Withdraw and measure tip → mark. Call this distance **C**.

Then:

> `toolhead_residual_filament` = **A3 − C**

Sanity check: residual is normally **10-20 mm** for standard hotends, **20-30 mm** for CHT / high-flow setups. If you get a negative number or > 40 mm, something has shifted in your measurement plane. Repeat the measurement.

Notes:
- Re-running this measurement on fresh filament after a fresh cold pull and reload is the only way to verify it.

---

## Step 5 — Cutter parameters (skip if you don't have a toolhead cutter)

You will derive `variable_blade_pos` (distance from extruder gears to the blade) and from it a safe `variable_retract_length`.

### Method A — full procedure (most accurate)

1. `MMU_LOAD` (or `Tx`) to load filament with the nozzle hot.
2. Turn the heater off and wait until cold.
3. Manually press the cut lever to cut the filament inside the toolhead.
4. `MMU_UNLOAD SKIP_TIP=1` — this ejects everything **above** the cut and leaves the short stub from extruder gears → blade still inside the toolhead.
5. Disengage the extruder idler. Cut a fresh, square tip on a new piece of filament.
6. Feed it down through the toolhead entry until it stops against the stub. Mark at the top face of the coupler.
7. Withdraw and measure tip → mark. Call this distance **D**.

Then:

> `variable_blade_pos` = **D − B**

### Setting `variable_retract_length`

A safe starting value is **5 mm shorter than the blade position, with residual subtracted**:

> `variable_retract_length` = `variable_blade_pos` − `toolhead_residual_filament` − 5

This leaves a 5 mm stub above the cut zone, which is about as aggressive as is safe — shorter stubs reduce purge requirements but risk clogs because you start nibbling at melted filament. If you see clogs after the first few colour changes, increase `variable_retract_length` by 1–2 mm at a time.

---

## Step 6 — Update your config files

Open `mmu_parameters.cfg` and update:

```
toolhead_extruder_to_nozzle: <A3 − B>
toolhead_entry_to_extruder:  <B − A1>
toolhead_sensor_to_nozzle:   <A3 − A2>
toolhead_residual_filament:  <A3 − C>
```

If you have a cutter, open `mmu_macro_vars.cfg` and update:

```
variable_blade_pos:       <D − B>
variable_retract_length:  <blade_pos − residual − 5>
```

Then `RESTART` (or `FIRMWARE_RESTART` if Klipper requires it).

---

## Step 7 — Sanity check the result

After restarting, you have an extra trick available because of your sensors:

1. Run `MMU_TEST_LOAD` (or perform a `Tx` change) and watch the console. With correctly set `toolhead_entry_to_extruder` and `toolhead_sensor_to_nozzle`, Happy Hare should report the entry and toolhead sensors triggering at exactly the expected filament positions. Discrepancies > 1 mm point at one of A1/A2/A3 being off.
2. Run a real `Tx` change at the start of a small test print. Watch the wipe tower: a clean transition with no blob is the goal.
3. If you see consistent blobbing on the wipe tower, the residual or the extruder-to-nozzle is slightly off — fine tune as the wiki describes via `toolhead_ooze_reduction` (start at 0 and increase by 0.5 mm at a time, positive values shorten the load).

---

## Quick reference

| Step | Filament state | Nozzle temp | Event | Measurement |
|---|---|---|---|---|
| 1a | Fresh tip, idler off | Cold, clean | Entry sensor triggers | tip → M1 = **A1** |
| 1b | Same push | Cold, clean | Toolhead sensor triggers | tip → M2 = **A2** |
| 1c | Same push | Cold, clean | Nozzle shoulder hit | tip → M3 = **A3** |
| 2 | Fresh tip, idler on | Cold | Gears bite | tip → mark = **B** |
| 3 | Load + dirty unload | Hot then cold | — | preparation |
| 4 | Fresh tip, idler off | Cold, dirty | Residual plug stops tip | tip → mark = **C** |
| 5 | Fresh tip, after cut + SKIP_TIP unload | Cold | Stub stops tip | tip → mark = **D** |

Derived:

- `toolhead_extruder_to_nozzle` = **A3 − B**
- `toolhead_entry_to_extruder` = **B − A1**
- `toolhead_sensor_to_nozzle` = **A3 − A2**
- `toolhead_residual_filament` = **A3 − C**
- `variable_blade_pos` = **D − B**
- `variable_retract_length` = `variable_blade_pos` − `toolhead_residual_filament` − 5

---

## Common pitfalls

- **Inconsistent reference plane.** Always mark at the same physical surface. The push-fit collet on the coupler often sits a couple of mm above the coupler body — pick one and stick to it.
- **Bevelled filament tips.** A sloppy cut adds 0.5–1 mm of slop to every reading. Cut flush each time.
- **Sensor hysteresis.** Optical and hall sensors trigger at slightly different positions on the way in vs the way out. Always push in one direction during the calibration push. If you back up to "re-check", start over with a fresh tip.
- **Marking too slowly.** If you stop pushing and *then* the sensor catches up to its trigger position, your mark will be late. Practice the push once before marking — when you see the sensor flip, mark immediately and stop simultaneously.
- **Buckled filament during push.** If filament bends in the bowden or above the extruder, your "stop" is bogus and the number will be short. Use a fresh straight piece, push slowly.
- **Skipping the cold pull.** Hidden residue at the nozzle shoulder will give you a short `toolhead_extruder_to_nozzle` and then a fake-large `toolhead_residual_filament`.
- **Forgetting to subtract B.** Several of the parameters are *from the extruder*, but you're measuring *from the coupler*. The B subtraction is what converts one to the other.

---

← [Step 4: Happy Hare Setup](/docs/software_setup/02-happy-hare-setup.md) | [Documentation Hub →](/docs)
