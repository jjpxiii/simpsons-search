import { parseCharacter } from "./validation";
import type { SimpsonsCharacter } from "./validation";

export async function getCharacter(id: string): Promise<SimpsonsCharacter | null> {
  const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return parseCharacter(payload);
}
