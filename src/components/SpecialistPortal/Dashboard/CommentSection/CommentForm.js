import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Button from "../../../reogranisation/Questions/Button";
import request from "superagent";
import { baseUrl } from "../../../../constants";
import "./CommentForm.css";
import Spinner from "../../../reogranisation/Spinner";

export default function CommentForm(props) {
  const { 
    token, id, loaded, reFetch, 
    commentId, pre_title, pre_message, edited } = props;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false);
  const [sentComment, setSentComment] = useState(false);

  function AddComment() {
    if (title === "" || message === "") return null;
    else if (edited){
      setSentComment(true)
      request
        .put(`${baseUrl}/ideas/${id}/edit/comments/${commentId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: { title, message } })
        .then((res) => {
          if (res.status === 201) {
            setSucces(true);
            setSentComment(false)
            reFetch()
          }
        })
        .catch((err) => {
          if (err.status === 400) {
          } else {
            console.error(err);
          }
        });
    }
    else if(!edited && !sentComment){
      setSentComment(true)
      request
        .post(`${baseUrl}/ideas/${id}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: { title, message } })
        .then((res) => {
          if (res.status === 201) {
              setSucces(true);
              setSentComment(false)
              reFetch()
          }
        })
        .catch((err) => {
          if (err.status === 400) {
          } else {
            console.error(err);
          }
        });
      }
  }

  const CancelAddComment = () => props.showForm(false);

  const placeholderTitle = () => {
    if(pre_title){
      return pre_title
    } else{
      return "Add a title for your comment"
    }
  }

  const placeholderMessage = () => {
    if(pre_message){
      return pre_message
    } else{
      return "Add a title for your comment"
    }
  }
  
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
        placeholder={placeholderTitle()}
      >
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
        placeholder={placeholderMessage()}
      >
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
      )

  return (
  <StyledCard>
    {sentComment && loaded ? <Spinner /> : render}
  </StyledCard>);
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
