import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://autoflex-2mzy.onrender.com",
    supportFile: false,
    defaultCommandTimeout: 10000, 
    requestTimeout: 60000,
    responseTimeout: 60000,
    pageLoadTimeout: 60000,
  },
});