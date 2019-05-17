/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import industryList from '../reogranisation/Start/industry-list';
import countryList from '../reogranisation/Start/country-list';
import posed from 'react-pose';
import Select from 'react-select';
import Button from '../reogranisation/Questions/Button';
import validator from 'validator';
import { baseUrl } from '../../constants';
import request from 'superagent';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import { handleInputChange } from 'react-select/lib/utils';

const InvestorRegistration = (props) => {

  const [formValidated, setFormValidated] = useState(false);
  const [history, location] = useState({});
  const [formData, setFormData] = useState({
    firstName: {
      value: '',
      shouldShowError: false,
      validated: false,
    },
    lastName: {
      value: '',
      shouldShowError: false,
      validated: false,
    },
    email: {
      value: '',
      shouldShowError: false,
      validated: false,
    },
    password: {
      value: '',
      shouldShowError: false,
      validated: false,
    },
    passwordRepeat: {
      value: '',
      shouldShowError: false,
      validated: false,
    },
    country: {
      value: 'NL',
      shouldShowError: false,
      validated: true,
    },
    industry: {
      value: '',
      shouldShowError: false,
      validated: true
    },
    role: {
      value: '',
      shouldShowError: false,
      validated: false
    }
  });

  const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

  const formValidations = {
    firstName: {
      validator: (val) => (val.length <= 100),
      shouldShowError: (val) => (val.length > 4),
    },
    lastName: {
      validator: (val) => (val.length <= 100),
      shouldShowError: (val) => (val.length > 4),
    },
    email: {
      validator: (val) => (val.length <= 100 && validator.isEmail(val)),
      shouldShowError: (val) => true,
    },
    password: {
      validator: (val) => (val.length >= 8 && passwordRegEx.test(val)),
      shouldShowError: (val) => (val.length > 5),
    },
    passwordRepeat: {
      validator: (val) => (val === formData.password.value),
      shouldShowError: (val) => (val.length >= 8),
    },
    country: {
      validator: (val) => (val.length <= 100),
      shouldShowError: (val) => (val.length > 0),
    },
    industry: {
      validator: (val) => (typeof val === "object"),
      shouldShowError: (val) => (val.length > 0)
    },
    role: {
      validator: (val) => (val.length <= 100),
      shouldShowError: (val) => (val.length > 4)
    }
  };

  useEffect(() => {
    setFormValidated(Object.keys(formData).reduce((acc, currVal) => acc && formData[currVal].validated, true));
  }, [formData]);

  const handleChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        value: e.target.value,
      },
    };

    setFormData(Object.keys(formData).reduce((acc, currVal) => {
      return {
        ...acc,
        [currVal]: {
          ...newState[currVal],
          validated: !!(formValidations[currVal].validator(newState[currVal].value)),
        },
      };
    }, {}));
  };
  const handleChangeTwo = e => {
    console.log(e, "EEEE")
    const newState = {
      ...formData,
      ["industry"]: {
        ...formData["industry"],
        value: e[0].value 
        // e.map(val =>  val.value)
      },
    }

    setFormData(Object.keys(formData).reduce((acc, currVal) => {
      return {
        ...acc,
        [currVal]: {
          ...newState[currVal],
          validated: !!(formValidations[currVal].validator(newState[currVal].value)),
        },
      };
    }, {}));
  };

  const enableValidation = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        shouldShowError: (formData[e.target.name].shouldShowError || formValidations[e.target.name].shouldShowError(e.target.value)),
      },
    });
  };

  const signup = () => {

    const { firstName, lastName, email, password, country, role, industry } = formData;
    request
      .post(`${baseUrl}/users`)
      .send({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        country: country.value,
        role: role.value,
        industry: industry.value
      })
      .then(res => {
        if (res.status === 200) {
          props.history.push(`Investors/login`)
        }
      })
      .catch(err => {
        if (err.status === 400) {
          // dispatch(userLoginFailed(err.response.body.message))
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Container pose={props.show ? 'show' : 'hide'} css={css`justify-self: flex-end; width: 100%;`}>
      <form>
        <RegistrationForm>

          <FlexRow>
            <FlexColumn>
              <FormGroup css={css`font-size: 24px; padding: 5px 10px;`}>
                <b>Investors</b> / New User
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <FormGroup css={css`font-size: 10px; padding: 5px 10px; margin: 0 0 30px;`}>
                <a href='/Investors/login'> Already registered? Click here to log in</a>
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <FormGroup>
                <label>Name{formData.firstName.shouldShowError && !formData.firstName.validated &&
                  <span
                    css={css`font-weight: 800; color: #ff4444;`}> / max 100 chars</span>}</label>
                <input type='text' name='firstName' onChange={handleChange} onBlur={enableValidation}
                  value={formData.firstName.value} />
              </FormGroup>
            </FlexColumn>
            <FlexColumn>
              <FormGroup>
                <label>Surname{formData.lastName.shouldShowError && !formData.lastName.validated &&
                  <span css={css`font-weight: 800; color: #ff4444;`}> / max 100 chars</span>}</label>
                <input type='text' name='lastName' onChange={handleChange} onBlur={enableValidation}
                  value={formData.lastName.value} />
              </FormGroup>
            </FlexColumn>
            <FlexColumn>
              <FormGroup>
                <label>Role{formData.role.shouldShowError && !formData.role.validated &&
                  <span
                    css={css`font-weight: 800; color: #ff4444;`}> / max 100 chars</span>}</label>
                <input type='text' name='role' onChange={handleChange} onBlur={enableValidation}
                  value={formData.role.value} />
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <FormGroup>
                <label>Email{formData.email.shouldShowError && !formData.email.validated &&
                  <span css={css`font-weight: 800; color: #ff4444;`}> / invalid e-mail address</span>}</label>
                <input type='email' name='email' onChange={handleChange} onBlur={enableValidation}
                  value={formData.email.value} />
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <FormGroup css={css`flex: 1 1 auto;`}>
                <label>Password{formData.password.shouldShowError && !formData.password.validated &&
                  <span css={css`font-weight: 800; color: #ff4444;`}> / invalid password</span>}</label>
                <input type='password' name='password' onChange={handleChange} onBlur={enableValidation}
                  value={formData.password.value} />
              </FormGroup>
            </FlexColumn>
            <FlexColumn css={css`width: 34%; flex: 0 0 auto; font-size: 10px; align-items: flex-start;`}>
              <FormGroup>
                <label>
                  Needs to contain
                </label>
                <div>
                  - min 8 characters<br />
                  - min one capital letter<br />
                  - min one number
                </div>
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn css={css`flex: 1 1 auto;`}>
              <FormGroup>
                <label>Repeat password{formData.passwordRepeat.shouldShowError && !formData.passwordRepeat.validated &&
                  <span css={css`font-weight: 800; color: #ff4444;`}> / doesn't match</span>}</label>
                <input type='password' name='passwordRepeat' onChange={handleChange} onBlur={enableValidation}
                  value={formData.passwordRepeat.value} />
              </FormGroup>
            </FlexColumn>
            <FlexColumn css={css`width: 34%; flex: 0 0 auto; font-size: 10px; align-items: flex-end;`}>
              <FormGroup>
                <div>

                </div>
              </FormGroup>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <FlexColumn>
              <FormGroup>
                <label>What is your country of residence?</label>
                <Select options={countryList} />
              </FormGroup>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <FlexColumn>
              <FormGroup>
                <label>What is your industry?</label>
                <Select
                  name="industry"
                  // defaultValue={industryList[0].value}
                  options={industryList}
                  onChange={handleChangeTwo}
                  value={formData.industry.value}
                isMulti
                // onInputChange={handleInputChange}
                // inputValue={formData.industry.value}
                // defaultInputValue={industryList['0'].value}
                />
              </FormGroup>
            </FlexColumn>
          </FlexRow>
        </RegistrationForm>
        <div css={css`float: right; width: 160px;`}>
          <Button disabled={!formValidated} text='Start my submission' disabledText='Sign up' withIcon
            onClick={signup} />
        </div>
        {console.log(formData, "DATAA")}
        <div css={css`float: right; width: 120px;`}>
          <Button text='Cancel' disabled={false} onClick={props.handleCancel} />
        </div>
      </form>
    </Container>
  );
};

const FlexRow = styled.div`
  display: flex;
  @media only screen and (orientation:portrait) { 
    flex-direction: column;
}
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const FormGroup = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const PContainer = posed.div({
  hide: {
    y: 0,
    opacity: 0,
  },
  show: {
    y: -390,
    opacity: 1.0,
  },
});

const Container = styled(PContainer)`
  width: auto;
  height: auto;
  color: #233949;
`;

const RegistrationForm = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 23px 0 rgba(37,37,37,0.39);
  background-color: rgba(255, 255, 255, 0.9);
  color: #233949;
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  
  label {
    display: block;
    height: 30px;
    width: 100%;
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
    height: 36px;
    width: 100%;
    line-height: 36px;
    font-size: 14px;
    color: #233949;
    border-radius: 6px;
    border: 1px solid #dfdfdf;
    padding: 0 5px;
    margin: 0;
    outline: none;
    -webkit-appearance: none;
    opacity: 0.9;
    transition: all 100ms ease-in-out;
    &:focus {
      box-shadow: 1px 1px 12px 0 rgba(37,37,37,0.1);
      opacity: 1.0;
    }
  }
`;

export default withRouter(InvestorRegistration)