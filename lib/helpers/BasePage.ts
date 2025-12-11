import {expect, Locator, Page} from "@playwright/test";

/**
 * Base page class providing common UI interaction methods.
 * All methods follow best practices for reliability:
 * - click: Always checks element visibility before clicking
 * - enterText: Always clears before filling text
 * - select: Waits for element visibility before selecting
 *
 * @example
 * ```typescript
 * class MyPage extends BasePage {
 *   readonly submitBtn: Locator;
 *
 *   constructor(page: Page) {
 *     super(page);
 *     this.submitBtn = page.getByRole('button', { name: 'Submit' });
 *   }
 *
 *   async submit() {
 *     await this.click(this.submitBtn);
 *   }
 * }
 * ```
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks an element after verifying it is visible.
   * @param locator - The element to click
   * @param options - Optional click configuration
   */
  async click(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.click({ force: options?.force });
  }

  /**
   * Double-clicks an element after verifying it is visible.
   * @param locator - The element to double-click
   * @param options - Optional configuration
   */
  async doubleClick(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.dblclick({ force: options?.force });
  }

  /**
   * Right-clicks an element after verifying it is visible.
   * @param locator - The element to right-click
   * @param options - Optional configuration
   */
  async rightClick(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.click({ button: 'right', force: options?.force });
  }

  /**
   * Clicks an element using JavaScript (bypasses actionability checks).
   * Use when standard click doesn't work due to overlapping elements.
   * @param locator - The element to click
   */
  async forceClick(locator: Locator): Promise<void> {
    await locator.evaluate((el: HTMLElement) => el.click());
  }

  /**
   * Enters text into an input field after clearing it.
   * Verifies element visibility before interaction.
   * @param locator - The input element
   * @param text - The text to enter
   * @param options - Optional configuration
   */
  async enterText(
    locator: Locator,
    text: string,
    options?: { clearFirst?: boolean; verify?: boolean; timeout?: number }
  ): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    if (options?.clearFirst !== false) {
      await locator.clear();
    }
    await locator.fill(text);
    if (options?.verify) {
      await expect(locator).toHaveValue(text);
    }
  }

  /**
   * Types text character by character (simulates real typing).
   * Useful when fill() doesn't trigger necessary events.
   * @param locator - The input element
   * @param text - The text to type
   * @param options - Optional configuration
   */
  async typeText(
    locator: Locator,
    text: string,
    options?: { clearFirst?: boolean; delay?: number; timeout?: number }
  ): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    if (options?.clearFirst !== false) {
      await locator.clear();
    }
    await locator.pressSequentially(text, { delay: options?.delay ?? 50 });
  }

  /**
   * Clears an input field.
   * @param locator - The input element to clear
   */
  async clearText(locator: Locator, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.clear();
  }

  /**
   * Presses a keyboard key while focused on an element.
   * @param locator - The element to focus
   * @param key - The key to press (e.g., 'Enter', 'Tab', 'Escape')
   */
  async pressKey(locator: Locator, key: string, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.press(key);
  }

  /**
   * Selects an option from a dropdown by value.
   * @param locator - The select element
   * @param value - The option value to select
   */
  async selectByValue(locator: Locator, value: string, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.selectOption({ value });
  }

  /**
   * Selects an option from a dropdown by visible text.
   * @param locator - The select element
   * @param text - The option text to select
   */
  async selectByText(locator: Locator, text: string, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.selectOption({ label: text });
  }

  /**
   * Selects an option from a dropdown by index.
   * @param locator - The select element
   * @param index - The option index to select (0-based)
   */
  async selectByIndex(locator: Locator, index: number, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.selectOption({ index });
  }

  /**
   * Selects multiple options from a multi-select dropdown.
   * @param locator - The select element
   * @param values - Array of option values to select
   */
  async selectMultiple(locator: Locator, values: string[], options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.selectOption(values);
  }

  /**
   * Checks a checkbox if it's not already checked.
   * @param locator - The checkbox element
   */
  async check(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.check({ force: options?.force });
  }

  /**
   * Unchecks a checkbox if it's currently checked.
   * @param locator - The checkbox element
   */
  async uncheck(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.uncheck({ force: options?.force });
  }

  /**
   * Sets a checkbox to a specific state.
   * @param locator - The checkbox element
   * @param checked - Whether the checkbox should be checked
   */
  async setChecked(locator: Locator, checked: boolean, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.setChecked(checked, { force: options?.force });
  }

  /**
   * Hovers over an element.
   * @param locator - The element to hover over
   */
  async hover(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.hover({ force: options?.force });
  }

  /**
   * Focuses on an element.
   * @param locator - The element to focus
   */
  async focus(locator: Locator, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.focus();
  }

  /**
   * Hovers over one element and clicks another (for menus that appear on hover).
   * @param hoverLocator - The element to hover over
   * @param clickLocator - The element to click after hover
   */
  async hoverAndClick(
    hoverLocator: Locator,
    clickLocator: Locator,
    options?: { force?: boolean; timeout?: number }
  ): Promise<void> {
    await expect(hoverLocator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await hoverLocator.hover();
    await expect(clickLocator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await clickLocator.click({ force: options?.force });
  }

  /**
   * Waits for an element to be visible.
   * @param locator - The element to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout: timeout ?? 5000 });
  }

  /**
   * Waits for an element to be hidden.
   * @param locator - The element to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeHidden({ timeout: timeout ?? 5000 });
  }

  /**
   * Waits for an element to be attached to the DOM.
   * @param locator - The element to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForAttached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout: timeout ?? 5000 });
  }

  /**
   * Waits for an element to be detached from the DOM.
   * @param locator - The element to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForDetached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout: timeout ?? 5000 });
  }

  /**
   * Waits for the page to finish loading (network idle).
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Waits for the DOM to be fully loaded.
   */
  async waitForDOMContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Asserts that an element is visible.
   * @param locator - The element to check
   * @param isVisible - Whether the element should be visible (default: true)
   */
  async isVisible(locator: Locator, isVisible: boolean = true, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ visible: isVisible, timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an element is enabled.
   * @param locator - The element to check
   */
  async isEnabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeEnabled({ timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an element is disabled.
   * @param locator - The element to check
   */
  async isDisabled(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeDisabled({ timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an element contains specific text.
   * @param locator - The element to check
   * @param text - The text to look for
   */
  async containsText(locator: Locator, text: string, timeout?: number): Promise<void> {
    await expect(locator).toContainText(text, { timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an element has specific text.
   * @param locator - The element to check
   * @param text - The exact text expected
   */
  async hasText(locator: Locator, text: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveText(text, { timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an input has a specific value.
   * @param locator - The input element to check
   * @param value - The expected value
   */
  async hasValue(locator: Locator, value: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveValue(value, { timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that an element has a specific attribute value.
   * @param locator - The element to check
   * @param name - The attribute name
   * @param value - The expected attribute value
   */
  async hasAttribute(locator: Locator, name: string, value: string, timeout?: number): Promise<void> {
    await expect(locator).toHaveAttribute(name, value, { timeout: timeout ?? 5000 });
  }

  /**
   * Asserts that a specific number of elements exist.
   * @param locator - The locator to count
   * @param count - The expected count
   */
  async hasCount(locator: Locator, count: number, timeout?: number): Promise<void> {
    await expect(locator).toHaveCount(count, { timeout: timeout ?? 5000 });
  }

  /**
   * Gets the text content of an element.
   * @param locator - The element to get text from
   * @returns The text content
   */
  async getText(locator: Locator, options?: { timeout?: number }): Promise<string> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    return await locator.textContent() ?? '';
  }

  /**
   * Gets the value of an input element.
   * @param locator - The input element
   * @returns The input value
   */
  async getValue(locator: Locator, options?: { timeout?: number }): Promise<string> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    return await locator.inputValue();
  }

  /**
   * Gets an attribute value from an element.
   * @param locator - The element
   * @param attributeName - The attribute name
   * @returns The attribute value or null
   */
  async getAttribute(locator: Locator, attributeName: string, options?: { timeout?: number }): Promise<string | null> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    return await locator.getAttribute(attributeName);
  }

  /**
   * Checks if an element is currently visible.
   * @param locator - The element to check
   * @returns True if visible, false otherwise
   */
  async checkIsVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Checks if a checkbox is checked.
   * @param locator - The checkbox element
   * @returns True if checked, false otherwise
   */
  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  /**
   * Scrolls an element into view.
   * @param locator - The element to scroll to
   */
  async scrollIntoView(locator: Locator, options?: { timeout?: number }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: options?.timeout ?? 5000 });
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Sets files on a file input element.
   * @param locator - The file input element
   * @param filePath - Path to the file(s) to set
   */
  async setInputFiles(locator: Locator, filePath: string | string[]): Promise<void> {
    await locator.setInputFiles(filePath);
  }

  /**
   * Clears files from a file input.
   * @param locator - The file input element
   */
  async clearInputFiles(locator: Locator): Promise<void> {
    await locator.setInputFiles([]);
  }

  /**
   * Drags an element and drops it on another element.
   * @param source - The element to drag
   * @param target - The element to drop on
   */
  async dragTo(
    source: Locator,
    target: Locator,
    options?: { sourcePosition?: { x: number; y: number }; targetPosition?: { x: number; y: number } }
  ): Promise<void> {
    await source.dragTo(target, options);
  }

}
