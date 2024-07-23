import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import Landing from "../Landing";
import Home from "../Home";

import { act } from "react-dom/test-utils";

describe("unit tests for Quiz APP", () => {
  jest.useFakeTimers();

  test("rendering Header Text correctly", () => {
    const { getByTestId } = render(<Landing />);
    const header = getByTestId("header-text");
    expect(header).toBeInTheDocument();
  });

  test("timer counts correctly", async () => {
    const { getByText } = render(<Landing />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const timerText = getByText("TimeLeft : 29 Seconds");
    expect(timerText).toBeInTheDocument();
  });

  test("for each question after 30 seconds  a new question is loaded", async () => {
    const props = {
      Question: "1.What is JavaScript",
      choices: [
        "Scripting Language",
        "Assembly Language",
        "Compiled Language",
        "None",
      ],
      onAnswer: () => {},
    };
    const { getByText, getAllByTestId } = render(
      <>
        <Landing />
        <Home {...props} />
      </>
    );

    for (let i = 0; i < 32; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    const question = getAllByTestId("question");
    expect(question[0]).not.toHaveTextContent(props.Question);
  });

  test("handler function triggers", () => {
    const props = {
      Question: "1.What is JavaScript",
      choices: [
        "Scripting Language",
        "Assembly Language",
        "Compiled Language",
        "None",
      ],
      onAnswer: () => {},
    };
    const { getByText, getAllByTestId } = render(
      <>
        <Landing />
        <Home {...props} />
      </>
    );

    const buttonElement = getAllByTestId("options")[0];
    fireEvent.click(buttonElement);
    expect(getByText(props.Question)).toBeVisible();
  });

  test('calls the handleSubmit function when the "submit" button is clicked', () => {
    const props = {
      Question: "1.What is JavaScript",
      choices: [
        "Scripting Language",
        "Assembly Language",
        "Compiled Language",
        "None",
      ],
      onAnswer: () => {},
    };

    const { getByTestId, getByText, getAllByTestId } = render(
      <>
        <Landing />
        <Home {...props} />
      </>
    );
    for (let i = 0; i < 310; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }
    const submitButton = getByTestId("submit");
    fireEvent.click(submitButton);
    const restartButton = getByText("Try Again");
    fireEvent.click(restartButton);
    const question = getAllByTestId("question");
    expect(question[0]).toHaveTextContent(props.Question);
  });
});
