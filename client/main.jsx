import React from "react";
import { Meteor } from "meteor/meteor";
import Routes from "/imports/router/router";

import WebFont from "webfontloader";

import { render } from "react-dom";

function calcVH() {
  const vH = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  document.getElementById("root").setAttribute("style", `height:${vH}px;`);
}
calcVH();
window.addEventListener("onorientationchange", calcVH, true);
window.addEventListener("resize", calcVH, true);

Meteor.startup(() => {
  WebFont.load({
    google: {
      families: ["Quicksand"],
    },
  });
  render(<Routes />, document.getElementById("root"));
});
