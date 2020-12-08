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
        color: '#ffffff'
    },
    margin: {
        height: theme.spacing(3),
    },
}));

export default function BidSlider(props) {
    const [bidValue, setValue] = useState("")
    const [savedBid, setSavedbid] = useState("")
    const classes = useStyles();


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
                setSavedbid(res.body)
                if (res.status === 204) {
                    alert("You submitted your bid successfully")
                }
            })
            .catch(err => {
                if (err.status === 400) {
                } else {
                    console.error(err);
                }
            });

    }


    const EditBid = () => {

        request
            .put(`${baseUrl}/ideas/${props.ideaId}/bids`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .send({
                equity: bidValue
            })
            .then(res => {
                if (res.status === 204) {
                    console.log('result', res)
                    alert("You submitted your bid successfully")
                }
            })
            .catch(err => {
                if (err.status === 400) {
                } else {
                    console.error(err);
                }
            });

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

                />
                <Button onClick={bid} text="Submit your bid" />

                {/* <Button onClick={EditBid} text="Edit your bid" /> */}

            </div>
        );
    } else return null
}

