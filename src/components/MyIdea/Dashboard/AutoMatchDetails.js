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
import pdfff from '../../../AlperTunca_Resume.pdf'
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
  
  console.log(automatchResults)
  let automatchPdf = automatchResults.map(result => result.pdf)
  console.log(automatchPdf)
  // let automatchText = automatchResults.map(result => 
  //   result.passage.text.split('.').slice(1,-1).join() + '.'
  // )

  // let relevanceScore = automatchResults.map(result => result.relevance.score)

  // let relevanceNumber = automatchResults.map(b => b.relevance.number)
  // if (typeof automatchResults.autoMatch === 'object') {
    // console.table(automatchResults.autoMatch['0'].relevance)
  // }

  const [pageNumber, getPageNumber] = useState([null])
  const [numPages, getNumPages] = useState([1])

  class PatentPdf extends Component {

    state = { numPages: null, pageNumber: 1, value: null };

    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages })
    }
    goToPrevPage = () =>{
      if (this.state.pageNumber === 1) {
        this.state.pageNumber = 1
      }else{
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
      }}
    goToNextPage = () =>{
    if (this.state.pageNumber === 2) {
      this.state.pageNumber = 2
    }else{
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }}
    

    render() {
      const { pageNumber, numPages, value } = this.state;
      return (
        <div>
          <div style={{ width: 600 }}>
            <Document
              file= {{url:'http://www.africau.edu/images/default/sample.pdf',
              httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, 
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin' : true
            }}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={600} />
            </Document>
          </div>
          <br />

          <nav>
            <button style={{ backgroundColor: "inherit", color: "white", borderRadius: "10px" }}
              onClick={this.goToPrevPage}>Prev Page</button>
            <button style={{ backgroundColor: "inherit", color: "white", borderRadius: "10px" }}
              onClick={this.goToNextPage}>Next Page</button>
          </nav>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      );
    }
  }

  


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
  <GroupContainer>
    <PatentPdf />

    <a href={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} download><Button text={'Download the Patent details pdf'}
    /></a>
  </GroupContainer>
);
}

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