import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";

import { Typography, Button, Grid } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import basicStrategyStyle from "./jss/basicStrategyTableStyle.js";

const styles = theme => basicStrategyStyle;

class BasicStrategyModifier extends React.Component {
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
      case "Su":
        return this.props.classes.su;
      case "Ds":
        return this.props.classes.ds;
      default:
        console.error("wtf");
    }
  };

  circleLetterHard = (letter, row) => {
    switch (letter) {
      case "S":
        return "H";
      case "H":
        switch (this.props.permitted_doubles) {
          case "9,T,11 only":
            if (row >= 9 && row <= 11) {
              return "D";
            } else {
              return this.props.surrender === "No" ? "S" : "Su";
            }
          case "T,11 only":
            if (row >= 10 && row <= 11) {
              return "D";
            } else {
              return this.props.surrender === "No" ? "S" : "Su";
            }
          default:
            return "D";
        }
      case "D":
        return this.props.surrender === "No" ? "S" : "Su";
      case "Su":
        return "S";
      default:
        console.error("wtf");
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
        return this.props.surrender === "No" ? "S" : "Su";
      case "Su":
        return "S";
      default:
        console.error("wtf");
    }
  };

  circleLetterSplit = letter => {
    console.log(this.state);
    switch (letter) {
      case "Y":
        return "N";
      case "N":
        return "Y";
      default:
        console.error("wtf");
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
                  this.circleLetterHard(data[key], row)
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
    // const { classes } = this.props;

    return (
      <div>
        <Typography>
          Click on the buttons to modify your basic strategy. The actions cycle.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
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
          </Grid>
          <Grid item style={{ marginLeft: "10px", marginTop: "100px" }}>
            <Typography>Key:</Typography>
            <Button
              fullWidth
              style={{
                marginTop: "5px",
                marginBottom: "5px"
              }}
              className={this.getClassStyle("S")}
            >
              <Typography>Stand</Typography>
            </Button>
            <br />
            <Button
              fullWidth
              style={{
                marginTop: "5px",
                marginBottom: "5px"
              }}
              className={this.getClassStyle("H")}
            >
              <Typography>Hit</Typography>
            </Button>
            <br />
            <Button
              fullWidth
              style={{
                marginTop: "5px",
                marginBottom: "5px"
              }}
              className={this.getClassStyle("D")}
            >
              <Typography>Double</Typography>
            </Button>
            <br />
            <Button
              fullWidth
              style={{
                marginTop: "5px",
                marginBottom: "5px"
              }}
              className={this.getClassStyle("Su")}
            >
              <Typography>Surrender</Typography>
            </Button>
            <br />
            <Button
              fullWidth
              style={{
                marginTop: "5px",
                marginBottom: "5px"
              }}
              className={this.getClassStyle("Ds")}
            >
              <Typography style={{ fontSize: "12px" }}>
                D if allowed else S
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

BasicStrategyModifier.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicStrategyModifier);
