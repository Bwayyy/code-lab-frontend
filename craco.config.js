const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
               '@primary-color': '#1DA57A',
               '@list-header-background': '@popover-background',
               '@list-footer-background': '@popover-background',
               '@page-header-back-color': '#fff',
              },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};