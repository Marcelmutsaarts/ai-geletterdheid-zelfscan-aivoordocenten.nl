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

const SelfScanFlow = ({
  currentIndex,
  scores,
  item,
  onSelect,
  onBack,
  onProceed,
  isLast,
  error
}: SelfScanFlowProps) => {
  const currentScore = scores[currentIndex];
  const answeredCount = scores.filter(score => score !== null).length;

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
        <h2 className="text-xl font-semibold text-ink mb-8">
          {item.statement}
        </h2>

        {/* Ja/Nee Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onSelect(1)}
            className={clsx(
              'flex-1 p-6 rounded-xl border-2 text-center transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              currentScore === 1
                ? 'border-green-500 bg-green-50 focus-visible:ring-green-500'
                : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50/50 focus-visible:ring-green-400'
            )}
          >
            <div className="text-3xl mb-2">&#10003;</div>
            <div className={clsx(
              'text-xl font-bold',
              currentScore === 1 ? 'text-green-600' : 'text-gray-700'
            )}>
              Ja
            </div>
          </button>

          <button
            onClick={() => onSelect(0)}
            className={clsx(
              'flex-1 p-6 rounded-xl border-2 text-center transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              currentScore === 0
                ? 'border-red-500 bg-red-50 focus-visible:ring-red-500'
                : 'border-gray-200 bg-white hover:border-red-400 hover:bg-red-50/50 focus-visible:ring-red-400'
            )}
          >
            <div className="text-3xl mb-2">&#10007;</div>
            <div className={clsx(
              'text-xl font-bold',
              currentScore === 0 ? 'text-red-600' : 'text-gray-700'
            )}>
              Nee
            </div>
          </button>
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

        {currentScore === null && (
          <span className="text-sm text-grayText">
            Kies Ja of Nee om door te gaan
          </span>
        )}

        <Button
          variant="primary"
          onClick={onProceed}
          disabled={currentScore === null}
        >
          {isLast ? 'Afronden' : 'Volgende'}
        </Button>
      </div>
    </div>
  );
};

export default SelfScanFlow;