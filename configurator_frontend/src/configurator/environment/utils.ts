import SunCalc from 'suncalc';
import tzlookup from 'tz-lookup'
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import { format } from 'date-fns';
import { useEnvContext } from './context';
import { Vector3 } from 'three';

export function adjustTimeToDaylightHours(time: Date, sunrise: Date, sunset: Date) {
    if (time < sunrise) {
        time = sunrise
    }

    if (time > sunset) {
        time = sunset
    }

    return time;
}

/**
 * Date must be in browsers time zone.
 * 
 */
export function getDaylightTimeRange({ 
    date, 
    coords 
} : { 
    date: Date, 
    coords: { lat: number, lng: number } 
}) : [string, string] {

    // timezone applicable at these coordinates
    const tz = tzlookup(coords.lat, coords.lng);

    // copy date and set midnight time
    // midnight time is set because we need to ignore time part of this date
    const dateCopy = new Date(date);
    dateCopy.setHours(0);
    dateCopy.setMinutes(0);
    dateCopy.setSeconds(0);

    // convert to time applicable at timezone specified by coordinates
    // the date still has browsers timezone, 
    // but it represents timezone at these coordinates
    const zonedTime = fromZonedTime(format(dateCopy, "yyyy-MM-dd")+"T00:00:00", tz);

    // get surise and sunset time
    const { sunrise, sunset } = SunCalc.getTimes(zonedTime, coords.lat, coords.lng)

    // get sunrise and sunset
    return [
        formatInTimeZone(sunrise, tz, "HH:mm"),
        formatInTimeZone(sunset, tz, "HH:mm")
    ];
}




export function convertSouthWestToNorthEast(azimuthRadians: number) {
    return (azimuthRadians + Math.PI) % (2 * Math.PI);
}

export function useSunAngularPosition() {
    const { coords, date, time } = useEnvContext();

    if (!coords || !date || !time) {
        return null;
    }

    const tz = tzlookup(coords.lat, coords.lng);

    const dateConverted = fromZonedTime(format(date, "yyyy-MM-dd") + "T" + time, tz);

    let { altitude, azimuth } = SunCalc.getPosition(dateConverted, coords.lat, coords.lng);
    azimuth = convertSouthWestToNorthEast(azimuth);

    return { altitude, azimuth }
}

export function useSunEuclidianPosition() {
    const angularPosition = useSunAngularPosition();
    if (!angularPosition) {
        return null;
    }    
    return calcPosFromAngles(angularPosition.altitude, angularPosition.azimuth);
}


export function calcPosFromAngles(inclination: number, azimuth: number, vector: Vector3 = new Vector3()) {
    const theta = Math.PI * (inclination - 0.5)
    const phi = 2 * Math.PI * (azimuth - 0.5)
  
    vector.x = Math.cos(phi)
    vector.y = Math.sin(theta)
    vector.z = Math.sin(phi)
  
    return vector
  }
  