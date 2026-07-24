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
          );


        showTooltip({

          ...positionTooltip(event),


          title:
            d.segment,


          subtitle:
            `Audience Share: ${
              Number(
                d.percentage
              ).toFixed(1)
            }%`,


          values: [

            `Followers: ${formatNumber(
              d.followers
            )}`,


            `Reach: ${formatNumber(
              d.reach
            )}`,


            `Engagement: ${
              Number(
                d.engagement
              ).toFixed(1)
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
            "opacity",
            !selected
              ? 0.9
              : selected === d.segment
                ? 1
                : 0.22
          );


        hideTooltip();

      }
    );
}