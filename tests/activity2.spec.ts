import { test, expect } from '@playwright/test';

test('adds a new todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // getByPlaceholder
  await page.getByPlaceholder('What needs to be done?').fill('Study Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // getByText
  await expect(page.getByText('Study Playwright')).toBeVisible();
});

test('marks one todo as completed', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await page.getByPlaceholder('What needs to be done?').fill('Finish homework');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // getByRole
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();

  await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
});

test('filters active todos', async ({ page }) => {
  test.slow();

  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await page.getByPlaceholder('What needs to be done?').fill('Completed task');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Active task');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByRole('checkbox', { name: 'Toggle Todo' }).first().check();

  await page.getByRole('link', { name: 'Active' }).click();

  await expect(page.getByText('Completed task')).not.toBeVisible();
  await expect(page.getByText('Active task')).toBeVisible();
});

test('counts todos using test id', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await page.getByPlaceholder('What needs to be done?').fill('Task one');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Task two');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // getByTestId
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  // non-retrying assertion
  const totalTodos = await page.getByTestId('todo-item').count();
  expect(totalTodos).toBe(2);
});

test.fail('example of test.fail annotation', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // This todo does not exist
  // The test is marked with test.fail, Playwright expects it to fail
  await expect(page.getByText('This todo does not exist')).toBeVisible();
});