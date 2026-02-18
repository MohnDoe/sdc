import { z } from "zod/v4"
import { GameService } from "#server/services/game.service";
import { checkPuzzleAgainstSolution } from "#shared/utils/sudoku";

const bodySchema = z.object({
  puzzleId: z.string(),
  board: z.string().length(TOTAL_CELLS)
})

export default defineEventHandler(async (event) => {
  const session = await requireDiscordAuth(event);
  const usedId = session.user!.id;

  // TODO: add completion mark on progress etc
  const body = await readValidatedBody(event, bodySchema.safeParse);

  if (!body.success) {
    throw body.error.issues;
  }

  const { puzzleId, board } = body.data;

  const puzzle = await GameService.getPuzzle(puzzleId);

  if (!puzzle) {
    return createError({ status: 404, message: 'This Sudoku does not exist !' });
  }

  const verified = checkPuzzleAgainstSolution(board, puzzle.solution);

  return {
    verified,
  }
})
