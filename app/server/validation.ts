export interface SimpsonsCharacter {
  id: number | string;
  name: string;
  portrait_path: string;
  occupation?: string | null;
  description?: string | null;
  phrases?: string[] | null;
  gender?: string | null;
  status?: string | null;
  born?: string | null;
}

export interface SimpsonsCharactersPage {
  results: SimpsonsCharacter[];
}
