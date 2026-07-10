# EMU – Expandable Multi-material Unit Sourcing Options

## Sourcing Options
As EMU is using off the shelf hardware, you have 
two options to source the required components to build your unit: self sourcing and kits.

### EMU Kits
We require any officially authorised kits to **undergo a certification process**. During this process we test:
1. Completeness of the BOM
2. Fit of the mechanical parts
3. Level of effort required to complete the build
4. Convenience features for the user
5. Overall kit refinement

The kits are then classified into tiers, **Platinum**, **Gold**, **Silver**, **Bronze** as per the table below. 

This reflects the level of maturity of the kits and the overall user experience you should expect when ordering one.

It also allows us to offer feedback to the vendors to ensure the kits can result in a reliable unit and that any trade-offs are known up front to avoid buyer disappointment. 

### Certified Vendors List
<table style="width: 100%;">
  <tr>
    <th style="width: 10%;">Vendor</th>
    <th style="width: 30%;">Purchase Link</th>
    <th style="width: 30%;">Classification Tier</th>
    <th style="width: 30%;">Kit Summary</th>
  </tr>
  <tr>
    <td><strong>Vano3dla Maker Store</strong></td>
    <td><a href="https://www.aliexpress.com/item/1005012001238187.html">2 lane and 5 lane kit</a></td>
    <td>
      Platinum
    </td>
    <td>
      Platinum tier kit with all optional PCB options and exclusive PCB options included. High quality components, with exceptional fit and finish. Active support by the vendor in the Discord communities. <br> Initial batch of kits had the DIn - DOut silk screen on the Neopixel LEDs swapped around. 
    </td>
  </tr>
  <tr>
  <td><strong>DREMC (Vano3dla reseller)</strong></td>
  <td><a href="https://store.dremc.com.au/products/emu-the-expandable-multi-material-unit-hardware-kit">2 lane and 5 lane kit</a><br>Local Australian Stockist</td>
  <td>
    Platinum
  </td>
  <td>
    Platinum tier kit with all optional PCB options and exclusive PCB options included. High quality components, with exceptional fit and finish. Active support by the vendor in the Discord communities. <br> Initial batch of kits had the DIn - DOut silk screen on the Neopixel LEDs swapped around. 
  </td>
  </tr>
  <tr>
    <td><strong>onetwo3D</strong></td>
    <td><a href="https://www.onetwo3d.co.uk/product/emu-expandable-multi-material-unit-kit/">EMU base kit + lane kit(s)</a><br>Local UK Stockist</td>
    <td>
      Pending validation
    </td>
    <td>
      Modular purchase model: buy one Base Kit per EMU system, then add one Lane Kit per lane required. Listing states the kit includes core hardware / electronics / wiring / connectors.<br><br>Controller boards are sold separately, also stocked by onetwo3D.<br>(Printed parts not included)
    </td>
  </tr>
    <tr>
    <td><strong>Triangle Lab /</strong><br><strong>BLV</strong></td>
    <td><a href="https://aliexpress.com/item/1005012037255888.html">5 lane kit (trianglelab)</a>
    <br><br>
    <a href="https://aliexpress.com/item/1005012052899600.html">5 lane kit (BLV)</a><br><br>
      <a href="https://trianglelab.net/products/emu-5-lane-kit">5 lane kit (TL direct)</a>
    </td>
    <td>
      Silver
    </td>
    <td>
    Good quality core components kit requiring some additional wiring and assembly effort. Kit specifics:
    <ol>
      <li>⚠️ PRE-ASSEMBLED JST PLUGS: Take care to verify red and black wire locations. Initial shipments have these two wires swapped.</li>
      <li>Front switch PCB LED out wire is 300mm instead of 600mm. If using the Solo Lane Board, this is correct. If using an EBB, the user will need one additional WAGO, replacement of the 300mm LED out wire with a 600mm wire, or to solder the 300mm LED out wire to the 300mm LED in wire of the Hatch PCB.</li>
      <li>PCBs require soldering of the JST headers. All required JST headers and wires to assemble the kit are included.</li>
      <li>Wires are pre-crimped and assembled on the Box/front LED PCB connector side. The board side is uncrimped, but JST and Dupont crimps and plugs are provided. (See warning in point 1)</li>
      <li>WAGO alternatives are used. An alternative holder is required to be printed; the file is included in the usermod directory.</li>
      <li>Clear panel is 1.2mm thick. It is easier to assemble into place, with no expected impact on air-tightness.</li>
      <li>Sampled kit panel was 344mm instead of 343mm in length. Ensure the lid is correctly shrinkage compensated.</li>
      <li>Initial kits contain a Trianglelab-specific stepper. It provides higher torque at low speeds versus the BOM stepper, for example during printing, although maximum speed is limited to approximately 375mm/s. The stepper is planned to be swapped with the OMC BOM stepper in the future.</li>
      <li>One-way bearing and shaft, although hollow, are BOM-equivalent and showed correct, smooth motion.</li>
      <li>Stamped discs are included instead of demagnetised magnets for the Filamentalist sensors. These are functionally and dimensionally equivalent.</li>
      <li>Sampled kit did not include the M3x12 BHCS, or SHCS alternative. Subsequent kits should have this corrected.</li>
    </ol>
    </td>
  </tr>
<table>

