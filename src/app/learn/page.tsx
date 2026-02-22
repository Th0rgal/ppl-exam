import AppLayout from '../AppLayout';
import Link from 'next/link';
import { 
  BookOpen, 
  Calculator, 
  Map, 
  Cloud, 
  AlertTriangle, 
  Plane,
  Target,
  ChevronRight
} from 'lucide-react';

const modules = [
  {
    id: 'symbols',
    title: 'Chart Symbols (GEN 2.3)',
    icon: Map,
    description: 'Aerodrome, navaids, airspace, obstacles',
    doc: 'GEN 2.3',
    priority: 'high',
  },
  {
    id: 'abbrev',
    title: 'Abbreviations (GEN 2.2)',
    icon: BookOpen,
    description: 'All AIP abbreviations and acronyms',
    doc: 'GEN 2.2',
    priority: 'high',
  },
  {
    id: 'vfr-portugal',
    title: 'VFR Portugal (ENR 1.2)',
    icon: Plane,
    description: 'VFR rules, circuits, VRPs, minima',
    doc: 'ENR 1.2',
    priority: 'high',
  },
  {
    id: 'routes',
    title: 'Routes & Airspace (ENR 6)',
    icon: Map,
    description: 'Airways, TMA, CTR, restricted areas',
    doc: 'ENR 6',
    priority: 'medium',
  },
  {
    id: 'metar',
    title: 'METAR/TAF (IPMA)',
    icon: Cloud,
    description: 'Decode weather reports and forecasts',
    doc: 'IPMA',
    priority: 'high',
  },
  {
    id: 'notam',
    title: 'NOTAM',
    icon: AlertTriangle,
    description: 'Briefing, triage, impact analysis',
    doc: 'AIS',
    priority: 'medium',
  },
  {
    id: 'performance',
    title: 'Performance & CG',
    icon: Calculator,
    description: 'POH tables, density altitude, centrage',
    doc: 'POH',
    priority: 'medium',
  },
];

export default function LearnPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Learn</h1>
        <p className="page-subtitle">Master the concepts with references to official sources</p>
      </div>

      <div className="search-bar" style={{ marginBottom: '2rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input 
          type="text" 
          className="input" 
          placeholder="Search concepts, symbols, abbreviations..." 
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">Study Plan 80/20</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Focus on topics that represent ~80% of exam questions:
        </p>
        <div className="grid-3">
          <Link href="/learn/vfr-portugal" className="module-card">
            <div className="module-icon">
              <Target size={24} />
            </div>
            <h4>Airspace & Rules</h4>
            <p className="text-sm text-muted">CTR, TMA, RMZ, TMZ, VMC minima</p>
          </Link>
          <Link href="/learn/metar" className="module-card">
            <div className="module-icon">
              <Cloud size={24} />
            </div>
            <h4>Weather Reports</h4>
            <p className="text-sm text-muted">METAR, TAF, SIGMET</p>
          </Link>
          <Link href="/learn/symbols" className="module-card">
            <div className="module-icon">
              <Map size={24} />
            </div>
            <h4>Chart Symbols</h4>
            <p className="text-sm text-muted">GEN 2.3 - markings, lighting</p>
          </Link>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>All Modules</h3>
      <div className="grid-2">
        {modules.map((module) => (
          <Link key={module.id} href={`/learn/${module.id}`} className="module-card">
            <div className="flex items-center gap-4">
              <div className="module-icon">
                <module.icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2">
                  <h4>{module.title}</h4>
                  {module.priority === 'high' && (
                    <span className="tag tag-success">High Priority</span>
                  )}
                </div>
                <p className="text-sm text-muted">{module.description}</p>
                <p className="text-sm" style={{ color: 'var(--accent)', marginTop: '0.25rem' }}>
                  Source: {module.doc}
                </p>
              </div>
              <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
            </div>
          </Link>
        ))}
      </div>

      <div className="card mt-4">
        <h3 className="card-title mb-4">Reference Links</h3>
        <div className="flex flex-col gap-2">
          <a 
            href="https://ais.nav.pt/aip/" 
            target="_blank" 
            className="flex items-center gap-2"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)' }}
          >
            <BookOpen size={20} />
            <span>NAV Portugal eAIP</span>
            <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
          </a>
          <a 
            href="https://www.ipma.pt/pt/aviation/" 
            target="_blank" 
            className="flex items-center gap-2"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)' }}
          >
            <Cloud size={20} />
            <span>IPMA Aviation</span>
            <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
          </a>
        </div>
      </div>
    </AppLayout>
  );
}
