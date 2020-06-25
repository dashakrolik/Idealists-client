/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Button from "../../reogranisation/Questions/Button";
import posed from "react-pose";
import SpecialistRegistration from "./SpecialistRegistration";

const CreateSpecialist = (props) => {
  useEffect(() => {
    if (props.authState.loggedIn === false) {
      props.history.push("/MyIdea/login");
    }
    if (props.authState.user.role !== "admin") {
      props.history.push("/MyIdea/login");
    }
  }, []);

  const [uiState, setUiState] = useState("notDisplayingForm");

  const NewSpecialist = () => {
    setUiState("displayingForm");
  };

  const closeForm = () => {
    setUiState("notDisplayingForm");
  };

  return (
    <Container>
      <Global
        styles={css`
          body {
            background-image: linear-gradient(
              to right top,
              #1a3d7c,
              #195d9c,
              #1f7fbb,
              #31a2d7,
              #4cc5f1
            );
          }
        `}
      />
      <Content>
        <div
          css={css`
            grid-area: content-area;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              flex-direction: column;
            `}
          >
            <StartContent
              pose={uiState}
              css={css`
                display: flex;
                flex-direction: column;
                width: auto;
                margin-bottom: 60px;
              `}
            >
              <Heading
                css={css`
                  @media only screen and (orientation: portrait) {
                    margin-top: 60px;
                  }
                `}
              >
                Create a new Specialist
              </Heading>
              <Paragraph>
                Here you can add a specialist. There are four types of
                specialist available to choose from:
                <ul>
                  <li>Patent Specialist</li>
                  <li>Validation Specialist</li>
                  <li>Calculation Specialist</li>
                  <li>Subsidy Specialist</li>
                </ul>
              </Paragraph>

              <Controls
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: flex-start;
                `}
              >
                <Button text={"New Specialist"} onClick={NewSpecialist} />
              </Controls>
            </StartContent>
            <SpecialistRegistration
              props={props}
              show={uiState === "displayingForm"}
              handleCancel={closeForm}
            ></SpecialistRegistration>
          </div>
        </div>
      </Content>
    </Container>
  );
};

const PStartContent = posed.div({
  notDisplayingForm: {
    y: 0,
    opacity: 1.0,
  },
  displayingForm: {
    y: -390,
    opacity: 0.15,
  },
});

const StartContent = styled(PStartContent)`
  width: 100%;
`;

const Controls = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 80vw;
  max-width: 900px;
  height: auto;
  max-height: 500px;
  padding: 20px;
  display: grid;

  @media only screen and (orientation: portrait) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "logo-area" "content-area";
  }
  @media only screen and (orientation: landscape) {
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas: "logo-area content-area";
  }
`;

const Heading = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin: 18px 10px 80px 10px;
`;

const Paragraph = styled.div`
  display: block;
  position: relative;
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px 30px;
`;

const Container = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
  display: flex;
`;

export default CreateSpecialist;
