import { Component } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Home from "./Home";
import Data from "../Data.json";

interface IState {
  currentQuestion: number;
  score: number;
  showScore: boolean;
  timer: number;
  view: boolean;
}

class Landing extends Component<{}, IState> {
  private interval: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentQuestion: 0,
      score: 0,
      showScore: false,
      timer: 30,
      view: false,
    };
    this.interval = setInterval(() => {}, 1000);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timer } = this.state;
      if (timer >= 1) {
        this.setState({ timer: timer - 1 });
      } else {
        this.handleAnswer("timeout");
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(_: {}, prevState: IState) {
    const { currentQuestion } = this.state;
    if (prevState.currentQuestion !== currentQuestion) {
      this.setState({ view: false, timer: 30 });
    } else {
      return;
    }
  }

  handleAnswer = (answer: string) => {
    const { currentQuestion, score } = this.state;
    if (answer === Data[currentQuestion].Answer) {
      this.setState({ score: score + 1 });
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Data.length) {
      this.setState({ currentQuestion: nextQuestion });
    }
    nextQuestion === Data.length && this.setState({ view: true });
  };

  handleSubmit = () => {
    const { currentQuestion } = this.state;
    const nextQuestion = currentQuestion + 1;
    currentQuestion < Data.length &&
      this.setState({ currentQuestion: nextQuestion });

    nextQuestion === Data.length && this.setState({ showScore: true });
  };

  handleRestart = () => {
    this.setState({ currentQuestion: 0, score: 0, showScore: false });
  };

  render() {
    const { currentQuestion, score, showScore, timer, view } = this.state;

    return (
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            minHeight: "40vh",
            marginTop: "30px",
            padding: "40px",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            data-testid="header-text"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: "white",
              background: "#1baa6d",
              textDecoration: "underline",
              mt: "-8px",
              mb: "15px",
              pt: "15px",
              pb: "15px",
              boxShadow: "0px 0px 12px 2px white",
            }}
          >
            Quiz APP
          </Typography>
          <Container>
            {showScore ? null : (
              <Typography>TimeLeft : {timer} Seconds</Typography>
            )}
          </Container>
          <Grid container spacing={0}>
            {showScore ? (
              <Container
                sx={{
                  mt: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "brown",
                    fontSize: "20px",
                    mb: "10px",
                  }}
                >
                  {" "}
                  Quiz Completed!
                </Typography>
                <Typography> Your Score :{score}/10</Typography>
                <Button
                  variant="outlined"
                  onClick={this.handleRestart}
                  sx={{
                    backgroundColor: "#4bb1f7",
                    color: "white",
                    mt: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    "&:hover": {
                      color: "#1d496e",
                    },
                  }}
                >
                  Try Again
                </Button>
              </Container>
            ) : (
              <Container>
                <Home
                  Question={Data[currentQuestion].Question}
                  choices={Data[currentQuestion].Option}
                  onAnswer={this.handleAnswer}
                />
                {view && (
                  <Button
                    variant="contained"
                    onClick={this.handleSubmit}
                    data-testid="submit"
                    sx={{
                      float: "left",
                      mr: "80px",
                      mt: "30px",
                      fontWeight: 800,
                      "&:hover": {
                        background: "white",
                        color: "#4778d2",
                      },
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Container>
            )}
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default Landing;
