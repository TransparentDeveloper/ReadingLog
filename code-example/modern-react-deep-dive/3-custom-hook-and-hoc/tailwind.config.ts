import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // src 폴더 내 모든 JavaScript 및 TypeScript 파일 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
