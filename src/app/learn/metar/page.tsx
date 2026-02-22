import AppLayout from '../../AppLayout';
import { Cloud, Wind, Thermometer, Eye, MapPin } from 'lucide-react';

const metarElements = [
  { field: 'Station', example: 'LPFR', description: 'ICAO code of aerodrome' },
  { field: 'Time', example: '221950Z', description: 'Day 22, Time 19:50 UTC' },
  { field: 'Wind', example: '19010KT', description: 'Direction 190°, Speed 10kt' },
  { field: 'Visibility', example: '9999', description: 'Visibility in meters (9999 = 10km+)' },
  { field: 'Weather', example: '+RA', description: '+RA=Heavy Rain, -RA=Light Rain, TS=Thunderstorm' },
  { field: 'Clouds', example: 'FEW040', description: 'FEW=Few(1-2), SCT=Scattered(3-4), BKN=Broken(5-7), OVC=Overcast(8)' },
  { field: 'Temp/Dew', example: '18/12', description: 'Temperature 18°C, Dewpoint 12°C' },
  { field: 'QNH', example: 'Q1015', description: 'Altimeter setting in hPa' },
];

const vmcCriteria = [
  { airspace: 'Class G (<3000ft)', visibility: '5000m', cloudBase: '500ft AGL' },
  { airspace: 'Class G (>3000ft)', visibility: '5000m', cloudBase: '1000ft above terrain' },
  { airspace: 'Class D (CTR)', visibility: '5000m', cloudBase: '1000ft above MDA' },
  { airspace: 'Class C (TMA)', visibility: '5000m', cloudBase: '1000ft above MDA' },
];

export default function MetarPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">METAR/TAF (IPMA)</h1>
        <p className="page-subtitle">Weather reports and forecasts - Reference IPMA Aviation</p>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">METAR Format</h3>
        <div className="grid-2">
          {metarElements.map((el, idx) => (
            <div key={idx} className="flex items-center gap-3" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
              <div style={{ minWidth: '80px' }}>
                <strong>{el.field}</strong>
              </div>
              <code style={{ color: 'var(--accent)' }}>{el.example}</code>
              <span className="text-sm text-muted">{el.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">VMC Minima (Portugal)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Airspace</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Visibility</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Cloud Base</th>
            </tr>
          </thead>
          <tbody>
            {vmcCriteria.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem' }}>{row.airspace}</td>
                <td style={{ padding: '0.75rem' }}>{row.visibility}</td>
                <td style={{ padding: '0.75rem' }}>{row.cloudBase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb-4">
        <h3 className="card-title mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <a href="https://www.ipma.pt/pt/aviation/" target="_blank" className="btn btn-primary">
            <Cloud size={16} /> IPMA Aviation
          </a>
          <a href="/decode" className="btn btn-secondary">
            <Eye size={16} /> Decode METAR
          </a>
        </div>
      </div>
    </AppLayout>
  );
}
