/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SubmissionSideScreen = (props) => {
  return (
    <div style={{ width: props.agreementSection ? "150xp" : "auto" }}>
      <Left>
        <FlexRow>
          <FlexColumn>
            <GroupTitle>{props.title}</GroupTitle>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <FlexColumn>
            <GroupSubtitle>{props.description}</GroupSubtitle>
          </FlexColumn>
        </FlexRow>
      </Left>
    </div>
  );
};

const Left = styled.div`
  grid-area: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
`;

const GroupTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: left;
  color: #ffffff;
  position: relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 16px;
`;

const GroupSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  position: relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 32px;
`;

const FlexRow = styled.div`
  display: flex;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

// const FormGroup = styled.div`
//   width: 100%;
//   padding: 5px 10px;
// `;

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: grid;
//   grid-template-columns: 1fr 3fr;
//   grid-template-rows: 1fr;
//   grid-template-areas: "left right";
// `;

export default SubmissionSideScreen;
