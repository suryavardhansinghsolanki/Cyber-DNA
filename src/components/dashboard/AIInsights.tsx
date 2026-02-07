import React from 'react';
import { Brain, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { mockAIPredictions } from '@/data/mockData';

const AIInsights: React.FC = () => {
  const predictions = mockAIPredictions;

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'text-destructive';
    if (prob >= 40) return 'text-warning';
    return 'text-success';
  };

  const getProbabilityBg = (prob: number) => {
    if (prob >= 70) return 'bg-destructive';
    if (prob >= 40) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <CyberCard variant="glow" className="col-span-full lg:col-span-2">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent animate-pulse" />
            AI Threat Predictions
          </CyberCardTitle>
          <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono">
            ML Model v3.2
          </span>
        </div>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${getProbabilityColor(prediction.probability)}`} />
                    <h4 className="font-medium text-foreground">{prediction.threatType}</h4>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {prediction.timeframe}
                    </span>
                    <span>Confidence: {prediction.confidence}%</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {prediction.indicators.slice(0, 3).map((indicator, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Recommendation:</span>{' '}
                    {prediction.recommendation}
                  </p>
                </div>

                {/* Probability Gauge */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        className="stroke-muted"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        className={getProbabilityBg(prediction.probability)}
                        strokeWidth="3"
                        strokeDasharray={`${prediction.probability} ${100 - prediction.probability}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`font-orbitron text-sm font-bold ${getProbabilityColor(prediction.probability)}`}>
                        {prediction.probability}%
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Probability</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <CyberButton variant="outline" size="sm">
            <Brain className="h-4 w-4" />
            Run Full Analysis
          </CyberButton>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default AIInsights;
