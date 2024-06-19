/// <reference path="../../udbscript.d.ts" />

`#version 4`;

`#name Global Brightness`;

`#description Change global brightness by a relative amount by iterating over all the sectors and adding or subtracting a constant from the brightness`;

// Borrowed heavily from "Delete Sector Tag" script

// Get the selected sectors
let sectors = UDB.Map.getSelectedSectors();

// If no sectors were selected get all sectors
if(sectors.length == 0)
    sectors = UDB.Map.getSectors();

// Prepare to ask the user for the tag to delete
let qo = new UDB.QueryOptions();
qo.addOption('relative_brightness', 'Relative Brightness Change', 1, 0);

// Ask for the relative brightness, abort script of cancel was pressed
if(!qo.query())
    UDB.die('Script aborted');

// Abort when tag was set to 0
if(qo.options.relative_brightness == 0)
    UDB.die("Relative Brightness can't be 0");

const relative_brightness = qo.options.relative_brightness

function adjustBrightness(sector) {
  const brightness = sector.brightness;
  let new_brightness = brightness + relative_brightness;
  if (new_brightness > 255) {
    new_brightness = 255;
  } else if (new_brightness < 0) {
    new_brightness = 0;
  }
  sector.brightness = new_brightness;
}

sectors.forEach(adjustBrightness);
