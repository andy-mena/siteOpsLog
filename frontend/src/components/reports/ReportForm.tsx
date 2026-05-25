import React, { useEffect, useState } from 'react';
import useReportForm from '../../hooks/useReportForm';
import { useWorkDoneLogic } from '../../hooks/useWorkDoneLogic';
import { FormInput } from './FormInput';
import { WorkDoneSelect } from './WorkDoneSelect';
import { CustomWorkInput } from './CustomWorkInput';
import useGetSite from '../../hooks/useGetSite';
import Spinner from '../ui/Spinner';

export const ReportForm: React.FC = () => {
    const [searchSiteId, setSearchSiteId] = useState<string>("");

    const {
        register,
        formState: { errors },
        setValue,
        trigger,
        setError,
        clearErrors,
        isLoading,
        error: submitError,
        onSubmit,
    } = useReportForm();

    const {
        selectedWork,
        customWorkText,
        handleWorkChange,
        handleCustomTextChange,
        showCustomInput,
    } = useWorkDoneLogic(setValue, trigger);

    const {
        data: siteInfo,
        isLoading: isLoadingSite,
        isError: errorGetSite,
    } = useGetSite(searchSiteId);

    useEffect(() => {
        if (!searchSiteId) {
            setValue("siteName", "", { shouldValidate: false });
        } else if (siteInfo?.name) {
            setValue("siteName", siteInfo.name, {
                shouldValidate: true,
                shouldDirty: true
            });
        } // Escenario 3: 🚨 Terminó de buscar y NO existe
        else if (!isLoadingSite && errorGetSite) {
            setValue("siteName", ""); // Vaciamos el nombre
            // Forzamos el error en ambos campos para que se pinten de rojo
            setError("siteId", {
                type: "manual",
                message: "ID no encontrado"
            });
            setError("siteName", {
                type: "manual",
                message: "Sitio no existe"
            });
        }
    }, [siteInfo, searchSiteId, isLoadingSite, errorGetSite, setValue, setError, clearErrors]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8 flex items-start justify-center">
            {/* Card Principal: Mismos estilos que la tabla */}
            <div className="w-full max-w-2xl md:max-w-3xl bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">

                {/* Header del Técnico con línea separadora */}
                <div className="mb-8 flex flex-col items-center border-b border-gray-100 pb-8">
                    <div className="relative">
                        <img
                            src="https://ui-avatars.com/api/?background=6b7280&color=fff&bold=true&size=128&name=KB"
                            alt="Foto de usuario"
                            className="h-20 w-20 rounded-full object-cover shadow-sm ring-4 ring-gray-50"
                        />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <h2 className="text-xl font-bold text-slate-800">
                            Kevin Bolaños
                        </h2>
                        <span className="mt-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                            Técnico de Operaciones
                        </span>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">

                    {/* Fila 1: Sitio y Nombre (Grid 2 columnas en desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            id="siteId"
                            label="ID del Sitio"
                            register={register('siteId', {
                                onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                                    setSearchSiteId(e.target.value.trim());
                                }
                            })}
                            placeholder="Ej: 410006"
                            error={errors.siteId?.message}
                        />

                        {/* Contenedor relativo para posicionar el spinner del input */}
                        <div className="relative">
                            <FormInput
                                id="siteName"
                                label="Nombre del Sitio"
                                register={register('siteName')}
                                placeholder="Se autocompleta..."
                                disabled={true}
                                error={errors.siteName?.message}
                            />
                            {isLoadingSite && (
                                <div className="absolute right-3 top-9">
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fila 2: Ticket y Trabajo Realizado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-center">
                        <FormInput
                            id="incChg"
                            label="Ticket (INC/CHG)"
                            register={register('incChg')}
                            placeholder="Ej: INC123456"
                            error={errors.incChg?.message}
                        />

                        <WorkDoneSelect
                            value={selectedWork}
                            onChange={handleWorkChange}
                            error={errors.workDone?.message}
                            hasError={!!errors.workDone}
                        />
                    </div>

                    {/* Fila Opcional: Trabajo Personalizado (Ocupa todo el ancho) */}
                    {showCustomInput && (
                        <div className="animate-fade-in">
                            <CustomWorkInput
                                value={customWorkText}
                                onChange={handleCustomTextChange}
                            />
                        </div>
                    )}

                    {/* Fila 3: Resumen (Ocupa todo el ancho) */}
                    <FormInput
                        id="workSummary"
                        label="Resumen del Trabajo"
                        register={register('workSummary')}
                        placeholder="Describe brevemente las acciones realizadas (Max. 300 caracteres)"
                        error={errors.workSummary?.message}
                        type="textarea"
                    />

                    {/* Mensaje de Error General */}
                    {submitError && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {submitError}
                        </div>
                    )}

                    {/* Botón de Submit Integrado */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-white shadow-sm hover:bg-secondary hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                </>
                            ) : (
                                "Confirmar y Agregar Reporte"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};