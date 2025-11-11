import { defineConfig, UserConfig } from 'tsdown'


const config: UserConfig[] = defineConfig([
  {
    entry: 'src/index.ts',
    format: 'cjs',
    outDir: 'dist/cjs',
    nodeProtocol: true,
    shims: true,
  },
  {
    entry: 'src/index.ts',
    format: 'esm',
    outDir: 'dist/esm',
    nodeProtocol: true,
    shims: true,
  },
] satisfies UserConfig[])

export default config
