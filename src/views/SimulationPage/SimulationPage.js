import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

// @material-ui/core components
import { withStyles } from "@material-ui/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  Slider,
  CircularProgress,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Button from "components/CustomButtons/Button.js";

import simulationPageStyle from "./jss/simulationPageStyle.js";
import { title } from "assets/jss/material-kit-react.js";

// Sections for this page
import GameSettings from "./GameSettings.js";
import BasicStrategyModifier from "./BasicStrategyModifier.js";
import DataVisualizer from "./DataVisualizer.js";

import hard_default from "./json/hard_default.json";
import soft_default from "./json/soft_default.json";
import split_default from "./json/split_default.json";

const dashboardRoutes = [];

const styles = theme => simulationPageStyle;

class SimulationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      activeStep: 0,
      num_hands: 1000,
      gameSettings: {
        num_deck: "",
        soft17: false,
        surrender: false,
        das: "",
        permitted_doubles: "",
        removed_card: "None"
      },
      basicStrategyTables: {
        hard_table: hard_default,
        soft_table: soft_default,
        split_table: split_default
      },
      error_snackbar: false
    };
  }

  handleChangeGameSettings = (field, value) => {
    this.setState({
      gameSettings: { ...this.state.gameSettings, [field]: value }
    });
  };

  handleModifyStrategyTable = (tableName, tableJSON, row, key, v) => {
    this.setState({
      basicStrategyTables: {
        ...this.state.basicStrategyTables,
        [tableName]: {
          ...tableJSON,
          [row]: {
            ...tableJSON[row],
            [key]: v
          }
        }
      }
    });
  };

  render() {
    const { ...rest } = this.props;
    const { classes } = this.props;

    const getStepContent = step => {
      switch (step) {
        case 0:
          return (
            <GameSettings
              gameSettings={this.state.gameSettings}
              handleChangeGameSettings={this.handleChangeGameSettings}
            />
          );
        case 1:
          return (
            <BasicStrategyModifier
              surrender={this.state.gameSettings.surrender}
              permitted_doubles={this.state.gameSettings.permitted_doubles}
              hard_table={this.state.basicStrategyTables.hard_table}
              soft_table={this.state.basicStrategyTables.soft_table}
              split_table={this.state.basicStrategyTables.split_table}
              handleModifyStrategyTable={this.handleModifyStrategyTable}
            />
          );
        case 2:
          return (
            <div className={classes.root}>
              <Typography gutterBottom>Number of Hands to Simulate</Typography>
              <Slider
                step={10}
                min={100}
                max={5000}
                value={this.state.num_hands}
                onChange={(event, newValue) => {
                  this.setState({ num_hands: newValue });
                }}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
              />
            </div>
          );
        default:
          return "Unknown step";
      }
    };

    const steps = [
      "Select Blackjack Game Settings",
      "Modify Basic Strategy",
      "Run Simulation"
    ];

    const handleNext = () => {
      if (
        this.state.gameSettings.num_deck === "" ||
        this.state.gameSettings.das === "" ||
        this.state.gameSettings.permitted_doubles === ""
      ) {
        this.setState({
          error_snackbar: true
        });
      } else if (this.state.activeStep === 2) {
        this.setState({ loading: true, data: null }, () => {
          axios
            .post("http://127.0.0.1:5000/", this.state, {
              headers: {
                "Content-Type": "application/json",
                Accepts: "application/json",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
              }
            })
            .then(result => {
              console.log(result);
              this.setState({
                loading: false,
                data: result.data
              });
            });
        });
        this.setState({ activeStep: this.state.activeStep + 1 });
      } else {
        this.setState({ activeStep: this.state.activeStep + 1 });
      }

      console.log(this.state.gameSettings);
    };

    const handleBack = () => {
      this.setState({ activeStep: this.state.activeStep - 1 });
    };

    const handleReset = () => {
      this.setState({ activeStep: 0 });
    };

    return (
      <div>
        <Header
          color="dark"
          routes={dashboardRoutes}
          brand="Blackjack Engine"
          rightLinks={<HeaderLinks />}
          fixed
          {...rest}
        />

        <div className={classes.container}>
          <div
            style={{
              padding: "70px 0",
              textAlign: "center"
            }}
          >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2
                  style={{
                    ...title,
                    marginBottom: "1rem",
                    marginTop: "30px",
                    minHeight: "32px",
                    textDecoration: "none"
                  }}
                >
                  Test Out Your Basic Strategy
                </h2>
                <h5
                  style={{
                    color: "#999"
                  }}
                >
                  Different casinos have different blackjack rules. Some use 6
                  decks and some use 8. Some hit on soft 17 and some don't. How
                  do you make sure that your basic strategy is the best for
                  those particular rules? Put in your blackjack rules and
                  fine-tune your basic strategy tables. Simulate thousands of
                  hands right here.
                </h5>
              </GridItem>
            </GridContainer>
          </div>
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      {this.state.activeStep > 0 ? (
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      ) : (
                        <br />
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {this.state.activeStep === steps.length - 1
                          ? "Run"
                          : "Next"}
                      </Button>
                      <Snackbar
                        open={this.state.error_snackbar}
                        autoHideDuration={3500}
                        onClose={(event, reason) => {
                          if (reason === "clickaway") {
                            return;
                          }
                          this.setState({ error_snackbar: false });
                        }}
                      >
                        <SnackbarContent
                          style={{
                            backgroundColor: "#F44336"
                          }}
                          message={"Please fill out all settings"}
                        />
                      </Snackbar>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {this.state.activeStep === steps.length && (
            <Paper
              square
              elevation={0}
              className={classes.resetContainer}
              id="dataVis"
            >
              {this.state.loading ? (
                <CircularProgress />
              ) : (
                <DataVisualizer data={this.state.data} />
              )}
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}
//909-638-6247
SimulationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimulationPage);

// const classes = useStyles();
//
