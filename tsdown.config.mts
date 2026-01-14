import { defineConfig, type UserConfig } from 'tsdown'


const config: UserConfig[] = defineConfig([
  {
    entry: 'src/index.ts',
    format: 'cjs',
    outDir: 'dist/cjs',
    platform: 'neutral',
  },
  {
    entry: 'src/index.ts',
    format: 'esm',
    outDir: 'dist/esm',
    platform: 'neutral',
  },
] satisfies UserConfig[])

export default config
