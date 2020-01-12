import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";

import { Typography } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import stylessheet from "./jss/styles";

const styles = theme => stylessheet;

class BasicStrategyModifier extends React.Component {
  render() {
    return (
      <div>
        <Typography>
          {
            "An ad group contains one or more ads which target a shared set of keywords."
          }
        </Typography>
        <CustomTabs
          plainTabs
          headerColor="info"
          tabs={[
            {
              tabName: "Hard",
              tabContent: (
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              )
            },
            {
              tabName: "Soft",
              tabContent: (
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus. I think that’s a
                  responsibility that I have, to push possibilities, to show
                  people, this is the level that things could be at.
                </p>
              )
            },
            {
              tabName: "Split",
              tabContent: (
                <p>
                  think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
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
