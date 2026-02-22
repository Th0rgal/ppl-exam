import AppLayout from '../AppLayout';
import { 
  Flame, 
  Target, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Play,
  AlertCircle,
  Calculator,
  ClipboardCheck
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Today&apos;s Training</h1>
        <p className="page-subtitle">Your daily 25-35 min drill plan</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">7</div>
          <div className="stat-label">Day Streak</div>
          <Flame size={20} style={{ marginTop: '0.5rem', color: '#d97706' }} />
        </div>
        <div className="stat-card">
          <div className="stat-value">85%</div>
          <div className="stat-label">Accuracy (7 days)</div>
          <Target size={20} style={{ marginTop: '0.5rem', color: '#16a34a' }} />
        </div>
        <div className="stat-card">
          <div className="stat-value">4:32</div>
          <div className="stat-label">Avg METAR decode</div>
          <Clock size={20} style={{ marginTop: '0.5rem', color: '#2563eb' }} />
        </div>
        <div className="stat-card">
          <div className="stat-value">+12%</div>
          <div className="stat-label">This week</div>
          <TrendingUp size={20} style={{ marginTop: '0.5rem', color: '#16a34a' }} />
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Today&apos;s Drill (25 min)</h3>
            <Link href="/drills/daily" className="btn btn-primary">
              <Play size={16} /> Start
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <span>15 Symbols (10 min)</span>
              <span className="badge badge-blue">Symbols</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
              <span>1 METAR + 1 TAF (8 min)</span>
              <span className="badge badge-blue">Weather</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '0.5rem 0' }}>
              <span>5 Abbreviations (5 min)</span>
              <span className="badge badge-blue">Abbreviations</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Common Errors</h3>
            <Link href="/drills" className="btn btn-secondary">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between" style={{ padding: '0.5rem 0' }}>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
                <span>QDM vs QDR</span>
              </div>
              <span className="tag tag-error">3 errors</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '0.5rem 0' }}>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} style={{ color: '#d97706' }} />
                <span>ILS categories</span>
              </div>
              <span className="tag tag-warning">2 errors</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Study Plan 80/20</h3>
          <Link href="/learn/80-20" className="btn btn-secondary">
            View Plan
          </Link>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Focus on high-impact topics that appear most on the PPL Portugal exam:
        </p>
        <div className="grid-3">
          <div className="module-card">
            <div className="module-icon">
              <Target size={24} />
            </div>
            <h4>Airspace (ENR 1.2)</h4>
            <p className="text-sm text-muted">CTR, TMA, RMZ, TMZ, ATZ</p>
            <span className="tag tag-success" style={{ marginTop: '0.5rem' }}>High Priority</span>
          </div>
          <div className="module-card">
            <div className="module-icon">
              <Clock size={24} />
            </div>
            <h4>METAR/TAF (IPMA)</h4>
            <p className="text-sm text-muted">Decode, VMC criteria</p>
            <span className="tag tag-success" style={{ marginTop: '0.5rem' }}>High Priority</span>
          </div>
          <div className="module-card">
            <div className="module-icon">
              <AlertCircle size={24} />
            </div>
            <h4>Symbols (GEN 2.3)</h4>
            <p className="text-sm text-muted">Charts, markings, lighting</p>
            <span className="tag tag-success" style={{ marginTop: '0.5rem' }}>High Priority</span>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="flex gap-4">
          <Link href="/decode" className="btn btn-secondary">
            <Calculator size={16} /> Decode METAR
          </Link>
          <Link href="/drills" className="btn btn-secondary">
            <Target size={16} /> Quick Drill
          </Link>
          <Link href="/tests" className="btn btn-secondary">
            <ClipboardCheck size={16} /> 10 QCM
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
