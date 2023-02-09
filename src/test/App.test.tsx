import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  const wrapper = render(<App />);
  test("App mounts properly", () => {
    expect(wrapper).toBeTruthy();
  });
});
