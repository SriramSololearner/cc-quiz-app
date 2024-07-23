import { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  Question: string;
  choices: string[];
  onAnswer: (answer: string) => void;
}

class Home extends Component<Props> {
  render() {
    const { Question, choices, onAnswer } = this.props;

    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          data-testid="question"
          variant="h4"
          component="h2"
          sx={{
            mb: "20px",
            color: "red",
          }}
        >
          {Question}
        </Typography>

        <Grid container spacing={2}>
          {choices?.map((choice, index) => (
            <Grid key={index} item xs={6}>
              <Button
                data-testid={`options`}
                variant="outlined"
                onClick={() => onAnswer(choice)}
                sx={{
                  "&:hover": {
                    boxShadow: "0px 0px 5px 1px",
                  },
                }}
              >
                {choice}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default Home;
