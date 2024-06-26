import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "react-router-dom";
import store from "ui-redux/store";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

const styles = theme => ({
  root: {
    margin: "2px 8px",
    backgroundColor: theme.palette.background.paper,
  }
});

class MyFireLink extends React.Component {

  clickHandler = () => {
    store.dispatch(setRoute("my-NOC"))
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav" onClick={this.clickHandler}>
          <ListItem button>
            <ListItemText
              primary={
                <LabelContainer
                  labelKey="How to apply & pay Fire NOC"
                  style={{
                    fontSize: 14,
                    color: "rgba(0, 0, 0, 0.8700000047683716)"
                  }}
                />
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <KeyboardRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(MyFireLink);
