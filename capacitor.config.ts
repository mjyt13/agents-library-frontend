import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.csradio.library',
  appName: 'CS Radio Library',
  webDir: 'dist',
  android: {
    // Media assets are all bundled — no cleartext HTTP traffic needed.
    allowMixedContent: false,
  },
}

export default config
