import React from "react";
import PropTypes from "prop-types";

import { Card, Typography } from "@material-ui/core";

import dataVisStyle from "./jss/tooltipStyle.js";

import { withStyles } from "@material-ui/styles";

const styles = theme => dataVisStyle;

class CustomTooltip extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  componentDidMount() {}

  render() {
    const { classes, active } = this.props;

    if (active) {
      const { payload, label, records } = this.props;
      return (
        <Card raised className={classes.paperbox}>
          <Typography>{`Round ${label}: ${payload[0].value}`}</Typography>
          <Typography>
            Your cards: {JSON.stringify(records[label].record.player[0])}
          </Typography>
          <Typography>
            Dealer card: {JSON.stringify(records[label].record.dealer)}
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
