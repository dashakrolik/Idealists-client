import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../../constants";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Button from "../../../reogranisation/Questions/Button";
import CommentRender from "./CommentRender";
import CommentForm from "./CommentForm";
import "./CommentSection.css";

export default function CommentSection(props) {
  const { id, show } = props;
  const [commentsData, setCommentsData] = useState([]);
  const [showAddComment, setShowAddComment] = useState(false);

  const fetchComments = () => {
    request
      .get(`${baseUrl}/ideas/${id}/comments`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      //   .then((res) => console.log("res.body", res.body));
      .then((res) => {
        setCommentsData(res.body);
      });
  }
  
  useEffect(() => {
    fetchComments()
  }, []);

  const renderComments = () => {
    if (commentsData.length === 0)
      return (
        <StyledCard>
          There are currently no specialist comments on this idea.
        </StyledCard>
      );
    else
      return commentsData.map((comment) => {
        return (
          <CommentRender
            key={comment.id}
            date={comment.createdAt}
            comment={comment.comment}
            user={comment.user}
          />
        );
      });
  };

  const renderAddComment = () => {
    if (!showAddComment)
      return (
        <StyledCard>
          <Button
            text="Add Comment"
            onClick={() => setShowAddComment(!showAddComment)}
          />
        </StyledCard>
      );
    else
      return (
        <CommentForm
          token={props.authState.token}
          id={id}
          showForm={(e) => setShowAddComment(e)}
        />
      );
  };

  return (
    <>
      <StyledCard>
        <Button text="Hide Comments" onClick={() => show(false)} />
      </StyledCard>
      <div className="commentsectioncontent">{renderComments()}</div>
      {/* <StyledCard>
        <Button text="Hide Comments" onClick={() => show(false)} />
      </StyledCard> */}
      {renderAddComment()}
    </>
  );
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
