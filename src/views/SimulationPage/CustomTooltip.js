import React from "react";
import PropTypes from "prop-types";

import { Card, Typography } from "@material-ui/core";

import dataVisStyle from "./jss/tooltipStyle.js";

import { withStyles } from "@material-ui/styles";

const styles = theme => dataVisStyle;

class CustomTooltip extends React.Component {
  getPoints = arr => {
    let s = 0;
    arr.forEach(e => {
      s += e === "A" ? 11 : parseInt(e);
    });

    if (s > 21 && arr.includes("A")) {
      s = 0;
      arr.forEach(e => {
        s += e === "A" ? 1 : parseInt(e);
      });
    }

    return s;
  };

  render() {
    const { classes, active } = this.props;

    if (active) {
      const { payload, label, records } = this.props;
      const player = records[label].record.player[0];
      const dealer = records[label].record.dealer;
      return (
        <Card raised className={classes.paperbox}>
          <Typography>{`Round ${label}: ${payload[0].value}`}</Typography>
          <Typography>
            Your cards: {JSON.stringify(player)} = {this.getPoints(player)}
          </Typography>
          <Typography>
            Dealer card: {JSON.stringify(dealer)} = {this.getPoints(dealer)}
          </Typography>
        </Card>
      );
    }

    return null;
  }
}

CustomTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string
};

export default withStyles(styles)(CustomTooltip);
