type Source = "itunes" | "tmdb"

export interface IMovie<Details = unknown> {
  source: Source
  id: string 
  title: string
  originalTitle: string
  description: string
  releaseDate: Date
  backdropImageUrl: string
  posterImageUrl: string
  details?: Details
}