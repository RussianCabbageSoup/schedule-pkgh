import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pkgh.schedule',
  appName: 'Schedule',
  webDir: 'dist',
  backgroundColor: '#000000',
  plugins: {
    SystemBars: {
      style: 'DARK'
    }
  }
};

export default config;
