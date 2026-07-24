import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useDashboard } from "../../context/DashboardContext";

import {
  useDashboardTooltip,
} from "../../components/dashboard/tooltip/useDashboardTooltip";

import { layout } from "./drivers/constants";
import { createScales } from "./drivers/scales";
import { drawBackground } from "./drivers/drawBackground";
import { drawBars } from "./drivers/drawBars";
import { attachTooltip } from "./drivers/tooltip";
import { drawLabels } from "./drivers/drawLabels";
import { drawValues } from "./drivers/drawValues";


export default function DriversChart() {
  const svgRef = useRef(null);


  const {
    filteredDrivers,
    selection,
    selectDriver,
  } = useDashboard();


  const {
    showTooltip,
    moveTooltip,
    hideTooltip,
  } = useDashboardTooltip();



  useEffect(() => {
    if (!filteredDrivers.length) {
      return;
    }


    const data = filteredDrivers
      .map((item) => ({
        ...item,
        value: Number(item.value),
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      );



    const {
      width,
      height,
    } = layout;



    const svg = d3.select(
      svgRef.current
    );


    svg.selectAll("*").remove();



    svg.attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );



    // --------------------------------------------------
    // Scales
    // --------------------------------------------------

    const {
      x,
      y,
    } = createScales(
      data,
      layout
    );



    const selected =
      selection.driver;



    // --------------------------------------------------
    // Background
    // --------------------------------------------------

    drawBackground({
      svg,
      data,
      y,
      layout,
    });



    // --------------------------------------------------
    // Bars
    // --------------------------------------------------

    const bars = drawBars({
      svg,
      data,
      x,
      y,
      layout,
      selected,

      onClick(_, d) {
        selectDriver(
          d.driver
        );
      },
    });



    // --------------------------------------------------
    // Tooltip
    // --------------------------------------------------

    attachTooltip({
      bars,
      y,
      selected,

      showTooltip,
      moveTooltip,
      hideTooltip,
    });



    // --------------------------------------------------
    // Labels
    // --------------------------------------------------

    drawLabels({
      svg,
      data,
      y,
      layout,
      selected,
      selectDriver,
    });



    // --------------------------------------------------
    // Values
    // --------------------------------------------------

    drawValues({
      svg,
      data,
      y,
      layout,
      selected,
    });


  }, [
    filteredDrivers,
    selection,
    selectDriver,
    showTooltip,
    moveTooltip,
    hideTooltip,
  ]);



  return (
    <div className="dashboard-chart drivers-chart">

      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

    </div>
  );
}