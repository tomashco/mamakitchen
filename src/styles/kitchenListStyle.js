import sizes from "./sizes";

export default {
  kitchenList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    [sizes.down("md")]: {
      justifyContent: "space-between",
    },
  },
};
