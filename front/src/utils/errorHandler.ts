import { AxiosError } from "axios";

type ErrorType =
    | "email_exists"
    | "invalid_email"
    | "invalid_name"
    | "invalid_password"
    | "invalid_times"
    | "no_times_selected"
    | "validation_error"
    | "unknown_error";

interface ParsedError {
    type: ErrorType;
    message: string;
    field?: string;
}

export function parseApiError(error: unknown): ParsedError {
    if (!(error instanceof AxiosError)) {
        return {
            type: "unknown_error",
            message: "Ocorreu um erro inesperado. Tente novamente.",
        };
    }

    const status = error.response?.status;
    const data = error.response?.data as any;
    const message = data?.message || "";

    if (message === "Validation error" && data?.issues) {
        const issues = data.issues as any;
        let firstErrorMessage = "";
        let firstErrorField = "";

        // A estrutura retornada é: { errors: [], properties: { fieldName: { errors: [...] } } }
        if (issues.properties) {
            for (const [field, fieldIssue] of Object.entries(
                issues.properties,
            )) {
                const fieldErrors = (fieldIssue as any)?.errors;
                if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                    const firstError = fieldErrors[0];
                    firstErrorMessage =
                        typeof firstError === "string"
                            ? firstError
                            : firstError?.message;
                    firstErrorField = field;
                    break;
                }
            }
        }

        if (firstErrorMessage) {
            if (
                firstErrorMessage.toLowerCase().includes("least 2 characters")
            ) {
                return {
                    type: "invalid_name",
                    message: "O nome deve ter no mínimo 2 caracteres.",
                    field: "name",
                };
            }

            if (
                firstErrorMessage.toLowerCase().includes("least 6 characters")
            ) {
                if (firstErrorField === "password") {
                    return {
                        type: "invalid_password",
                        message: "A senha deve ter no mínimo 6 caracteres.",
                        field: "password",
                    };
                }
            }

            if (firstErrorMessage.toLowerCase().includes("valid email")) {
                return {
                    type: "invalid_email",
                    message: "Por favor, insira um email válido.",
                    field: "email",
                };
            }

            if (firstErrorMessage.toLowerCase().includes("array of strings")) {
                return {
                    type: "invalid_times",
                    message: "Os horários devem ser um array de strings.",
                    field: "times",
                };
            }

            if (firstErrorMessage.toLowerCase().includes("least one horário")) {
                return {
                    type: "no_times_selected",
                    message: "Informe pelo menos um horário.",
                    field: "times",
                };
            }

            if (
                firstErrorMessage.toLowerCase().includes("inválido") &&
                firstErrorMessage.toLowerCase().includes("horário")
            ) {
                return {
                    type: "invalid_times",
                    message: firstErrorMessage,
                    field: "times",
                };
            }

            return {
                type: "validation_error",
                message: firstErrorMessage,
                field: firstErrorField,
            };
        }
    }

    if (status === 400 && message.toLowerCase().includes("already exists")) {
        return {
            type: "email_exists",
            message: "Este email já está cadastrado no sistema.",
            field: "email",
        };
    }

    if (
        message.toLowerCase().includes("email") &&
        message.toLowerCase().includes("inválido")
    ) {
        return {
            type: "invalid_email",
            message: "Por favor, insira um email válido.",
            field: "email",
        };
    }

    if (message.toLowerCase().includes("nome")) {
        return {
            type: "invalid_name",
            message: "O nome deve ter no mínimo 2 caracteres.",
            field: "name",
        };
    }

    if (message.toLowerCase().includes("senha")) {
        return {
            type: "invalid_password",
            message: "A senha deve ter no mínimo 6 caracteres.",
            field: "password",
        };
    }

    if (
        message.toLowerCase().includes("horário") &&
        message.toLowerCase().includes("inválido")
    ) {
        return {
            type: "invalid_times",
            message: "Um ou mais horários selecionados são inválidos.",
            field: "times",
        };
    }

    if (
        message.toLowerCase().includes("horário") &&
        message.toLowerCase().includes("informe")
    ) {
        return {
            type: "no_times_selected",
            message: "Selecione pelo menos um horário disponível.",
            field: "times",
        };
    }

    if (status === 400 || message.toLowerCase().includes("validação")) {
        return {
            type: "validation_error",
            message:
                message || "Verifique os dados informados e tente novamente.",
        };
    }

    return {
        type: "unknown_error",
        message: message || "Ocorreu um erro. Tente novamente.",
    };
}
