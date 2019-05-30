import styled from '@emotion/styled';
import Card from '@material-ui/core/Card'
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "./InvestorDashboard.css";

const SCALE_OPTIONS_LIST = [
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
  { id: "5", name: "5" },
  { id: "6", name: "6" },
  { id: "7", name: "7" },
  { id: "8", name: "8" },
  { id: "9", name: "9" },
  { id: "10", name: "10" }
];


export default class FormAssessIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      explanation: "",
      explanation2: "",
      explanation3: "",
      willPeopleWantThis: "",
      doesThisSolveProblem: "",
      isThisTheRightTiming: "",
      hasExplanationError: true,
      hasExplanation2Error: true,
      hasMovieError: true,
      hasWillPeopleWantThisError: true,
      validate: false
    };
    this.validateForm = this.validateForm.bind(this);
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const {
      hasExplanationError,
      hasExplanation2Error,
      hasMovieError,
      hasWillPeopleWantThisError,
      hasIsThisTheRightTiming,
      hasDoesThisSolveProblem,
    } = this.state;
    if (
      !hasExplanationError &&
      !hasExplanation2Error &&
      !hasMovieError &&
      !hasWillPeopleWantThisError &&
      !hasIsThisTheRightTiming &&
      !hasDoesThisSolveProblem 
    ) {
      alert("All validated!");
      
    }
  }

  render() {
    const {
      number,
      explanation,
      explanation2,
      explanation3,
      willPeopleWantThis,
      isThisTheRightTiming,
      doesThisSolveProblem,
      validate
    } = this.state;
    console.log(this.state)

    const rowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "2%",
      fontSize: "14px"
    };
    const rowWrapperStyle = {
      display: "table",
      width: "100%"
    };
    const rowContainerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e5e5"
    };
    const labelStyle = {
      display: "inline-block"
    };
    const labelContentStyle = {
      verticalAlign: "middle"
    };

    return (
      <div
        style={{
          minHeight: "1000px",
          padding: "10px",
          border: "1px solid #e5e5e5"
        }}
      >
        <br></br><br></br><br></br><br></br>
        <h1>Assess the idea</h1>
        
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
        <br></br><br></br><br></br>
        <form onSubmit={this.validateForm} className='form'>
  
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                  <span
                    className="icon icon-info"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Will people want this?</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    tabIndex={2} 
                    id="willPeopleWantThis" 
                    name="willPeopleWantThis" 
                    disabled={false} 
                    value={willPeopleWantThis} 
                    validate={validate} 
                    validationCallback={res =>
                      this.setState({ hasWillPeopleWantThisError: res, validate: false })
                    } 
                    optionList={SCALE_OPTIONS_LIST}
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    classNameOptionListItem="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }} 
                    customStyleOptionListItem={{ marginRight: "20px" }} 
                    onChange={(willPeopleWantThis, e) => {
                      this.setState({ willPeopleWantThis });
                    }} 
                    onBlur={e => {
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
                  <span style={labelContentStyle}>Explanation</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    tabIndex="7" 
                    id="explanation" 
                    name="explanation" 
                    value={explanation} 
                    disabled={false} 
                    placeholder="Place your explanation here" 
                    validate={validate} 
                    validationCallback={res =>
                      this.setState({
                        hasExplanationError: res,
                        validate: false
                      })
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(explanation, e) => {
                      this.setState({ explanation });

                    }} 
                    onBlur={e => {

                    }} 
                    validationOption={{
                      name: "Explanation", 
                      check: true,
                      required: true, 
                      type: "string" 
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
                  {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                  <span
                    className="icon icon-info"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Does this solve a problem people currently have?</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    tabIndex={2} 
                    id="doesThisSolveProblem" 
                    name="doesThisSolveProblem" 
                    disabled={false} 
                    value={doesThisSolveProblem} 
                    validationCallback={res =>
                      this.setState({ hasDoesThisSolveProblem: res, validate: false })
                    } 
                    optionList={SCALE_OPTIONS_LIST}
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    classNameOptionListItem="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }} 
                    customStyleOptionListItem={{ marginRight: "20px" }} 
                    onChange={(doesThisSolveProblem, e) => {
                      this.setState({ doesThisSolveProblem });
                    }} 
                    onBlur={e => {
                    }} 
    
                    validationOption={{
                      name: "Name", 
                      check: true, 
                      required: true 
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
                  <span style={labelContentStyle}>If so, which problem + explanation</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    tabIndex="7" 
                    id="explanation2" 
                    name="explanation2" 
                    value={explanation2} 
                    disabled={false} 
                    placeholder="Place your explanation2 here" 
                    validate={validate} 
                    validationCallback={res =>
                      this.setState({
                        hasExplanation2Error: res,
                        validate: false
                      })
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(explanation2, e) => {
                      this.setState({ explanation2 });
                    }} 
                    onBlur={e => {
                    }} 
                    validationOption={{
                      name: "Explanation2", 
                      check: true, 
                      required: true, 
                      type: "string" 
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
                  {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                  <span
                    className="icon icon-info"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Is it the right timing for this idea?</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    tabIndex={2} 
                    id="isThisTheRightTiming" 
                    name="isThisTheRightTiming" 
                    disabled={false} 
                    value={isThisTheRightTiming} 
                    validationCallback={res =>
                      this.setState({ hasIsThisTheRightTiming: res, validate: false })
                    } 
                    optionList={SCALE_OPTIONS_LIST}
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    classNameOptionListItem="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }} 
                    customStyleOptionListItem={{ marginRight: "20px" }} 
                    onChange={(isThisTheRightTiming, e) => {
                      this.setState({ isThisTheRightTiming });
                    }} 
                    onBlur={e => {
                    }} 
    
                    validationOption={{
                      name: "Name", 
                      check: true, 
                      required: true 
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
                  <span style={labelContentStyle}>Explanation</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    tabIndex="7" 
                    id="explanation3" 
                    name="explanation3" 
                    value={explanation3} 
                    disabled={false} 
                    placeholder="Place your explanation3 here" 
                    validate={validate} 
                    validationCallback={res =>
                      this.setState({
                        hasExplanation3Error: res,
                        validate: false
                      })
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(explanation2, e) => {
                      this.setState({ explanation3 });
                    }} 
                    onBlur={e => {
                    }} 
                    validationOption={{
                      name: "Explanation3", 
                      check: true, 
                      required: true, 
                      type: "string" 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>{(this.state.willPeopleWantThis + this.state.doesThisSolveProblem + this.state.isThisTheRightTiming) / 3 >= 7 ? (<div>Average is higher than 7</div>) : (<div>Average is lower than 7></div>)}</div>
          <div style={{ height: "10px" }} />
          <div
            className={`my-button my-button__red save-button`}
            onClick={this.validateForm}
          >
            Submit
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}




const Content = styled.div`
    align-self: center;
    justify-self: center;
    color: #ffffff;
    width: 90vw;
    max-width: 800px;
    height: auto;
    padding: 20px;
    
`;

const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding-left: 8px;
    padding-right: 8px;
`;