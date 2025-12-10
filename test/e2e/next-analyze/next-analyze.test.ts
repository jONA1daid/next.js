import { nextTestSetup } from 'e2e-utils'
import { runNextCommand } from 'next-test-utils'

describe('next experimental-analyze', () => {
  const { next, skipped, isTurbopack } = nextTestSetup({
    files: __dirname,
    skipStart: true,
    skipDeployment: true,
  })

  if (skipped) {
    it('is skipped', () => {})
    return
  }

  // experimental-analyze requires Turbopack
  if (!isTurbopack) {
    it('skips in non-Turbopack tests', () => {})
    return
  }

  it('runs successfully without errors', async () => {
    const { code, stderr } = await runNextCommand(['experimental-analyze'], {
      cwd: next.testDir,
      stderr: true,
    })

    expect(code).toBe(0)
    expect(stderr).not.toContain('Error')
  })
})
