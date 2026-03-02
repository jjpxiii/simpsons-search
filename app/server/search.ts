import { parseCharactersPage } from "./validation";
import type { SimpsonsCharacter } from "./validation";

interface CachedCharacter {
  _nameLower: string;
  character: SimpsonsCharacter;
}

let cachedCharacters: CachedCharacter[] | null = null;

async function getAllCharacters(): Promise<CachedCharacter[]> {
  if (cachedCharacters) return cachedCharacters;

  const pages = Array.from({ length: 60 }, (_, i) => i + 1);
  const fetches = pages.map((page) =>
    fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`).then((r) => r.json()),
  );

  const results = await Promise.all(fetches);
  cachedCharacters = results.flatMap((data) => {
    const parsed = parseCharactersPage(data);
    if (!parsed) return [];
    return parsed.results.map((character) => ({
      character,
      _nameLower: character.name.toLowerCase(),
    }));
  });

  return cachedCharacters;
}

export async function searchCharacters(query: string): Promise<SimpsonsCharacter[]> {
  const allCharacters = await getAllCharacters();
  const queryLower = query.toLowerCase();

  const filtered = allCharacters.filter((char) => char._nameLower.includes(queryLower));

  return filtered.slice(0, 10).map((item) => item.character);
}
