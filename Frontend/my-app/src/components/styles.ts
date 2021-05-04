import { makeStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const styles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

export const paperStyle = {
    padding: 20,
    height: "70vH",
    width: 500,
    margin: "20px auto",
  };