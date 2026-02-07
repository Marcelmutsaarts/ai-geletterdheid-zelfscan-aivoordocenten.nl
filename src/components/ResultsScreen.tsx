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
  recommendation: 'niet-basis' | 'basis';
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
  const isBasis = recommendation === 'basis';

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-lightPurpleBg rounded-2xl px-10 py-6">
          <span className="text-5xl font-bold text-primaryPurple">{totalScore}</span>
          <span className="text-2xl text-grayText">/{feedback.length}</span>
          <div className="text-sm text-grayText mt-2">stellingen met 'Ja'</div>
        </div>
      </div>

      {/* Niveau Badge */}
      <div className="text-center mb-8">
        <span className={`inline-block px-6 py-3 text-xl font-bold rounded-full ${
          isBasis
            ? 'bg-green-100 text-green-700 border-2 border-green-300'
            : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
        }`}>
          {isBasis ? 'Basisniveau bereikt' : 'Nog niet op basisniveau'}
        </span>
      </div>

      {/* Resultaat Card */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        {isBasis ? (
          <>
            <h2 className="text-2xl font-bold text-ink mb-4 text-center">
              Goed bezig!
            </h2>
            <p className="text-grayText text-center">
              Je hebt een goede basiskennis van AI in het onderwijs. Je begrijpt
              hoe generatieve AI werkt, kent de risico's en weet hoe je AI kunt
              inzetten in je onderwijspraktijk. Blijf je kennis bijhouden en
              experimenteer met nieuwe mogelijkheden om AI effectief te
              blijven gebruiken.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-ink mb-4 text-center">
              Er valt nog veel te leren
            </h2>
            <p className="text-grayText text-center">
              Je hebt nog stappen te zetten om het basisniveau van
              AI-geletterdheid te bereiken. Dat is niet erg — de meeste docenten
              staan hier. Door je kennis van AI-principes, verantwoord gebruik
              en praktische toepassingen te verdiepen, kun je AI effectiever en
              veiliger inzetten in je onderwijs.
            </p>
          </>
        )}
      </div>

      {/* Overzicht per thema */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        <h3 className="text-lg font-bold text-ink mb-4">Je antwoorden per thema</h3>
        <div className="space-y-3">
          {feedback.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3">
              <span className="text-sm text-grayText flex-1">{item.feedback}</span>
              <span className={`text-sm font-semibold whitespace-nowrap ${
                item.score === 1 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {item.displayLabel}
              </span>
            </div>
          ))}
        </div>
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
