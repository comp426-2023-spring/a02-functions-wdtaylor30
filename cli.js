#!/usr/bin/env node

// import (not require) minimist, moment, and fetch
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

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
var lat, long, tz, day, pretty = null;

if (args.n) { lat = args.n; }
if (args.s) { lat = args.s; }
if (args.e) { long = args.e; }
if (args.w) { long = args.w; }

// timezone
tz = moment.tz.guess();
if (args.z) { tz = args.z; }

// day
if (args.d) {
    day = args.d;
} else {
    day = 1
}


//construct url
var url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&timezone=${tz}&daily=precipitation_hours`

/* output of interest: precipitation hours
returns hours for 7 days starting from today:
"precipitation_hours": [x, x, x, x, x, x, x]*/

// construct fetch call
const response = await fetch(url);
const data = await response.json();


// output
// optional: json
if (args.j) {
    // if the user didn't specify a location, then give an error
    if (!args.n | args.s | args.e | args.w) {
        console.log("Error: Please include a location");
        process.exit(1);
    }

    // otherwise, continue as normal
    console.log(data);
    process.exit(0);
} else {
}

// galosh statement
// TODO: First, debug statement printing out the array value
// TODO: on the day we want. 
// TODO: Then, craft the galosh log according to the instructions. AGTG.
var precip = data.daily.precipitation_hours[day];

if (precip > 0) {
    console.log("You might need your galoshes ");
} else {
    console.log("You will not need your galoshes ");
}

// date statement
const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}