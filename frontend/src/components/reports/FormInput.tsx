import { type UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessage from '../../helpers/ErrorMessage'; // Ajusta tu ruta

interface FormInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'textarea';
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  register,
  placeholder,
  error,
  type = 'text',
  disabled = false
}) => {
  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <InputElement
        id={id}
        {...register}
        placeholder={placeholder}
        rows={type === 'textarea' ? 4 : undefined}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 ${error
            ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 bg-white hover:border-gray-400 focus:border-primary focus:ring-primary/20'
          }`}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};