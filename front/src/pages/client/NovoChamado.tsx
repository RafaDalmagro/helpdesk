import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

import { getUserId } from "../../utils/getUserId";

import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { useState, useEffect } from "react";

import { api } from "../../services/api";

async function getCategories() {
    const response = await api.get<{ categories: Category[] }>("/categories");
    return response.data.categories;
}

const ticketSchema = z.object({
    title: z.string().min(3, {
        message: "O título deve ter no mínimo 3 caracteres",
    }),
    description: z.string().min(10, {
        message: "A descrição deve ter no mínimo 10 caracteres",
    }),
    techId: z.uuid({ message: "ID de técnico inválido" }),
    clientId: z.uuid({ message: "ID de cliente inválido" }).optional(),
    serviceId: z.uuid({ message: "ID de serviço inválido" }).optional(),
    categoryId: z.uuid({ message: "ID da categoria inválido" }),
});

export function NovoChamado() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    const clientId = getUserId();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    const categoryOptions = Array.isArray(categories)
        ? categories.map((category) => ({
              value: category.id,
              label: category.name,
          }))
        : [];

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const responseAvailability = await api.get("/tech-availability");

            const techs: { id: string; name: string }[] =
                responseAvailability.data.techs;

            if (!techs.length) {
                throw new Error("Nenhum técnico disponível no momento");
            }

            const randomIndex = Math.floor(Math.random() * techs.length);
            const randomTechId = techs[randomIndex].id;

            const data = ticketSchema.parse({
                title,
                description,
                categoryId,
                clientId,
                techId: randomTechId,
            });

            const responseTickets = await api.post("/tickets", data);
            alert(`Chamado criado com sucesso! ID: ${responseTickets.data.id}`);
        } catch (err) {
            let errorMessage = "Não foi possível iniciar a sessão";

            if (err instanceof ZodError) {
                errorMessage = err.issues[0].message;
            }

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data.message || errorMessage;
            }

            if (err instanceof Error) {
                errorMessage = err.message;
                alert(errorMessage);
            }

            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="flex flex-1 bg-gray-600 rounded-t-xl md:rounded-t-none md:rounded-tl-xl flex-col gap-4 overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
            <h2 className="text-2xl text-purple-800 font-bold">Novo Chamado</h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4 md:flex-row md:gap-6">
                <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg md:p-8">
                    <div>
                        <h3 className="text-md text-gray-200 font-bold">
                            Informações
                        </h3>
                        <p className="text-xs text-gray-300">
                            Configure os dias e horários em que você está
                            disponível para atender chamados
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <Input
                                required
                                label="Título"
                                placeholder="Digite um título para o chamado"
                                className="py-2"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextArea
                                required
                                label="Descrição"
                                placeholder="Digite um título para o chamado"
                                rows={5}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <Select
                                required
                                label="Categoria de serviço"
                                options={categoryOptions}
                                onChange={(e) => setCategoryId(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg md:h-fit">
                    <div>
                        <h3 className="text-md text-gray-200 font-bold">
                            Resumo
                        </h3>
                        <p className="text-xs text-gray-300">
                            Valores e detalhes
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-0.5">
                            <label className="text-xs text-gray-400 font-bold">
                                Categoria de serviço
                            </label>
                            <span className="text-xs text-gray-200">
                                Erro de rede
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <label className="text-xs text-gray-400 font-bold">
                                Custo inicial
                            </label>
                            <span className="text-gray-200 text-lg font-bold">
                                <small className="text-xs">R$ </small>200,00
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-300">
                            O chamado será automaticamente atribuído a um
                            técnico disponível
                        </p>
                    </div>
                    <Button type="submit" buttonName="Criar chamado" />
                </div>
            </form>
        </section>
    );
}
