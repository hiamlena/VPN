
import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-lg shadow-cyan-500/20"
    >
      Сгенерировать План Развертывания
    </button>
  );
};

export default GenerateButton;