### Controller Boards
In addition to the kit of your choice, one controller board per lane is required.
- **Recommended:** [Solo lane board (SLB)](https://www.aliexpress.com/item/1005012025112049.html) - significantly simplifies wiring of the individual units.
- **Alternatively:** An EBB 42 or EBB 36 is also functional on the unit, with a bit more effort on crimping the necessary connectors.

### Certification Tiers
<table style="width: 100%;">
  <tr>
    <th style="width: 12%;">Tier</th>
    <th style="width: 18%;">User Experience</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><strong>Platinum</strong></td>
    <td>The highest quality kit for the best user experience</td>
    <td>
      • It includes all core and optional BOM components at their highest possible quality with no tradeoffs.<br>
      • The mechanical components have excellent fit with limited/no re-work required by the end user.<br>
      • The kit includes all optional extras (PCB hatch boards, Eject button multi-LED board). Kit includes the Proportional Sync Feedback sensor and any additional PCBs that the kit vendor deems appropriate to ease assembly (eg. cable entry board)<br>
      • Wiring is pre-cut and crimped according to the universal wiring kit specifications / wiring guide. This means no crimping when using JST capable boards and limited crimping required when using EBB42/36 Gen 1 boards.<br>
      • All additional crimps and connectors as specified in the BOM are included in the kit enabling the widest array of boards to be used.
    </td>
  </tr>
  <tr>
    <td><strong>Gold</strong></td>
    <td>A high quality kit offering a good user experience</td>
    <td>
      • It includes all core and optional BOM components, with only minor tradeoffs in part selection where these do not materially affect functionality, reliability, or the overall build experience.<br>
      • The mechanical components have good fit, with potentially only minor re-work or adjustment required by the end user during assembly (eg. heat treating the one way bearing)<br>
      • The kit includes all optional extras (PCB hatch boards, Eject button multi-LED board). The Proportional Sync Feedback sensor may be omitted in lieu off a dual switch EMU Sync.<br>
      • Wiring is pre-cut and crimped according to the universal wiring kit specifications / wiring guide. This means no crimping when using JST capable boards and limited crimping required when using EBB42/36 Gen 1 boards.<br>
      • All additional crimps and connectors as specified in the BOM are included in the kit enabling the widest array of boards to be used..
    </td>
  </tr>
  <tr>
    <td><strong>Silver</strong></td>
    <td>A functional kit with a good but less refined user experience. Suitable for experienced builders who are comfortable with some additional build effort.</td>
    <td>
      • It includes the core BOM items required to complete a working build, but some optional extras or higher quality component choices may be omitted (eg. use of hollow steel tubes vs. solid, use of alternative stepper motors).<br>
      • The mechanical components are generally usable and will result in a functional build, but moderate re-work or adjustment may be required during assembly (eg. heat treating the one way bearing, de-magnetising the magnets manually).<br>
      • The kit may not include all optional extras, ie some of the PCBs may be omitted or come partly assembled, requiring the user to solder the JST connectors.<br>
      • Wiring may be only partially prepared, or supplied in bulk lengths that require the user to measure, cut, strip, and crimp a meaningful portion of the harness.<br>
      • Kit may omit some of the board connectors from the kit, requiring the user to supply their own JST/Dupont connectors to match their board selection
    </td>
  </tr>
  <tr>
    <td><strong>Bronze</strong></td>
    <td>A basic, barebones kit intended for the budget conscious users who are comfortable with the additional effort and extra troubleshooting that may be required. This tier represents the lowest level of maturity, completeness, and convenience.</td>
    <td>
      • It includes the core BOM items required to complete a working build, with lower cost substitutions present. There is the chance that some minor components may require the user to swap them during assembly due to tolerance/fitment issues (eg. magnets too big, rubber bands not precisely cut to fit the wheels).<br>
      • Some BOM items may not come prepared, ready for assembly - eg. panels may not be pre-cut to specification, instead supplied as larger sheets.<br>
      • PCB add-ons are not included, with the kit being a basic, printed only components build.<br>
      • Wiring is typically not pre-cut or pre-crimped, and the user should expect to complete most or all harness preparation themselves.<br>
      • Kit may omit some of the board connectors from the kit, requiring the user to supply their own JST/Dupont connectors to match their board selection
    </td>
  </tr>
</table>

**Manufacturers:** If you want to be included, please contact us. We are happy to validate your kit/parts, discuss licensing terms and then add you to the list.

### Self sourcing
While kits make sourcing convenient, the EMU can also be fully self sourced using [the provided Bill Of Materials](https://docs.google.com/spreadsheets/d/1jYJXBgpc_iLDfC17fC2LTYKrSEy5ocPbGEQ_EEOGCvI).

## Recommended Upgrades
While entirely optional, the below upgrades are highly recommended. 
1. [PCB hatch boards](/PCB%20(recommended%20options)/hatch_board) - simplifies wiring, sealing of the box and reduces soldering need.
2. [Eject button multi-LED PCB](/PCB%20(recommended%20options)/multi_led_button) - simplifies wiring and displays animated effects when loading / unloading filament.
3. [Proportional Sync Feedback Sensor](https://www.aliexpress.com/item/1005010470743517.html) - allows for clog, tangle detection and more accurate synchronisation between the EMU and the extruder.
4. [Input / Output (IO) Board](https://www.aliexpress.com/item/1005011529532141.html) - removes need to solder the XT30 2+2 and JST connector and simplifies wiring of the base IO.

---

← [Documentation Hub](/docs) | [Step 2: Printing, Assembly and Wiring →](/docs/assembly_wiring)
