// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { loadEnvConfig } from '@next/env'

import next from "next";
 
import { resolve } from 'path'
next({
  dev: true,
  dir: resolve(__dirname, '../'), // replace `../` with the root of the nextjs project
})

loadEnvConfig(process.cwd())