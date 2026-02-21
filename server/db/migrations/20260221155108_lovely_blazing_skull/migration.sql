CREATE TABLE "user_guild_memberships" (
	"user_id" uuid,
	"guild_id" text,
	"discord_id" text NOT NULL,
	"discord_username" text NOT NULL,
	"discord_discriminator" text NOT NULL,
	"discord_global_username" text,
	CONSTRAINT "user_guild_memberships_pkey" PRIMARY KEY("user_id","guild_id")
);
--> statement-breakpoint
ALTER TABLE "user_guild_memberships" ADD CONSTRAINT "user_guild_memberships_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;