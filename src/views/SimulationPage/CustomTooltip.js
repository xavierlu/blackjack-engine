import React from "react";
import PropTypes from "prop-types";

import { Card } from "@material-ui/core";

import dataVisStyle from "./jss/dataVisStyles.js";

import { withStyles } from "@material-ui/styles";

const styles = theme => dataVisStyle;

class CustomTooltip extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  componentDidMount() {}

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <Card raised>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
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
