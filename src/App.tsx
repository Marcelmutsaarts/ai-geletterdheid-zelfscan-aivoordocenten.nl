import { useState } from 'react';
import Button from './components/Button';
import SelfScanFlow from './components/SelfScanFlow';
import ResultsScreen, { QuestionFeedback } from './components/ResultsScreen';
import { selfScanItems } from './data/selfScan';

type Stage = 'welcome' | 'selfscan' | 'results';

interface ResultSummary {
  totalScore: number;
  recommendation: 'webinar' | 'advanced';
  mode: 'selfscan';
}

function App() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selfScanScores, setSelfScanScores] = useState<(number | null)[]>(
    new Array(selfScanItems.length).fill(null)
  );
  const [feedback, setFeedback] = useState<QuestionFeedback[]>([]);
  const [resultSummary, setResultSummary] = useState<ResultSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartSelfScan = () => {
    setStage('selfscan');
    setCurrentIndex(0);
    setSelfScanScores(new Array(selfScanItems.length).fill(null));
    setError(null);
  };

  const handleSelectRating = (rating: number) => {
    const newScores = [...selfScanScores];
    newScores[currentIndex] = rating;
    setSelfScanScores(newScores);
    setError(null);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setError(null);
    }
  };

  const handleProceed = () => {
    if (selfScanScores[currentIndex] === null) {
      setError('Selecteer eerst een optie voordat je doorgaat');
      return;
    }

    if (currentIndex < selfScanItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setError(null);
    } else {
      // Submit self scan
      submitSelfScan();
    }
  };

  const submitSelfScan = () => {
    // Check if all items are answered
    const allAnswered = selfScanScores.every(score => score !== null);
    if (!allAnswered) {
      setError('Beantwoord alle vragen voordat je de zelfscan afrondt');
      return;
    }

    // Generate feedback
    const feedbackData: QuestionFeedback[] = selfScanItems.map((item, index) => {
      const rating = selfScanScores[index] || 1;
      const labelMap = {
        1: 'Beginner',
        2: 'Redelijk',
        3: 'Sterk'
      };
      const label = labelMap[rating as keyof typeof labelMap];

      return {
        id: item.id,
        title: `Thema ${item.id} - ${item.theme}`,
        score: rating, // Keep original 1-3 scale for better visualization
        feedback: `${item.statement} ${label} (gekozen: ${rating}/3)`,
        displayLabel: `Inschaling: ${label} (${rating}/3)`
      };
    });

    // Calculate total score (number of 3's)
    const goodCount = selfScanScores.filter(score => score === 3).length;

    // Determine recommendation
    const recommendation = goodCount >= 5 ? 'advanced' : 'webinar';

    setFeedback(feedbackData);
    setResultSummary({
      totalScore: goodCount,
      recommendation,
      mode: 'selfscan'
    });
    setStage('results');
  };

  const handleRestart = () => {
    setStage('welcome');
    setCurrentIndex(0);
    setSelfScanScores(new Array(selfScanItems.length).fill(null));
    setFeedback([]);
    setResultSummary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="dotted-pattern fixed inset-0 opacity-20" />

      <div className="relative z-10">
        {stage === 'welcome' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full">
              {/* Logo/Brand */}
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-primaryPurple text-white rounded-lg font-semibold mb-4">
                  AI voor Docenten
                </div>
                <h1 className="text-5xl font-bold text-ink mb-4">
                  AI-geletterdheid zelfscan
                </h1>
                <p className="text-xl text-grayText">
                  8 thema's. Direct een advies.
                </p>
              </div>

              {/* Welcome Card */}
              <div className="glass-card rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-ink mb-4">
                  Ontdek jouw AI-vaardigheden
                </h2>
                <p className="text-grayText mb-6">
                  Deze zelfscan helpt je inzicht te krijgen in je huidige kennis en vaardigheden
                  op het gebied van AI in het onderwijs. Je beoordeelt jezelf op 8 belangrijke
                  thema's en krijgt direct een persoonlijk leeradvies.
                </p>
                <div className="space-y-4 text-left mb-6">
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">✓</span>
                    <span className="text-grayText">Duurt ongeveer 5 minuten</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">✓</span>
                    <span className="text-grayText">8 thema's over AI in onderwijs</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">✓</span>
                    <span className="text-grayText">Direct persoonlijk leeradvies</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={handleStartSelfScan}
                  className="w-full sm:w-auto"
                >
                  Start zelfscan
                </Button>
              </div>
            </div>
          </div>
        )}

        {stage === 'selfscan' && (
          <div className="min-h-screen py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-ink">AI-geletterdheid zelfscan</h1>
            </div>
            <SelfScanFlow
              currentIndex={currentIndex}
              scores={selfScanScores}
              item={selfScanItems[currentIndex]}
              onSelect={handleSelectRating}
              onBack={handleBack}
              onProceed={handleProceed}
              isLast={currentIndex === selfScanItems.length - 1}
              error={error}
            />
          </div>
        )}

        {stage === 'results' && resultSummary && (
          <div className="min-h-screen py-12">
            <ResultsScreen
              totalScore={resultSummary.totalScore}
              recommendation={resultSummary.recommendation}
              feedback={feedback}
              mode={resultSummary.mode}
              onRestart={handleRestart}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;