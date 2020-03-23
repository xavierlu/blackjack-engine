const basicStrategyStyle = {
  side: {
    width: "35px",
    height: "15px",
    textAlign: "center"
  },
  square: {
    width: "35px",
    height: "15px",
    backgroundColor: "pink"
  },
  stand: {
    "&:hover": {
      transform: "scale(0.9, 0.9)",
      backgroundColor: "#50ebaf"
    },
    backgroundColor: "#50eba5",
    textTransform: "none"
  },
  hit: {
    "&:hover": {
      transform: "scale(0.9, 0.9)",
      backgroundColor: "#eb4b8f"
    },
    backgroundColor: "#eb4b8b",
    textTransform: "none"
  },
  double: {
    "&:hover": {
      transform: "scale(0.9, 0.9)",
      backgroundColor: "#5f82ef"
    },
    backgroundColor: "#5f82ed",
    textTransform: "none"
  },
  ds: {
    "&:hover": {
      transform: "scale(0.9, 0.9)",
      backgroundColor: "#5fc0ef"
    },
    backgroundColor: "#5fc0ed",
    textTransform: "none"
  }
};

export default basicStrategyStyle;
