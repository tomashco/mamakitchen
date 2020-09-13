import sizes from "./sizes";

export default {
  fullPage: {
    background:
      "url(https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F03%2F27%2FSamin-Home-Cooking-Podcast-FT-Blog0320.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    height: "100vh",
    textAlign: "center",
    paddingTop: "25%",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.3), 0px 8px 13px rgba(0,0,0,0.3), 0px 18px 23px rgba(0,0,0,0.3)",
    "& h1": {
      color: "white",
      fontWeight: 700,
      fontSize: "7em",
      [sizes.down("md")]: {
        fontSize: "4em",
      },
    },
    "& h3": {
      color: "white",
      fontSize: "2em",
      [sizes.down("sm")]: {
        fontSize: "1.5em",
      },
    },
    "& hr": {
      width: "400px",
      borderTop: "1px solid #f8f8f8",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
    },
  },
};
