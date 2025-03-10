import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, SunriseIcon, SunsetIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { useEnvContext } from './context';
import { useDaylightTimeRange } from './use-daylight-time-range';
import { Switch } from '@/components/ui/switch';

const MAP_KEY = import.meta.env.VITE_MAP_KEY as string

export function EnvironmentSettingsForm() {

    const {
        coords, 
        setCoords,
        date, 
        setDate,
        time, 
        setTime,
        skyVisible,
        setSkyVisible,
        groundVisible,
        setGroundVisible
    } = useEnvContext();
 
    const [loaded, setLoaded] = useState(false);
    
    const timeRange = useDaylightTimeRange();

    return <div>
        <APIProvider 
            apiKey={MAP_KEY} 
            libraries={['places']} onLoad={() => { setLoaded(true) }}
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4 col-span-2 flex flex-row justify-between items-center">
                    <div>
                        <Label>Sky</Label>
                        <p className='text-foreground/50'>Turn on to see sky background</p>
                    </div>
                    <Switch 
                        checked={skyVisible}
                        onCheckedChange={(c) => setSkyVisible(c)}
                    />
                </div>
                <div className="mb-4 col-span-2 flex flex-row justify-between items-center">
                    <div>
                        <Label>Ground</Label>
                        <p className='text-foreground/50'>Turn on to see shadow cast by awning</p>
                    </div>
                    <Switch 
                        checked={groundVisible}
                        onCheckedChange={(c) => setGroundVisible(c)}
                    />
                </div>
                {
                    loaded && (
                        <div className="col-span-2 flex flex-col gap-2">
                            <div className='flex flex-col gap-1'>
                                <Label>Location & Date Time</Label>
                                <p className='text-foreground/50'>
                                    Enter your location and date time to see shadows at your location at particular time of year.
                                </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <LocationInput
                                    onChange={(lat, lng) => {
                                        setCoords({ lat, lng })
                                    }}
                                />
                                {
                                    coords && (
                                        <p className="text-foreground/50 text-sm">
                                            Latitude: { coords.lat.toFixed(2) } &nbsp;
                                            Longitude: { coords.lng.toFixed(2) }
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                <div className="col-span-2 flex flex-col gap-2">
                    <DateInput
                        date={date}
                        setDate={setDate}
                    />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                    <TimeSlider
                        time={time}
                        setTime={setTime} 
                        range={timeRange}
                    />
                </div>
            </div>
        </APIProvider>
    </div>
}

function TimeSlider({ 
    time, 
    setTime,
    range
} : { 
    time: string | null, 
    setTime: (time: string | null)  => void,
    range: [string, string] | null,
}) {

    useEffect(() => {
        if (!range) {
            return
        }

        if (!!time) {
            return
        }

        setTime("13:00");
    }, [time, range]);

    useEffect(() => {
        if (!range || !time) return;

        // Convert time and range to minutes
        const [startRange, endRange] = range.map(timeStr => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        });

        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        // Clamp the selected time within the range
        if (timeInMinutes < startRange) {
            setTime(`${Math.floor(startRange / 60).toString().padStart(2, '0')}:${(startRange % 60).toString().padStart(2, '0')}`);
        } else if (timeInMinutes > endRange) {
            setTime(`${Math.floor(endRange / 60).toString().padStart(2, '0')}:${(endRange % 60).toString().padStart(2, '0')}`);
        }
    }, [range, time, setTime]);

    const handleChange = (values: number[]) => {
        const value = values[0]
        // Convert the slider value (minutes) to time format (HH:MM)
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setTime(timeStr);
    };

    if (!range) {
        return <div>No range specified</div>;
    }

    // Convert range to slider values
    const [startRange, endRange] = range.map(timeStr => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    });

    // Convert time to slider value
    const currentTime = time ? time.split(':').map(Number) : [0, 0];
    const timeValue = currentTime[0] * 60 + currentTime[1];

    return (
        <div>
            <div className="flex justify-between py-4 items-center">
                <div className="flex items-center gap-4">
                    <SunriseIcon />
                    {/* <div>{range[0]}</div> */}
                </div>
                <div className='text-primary'>{time}</div>
                <div className="flex items-center gap-4">
                    {/* <div>{range[1]}</div> */}
                    <SunsetIcon />
                </div>
            </div>
            <Slider
                min={startRange}
                max={endRange}
                step={1}
                value={[timeValue]}
                onValueChange={handleChange}
            />
        </div>
    );
}

export function DateInput({ date, setDate }: { date: Date | null, setDate: (date: Date | null) => void }) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={(date) => setDate(date || null)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

function LocationInput({ onChange }: { onChange: (lat: number, lng: number) => void | Promise<void> }) {
    const [processing, setProcessing] = useState(false);

    return <GooglePlacesAutocomplete
        selectProps={{
            placeholder: 'Enter your location',
            isLoading: processing || undefined,
            onChange: async (newValue) => {
                const placeId = (newValue?.value?.place_id || null) as string | null;
                if (!placeId) {
                    return
                }
                try {
                    setProcessing(true);
                    const res = await geocodeByPlaceId(placeId)
                    const latLng = await getLatLng(res[0]);
                    onChange(latLng.lat, latLng.lng);
                } finally {
                    setProcessing(false);
                }
            },
        }}
    />
}