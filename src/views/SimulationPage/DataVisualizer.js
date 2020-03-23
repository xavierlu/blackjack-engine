import React from "react";
import PropTypes from "prop-types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip
} from "recharts";

import dataVisStyle from "./jss/dataVisStyles.js";

import CustomTooltip from "./CustomTooltip.js";

import { withStyles } from "@material-ui/styles";

const styles = theme => dataVisStyle;

class DataVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 600,
      height: 300
    };
  }

  componentDidMount() {
    const width = document.getElementById("dataVis").clientWidth;
    const height = document.getElementById("dataVis").clientWidth;
    this.setState({ width, height });
  }

  render() {
    return (
      <LineChart
        width={this.state.width}
        height={this.state.height / 3}
        data={this.props.data.total_chips_count}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <ReferenceLine y={0} stroke="black" />
        {this.props.data.reshuffle_count.map(x => {
          return <ReferenceLine x={x} stroke="red" />;
        })}
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line dataKey="chips" dot={false} />
        <Line name="new deck" stroke="red" type="linear" />
      </LineChart>
    );
  }
}

DataVisualizer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataVisualizer);
