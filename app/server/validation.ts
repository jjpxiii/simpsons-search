import { z } from "zod";

const zNullableString = z.string().nullable().optional();
const zNullableStringArray = z.array(z.string()).nullable().optional();

export const zCharacterSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  portrait_path: z.string(),
  occupation: zNullableString,
  description: zNullableString,
  phrases: zNullableStringArray,
  gender: zNullableString,
  status: zNullableString,
  born: zNullableString,
});

export const zCharactersPageSchema = z.object({
  results: z.array(zCharacterSchema),
});

export type SimpsonsCharacter = z.infer<typeof zCharacterSchema>;
export type SimpsonsCharactersPage = z.infer<typeof zCharactersPageSchema>;

export function parseCharacter(payload: unknown): SimpsonsCharacter | null {
  const parsed = zCharacterSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}

export function parseCharactersPage(payload: unknown): SimpsonsCharactersPage | null {
  const parsed = zCharactersPageSchema.safeParse(payload);
  return parsed.success ? parsed.data : null;
}
