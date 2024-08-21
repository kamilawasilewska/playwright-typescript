import { test, expect} from '@playwright/test';

const pageName = 'https://www.saucedemo.com/';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto(pageName);
})


test('title login page', async({ page }) => {
  await expect(page).toHaveTitle('Swag Labs');
});



test('Correct login', async({ page }) => {
  /* Test case:
  - Click Username and provide username
  - Click Password and provide password
  - Click Login button
  - Check if user is login and ne page is opened
  */

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(pageName + 'inventory.html')

});


test('Lack of password', async({ page }) => {
  /* Test case:
  - Click Username and provide username
  - Click Login button
  - Check if error is visible
  */

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect((page).getByText('Epic sadface: Password is required')).toBeVisible()

});

test('Lack of username', async({ page }) => {
  /* Test case:
  - Click Password and provide password
  - Click Login button
  - Check if error is visible
  */

  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect((page).getByText('Epic sadface: Username is required')).toBeVisible()

});


test('Lack of username and password', async({ page }) => {
  /* Test case:
- Open page
- Click Login button
- Check if error is visible
  */

  await page.getByRole('button', { name: 'Login' }).click();

  await expect((page).getByText('Epic sadface: Username is required')).toBeVisible()

});
