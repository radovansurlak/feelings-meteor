/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from "react";

import { withStyles } from "react-jss";

import { routes, feelings } from "/imports/data/data";

import { v4 as uuid } from "uuid";

import Feeling from "./components/feeling/Feeling";

import cloneObject from "/imports/helpers/cloneObject";

const styles = {
  main: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  feelingSection: {
    overflow: "scroll",
    flexGrow: 1,
  },
  buttonSection: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    "& > button": {
      padding: 10,
    },
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feelingList: cloneObject(feelings),
      selected: [],
      visited: new Set(),
    };
  }

  onChange = ({ feeling, checked }) => {
    const { selected } = this.state;
    const newSelected = checked
      ? selected.concat(feeling)
      : selected.filter((item) => item !== feeling);

    this.setState({ selected: newSelected });
  };

  handleReset = () => {
    this.setState({
      feelingList: cloneObject(feelings),
      selected: [],
      visited: new Set(),
    });
  };

  handleBackButtonClick = () => {
    const { history } = this.props;
    console.log(history);
    history.goBack();
  };

  handleFeelingVisit = ({ feeling }) => {
    const { visited } = this.state;
    visited.add(feeling);
  };

  handleShare = () => {
    const { selected } = this.state;

    console.log(`I am feeling ${selected.join(", ")}`);

    if (navigator.share) {
      navigator
        .share({
          title: "web.dev",
          text: `I am feeling ${selected.join(", ")}`,
          url: "https://web.dev/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  render() {
    const { match, history, classes } = this.props;
    const { route } = match.params;
    const { feelingList, selected, visited } = this.state;

    if (!routes[route]) {
      history.push("home");
      return null;
    }

    return (
      <main className={classes.main}>
        <section className={classes.feelingSection}>
          {routes[route]
            .map((route) => feelingList[route])
            .map(({ name }) => (
              <Feeling
                key={uuid()}
                selected={selected.includes(name)}
                name={name}
                onChange={this.onChange}
                onVisit={this.handleFeelingVisit}
                visited={visited.has(name)}
              />
            ))}
        </section>
        <section className={classes.buttonSection}>
          <button type="button" onClick={this.handleShare}>
            share
          </button>
          <button type="button" onClick={this.handleReset}>
            reset
          </button>
          <button type="button" onClick={this.handleBackButtonClick}>
            back
          </button>
        </section>
      </main>
    );
  }
}

export default withStyles(styles)(App);
