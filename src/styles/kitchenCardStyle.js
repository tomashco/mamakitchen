import sizes from "./sizes";

export default {
  container: {
    width: "22%",
    margin: "0.8rem",
    [sizes.down("md")]: {
      width: "43%",
      margin: "1rem",
    },
    [sizes.down("xs")]: {
      width: "100%",
    },
  },
  content: {
    height: "130px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  button: {
    marginBottom: "1rem",
  },
};
