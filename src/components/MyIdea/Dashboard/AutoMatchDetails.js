/** @jsx jsx */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import request from "superagent";

import { baseUrl } from "../../../constants";
import "./IdeaDashboard.css";
import { jsx } from "@emotion/core";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const IdeaDashboardDetail = (props) => {
  const ideasId = props.match.params.id;
  const [automatchResults, DoAutomatch] = useState([]);
  // const [relScore, getScore] = useState([])
  // const [finalArray, makeArray] = useState([])
  // const automatchId = props.match.params.patentNumber

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((automatch) =>
        DoAutomatch(
          Object.values(
            automatch.body.autoMatch["ipscreener-results"]["index-1"]
          )
        )
      );
  }, []);

  // useEffect(() => {
  //   request
  //     .get(`${baseUrl}/ideas/${ideasId}/automatch`)
  //     .set("Authorization", `Bearer ${props.authState.token}`)
  //     .then(automatch => getScore(automatch.body.autoMatch['ipscreener-results']['index-1']))
  // }, []);

  let automatchTitle = automatchResults.map(
    (result) => result.bibliographic.title[0].text
  );
  let automatchImage = automatchResults.map((result) => result.image.data);
  let automatchText = automatchResults.map(
    (result) => result.description[0].text
  );
  let relevanceNumber = automatchResults.map(
    (result) => result.relevance.number
  );

  var textObject = {};
  relevanceNumber.forEach((key, i) => (textObject[key] = automatchText[i]));

  var imageObject = {};
  relevanceNumber.forEach((key, i) => (imageObject[key] = automatchImage[i]));

  var titleObject = {};
  relevanceNumber.forEach((key, i) => (titleObject[key] = automatchTitle[i]));

  let arrText = [];
  for (let [key, value] of Object.entries(textObject)) {
    let obj = { key, value };
    arrText.push(obj);
  }

  let arrTitle = [];
  for (let [key, value] of Object.entries(titleObject)) {
    let obj = { key, value };
    arrTitle.push(obj);
  }

  const key = props.match.params.patentNumber;

  let arrImage = [];
  for (let [key, value] of Object.entries(imageObject)) {
    let obj = { key, value };
    arrImage.push(obj);
  }

  let clickedText = arrText.find((o) => o.key === key);
  let clickedImage = arrImage.find((o) => o.key === key);
  let clickedTitle = arrTitle.find((o) => o.key === key);

  if (clickedImage && clickedText && clickedTitle) {
    return (
      <Container>
        <FlexRow>
          {clickedImage.value ? (
            <img
              style={{
                width: "400px",
                position: "relative",
                left: "35px",
              }}
              alt="icon"
              src={`data:image/jpeg;base64,${clickedImage.value}`}
            />
          ) : null}
        </FlexRow>
        <Content>
          {/* <a href={'http://www.africau.edu/images/default/sample.pdf'} download><Button text={'Download the Patent details pdf'}/></a> */}

          <div>
            <h2>Title: {clickedTitle.value}</h2>
            <p>{clickedText.value}</p>
          </div>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Content>
          <Heading>Loading...</Heading>
        </Content>
      </Container>
    );
  }
};

const Content = styled.div`
  color: #ffffff;
  width: 90vw;
  height: 100vh;
  padding: 70px;
  display: grid;
  overflow: auto;

  ::-webkit-scrollbar {
    border-radius: 10px;
    background-color: white;
    border: 1px solid #000;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1f7fbb;
    height: 15vh;
  }

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
const Container = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: auto;
  height: auto;

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
const Heading = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin: 100px 10px 80px 10px;
`;

const FlexRow = styled.div`
  display: flex;
  width: 50vw;
  height: 50vh;

  align-items: flex-start;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

// const FlexColumn = styled.div`
//   display: flex;
//   flex: 1;
// `;

// const FormGroup = styled.div`
//   padding: 5px 10px;
//   flex: 1;
// `;

// const GroupTitle = styled.div`
//   font-size: 30px;
//   font-weight: 800;
//   text-align: left;
//   color: #ffffff;
//   position:relative;
//   padding: 5px 15px;
//   flex: 1;
//   margin-bottom: 16px;
// `;

// const GroupSubtitle = styled.div`
//   font-size: 12px;
//   font-weight: 400;
//   text-align: left;
//   color: #ffffff;
//   position:relative;
//   padding: 5px 15px;
//   flex: 1;
//   margin-bottom: 32px;
// `;

// const PGroupContainer = posed.div({
//   preEnter: {
//     x: 600,
//     originX: '50%',
//     originY: '50%',
//     opacity: 0,
//     scale: 0.69,
//     transition: {
//       default: { ease: 'easeInOut', duration: 400 },
//     },
//   },
//   enter: {
//     x: 0,
//     originX: '50%',
//     originY: '50%',
//     opacity: 1.0,
//     scale: 1.0,
//     transition: {
//       default: { ease: 'easeInOut', duration: 400 },
//     },
//   },
//   exit: {
//     x: -600,
//     originX: '50%',
//     originY: '50%',
//     opacity: 0,
//     scale: 0.69,
//     transition: { ease: 'easeInOut', duration: 400 },
//   },
// });

// const GroupContainer = styled(PGroupContainer)`
//   width: 100%;
//   height: auto;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   align-content: center;
//   justify-content: space-evenly;
//   flex-grow: 1;
// `;
export default IdeaDashboardDetail;
