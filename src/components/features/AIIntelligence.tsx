import React, { useState } from 'react';
import { Brain, Zap, Target, TrendingUp, AlertTriangle, Shield, Cpu, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { mockAIPredictions } from '@/data/mockData';
import { cn } from '@/lib/utils';

const AIIntelligence: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelStats] = useState({
    accuracy: 94.7,
    threatsPredicted: 156,
    falsePositives: 3,
    modelVersion: '3.2.1',
  });

  const predictions = mockAIPredictions;

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const getProbabilityGradient = (prob: number) => {
    if (prob >= 70) return 'from-destructive to-warning';
    if (prob >= 40) return 'from-warning to-primary';
    return 'from-success to-primary';
  };

  return (
    <div className="space-y-6">
      {/* AI Status Hero */}
      <CyberCard variant="holographic" className="relative overflow-hidden">
        {isAnalyzing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
        )}
        
        <CyberCardContent className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* AI Brain Visualization */}
            <div className="relative">
              <div className={cn(
                "w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500",
                isAnalyzing 
                  ? "bg-accent/20 shadow-[0_0_60px_hsl(270_100%_65%/0.4)]"
                  : "bg-primary/10"
              )}>
                <Brain className={cn(
                  "h-20 w-20 transition-all duration-500",
                  isAnalyzing ? "text-accent animate-pulse" : "text-primary"
                )} />
              </div>
              {isAnalyzing && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping" />
                  <div className="absolute -inset-4 rounded-full border border-accent/30 animate-spin" style={{ animationDuration: '3s' }} />
                </>
              )}

              {/* Neural Network Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const x1 = 80 + Math.cos(angle) * 30;
                  const y1 = 80 + Math.sin(angle) * 30;
                  const x2 = 80 + Math.cos(angle) * 70;
                  const y2 = 80 + Math.sin(angle) * 70;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      className="stroke-primary/30"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="8"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}
              </svg>
            </div>

            {/* Status Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-sm text-accent font-mono">AI Engine v{modelStats.modelVersion}</span>
              </div>
              <h2 className="font-orbitron text-3xl font-bold mb-2">
                Threat Intelligence AI
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg">
                Our neural network continuously analyzes global threat patterns, your behavior 
                profiles, and real-time security feeds to predict and prevent attacks before 
                they happen.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                <div className="text-center">
                  <p className="font-orbitron text-2xl font-bold text-success">{modelStats.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="font-orbitron text-2xl font-bold text-primary">{modelStats.threatsPredicted}</p>
                  <p className="text-xs text-muted-foreground">Predicted</p>
                </div>
                <div className="text-center">
                  <p className="font-orbitron text-2xl font-bold text-destructive">{modelStats.falsePositives}</p>
                  <p className="text-xs text-muted-foreground">False Positives</p>
                </div>
              </div>

              <CyberButton
                variant="cyber"
                size="lg"
                onClick={startAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Analyzing Threat Landscape...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Run Deep Analysis
                  </>
                )}
              </CyberButton>
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <CyberCard
            key={prediction.id}
            variant={prediction.probability >= 70 ? 'danger' : prediction.probability >= 40 ? 'warning' : 'default'}
            className="relative overflow-hidden"
          >
            {/* Probability Bar */}
            <div className={cn(
              "absolute top-0 left-0 h-1 bg-gradient-to-r",
              getProbabilityGradient(prediction.probability)
            )} style={{ width: `${prediction.probability}%` }} />

            <CyberCardHeader>
              <div className="flex items-start justify-between">
                <CyberCardTitle className="text-base">
                  {prediction.threatType}
                </CyberCardTitle>
                <div className={cn(
                  "font-orbitron text-xl font-bold",
                  prediction.probability >= 70 ? "text-destructive" :
                  prediction.probability >= 40 ? "text-warning" : "text-success"
                )}>
                  {prediction.probability}%
                </div>
              </div>
            </CyberCardHeader>

            <CyberCardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>{prediction.timeframe}</span>
                </div>

                {/* Indicators */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Key Indicators</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.indicators.map((indicator, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full bg-muted text-xs"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Recommendation</p>
                  <p className="text-sm">{prediction.recommendation}</p>
                </div>

                {/* Confidence */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Model Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="font-mono">{prediction.confidence}%</span>
                  </div>
                </div>
              </div>
            </CyberCardContent>
          </CyberCard>
        ))}
      </div>

      {/* AI Capabilities */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-accent" />
            AI Capabilities
          </CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                label: 'Threat Pattern Recognition',
                description: 'Identifies attack patterns from global threat intelligence',
                status: 'Active',
              },
              {
                icon: Activity,
                label: 'Behavioral Analysis',
                description: 'Monitors user behavior for anomaly detection',
                status: 'Active',
              },
              {
                icon: Target,
                label: 'Predictive Modeling',
                description: 'Forecasts potential attacks before they occur',
                status: 'Active',
              },
              {
                icon: Brain,
                label: 'Self-Learning',
                description: 'Continuously improves from new threat data',
                status: 'Learning',
              },
            ].map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.label}
                  className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:border-primary/30 transition-all"
                >
                  <Icon className="h-8 w-8 text-accent mb-3" />
                  <h4 className="font-medium mb-1">{capability.label}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{capability.description}</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    capability.status === 'Active' 
                      ? "bg-success/20 text-success" 
                      : "bg-accent/20 text-accent"
                  )}>
                    {capability.status}
                  </span>
                </div>
              );
            })}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default AIIntelligence;
