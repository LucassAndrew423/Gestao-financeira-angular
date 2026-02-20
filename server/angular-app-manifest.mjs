
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'Gestao-financeira-angular',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Gestao-financeira-angular"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5385, hash: 'fee65eb120decfde1251acc1d8e80d6ef9ae206a03feb8b37af243530c4f0f4c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 976, hash: '2921e682df8ebdd601e03c5ee9c827ee4cdde04489050a902dca5c410a2c5815', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-P4VAC5MP.css': {size: 16989, hash: 'EzBNPstGL3w', text: () => import('./assets-chunks/styles-P4VAC5MP_css.mjs').then(m => m.default)}
  },
};
