import { GameService } from "~~/server/services/game.service";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return await GameService.getDailies(session.user?.id);
})
