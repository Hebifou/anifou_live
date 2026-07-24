export function positionTooltip(
  event,
  tooltipWidth = 180,
  tooltipHeight = 110,
  padding = 12
) {
  let x =
    event.clientX + 18;

  let y =
    event.clientY - 18;

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;

  // --------------------------------------------------
  // Right
  // --------------------------------------------------

  if (
    x + tooltipWidth >
    width - padding
  ) {
    x =
      event.clientX -
      tooltipWidth -
      18;
  }

  // --------------------------------------------------
  // Left
  // --------------------------------------------------

  if (x < padding) {
    x = padding;
  }

  // --------------------------------------------------
  // Top
  // --------------------------------------------------

  if (y < padding) {
    y =
      event.clientY +
      18;
  }

  // --------------------------------------------------
  // Bottom
  // --------------------------------------------------

  if (
    y + tooltipHeight >
    height - padding
  ) {
    y =
      height -
      tooltipHeight -
      padding;
  }

  return {
    x,
    y,
  };
}