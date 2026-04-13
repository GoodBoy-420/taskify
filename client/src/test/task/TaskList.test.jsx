import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import TaskList from "../../components/task/TaskList";

describe("TaskList", () => {
  test("shows loading", () => {
    render(<TaskList tasks={[]} loading={true} />);
    expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
  });

  test("shows empty message", () => {
    render(<TaskList tasks={[]} loading={false} />);
    expect(screen.getByText("No tasks found")).toBeInTheDocument();
  });

  test("renders tasks", () => {
    const tasks = [{ _id: "1", title: "Test Task", description: "Desc" }];

    render(<TaskList tasks={tasks} loading={false} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });
});
