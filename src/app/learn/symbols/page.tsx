import AppLayout from '../../AppLayout';
import symbols from '@/data/symbols.json';

export default function SymbolsPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Chart Symbols (GEN 2.3)</h1>
        <p className="page-subtitle">Aerodrome, navaids, airspace, obstacles - Reference NAV Portugal GEN 2.3</p>
      </div>

      <div className="search-bar" style={{ marginBottom: '2rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input 
          type="text" 
          className="input" 
          placeholder="Search symbols..." 
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      <div className="grid-3">
        {symbols.map((symbol: any) => (
          <div key={symbol.id} className="card" style={{ padding: '1rem' }}>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ fontSize: '1.5rem' }}>{symbol.icon}</span>
              <h4 style={{ margin: 0 }}>{symbol.name}</h4>
            </div>
            <p className="text-sm text-muted" style={{ marginBottom: '0.5rem' }}>{symbol.meaning}</p>
            <p className="text-sm" style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
              {symbol.operationalImplication}
            </p>
            {symbol.references && (
              <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Ref: {symbol.references[0]?.doc} - {symbol.references[0]?.section}
              </p>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
