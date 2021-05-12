import { makeStyles, Theme } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";

export const styles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  contentCard: {
    flexGrow: 2,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
  card: {
    maxWidth: 345,
    maxHeight: 500,
    padding: 9,
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: grey[500],
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  table: {
    minWidth: 650,
  },
}));

export const paperStyle = {
  padding: 20,
  height: "70vH",
  width: 500,
  margin: "20px auto",
};

export const paperResult = {
  padding: 15,
  height: "75vH",
  width: "160vH",
  margin: "15px auto",
};
export const paperSport = {
  padding: 20,
  height: "48vH",
  width: 370,
  margin: "20px auto",
};