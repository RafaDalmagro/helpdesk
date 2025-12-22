export function UserInitials({
    userInitials,
    userEmail,
    userRole,
    userName,
}: UserInitialsProps) {
    return (
        <div className="flex md:flex-1 gap-3 items-center h-fit">
            <span className="flex items-center justify-center bg-purple-800 rounded-4xl size-10 py-2 px-1.5 text-gray-600 text-sm leading-5">
                {userInitials}
            </span>
            {userName && (
                <span className="hidden xl:flex items-center">{userName}</span>
            )}
            {userRole && (
                <div className="hidden md:flex md:flex-col md:justify-center items-center">
                    <span className="text-sm text-gray-600 capitalize">
                        {`Usuário ${userRole}`}
                    </span>
                    {userEmail && (
                        <span className="text-xs text-gray-400">
                            {userEmail}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
