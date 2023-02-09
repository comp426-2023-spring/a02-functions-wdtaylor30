#!/usr/bin/env node

// require minimist, moment, and fetch
var minimist = require('minimist');
var moment = require('moment-timezone');
var fetch = require('node-fetch');

// use minimist to process options
var args = minimist(process.argv.slice(2), {
    alias: { h: 'help', n: 'north', s: 'south',
            e: 'east', w: 'west', z: 'timezone',
            d: 'day', j: 'json'}
})

// if this option is present then log help text
// and exit 0
var help = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
-h            Show this help message and exit.
-n, -s        Latitude: N positive; S negative.
-e, -w        Longitude: E positive; W negative.
-z            Time zone: uses tz.guess() from moment-timezone by default.
-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
-j            Echo pretty JSON from open-meteo API and exit.`

// make check and print
if (args.h) { console.log(help); process.exit(0); }

// OpenMeteo call
/* inputs:
latitute:(north for positive #; south for negative)
longitude: east for +; w for -)
time zone: guess if -z isn't specified
-d: 0-6: 0 today;, 1 default
-j: echo JSON and exit */

// pull variables from arguments
// location
if (args.n) { latitude = args.n; }
if (args.s) { latitude = args.s; }
if (args.e) { longitude = args.e; }
if (args.w) { longitude = args.w; }

// timezone
timezone = moment.tz.guess();
if (args.z) { timezone = args.z; }

// day
if (args.d) {
    day = args.d;
} else {
    day = 1
}

// pretty json
if (args.j) {
    pretty = args.j; 
} else {
    pretty = "";
}

//construct url
// TODO: From here, return to api site to construct your URL.
// TODO: I'd say halfway done; glory to God.
// https://open-meteo.com/en/docs#api_form


/* output of interest: precipitation hours
returns hours for 7 days starting from today:
"precipitation_hours": [x, x, x, x, x, x, x]*/

// construct fetch call
const response = await fetch(url)
