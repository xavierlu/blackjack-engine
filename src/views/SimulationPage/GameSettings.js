import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import stylessheet from "./jss/styles";

const styles = theme => stylessheet;

class GameSettings extends React.Component {
  state = {
    deck: "",
    hit: "",
    surrender: ""
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography>{"Some helpful text here"}</Typography>
        <GridContainer>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Decks</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ deck: event.target.value });
              }}
            >
              {["2", "3", "4", "5", "6", "7", "8"].map(ele => {
                return (
                  <FormControlLabel
                    value={ele}
                    control={
                      <Radio
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot
                    }}
                    label={ele + " decks"}
                  />
                );
              })}
            </RadioGroup>
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Dealer's hit</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ hit: event.target.value });
              }}
            >
              {["Stand", "Hit"].map(ele => {
                return (
                  <FormControlLabel
                    value={ele}
                    control={
                      <Radio
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot
                    }}
                    label={ele + " on Soft 17"}
                  />
                );
              })}
            </RadioGroup>

            <div>
              <h4>Surrender</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ surrender: event.target.value });
              }}
            >
              {["No", "Early", "Late"].map(ele => {
                return (
                  <FormControlLabel
                    value={ele}
                    control={
                      <Radio
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot
                    }}
                    label={ele + " Surrender"}
                  />
                );
              })}
            </RadioGroup>
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Double After Split</h4>
            </div>
            {["Allowed", "Not Allowed"].map(element => {
              return (
                <FormControlLabel
                  control={
                    <Radio
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={element}
                />
              );
            })}
            <div>
              <h4>Resplitting</h4>
            </div>
            {["Allowed", "Not Allowed"].map(element => {
              return (
                <FormControlLabel
                  control={
                    <Radio
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={element}
                />
              );
            })}
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Charlie</h4>
            </div>
            {["No", "5 Cards", "6 Cards", "7 Cards"].map(element => {
              return (
                <FormControlLabel
                  control={
                    <Radio
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label={element + " Charlie"}
                />
              );
            })}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

GameSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameSettings);
