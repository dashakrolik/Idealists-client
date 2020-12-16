import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import request from "superagent";
import { baseUrl } from "../../constants";
import "../MyIdea/Dashboard/IdeaDashboard.css";

export default function CofounderProfileForm(props) {
  const [sucessMsg, setSucessMsg] = useState(false);
  const [formData, setFormData] = useState({
    workExperience: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    whoAMI: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    myEducationBackground: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    languageSpeak: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    impactfulCoFounder: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    rightTimecoFounder: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    UNSustainableDev: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
    somethingExceptional: {
      value: "",
      shouldShowError: false,
      validated: false,
    },
  });

  const formValidations = {
    workExperience: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    whoAMI: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    myEducationBackground: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    languageSpeak: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    impactfulCoFounder: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    rightTimecoFounder: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    UNSustainableDev: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
    somethingExceptional: {
      validator: (val) => val.length <= 100,
      shouldShowError: (val) => true,
    },
  };

  const enableValidation = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        shouldShowError:
          formData[e.target.name].shouldShowError ||
          formValidations[e.target.name].shouldShowError(e.target.value),
      },
    });
  };

  const handleChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        value: e.target.value,
      },
    };
    setFormData(
      Object.keys(formData).reduce((acc, currVal) => {
        return {
          ...acc,
          [currVal]: {
            ...newState[currVal],
            validated: !!formValidations[currVal].validator(
              newState[currVal].value
            ),
          },
        };
      }, {})
    );
  };
  const submitForm = (e) => {
    e.preventDefault();
    request
      .put(`${baseUrl}/cofounders/profile`)
      .set("Authorization", "Bearer " + props.authState.token)
      .send({
        who: formData.whoAMI.value,
        workExperience: formData.workExperience.value,
        eduBackground: formData.myEducationBackground.value,
        languages: formData.languageSpeak.value,
        why: formData.impactfulCoFounder.value,
        whyNow: formData.rightTimecoFounder.value,
        UNgoals: formData.UNSustainableDev.value,
        Pride: formData.somethingExceptional.value,
      })
      .then((res) => {
        if (res.status === 200) {
          setSucessMsg(true);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          alert("User with this email already exists");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Container>
      {sucessMsg ? (
        <div
          css={css`
            display: block;
            position: relative;
            left: 47px;
            top: 10px;
            width: 80%;
            font-size: 10px;
            font-weight: 300;
            padding: 5px;
            margin: 5px;
          `}
        >
          <LeftSide>
            <h3>Thank you. Your profile was created successfully.</h3>
          </LeftSide>
        </div>
      ) : (
        <div>
          <div></div>
          <LeftSide>
            <div>
              <h3>
                3. Fill out the blanks on your profile, by answering a few
                simple questions
              </h3>
            </div>
          </LeftSide>
          <br />
          <RightSide>
            <form onSubmit={submitForm}>
              <label>
                Who am I :
                {formData.whoAMI.shouldShowError && !formData.whoAMI.validated && (
                  <span
                    css={css`
                      font-weight: 800;
                      color: red;
                    `}
                  >
                    {" "}
                    / max 100 chars
                  </span>
                )}
              </label>
              <input
                type="text"
                name="whoAMI"
                onBlur={enableValidation}
                value={formData.whoAMI.value}
                required
                onChange={handleChange}
              />
              <label>
                My work experience:
                {formData.workExperience.shouldShowError &&
                  !formData.workExperience.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="workExperience"
                onBlur={enableValidation}
                value={formData.workExperience.value}
                required
                onChange={handleChange}
              />
              <label>
                My educational background:{" "}
                {formData.myEducationBackground.shouldShowError &&
                  !formData.myEducationBackground.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="myEducationBackground"
                value={formData.myEducationBackground.value}
                onBlur={enableValidation}
                onChange={handleChange}
              />
              <label>
                The language(s) I speak:
                {formData.languageSpeak.shouldShowError &&
                  !formData.languageSpeak.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="languageSpeak"
                value={formData.languageSpeak.value}
                onBlur={enableValidation}
                onChange={handleChange}
              />
              <label>
                Why I want to be an impactful co-founder:
                {formData.impactfulCoFounder.shouldShowError &&
                  !formData.impactfulCoFounder.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="impactfulCoFounder"
                value={formData.impactfulCoFounder.value}
                onBlur={enableValidation}
                required
                onChange={handleChange}
              />
              <label>
                Why now is the right timing for me to become an impactful
                co-founder:
                {formData.rightTimecoFounder.shouldShowError &&
                  !formData.rightTimecoFounder.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="rightTimecoFounder"
                value={formData.rightTimecoFounder.value}
                onBlur={enableValidation}
                required
                onChange={handleChange}
              />
              <label>
                The UN Sustainable Development Goal that interests me the most
                and why:
                {formData.UNSustainableDev.shouldShowError &&
                  !formData.UNSustainableDev.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="UNSustainableDev"
                value={formData.UNSustainableDev.value}
                onBlur={enableValidation}
                required
                onChange={handleChange}
              />
              <label>
                Something exceptional I have done, built or created:
                {formData.somethingExceptional.shouldShowError &&
                  !formData.somethingExceptional.validated && (
                    <span
                      css={css`
                        font-weight: 800;
                        color: #ff4444;
                      `}
                    >
                      {" "}
                      / max 100 chars
                    </span>
                  )}
              </label>
              <input
                type="text"
                name="somethingExceptional"
                onBlur={enableValidation}
                value={formData.somethingExceptional.value}
                required
                onChange={handleChange}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </RightSide>
        </div>
      )}
    </Container>
  );
}

const LeftSide = styled.div`
  position: absolute;
  color: #ffffff;
  top: 50%;
  left: 40%;
  width: 360px;
  height: 300px;
  margin-left: -360px;
  margin-top: -150px;
  padding-top: 10px;

  h3 {
    display: block;
    position: relative;
    left: 47px;
    width: 80%;
    font-size: 18px;
    font-weight: 500;
    padding: 5px;
    margin: 50px 5px 5px;
  }

  p {
    display: block;
    position: relative;
    left: 47px;
    top: 10px;
    width: 80%;
    font-size: 10px;
    font-weight: 300;
    padding: 5px;
    margin: 5px;
  }

  a {
    font-weight: 800;
    &:hover {
      cursor: pointer;
      color: #dfeff2;
    }
  }
`;

const RightSide = styled.div`
  position: absolute;
  //color: #ffffff;
  top: 30%;
  left: 40%;
  width: 800px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 0px;
  margin-top: -150px;
  border-radius: 6px;
  box-shadow: 2px 2px 23px 0px rgba(37, 37, 37, 0.39);
  background-color: rgba(255, 255, 255, 0.9);
  color: #233949;

  label {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    padding: 0;
    margin: 0;
    border-radius: 10px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
  }

  input {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    padding: 6px;
    outline: none;
    -webkit-appearance: none;
  }

  button {
    display: inline-block;
    position: relative;
    float: right;
    right: 10%;
    width: 10%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
    background-color: #dfeff2;
    transition: all 100ms ease-in-out;

    &:hover {
      color: white;
      background-color: #4cc5f1;
      cursor: pointer;
    }
  }

  a {
    display: inline-block;
    position: relative;
    float: left;
    left: 10%;
    margin-right: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    color: #233949;
    outline: none;
    -webkit-appearance: none;
    transition: all 100ms ease-in-out;

    &:hover {
      cursor: pointer;
      color: #1a3d7c;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
`;
