
//en este fichero, declaramos qué COMPARTO de este MICRO, qué hago público
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'perfil',

  exposes: {
    './Module': './projects/perfil/src/app/perfil/perfil.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
