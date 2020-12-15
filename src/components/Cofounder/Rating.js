import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../../components/InvestorsPortal/Dashboard/styles.css";
import request from "superagent";
import "./IdeaList.css"
import { baseUrl } from "../../constants";
import { Radiobox, Textarea } from 'react-inputs-validation';


const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);


const SCALE_OPTIONS_LIST = [
  { id: "1", name: "1", value: 1 },
  { id: "2", name: "2", value: 2 },
  { id: "3", name: "3", value: 3 },
  { id: "4", name: "4", value: 4 },
  { id: "5", name: "5", value: 5 },
  { id: "6", name: "6", value: 6 },
  { id: "7", name: "7", value: 7 },
  { id: "8", name: "8", value: 8 },
  { id: "9", name: "9", value: 9 },
  { id: "10", name: "10", value: 10 },
];

export default function Ratings(props) {
  const [rating, set_rating] = useState("");
  const [text, set_text] = useState("");
  const [validate, set_validation] = useState(false)
  const parsedParameters = parseInt(props.match.params.id);





  function handleChange(event) {
    request
      .post(`${baseUrl}/cofounders/${parsedParameters}/assesments`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ rating: rating, description: text })
      .then((res) => {
        if (res.status === 201) {
          alert(`Your rating ${rating} is saved successfully!`)
          set_rating("")
          set_text("")
        }
      });
  }

  function formValidation() {
    if (!rating) {
      set_validation(false)
    }
    if (!text) {
      set_validation(false)
    } else {
      set_validation(true)
    }
  }





  return (
    <form onSubmit={formValidation}>
      <div style={rowWrapperStyle}>
        <div style={rowContainerStyle}>
          <div style={rowStyle}>
            <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
              <span
                className="icon icon-info"
                style={{ ...labelContentStyle, fontSize: "20px" }}
              />
              <span>How do you rate this cofounder?</span>
            </div>
            <div style={{ flex: "6 6 0px", display: "flex" }}>
              <Radiobox style={{display: 'block'}}
                onChange={(rating, event) => {
                  set_rating(rating);
                }}
                id="rating"
                name="rating"
                value={rating}
                validate={() => {if(!rating) {
                  set_validation(false)
                }}}
                optionList={SCALE_OPTIONS_LIST}
                customStyleContainer={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}
                disable={false}
                customStyleOptionListItem={{ marginRight: '20px' }}
                onBlur={(e) => { }}
                validationOption={{
                  name: "rating",
                  check: true,
                  required: true,
                  type: 'number'
                }}

              />
            </div>
          </div>
        </div>
      </div>
      <div style={rowWrapperStyle}>
        <div style={rowContainerStyle}>
          <div style={rowStyle}>
            <div
              style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
            >
              <span
                className="icon icon-insert-drive-file"
                style={{ ...labelContentStyle, fontSize: "20px" }}
              />
                    &nbsp;
                    <span style={labelContentStyle}>Tell us why you gave this rating</span>
            </div>
            <div style={{ flex: "6 6 0px" }}>
              <Textarea
                onChange={(text, event) => {
                  set_text(text);
                }}
                id="text"
                name="text"
                type="text"
                disable={false}
                placeholder="please write your reason here"
                value={text}
                onBlur={(e) => { }}
                validationOption={{
                  name: "Explanation",
                  check: true,
                  required: true,
                  type: "string",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>

      <div style={{ height: "10px" }} />
      <div type="submit" className={`my-button my-button__red save-button`} onClick={() => {if(!rating || !text) {alert("please fill in the form")} else { handleChange()}}}>Submit Rating</div>
    </form>
  );
}

const rowStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "2%",
  fontSize: "14px",
  color: "white",
};
const rowWrapperStyle = {
  display: "table",
  width: "100%",
};
const rowContainerStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  borderBottom: "1px solid #e5e5e5",
};
const labelStyle = {
  display: "inline-block",
};
const labelContentStyle = {
  verticalAlign: "middle",
};
const input = {
  display: "relative"
}