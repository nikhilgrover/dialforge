import type { WatchBuild, CompatibilityReport, CompatibilityIssue, DialFeetPosition } from '../types/watch';

export function checkCompatibility(build: WatchBuild): CompatibilityReport {
  const issues: CompatibilityIssue[] = [];

  const {
    movement,
    case: watchCase,
    dial,
    hands,
    secondsAccent,
    bezelInsert,
    rotor,
    spacer,
    strap,
  } = build;

  // 1. Movement <-> Hands Pinion Hole Sizes
  if (movement && hands) {
    const mHoles = movement.handHoleSizes;
    const hHoles = hands.handHoleSizes;

    const hourMatch = Math.abs(mHoles.hour - hHoles.hour) < 0.05;
    const minMatch = Math.abs(mHoles.minute - hHoles.minute) < 0.05;
    const secMatch = Math.abs(mHoles.second - hHoles.second) < 0.05;

    if (!hourMatch || !minMatch || !secMatch) {
      issues.push({
        id: 'hand-hole-mismatch',
        severity: 'error',
        title: 'Hand Arbor Hole Size Mismatch',
        description: `The selected hands have hole sizes (${hHoles.hour}/${hHoles.minute}/${hHoles.second}mm), but the ${movement.caliber} requires (${mHoles.hour}/${mHoles.minute}/${mHoles.second}mm). The hands will either not press on or fall off loose.`,
        affectedComponents: ['movement', 'hands'],
        suggestedFix: `Select hands manufactured specifically for ${movement.family} movements (e.g. ${movement.movementType.includes('quartz') ? 'VH31 quartz hands' : 'Seiko NH automatic hands'}).`
      });
    }

    // GMT hand check
    if (movement.hasGmt && !hHoles.gmt) {
      issues.push({
        id: 'missing-gmt-hand',
        severity: 'warning',
        title: 'Missing 24-Hour GMT Hand',
        description: `The ${movement.caliber} movement features a 24-hour GMT hand post (2.20mm diameter), but the selected hand set only has 3 hands.`,
        affectedComponents: ['movement', 'hands'],
        suggestedFix: 'Select a 4-piece GMT hand set with a 2.20mm hour pinion to utilize the GMT complication.'
      });
    } else if (!movement.hasGmt && hHoles.gmt) {
      issues.push({
        id: 'unneeded-gmt-hand',
        severity: 'error',
        title: 'Incompatible 4-Piece GMT Hand Set',
        description: `The selected hand set includes a 24-hour GMT hand, but ${movement.caliber} is a 3-hand movement with no fourth pinion post.`,
        affectedComponents: ['movement', 'hands'],
        suggestedFix: 'Choose a standard 3-hand set (Hour, Minute, Seconds).'
      });
    }
  }

  // 1b. Seconds Hand Accent hole size
  if (movement && secondsAccent) {
    const mSecHole = movement.handHoleSizes.second;
    if (Math.abs(secondsAccent.holeSize - mSecHole) > 0.03) {
      issues.push({
        id: 'seconds-accent-mismatch',
        severity: 'error',
        title: 'Custom Seconds Hand Pinion Mismatch',
        description: `The custom ${secondsAccent.name} has a ${secondsAccent.holeSize}mm hole, but ${movement.caliber} has a ${mSecHole}mm second pinion arbor.`,
        affectedComponents: ['movement', 'seconds-accent'],
        suggestedFix: `Choose a seconds hand with a ${mSecHole}mm post.`
      });
    }
  }

  // 2. Movement <-> Case Compatibility & Spacers
  if (movement && watchCase) {
    const isQuartz = movement.movementType.startsWith('quartz');
    const isNHCase = watchCase.nativeMovementFamily === 'NH';

    if (isQuartz && isNHCase) {
      if (!spacer) {
        issues.push({
          id: 'missing-movement-spacer',
          severity: 'error',
          title: 'Movement Casing Spacer Ring Required',
          description: `The ${watchCase.name} has a 27.4mm internal cavity designed for NH automatics (~5.32mm thick). The ${movement.caliber} quartz caliber is 23.7mm in diameter and 3.45mm thick. Without a casing ring, the movement will rattle and the stem will not center in the tube.`,
          affectedComponents: ['movement', 'case'],
          suggestedFix: 'Add a "VH31-to-NH35 Case Casing Spacer Ring" to your build.',
          requiresItem: {
            category: 'spacer',
            name: 'VH31 to NH35 Case Spacer Ring'
          }
        });
      } else {
        issues.push({
          id: 'spacer-active',
          severity: 'info',
          title: 'Movement Casing Spacer Ring Configured',
          description: `The ${spacer.name} successfully adapts the ${movement.caliber} quartz into the ${watchCase.name}. Stem alignment and caseback tension are secured.`,
          affectedComponents: ['movement', 'case', 'spacer']
        });
      }
    }
  }

  // 3. Case <-> Dial Diameter Fit
  if (watchCase && dial) {
    if (Math.abs(dial.diameterMm - watchCase.dialDiameterFitMm) > 0.5) {
      issues.push({
        id: 'dial-diameter-mismatch',
        severity: 'error',
        title: 'Dial Diameter Incompatible with Case',
        description: `The ${watchCase.name} is machined for a ${watchCase.dialDiameterFitMm}mm dial, but the selected ${dial.name} is ${dial.diameterMm}mm. It will either not fit inside the case or leave an unsightly gap around the chapter ring.`,
        affectedComponents: ['case', 'dial'],
        suggestedFix: `Select a dial matching the ${watchCase.dialDiameterFitMm}mm case aperture specification.`
      });
    }
  }

  // 4. Dial Feet Alignment & Crown Position
  if (watchCase && dial) {
    const crownPos = watchCase.crownPosition as DialFeetPosition;
    const hasMatchingFeet = dial.dialFeetPositions.includes(crownPos);

    if (!hasMatchingFeet && dial.dialFeetPositions.length > 0 && !dial.dialFeetPositions.includes('none')) {
      issues.push({
        id: 'dial-feet-misaligned',
        severity: 'warning',
        title: 'Dial Feet Misaligned with Case Crown Position',
        description: `The case crown is at ${watchCase.crownPosition}:00, but this dial only has pre-soldered feet for ${dial.dialFeetPositions.join(', ')}:00. If installed directly, the dial will be rotated askew.`,
        affectedComponents: ['case', 'dial'],
        suggestedFix: 'Snip off the pre-attached dial feet using flush cutters and secure the dial to the movement using adhesive Dial Dots.',
        requiresItem: {
          category: 'tools',
          name: 'Adhesive Dial Dots'
        }
      });
    }

    // Dial on quartz movement note
    if (movement && movement.movementType.startsWith('quartz') && dial.dialFeetPositions.length > 0 && !dial.dialFeetPositions.includes('none')) {
      issues.push({
        id: 'quartz-dial-feet-note',
        severity: 'warning',
        title: 'Quartz Dial Foot Mounting Note',
        description: `Aftermarket dials are manufactured with feet spaced for mechanical Seiko movements. For a ${movement.caliber} build, dial feet must be snipped and secured with dial dots.`,
        affectedComponents: ['movement', 'dial'],
        suggestedFix: 'Clip dial feet flush and use adhesive dial dots for mounting.'
      });
    }
  }

  // 5. Movement <-> Date Window Alignment & Ghost Date
  if (movement && dial) {
    if (movement.hasDate && dial.dateWindow === 'none') {
      issues.push({
        id: 'ghost-date-position',
        severity: 'warning',
        title: 'Ghost Date Click Present',
        description: `The ${movement.caliber} movement includes a date complication, but the selected dial has no date window. Pulling the crown to Position 1 will have an empty "ghost click" with no visible function.`,
        affectedComponents: ['movement', 'dial'],
        suggestedFix: 'This is 100% mechanically safe. To eliminate the ghost click, select an NH38 (true time-only) movement, or choose a dial with a date window.'
      });
    } else if (!movement.hasDate && dial.dateWindow !== 'none') {
      issues.push({
        id: 'empty-date-window',
        severity: 'error',
        title: 'Empty Date Window Exposing Movement Plate',
        description: `The dial features a date cut-out at ${dial.dateWindow}:00, but ${movement.caliber} is a time-only movement without a date wheel. The bare metal movement plate will be visible through the window.`,
        affectedComponents: ['movement', 'dial'],
        suggestedFix: 'Choose a sterile / no-date dial, or switch to a date-capable movement like NH35.'
      });
    }
  }

  // 6. NH34 GMT Hand Stack Clearance vs Crystal
  if (movement && watchCase) {
    if (movement.caliber === 'NH34' && watchCase.crystalType === 'flat-sapphire') {
      issues.push({
        id: 'nh34-crystal-collision',
        severity: 'error',
        title: 'NH34 GMT Hand Stack Height Collision Risk',
        description: `The NH34 GMT movement has a taller hand stack (5.70mm total height) to accommodate the fourth 24-hr pinion. In a case with a flat sapphire crystal, the seconds hand will collide with the underside of the crystal.`,
        affectedComponents: ['movement', 'case'],
        suggestedFix: 'Select a case with a Double-Domed or Top-Hat sapphire crystal, which provides the necessary 1.6mm+ hand clearance.'
      });
    }
  }

  // 7. Rotor <-> Movement & Caseback
  if (rotor) {
    if (movement && movement.movementType.startsWith('quartz')) {
      issues.push({
        id: 'rotor-on-quartz',
        severity: 'error',
        title: 'Custom Rotor Incompatible with Quartz Movement',
        description: `Winding rotors are weighted mechanical pendulums used exclusively on automatic movements. The ${movement.caliber} is a battery-powered quartz movement and cannot accept a rotor.`,
        affectedComponents: ['movement', 'rotor'],
        suggestedFix: 'Remove the custom rotor from this quartz build.'
      });
    } else if (watchCase && watchCase.casebackType === 'solid') {
      issues.push({
        id: 'rotor-hidden-by-caseback',
        severity: 'warning',
        title: 'Custom Rotor Concealed by Solid Caseback',
        description: `You selected a decorated rotor (${rotor.name}), but the case features a solid stainless steel caseback. The rotor will be completely hidden from view.`,
        affectedComponents: ['case', 'rotor'],
        suggestedFix: 'Choose an open exhibition sapphire caseback to showcase your custom rotor.'
      });
    }
  }

  // 8. Strap <-> Case Lug Width Match
  if (strap && watchCase) {
    if (strap.lugWidthMm !== watchCase.lugWidthMm) {
      issues.push({
        id: 'lug-width-mismatch',
        severity: 'error',
        title: 'Strap Lug Width Mismatch',
        description: `The ${watchCase.name} has a ${watchCase.lugWidthMm}mm lug width, but the selected strap is ${strap.lugWidthMm}mm. It will not fit into the lugs properly.`,
        affectedComponents: ['case', 'strap'],
        suggestedFix: `Select a strap or bracelet with a ${watchCase.lugWidthMm}mm width.`
      });
    }
  }

  // 9. Bezel Insert <-> Case
  if (watchCase) {
    if (watchCase.hasRotatingBezel && !bezelInsert) {
      issues.push({
        id: 'missing-bezel-insert',
        severity: 'warning',
        title: 'Unfilled Bezel Channel',
        description: 'This diver case has a rotating bezel mechanism, but no bezel insert is selected. The bezel will feature an empty recessed groove.',
        affectedComponents: ['case'],
        suggestedFix: 'Select a ceramic or aluminum bezel insert matching your case dimensions.'
      });
    } else if (!watchCase.hasRotatingBezel && bezelInsert) {
      issues.push({
        id: 'bezel-insert-not-applicable',
        severity: 'error',
        title: 'Bezel Insert Incompatible with Fixed Bezel Case',
        description: `The ${watchCase.name} has a smooth fixed bezel with no channel to mount a bezel insert.`,
        affectedComponents: ['case', 'bezel-insert'],
        suggestedFix: 'Remove the bezel insert or switch to a diver-style case.'
      });
    }
  }

  // 10. Quartz Battery Information
  if (movement && movement.movementType.startsWith('quartz') && movement.batteryModel) {
    issues.push({
      id: 'quartz-battery-info',
      severity: 'info',
      title: `Quartz Battery Required (${movement.batteryModel})`,
      description: `The ${movement.caliber} is powered by a silver oxide ${movement.batteryModel} cell (~${movement.batteryLifeYears || 3} year battery life). Bare movements from suppliers usually ship without a battery installed.`,
      affectedComponents: ['movement']
    });
  }

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');

  const requiredParts = [movement, watchCase, dial, hands];
  const isAssembled = requiredParts.every(Boolean);

  return {
    isAssembled,
    isValid: errors.length === 0,
    errorCount: errors.length,
    warningCount: warnings.length,
    infoCount: info.length,
    issues
  };
}
