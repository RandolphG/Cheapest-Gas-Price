import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
class Victory extends Component {
  render() {
    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];

    return (
      <div>
        <VictoryChart width={250} height={250} theme={VictoryTheme.material}>
          <VictoryBar data={this.data} x={"stats"} y={"more stats"} />
        </VictoryChart>
      </div>
    );
  }
}

export default Victory;
