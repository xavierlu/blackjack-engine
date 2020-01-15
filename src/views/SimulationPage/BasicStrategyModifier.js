import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";

import { Typography, Popover, Button } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import basicStrategyStyle from "./jss/basicStrategyTableStyle.js";
import hard_default from "./json/hard_default.json";
import soft_default from "./json/soft_default.json";
import split_default from "./json/split_default.json";

const styles = theme => basicStrategyStyle;

class BasicStrategyModifier extends React.Component {
  state = {
    pop_open: false,
    hard_table: hard_default,
    soft_table: soft_default,
    split_table: split_default
  };

  getClassStyle = letter => {
    switch (letter) {
      case "Y":
      case "S":
        return this.props.classes.stand;
      case "N":
      case "H":
        return this.props.classes.hit;
      case "D":
        return this.props.classes.double;
      case "Ds":
      case "Y/N":
        return this.props.classes.ds;
    }
  };

  getNextLetter = letter => {
    switch (letter) {
      case "S":
        return "H";
      case "H":
        return "D";
      case "D":
        return "Ds";
      case "Ds":
        return "S";
      case "Y":
        return "N";
      case "N":
        return "Y/N";
      case "Y/N":
        return "Y";
    }
  };

  createTableHeadRow = () => {
    let cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
    return (
      <tr>
        <td className={this.props.classes.side} />
        {cards.map(card => {
          return (
            <td className={this.props.classes.side}>
              <Typography>{card}</Typography>
            </td>
          );
        })}
      </tr>
    );
  };

  createHardTable = () => {
    let table = [];

    for (let row = 18; row >= 7; row--) {
      let children = [];
      let data = this.state.hard_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() => {
                this.setState({
                  hard_table: {
                    ...this.state.hard_table,
                    [row]: {
                      ...this.state.hard_table[row],
                      [key]: this.getNextLetter(data[key])
                    }
                  }
                });
              }}
            >
              <Typography>{data[key]}</Typography>
            </Button>
          </td>
        );
      });
      table.push(
        <tr>
          <td className={this.props.classes.side}>
            <Typography>{row}</Typography>
          </td>

          {children}
        </tr>
      );
    }
    return table;
  };

  createSoftTable = () => {
    let table = [];

    for (let row = 9; row >= 2; row--) {
      let children = [];
      let data = this.state.soft_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() => {
                this.setState({
                  soft_table: {
                    ...this.state.soft_table,
                    [row]: {
                      ...this.state.soft_table[row],
                      [key]: this.getNextLetter(data[key])
                    }
                  }
                });
              }}
            >
              <Typography>{data[key]}</Typography>
            </Button>
          </td>
        );
      });
      table.push(
        <tr>
          <td className={this.props.classes.side}>
            <Typography>A,{row}</Typography>
          </td>

          {children}
        </tr>
      );
    }
    return table;
  };

  createSplitTable = () => {
    let table = [];

    for (let row = 11; row >= 2; row--) {
      let children = [];
      let data = this.state.split_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() => {
                this.setState({
                  split_table: {
                    ...this.state.split_table,
                    [row]: {
                      ...this.state.split_table[row],
                      [key]: this.getNextLetter(data[key])
                    }
                  }
                });
              }}
            >
              <Typography>{data[key]}</Typography>
            </Button>
          </td>
        );
      });
      table.push(
        <tr>
          <td className={this.props.classes.side}>
            <Typography>{row}</Typography>
          </td>

          {children}
        </tr>
      );
    }
    return table;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography>
          Click on the buttons to modify your basic strategy. The actions cycle.
        </Typography>
        <CustomTabs
          plainTabs
          headerColor="info"
          tabs={[
            {
              tabName: "Hard",
              tabContent: (
                <table>
                  {this.createTableHeadRow()}
                  {this.createHardTable()}
                </table>
              )
            },
            {
              tabName: "Soft",
              tabContent: (
                <table>
                  {this.createTableHeadRow()}
                  {this.createSoftTable()}
                </table>
              )
            },
            {
              tabName: "Split",
              tabContent: (
                <table>
                  {this.createTableHeadRow()}
                  {this.createSplitTable()}
                </table>
              )
            }
          ]}
        />
      </div>
    );
  }
}

BasicStrategyModifier.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicStrategyModifier);
