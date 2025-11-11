import React from 'react';
import { useSport } from '../context/SportContext';
import { SportType } from '../types';

const SportSelector: React.FC = () => {
  const { setSport } = useSport();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-5xl font-bold text-highlight mb-4">Sportify</h1>
      <h2 className="text-2xl text-text-primary mb-12">관심있는 스포츠를 선택하세요</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div 
          onClick={() => setSport(SportType.SOCCER)}
          className="flex flex-col items-center justify-center w-64 h-64 bg-secondary rounded-lg shadow-xl cursor-pointer transition-transform transform hover:scale-105"
        >
          <span className="text-6xl mb-4" role="img" aria-label="축구">⚽</span>
          <span className="text-3xl font-bold text-text-primary">축구</span>
        </div>
        <div 
          onClick={() => setSport(SportType.BASEBALL)}
          className="flex flex-col items-center justify-center w-64 h-64 bg-secondary rounded-lg shadow-xl cursor-pointer transition-transform transform hover:scale-105"
        >
          <span className="text-6xl mb-4" role="img" aria-label="야구">⚾</span>
          <span className="text-3xl font-bold text-text-primary">야구</span>
        </div>
      </div>
    </div>
  );
};

export default SportSelector;