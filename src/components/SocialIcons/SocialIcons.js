import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const SocialIcons = (props, context) => {
  const {
    theme: { colorPrimary }
  } = context;

  return (
    <div className="social-icons animate-icons">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/rashimanchanda1/"
        style={{ color: colorPrimary }}
      >
        <i className="fab fa-linkedin" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.behance.net/Rashi1"
        style={{ color: colorPrimary }}
      >
        <i className="fab fa-behance" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/traveltart_tt/"
        style={{ color: colorPrimary }}
      >
        <i className="fab fa-instagram" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="Rashi-Resume.pdf"
        style={{ color: colorPrimary }}
      >
        <i className="far fa-file" />
      </a>
    </div>
  );
};

SocialIcons.contextTypes = {
  theme: PropTypes.any
};

export default SocialIcons;
