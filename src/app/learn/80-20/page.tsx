import AppLayout from '../../AppLayout';
import Link from 'next/link';
import { 
  Target, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Calculator,
  Cloud,
  Map
} from 'lucide-react';

const priorities = [
  {
    tier: 'Tier 1 - Critical (60% of exam)',
    topics: [
      { name: 'VMC Minima & Flight Rules', link: '/learn/vfr-portugal', weight: '25%' },
      { name: 'METAR/TAF Decoding', link: '/learn/metar', weight: '20%' },
      { name: 'Airspace (CTR, TMA, RMZ, TMZ)', link: '/learn/vfr-portugal', weight: '15%' },
    ],
  },
  {
    tier: 'Tier 2 - High Impact (25% of exam)',
    topics: [
      { name: 'Chart Symbols (GEN 2.3)', link: '/learn/symbols', weight: '10%' },
      { name: 'Abbreviations (GEN 2.2)', link: '/learn/abbrev', weight: '10%' },
      { name: 'NOTAM Analysis', link: '/learn/notam', weight: '5%' },
    ],
  },
  {
    tier: 'Tier 3 - Important (15% of exam)',
    topics: [
      { name: 'Performance & CG', link: '/learn/performance', weight: '8%' },
      { name: 'Routes & Airway', link: '/learn/routes', weight: '7%' },
    ],
  },
];

const weeklyPlan = [
  { day: 'Day 1-2', focus: 'VMC Minima + Altimetry', drills: '15 symbols + 3 METAR', time: '30 min' },
  { day: 'Day 3-4', focus: 'METAR/TAF + Weather', drills: '2 METAR + 2 TAF + abbreviations', time: '35 min' },
  { day: 'Day 5-6', focus: 'Airspace (CTR/TMA/RMZ)', drills: 'NOTAM triage + airspace QCM', time: '30 min' },
  { day: 'Day 7', focus: 'Review + Mock Test', drills: '10 random QCM + errors review', time: '40 min' },
];

export default function StudyPlan80Page() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Study Plan 80/20</h1>
        <p className="page-subtitle">Focus on high-impact topics for PPL Portugal exam</p>
      </div>

      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', color: 'white' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>80/20 Principle</h3>
        <p style={{ opacity: 0.9 }}>
          80% of exam questions come from 20% of the content. Master these areas first.
        </p>
      </div>

      {priorities.map((tier, idx) => (
        <div key={idx} className="card mb-4">
          <h3 className="card-title" style={{ 
            color: idx === 0 ? '#16a34a' : idx === 1 ? '#d97706' : '#6b7280',
            marginBottom: '1rem'
          }}>
            {tier.tier}
          </h3>
          <div className="flex flex-col gap-2">
            {tier.topics.map((topic, tidx) => (
              <Link 
                key={tidx} 
                href={topic.link}
                className="flex items-center justify-between"
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem', 
                  background: 'var(--bg-secondary)',
                  textDecoration: 'none'
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} style={{ color: 'var(--accent)' }} />
                  <span>{topic.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tag tag-success">{topic.weight}</span>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="card mb-4">
        <h3 className="card-title mb-4">Recommended Weekly Schedule</h3>
        <div className="grid-2">
          {weeklyPlan.map((day, idx) => (
            <div key={idx} className="module-card">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontWeight: 600 }}>{day.focus}</span>
                <span className="tag tag-blue">{day.time}</span>
              </div>
              <p className="text-sm text-muted">{day.drills}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title mb-4">Quick Links to Priority Content</h3>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <Link href="/learn/vfr-portugal" className="btn btn-primary">
            <Target size={16} /> VFR Rules
          </Link>
          <Link href="/learn/metar" className="btn btn-primary">
            <Cloud size={16} /> METAR/TAF
          </Link>
          <Link href="/learn/symbols" className="btn btn-primary">
            <Map size={16} /> Symbols
          </Link>
          <Link href="/drills/daily" className="btn btn-secondary">
            <BookOpen size={16} /> Start Daily Drill
          </Link>
          <Link href="/tests" className="btn btn-secondary">
            <Calculator size={16} /> Mock Test
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
