import styled from "react-emotion";
import PropTypes from "prop-types";

export const IconButton = styled("button")(props => ({
  padding: 0,
  border: "none",
  background: "transparent",
  WebkitAppearance: "none",
  cursor: "pointer",
  transition: "opacity 200ms",
  opacity: props.active ? 1 : 0.5,
  "&:hover": {
    opacity: 1
  },
  "& svg": {
    display: "block",
    width: 16,
    height: 16
  }
}));

IconButton.propTypes = {
  active: PropTypes.bool
};
