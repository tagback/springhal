export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/springhal.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.springhal',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common/http': 'ng.common.http',
      'rxjs/Observable': 'Rx',
      'rxjs/add/operator/map': 'Rx.Observable.prototype',
      'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
      'rxjs/add/operator/expand': 'Rx.Observable.prototype',
      'rxjs/add/operator/last': 'Rx.Observable.prototype',
      'rxjs/add/observable/of': 'Rx.Observable',
      'rxjs/add/observable/empty': 'Rx.Observable',
      'rxjs/add/observable/from': 'Rx.Observable'
    },
    external: [ '@angular/core', 
        '@angular/common/http',
        'rxjs/Observable',
        'rxjs/add/operator/map',
        'rxjs/add/operator/mergeMap',
        'rxjs/add/operator/expand',
        'rxjs/add/operator/last',
        'rxjs/add/observable/of',
        'rxjs/add/observable/empty',
        'rxjs/add/observable/from'
    ]
  }
