import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

describe("Testing SignIn Component", () => {
  it("should check success toast display on successful sign in", async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);
    const successToast = await screen.findByText("signed in successfully");
    expect(successToast).toBeInTheDocument();
  });
  it("should check error toast display on failed sign in", async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);
    const successToast = await screen.findByText("signed in failed");
    expect(successToast).toBeInTheDocument();
  });
});
