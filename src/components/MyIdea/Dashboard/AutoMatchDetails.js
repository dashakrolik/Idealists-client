/** @jsx jsx */
import styled from '@emotion/styled';
import React, { useEffect, useState, Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'
import { css, Global, jsx } from '@emotion/core';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import { Page, Document, pdfjs } from 'react-pdf';
import Button from '../../reogranisation/Questions/Button'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const IdeaDashboardDetail = (props) => {
  const ideasId = props.match.params.id
  const [automatchResults, DoAutomatch] = useState([])
  const [currentValue, setCurrentValue] = useState([])

  const automatchId = props.match.params.patentNumber

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(automatch => DoAutomatch(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
  }, []);
  
  

  let automatchPdf = automatchResults.map(result => result.pdf)
  

  let automatchImage = automatchResults.map(result => result.image.data)
  

  let automatchText = automatchResults.map(result => result.passage.text)
  

  
  
  // let automatchText = automatchResults.map(result => 
  //   result.passage.text.split('.').slice(1,-1).join() + '.'
  // )

  // let relevanceScore = automatchResults.map(result => result.relevance.score)

  // let relevanceNumber = automatchResults.map(b => b.relevance.number)
  // if (typeof automatchResults.autoMatch === 'object') {
    // console.table(automatchResults.autoMatch['0'].relevance)
  // }
  // var base64ToImage = require('base64-to-image')
  let base64Str = automatchImage[0]
  let base64Str1 = automatchImage[1]
  let base64Str2 = automatchImage[2]
  let base64Str3 = automatchImage[3]
  let base64Str4 = automatchImage[4]
  let base64Str5 = automatchImage[5]
  let base64Str6 = automatchImage[6]
  let base64Str7 = automatchImage[7]
  let base64Str8 = automatchImage[8]
  let base64Str9 = automatchImage[9]


  


//   if (automatchPdf) {
//     return (
//       <Container>
//         <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
//         <Content>{
//           automatchPdf.map(pdf => <div>
//             <Document
//               file={pdf}
//               onLoadSuccess={props.loadPdf}
//             >
//               <Page pageNumber={pageNumber} />
//             </Document>
//             <p>Page {pageNumber} of {numPages}</p>
//           </div>)
//         }
//           </Content>

//         <Global styles={css`
//           body {
//             background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
//           }
//         `} />
//         <Content>
//           <div css={css`grid-area: content-area`}>
//             <div css={css`display: flex; align-items: center; flex-direction: column;`}>
//               <StartContent
//                 css={css`display: flex; flex-direction: column; width: auto; margin-bottom: 60px;`}>
//                 <Heading css={css`@media only screen and (orientation:portrait) { margin-top: 60px;}`}>
//                   Automatch results
//                 </Heading>
//                 {/* { Object.keys(automatchResults).map((key, index) => (
//                   <StyledCard key={relevanceNumber[index]}>
//                     <Link to={`ideas/${ideasId}/automatch/${relevanceNumber[index]}`}>
//                       <Paragraph>
//                         {relevanceScore[index]} | {automatchTitle[index]}
//                       </Paragraph>
//                     </Link>
//                     <Paragraph>
//                       {automatchText[index]}
//                     </Paragraph>
//                   </StyledCard> */}
//                 ))}
//                 <AddlQuestions>
//                   Additional Questions: 
//                   <StyledTextField
//                     id="filled-multiline-flexible"
//                     label="Now that you know what is already out there, which problem does your idea solve?"
//                     multiline
//                     rowsMax="4"
//                     fullWidth
//                     margin="normal"
//                     variant="filled"
//                   />
//                   <StyledTextField
//                     id="filled-multiline-flexible"
//                     label="How do you solve this problem?"
//                     multiline
//                     rowsMax="4"
//                     fullWidth
//                     margin="normal"
//                     variant="filled"
//                   />
//                   <StyledTextField
//                     id="filled-multiline-flexible"
//                     label="How is this (technically) unique?"
//                     multiline
//                     rowsMax="4"
//                     fullWidth
//                     margin="normal"
//                     variant="filled"
//                   />
//                 </AddlQuestions>
//               </StartContent>
//             </div>
//           </div>
//         </Content>
//       </Container>
//     )
//   } else {
//     return (<Heading>Loading...</Heading>)
//   }
// }

return (
  <Content>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

    <a href={'http://www.africau.edu/images/default/sample.pdf'} download><Button text={'Download the Patent details pdf'}
    /></a>
    <img src={`data:image/jpeg;base64,${base64Str}`} />
    <p>{automatchText[0]}</p>
    <img src={`data:image/jpeg;base64,${base64Str1}`} />
    <p>{automatchText[1]}</p>
    <img src={`data:image/jpeg;base64,${base64Str2}`} />
    <p>{automatchText[2]}</p>
    <img src={`data:image/jpeg;base64,${base64Str3}`} />
    <p>{automatchText[3]}</p>
    <img src={`data:image/jpeg;base64,${base64Str4}`} />
    <p>{automatchText[4]}</p>
    <img src={`data:image/jpeg;base64,${base64Str5}`} />
    <p>{automatchText[5]}</p>
    <img src={`data:image/jpeg;base64,${base64Str6}`} />
    <p>{automatchText[6]}</p>
    <img src={`data:image/jpeg;base64,${base64Str7}`} />
    <p>{automatchText[7]}</p>
    <img src={`data:image/jpeg;base64,${base64Str8}`} />
    <p>{automatchText[8]}</p>
    <img src={`data:image/jpeg;base64,${base64Str9}`} />
    <p>{automatchText[9]}</p>
  </Content>
);
}


const Content = styled.div`

    
    width: 80vw;
    max-width: 900px;
    
    
    padding: 20px;
    display: grid;
    
    @media only screen and (orientation:portrait) { 
      grid-template-columns: 1fr;
      grid-template-rows:  auto auto;
      grid-template-areas: "logo-area" "content-area";
    }
    @media only screen and (orientation:landscape) { 
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      grid-template-areas: "logo-area content-area";
    }
  `;
const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media only screen and (orientation:portrait) { 
    flex-direction: column;
}
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const FormGroup = styled.div`
  padding: 5px 10px;
  flex: 1;
`;

const GroupTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: left;
  color: #ffffff;
  position:relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 16px;
`;

const GroupSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  position:relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 32px;
`;

const PGroupContainer = posed.div({
  preEnter: {
    x: 600,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  enter: {
    x: 0,
    originX: '50%',
    originY: '50%',
    opacity: 1.0,
    scale: 1.0,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  exit: {
    x: -600,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    transition: { ease: 'easeInOut', duration: 400 },
  },
});

const GroupContainer = styled(PGroupContainer)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  flex-grow: 1;
`;
export default IdeaDashboardDetail;