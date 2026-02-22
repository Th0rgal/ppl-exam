import AppLayout from '../AppLayout';
import Link from 'next/link';
import { 
  Library, 
  FileText, 
  ExternalLink, 
  Search, 
  Download,
  Bookmark,
  ChevronRight
} from 'lucide-react';

const documents = [
  {
    id: 'eaip',
    title: 'eAIP Portugal',
    description: 'Electronic Aeronautical Information Publication',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/aip/',
    sections: ['GEN', 'ENR', 'AD'],
  },
  {
    id: 'evfr',
    title: 'eVFR Manual Portugal',
    description: 'VFR procedures and routes in Portuguese airspace',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/',
    sections: ['VFR', 'Routes', 'Radio'],
  },
  {
    id: 'metar',
    title: 'METAR/TAF Format Guide',
    description: 'IPMA weather report format documentation',
    source: 'IPMA',
    url: 'https://www.ipma.pt/pt/aviation/metar.taf/',
    sections: ['METAR', 'TAF', 'SPECI'],
  },
  {
    id: 'vac-lpfr',
    title: 'VAC Faro (LPFR)',
    description: 'Visual Approach Chart - Faro',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/aip/',
    sections: ['AD', 'Charts'],
  },
  {
    id: 'vac-lppr',
    title: 'VAC Porto (LPPR)',
    description: 'Visual Approach Chart - Porto',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/aip/',
    sections: ['AD', 'Charts'],
  },
  {
    id: 'vac-lpma',
    title: 'VAC Madeira (LPMA)',
    description: 'Visual Approach Chart - Madeira',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/aip/',
    sections: ['AD', 'Charts'],
  },
  {
    id: 'notam',
    title: 'NOTAM Guide',
    description: 'NOTAM format and Q-codes',
    source: 'NAV Portugal',
    url: 'https://ais.nav.pt/',
    sections: ['Briefing', 'Q-Codes'],
  },
  {
    id: 'sigmet',
    title: 'SIGMET Guide',
    description: 'Significant meteorological information',
    source: 'IPMA',
    url: 'https://www.ipma.pt/pt/aviation/',
    sections: ['Weather', 'Warnings'],
  },
];

export default function LibraryPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Library</h1>
        <p className="page-subtitle">Official PDFs and documents with search</p>
      </div>

      <div className="search-bar mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input 
          type="text" 
          className="input" 
          placeholder="Search documents, sections, topics..." 
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      <div className="grid-2 mb-4">
        <div className="card">
          <h3 className="card-title mb-4">Quick Access</h3>
          <div className="flex flex-col gap-2">
            <a 
              href="https://ais.nav.pt/aip/" 
              target="_blank"
              className="flex items-center gap-3"
              style={{ padding: '1rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)' }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '0.5rem', 
                background: 'var(--accent)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Library size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <strong>eAIP Portugal</strong>
                <p className="text-sm text-muted">NAV Portugal official</p>
              </div>
              <ExternalLink size={18} />
            </a>
            
            <a 
              href="https://www.ipma.pt/pt/aviation/" 
              target="_blank"
              className="flex items-center gap-3"
              style={{ padding: '1rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)' }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '0.5rem', 
                background: '#059669',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Library size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <strong>IPMA Aviation</strong>
                <p className="text-sm text-muted">Weather forecasts</p>
              </div>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title mb-4">Index by Source</h3>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-blue">NAV Portugal (12)</span>
            <span className="badge badge-blue">IPMA (5)</span>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/library?doc=gen" className="flex items-center justify-between" style={{ padding: '0.5rem', borderRadius: '0.25rem' }}>
              <span>GEN - General</span>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </Link>
            <Link href="/library?doc=enr" className="flex items-center justify-between" style={{ padding: '0.5rem', borderRadius: '0.25rem' }}>
              <span>ENR - Enroute</span>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </Link>
            <Link href="/library?doc=ad" className="flex items-center justify-between" style={{ padding: '0.5rem', borderRadius: '0.25rem' }}>
              <span>AD - Aerodromes</span>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            </Link>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>All Documents</h3>
      <div className="flex flex-col gap-2">
        {documents.map((doc) => (
          <div key={doc.id} className="card" style={{ padding: '1rem' }}>
            <div className="flex items-center gap-4">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '0.5rem', 
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2">
                  <h4>{doc.title}</h4>
                  <Bookmark size={14} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
                </div>
                <p className="text-sm text-muted">{doc.description}</p>
                <div className="flex gap-2 mt-1">
                  {doc.sections.map((s) => (
                    <span key={s} className="tag text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <a 
                href={doc.url}
                target="_blank"
                className="btn btn-secondary"
              >
                <ExternalLink size={16} /> Open
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <h3 className="card-title mb-4">Upload Annex</h3>
        <p className="text-muted mb-4">
          Upload your own charts and documents for reference during exercises
        </p>
        <div style={{ 
          border: '2px dashed var(--border)', 
          borderRadius: '0.75rem', 
          padding: '3rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)'
        }}>
          <Download size={32} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
          <p>Drop files here or click to upload</p>
          <p className="text-sm text-muted">PDF, PNG, JPG (max 10MB)</p>
        </div>
      </div>
    </AppLayout>
  );
}
