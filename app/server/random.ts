import { parseCharactersPage } from "./validation";
import type { SimpsonsCharacter } from "./validation";

export async function getRandomCharacter(): Promise<SimpsonsCharacter | null> {
  const randomPage = Math.floor(Math.random() * 60) + 1;

  const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${randomPage}`, {
    cache: "no-store",
  });
  const payload = await response.json();
  const parsed = parseCharactersPage(payload);

  if (parsed && parsed.results.length > 0) {
    return parsed.results[Math.floor(Math.random() * parsed.results.length)];
  }

  return null;
}
