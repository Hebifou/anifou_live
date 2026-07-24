import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { useDashboard } from "../../context/DashboardContext";

import {
  useDashboardTooltip,
} from "../../components/dashboard/tooltip/useDashboardTooltip";

import { layout } from "./audience/constants";
import { createScales } from "./audience/scales";
import { drawBackground } from "./audience/drawBackground";
import { drawBars } from "./audience/drawBars";
import { attachTooltip } from "./audience/tooltip";
import { drawLabels } from "./audience/drawLabels";
import { drawValues } from "./audience/drawValues";


export default function AudienceChart() {
  const svgRef = useRef(null);

  const {
    filteredAudience,
    selection,
    selectAge,
  } = useDashboard();


  const {
    showTooltip,
    moveTooltip,
    hideTooltip,
  } = useDashboardTooltip();



  useEffect(() => {
    if (!filteredAudience.length) {
      return;
    }


    const data = filteredAudience
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
      selection.age;



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
        selectAge(
          d.segment
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
      selectAge,
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
    filteredAudience,
    selection,
    selectAge,
    showTooltip,
    moveTooltip,
    hideTooltip,
  ]);



  return (
    <div className="dashboard-chart audience-chart">

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