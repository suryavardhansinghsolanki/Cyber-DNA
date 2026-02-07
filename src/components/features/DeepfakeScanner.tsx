import React, { useState, useCallback } from 'react';
import { ScanFace, Upload, AlertTriangle, CheckCircle, XCircle, Play, Image, Music, FileVideo, Loader2 } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';
import { mockDeepfakeScans } from '@/data/mockData';
import type { DeepfakeScanResult } from '@/types/sentinel';

const DeepfakeScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentScan, setCurrentScan] = useState<DeepfakeScanResult | null>(null);
  const [scanHistory] = useState(mockDeepfakeScans);

  const startScan = useCallback(() => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setCurrentScan(mockDeepfakeScans[0]);
      setIsScanning(false);
    }, 3000);
  }, []);

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return FileVideo;
      case 'audio': return Music;
      default: return Image;
    }
  };

  const getAnalysisColor = (value: number, inverse = false) => {
    const score = inverse ? 100 - value : value;
    if (score >= 80) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <CyberCard variant="glow">
        <CyberCardHeader>
          <CyberCardTitle className="flex items-center gap-2">
            <ScanFace className="h-5 w-5 text-secondary" />
            Deepfake Detection Scanner
          </CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="flex flex-col items-center">
            {/* Drop Zone */}
            <div
              className={cn(
                "w-full max-w-lg p-12 rounded-xl border-2 border-dashed transition-all duration-300 text-center",
                isScanning
                  ? "border-secondary bg-secondary/10 animate-pulse"
                  : "border-border/50 hover:border-secondary/50 hover:bg-secondary/5"
              )}
            >
              {isScanning ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 text-secondary animate-spin" />
                  <div>
                    <p className="font-orbitron text-lg font-semibold">Analyzing Media...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Running AI detection algorithms
                    </p>
                  </div>
                  <div className="w-full max-w-xs h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-secondary animate-[shimmer_1s_linear_infinite] bg-[length:200%_100%]" style={{ width: '60%' }} />
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-orbitron text-lg font-semibold mb-2">
                    Drop Media to Scan
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload images, videos, or audio files to detect AI-generated content
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded bg-muted text-xs">.jpg</span>
                    <span className="px-2 py-1 rounded bg-muted text-xs">.png</span>
                    <span className="px-2 py-1 rounded bg-muted text-xs">.mp4</span>
                    <span className="px-2 py-1 rounded bg-muted text-xs">.mp3</span>
                  </div>
                  <CyberButton variant="secondary" onClick={startScan}>
                    <Upload className="h-4 w-4" />
                    Select File
                  </CyberButton>
                </>
              )}
            </div>

            {/* URL Input */}
            <div className="w-full max-w-lg mt-6">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Or scan from URL
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  className="flex-1 h-10 rounded-lg border border-border/50 bg-muted/50 px-4 text-sm placeholder:text-muted-foreground focus:border-secondary/50 focus:outline-none focus:ring-1 focus:ring-secondary/50"
                />
                <CyberButton variant="secondary" onClick={startScan}>
                  <Play className="h-4 w-4" />
                  Scan
                </CyberButton>
              </div>
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Current Scan Result */}
      {currentScan && (
        <CyberCard variant={currentScan.isDeepfake ? 'danger' : 'success'}>
          <CyberCardHeader>
            <CyberCardTitle className="flex items-center gap-2">
              {currentScan.isDeepfake ? (
                <>
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Deepfake Detected!
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  Media Appears Authentic
                </>
              )}
            </CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Confidence Score */}
              <div className="flex flex-col items-center">
                <ProgressRing
                  value={currentScan.confidenceScore}
                  size={140}
                  strokeWidth={10}
                  variant={currentScan.isDeepfake ? 'danger' : 'success'}
                  label="Deepfake"
                />
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  {currentScan.isDeepfake
                    ? `${currentScan.confidenceScore.toFixed(1)}% confidence this is AI-generated`
                    : `${(100 - currentScan.confidenceScore).toFixed(1)}% confidence this is authentic`}
                </p>
              </div>

              {/* Analysis Breakdown */}
              <div className="space-y-4">
                <h4 className="font-orbitron text-sm font-semibold uppercase tracking-wider">
                  Analysis Breakdown
                </h4>
                
                {Object.entries(currentScan.analysisDetails).map(([key, value]) => {
                  const label = key.replace(/([A-Z])/g, ' $1').trim();
                  const isGood = key === 'faceConsistency' || key === 'temporalConsistency' 
                    ? value > 70 
                    : value < 30;
                  
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{label}</span>
                        <span className={isGood ? 'text-success' : 'text-destructive'}>
                          {value}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-500",
                            isGood ? 'bg-success' : 'bg-destructive'
                          )}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      )}

      {/* Scan History */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle>Recent Scans</CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="space-y-3">
            {scanHistory.map((scan) => {
              const MediaIcon = getMediaIcon(scan.mediaType);
              
              return (
                <div
                  key={scan.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-all",
                    scan.isDeepfake
                      ? "bg-destructive/10 border-destructive/30"
                      : "bg-success/10 border-success/30"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    scan.isDeepfake ? "bg-destructive/20" : "bg-success/20"
                  )}>
                    <MediaIcon className={cn(
                      "h-5 w-5",
                      scan.isDeepfake ? "text-destructive" : "text-success"
                    )} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm capitalize">
                        {scan.mediaType} Analysis
                      </span>
                      {scan.isDeepfake ? (
                        <span className="px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
                          FAKE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium">
                          AUTHENTIC
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {scan.mediaUrl}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={cn(
                      "font-mono text-lg font-bold",
                      scan.isDeepfake ? "text-destructive" : "text-success"
                    )}>
                      {scan.confidenceScore.toFixed(0)}%
                    </span>
                    <p className="text-xs text-muted-foreground">confidence</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default DeepfakeScanner;
