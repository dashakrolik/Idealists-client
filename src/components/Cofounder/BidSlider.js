import React, { useEffect, useState } from "react";
import { baseUrl } from "../../constants";
import request from "superagent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "@emotion/styled";
import bidImg from "../../res/bid.png";
import Button from "../reogranisation/Questions/Button";

export default function BidSlider(props) {
  const [bidValue, setValue] = useState("");
  const [savedBid, setSavedbid] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [bidExists, setBidExists] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${props.ideaId}/bid`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        if (res.status === 200) {
          setValue(res.body.equity);
          setBidExists(true);
        }
      });
  }, [savedBid]);

  const marks = [
    {
      value: 5,
      label: "5 %",
    },
    {
      value: 10,
      label: "10 %",
    },
    {
      value: 15,
      label: "15 %",
    },
    {
      value: 20,
      label: "20 %",
    },
    {
      value: 25,
      label: "25 %",
    },
  ];

  function handleChange(event, newValue) {
    setValue(parseInt(newValue));
  }

  const bid = () => {
    request
      .post(`${baseUrl}/ideas/${props.ideaId}/bids`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({
        equity: bidValue,
      })
      .then((res) => {
        if (res.status === 200) {
          setSavedbid(true);
          setSuccesMessage("Bid submitted successfully");
        }
      });
  };
  const editBid = () => {
    request
      .put(`${baseUrl}/ideas/${props.ideaId}/bids`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({
        equity: bidValue,
      })
      .then((res) => {
        if (res.status === 200) {
          setSavedbid(true);
          setSuccesMessage("Bid updated successfully");
        } else {
          setSavedbid(true);
          setSuccesMessage(
            "Bid couldn't be updated since 7 days have passed since you placed your bid"
          );
        }
      });
  };
  return (
    <FlexRow>
      <FlexColumn>
        {showSlider ? (
          <StyledDiv>
            <h4>How it works</h4>
            <span>
              You, and all other interested co-founders, can now bid on the idea
              for 7 days. You do this, by stating how much equity (shares) you
              require to commit yourself to this new company. Next to this you
              will receive a set-wage, which you can find in the financial plan,
              further below on this page. You can now also, on this page, assess
              your potential co-founders (catalysts evaluate creators and vice
              versa). Our matchmaker builds the founding team, based on their
              equity bids (so don’t pick a share that is too high), the
              evaluations they received by the other co-founders and the quality
              of their profile and assessments. Good luck and if you have any
              questions, you can always contact us at support@the-idealists.com
            </span>
            {savedBid && bidExists ? (
              <Typography>{succesMessage}</Typography>
            ) : savedBid ? (
              <Typography>{succesMessage}</Typography>
            ) : (
              <>
                <Typography id="discrete-slider-custom" gutterBottom>
                  Equity in %
                </Typography>
                <br />
                <br />
                <Slider
                  defaultValue={0}
                  value={bidValue}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  marks={marks}
                  min={0}
                  max={25}
                  valueLabelDisplay="on"
                  onChange={handleChange}
                  style={{ StyledSlider }}
                />
                {bidExists ? (
                  <Button
                    color="inherit"
                    onClick={editBid}
                    text="Update your bid"
                  />
                ) : (
                  <Button
                    color="inherit"
                    onClick={bid}
                    text="Submit your bid"
                  />
                )}
              </>
            )}
          </StyledDiv>
        ) : (
          <StyledDiv>
            <img
              className="icons"
              src={bidImg}
              alt="Bid on idea"
              onClick={() => setShowSlider(!showSlider)}
            />
            <h3>Bid on this idea</h3>
          </StyledDiv>
        )}
      </FlexColumn>
    </FlexRow>
  );
}

const StyledSlider = styled(Slider)`
  background-color: white;
  color: black;
  .MuiSlider-rail {
    color: white;
  }
`;

const FlexRow = styled.div`
  display: flex;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 330px;
  font-family: "Helvetica";
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  margin-top: 45px;
`;
