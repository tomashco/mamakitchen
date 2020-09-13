import sizes from "./sizes";

export default {
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("sm")]: {
      width: "100%",
    },
  },
};
