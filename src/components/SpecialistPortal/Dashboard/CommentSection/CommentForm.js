import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Button from "../../../reogranisation/Questions/Button";
import request from "superagent";
import { baseUrl } from "../../../../constants";
import "./CommentForm.css";

export default function CommentForm(props) {
  const { token, id } = props;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false);

  function AddComment() {
    if (title === "" || message === "") return null;
    else
      request
        .post(`${baseUrl}/ideas/${id}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: { title, message } })
        .then((res) => {
          if (res.status === 201) {
            setSucces(true);
          }
        })
        .catch((err) => {
          if (err.status === 400) {
          } else {
            console.error(err);
          }
        });
  }

  const CancelAddComment = () => props.showForm(false);

  const render = !succes ? (
    <form className="comment-form">
      Title:
      <textarea
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        cols="40"
        rows="1"
      >
        Add a title for your comment
      </textarea>
      Comment:
      <textarea
        name="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        cols="40"
        rows="5"
      >
        Add your comment
      </textarea>
      <div className="comment-form-buttons">
        <Button
          text="Cancel"
          type="cancel"
          onClick={() => {
            CancelAddComment();
          }}
        />
        <Button
          text="Submit"
          type="submit"
          onClick={() => {
            AddComment();
          }}
        />
      </div>
    </form>
  ) : (
    <>
      <h4>Your comment has been succesfully added to the idea!</h4>
      <Button
        text="Close"
        type="close"
        onClick={() => {
          CancelAddComment();
        }}
      />
    </>
  );

  return <StyledCard>{render}</StyledCard>;
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
