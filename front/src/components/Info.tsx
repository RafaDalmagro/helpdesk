import { Status } from "./Status";
import { useState } from "react";

type InfoProps = {
    chamado: Chamado;
};

export function Info({ chamado }: InfoProps) {
    return (
        <section className="h-full flex flex-col gap-4">
            <div className="flex-1 border border-gray-500 rounded-md p-5">
                <div className="flex items-center justify-between gap-4">
                    <span>{chamado.id}</span>
                    <Status status={chamado.status} />
                </div>
            </div>

            <div className="flex-1 border border-gray-500 rounded-md p-5" />
        </section>
    );
}
