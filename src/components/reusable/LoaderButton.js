import React from "react";
import "./LoaderButton.scss"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`loaderButton ${className}`}
      {...props}
    >
      {isLoading ? (<CircularProgress size="1rem" color="inherit" />)
        :
        props.children
      }
    </button>
  );
}