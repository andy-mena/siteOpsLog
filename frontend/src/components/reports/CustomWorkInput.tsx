interface CustomWorkInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export const CustomWorkInput: React.FC<CustomWorkInputProps> = ({
  value,
  onChange,
  autoFocus = true,
}) => {
  return (
    <div className="animate-in fade-in duration-200">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Escribe el trabajo realizado..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        autoFocus={autoFocus}
      />
    </div>
  );
};