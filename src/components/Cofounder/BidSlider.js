import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../constants';
import request from 'superagent';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "../reogranisation/Questions/Button";
import styled from "@emotion/styled";





const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        color: '#fffffff',
    },
    margin: {
        height: theme.spacing(3),
    },

}));

export default function BidSlider(props) {
    const [bidValue, setValue] = useState("")
    const [savedBid, setSavedbid] = useState("")
    const [showEditBid, setShowEditBid] = useState(false)
    const classes = useStyles();

    console.log('props', props)

    const marks = [
        {
            value: 5,
            label: '5 %',
        },
        {
            value: 10,
            label: '10 %',
        },
        {
            value: 15,
            label: '15 %',
        },
        {
            value: 20,
            label: '20 %',
        },
        {
            value: 25,
            label: '25 %',
        },
    ];


    function handleChange(event, newValue) {
        setValue(parseInt(newValue))
    }


    const bid = () => {

        request
            .post(`${baseUrl}/ideas/${props.ideaId}/bids`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .send({
                equity: bidValue
            })
            .then(res => {
                if (res.status === 500) {
                    setShowEditBid(true)
                } else (
                    props.displaySuccess(true)
                )
            })

    }
    const EditBid = () => {
        request
            .pust(`${baseUrl}/ideas/${props.ideaId}/bids`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .send({
                equity: bidValue
            })
            .then(res => {
                if (res.status === 200) {
                    props.displaySuccess(true)
                }
            })

    }

    if (!props.show) {

        return (
            <div className={classes.root}>
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
                {!showEditBid ? (
                    <Button onClick={bid} text="Submit your bid" />
                ) : (
                        <Button onClick={EditBid} text="Submit your bid" />
                    )}


            </div>
        );
    } else return null
}

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 330px;
  font-family: "Helvetica";
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  margin-top: 45px;
`;

const StyledSlider = styled(Slider)`
background-color: white;
color: black;
.MuiSlider-rail {
    color: white
}
`
