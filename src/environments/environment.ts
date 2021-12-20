// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCQlydCoyOpMRjntPcidURvsV29jJ3mHE8",
    authDomain: "movielistdor.firebaseapp.com",
    databaseURL: "https://movielistdor.firebaseio.com",
    projectId: "movielistdor",
    storageBucket: "movielistdor.appspot.com",
    messagingSenderId: "575877309636",
    appId: "1:575877309636:web:160e6d3bd777d7344bd591",
    measurementId: "G-LEYVW1KL21"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
