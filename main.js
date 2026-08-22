import { createApps } from 'alemonjs';
import { apps } from './index.js';
import { warmupRenderCache } from './components/pre-render.js'
const app = createApps(import.meta.url);
app.component(apps); app.mount();
warmupRenderCache()
