import { StadiumCards } from "./stadium-cards"

interface StadiumCardsServerProps {
  limit?: number
}

export function StadiumCardsServer({ limit }: StadiumCardsServerProps) {
  return <StadiumCards limit={limit} />
}
