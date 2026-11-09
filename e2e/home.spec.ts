import { test, expect } from "@playwright/test";
test("home mostra entrada para Bíblia",async({page})=>{await page.goto("/");await expect(page.getByRole("link",{name:"Abrir Bíblia"})).toBeVisible();});
