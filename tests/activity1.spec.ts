import { test, expect } from '@playwright/test';

test('test the page of MercadoLibre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.mx/');

  // 1. getByRole
  await expect(page.getByRole('link', { name: /Ingresa/i }).first()).toBeVisible();

  // 2. getByTestId
  await expect(page.getByTestId('action:understood-button')).toBeVisible();

  // 3. getByAltText
  await expect(page.getByAltText(/MLM FSNB/i).first()).toBeVisible();

  // 4. getByText
  await expect(page.getByText(/Categorías/i).first()).toBeVisible();

  // 5. getByLabel
  await expect(page.getByLabel(/Ingresa lo que quieras encontrar/i)).toBeVisible();

  // 6. getByPlaceholder
  await expect(page.getByPlaceholder(/Buscar productos/i)).toBeVisible();

  // 7. getByTitle
  await expect(page.getByTitle(/Carrito/i).first()).toBeVisible();
});