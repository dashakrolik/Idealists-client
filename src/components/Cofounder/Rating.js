import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import request from "superagent";
import { baseUrl } from "../../constants";
import { useParams } from "react-router";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function Ratings(props) {
  const [rating, set_rating] = useState("");
  const [text, set_text] = useState("");
  const routeParameters = useParams();
  const parsedParameters = parseInt(routeParameters.id);

  function handleChange(event) {
    request
      .post(`${baseUrl}/cofounders/${parsedParameters}/assesments`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ rating: rating, description: text })
      .then((res) => {
        if (res.status === 200) {
        }
      });
  }
  return (
    <div>
      <Box
        Style={{ display: "flex", flexDirection: "column" }}
        component="fieldset"
        mb={3}
        borderColor="white"
      >
        <Typography component="legend">Rate a co-founder</Typography>
        <br></br>
        <StyledRating
          name="customized-10"
          value={rating}
          defaultValue={2}
          max={10}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          onClick={(e) => {
            set_rating(parseInt(e.target.value));
          }}
        />
        <br></br>

        <TextField
          onChange={(e) => {
            set_text(e.target.value);
          }}
          id="filled-basic"
          label="Please tell us why you give this rating"
          value={text}
          multiline
          rows={8}
          rowsMax={10}
          variant="filled"
          color="primary"
          backgroundColor="white"
        />
        <br></br>

        <Button onClick={() => handleChange()}>Submit Rating</Button>
      </Box>
    </div>
  );
}
