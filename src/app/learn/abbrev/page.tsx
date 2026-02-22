import AppLayout from '../../AppLayout';
import abbreviations from '@/data/abbreviations.json';

export default function AbbrevPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Abbreviations (GEN 2.2)</h1>
        <p className="page-subtitle">AIP abbreviations and acronyms - Reference NAV Portugal GEN 2.2</p>
      </div>

      <div className="search-bar" style={{ marginBottom: '2rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input 
          type="text" 
          className="input" 
          placeholder="Search abbreviations..." 
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      <div className="grid-3">
        {abbreviations.map((abbr: any) => (
          <div key={abbr.id} className="card" style={{ padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>{abbr.acronym}</h4>
            <p className="text-sm" style={{ marginBottom: '0.25rem' }}><strong>Exp:</strong> {abbr.expansion}</p>
            <p className="text-sm text-muted" style={{ marginBottom: '0.5rem' }}>{abbr.meaning}</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="tag tag-blue">{abbr.context}</span>
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
