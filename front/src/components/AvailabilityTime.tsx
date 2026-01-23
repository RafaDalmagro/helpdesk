type Props = {
    time: string;
};

export function AvailabilityTime({ time }: Props) {
    return (
        <div className="p-1.5 rounded-2xl border border-gray-400 flex justify-center items-center font-bold text-xs text-gray-400">
            {time}
        </div>
    );
}
