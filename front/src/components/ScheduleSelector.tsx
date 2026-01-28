import { useState } from "react";
import x from "../assets/x-white.svg";

const PERIODS = [
    {
        label: "Manhã",
        times: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    },
    {
        label: "Tarde",
        times: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    { label: "Noite", times: ["19:00", "20:00", "21:00", "22:00", "23:00"] },
];

type ScheduleSelectorProps = {
    onChange?: (selectedSlots: string[]) => void;
    className?: string;
};

export function ScheduleSelector({
    onChange,
    className,
}: ScheduleSelectorProps) {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const handleToggleSlot = (time: string) => {
        setSelectedSlots((prevSlots) => {
            const newSlots = prevSlots.includes(time)
                ? prevSlots.filter((t) => t !== time)
                : [...prevSlots, time];

            return newSlots;
        });

        const newSlots = selectedSlots.includes(time)
            ? selectedSlots.filter((t) => t !== time)
            : [...selectedSlots, time];

        if (onChange) onChange(newSlots);
    };

    return (
        <div
            className={`rounded-xl p-6 flex flex-col md:w-fit gap-6 border border-gray-500 ${className}`}>
            <div className="flex flex-col gap-1">
                <h2 className="text-md font-bold text-gray-200">
                    Horários de atendimento
                </h2>
                <p className="text-gray-300 text-xs">
                    Selecione os horários de disponibilidade do técnico
                </p>
            </div>
            <div className="flex flex-col gap-5">
                {PERIODS.map((period) => (
                    <div key={period.label} className="flex flex-col gap-2">
                        <h3 className="text-xxs font-bold text-gray-300 uppercase">
                            {period.label}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {period.times.map((time) => {
                                const isSelected = selectedSlots.includes(time);

                                return (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => handleToggleSlot(time)}
                                        className={`p-1.5 rounded-full font-bold text-xs transition-all duration-200 border flex items-center hover:cursor-pointer ${
                                            isSelected
                                                ? "bg-purple-400 text-gray-600 border-purple-400 hover:opacity-80"
                                                : "bg-gray-600 text-gray-200 border-gray-300 hover:opacity-80"
                                        } `}>
                                        {time}
                                        {isSelected && (
                                            <img src={x} alt="Remove" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
