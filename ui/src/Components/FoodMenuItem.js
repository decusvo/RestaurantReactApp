import React, { useState } from "react";
import { CardContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import allActions from "../actions";
import { CardMedia } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import cx from "clsx";
import Button from "@material-ui/core/Button";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useConfirm } from "material-ui-confirm";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
    boxShadow: "none",
    borderRadius: 0
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  }
}));

const FoodMenuItem = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  const mediaStyles = useWideCardMediaStyles();
  const confirm = useConfirm();

  const openDialog = () => {
    confirm({
      title: "Nutritional Information",
      description: "Caloric number: " + calories,
      confirmationText: "Back",
      cancellationText: "",
      cancellationButtonProps: { disabled: true }
    }).then(() => {});
  };

  const cardStyle = {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "25vw"
  };

  const PlusButtonHandler = (id, value, price) => {
    setItemQuantity(itemQuantity + 1);
    dispatch(allActions.itemActions.addItem(id, value, price));
  };

  const MinusButtonHandler = (value, price) => {
    if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1);
      dispatch(allActions.itemActions.removeItem(value, price));
    }
  };

  const { id, value, description, price, calories, image, quantity } = props;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  return (
    <Grid item lg={3} xs={12} sm={4}>
      <Card className={cx(classes.root, shadowStyles.root)} style={cardStyle}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <TextInfoContent
            classes={textCardContentStyles}
            heading={value}
            overline={itemQuantity + " X " + price}
            body={description}
          />

            <Button
              color={"primary"}
              className={classes.cta}
              onClick={() => {
                MinusButtonHandler(value, price);
              }}
            >
              <MinusIcon />
            </Button>
            <Button
              color={"primary"}
              className={classes.cta}
              onClick={() => {
                PlusButtonHandler(id, value, price);
              }}
            >
              <AddIcon />
            </Button>
            <Button
              color={"primary"}
              className={classes.cta}
              onClick={() => {
                openDialog();
              }}
            >
              <ChevronRightIcon />
            </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default FoodMenuItem;
