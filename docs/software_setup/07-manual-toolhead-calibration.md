# Manual Sensorless Toolhead Calibration for Happy Hare

A manual calibration procedure for the toolhead dimensions used by Happy Hare, intended for setups **without** any toolhead filament sensor. 

These are the parameters you will derive and later enter into `mmu_parameters.cfg`:
- `toolhead_extruder_to_nozzle` — extruder drive gears → internal nozzle shoulder
- `toolhead_entry_to_extruder` — top of the toolhead bowden coupler → extruder drive gears
- `toolhead_residual_filament` — molten material left in the melt zone after a normal unload
- `variable_blade_pos` and `variable_retract_length` — only if you have a toolhead cutter (set in `mmu_macro_vars.cfg`)

`toolhead_sensor_to_nozzle` is not applicable (no sensor) and should be set to the same value as `toolhead_extruder_to_nozzle`

---

## What you need

- A digital calliper or a steel ruler with mm graduations
- A fine, permanent marker (Sharpie ultra-fine) or a sharp scribe
- A couple of short lengths (≈ 300 mm) of fresh, unused filament of the type you normally print with
- Side cutters / flush cutters
- Your printer has the bowden tube disconnectable at the **toolhead entry**

A short reminder before you start: every measurement is a difference between **a reference plane** on the toolhead and **a mark on the filament**. Be religious about always referencing the same physical surface — usually the **top face of the toolhead bowden coupler** (where the bowden tube seats into the push-fit collet). If you reference different surfaces between measurements, your numbers will drift by several mm.

If you have a Belay (or similar tension/compression sensor) on the bowden path, lock or remove it for the whole procedure — its movement will corrupt every measurement.

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

## Step 1 — Measure `toolhead_extruder_to_nozzle` (cold, clean nozzle)

This is the distance from the **extruder drive gears** to the **internal nozzle shoulder** (the flat where the melt chamber narrows into the orifice — *not* the nozzle tip).

1. With the printer **cold** and the extruder empty, disengage the extruder idler so filament can move freely past the drive gears (most extruders have a tension lever or thumbscrew for this).
2. Disconnect the bowden tube at the toolhead entry. Leave the coupler in place.
3. Take a fresh piece of filament with a **square, flush-cut tip**. The squareness of this tip matters — recut with side cutters if the end looks bevelled.
4. Feed the filament **down through the toolhead entry**, through the extruder, and into the hotend until you feel a hard, solid stop. That stop is the internal nozzle shoulder. Push firmly but do not bend the filament — if it buckles, your number will be short.
5. Holding the filament still, mark it precisely level with the **top face of the toolhead coupler** (your reference plane).
6. Withdraw the filament without smearing the mark.
7. With callipers, measure from the **tip** of the filament to the **mark**. Call this distance **A**.

You now have:

> measured length from toolhead coupler → nozzle shoulder = **A**

You can't yet separate that into "entry → extruder" and "extruder → nozzle" — Step 2 does that.

Repeat the push-mark-pull twice more with fresh tips and average the three readings. They should agree within ±0.3 mm. If not, recut more carefully and try again.

---

## Step 2 — Measure `toolhead_entry_to_extruder` (cold)

This is the distance from the **top of the toolhead coupler** to the **extruder drive gears**.

1. Re-engage the extruder idler (so the gears grip the filament).
2. Cut a fresh, square tip on a new piece of filament.
3. Feed the filament down through the toolhead entry. Push **gently** until the tip is just caught by the drive gear teeth — you will feel it bite. **Stop immediately**; do not let the extruder pull it in.
4. Holding the filament still, mark it level with the top face of the coupler.
5. Carefully reverse the extruder a few mm (MOVE the gear backwards, or release the idler) and withdraw the filament with the mark intact.
6. Measure tip → mark with callipers. Call this distance **B**.

You now have:

> `toolhead_entry_to_extruder` = **B**

And by subtraction:

> `toolhead_extruder_to_nozzle` = **A − B**

