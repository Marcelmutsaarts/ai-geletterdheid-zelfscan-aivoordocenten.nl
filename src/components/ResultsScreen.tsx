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
  const isAdvanced = recommendation === 'advanced';

  // Map scores to colors (0 = Nee/rood, 1 = Ja/groen)
  const mapScoreToColor = (score: number) => {
    return score === 1 ? '#4ade80' : '#f87171'; // green-400 for Ja, red-400 for Nee
  };

  // Spider Chart Component
  const SpiderChart = () => {
    const centerX = 130;
    const centerY = 130;
    const radius = 100;
    const numPoints = feedback.length;

    // Map scores to radius (0 = Nee at 50%, 1 = Ja at 100%)
    const mapScoreToRadius = (score: number) => {
      return score === 1 ? 1.0 : 0.5; // Ja = full radius, Nee = half radius
    };

    // Calculate points for the polygon
    const points = feedback.map((item, index) => {
      const angle = (index * 2 * Math.PI) / numPoints - Math.PI / 2;
      const scoreMultiplier = mapScoreToRadius(item.score);
      const scoreRadius = radius * scoreMultiplier;
      return {
        x: centerX + scoreRadius * Math.cos(angle),
        y: centerY + scoreRadius * Math.sin(angle),
        score: item.score,
        color: mapScoreToColor(item.score)
      };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    // Calculate label positions
    const labels = feedback.map((_item, index) => {
      const angle = (index * 2 * Math.PI) / numPoints - Math.PI / 2;
      const labelRadius = radius + 20;
      return {
        x: centerX + labelRadius * Math.cos(angle),
        y: centerY + labelRadius * Math.sin(angle),
        text: (index + 1).toString()
      };
    });

    return (
      <svg width="260" height="260" className="mx-auto">
        {/* Circular grid lines for Nee/Ja levels */}
        {[{scale: 0.5, color: '#f87171', label: 'Nee'},
          {scale: 1, color: '#4ade80', label: 'Ja'}].map((level) => (
          <circle
            key={level.scale}
            cx={centerX}
            cy={centerY}
            r={radius * level.scale}
            fill="none"
            stroke={level.color}
            strokeWidth="1.5"
            strokeDasharray="3 6"
            opacity="0.4"
          />
        ))}

        {/* Level indicators */}
        <text x={centerX + radius * 0.5 + 5} y={centerY - 5} fontSize="10" fill="#f87171" fontWeight="600">Nee</text>
        <text x={centerX + radius * 1.0 + 5} y={centerY - 5} fontSize="10" fill="#4ade80" fontWeight="600">Ja</text>

        {/* Radial lines */}
        {feedback.map((_, index) => {
          const angle = (index * 2 * Math.PI) / numPoints - Math.PI / 2;
          const endX = centerX + radius * Math.cos(angle);
          const endY = centerY + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Score polygon with gradient */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <polygon
          points={polygonPoints}
          fill="url(#scoreGradient)"
          stroke="none"
        />

        {/* Connect points with colored lines */}
        {points.map((point, index) => {
          const nextPoint = points[(index + 1) % points.length];
          // Use mixed color if both points have same score, otherwise neutral
          const bothYes = point.score === 1 && nextPoint.score === 1;
          const bothNo = point.score === 0 && nextPoint.score === 0;
          const lineColor = bothYes ? '#4ade80' : bothNo ? '#f87171' : '#a78bfa';
          return (
            <line
              key={`line-${index}`}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke={lineColor}
              strokeWidth="2.5"
              opacity="0.8"
            />
          );
        })}

        {/* Score points - colored circles at each vertex */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill={point.color}
              stroke="white"
              strokeWidth="2.5"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill="white"
              opacity="0.5"
            />
          </g>
        ))}

        {/* Labels */}
        {labels.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="600"
            fill="#7947ba"
          >
            {label.text}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-ink mb-4">
          {isAdvanced ? 'Sterke AI-geletterdheid!' : 'Op weg naar AI-geletterdheid!'}
        </h1>
        <p className="text-lg text-grayText max-w-2xl mx-auto">
          {isAdvanced
            ? 'Je hebt bij 5 of meer thema\'s \'Ja\' geantwoord. Dit wijst op een solide basis in AI voor het onderwijs.'
            : 'Je hebt bij 0-4 thema\'s \'Ja\' geantwoord. Er is nog ruimte voor groei in je AI-geletterdheid.'}
        </p>
      </div>

      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-lightPurpleBg rounded-2xl px-8 py-4">
          <span className="text-3xl font-bold text-primaryPurple">{totalScore}</span>
          <span className="text-xl text-grayText">/{feedback.length}</span>
          <div className="text-sm text-grayText mt-1">thema's met 'Ja'</div>
        </div>
      </div>

      {/* Spider Chart */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-ink mb-4 text-center">Je scores visueel</h2>
        <SpiderChart />

        {/* Score levels explanation */}
        <div className="flex justify-center gap-8 mt-6 mb-4 text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-400 mr-2 border-2 border-white shadow-sm"></div>
            <span className="text-grayText font-medium">Ja</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-red-400 mr-2 border-2 border-white shadow-sm"></div>
            <span className="text-grayText font-medium">Nee</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 border-t pt-4">
          <h3 className="text-xs font-semibold text-grayText uppercase tracking-wider mb-2">Thema's</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {feedback.map((item) => {
              const scoreColor = mapScoreToColor(item.score);
              return (
                <div key={item.id} className="flex items-center">
                  <span
                    className="font-bold mr-2 text-base"
                    style={{ color: scoreColor }}
                  >
                    {item.id}
                  </span>
                  <span className="text-grayText truncate">{item.title.replace(`Thema ${item.id} - `, '')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-center mb-8">
        <Button variant="primary" onClick={onRestart}>
          Opnieuw beginnen
        </Button>
      </div>

      {/* Detailed Feedback Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink mb-4">Overzicht per thema</h2>
        {feedback.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                item.score === 1
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {item.displayLabel}
              </span>
            </div>
            <p className="text-grayText">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;