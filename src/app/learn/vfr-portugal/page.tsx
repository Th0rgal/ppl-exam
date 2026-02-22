import AppLayout from '../../AppLayout';
import { Plane, MapPin, Radio, AlertTriangle, Target } from 'lucide-react';

const airspaceTypes = [
  { type: 'ATZ', description: 'Aerodrome Traffic Zone', class: 'D/G', freq: 'AFIS/TWR', clearance: 'Required for G' },
  { type: 'CTR', description: 'Control Zone', class: 'D', freq: 'TWR', clearance: 'Required' },
  { type: 'TMA', description: 'Terminal Control Area', class: 'C', freq: 'APP', clearance: 'Required + transponder' },
  { type: 'RMZ', description: 'Radio Mandatory Zone', class: 'G', freq: 'FIC', clearance: 'Radio required' },
  { type: 'TMZ', description: 'Transponder Mandatory Zone', class: 'G/C', freq: '-', clearance: 'Transponder required' },
];

const circuitAlt = [
  { ad: 'LPFR (Faro)', alt: '1000ft AAL' },
  { ad: 'LPPR (Porto)', alt: '1500ft AAL' },
  { ad: 'LPPT (Lisbon)', alt: '1500ft AAL' },
];

export default function VfrPortugalPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">VFR Portugal (ENR 1.2)</h1>
        <p className="page-subtitle">VFR rules, circuits, VRPs, minima - Reference NAV Portugal ENR 1.2</p>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">Airspace Types</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Description</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Freq</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Clearance</th>
            </tr>
          </thead>
          <tbody>
            {airspaceTypes.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{row.type}</td>
                <td style={{ padding: '0.75rem' }}>{row.description}</td>
                <td style={{ padding: '0.75rem' }}>{row.class}</td>
                <td style={{ padding: '0.75rem' }}>{row.freq}</td>
                <td style={{ padding: '0.75rem' }}>{row.clearance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">Circuit Altitudes</h3>
        <div className="grid-3">
          {circuitAlt.map((row, idx) => (
            <div key={idx} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <MapPin size={20} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{row.ad}</h4>
              <span className="tag tag-success">{row.alt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">Key VFR Rules (Portugal)</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <Target size={20} style={{ color: 'var(--accent)', marginTop: '2px' }} />
            <div>
              <strong>Minimum Altitude</strong>
              <p className="text-sm text-muted">1000ft AGL or 3000ft AMSL above terrain</p>
            </div>
          </div>
          <div className="flex items-start gap-3" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <AlertTriangle size={20} style={{ color: '#d97706', marginTop: '2px' }} />
            <div>
              <strong>Cloud Clearance</strong>
              <p className="text-sm text-muted">500ft below, 1000ft above, 1500ft horizontally</p>
            </div>
          </div>
          <div className="flex items-start gap-3" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
            <Radio size={20} style={{ color: 'var(--accent)', marginTop: '2px' }} />
            <div>
              <strong>Radio Requirements</strong>
              <p className="text-sm text-muted">RMZ/TMZ require 8.33kHz radio. Transponder Mode C in TMA.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title mb-4">Reference</h3>
        <a href="https://ais.nav.pt/aip/" target="_blank" className="btn btn-primary">
          <Plane size={16} /> NAV Portugal eAIP
        </a>
      </div>
    </AppLayout>
  );
}
