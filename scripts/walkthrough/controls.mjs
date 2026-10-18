import {expect} from "@playwright/test"

export async function createControls(page, {rehearsal, pause, speed}) {
  let pointer = { x: 1250, y: 70 };
  const viewport = page.viewportSize();
  if (viewport.width < 500) pointer = { x: 240, y: 60 };
  async function reveal(locator) {
    await expect(locator).toBeVisible();
    const box = await locator.boundingBox();
    if (box.y < 20 || box.y + box.height > viewport.height - 30) {
      await locator.evaluate(
        (element, smooth) =>
          element.scrollIntoView({
            behavior: smooth ? "smooth" : "instant",
            block: "center",
          }),
        !rehearsal,
      );
      await pause(650);
    }
  }
  async function move(locator) {
    await reveal(locator);
    const box = await locator.boundingBox();
    const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const from = { ...pointer };
    const frames = rehearsal ? 1 : 24;
    for (let frame = 1; frame <= frames; frame++) {
      const ratio = frame / frames;
      const eased = ratio * ratio * (3 - 2 * ratio);
      await page.mouse.move(
        from.x + (target.x - from.x) * eased,
        from.y + (target.y - from.y) * eased,
      );
      await page.evaluate(({x,y}) => window.captureAnnotations?.move(x,y), {
        x: from.x + (target.x - from.x) * eased,
        y: from.y + (target.y - from.y) * eased,
      });
      if (!rehearsal) await pause(12);
    }
    pointer = target;
  }
  async function click(locator) {
    await move(locator);
    await pause(180);
    await locator.click();
    await pause(300);
  }
  async function type(locator, text) {
    await locator.evaluate(element => { element.spellcheck = false; });
    await click(locator);
    await locator.press("Control+A");
    if (text) await locator.pressSequentially(text, { delay: rehearsal ? 0 : 26 * speed });
    else await locator.press('Backspace');
    await pause(250);
  }
  async function select(locator, value) {
    await move(locator);
    await locator.focus();
    await page.evaluate(() => window.captureAnnotations.click());
    await locator.selectOption(value);
    await pause(550);
  }
  async function highlight(locator, duration = 1800) {
    await reveal(locator);
    await page.evaluate(
      ({ rect, duration }) =>
        window.captureAnnotations.highlight(rect, duration),
      { rect: await locator.boundingBox(), duration: duration * speed },
    );
    await pause(duration);
  }
  async function nav(name) {
    await click(
      page.getByRole("complementary", {name: "Navegación de administración"}).getByRole("link", { name, exact: true }),
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await pause(650);
  }
  async function upload(input, file) {
    await move(input.locator('..'));
    await page.evaluate(() => window.captureAnnotations.click());
    await input.setInputFiles(file);
    await pause(700);
  }
  async function reset() {
    pointer = viewport.width < 500 ? {x:240,y:60} : {x:1250,y:70};
    await page.mouse.move(pointer.x,pointer.y);
    await page.evaluate(({x,y})=>window.captureAnnotations?.move(x,y),pointer);
  }
  return { click, type, select, highlight, nav, reveal, upload, reset };
}
