import * as d3 from "d3";

import { formatNumber } from "../../../utils/dashboard/formatters";

export function drawEvents({
  svg,
  svgRef,
  data,
  x,
  timelineY,
  layout,
  selectedEvent,
  selectEvent,
  setTooltip,
}) {
  const { width } = layout;

  const events = svg
    .append("g")
    .attr("class", "timeline-events");

  data.forEach((event, index) => {
    const eventX = x(event.date);

    // --------------------------------------------------
    // Connection Line
    // --------------------------------------------------

    const connection = events
      .append("line")
      .attr("x1", eventX)
      .attr("x2", eventX)
      .attr("y1", timelineY)
      .attr("y2", timelineY)
      .attr("stroke", "#d3d3ce")
      .attr("stroke-width", 1.2)
      .attr("opacity", 0.9);

    connection
      .transition()
      .delay(index * 45)
      .duration(350)
      .ease(d3.easeCubicOut)
      .attr("y2", timelineY - 90);

    // --------------------------------------------------
    // Dot
    // --------------------------------------------------

    const circle = events
      .append("circle")
      .attr("cx", eventX)
      .attr("cy", timelineY)
      .attr("r", 0)
      .attr("fill", "#151515")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr(
        "opacity",
        !selectedEvent
          ? 0.92
          : selectedEvent?.title === event.title
            ? 1
            : 0.25
      )
      .style("cursor", "pointer");

    circle
      .transition()
      .delay(index * 45)
      .duration(450)
      .ease(d3.easeBackOut)
      .attr(
        "r",
        selectedEvent?.title === event.title
          ? 8
          : 6
      );

    // --------------------------------------------------
    // Selected Ring
    // --------------------------------------------------

    if (selectedEvent?.title === event.title) {
      events
        .append("circle")
        .attr("cx", eventX)
        .attr("cy", timelineY)
        .attr("r", 11)
        .attr("fill", "none")
        .attr("stroke", "#151515")
        .attr("stroke-width", 1.4)
        .attr("opacity", 0.3);
    }

    // --------------------------------------------------
    // Hover
    // --------------------------------------------------

    circle
      .on(
        "mouseenter",
        function (mouseEvent) {
          connection
            .transition()
            .duration(150)
            .attr("stroke", "#bdbdb7")
            .attr("stroke-width", 1.5)
            .attr("opacity", 1);

          d3.select(this)
            .raise()
            .transition()
            .duration(180)
            .ease(d3.easeCubicOut)
            .attr(
              "r",
              selectedEvent?.title === event.title
                ? 10
                : 9
            )
            .attr("opacity", 1);

          events
            .append("circle")
            .attr(
              "class",
              "timeline-hover-ring"
            )
            .attr("cx", eventX)
            .attr("cy", timelineY)
            .attr("r", 12)
            .attr("fill", "none")
            .attr("stroke", "#151515")
            .attr("stroke-width", 1.2)
            .attr("opacity", 0)
            .transition()
            .duration(180)
            .attr("opacity", 0.22);

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
            mouseEvent.clientX -
            left +
            18;

          let yPos =
            mouseEvent.clientY -
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
              mouseEvent.clientX -
              left -
              tooltipWidth -
              18;
          }

          // --------------------------------------------------
          // Prevent overflow (top)
          // --------------------------------------------------

          if (yPos < 8) {
            yPos =
              mouseEvent.clientY -
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
            x: xPos,
            y: yPos,

            title: event.title,

            date: d3.timeFormat(
              "%d %b %Y"
            )(event.date),

            followers: formatNumber(
              event.followers || 0
            ),

            reach: formatNumber(
              event.reach || 0
            ),
          });
        }
      )

      .on(
        "mousemove",
        function (mouseEvent) {
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
            mouseEvent.clientX -
            left +
            18;

          let yPos =
            mouseEvent.clientY -
            top -
            18;

          if (
            xPos + tooltipWidth >
            width - 8
          ) {
            xPos =
              mouseEvent.clientX -
              left -
              tooltipWidth -
              18;
          }

          if (yPos < 8) {
            yPos =
              mouseEvent.clientY -
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

          setTooltip((prev) => ({
            ...prev,
            x: xPos,
            y: yPos,
          }));
        }
      )

      .on(
        "mouseleave",
        function () {
          connection
            .transition()
            .duration(150)
            .attr("stroke", "#d3d3ce")
            .attr("stroke-width", 1.2)
            .attr("opacity", 0.9);

          events
            .selectAll(
              ".timeline-hover-ring"
            )
            .remove();

          d3.select(this)
            .transition()
            .duration(180)
            .ease(d3.easeCubicOut)
            .attr(
              "r",
              selectedEvent?.title ===
                event.title
                ? 8
                : 6
            )
            .attr(
              "opacity",
              !selectedEvent
                ? 0.92
                : selectedEvent?.title ===
                    event.title
                  ? 1
                  : 0.25
            );

          setTooltip(null);
        }
      )

      .on("click", () => {
        if (
          selectedEvent?.title ===
          event.title
        ) {
          selectEvent(null);
        } else {
          selectEvent(event);
        }
      });
  });
}