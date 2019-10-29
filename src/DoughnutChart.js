import React, { Component } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: ""
      },
      subtitles: [
        {
          text: "71% Positive",
          verticalAlign: "center",
          fontSize: 15,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "power", y: 5 },
            { name: "killing", y: 3 },
            { name: "scoring", y: 39 }
          ]
        }
      ]
    };

    return (
      <div>
        <h1>Players Stats</h1>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default DoughnutChart;
