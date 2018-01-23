import React, { Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";

import styles from "./styles.css";
import ThemeProvider from "../../theming/ThemeProvider";
import Tooltip from "../../../Tooltip";
import getBestRelativePlacement from "../../positioning/getBestRelativePlacement";

const rtlPositions = {
  top: "top",
  bottom: "bottom",
  left: "right",
  right: "left"
};

class TooltipContainer extends Component {
  componentWillMount = () => {
    this.container = document.createElement("div");
    this.container.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
    this.container.style.position = "absolute";
    this.container.style.visibility = "hidden";
    this.container.style.top = "0px";
    this.container.style.left = "0px";
    this.container.style.width = "100%";
    document.body.appendChild(this.container);
  };

  componentWillReceiveProps = ({ content, size, theme }) => {
    if (!content) {
      this.setState({ tooltipBounds: null });

      return null;
    }

    // Render an invisible tooltip into the DOM in order to analyze its dimensions,
    // so we know exactly how to place it correctly when we render it.
    render(
      <ThemeProvider theme={theme}>
        <Tooltip size={size}>
          {content}
        </Tooltip>
      </ThemeProvider>,
      this.container,
      () => {
        const tooltipBounds = this.container.firstElementChild.getBoundingClientRect();

        this.setState({ tooltipBounds });
      }
    );
  };

  render = () => {
    if (!(this.state && this.state.tooltipBounds)) {
      return null;
    }

    const { tooltipBounds: tBounds } = this.state;
    const {
      content,
      anchor,
      positions: rawPositions,
      dir,
      size,
      zIndex,
      theme
    } = this.props;

    const positions = (() =>
      typeof rawPositions === "string" ? [rawPositions] : rawPositions)().map(
      position => (dir === "rtl" ? rtlPositions[position] : position)
    );

    const aBounds = anchor.getBoundingClientRect();

    const { rect: { left, top }, position } = getBestRelativePlacement({
      positions,
      anchor: {
        left: aBounds.left,
        right: aBounds.right,
        top: aBounds.top,
        bottom: aBounds.bottom,
        width: aBounds.width,
        height: aBounds.height,
        margins: { left: 5, top: 5, right: 5, bottom: 5 }
      },
      centerPoint: 0,
      target: {
        width: tBounds.width,
        height: tBounds.height
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.container} style={{ zIndex }}>
          <Tooltip left={left} top={top} position={position} size={size}>
            {content}
          </Tooltip>
        </div>
      </ThemeProvider>
    );
  };
}

TooltipContainer.propTypes = {
  positions: PropTypes.oneOfType([
    Tooltip.propTypes.position,
    PropTypes.arrayOf(Tooltip.propTypes.position)
  ]),
  content: Tooltip.propTypes.children,
  anchor: PropTypes.object,
  dir: PropTypes.oneOf(["rtl", "ltr"]),
  size: Tooltip.propTypes.size,
  zIndex: PropTypes.number,
  theme: PropTypes.object
};

TooltipContainer.defaultProps = {
  positions: ["top", "bottom", "left", "right"],
  dir: "ltr",
  zIndex: 600
};

export default TooltipContainer;