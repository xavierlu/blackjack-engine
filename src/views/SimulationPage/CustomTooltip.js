import React from "react";
import PropTypes from "prop-types";

import { Card, Typography } from "@material-ui/core";

import dataVisStyle from "./jss/tooltipStyle.js";

import { withStyles } from "@material-ui/styles";

const styles = theme => dataVisStyle;

class CustomTooltip extends React.Component {
  getPoints = arr => {
    return arr.reduce((sum, x) => parseInt(sum) + parseInt(x))
  };

  render() {
    const { classes, active } = this.props;

    if (active) {
      const { payload, label, records } = this.props;
      const player = records[label].record.player[0];
      const dealer = records[label].record.dealer;
      console.log(player);
      console.log(typeof player);
      return (
        <Card raised className={classes.paperbox}>
          <Typography>{`Round ${label}: ${payload[0].value}`}</Typography>
          <Typography>
            Your cards: {JSON.stringify(player)} ={" "}
            {player.reduce((sum, x) => parseInt(sum) + parseInt(x))}
          </Typography>
          <Typography>
            Dealer card: {JSON.stringify(dealer)} ={" "}
            {dealer.reduce((sum, x) => parseInt(sum) + parseInt(x))}
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
