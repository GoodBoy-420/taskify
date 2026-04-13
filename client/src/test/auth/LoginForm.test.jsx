import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { afterEach, describe, expect, test, vi } from "vitest";

import LoginForm from "./../../components/auth/LoginForm";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockSetAuth = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    setAuth: mockSetAuth,
  }),
}));

describe("LoginForm", () => {
  test("renders form fields", () => {
    render(<LoginForm />);

    expect(screen.getAllByPlaceholderText("Email address")[0]).toBeDefined();
    expect(screen.getAllByPlaceholderText("Password")[0]).toBeDefined();
  });

  test("submits form successfully", async () => {
    render(<LoginForm />);

    axios.post.mockResolvedValue({
      data: {
        success: true,
        data: {
          user: { id: 1 },
          token: { token: "abc", refreshToken: "xyz" },
        },
      },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Email address")[0], {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Password")[0], {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getAllByRole("button", { name: /sign in/i })[0]);

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/tasks");
    });
  });

  test("shows error on failed login", async () => {
    render(<LoginForm />);

    axios.post.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    // ✅ Fill required fields FIRST
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "wrong@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    // ✅ Then submit
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // ✅ Assert
    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});
