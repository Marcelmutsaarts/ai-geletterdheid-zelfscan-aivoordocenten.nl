import Button from './Button';

export interface QuestionFeedback {
  id: number;
  title: string;
  score: number;
  feedback: string;
  displayLabel?: string;
}

interface ResultsScreenProps {
  totalScore: number;
  recommendation: 'webinar' | 'advanced';
  feedback: QuestionFeedback[];
  mode?: string;
  onRestart: () => void;
}

const ResultsScreen = ({
  totalScore,
  recommendation,
  feedback,
  onRestart
}: ResultsScreenProps) => {
  const isGevorderd = recommendation === 'advanced';

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-lightPurpleBg rounded-2xl px-10 py-6">
          <span className="text-5xl font-bold text-primaryPurple">{totalScore}</span>
          <span className="text-2xl text-grayText">/{feedback.length}</span>
          <div className="text-sm text-grayText mt-2">thema's met 'Ja'</div>
        </div>
      </div>

      {/* Niveau Badge */}
      <div className="text-center mb-8">
        <span className={`inline-block px-6 py-3 text-xl font-bold rounded-full ${
          isGevorderd
            ? 'bg-green-100 text-green-700 border-2 border-green-300'
            : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
        }`}>
          {isGevorderd ? 'Gevorderd' : 'Beginner'}
        </span>
      </div>

      {/* Vervolgstap Card */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        {isGevorderd ? (
          <>
            <h2 className="text-2xl font-bold text-ink mb-4 text-center">
              Maatwerk vervolgscholing
            </h2>
            <p className="text-grayText text-center mb-6">
              Je hebt een stevige basis in AI voor het onderwijs.
              Geef bij je eigen organisatie aan welke ontwikkelwensen je nog hebt,
              zodat we maatwerk vervolgscholing kunnen aanbieden.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-ink mb-4 text-center">
              Start met de webinar-serie
            </h2>
            <p className="text-grayText text-center mb-6">
              De webinar-serie AI in het onderwijs geeft je een stevige basis
              om aan de slag te gaan met AI in jouw onderwijspraktijk.
            </p>
            <div className="flex justify-center">
              <Button
                as="a"
                variant="primary"
                href="https://aivoordocenten.nl/webinarserie-ai-in-het-onderwijs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Naar de webinar-serie
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Opnieuw beginnen */}
      <div className="flex justify-center">
        <Button variant="ghost" onClick={onRestart}>
          Opnieuw beginnen
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
