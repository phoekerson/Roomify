"use client";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange, Range, RangeKeyDict} from 'react-date-range';
import { useState } from 'react';


export function SelectCalendar() {
    const [state, setState] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    return (
        <>
            <input type="hidden" name="startDate" value={state[0].startDate?.toISOString()} />
            <input type="hidden" name="endDate" value={state[0].endDate?.toISOString()} />
            <DateRange
                date={new Date()}
                showDateDisplay={false}
                rangeColors={["#FF5A5F"]}
                ranges={state}
                onChange={(item: RangeKeyDict) => setState([item.selection])}
                minDate={new Date()}
                direction="vertical"
            />
        </>
    );
}