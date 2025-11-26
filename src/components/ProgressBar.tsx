import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-grayText">Voortgang</span>
        <span className="text-sm font-medium text-primaryPurple">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-lightPurpleBg rounded-full overflow-hidden">
        <div
          className="h-full bg-primaryPurple transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-grayText text-center">
        {current} van {total} thema's beoordeeld
      </div>
    </div>
  );
};

export default ProgressBar;