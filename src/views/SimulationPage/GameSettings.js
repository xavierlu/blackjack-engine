import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import gameSettingsStyle from "./jss/gameSettingsStyle.js";

const styles = theme => gameSettingsStyle;

class GameSettings extends React.Component {
  state = {
    deck: "",
    hit: "",
    surrender: "",
    das: "",
    resplit: "",
    charlie: "",
    card_removed: "",
    bjPays: ""
  };

  render() {
    const { classes } = this.props;

    const cards = [
      "K",
      "Q",
      "J",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "A"
    ];

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
            <RadioGroup
              onChange={event => {
                this.setState({ das: event.target.value });
              }}
            >
              {["Allowed", "Not Allowed"].map(ele => {
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
                    label={ele}
                  />
                );
              })}
            </RadioGroup>
            <div>
              <h4>Resplitting</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ resplit: event.target.value });
              }}
            >
              {["Allowed", "Not Allowed"].map(ele => {
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
                    label={ele}
                  />
                );
              })}
            </RadioGroup>
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Charlie</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ charlie: event.target.value });
              }}
            >
              {["No", "5 Cards", "6 Cards", "7 Cards"].map(ele => {
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
                    label={ele + " Charlie"}
                  />
                );
              })}
            </RadioGroup>
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Card Removed From Deck</h4>
            </div>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.card_removed}
                onChange={event =>
                  this.setState({ card_removed: event.target.value })
                }
              >
                {cards.map(card => {
                  return <MenuItem value={card}>{card}</MenuItem>;
                })}
              </Select>
              <FormHelperText>Value</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <div>
              <h4>Blackjack Pays</h4>
            </div>
            <RadioGroup
              onChange={event => {
                this.setState({ bjPays: event.target.value });
              }}
            >
              {["3 to 2", "6 to 5"].map(ele => {
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
                    label={ele}
                  />
                );
              })}
            </RadioGroup>
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
