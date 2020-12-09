import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import "./CommentRender.css";

export default function CommentRender(props) {
  const { comment, user, date } = props;
  const [editForm, setEditForm] = useState(false)
  const showDate = new Date(date);

  console.log("ID:", props.idComment)
  const render = () => {
    if(!editForm){
      return(
        <StyledCard>
          <div className="comment-container">
            <div className="left">
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              <h5>
                {user.specialistType.charAt(0).toUpperCase() +
                  user.specialistType.slice(1)}{" "}
                Specialist
              </h5>
              <p>{showDate.toUTCString()}</p>
            </div>
            <div className="right">
              <h4>{comment.title}</h4>
              <p>{comment.message}</p>
            </div>
            <div className="far-right">
              <img
                src="https://res.cloudinary.com/djzjepmnr/image/upload/v1606984303/8809785241586787932-128_j22ghh.png"
                alt="Edit"
                width="30px"
                height="30px"
                onClick={() => setEditForm(true)}
              />
            </div>
          </div>
        </StyledCard>
      );
    } else {
      return(
        <props.commentForm
          token={props.token}
          id={props.id}
          loaded={props.loaded}
          reFetch={props.reFetch}
          commentId={props.idComment}
          pre_message={comment.message}
          pre_title={comment.title}
          edited={true} 
          showForm={(e) => setEditForm(e)}/>
      );
    }
  }

  return(
    <>
      {render()}
    </>
  )
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
