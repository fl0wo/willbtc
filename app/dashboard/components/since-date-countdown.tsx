import React, {useEffect, useState} from "react";

export function SinceDateCountdown({sinceMs}: { sinceMs: number }) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const diffSeconds = Math.floor((Date.now() - sinceMs) / 1000);
    //         setSeconds(diffSeconds);
    //         setMinutes(Math.floor(diffSeconds / 60));
    //         setHours(Math.floor(diffSeconds / 3600));
    //     }, 1000);
    //     // Cleanup interval on component unmount
    //     return () => clearInterval(interval);
    // }, []);

    return <span className="countdown">
        {/*{hours > 0 && <span style={{"--value": hours}}/> }*/}
        {/*{hours > 0 && 'h'}*/}
        {/*{minutes > 0 && <span style={{"--value": minutes}}/>}*/}
        {/*{minutes > 0 && 'm'}*/}
        {/*{seconds > 0 && <span style={{"--value": seconds}}/>}*/}
        {/*{seconds > 0 && 's'}*/}
    </span>;
}