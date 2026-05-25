import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type ReportFormData } from '../types/reports/reports.types';
import { useMutation } from '@tanstack/react-query';
import { createReport } from '../api/report.api';
import { toast } from 'sonner';

// Esquema de validación (podría moverse a otro archivo)
const reportSchema = z.object({
    siteId: z.string().min(1, "El ID del sitio no puede ir vacío"),
    siteName: z.string().min(1, "El nombre del sitio no puede ir vacío"),
    incChg: z.string().min(1, "Este campo no puede ir vacío"),
    workDone: z.string().min(1, "Este campo no puede ir vacío"),
    workSummary: z.string().min(1, "Este campo no puede ir vacío").max(300, "El resumen no puede exceder 300 caracteres"),
});

function useReportForm() { 

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const form = useForm<ReportFormData>({
        resolver: zodResolver(reportSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            siteId: "",
            incChg: "",
            siteName: "",
            workDone: "",
            workSummary: "",
        },
    });

    const { mutateAsync } = useMutation({
        mutationFn: createReport,
        onSuccess: (data) => {
            toast.success(data)
        },
        onError(error){
            toast.error(error.message)
        }
    })

    const onSubmit = async (data: ReportFormData) => {
        setIsLoading(true)
        setError(null)

        await mutateAsync(data)

        form.reset()
        setIsLoading(false)
    }

    return {
        register: form.register,
        formState: form.formState,
        setValue: form.setValue,
        trigger: form.trigger,
        setError: form.setError,
        clearErrors: form.clearErrors,
        isLoading,
        error,
        onSubmit: form.handleSubmit(onSubmit)
    }
}

export default useReportForm