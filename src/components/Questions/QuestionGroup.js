/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import SingleLineQuestion from './SingleLineQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import posed from 'react-pose';
import { tween, physics, easing } from 'popmotion';
import { interpolate } from 'flubber';

const paths = {
  plane:
    'M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25 l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z',
  circle:
    'M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z',
  heart:
    'M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z',
  bookmark:
    'M357,0H102C73.95,0,51,22.95,51,51v408l178.5-76.5L408,459V51C408,22.95,385.05,0,357,0z',
  checkmark:
    'M6.173 16.252l5.722 4.228 9.22-12.69',
  checkmarkoutline:
    'M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z',
  gradient:
    'M15.65.85c6.3 0 9.6 4.17 9.6 9.4 0 5.93-4.3 11.33-11.78 11.33H8.8l-1.04 10.2H.28L3.48.85h12.17zm-5.4 7.03l-.77 7.03h4.26c2.54 0 4.04-1.67 4.04-3.9 0-1.58-1-3.12-3.13-3.12h-4.4zM23.36 21.85c0-7 5.85-12.2 12.8-12.2 5.98 0 10.65 4.4 10.65 10.43 0 7.03-6.02 12.15-12.78 12.15-6.12 0-10.66-4.35-10.66-10.38zm16.28-1.27c0-2.4-1.58-4.4-4.03-4.4-2.85 0-5.03 2.4-5.03 5.2 0 2.33 1.55 4.32 4 4.32 2.9 0 5.07-2.4 5.07-5.12zM55.66 10.1l.1 2.3s1.86-2.75 6.12-2.75c4.94 0 8.8 4.17 8.8 10.25 0 7.03-5.36 12.33-11.02 12.33-3.9 0-5.5-2.35-5.5-2.35l-1.13 10.97h-7.2l3.2-30.75h6.63zm8 10.3c0-2.32-1.55-4.22-4.14-4.22-2.77 0-4.13 2.18-4.13 2.18l-.55 5.12s.9 2.18 3.67 2.18c2.95 0 5.13-2.45 5.13-5.26zM91.18 31.78h-7.2l1.35-12.8c0-.13.05-.4.05-.67 0-1.26-.64-1.98-1.95-1.98-1.68 0-3.54 1.67-3.54 1.67l-1.46 13.78h-7.2L73.5 10.1h6.8l.1 2.18s2.98-2.54 6.3-2.54c3.53 0 4.66 2.63 4.66 2.63s3.27-2.63 6.94-2.63c4.86 0 7.08 2.72 7.08 7.12 0 .54-.05 1.13-.1 1.68l-1.35 13.24H96.7l1.33-12.38c.05-.45.05-.64.05-.9 0-1.5-.77-2.18-1.95-2.18-1.77 0-3.5 1.72-3.5 1.72l-1.45 13.74M106.16 21.85c0-7 5.85-12.2 12.8-12.2 5.98 0 10.65 4.4 10.65 10.43 0 7.03-6.02 12.15-12.78 12.15-6.13 0-10.66-4.35-10.66-10.38zm16.28-1.27c0-2.4-1.6-4.4-4.03-4.4-2.85 0-5.03 2.4-5.03 5.2 0 2.33 1.54 4.32 4 4.32 2.9 0 5.07-2.4 5.07-5.12zM140.4 10.1l.5-4.76h-7.2l-.5 4.76h-3.13l-.68 6.53h3.12l-1.6 15.15h7.23l1.58-15.15h5.18l-1.57 15.15h7.26l2.25-21.68H140.4M146.46.9l-.64 6.16h7.5l.62-6.16h-7.48M153.05 21.85c0-7 5.85-12.2 12.8-12.2 5.97 0 10.65 4.4 10.65 10.43 0 7.03-6.04 12.15-12.8 12.15-6.12 0-10.65-4.35-10.65-10.38zm16.28-1.27c0-2.4-1.6-4.4-4.04-4.4-2.86 0-5.04 2.4-5.04 5.2 0 2.33 1.54 4.32 4 4.32 2.9 0 5.07-2.4 5.07-5.12zM198 31.78h-7.2l1.26-12.02c.05-.4.05-.63.05-.95 0-1.5-.76-2.62-2.62-2.62-2.4 0-4.36 1.95-4.36 1.95l-1.4 13.65h-7.2l2.25-21.68h6.9v2.3s2.9-2.7 6.44-2.7c3.95 0 7.3 2.53 7.3 7.75 0 .4-.04 1-.08 1.5L198 31.77',
};

const iconProps = {
  loading: {
    opacity: 1,
    pathLength: 45,
    transition: ({ from, to }) => tween({ from, to, ease: easing.easeIn }),
  },
  loadingWait: {
    rotate: true,
    transition: ({ from }) => physics({ from, velocity: -400 }),
  },
  loaded: {
    rotate: false,
    pathLength: 100,
  },
};

