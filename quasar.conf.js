// Configuration for your app
const devEnv = {
  //apiEndpoint: '"https://eval-dev.grow-360.com"',
  apiEndpoint: '"http://localhost:3001"',
  withCredentials: 'true'
}

const stagingEnv = {
  apiEndpoint: '"http://powerstar.info:10807"',
  withCredentials: 'true'
}

const prodEnv = {
  apiEndpoint: '"http://192.168.1.108:3001"',
  withCredentials: 'true'
}

module.exports = function (ctx) {
  const isStaging = process.env.STAGING == 1
  let publicPath = '/programming-classroom';
  if (isStaging) {
    publicPath = '/programming-classroom-staging';
  }
  console.log(publicPath);
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'code-mirror',
      'moment',
      'highlight',
      'clipboard2',
      'particles'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      publicPath: publicPath,
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: ctx.dev ? devEnv : (isStaging ? stagingEnv : prodEnv),
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QItemSeparator',
        'QCard',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QInput',
        'QField',
        'QCheckbox',
        'QRadio',
        'QDatetime',
        'QSlideTransition',
        'QSelect',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QPageSticky',
        'QModal',
        'QTooltip',
        'QModalLayout',
        'QRating',
        'QBtnGroup',
        'QTimeline',
        'QTabs',
        'QTab',
        'QTabPane',
        'QSpinner',
        'QSpinnerGears',
        'QScrollArea',
        'QChip',
        'QSlider'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify', 'Cookies', 'Dialog'
      ],
      i18n: 'ja'
    },
    // animations: 'all' --- includes all animations
    animations: 'all',
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'statics/icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack(cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.2'
  }
}
