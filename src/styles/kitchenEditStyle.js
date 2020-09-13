import sizes from "./sizes";

export default {
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("md")]: {
      width: "100%",
    },
  },
  kitchenName: {
    fontSize: "2rem",
    textWeight: "bold",
  },
  formItem: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  formQuantity: {
    display: "flex",
    alignItems: "left",
    flexDirection: "row",
  },
  formQuantityTitle: {
    width: "20%",
  },
  formTitle: {
    marginRight: "1rem",
    width: "100%",
  },
  verticalSpace: {
    margin: "24px 0",
  },
  recipeFormSubmitRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