const tickProps = {
  loaded: { opacity: 1, pathLength: 100 },
};

const pathIds = Object.keys(paths);

const LoadingIcon = posed.path({ d: 'M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z' }, iconProps);
const CheckmarkIcon = posed.path({ d: 'M6.173 16.252l5.722 4.228 9.22-12.69' }, iconProps);

const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1,
  }).pipe(interpolate(from, to));

const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition,
    };
    return config;
  }, {}),
);

const QuestionGroup = (props) => {
  
  return (
    <GroupContainer>
      <LoadingIcon pose='loading' />
      <SingleLineQuestion questionTitle='What is the name of your first pet?'
                          validator={(value) => value.length < 5}
                          errorMessage='This field can have a maximum of 5 characters.'
                          onChange={(val) => console.log(val)}
                          halfSize />
      <SingleLineQuestion questionTitle='What is the name of your first pet?'
                          validator={(value) => value.length < 5}
                          errorMessage='This field can have a maximum of 5 characters.'
                          halfSize />
      <SingleLineQuestion questionTitle='What is the name of your first pet?'
                          validator={(value) => value.length < 5}
                          errorMessage='This field can have a maximum of 5 characters.'
                          halfSize />
      <SingleLineQuestion questionTitle='What is the name of your first pet?'
                          validator={(value) => value.length < 5}
                          errorMessage='This field can have a maximum of 5 characters.'
                          halfSize />
      <SingleChoiceQuestion questionTitle='Select your country of residence'
                            options={countryList} halfSize
                            onChange={(val) => console.log(val)}
      />
    </GroupContainer>
  );
};

const GroupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
`;

const countryList = [
  { label: "Afghanistan", value: "AF" },
  { label: "Aland Islands", value: "AX" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "American Samoa", value: "AS" },
  { label: "AndorrA", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Anguilla", value: "AI" },
  { label: "Antarctica", value: "AQ" },
  { label: "Antigua and Barbuda", value: "AG" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Aruba", value: "AW" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bermuda", value: "BM" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Bouvet Island", value: "BV" },
  { label: "Brazil", value: "BR" },
  { label: "British Indian Ocean Territory", value: "IO" },
  { label: "Brunei Darussalam", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Cape Verde", value: "CV" },
  { label: "Cayman Islands", value: "KY" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Christmas Island", value: "CX" },
  { label: "Cocos (Keeling) Islands", value: "CC" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo", value: "CG" },
  { label: "Congo, The Democratic Republic of the", value: "CD" },
  { label: "Cook Islands", value: "CK" },
  { label: "Costa Rica", value: "CR" },
  { label: "Cote D/'Ivoire", value: "CI" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominica", value: "DM" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Equatorial Guinea", value: "GQ" },
  { label: "Eritrea", value: "ER" },
  { label: "Estonia", value: "EE" },
  { label: "Ethiopia", value: "ET" },
  { label: "Falkland Islands (Malvinas)", value: "FK" },
  { label: "Faroe Islands", value: "FO" },
  { label: "Fiji", value: "FJ" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "French Guiana", value: "GF" },
  { label: "French Polynesia", value: "PF" },
  { label: "French Southern Territories", value: "TF" },
  { label: "Gabon", value: "GA" },
  { label: "Gambia", value: "GM" },
  { label: "Georgia", value: "GE" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Gibraltar", value: "GI" },
  { label: "Greece", value: "GR" },
  { label: "Greenland", value: "GL" },
  { label: "Grenada", value: "GD" },
  { label: "Guadeloupe", value: "GP" },
  { label: "Guam", value: "GU" },
  { label: "Guatemala", value: "GT" },
  { label: "Guernsey", value: "GG" },
  { label: "Guinea", value: "GN" },
  { label: "Guinea-Bissau", value: "GW" },
  { label: "Guyana", value: "GY" },
  { label: "Haiti", value: "HT" },
  { label: "Heard Island and Mcdonald Islands", value: "HM" },
  { label: "Holy See (Vatican City State)", value: "VA" },
  { label: "Honduras", value: "HN" },
  { label: "Hong Kong", value: "HK" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran, Islamic Republic Of", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Isle of Man", value: "IM" },
  { label: "Israel", value: "IL" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jersey", value: "JE" },
  { label: "Jordan", value: "JO" },
  { label: "Kazakhstan", value: "KZ" },
  { label: "Kenya", value: "KE" },
  { label: "Kiribati", value: "KI" },
  { label: "Korea, Democratic People\'s Republic of", value: "KP" },
  { label: "Korea, Republic of", value: "KR" },
  { label: "Kuwait", value: "KW" },
  { label: "Kyrgyzstan", value: "KG" },
  { label: "Lao People\'s Democratic Republic", value: "LA" },
  { label: "Latvia", value: "LV" },
  { label: "Lebanon", value: "LB" },
  { label: "Lesotho", value: "LS" },
  { label: "Liberia", value: "LR" },
  { label: "Libyan Arab Jamahiriya", value: "LY" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Macao", value: "MO" },
  { label: "Macedonia, The Former Yugoslav Republic of", value: "MK" },
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Martinique", value: "MQ" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mayotte", value: "YT" },
  { label: "Mexico", value: "MX" },
  { label: "Micronesia, Federated States of", value: "FM" },
  { label: "Moldova, Republic of", value: "MD" },
  { label: "Monaco", value: "MC" },
  { label: "Mongolia", value: "MN" },
  { label: "Montenegro", value: "ME" },
  { label: "Montserrat", value: "MS" },
  { label: "Morocco", value: "MA" },
  { label: "Mozambique", value: "MZ" },
  { label: "Myanmar", value: "MM" },
  { label: "Namibia", value: "NA" },
  { label: "Nauru", value: "NR" },
  { label: "Nepal", value: "NP" },
  { label: "Netherlands", value: "NL" },
  { label: "Netherlands Antilles", value: "AN" },
  { label: "New Caledonia", value: "NC" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nicaragua", value: "NI" },
  { label: "Niger", value: "NE" },
  { label: "Nigeria", value: "NG" },
  { label: "Niue", value: "NU" },
  { label: "Norfolk Island", value: "NF" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Norway", value: "NO" },
  { label: "Oman", value: "OM" },
  { label: "Pakistan", value: "PK" },
  { label: "Palau", value: "PW" },
  { label: "Palestinian Territory, Occupied", value: "PS" },
  { label: "Panama", value: "PA" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Paraguay", value: "PY" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Pitcairn", value: "PN" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Qatar", value: "QA" },
  { label: "Reunion", value: "RE" },
  { label: "Romania", value: "RO" },
  { label: "Russian Federation", value: "RU" },
  { label: "RWANDA", value: "RW" },
  { label: "Saint Helena", value: "SH" },
  { label: "Saint Kitts and Nevis", value: "KN" },
  { label: "Saint Lucia", value: "LC" },
  { label: "Saint Pierre and Miquelon", value: "PM" },
  { label: "Saint Vincent and the Grenadines", value: "VC" },
  { label: "Samoa", value: "WS" },
  { label: "San Marino", value: "SM" },
  { label: "Sao Tome and Principe", value: "ST" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Senegal", value: "SN" },
  { label: "Serbia", value: "RS" },
  { label: "Seychelles", value: "SC" },
  { label: "Sierra Leone", value: "SL" },
  { label: "Singapore", value: "SG" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Solomon Islands", value: "SB" },
  { label: "Somalia", value: "SO" },
  { label: "South Africa", value: "ZA" },
  { label: "South Georgia and the South Sandwich Islands", value: "GS" },
  { label: "Spain", value: "ES" },
  { label: "Sri Lanka", value: "LK" },
  { label: "Sudan", value: "SD" },
  { label: "Suriname", value: "SR" },
  { label: "Svalbard and Jan Mayen", value: "SJ" },
  { label: "Swaziland", value: "SZ" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Syrian Arab Republic", value: "SY" },
  { label: "Taiwan, Province of China", value: "TW" },
  { label: "Tajikistan", value: "TJ" },
  { label: "Tanzania, United Republic of", value: "TZ" },
  { label: "Thailand", value: "TH" },
  { label: "Timor-Leste", value: "TL" },
  { label: "Togo", value: "TG" },
  { label: "Tokelau", value: "TK" },
  { label: "Tonga", value: "TO" },
  { label: "Trinidad and Tobago", value: "TT" },
  { label: "Tunisia", value: "TN" },
  { label: "Turkey", value: "TR" },
  { label: "Turkmenistan", value: "TM" },
  { label: "Turks and Caicos Islands", value: "TC" },
  { label: "Tuvalu", value: "TV" },
  { label: "Uganda", value: "UG" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "United States Minor Outlying Islands", value: "UM" },
  { label: "Uruguay", value: "UY" },
  { label: "Uzbekistan", value: "UZ" },
  { label: "Vanuatu", value: "VU" },
  { label: "Venezuela", value: "VE" },
  { label: "Viet Nam", value: "VN" },
  { label: "Virgin Islands, British", value: "VG" },
  { label: "Virgin Islands, U.S.", value: "VI" },
  { label: "Wallis and Futuna", value: "WF" },
  { label: "Western Sahara", value: "EH" },
  { label: "Yemen", value: "YE" },
  { label: "Zambia", value: "ZM" },
  { label: "Zimbabwe", value: "ZW" },
];

export default QuestionGroup;
