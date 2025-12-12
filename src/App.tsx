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
      const answer = selfScanScores[index];
      const isYes = answer === 1;
      const label = isYes ? 'Ja' : 'Nee';

      return {
        id: item.id,
        title: `Thema ${item.id} - ${item.theme}`,
        score: answer as number, // 0 = Nee, 1 = Ja
        feedback: item.statement,
        displayLabel: label
      };
    });

    // Calculate total score (number of Ja's)
    const yesCount = selfScanScores.filter(score => score === 1).length;

    // Determine recommendation: 6+ Ja = Gevorderd, 0-5 Ja = Beginner
    const recommendation = yesCount >= 6 ? 'advanced' : 'webinar';

    setFeedback(feedbackData);
    setResultSummary({
      totalScore: yesCount,
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
              </div>

              {/* Welcome Card */}
              <div className="glass-card rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-ink mb-4">
                  Hoe AI-geletterd ben jij?
                </h2>
                <p className="text-grayText mb-6">
                  Beantwoord 8 korte vragen over AI in het onderwijs en ontdek of je een
                  beginner of gevorderde bent. Op basis van je resultaat krijg je direct
                  een passend vervolgadvies: de webinar-serie of maatwerk scholing.
                </p>
                <div className="space-y-4 text-left mb-6">
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">&#10003;</span>
                    <span className="text-grayText">8 vragen, klaar in 2 minuten</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">&#10003;</span>
                    <span className="text-grayText">Ontdek je niveau: beginner of gevorderd</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primaryPurple mr-2">&#10003;</span>
                    <span className="text-grayText">Direct een passend vervolgadvies</span>
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