import React from "react";
import { Link } from "react-router-dom";

import { createUseStyles } from "react-jss";

import { routes } from "/imports/data/data";

const useStyles = createUseStyles({
  feelingContainer: {
    backgroundColor: "lightBlue",
    display: "flex",
    justifyContent: "space-between",
    "& + &": {
      marginTop: 10,
    },
  },
  feelingName: {
    textDecoration: "none",
    color: "black",
    padding: 15,
    width: "100%",
  },
  visitedFeeling: {
    backgroundColor: "orange",
  },
  selectedFeeling: {
    backgroundColor: "#bddc60",
  },
});

export default function Feeling({
  name,
  onChange,
  selected,
  onVisit,
  visited,
}) {
  const classes = useStyles();

  function handleSelectChange(event) {
    const { checked } = event.target;
    onChange({ feeling: name, checked });
  }

  function handleLinkClick() {
    onVisit({ feeling: name });
  }

  const hasChildFeelings = routes[name];

  return (
    <div
      className={`${classes.feelingContainer} ${
        selected && classes.selectedFeeling
      }`}
    >
      {hasChildFeelings ? (
        <>
          <Link
            className={`${classes.feelingName} ${
              visited && classes.visitedFeeling
            }`}
            onClick={handleLinkClick}
            to={name}
          >
            {name}
          </Link>
        </>
      ) : (
        <>
          <label className={classes.feelingName} htmlFor={name}>
            {name}
          </label>
          <input
            type="checkbox"
            id={name}
            name={name}
            key={name}
            onChange={handleSelectChange}
            checked={selected}
          />
        </>
      )}
    </div>
  );
}
