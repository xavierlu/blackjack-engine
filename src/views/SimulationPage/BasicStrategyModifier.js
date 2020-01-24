import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";

import { Typography, Button } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import basicStrategyStyle from "./jss/basicStrategyTableStyle.js";

const styles = theme => basicStrategyStyle;

class BasicStrategyModifier extends React.Component {
  constructor(props) {
    super(props);
  }

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

  circleLetterHard = letter => {
    switch (letter) {
      case "S":
        return "H";
      case "H":
        return "D";
      case "D":
        return "S";
    }
  };

  circleLetterSoft = letter => {
    switch (letter) {
      case "S":
        return "H";
      case "H":
        return "D";
      case "D":
        return "Ds";
      case "Ds":
        return "S";
    }
  };

  circleLetterSplit = letter => {
    switch (letter) {
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
      let data = this.props.hard_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() =>
                this.props.handleModifyStrategyTable(
                  "hard_table",
                  this.props.hard_table,
                  row,
                  key,
                  this.circleLetterHard(data[key])
                )
              }
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
      let data = this.props.soft_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() =>
                this.props.handleModifyStrategyTable(
                  "soft_table",
                  this.props.soft_table,
                  row,
                  key,
                  this.circleLetterSoft(data[key])
                )
              }
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
      let data = this.props.split_table[row];
      Object.keys(data).forEach(key => {
        children.push(
          <td className={this.props.classes.side}>
            <Button
              className={this.getClassStyle(data[key])}
              onClick={() =>
                this.props.handleModifyStrategyTable(
                  "split_table",
                  this.props.split_table,
                  row,
                  key,
                  this.circleLetterSplit(data[key])
                )
              }
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
