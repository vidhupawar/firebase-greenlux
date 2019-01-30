/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAkM82-4l5oMoAOSiPGb5PgHIDOPjEf8Vo',
        authDomain: 'local300pinns.firebaseapp.com',
        databaseURL: 'https://local300pinns.firebaseio.com',
        projectId: 'local300pinns',
        storageBucket: 'local300pinns.appspot.com',
        messagingSenderId: '735932334372',
    },
};
