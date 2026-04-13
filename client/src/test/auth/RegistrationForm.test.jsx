import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, test, vi } from "vitest";

import RegistrtationForm from "../../components/auth/RegistrtationForm";

// ✅ mocks
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("RegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<RegistrtationForm />);
  });

  test("shows error when passwords do not match", async () => {
    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "john@mail.com" },
    });

    // ❗ FIX: correct placeholders from component
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });

  test("successful registration redirects", async () => {
    axios.post.mockResolvedValue({
      data: { success: true },
    });

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "john@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
