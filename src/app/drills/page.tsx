'use client';

import AppLayout from '../AppLayout';
import Link from 'next/link';
import { 
  Clock, 
  Target, 
  Play, 
  ChevronRight,
  Brain,
  MapPin,
  Calculator,
  BookOpen
} from 'lucide-react';

const drills = [
  {
    id: 'daily-symbols',
    title: '15 Symbols in 10 min',
    description: 'Identify chart symbols from GEN 2.3',
    icon: MapPin,
    duration: 10,
    type: 'daily',
    count: 15,
    href: '/drills/daily',
  },
  {
    id: 'daily-weather',
    title: '1 METAR + 1 TAF in 8 min',
    description: 'Decode weather reports and check VMC',
    icon: Target,
    duration: 8,
    type: 'daily',
    count: 2,
    href: '/drills/daily',
  },
  {
    id: 'daily-abbrev',
    title: '25 Abbreviations',
    description: 'Test knowledge of AIP abbreviations',
    icon: Brain,
    duration: 12,
    type: 'daily',
    count: 25,
    href: '/drills/daily',
  },
  {
    id: 'decode',
    title: 'METAR/TAF Decode Tool',
    description: 'Practice with real Portuguese weather strings',
    icon: Calculator,
    duration: 8,
    type: 'decode',
    count: 3,
    href: '/decode',
  },
  {
    id: 'exam',
    title: 'Exam Simulation (10 Q)',
    description: 'Timed mixed-topic exam practice',
    icon: BookOpen,
    duration: 15,
    type: 'exam',
    count: 10,
    href: '/tests',
  },
];

const quickStats = {
  todayDrills: 2,
  weeklyAccuracy: 87,
  totalTime: 45,
  streak: 7,
};

export default function DrillsPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Drills</h1>
        <p className="page-subtitle">Practice with timed exercises</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{quickStats.todayDrills}</div>
          <div className="stat-label">Drills Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{quickStats.weeklyAccuracy}%</div>
          <div className="stat-label">This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{quickStats.totalTime}m</div>
          <div className="stat-label">Total Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{quickStats.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h3 className="card-title">Daily Drill (25 min)</h3>
          <Link href="/drills/daily" className="btn btn-primary">
            <Play size={16} /> Start
          </Link>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Recommended daily practice combining symbols, weather, and abbreviations
        </p>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>All Drills</h3>
      <div className="flex flex-col gap-2">
        {drills.map((drill) => (
          <div key={drill.id} className="card" style={{ padding: '1rem' }}>
            <div className="flex items-center gap-4">
              <div className="module-icon" style={{ marginBottom: 0 }}>
                <drill.icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4>{drill.title}</h4>
                <p className="text-sm text-muted">{drill.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted">
                  <Clock size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  {drill.duration} min
                </div>
                <Link href={drill.href} className="btn btn-secondary">
                  <Play size={16} /> Start
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <h3 className="card-title mb-4">Weak Areas</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <span>QDM vs QDR confusion</span>
            <Link href="/learn/abbrev" className="btn btn-secondary btn-sm">
              Review <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <span>ILS Categories (CAT I/II/III)</span>
            <Link href="/learn/symbols" className="btn btn-secondary btn-sm">
              Review <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <span>Airspace boundaries</span>
            <Link href="/learn/vfr-portugal" className="btn btn-secondary btn-sm">
              Review <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
