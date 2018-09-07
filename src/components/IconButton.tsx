import styled from "react-emotion";

interface IconButtonProps {
  active: boolean;
}

export const IconButton = styled("button")<IconButtonProps>(props => ({
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
    display: "block"
  }
}));
