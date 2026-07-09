import { defineConfig, type UserConfig } from 'tsdown'


const config: UserConfig[] = defineConfig([
  {
    entry: 'src/index.ts',
    format: [ 'esm', 'cjs' ],
    outDir: 'dist',
    platform: 'neutral',
    dts: true,
  },
  {
    entry: 'src/node.ts',
    format: [ 'esm', 'cjs' ],
    outDir: 'dist',
    platform: 'node',
    dts: true,
  },
  {
    entry: 'src/web.ts',
    format: [ 'esm', 'cjs' ],
    outDir: 'dist',
    platform: 'browser',
    dts: true,
  },
] satisfies UserConfig[])

export default config
