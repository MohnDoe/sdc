import type { H3Event, EventHandlerRequest } from "h3";

export async function requireDiscordAuth(event: H3Event<EventHandlerRequest>) {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({ status: 401, statusMessage: "Discord auth required" })
  }

  event.context.session = session;

  return session;
}
