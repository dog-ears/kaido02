import "dotenv/config";
import path from "node:path";
import { readFile } from "node:fs/promises";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "../src/lib/supabase/admin";

type SeedUser = {
  email: string;
  password: string;
  user_metadata?: Record<string, unknown>;
};

const USERS_PER_PAGE = 1000;

function assertDevelopmentEnvironment() {
  if (process.env.NODE_ENV !== "development") {
    console.error(
      "This script can only be executed when NODE_ENV is set to 'development'."
    );
    process.exit(1);
  }
}

function resolveSeedFilePath(): string {
  return path.resolve(process.cwd(), "seed-data", "auth-users.json");
}

async function loadSeedUsers(filePath: string): Promise<SeedUser[]> {
  const fileContent = await readFile(filePath, "utf-8");

  let parsed: unknown;
  try {
    parsed = JSON.parse(fileContent);
  } catch (error) {
    throw new Error(
      `Failed to parse seed data file (${filePath}). Ensure it contains valid JSON.`,
      { cause: error }
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Seed data must be an array of user objects.");
  }

  return parsed.map((entry, index) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof (entry as SeedUser).email !== "string" ||
      typeof (entry as SeedUser).password !== "string"
    ) {
      throw new Error(
        `Invalid seed data at index ${index}. Each entry must include 'email' and 'password'.`
      );
    }

    return {
      email: (entry as SeedUser).email,
      password: (entry as SeedUser).password,
      user_metadata: (entry as SeedUser).user_metadata,
    };
  });
}

async function deleteAllUsers(client: SupabaseClient) {
  console.log("Deleting existing auth users...");

  let page = 1;
  let deletedCount = 0;

  while (true) {
    const { data, error } = await client.auth.admin.listUsers({
      page,
      perPage: USERS_PER_PAGE,
    });

    if (error) {
      throw new Error("Failed to list users via Supabase Admin API.", {
        cause: error,
      });
    }

    const users = data?.users ?? [];

    if (users.length === 0) {
      break;
    }

    for (const user of users) {
      const { error: deleteError } = await client.auth.admin.deleteUser(
        user.id
      );

      if (deleteError) {
        throw new Error(
          `Failed to delete user (id: ${user.id}, email: ${user.email}).`,
          { cause: deleteError }
        );
      }

      deletedCount += 1;
      console.log(` - Deleted ${user.email ?? user.id}`);
    }

    if (users.length < USERS_PER_PAGE) {
      break;
    }

    page += 1;
  }

  console.log(`Deleted ${deletedCount} user(s).`);
}

async function insertSeedUsers(
  client: SupabaseClient,
  users: SeedUser[]
): Promise<void> {
  console.log("Creating seed users...");

  for (const user of users) {
    const { error } = await client.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: user.user_metadata,
    });

    if (error) {
      throw new Error(`Failed to create user (${user.email}).`, {
        cause: error,
      });
    }

    console.log(` - Created ${user.email}`);
  }

  console.log(`Created ${users.length} user(s).`);
}

async function main() {
  assertDevelopmentEnvironment();

  const seedFilePath = resolveSeedFilePath();
  const users = await loadSeedUsers(seedFilePath);

  if (users.length === 0) {
    console.warn("No users defined in the seed file. Skipping creation step.");
    return;
  }

  const client = createAdminClient();

  await deleteAllUsers(client);
  await insertSeedUsers(client, users);

  console.log("✅ Auth tables have been re-seeded.");
}

main().catch((error) => {
  console.error("❌ Seeding failed.");
  console.error(error);
  process.exit(1);
});

