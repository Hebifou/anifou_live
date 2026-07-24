import * as d3 from "d3";

export function drawPoints({
  svg,
  svgRef,
  data,
  x,
  y,
  layout,
  selectedEvent,
  setSelectedEvent,
  setTooltip,
}) {
  const {
    margin,
    height,
  } = layout;

  // --------------------------------------------------
  // Selected Event Indicator
  // --------------------------------------------------

  if (selectedEvent) {
    const active = data.find(
      (d) =>
        d.event ===
        selectedEvent.title
    );

    if (active) {
      svg
        .append("line")
        .attr(
          "class",
          "selected-event-line"
        )
        .attr(
          "x1",
          x(active.date)
        )
        .attr(
          "x2",
          x(active.date)
        )
        .attr(
          "y1",
          margin.top
        )
        .attr(
          "y2",
          height - margin.bottom
        )
        .attr("stroke", "#151515")
        .attr("stroke-width", 1)
        .attr(
          "stroke-dasharray",
          "4 4"
        )
        .attr("opacity", 0.18);
    }
  }

  // --------------------------------------------------
  // Points
  // --------------------------------------------------

  svg
    .selectAll(".growth-point")
    .data(data)
    .join("circle")
    .attr(
      "class",
      "growth-point"
    )
    .attr(
      "cx",
      (d) => x(d.date)
    )
    .attr(
      "cy",
      (d) => y(d.followers)
    )
    .attr(
      "r",
      (d) =>
        selectedEvent?.title ===
        d.event
          ? 5
          : 2.5
    )
    .attr("fill", "#151515")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .attr(
      "opacity",
      (d) => {
        if (!selectedEvent) {
          return 0.95;
        }

        return selectedEvent.title ===
          d.event
            ? 1
            : 0.35;
      }
    )
    .style("cursor", "pointer")

    .on(
      "mouseenter",
      function (event, d) {
        const {
          left,
          top,
          width,
          height,
        } =
          svgRef.current.getBoundingClientRect();

        const tooltipWidth = 180;
        const tooltipHeight = 110;

        let xPos =
          event.clientX -
          left +
          18;

        let yPos =
          event.clientY -
          top -
          18;

        // --------------------------------------------------
        // Prevent overflow (right)
        // --------------------------------------------------

        if (
          xPos + tooltipWidth >
          width - 8
        ) {
          xPos =
            event.clientX -
            left -
            tooltipWidth -
            18;
        }

        // --------------------------------------------------
        // Prevent overflow (top)
        // --------------------------------------------------

        if (yPos < 8) {
          yPos =
            event.clientY -
            top +
            18;
        }

        // --------------------------------------------------
        // Prevent overflow (bottom)
        // --------------------------------------------------

        if (
          yPos + tooltipHeight >
          height - 8
        ) {
          yPos =
            height -
            tooltipHeight -
            8;
        }

        setTooltip({
          ...d,
          x: xPos,
          y: yPos,
        });

        d3.select(this)
          .raise()
          .transition()
          .duration(180)
          .ease(d3.easeCubicOut)
          .attr("r", 6.5)
          .attr("opacity", 1);
      }
    )

    .on(
      "mousemove",
      function (event, d) {
        const {
          left,
          top,
          width,
          height,
        } =
          svgRef.current.getBoundingClientRect();

        const tooltipWidth = 180;
        const tooltipHeight = 110;

        let xPos =
          event.clientX -
          left +
          18;

        let yPos =
          event.clientY -
          top -
          18;

        if (
          xPos + tooltipWidth >
          width - 8
        ) {
          xPos =
            event.clientX -
            left -
            tooltipWidth -
            18;
        }

        if (yPos < 8) {
          yPos =
            event.clientY -
            top +
            18;
        }

        if (
          yPos + tooltipHeight >
          height - 8
        ) {
          yPos =
            height -
            tooltipHeight -
            8;
        }

        setTooltip({
          ...d,
          x: xPos,
          y: yPos,
        });
      }
    )

    .on(
      "mouseleave",
      function (_, d) {
        setTooltip(null);

        d3.select(this)
          .transition()
          .duration(180)
          .ease(d3.easeCubicOut)
          .attr(
            "r",
            selectedEvent?.title ===
              d.event
              ? 5
              : 2.5
          )
          .attr(
            "opacity",
            !selectedEvent
              ? 0.95
              : selectedEvent.title ===
                  d.event
                ? 1
                : 0.35
          );
      }
    )

    .on(
      "click",
      (_, d) => {
        if (
          selectedEvent?.title ===
          d.event
        ) {
          setSelectedEvent(null);
        } else {
          setSelectedEvent({
            title: d.event,
          });
        }
      }
    );

  // --------------------------------------------------
  // Selected Point Ring
  // --------------------------------------------------

  if (selectedEvent) {
    const active = data.find(
      (d) =>
        d.event ===
        selectedEvent.title
    );

    if (active) {
      svg
        .append("circle")
        .attr(
          "cx",
          x(active.date)
        )
        .attr(
          "cy",
          y(active.followers)
        )
        .attr("r", 8)
        .attr("fill", "none")
        .attr("stroke", "#151515")
        .attr("stroke-width", 1.4)
        .attr("opacity", 0.35);
    }
  }
}