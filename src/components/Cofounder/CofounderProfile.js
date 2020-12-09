import React from "react";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: "15vh",
    position: "relative",
    top: "10vh",
    left: "25%",
  },
  media: {
    height: 140,
  },
});

const useNewStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CofounderProfile(props) {
  const classes = useStyles();
  const accordionClasses = useNewStyles();

  const fakedata = {
    person: "I am Danny and Nikolas. We are One.",
    reason: "Because i am very pationate to pay my rent.",
    whynow: "Because now i can",
    devgoal: "something for the enviroment",
    achievements: "profficiency in HTML 4",
    experience: "not much",
    education: "i know maths",
    languages: "Dutch",
    video: "youtube.com",
  };

  //   Here an overview of what should be on each co-founders dashboard:
  // •    My profile video:
  console.log(fakedata.person);

  return (
    <div className="dashboard-container">
      <div className="flex-ideacontainer">
        <div className="video-div">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="data:image/png;base64,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"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <h1>My Video</h1>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p>{fakedata.video}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Button 1
              </Button>
              <Button size="small" color="primary">
                Button 2
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="data-div">
          <div className={accordionClasses.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={accordionClasses.heading}>
                  Who am I
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p>{fakedata.person}</p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  Why i want to be an impactfull Co-Founder ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.reason}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  Why now is the right timing for me to be an impactfull
                  Co-Founder?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.whynow}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  UN sustainable development goal that intrest me the most and
                  why!
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.devgoal}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  Something exceptional i have done or created.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.achievements}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  My work experience!
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.experience}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  My educational Background.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.education}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionClasses.heading}>
                  How many Languages i Speak.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{fakedata.languages}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
