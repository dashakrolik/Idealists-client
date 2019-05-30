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
      explanation4: "",
      willPeopleWantThis: "",
      doesThisSolveProblem: "",
      isItAGoodIdea: "",
      isThisTheRightTiming: "",
      proReason1: "",
      proReason2: "",
      proReason3: "",
      proReason4: "",
      proReason5: "",
      againstReason1: "",
      againstReason2: "",
      againstReason3: "",
      againstReason4: "",
      againstReason5: "",
      hasExplanationError: true,
      hasExplanation2Error: true,
      hasExplanation3Error: true,
      hasExplanation4Error: true,
      hasProReason1Error: true,
      hasProReason2Error: true,
      hasProReason3Error: true,
      hasProReason4Error: true,
      hasProReason5Error: true,
      hasAgainstReason1Error: true,
      hasAgainstReason2Error: true,
      hasAgainstReason3Error: true,
      hasAgainstReason4Error: true,
      hasAgainstReason5Error: true,
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
      hasExplanation3Error,
      hasExplanation4Error,
      hasProReason1Error,
      hasProReason2Error,
      hasProReason3Error,
      hasProReason4Error,
      hasProReason5Error,
      hasAgainstReason1Error,
      hasAgainstReason2Error,
      hasAgainstReason3Error,
      hasAgainstReason4Error,
      hasAgainstReason5Error,
      hasMovieError,
      hasWillPeopleWantThisError,
      hasisItAGoodIdeaError,
      hasIsThisTheRightTiming,
      hasDoesThisSolveProblem,
    } = this.state;
    if (
      !hasExplanationError &&
      !hasExplanation2Error &&
      !hasExplanation3Error &&
      !hasExplanation4Error &&
      !hasMovieError &&
      !hasProReason1Error &&
      !hasProReason2Error &&
      !hasProReason3Error &&
      !hasProReason4Error &&
      !hasProReason5Error &&
      !hasAgainstReason1Error &&
      !hasAgainstReason2Error &&
      !hasAgainstReason3Error &&
      !hasAgainstReason4Error &&
      !hasAgainstReason5Error &&
      !hasWillPeopleWantThisError &&
      !hasisItAGoodIdeaError &&
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
      explanation4,
      willPeopleWantThis,
      isThisTheRightTiming,
      isItAGoodIdea,
      doesThisSolveProblem,
      proReason1,
      proReason2,
      proReason3,
      proReason4,
      proReason5,
      againstReason1,
      againstReason2,
      againstReason3,
      againstReason4,
      againstReason5,
      validate
    } = this.state;
    console.log(this.state)
    console.log(this.state.willPeopleWantThis + this.state.isItAGoodIdea + this.state.isThisTheRightTiming + this.state.doesThisSolveProblem)
    const number1 = parseInt(this.state.willPeopleWantThis)
    const number2 = parseInt(this.state.isItAGoodIdea)
    const number3 = parseInt(this.state.isThisTheRightTiming)
    const number4 = parseInt(this.state.doesThisSolveProblem)
    const average = number1 + number2 + number3 + number4
    console.log(typeof average)
    console.log(number1 + number2 + number3 + number4)

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
                  <span style={labelContentStyle}>Is it, in your opinion, a good idea?</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    tabIndex={2} 
                    id="isThisAGoodIdea" 
                    name="isItAGoodIdea" 
                    disabled={false} 
                    value={isItAGoodIdea} 
                    validationCallback={res =>
                      this.setState({ hasisItAGoodIdeaError: res, validate: false })
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
                    onChange={(isItAGoodIdea, e) => {
                      this.setState({ isItAGoodIdea });
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
                    id="explanation4" 
                    name="explanation4" 
                    value={explanation4} 
                    disabled={false} 
                    placeholder="Place your explanation4 here" 
                    validate={validate} 
                    validationCallback={res =>
                      this.setState({
                        hasExplanation4Error: res,
                        validate: false
                      })
                    } 
                    classNameInput="" 
                    classNameWrapper="" 
                    classNameContainer="" 
                    customStyleInput={{}} 
                    customStyleWrapper={{}} 
                    customStyleContainer={{}} 
                    onChange={(explanation4, e) => {
                      this.setState({ explanation4 });
                    }} 
                    onBlur={e => {
                    }} 
                    validationOption={{
                      name: "Explanation4", 
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
                    onChange={(explanation3, e) => {
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
          <div>
          { (this.state.willPeopleWantThis && this.state.doesThisSolveProblem && this.state.isThisTheRightTiming && this.state.isItAGoodIdea) && typeof average === "number" &&
            (
            average / 4) >= 7 
            ?
            ( <div>
              <div style={rowWrapperStyle}>
              <div style={rowContainerStyle}>
                <div style={rowStyle}>
                  <div
                    style={{ ...labelStyle, flex: "3 3 0px", marginTop: "px" }}
                  >
                    <span
                      className="icon icon-insert-drive-file"
                      style={{ ...labelContentStyle, fontSize: "20px" }}
                    />
                    &nbsp;
                    <span style={labelContentStyle}>Imagine you’re an advocate for this idea. Name up to 5 reasons why you would be so ‘pro’ this idea</span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Textarea
                      tabIndex="7" 
                      id="proReason1" 
                      name="proReason1" 
                      value={proReason1} 
                      disabled={false} 
                      placeholder="Place the reason 1 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasProReason1Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(proReason1, e) => {
                        this.setState({ proReason1 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "proReason1", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                    <Textarea
                      tabIndex="7" 
                      id="proReason2" 
                      name="proReason2" 
                      value={proReason2} 
                      disabled={false} 
                      placeholder="Place the reason 2 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasProReason2Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(proReason2, e) => {
                        this.setState({ proReason2 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "proReason2", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                    <Textarea
                      tabIndex="7" 
                      id="proReason3" 
                      name="proReason3" 
                      value={proReason3} 
                      disabled={false} 
                      placeholder="Place the reason 3 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasProReason3Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(proReason3, e) => {
                        this.setState({ proReason3 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "proReason3", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                      <Textarea
                      tabIndex="7" 
                      id="proReason4" 
                      name="proReason4" 
                      value={proReason4} 
                      disabled={false} 
                      placeholder="Place the reason 4 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasProReason4Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(proReason4, e) => {
                        this.setState({ proReason4 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "proReason4", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                      <Textarea
                      tabIndex="7" 
                      id="proReason5" 
                      name="proReason5" 
                      value={proReason5} 
                      disabled={false} 
                      placeholder="Place the reason 5 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasProReason5Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(proReason5, e) => {
                        this.setState({ proReason5 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "proReason5", 
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
                    style={{ ...labelStyle, flex: "3 3 0px", marginTop: "px" }}
                  >
                    <span
                      className="icon icon-insert-drive-file"
                      style={{ ...labelContentStyle, fontSize: "20px" }}
                    />
                    &nbsp;
                    <span style={labelContentStyle}>Imagine you’re an opponent of this idea. Name up to 5 reasons why you would be so ‘against’ this idea:</span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Textarea
                      tabIndex="7" 
                      id="againstReason1" 
                      name="againstReason1" 
                      value={againstReason1} 
                      disabled={false} 
                      placeholder="Place the reason 1 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasAgainstReason1Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(againstReason1, e) => {
                        this.setState({ againstReason1 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "againstReason1", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                    <Textarea
                      tabIndex="7" 
                      id="againstReason2" 
                      name="againstReason2" 
                      value={againstReason2} 
                      disabled={false} 
                      placeholder="Place the reason 2 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasAgainstReason2Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(againstReason2, e) => {
                        this.setState({ againstReason2 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "againstReason2", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                    <Textarea
                      tabIndex="7" 
                      id="againstReason3" 
                      name="againstReason3" 
                      value={againstReason3} 
                      disabled={false} 
                      placeholder="Place the reason 3 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasAgainstReason3Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(againstReason3, e) => {
                        this.setState({ againstReason3 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "againstReason3", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                      <Textarea
                      tabIndex="7" 
                      id="againstReason4" 
                      name="againstReason4" 
                      value={againstReason4} 
                      disabled={false} 
                      placeholder="Place the reason 4 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasAgainstReason4Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(againstReason4, e) => {
                        this.setState({ againstReason4 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "againstReason4", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    /><br></br>
                      <Textarea
                      tabIndex="7" 
                      id="againstReason5" 
                      name="againstReason5" 
                      value={againstReason5} 
                      disabled={false} 
                      placeholder="Place the reason 5 here" 
                      validate={validate} 
                      validationCallback={res =>
                        this.setState({
                          hasAgainstReason5Error: res,
                          validate: false
                        })
                      } 
                      classNameInput="" 
                      classNameWrapper="" 
                      classNameContainer="" 
                      customStyleInput={{}} 
                      customStyleWrapper={{}} 
                      customStyleContainer={{}} 
                      onChange={(againstReason5, e) => {
                        this.setState({ againstReason5 });
  
                      }} 
                      onBlur={e => {
  
                      }} 
                      validationOption={{
                        name: "againstReason5", 
                        check: true,
                        required: true, 
                        type: "string" 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
            ) 
            :
            (<div>Average is lower than 7</div>)}
          </div>
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