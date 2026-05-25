import { useState } from 'react';
import { SiWaze } from "react-icons/si";
import { MdContentCopy, MdCheck } from "react-icons/md";

interface WazeActionProps {
  link: string;
}

export const WazeActionCell: React.FC<WazeActionProps> = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Usamos la API nativa del navegador para copiar al portapapeles
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      
      // Regresamos el ícono a la normalidad después de 2 segundos
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Botón para abrir Waze */}
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        title="Abrir en Waze"
        className="flex items-center justify-center rounded-md bg-blue-50 p-1.5 text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-600"
      >
        <SiWaze className="text-lg" />
      </a>

      {/* Botón para copiar */}
      <button 
        onClick={handleCopy}
        title="Copiar enlace"
        className={`flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer ${
          isCopied 
            ? "bg-green-50 text-green-600" 
            : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        {isCopied ? <MdCheck className="text-lg" /> : <MdContentCopy className="text-lg" />}
      </button>
    </div>
  );
};