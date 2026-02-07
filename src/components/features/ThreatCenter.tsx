import React, { useState } from 'react';
import { Shield, Filter, Search, Clock, ExternalLink, ChevronDown, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { ThreatBadge } from '@/components/ui/threat-badge';
import { mockThreats } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import type { ThreatEvent } from '@/types/sentinel';
import { cn } from '@/lib/utils';

const threatTypeLabels: Record<ThreatEvent['type'], string> = {
  phishing: 'Phishing',
  malware: 'Malware',
  deepfake: 'Deepfake',
  wallet_attack: 'Wallet Attack',
  suspicious_login: 'Suspicious Login',
  data_breach: 'Data Breach',
  social_engineering: 'Social Engineering',
};

const threatTypeIcons: Record<ThreatEvent['type'], string> = {
  phishing: '🎣',
  malware: '🦠',
  deepfake: '🎭',
  wallet_attack: '💰',
  suspicious_login: '🔐',
  data_breach: '💾',
  social_engineering: '🎯',
};

const ThreatCenter: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null);

  const filteredThreats = mockThreats.filter(threat => {
    if (selectedSeverity !== 'all' && threat.severity !== selectedSeverity) return false;
    if (selectedType !== 'all' && threat.type !== selectedType) return false;
    if (searchQuery && !threat.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !threat.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const severityCounts = {
    critical: mockThreats.filter(t => t.severity === 'critical').length,
    high: mockThreats.filter(t => t.severity === 'high').length,
    medium: mockThreats.filter(t => t.severity === 'medium').length,
    low: mockThreats.filter(t => t.severity === 'low').length,
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['critical', 'high', 'medium', 'low'] as const).map((severity) => (
          <CyberCard
            key={severity}
            variant={severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : 'default'}
            className={cn(
              "cursor-pointer transition-all",
              selectedSeverity === severity && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedSeverity(selectedSeverity === severity ? 'all' : severity)}
          >
            <CyberCardContent className="text-center py-4">
              <ThreatBadge severity={severity} className="mb-2">
                {severity}
              </ThreatBadge>
              <p className="font-orbitron text-3xl font-bold">{severityCounts[severity]}</p>
              <p className="text-xs text-muted-foreground">threats</p>
            </CyberCardContent>
          </CyberCard>
        ))}
      </div>

      {/* Filters */}
      <CyberCard>
        <CyberCardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search threats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-lg border border-border/50 bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-10 rounded-lg border border-border/50 bg-muted/50 px-4 text-sm focus:border-primary/50 focus:outline-none"
            >
              <option value="all">All Types</option>
              {Object.entries(threatTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(selectedSeverity !== 'all' || selectedType !== 'all' || searchQuery) && (
              <CyberButton
                variant="ghost"
                onClick={() => {
                  setSelectedSeverity('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </CyberButton>
            )}
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Threat List */}
      <CyberCard>
        <CyberCardHeader>
          <div className="flex items-center justify-between">
            <CyberCardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Threat Log ({filteredThreats.length})
            </CyberCardTitle>
            <CyberButton variant="ghost" size="sm">
              Export
              <ExternalLink className="h-3 w-3" />
            </CyberButton>
          </div>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="space-y-3">
            {filteredThreats.map((threat) => (
              <div
                key={threat.id}
                className={cn(
                  "rounded-lg border transition-all",
                  threat.severity === 'critical' 
                    ? "bg-destructive/5 border-destructive/30" 
                    : threat.severity === 'high'
                    ? "bg-warning/5 border-warning/30"
                    : "bg-muted/50 border-border/50"
                )}
              >
                {/* Main Row */}
                <button
                  className="w-full p-4 text-left"
                  onClick={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-2xl">{threatTypeIcons[threat.type]}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-foreground">{threat.title}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                            {threat.description}
                          </p>
                        </div>
                        <ThreatBadge severity={threat.severity}>
                          {threat.severity}
                        </ThreatBadge>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-muted">
                          {threatTypeLabels[threat.type]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(threat.timestamp, { addSuffix: true })}
                        </span>
                        {threat.blocked ? (
                          <span className="flex items-center gap-1 text-success">
                            <CheckCircle className="h-3 w-3" />
                            Blocked
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-warning">
                            <AlertTriangle className="h-3 w-3" />
                            Action Required
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <ChevronDown className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      expandedThreat === threat.id && "rotate-180"
                    )} />
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedThreat === threat.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Source</p>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">
                          {threat.source}
                        </code>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Detected At</p>
                        <p className="text-sm">{format(threat.timestamp, 'PPpp')}</p>
                      </div>
                      {threat.details && (
                        <div className="md:col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Additional Details</p>
                          <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto">
                            {JSON.stringify(threat.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <CyberButton variant="outline" size="sm">
                        View Full Report
                      </CyberButton>
                      {!threat.blocked && (
                        <CyberButton variant="destructive" size="sm">
                          Block Source
                        </CyberButton>
                      )}
                      <CyberButton variant="ghost" size="sm">
                        Mark as False Positive
                      </CyberButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredThreats.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No threats found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery || selectedSeverity !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Your system is secure'}
              </p>
            </div>
          )}
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default ThreatCenter;
