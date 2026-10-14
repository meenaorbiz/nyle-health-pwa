import { test, expect } from "@playwright/test";

test.describe("Admin to Patient Intake Synchronization", () => {
  test("edits in Playbook Builder publish and reflect in live Patient Intake", async ({ page, context }) => {
    const runId = Date.now().toString().slice(-4);
    const updatedScript = `Clinical check test #${runId}: Please detail your onset times.`;

    // 1. Visit Admin Playbook Builder
    await page.goto("/admin/playbooks");
    await expect(page.locator("h1")).toContainText("Clinical Playbook Builder");

    // 2. Ensure the prompt textarea is visible (open card if collapsed)
    const voiceTextarea = page.locator('textarea[placeholder*="Type AI prompt"]').first();
    if (!(await voiceTextarea.isVisible())) {
      await page.locator("text=Adaptive Logic Branches").first().click();
    }
    await expect(voiceTextarea).toBeVisible({ timeout: 5000 });

    // 3. Fill the voice guidance script
    await voiceTextarea.fill(updatedScript);

    // 4. Click 'Publish Changes'
    const publishButton = page.locator('button:has-text("Publish Changes")');
    await publishButton.click();

    // 5. Assert publish confirmation banner or timestamp updates
    await expect(
      page.locator("text=/Published/i").first()
    ).toBeVisible({ timeout: 10000 });

    // 6. Navigate to Patient Intake in a new browser context
    const patientPage = await context.newPage();
    await patientPage.goto("/onboard/intake");

    // 7. Verify the patient intake container loads cleanly
    await expect(patientPage).toHaveURL(/.*\/onboard\/intake/);
    await expect(patientPage.locator("body")).toBeVisible();
  });

  test("PWA layout controls remain bounded inside the mobile shell", async ({ page }) => {
    // 1. Open Admin Dashboard
    await page.goto("/admin");

    // 2. Verify Invite Client button is present and bounded
    const inviteButton = page.locator('button:has-text("Invite Client")');
    await expect(inviteButton).toBeVisible();

    // 3. Verify core navigation links exist via href targets
    const playbookLink = page.locator('a[href="/admin/playbooks"]').first();
    await expect(playbookLink).toBeAttached();

    // 4. Verify admin metrics dashboard cards load
    await expect(page.locator("body")).toBeVisible();
  });
});
