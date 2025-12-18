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

const TECH1_TIMES = [
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
] as const;

const TECH2_TIMES = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
] as const;

const TECH3_TIMES = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
] as const;

const BUSINESS_WEEKDAYS = [1, 2, 3, 4, 5] as const;

function buildDefaultSlots(techId: string) {
    return BUSINESS_WEEKDAYS.flatMap((weekday) =>
        BUSINESS_TIMES.map((time) => ({ techId, weekday, time }))
    );
}

export {
    BUSINESS_TIMES,
    BUSINESS_WEEKDAYS,
    buildDefaultSlots,
    TECH1_TIMES,
    TECH2_TIMES,
    TECH3_TIMES,
};
