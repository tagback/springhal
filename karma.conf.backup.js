module.exports = function(config) {
    
      var appBase    = 'src/';       // transpiled app JS and map files
      var appSrcBase = appBase;      // app source TS files
    
      config.set({
        basePath: '',
        frameworks: ['jasmine'],
    
        plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
        ],
    
        client: {
          builtPaths: [appBase], // add more spec base paths as needed
          clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
    
        customLaunchers: {
          // From the CLI. Not used here but interesting
          // chrome setup for travis CI using chromium
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },
    
        files: [    
          // RxJs
          { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
          { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
    
          // Paths loaded via module imports:
          // Angular itself
          { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
          { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

          // transpiled application & spec code paths loaded via module imports
          { pattern: appBase + '**/*.js', included: false, watched: true },
            
    
          // Asset (HTML & CSS) paths loaded via Angular's component compiler
          // (these paths need to be rewritten, see proxies section)
          { pattern: appBase + '**/*.html', included: false, watched: true },
          { pattern: appBase + '**/*.css', included: false, watched: true },
    
          // Paths for debugging with source maps in dev tools
          { pattern: appBase + '**/*.ts', included: false, watched: false },
          { pattern: appBase + '**/*.js.map', included: false, watched: false },
      
        ],
    
         
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
    
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
      })
    }