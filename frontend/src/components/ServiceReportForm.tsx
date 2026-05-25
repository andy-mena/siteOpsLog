import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../helpers/ErrorMessage"

//Esquema de validación con ZOD
const reportSchema = z.object({
    siteId: z.string().min(1, "El ID del sitio no puede ir vacío"),
    siteName: z.string().min(1, "El nombre del sitio no puede ir vacío"),
    incChg: z.string().min(1, "Este campo no puede ir vacío"),
    workDone: z.string().min(1, "Este campo no puede ir vacío"),
    workSummary: z
        .string()
        .min(1, "Este campo no puede ir vacío")
        .max(300, "El resumen no puede exceder 300 caracteres"),
});

type FormData = z.infer<typeof reportSchema>;


// Lista de opciones para trabajo realizado
const trabajosOptions = [
    { value: 'sfp_indoor', label: 'Cambio de SFP INDOOR' },
    { value: 'sfp_outdoor', label: 'CAMBIO DE SFP OUTDOOR' },
    { value: 'fibra_50', label: 'CAMBIO DE FIBRA 50' },
    { value: 'fibra_70', label: 'CAMBIO DE FIBRA 70' },
    { value: 'fibra_100', label: 'CAMBIO DE FIBRA 100' },
    { value: 'patchcord', label: 'CAMBIO DE PATCHCORD' },
    { value: 'radio_4499', label: 'CAMBIO DE RADIO 4499' },
    { value: 'radio_4415', label: 'CAMBIO DE RADIO 4415' },
    { value: 'radio_2219_b5', label: 'CAMBIO DE RADIO 2219 B5' },
    { value: 'radio_2219_b28', label: 'CAMBIO DE RADIO 2219 B28' },
    { value: 'otro', label: 'Otro' },
];


function ServiceReportForm() {
    const [selectedTrabajo, setSelectedTrabajo] = useState('');
    const [otroText, setOtroText] = useState('');

    const {
        register,
        formState: { errors, isSubmitting },
        setValue,
        trigger,
        reset,
        handleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            siteId: "",
            incChg: "",
            siteName: "",
            workDone: "",
            workSummary: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Si seleccionó "Otro", usar el texto manual
        const finalTrabajoRealizado =
            selectedTrabajo === 'otro'
                ? otroText
                : trabajosOptions.find(t => t.value === selectedTrabajo)?.label || '';

        const submitData = {
            ...data,
            trabajoRealizado: finalTrabajoRealizado,
        };

        console.log('Datos del formulario:', submitData);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Resetear estados
        setSelectedTrabajo('');
        setOtroText('');
        reset();
    };

    const handleTrabajoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedTrabajo(value);

        if (value !== 'otro') {
            const selectedLabel = trabajosOptions.find(t => t.value === value)?.label || '';
            setValue('workDone', selectedLabel);
            trigger('workDone');
            setOtroText('');
        } else {
            setValue('workDone', '');
            trigger('workDone');
        }
    };

    const handleOtroTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOtroText(value);
        setValue('workDone', value);
        trigger('workDone');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 md:mb-5 flex flex-col items-center">
                    {/* Foto de perfil */}
                    <div className="relative ">
                        <img
                            src={
                                "https://ui-avatars.com/api/?background=6b7280&color=fff&bold=true&size=128&name=KB"
                            }
                            alt={`Foto de usuario`}
                            className="h-24 w-24 rounded-full  object-cover shadow-lg grayscale-0"
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        {/* Nombre del técnico */}
                        <h2 className="mt-3 text-xl font-semibold text-primary">
                            Kevin Bolaños
                        </h2>
                        {/* Rol del técnico */}
                        <p className="text-sm font-medium text-primary">Técnico</p>

                    </div>

                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* ID Sitio */}
                    <div>
                        <label className="mb-2 block text-lg text-gray text-center">
                            Registro de atención al sitio
                        </label>
                        <div className="flex flex-col">
                            <label htmlFor="siteId" className="text-gray-700">ID</label>
                            <input
                                id="siteId"
                                type="text"
                                {...register("siteId", {
                                    required: "El ID del sitio es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "El ID debe tener al menos 3 caracteres",
                                    },
                                })}
                                placeholder="Identificador del sitio"
                                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.siteId
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-primary focus:ring-primary"
                                    }`}
                            />
                            {errors.siteId && (
                                <ErrorMessage>{errors.siteId.message}</ErrorMessage>
                            )}
                        </div>
                    </div>

                    {/* Nombre del sitio */}
                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="siteName" className="text-gray-700">Nombre del sitio</label>
                            <input
                                id="siteName"
                                type="text"
                                {...register("siteName", {
                                    required: "El nombre del sitio es obligatorio",
                                })}
                                placeholder="Ej: 'Catarina'"
                                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.siteName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-primary focus:ring-primary"
                                    }`}
                            />
                            {errors.siteName && (
                                <ErrorMessage>{errors.siteName.message}</ErrorMessage>
                            )}
                        </div>
                    </div>

                    {/* INC/CHG */}
                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="incChg" className="text-gray-900">INC/CHG</label>
                            <input
                                id="incChg"
                                type="text"
                                {...register("incChg", {
                                    required: "INC/CHG es obligatorio",
                                    pattern: {
                                        value: /^[A-Z0-9-]+$/,
                                        message:
                                            "Formato inválido (solo mayúsculas, números y guiones)",
                                    },
                                })}
                                placeholder="INC/CHG"
                                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.incChg
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-primary focus:ring-primary"
                                    }`}
                            />
                            {errors.incChg && (
                                <ErrorMessage>{errors.incChg.message}</ErrorMessage>
                            )}

                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="workDone">Trabajo realizado</label>
                        <select
                            id="workDone"
                            value={selectedTrabajo}
                            onChange={handleTrabajoChange}
                            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.workDone
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-primary focus:ring-primary'
                                }`}
                        >
                            <option value="" style={{ color: '#8C94A0' }}>Seleccionar trabajo realizado</option>
                            {trabajosOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.workDone && (
                            <ErrorMessage>{errors.workDone.message}</ErrorMessage>
                        )}
                    </div>

                    {/* ✅ Campo "Otro" - se muestra solo cuando seleccionan Otro */}
                    {selectedTrabajo === 'otro' && (
                        <div className="animate-in fade-in duration-200">
                            <input
                                id="workDone"
                                type="text"
                                value={otroText}
                                onChange={handleOtroTextChange}
                                placeholder="Escribe el trabajo realizado..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Resumen del trabajo */}
                    <div>
                        <label htmlFor="workSummary" className="text-gray-700">Resumen del trabajo</label>
                        <textarea
                            {...register("workSummary", {
                                required: "El resumen del trabajo es obligatorio",
                                minLength: {
                                    value: 10,
                                    message: "El resumen debe tener al menos 10 caracteres",
                                },
                                maxLength: {
                                    value: 500,
                                    message: "El resumen no puede exceder 500 caracteres",
                                },
                            })}
                            placeholder="Resumen del trabajo"
                            rows={4}
                            id="workSummary"
                            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.workSummary
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-primary focus:ring-primary"
                                }`}
                        />
                        {errors.workSummary && (
                            <ErrorMessage>{errors.workSummary.message}</ErrorMessage>
                        )}
                    </div>

                    {/* Botón Agregar reporte */}
                    <div className="pt-4 md:pt-0">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-primary py-3 font-medium text-white hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSubmitting ? "Enviando..." : "Agregar reporte"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ServiceReportForm;
