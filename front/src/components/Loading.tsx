export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 min-h-50 bg-gray-100 gap-4">
            <div
                className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
                role="status"
            />

            <span className="text-lg text-gray-600 font-medium animate-pulse">
                Carregando...
            </span>
        </div>
    );
}
