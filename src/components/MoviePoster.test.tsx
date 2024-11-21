import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import MoviePoster from "./MoviePoster";
import { Movie } from "../hooks/useMovies";

const mockMovie: Partial<Movie> = {
  id: 1,
  title: "Test",
  release_date: "2010-07-16",
  poster_path:
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
};

describe("MoviePoster Component", () => {
  it("should renders movie title, release date, and poster image", () => {
    render(<MoviePoster movie={mockMovie as Movie} onOpenDetails={vi.fn()} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockMovie.poster_path);
  });

  it("should calls onOpenDetails when poster is clicked", () => {
    const mockOnOpenDetails = vi.fn();
    render(
      <MoviePoster
        movie={mockMovie as Movie}
        onOpenDetails={mockOnOpenDetails}
      />
    );
    const posterDiv = screen.getByRole("img").closest("div");
    fireEvent.click(posterDiv!);
    expect(mockOnOpenDetails).toHaveBeenCalledTimes(1);
  });
});