**These are your first two parameter values. Note them down.**

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
3. Feed it down through the toolhead entry into the extruder and on toward the nozzle. You will hit a soft stop — the cold residual plug — *before* you reach the metal nozzle shoulder. Push with the same firmness as before; you should feel the plug compress slightly then resist.
4. Mark the filament level with the top face of the coupler.
5. Withdraw and measure tip → mark. Call this distance **C**.

Then:

> `toolhead_residual_filament` = **A − C**

(Where **A** is the clean measurement from Step 1.)

Sanity check: residual is normally **1–5 mm** for standard hotends, **3–7 mm** for CHT / high-flow setups. If you get a negative number or > 10 mm, something has shifted in your measurement plane — repeat.

Notes:
- It is normal for **C** to differ slightly between filament types (PETG residual is often ≥ PLA). You can recalibrate per filament if you care.
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

> `variable_blade_pos` = **A - D**


### Setting `variable_retract_length`

A safe starting value is **5 mm shorter than the blade position**:

> `variable_retract_length` = `variable_blade_pos` - `toolhead_residual_filament` − 5

This leaves a 5 mm stub above the cut zone, which is about as aggressive as is safe — shorter stubs reduce purge requirements but risk clogs because you start nibbling at melted filament. If you see clogs after the first few colour changes, increase `variable_retract_length` by 1–2 mm at a time.

---

## Step 6 — Update your config files

Open `mmu_parameters.cfg` and update:

```
toolhead_extruder_to_nozzle: <A − B>
toolhead_entry_to_extruder:  <B>
toolhead_residual_filament:  <A − C>
# toolhead_sensor_to_nozzle stays at its existing value; you have no sensor
```

If you have a cutter, open `mmu_macro_vars.cfg` and update:

```
variable_blade_pos:       <A - D>   # (or A - D + 0.5 with Method B)
variable_retract_length:  <blade_pos − 5>
```

Then `RESTART` (or `FIRMWARE_RESTART` if Klipper requires it).

---

## Step 7 — Sanity check the result

After restarting:

1. Run a real `Tx` change at the start of a small test print. Watch the wipe tower: a clean transition with no blob is the goal.
2. If you see consistent blobbing on the wipe tower, the residual or the extruder-to-nozzle is slightly off — fine tune as the wiki describes via `toolhead_ooze_reduction` (start at 0 and increase by 0.5 mm at a time, positive values shorten the load).

---

## Quick reference

| Step | Filament state | Nozzle temp | Measurement | Yields |
|---|---|---|---|---|
| 1 | Fresh tip, idler off | Cold, clean | tip → mark = **A** | (entry → nozzle shoulder) |
| 2 | Fresh tip, idler on | Cold | tip → mark = **B** | `toolhead_entry_to_extruder` |
| 3 | Load + dirty unload | Hot then cold | — | preparation |
| 4 | Fresh tip, idler off | Cold, dirty | tip → mark = **C** | `toolhead_residual_filament` = A − C |
| 5 | Fresh tip, after cut + SKIP_TIP unload | Cold | tip → mark = **D** | `variable_blade_pos` = D − B |

Derived:

- `toolhead_extruder_to_nozzle` = **A − B**

---

## Common pitfalls

- **Inconsistent reference plane.** Always mark at the same physical surface. The push-fit collet on the coupler often sits a couple of mm above the coupler body — pick one and stick to it.
- **Bevelled filament tips.** A sloppy cut adds 0.5–1 mm of slop to every reading. Cut flush each time.
- **Buckled filament during push.** If filament bends in the bowden or above the extruder, your "stop" is bogus and the number will be short. Use a fresh straight piece, push slowly.
- **Skipping the cold pull.** Hidden residue at the nozzle shoulder will give you a short `toolhead_extruder_to_nozzle` and then a fake-large `toolhead_residual_filament`.
- **Forgetting to subtract B.** Several of the parameters are *from the extruder*, but you're measuring *from the coupler*. The B subtraction is what converts one to the other.

---

← [Step 4: Happy Hare Setup](/docs/software_setup/02-happy-hare-setup.md) | [Documentation Hub →](/docs)
