import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import ReactDOM from "react-dom";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select,
} from "react-inputs-validation";
import request from "superagent";
import { baseUrl } from "../../../constants";
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
  { id: "10", name: "10" },
];

export default class FormAssessIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementStar: false,
      agreementStarNo: false,
      agreementMentor: false,
      agreementMentorNo: false,
      isAgreementStarChecked: false,
      isAgreementStarNoChecked: false,
      isAgreementMentorChecked: false,
      isAgreementMentorNoChecked: false,
      explanation: "",
      explanation2: "",
      explanation3: "",
      explanation4: "",
      explanation5: "",
      explanation6: "",
      explanation7: "",
      explanation8: "",
      explanation9: "",
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
      // whatDoYouExpectAsTimeImpact: "",
      // whatDoYouExpectAsMagnitude: "",
      hasExplanationError: true,
      hasExplanation2Error: true,
      hasExplanation3Error: true,
      hasExplanation4Error: true,
      // hasExplanation5Error: true,
      // hasExplanation6Error: true,
      // hasExplanation7Error: true,
      // hasExplanation8Error: true,
      // hasExplanation9Error: true,
      // hasProReason1Error: true,
      // hasProReason2Error: true,
      // hasProReason3Error: true,
      // hasProReason4Error: true,
      // hasProReason5Error: true,
      // hasAgainstReason1Error: true,
      // hasAgainstReason2Error: true,
      // hasAgainstReason3Error: true,
      // hasAgainstReason4Error: true,
      // hasAgainstReason5Error: true,
      // hasWhatDoYouExpectAsTimeImpactError: true,
      // hasWhatDoYouExpectAsMagnitudeError: true,
      // hasWillPeopleWantThisError: true,
      validate: false,
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
      // hasExplanation5Error,
      // hasExplanation6Error,
      // hasExplanation7Error,
      // hasExplanation8Error,
      // hasExplanation9Error,
      // hasProReason1Error,
      // hasProReason2Error,
      // hasProReason3Error,
      // hasProReason4Error,
      // hasProReason5Error,
      // hasAgainstReason1Error,
      // hasAgainstReason2Error,
      // hasAgainstReason3Error,
      // hasAgainstReason4Error,
      // hasAgainstReason5Error,
      hasWillPeopleWantThisError,
      hasisItAGoodIdeaError,
      hasIsThisTheRightTiming,
      hasDoesThisSolveProblem,
      hasWhatDoYouExpectAsTimeImpactError,
      hasWhatDoYouExpectAsMagnitudeError,
      hasAgreementStarError,
      hasAgreementStarNoError,
      hasAgreementMentorError,
      hasAgreementMentorNoError,
    } = this.state;
    if (
      !hasExplanationError &&
      !hasExplanation2Error &&
      !hasExplanation3Error &&
      !hasExplanation4Error &&
      // !hasExplanation5Error &&
      // !hasExplanation6Error &&
      // !hasExplanation7Error &&
      // !hasExplanation8Error &&
      // !hasExplanation9Error &&
      // !hasProReason1Error &&
      // !hasProReason2Error &&
      // !hasProReason3Error &&
      // !hasProReason4Error &&
      // !hasProReason5Error &&
      // !hasAgainstReason1Error &&
      // !hasAgainstReason2Error &&
      // !hasAgainstReason3Error &&
      // !hasAgainstReason4Error &&
      // !hasAgainstReason5Error &&
      !hasWillPeopleWantThisError &&
      !hasisItAGoodIdeaError &&
      !hasIsThisTheRightTiming &&
      !hasDoesThisSolveProblem
      // !hasWhatDoYouExpectAsTimeImpactError &&
      // !hasWhatDoYouExpectAsMagnitudeError &&
      // !hasAgreementStarError &&
      // !hasAgreementStarNoError &&
      // !hasAgreementMentorError &&
      // !hasAgreementMentorNoError
    ) {
      //calculate a complete score given to an idea and pass it in the post req. alongside the assessment
      const rawScore =
        parseInt(this.state.willPeopleWantThis) +
        parseInt(this.state.isItAGoodIdea) +
        parseInt(this.state.isThisTheRightTiming) +
        parseInt(this.state.doesThisSolveProblem) +
        (this.state.whatDoYouExpectAsTimeImpact
          ? parseInt(this.state.whatDoYouExpectAsTimeImpact)
          : 0) +
        (this.state.whatDoYouExpectAsMagnitude
          ? parseInt(this.state.whatDoYouExpectAsMagnitude)
          : 0);
      // submit assessment and score to the server/database

      request
        .post(`${baseUrl}/assessments/${this.props.match.params.id}`)
        .set("Authorization", `Bearer ${this.props.authState.token}`)
        .send({ assessment: this.state, weight: rawScore })
        .then((res) => {
          if (res.status === 201) {
            return this.props.history.push("/AssessmentSubmitted");
          }
        })
        .catch((err) => {
          if (err.status === 400) {
            // dispatch(userLoginFailed(err.response.body.message))
          } else {
            console.error(err);
          }
        });
    }
  }

  render() {
    if (!this.props.authState.loggedIn) {
      return <Redirect to="/Investors/login" />;
    } else if (this.props.authState.loggedIn) {
      const {
        agreementStar,
        agreementStarNo,
        agreementMentor,
        agreementMentorNo,
        isAgreementStarChecked,
        isAgreementStarNoChecked,
        isAgreementMentorChecked,
        isAgreementMentorNoChecked,
        explanation,
        explanation2,
        explanation3,
        explanation4,
        explanation5,
        explanation6,
        explanation7,
        explanation8,
        explanation9,
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
        whatDoYouExpectAsTimeImpact,
        whatDoYouExpectAsMagnitude,
        validate,
      } = this.state;

      const number1 = parseInt(this.state.willPeopleWantThis);
      const number2 = parseInt(this.state.isItAGoodIdea);
      const number3 = parseInt(this.state.isThisTheRightTiming);
      const number4 = parseInt(this.state.doesThisSolveProblem);
      const average = number1 + number2 + number3 + number4;

      const rowStyle = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "2%",
        fontSize: "14px",
        color: "white",
      };
      const rowWrapperStyle = {
        display: "table",
        width: "100%",
      };
      const rowContainerStyle = {
        display: "table-cell",
        verticalAlign: "middle",
        borderBottom: "1px solid #e5e5e5",
      };
      const labelStyle = {
        display: "inline-block",
      };
      const labelContentStyle = {
        verticalAlign: "middle",
      };

      return (
        <div
          style={{
            minHeight: "1000px",
            padding: "10px",
            border: "1px solid #e5e5e5",
            backgroundImage:
              "linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1)",
          }}
        >
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Assess the idea
          </h1>

          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={this.validateForm} className="form">
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
                    <span style={labelContentStyle}>
                      Will people want this?
                    </span>
                  </div>
                  <div style={{ flex: "6 6 0px", display: "flex" }}>
                    <Radiobox
                      tabIndex={2}
                      id="willPeopleWantThis"
                      name="willPeopleWantThis"
                      disabled={false}
                      value={willPeopleWantThis}
                      validate={validate}
                      validationCallback={(res) =>
                        this.setState({
                          hasWillPeopleWantThisError: res,
                          validate: false,
                        })
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
                        justifyContent: "flex-start",
                      }}
                      customStyleOptionListItem={{ marginRight: "20px" }}
                      onChange={(willPeopleWantThis, e) => {
                        this.setState({ willPeopleWantThis });
                      }}
                      onBlur={(e) => {}}
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
                      validationCallback={(res) =>
                        this.setState({
                          hasExplanationError: res,
                          validate: false,
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
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Explanation",
                        check: true,
                        required: true,
                        type: "string",
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
                    <span style={labelContentStyle}>
                      Does this solve a problem people currently have?
                    </span>
                  </div>
                  <div style={{ flex: "6 6 0px", display: "flex" }}>
                    <Radiobox
                      tabIndex={2}
                      id="doesThisSolveProblem"
                      name="doesThisSolveProblem"
                      disabled={false}
                      value={doesThisSolveProblem}
                      validationCallback={(res) =>
                        this.setState({
                          hasDoesThisSolveProblem: res,
                          validate: false,
                        })
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
                        justifyContent: "flex-start",
                      }}
                      customStyleOptionListItem={{ marginRight: "20px" }}
                      onChange={(doesThisSolveProblem, e) => {
                        this.setState({ doesThisSolveProblem });
                      }}
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Name",
                        check: true,
                        required: true,
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
                    <span style={labelContentStyle}>
                      If so, which problem + explanation
                    </span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Textarea
                      tabIndex="7"
                      id="explanation2"
                      name="explanation2"
                      value={explanation2}
                      disabled={false}
                      placeholder="Place your explanation here"
                      validate={validate}
                      validationCallback={(res) =>
                        this.setState({
                          hasExplanation2Error: res,
                          validate: false,
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
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Explanation2",
                        check: true,
                        required: true,
                        type: "string",
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
                    <span style={labelContentStyle}>
                      Is it, in your opinion, a good idea?
                    </span>
                  </div>
                  <div style={{ flex: "6 6 0px", display: "flex" }}>
                    <Radiobox
                      tabIndex={2}
                      id="isThisAGoodIdea"
                      name="isItAGoodIdea"
                      disabled={false}
                      value={isItAGoodIdea}
                      validationCallback={(res) =>
                        this.setState({
                          hasisItAGoodIdeaError: res,
                          validate: false,
                        })
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
                        justifyContent: "flex-start",
                      }}
                      customStyleOptionListItem={{ marginRight: "20px" }}
                      onChange={(isItAGoodIdea, e) => {
                        this.setState({ isItAGoodIdea });
                      }}
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Name",
                        check: true,
                        required: true,
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
                      placeholder="Place your explanation here"
                      validate={validate}
                      validationCallback={(res) =>
                        this.setState({
                          hasExplanation4Error: res,
                          validate: false,
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
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Explanation4",
                        check: true,
                        required: true,
                        type: "string",
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
                    <span style={labelContentStyle}>
                      Is it the right timing for this idea?
                    </span>
                  </div>
                  <div style={{ flex: "6 6 0px", display: "flex" }}>
                    <Radiobox
                      tabIndex={2}
                      id="isThisTheRightTiming"
                      name="isThisTheRightTiming"
                      disabled={false}
                      value={isThisTheRightTiming}
                      validationCallback={(res) =>
                        this.setState({
                          hasIsThisTheRightTiming: res,
                          validate: false,
                        })
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
                        justifyContent: "flex-start",
                      }}
                      customStyleOptionListItem={{ marginRight: "20px" }}
                      onChange={(isThisTheRightTiming, e) => {
                        this.setState({ isThisTheRightTiming });
                      }}
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Name",
                        check: true,
                        required: true,
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
                      placeholder="Place your explanation here"
                      validate={validate}
                      validationCallback={(res) =>
                        this.setState({
                          hasExplanation3Error: res,
                          validate: false,
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
                      onBlur={(e) => {}}
                      validationOption={{
                        name: "Explanation3",
                        check: true,
                        required: true,
                        type: "string",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {
                this.state.willPeopleWantThis &&
                this.state.doesThisSolveProblem &&
                this.state.isThisTheRightTiming &&
                this.state.isItAGoodIdea &&
                typeof average === "number" &&
                average / 4 >= 7 ? (
                  <div>
                    <div style={rowWrapperStyle}>
                      <div style={rowContainerStyle}>
                        <div style={rowStyle}>
                          <div
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "px",
                            }}
                          >
                            <span
                              className="icon icon-insert-drive-file"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Imagine you’re an advocate for this idea. Name up
                              to 5 reasons why you would be so ‘pro’ this idea
                            </span>
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
                              validationCallback={(res) =>
                                this.setState({
                                  hasProReason1Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "proReason1",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="proReason2"
                              name="proReason2"
                              value={proReason2}
                              disabled={false}
                              placeholder="Place the reason 2 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasProReason2Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "proReason2",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="proReason3"
                              name="proReason3"
                              value={proReason3}
                              disabled={false}
                              placeholder="Place the reason 3 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasProReason3Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "proReason3",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="proReason4"
                              name="proReason4"
                              value={proReason4}
                              disabled={false}
                              placeholder="Place the reason 4 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasProReason4Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "proReason4",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="proReason5"
                              name="proReason5"
                              value={proReason5}
                              disabled={false}
                              placeholder="Place the reason 5 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasProReason5Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "proReason5",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "px",
                            }}
                          >
                            <span
                              className="icon icon-insert-drive-file"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Imagine you’re an opponent of this idea. Name up
                              to 5 reasons why you would be so ‘against’ this
                              idea:
                            </span>
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
                              validationCallback={(res) =>
                                this.setState({
                                  hasAgainstReason1Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "againstReason1",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="againstReason2"
                              name="againstReason2"
                              value={againstReason2}
                              disabled={false}
                              placeholder="Place the reason 2 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasAgainstReason2Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "againstReason2",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="againstReason3"
                              name="againstReason3"
                              value={againstReason3}
                              disabled={false}
                              placeholder="Place the reason 3 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasAgainstReason3Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "againstReason3",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="againstReason4"
                              name="againstReason4"
                              value={againstReason4}
                              disabled={false}
                              placeholder="Place the reason 4 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasAgainstReason4Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "againstReason4",
                                check: true,
                                required: true,
                                type: "string",
                              }}
                            />
                            <br></br>
                            <Textarea
                              tabIndex="7"
                              id="againstReason5"
                              name="againstReason5"
                              value={againstReason5}
                              disabled={false}
                              placeholder="Place the reason 5 here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasAgainstReason5Error: res,
                                  validate: false,
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
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "againstReason5",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                            <span
                              className="icon icon-info"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              What do you expect as time to impact for this idea
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px", display: "flex" }}>
                            <Radiobox
                              tabIndex={2}
                              id="whatDoYouExpectAsTimeImpact"
                              name="whatDoYouExpectAsTimeImpact"
                              disabled={false}
                              value={whatDoYouExpectAsTimeImpact}
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasWhatDoYouExpectAsTimeImpactError: res,
                                  validate: false,
                                })
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
                                justifyContent: "flex-start",
                              }}
                              customStyleOptionListItem={{
                                marginRight: "20px",
                              }}
                              onChange={(whatDoYouExpectAsTimeImpact, e) => {
                                this.setState({ whatDoYouExpectAsTimeImpact });
                              }}
                              onBlur={(e) => {}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={rowWrapperStyle}>
                      <div style={rowContainerStyle}>
                        <div style={rowStyle}>
                          <div
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
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
                              id="explanation5"
                              name="explanation5"
                              value={explanation5}
                              disabled={false}
                              placeholder="Place your explanation here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasExplanation5Error: res,
                                  validate: false,
                                })
                              }
                              classNameInput=""
                              classNameWrapper=""
                              classNameContainer=""
                              customStyleInput={{}}
                              customStyleWrapper={{}}
                              customStyleContainer={{}}
                              onChange={(explanation5, e) => {
                                this.setState({ explanation5 });
                              }}
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "Explanation5",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                            <span
                              className="icon icon-info"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              What do you expect as magnitude of impact for this
                              idea?
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px", display: "flex" }}>
                            <Radiobox
                              tabIndex={2}
                              id="whatDoYouExpectAsMagnitude"
                              name="whatDoYouExpectAsMagnitude"
                              disabled={false}
                              value={whatDoYouExpectAsMagnitude}
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasWhatDoYouExpectAsMagnitudeError: res,
                                  validate: false,
                                })
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
                                justifyContent: "flex-start",
                              }}
                              customStyleOptionListItem={{
                                marginRight: "20px",
                              }}
                              onChange={(whatDoYouExpectAsMagnitude, e) => {
                                this.setState({ whatDoYouExpectAsMagnitude });
                              }}
                              onBlur={(e) => {}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={rowWrapperStyle}>
                      <div style={rowContainerStyle}>
                        <div style={rowStyle}>
                          <div
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
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
                              id="explanation6"
                              name="explanation6"
                              value={explanation6}
                              disabled={false}
                              placeholder="Place your explanation here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasExplanation6Error: res,
                                  validate: false,
                                })
                              }
                              classNameInput=""
                              classNameWrapper=""
                              classNameContainer=""
                              customStyleInput={{}}
                              customStyleWrapper={{}}
                              customStyleContainer={{}}
                              onChange={(explanation6, e) => {
                                this.setState({ explanation6 });
                              }}
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "Explanation6",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            <span
                              className="icon icon-insert-drive-file"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Why is this not yet out there? Why have people in
                              this field or that could be helped by it, not
                              successfully created it yet?
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px" }}>
                            <Textarea
                              tabIndex="7"
                              id="explanation7"
                              name="explanation7"
                              value={explanation7}
                              disabled={false}
                              placeholder="Place your explanation here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasExplanation7Error: res,
                                  validate: false,
                                })
                              }
                              classNameInput=""
                              classNameWrapper=""
                              classNameContainer=""
                              customStyleInput={{}}
                              customStyleWrapper={{}}
                              customStyleContainer={{}}
                              onChange={(explanation7, e) => {
                                this.setState({ explanation7 });
                              }}
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "Explanation7",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            <span
                              className="icon icon-insert-drive-file"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Who would in your opinion be the ideal customers
                              for this idea?
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px" }}>
                            <Textarea
                              tabIndex="7"
                              id="explanation8"
                              name="explanation8"
                              value={explanation8}
                              disabled={false}
                              placeholder="Place your explanation here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasExplanation8Error: res,
                                  validate: false,
                                })
                              }
                              classNameInput=""
                              classNameWrapper=""
                              classNameContainer=""
                              customStyleInput={{}}
                              customStyleWrapper={{}}
                              customStyleContainer={{}}
                              onChange={(explanation8, e) => {
                                this.setState({ explanation8 });
                              }}
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "Explanation8",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            <span
                              className="icon icon-insert-drive-file"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Can you think of a way to make this idea even
                              better?
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px" }}>
                            <Textarea
                              tabIndex="7"
                              id="explanation9"
                              name="explanation9"
                              value={explanation9}
                              disabled={false}
                              placeholder="Place your explanation here"
                              validate={validate}
                              validationCallback={(res) =>
                                this.setState({
                                  hasExplanation9Error: res,
                                  validate: false,
                                })
                              }
                              classNameInput=""
                              classNameWrapper=""
                              classNameContainer=""
                              customStyleInput={{}}
                              customStyleWrapper={{}}
                              customStyleContainer={{}}
                              onChange={(explanation9, e) => {
                                this.setState({ explanation9 });
                              }}
                              onBlur={(e) => {}}
                              validationOption={{
                                name: "Explanation9",
                                check: true,
                                required: true,
                                type: "string",
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                            <span
                              className="icon icon-assignment-late"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Do you want to champion this idea by giving it a
                              star? By doing this, we will more
                              extensivelyreview this idea even it fails to get
                              an average score of 7+ on the first set of
                              questions by all reviewers.
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px" }}>
                            <Checkbox
                              tabIndex="5" // Optional.[String or Number].Default: -1.
                              id={"agreementStar"} // Optional.[String].Default: "".  Input ID.
                              name={"agreementStar"} // Optional.[String].Default: "". Input name
                              value={agreementStar} // Required.[String].Default: "".
                              checked={isAgreementStarChecked} // Required.[Bool].Default: false.
                              disabled={isAgreementStarNoChecked ? true : false} // Optional.[Bool].Default: false.
                              validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                              validationCallback={(res) => {
                                this.setState({
                                  hasAgreementStarError: res,
                                  validate: false,
                                });
                              }} // Optional.[Func].Default: none. Return the validation result.
                              classNameWrapper="" // Optional.[String].Default: "".
                              classNameInputBox="" // Optional.[String].Default: "".
                              classNameContainer="" // Optional.[String].Default: "".
                              customStyleWrapper={{}} // Optional.[Object].Default: {}.
                              customStyleInputBox={{ backgroundColor: "white" }} // Optional.[Object].Default: {}.
                              customStyleContainer={{}} // Optional.[Object].Default: {}.
                              onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                              // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              onChange={(isAgreementStarChecked, e) => {
                                this.setState({ isAgreementStarChecked });
                                // console.log(e);
                              }} // Required.[Func].Default: () => {}. Will return the value.
                              labelHtml={
                                <div
                                  style={{ color: "white", marginTop: "5px" }}
                                >
                                  Yes, I’d like to champion this idea because I
                                  believe it could be brilliant
                                </div>
                              } // Required.[Html].Default: none.
                              validationOption={{
                                name: "agreementStar", // Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                                check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                required: false, // Optional.[Bool].Default: true. To determin if it is a required field.
                                // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                                // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                                // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                                // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                              }}
                            />
                            <Checkbox
                              tabIndex="5" // Optional.[String or Number].Default: -1.
                              id={"agreementStarNo"} // Optional.[String].Default: "".  Input ID.
                              name={"agreementStarNo"} // Optional.[String].Default: "". Input name
                              value={agreementStarNo} // Required.[String].Default: "".
                              checked={isAgreementStarNoChecked} // Required.[Bool].Default: false.
                              disabled={isAgreementStarChecked ? true : false} // Optional.[Bool].Default: false.
                              validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                              validationCallback={(res) => {
                                this.setState({
                                  hasAgreementStarNoError: res,
                                  validate: false,
                                });
                              }} // Optional.[Func].Default: none. Return the validation result.
                              classNameWrapper="" // Optional.[String].Default: "".
                              classNameInputBox="" // Optional.[String].Default: "".
                              classNameContainer="" // Optional.[String].Default: "".
                              customStyleWrapper={{}} // Optional.[Object].Default: {}.
                              customStyleInputBox={{ backgroundColor: "white" }} // Optional.[Object].Default: {}.
                              customStyleContainer={{}} // Optional.[Object].Default: {}.
                              onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                              // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              onChange={(isAgreementStarNoChecked, e) => {
                                this.setState({ isAgreementStarNoChecked });
                                // console.log(e);
                              }} // Required.[Func].Default: () => {}. Will return the value.
                              labelHtml={
                                <div
                                  style={{ color: "white", marginTop: "5px" }}
                                >
                                  My feedback is sufficient, I don’t want to
                                  champion this idea
                                </div>
                              } // Required.[Html].Default: none.
                              validationOption={{
                                name: "agreementStarNo", // Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                                check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                required: false, // Optional.[Bool].Default: true. To determin if it is a required field.
                                // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                                // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                                // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                                // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
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
                            style={{
                              ...labelStyle,
                              flex: "3 3 0px",
                              marginTop: "3px",
                            }}
                          >
                            {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                            <span
                              className="icon icon-assignment-late"
                              style={{ ...labelContentStyle, fontSize: "20px" }}
                            />
                            &nbsp;
                            <span style={labelContentStyle}>
                              Would you like to apply to become a mentor for
                              this idea? If the team later picks you as one of
                              the mentors, you will get a 1% share in the
                              idea-company in exchange for being available to
                              them for at least 1 hour per week.
                            </span>
                          </div>
                          <div style={{ flex: "6 6 0px" }}>
                            <Checkbox
                              tabIndex="5" // Optional.[String or Number].Default: -1.
                              id={"agreementMentor"} // Optional.[String].Default: "".  Input ID.
                              name={"agreementMentor"} // Optional.[String].Default: "". Input name
                              value={agreementMentor} // Required.[String].Default: "".
                              checked={isAgreementMentorChecked} // Required.[Bool].Default: false.
                              disabled={
                                isAgreementMentorNoChecked ? true : false
                              } // Optional.[Bool].Default: false.
                              validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                              validationCallback={(res) => {
                                this.setState({
                                  hasAgreementMentorError: res,
                                  validate: false,
                                });
                              }} // Optional.[Func].Default: none. Return the validation result.
                              classNameWrapper="" // Optional.[String].Default: "".
                              classNameInputBox="" // Optional.[String].Default: "".
                              classNameContainer="" // Optional.[String].Default: "".
                              customStyleWrapper={{}} // Optional.[Object].Default: {}.
                              customStyleInputBox={{ backgroundColor: "white" }} // Optional.[Object].Default: {}.
                              customStyleContainer={{}} // Optional.[Object].Default: {}.
                              onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                              // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              onChange={(isAgreementMentorChecked, e) => {
                                this.setState({ isAgreementMentorChecked });
                                // console.log(e);
                              }} // Required.[Func].Default: () => {}. Will return the value.
                              labelHtml={
                                <div
                                  style={{ color: "white", marginTop: "5px" }}
                                >
                                  Yes, I’d like to become a mentor for this idea
                                </div>
                              } // Required.[Html].Default: none.
                              validationOption={{
                                name: "agreementMentor", // Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                                check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                required: false, // Optional.[Bool].Default: true. To determin if it is a required field.
                                // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                                // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                                // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                                // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                              }}
                            />
                            <Checkbox
                              tabIndex="5" // Optional.[String or Number].Default: -1.
                              id={"agreementMentorNo"} // Optional.[String].Default: "".  Input ID.
                              name={"agreementMentorNo"} // Optional.[String].Default: "". Input name
                              value={agreementMentorNo} // Required.[String].Default: "".
                              checked={isAgreementMentorNoChecked} // Required.[Bool].Default: false.
                              disabled={isAgreementMentorChecked ? true : false} // Optional.[Bool].Default: false.
                              validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                              validationCallback={(res) => {
                                this.setState({
                                  hasAgreementMentorNoError: res,
                                  validate: false,
                                });
                              }} // Optional.[Func].Default: none. Return the validation result.
                              classNameWrapper="" // Optional.[String].Default: "".
                              classNameInputBox="" // Optional.[String].Default: "".
                              classNameContainer="" // Optional.[String].Default: "".
                              customStyleWrapper={{}} // Optional.[Object].Default: {}.
                              customStyleInputBox={{ backgroundColor: "white" }} // Optional.[Object].Default: {}.
                              customStyleContainer={{}} // Optional.[Object].Default: {}.
                              onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                              // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                              onChange={(isAgreementMentorNoChecked, e) => {
                                this.setState({ isAgreementMentorNoChecked });
                                // console.log(e);
                              }} // Required.[Func].Default: () => {}. Will return the value.
                              labelHtml={
                                <div
                                  style={{
                                    color: "white",
                                    marginTop: "5px",
                                    display: "flex",
                                  }}
                                >
                                  No, thank you
                                </div>
                              } // Required.[Html].Default: none.
                              validationOption={{
                                name: "agreementMentorNo", // Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                                check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                                required: false, // Optional.[Bool].Default: true. To determin if it is a required field.
                                // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                                // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                                // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                                // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  this.state.validate === true && average / 4 <= 7
                )
                // ? (<div>TEST</div>) : (<div>TEST</div>)
              }
            </div>
            <div style={{ height: "10px" }} />
            <div
              className={`my-button my-button__red save-button`}
              onClick={this.validateForm}
            >
              <div>
                {this.state.validate === "true" && average / 4 <= 7 ? (
                  <div>
                    Thank you for your assessment. If this idea would later
                    become an actual company, we will update you on how you will
                    receive the EUR100, - worth of shares!
                  </div>
                ) : null}
              </div>
              Submit
            </div>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      );
    }
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

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
