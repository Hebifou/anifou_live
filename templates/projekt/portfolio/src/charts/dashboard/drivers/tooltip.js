import * as d3 from "d3";

import { formatNumber } from "../../../utils/dashboard/formatters";

import {
  positionTooltip,
} from "../../../components/dashboard/tooltip/positionTooltip";


export function attachTooltip({
  bars,
  y,
  selected,

  showTooltip,
  moveTooltip,
  hideTooltip,
}) {

  bars
    .on(
      "mouseenter",
      function (event, d) {

        d3.select(this)
          .raise()
          .transition()
          .duration(180)
          .attr(
            "fill",
            "#000000"
          )
          .attr(
            "opacity",
            1
          )
          .attr(
            "height",
            y.bandwidth() + 1
          )
          .attr(
            "y",
            y(d.driver) - 0.5
          );


        showTooltip({

          ...positionTooltip(event),


          title:
            d.driver,


          subtitle:
            `Contribution: ${
              d.percentage ??
              d.value
            }%`,


          values: [

            `Followers: ${formatNumber(
              d.followers
            )}`,

            `Reach: ${formatNumber(
              d.reach
            )}`,

            `Engagement: ${
              d.engagement
            }%`,
          ],
        });

      }
    )


    .on(
      "mousemove",
      function(event) {

        moveTooltip(
          positionTooltip(event)
        );

      }
    )


    .on(
      "mouseleave",
      function(_, d) {

        d3.select(this)
          .transition()
          .duration(180)
          .attr(
            "fill",
            "#151515"
          )
          .attr(
            "height",
            y.bandwidth()
          )
          .attr(
            "y",
            y(d.driver)
          )
          .attr(
            "opacity",
            !selected
              ? 0.92
              : selected === d.driver
                ? 1
                : 0.22
          );


        hideTooltip();

      }
    );
}