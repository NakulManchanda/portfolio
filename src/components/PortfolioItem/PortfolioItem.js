import React from "react";
import PropTypes from "prop-types";
import "./style";

const PortfolioItem = (props, context) => {
  const {
    theme: { colorPrimary, textAlternate }
  } = context;

  if (props.render) return props.render;
  else
    return (
      <div
        className="portfolio-item"
        style={{ backgroundColor: colorPrimary, color: textAlternate }}
      >
        <div className="portfolio-item__title">Graphic Designer</div>

        <div className="portfolio-item__desc">
          I am a Graphic Designer! I am a Graphic Designer! I am a Graphic
          Designer! I am a Graphic Designer!
        </div>
        <div className="portfolio-item__icon">
          <i className="fab fa-behance" />
          {/* <i className="fab fa-react" />
          <i className="fab fa-html5" /> */}
        </div>
        <div className="portfolio-item__links">
          <a src="#">Behance</a>
          {/* <a src="#">Blog</a> */}
        </div>
      </div>
    );
};

PortfolioItem.contextTypes = {
  theme: PropTypes.any
};

export default PortfolioItem;
