import React from 'react';
import clsx from 'clsx';
import ProgressBar from './ProgressBar';
import Button from './Button';
import { SelfScanItem } from '../data/selfScan';

interface SelfScanFlowProps {
  currentIndex: number;
  scores: (number | null)[];
  item: SelfScanItem;
  onSelect: (rating: number) => void;
  onBack: () => void;
  onProceed: () => void;
  isLast: boolean;
  error: string | null;
}

const SelfScanFlow: React.FC<SelfScanFlowProps> = ({
  currentIndex,
  scores,
  item,
  onSelect,
  onBack,
  onProceed,
  isLast,
  error
}) => {
  const currentScore = scores[currentIndex];
  const answeredCount = scores.filter(score => score !== null).length;

  const ratingOptions = [
    { value: 1, label: 'Beginner', description: 'Ik heb hier nog weinig ervaring mee' },
    { value: 2, label: 'Redelijk', description: 'Ik heb enige kennis en ervaring' },
    { value: 3, label: 'Sterk', description: 'Ik beheers dit goed' }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar current={answeredCount} total={scores.length} />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Question Card */}
      <div className="glass-card rounded-2xl p-8 mb-6">
        {/* Theme Badge */}
        <div className="inline-block mb-4">
          <span className="px-3 py-1 bg-lightPurpleBg text-primaryPurple text-xs font-semibold rounded-full">
            Thema {item.id}: {item.theme}
          </span>
        </div>

        {/* Statement */}
        <h2 className="text-xl font-semibold text-ink mb-6">
          {item.statement}
        </h2>

        {/* Rating Options */}
        <div className="space-y-3">
          {ratingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={clsx(
                'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                'hover:border-primaryPurple hover:bg-lightPurpleBg/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryPurple focus-visible:ring-offset-2',
                currentScore === option.value
                  ? 'border-primaryPurple bg-lightPurpleBg'
                  : 'border-gray-200 bg-white'
              )}
            >
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primaryPurple mr-3">
                  {option.value}
                </span>
                <div>
                  <div className="font-semibold text-ink">
                    {option.label}
                  </div>
                  <div className="text-sm text-grayText mt-1">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentIndex === 0}
        >
          Vorige
        </Button>

        {!currentScore && (
          <span className="text-sm text-grayText">
            Kies een optie om door te gaan
          </span>
        )}

        <Button
          variant="primary"
          onClick={onProceed}
          disabled={!currentScore}
        >
          {isLast ? 'Afronden' : 'Volgende'}
        </Button>
      </div>
    </div>
  );
};

export default SelfScanFlow;