import { WORK_OPTIONS } from '../../types/constants/workDoneOptions.constants';
import ErrorMessage from '../../helpers/ErrorMessage';

interface WorkDoneSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  hasError?: boolean;
}

export const WorkDoneSelect: React.FC<WorkDoneSelectProps> = ({
  value,
  onChange,
  error,
  hasError,
}) => {
  return (
    // 1. Agregamos gap-1.5 para separar el label del select igual que en FormInput
    <div className="flex flex-col gap-1.5">
      
      <label htmlFor="workDone" className="text-sm font-semibold text-slate-700">
        Trabajo realizado
      </label>
      
      <select
        id="workDone"
        value={value}
        onChange={onChange}
        // 3. Agregamos py-2.5, text-sm y los mismos colores/transiciones
        className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          hasError
            ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 bg-white hover:border-gray-400 focus:border-primary focus:ring-primary/20'
        }`}
      >
        <option value="" className="text-gray-500">
          Seleccionar trabajo realizado
        </option>
        {WORK_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="text-slate-700">
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};