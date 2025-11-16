import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

test.describe.configure({ mode: "serial" });

const seededUser = {
  email: "dev-user1@example.com",
  password: "Password123",
};

const nonExistingUser = {
  email: "missing-user@example.com",
  password: "DoesNotMatter1!",
};

function uniqueEmail() {
  const uuid = randomUUID().replace(/-/g, "").slice(0, 6);
  return `test${Date.now()}${uuid}@testmail.com`;
}

test.describe("ユーザー登録", () => {
  test("TC-001: 正常な新規登録", async ({ page }) => {
    const email = uniqueEmail();
    await page.goto("/register");

    await page.getByLabel("メールアドレス").fill(email);
    await page.getByLabel("パスワード", { exact: true }).fill("Password123!");
    await page.getByLabel("パスワード（確認）", { exact: true }).fill("Password123!");
    await page.getByRole("button", { name: "新規登録" }).click();

    await expect(page).toHaveURL(/\/login\?registered=true/);
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
  });

  test("TC-002: パスワード不一致エラー", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("メールアドレス").fill(uniqueEmail());
    await page
      .getByLabel("パスワード", { exact: true })
      .fill("Password123!");
    await page
      .getByLabel("パスワード（確認）", { exact: true })
      .fill("Different123!");
    await page.getByRole("button", { name: "新規登録" }).click();

    await expect(
      page.getByText("パスワードが一致しません")
    ).toBeVisible();
  });

  test("TC-003: パスワード長不足エラー", async ({ page }) => {
    await page.goto("/register");

    const passwordInput = page.getByLabel("パスワード", { exact: true });
    const confirmInput = page.getByLabel("パスワード（確認）", {
      exact: true,
    });

    await page.getByLabel("メールアドレス").fill(uniqueEmail());
    await passwordInput.fill("short");
    await confirmInput.fill("short");
    await page.getByRole("button", { name: "新規登録" }).click();

    const passwordValidity = await passwordInput.evaluate((el) => ({
      valid: el.validity.valid,
      tooShort: el.validity.tooShort,
      message: el.validationMessage,
    }));
    expect(passwordValidity.valid).toBe(false);
    expect(passwordValidity.tooShort).toBe(true);
    expect(passwordValidity.message.length).toBeGreaterThan(0);
  });

  test("TC-004: 既存メールアドレスを再登録した場合の動作", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("メールアドレス").fill(seededUser.email);
    await page.getByLabel("パスワード", { exact: true }).fill("Password123!");
    await page
      .getByLabel("パスワード（確認）", { exact: true })
      .fill("Password123!");
    await page.getByRole("button", { name: "新規登録" }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
  });
});

test.describe("ログイン", () => {
  test("TC-008: 正常なログイン", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("メールアドレス").fill(seededUser.email);
    await page.getByLabel("パスワード").fill(seededUser.password);
    await page.getByRole("button", { name: "ログイン" }).click();

    await page.waitForURL("**/");
    await expect(page.getByText(`ログイン中: ${seededUser.email}`)).toBeVisible();
  });

  test("TC-009: 間違ったパスワードでのログインエラー", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("メールアドレス").fill(seededUser.email);
    await page.getByLabel("パスワード").fill("WrongPassword123!");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(
      page.getByText("Invalid login credentials", { exact: false })
    ).toBeVisible();
  });

  test("TC-010: 存在しないメールアドレスでのログインエラー", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("メールアドレス").fill(nonExistingUser.email);
    await page.getByLabel("パスワード").fill(nonExistingUser.password);
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(
      page.getByText("Invalid login credentials", { exact: false })
    ).toBeVisible();
  });
});

test.describe("ログアウトとセッション", () => {
  test("TC-014: 正常なログアウト", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("メールアドレス").fill(seededUser.email);
    await page.getByLabel("パスワード").fill(seededUser.password);
    await page.getByRole("button", { name: "ログイン" }).click();
    await page.waitForURL("**/");

    await page.getByRole("button", { name: "ログアウト" }).click();

    await expect(page.getByText("ログインしていません")).toBeVisible();
  });

  test("TC-022: ページリロード後のセッション維持", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("メールアドレス").fill(seededUser.email);
    await page.getByLabel("パスワード").fill(seededUser.password);
    await page.getByRole("button", { name: "ログイン" }).click();
    await page.waitForURL("**/");

    await expect(page.getByText(`ログイン中: ${seededUser.email}`)).toBeVisible();

    await page.waitForTimeout(500);
    await page.reload();
    await expect(page.getByText(`ログイン中: ${seededUser.email}`)).toBeVisible();
  });
});

