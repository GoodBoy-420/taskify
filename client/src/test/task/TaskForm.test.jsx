import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import TaskForm from "../../components/task/TaskForm";

const mockNavigate = vi.fn();
const mockAddTask = vi.fn();
const mockPost = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    auth: { authToken: "abc" },
  }),
}));

vi.mock("../../hooks/useAxios", () => ({
  default: () => ({
    api: {
      post: mockPost,
    },
  }),
}));

describe("TaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<TaskForm addTask={mockAddTask} />);
  });

  test("creates task successfully", async () => {
    mockPost.mockResolvedValue({
      data: {
        success: true,
        data: { _id: "1", title: "Task 1" },
      },
    });

    // fill form
    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Task 1" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("Task description (optional)"),
      {
        target: { value: "My task description" },
      },
    );

    // ✅ BEST PRACTICE: submit via button click
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
      expect(mockAddTask).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: "1",
          title: "Task 1",
        }),
      );
    });
  });
});
