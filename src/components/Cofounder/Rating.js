import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import request from "superagent";
import { baseUrl } from "../../constants";
import { useParams } from "react-router-dom";

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
  const routeParameters = useParams();
  const parsedParameters = parseInt(routeParameters.id);

  function handleChange(event, newValue) {
    set_rating(parseInt(newValue));
    request
      .post(`${baseUrl}/cofounders/${parsedParameters}/assesments`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ rating: parseInt(newValue) })
      .then((res) => {
        if (res.status === 200) {
        }
      });
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate a co-founder</Typography>
        <StyledRating
          name="customized-10"
          value={rating}
          defaultValue={2}
          max={10}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          onChange={handleChange}
        />
      </Box>
      <TextField
        id="filled-secondary"
        label="Please tell us why you give this rating"
        multiline
        rows={8}
        rowsMax={10}
        variant="filled"
        color="secondary"
      />
    </div>
  );
}
