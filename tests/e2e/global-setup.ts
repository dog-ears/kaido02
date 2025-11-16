import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

async function runSeedCommand() {
  console.log("🌱 Running Supabase auth seeding via `npm run seed:auth`...");
  await execAsync("npm run seed:auth", {
    cwd: process.cwd(),
    env: process.env,
  });
}

async function globalSetup() {
  if (process.env.SKIP_E2E_SEED === "true") {
    console.log("⏭️  SKIP_E2E_SEED=true detected. Skipping auth seeding.");
    return;
  }

  await runSeedCommand();
}

export default globalSetup;

