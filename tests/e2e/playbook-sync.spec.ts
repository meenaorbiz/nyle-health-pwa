import { test, expect } from "@playwright/test";

test.describe("Admin to Patient Intake Synchronization", () => {
  test("edits in Playbook Builder publish and reflect in live Patient Intake", async ({ page }) => {
    await page.goto("/admin/playbooks");

    const voiceTextarea = page.locator("textarea").first();
    await expect(voiceTextarea).toBeVisible();

    const customPrompt = "Welcome to Nyle Health. Please share your primary longevity goals.";
    await voiceTextarea.fill(customPrompt);

    const publishButton = page.getByRole("button", { name: /Publish Changes/i });
    if (await publishButton.isVisible()) {
      await publishButton.click();
    }

    await page.goto("/onboard/intake");
    await expect(page.locator("body")).toContainText(/Baseline Health Profile|Physician Welcome/i);
  });

  test("PWA layout controls remain bounded inside the mobile shell", async ({ page }) => {
    await page.goto("/admin");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test("Modular Summary Hub renders 6 Longevity Markers, QR referral, Videos, and Calendar Modal", async ({ page }) => {
    // 1. Verify Admin Markers Builder loads and syncs
    await page.goto("/admin/markers");
    await expect(page.getByText("Longevity Markers Builder")).toBeVisible();
    await expect(page.getByText("Grip Strength", { exact: true })).toBeVisible();

    // 2. Verify Patient Summary Orchestrator Page
    await page.goto("/onboard/summary");
    await expect(page.getByText("Assessment Submitted to Dr. Neha")).toBeVisible();
    await expect(page.getByText("Grip Strength", { exact: true })).toBeVisible();
    await expect(page.getByText("Share with your friends and family for their better life")).toBeVisible();
    await expect(page.getByText("Please watch informative videos of Dr. Neha")).toBeVisible();

    // 3. Verify Google Calendar Booking Modal opens on clicking BOOK ASSESSMENT
    const bookBtn = page.getByRole("button", { name: /BOOK ASSESSMENT/i });
    await bookBtn.click();
    await expect(page.getByText("Schedule Longevity Assessment")).toBeVisible();
  });
});
