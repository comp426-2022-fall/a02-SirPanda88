#!/usr/bin/env node

import minimist from "minimist"
import moment from "moment-timezone"
import fetch from "node-fetch"

const args = minimist(process.argv.slice(2));

if (args.h) {
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
	console.log("    -h            Show this help message and exit.");
	console.log("    -n, -s        Latitude: N positive; S negative.");
	console.log("    -e, -w        Longitude: E positive; W negative.");
	console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.");
	console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
	console.log("    -j            Echo pretty JSON from open-meteo API and exit.");
	process.exit(0);
}

let latit = 0;
let longit = 0;

if ("n" in args) {
	if ("s" in args) {
		console.log("Cannot specify LATITUDE twice");
	} else {
		latit = args.n;
	}
} else if ("s" in args) {
	if ("n" in args) {
		console.log("Cannot specify LATITUDE twice");
	} else {
		latit = -args.s;
	}
} else {
	console.log("Must specify LATITUDE");
}

if ("e" in args) {
        if ("w" in args) {
                console.log("Cannot specify LONGITUDE twice");
        } else {
                longit = args.e;
        }
} else if ("w" in args) {
        if ("e" in args) {
                console.log("Cannot specify LONGITUDE twice");
        } else {
                longit = -args.w;
        }
} else {
        console.log("Must specify LONGITUDE");
}

const timezone = moment.tz.guess();
if ("z" in args) {
	timezone = argz.z;
}

let dayOffset = 1;
if ("d" in args) {
	dayOffset = args.d;
}


