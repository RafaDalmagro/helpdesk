const BUSINESS_TIMES = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
];

const BUSINESS_WEEKDAYS = [1, 2, 3, 4, 5] as const;

function buildDefaultSlots(techId: string) {
    return BUSINESS_WEEKDAYS.flatMap((weekday) =>
        BUSINESS_TIMES.map((time) => ({ techId, weekday, time }))
    );
}

export { BUSINESS_TIMES, BUSINESS_WEEKDAYS, buildDefaultSlots };
