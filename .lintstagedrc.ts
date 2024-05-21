import path from 'path'

const buildEslintCommand = (filenames: string[]): string => {
  return `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
}

export default {
  '*.{js,jsx,ts,tsx}': (filenames: string[]) => [buildEslintCommand(filenames)],
}
