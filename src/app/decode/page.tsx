'use client';

import { useState } from 'react';
import AppLayout from '../AppLayout';
import { Calculator, ArrowRight, Cloud, Wind, Thermometer, Eye } from 'lucide-react';

interface DecodedMETAR {
  station: string;
  time: string;
  wind: string;
  visibility: string;
  weather?: string;
  clouds: string[];
  temp?: string;
  dewpoint?: string;
  qnh?: string;
  trend?: string;
}

const weatherPhenomena: Record<string, string> = {
  'MI': 'Shallow',
  'BC': 'Patches',
  'PR': 'Partial',
  'DR': 'Low Drifting',
  'BL': 'Blowing',
  'SH': 'Showers',
  'TS': 'Thunderstorm',
  'FZ': 'Freezing',
  'DZ': 'Drizzle',
  'RA': 'Rain',
  'SN': 'Snow',
  'SG': 'Snow Grains',
  'PL': 'Ice Pellets',
  'GR': 'Hail',
  'GS': 'Small Hail',
  'UP': 'Unknown Precipitation',
  '+': 'Heavy',
  '-': 'Light',
  'VC': 'Vicinity',
};

const cloudTypes: Record<string, string> = {
  'TCU': 'Towering Cumulus',
  'CB': 'Cumulonimbus',
  'CLR': 'Clear',
  'SKC': 'Sky Clear',
  'NSC': 'No Significant Cloud',
};

function decodeMETAR(metar: string): DecodedMETAR | null {
  try {
    const parts = metar.trim().toUpperCase();
    const result: DecodedMETAR = {
      station: '',
      time: '',
      wind: '',
      visibility: '',
      clouds: [],
    };

    // Station
    const stationMatch = parts.match(/^[A-Z]{4}/);
    if (stationMatch) result.station = stationMatch[0];

    // Time
    const timeMatch = parts.match(/(\d{2})(\d{2})(\d{2})Z/);
    if (timeMatch) result.time = `${timeMatch[1]}:${timeMatch[2]}Z`;

    // Wind
    const windMatch = parts.match(/(\d{3})(\d{2,3})(G(\d{2,3}))?KT/);
    if (windMatch) {
      const dir = windMatch[1];
      const speed = windMatch[2];
      const gust = windMatch[4];
      result.wind = `${dir}° @ ${speed}kt${gust ? ` gusting ${gust}kt` : ''}`;
    }

    // Visibility
    const visMatch = parts.match(/(\d{4})/);
    if (visMatch) {
      const vis = parseInt(visMatch[1]);
      result.visibility = vis >= 9999 ? '10km+' : `${vis}m`;
    }

    // Weather (look for weather phenomena after visibility)
    const wxMatch = parts.match(/\s((MI|BC|PR|DR|BL|SH|TS|FZ|DZ|RA|SN|SG|GR|GS|UP|\+|-){1,2}(RA|SN|DZ|SN|SG|PL|GR|GS)?)\s/);
    if (wxMatch) {
      let wx = wxMatch[1];
      if (wx.startsWith('+') || wx.startsWith('-')) {
        const intensity = wx.startsWith('+') ? 'Heavy ' : 'Light ';
        wx = intensity + (weatherPhenomena[wx.slice(1)] || wx);
      } else {
        wx = weatherPhenomena[wx] || wx;
      }
      result.weather = wx;
    }

    // Clouds
    const cloudMatches = parts.matchAll(/(FEW|SCT|BKN|OVC)(\d{3})(TCU|CB)?/g);
    for (const match of cloudMatches) {
      const height = parseInt(match[2]) * 100;
      const type = match[1];
      const modifier = match[3];
      let cloud = `${type === 'FEW' ? 'Few' : type === 'SCT' ? 'Scattered' : type === 'BKN' ? 'Broken' : 'Overcast'} at ${height}ft`;
      if (modifier) cloud += ` (${cloudTypes[modifier]})`;
      result.clouds.push(cloud);
    }

    // Temperature/Dewpoint
    const tempMatch = parts.match(/(\d{2})\/(\d{2})/);
    if (tempMatch) {
      result.temp = `${tempMatch[1]}°C`;
      result.dewpoint = `${tempMatch[2]}°C`;
    }

    // QNH
    const qnhMatch = parts.match(/Q(\d{4})/);
    if (qnhMatch) result.qnh = `${qnhMatch[1]} hPa`;

    // Trend
    const trendMatch = parts.match(/(BECMG|TEMPO|NOSIG)/);
    if (trendMatch) result.trend = trendMatch[1] === 'NOSIG' ? 'No significant change' : trendMatch[1];

    return result;
  } catch {
    return null;
  }
}

function isVMC(metar: string): { vmc: boolean; reason: string } {
  const decoded = decodeMETAR(metar);
  if (!decoded) return { vmc: false, reason: 'Unable to decode' };

  // Check visibility (need 5000m for VMC in Portugal Class G)
  const vis = decoded.visibility;
  const visNum = parseInt(vis) || 9999;
  
  // Check clouds - need clear of cloud below 1500ft
  let ceiling = 99999;
  for (const cloud of decoded.clouds) {
    const heightMatch = cloud.match(/at (\d+)ft/);
    if (heightMatch) {
      const h = parseInt(heightMatch[1]);
      if (h < ceiling) ceiling = h;
    }
  }

  if (visNum < 5000) return { vmc: false, reason: `Visibility ${vis}m < 5000m` };
  if (ceiling < 500) return { vmc: false, reason: `Ceiling ${ceiling}ft < 500ft AGL` };

  return { vmc: true, reason: 'VMC conditions' };
}

export default function DecodePage() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedMETAR | null>(null);
  const [vmcCheck, setVmcCheck] = useState<{ vmc: boolean; reason: string } | null>(null);

  const handleDecode = () => {
    const result = decodeMETAR(input);
    setDecoded(result);
    if (result) {
      setVmcCheck(isVMC(input));
    }
  };

  const sampleMETARs = [
    'LPFR 221950Z 19010KT 9999 FEW040 18/12 Q1015',
    'LPPR 221800Z 27025G35KT 4000 +RA BKN010 OVC025 12/10 Q1009',
    'LPMA 221500Z 36005KT CAVOK 22/18 Q1016',
  ];

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Decode</h1>
        <p className="page-subtitle">METAR/TAF decoder with step-by-step explanation</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title mb-4">METAR / TAF Input</h3>
          <textarea
            className="input"
            rows={3}
            placeholder="Paste METAR or TAF here..."
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            style={{ fontFamily: 'monospace', resize: 'vertical' }}
          />
          <button className="btn btn-primary mt-4" onClick={handleDecode}>
            <Calculator size={16} /> Decode
          </button>

          <div className="mt-4">
            <p className="text-sm text-muted mb-2">Try a sample:</p>
            <div className="flex flex-col gap-2">
              {sampleMETARs.map((sample, i) => (
                <button
                  key={i}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}
                  onClick={() => {
                    setInput(sample);
                    setDecoded(null);
                  }}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {decoded && (
          <div className="card">
            <h3 className="card-title mb-4">Decoded Output</h3>
            
            <div className="decode-output">
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}>
                <Cloud size={18} />
                <strong>Aerodrome</strong>
              </div>
              <div style={{ marginLeft: '1.5rem' }}>{decoded.station || 'N/A'}</div>
              
              <div className="flex items-center gap-2 mb-2 mt-4" style={{ color: 'var(--accent)' }}>
                <Wind size={18} />
                <strong>Wind</strong>
              </div>
              <div style={{ marginLeft: '1.5rem' }}>{decoded.wind || 'Calm or VRB'}</div>
              
              <div className="flex items-center gap-2 mb-2 mt-4" style={{ color: 'var(--accent)' }}>
                <Eye size={18} />
                <strong>Visibility</strong>
              </div>
              <div style={{ marginLeft: '1.5rem' }}>{decoded.visibility || 'N/A'}</div>
              {decoded.weather && (
                <div style={{ marginLeft: '1.5rem', color: '#d97706' }}>Weather: {decoded.weather}</div>
              )}
              
              <div className="flex items-center gap-2 mb-2 mt-4" style={{ color: 'var(--accent)' }}>
                <Cloud size={18} />
                <strong>Clouds</strong>
              </div>
              <div style={{ marginLeft: '1.5rem' }}>
                {decoded.clouds.length > 0 ? decoded.clouds.join(', ') : 'Clear / CAVOK'}
              </div>
              
              <div className="flex items-center gap-2 mb-2 mt-4" style={{ color: 'var(--accent)' }}>
                <Thermometer size={18} />
                <strong>Temperature / Dewpoint</strong>
              </div>
              <div style={{ marginLeft: '1.5rem' }}>
                {decoded.temp && decoded.dewpoint 
                  ? `${decoded.temp} / ${decoded.dewpoint}` 
                  : 'N/A'}
              </div>
              
              <div className="mt-4" style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
                <strong>QNH: </strong>{decoded.qnh || 'N/A'}
                {decoded.trend && (
                  <span style={{ marginLeft: '1rem' }}><strong>Trend: </strong>{decoded.trend}</span>
                )}
              </div>
            </div>

            {vmcCheck && (
              <div 
                className="mt-4" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  background: vmcCheck.vmc ? '#dcfce7' : '#fee2e2',
                  color: vmcCheck.vmc ? '#166534' : '#991b1b'
                }}
              >
                <strong>{vmcCheck.vmc ? '✓ VMC' : '✗ IMC'} :</strong> {vmcCheck.reason}
              </div>
            )}
          </div>
        )}
      </div>

      {!decoded && (
        <div className="card mt-4">
          <h3 className="card-title mb-4">How to decode METAR</h3>
          <div className="decode-output" style={{ background: 'transparent', padding: 0 }}>
            <p><strong>LPFR 221950Z</strong> - Station / Time (22nd, 19:50Z)</p>
            <p><strong>19010KT</strong> - Wind from 190° at 10kt</p>
            <p><strong>9999</strong> - Visibility 9999m (10km+)</p>
            <p><strong>FEW040</strong> - Few clouds at 4000ft</p>
            <p><strong>18/12</strong> - Temp 18°C, Dewpoint 12°C</p>
            <p><strong>Q1015</strong> - QNH 1015 hPa</p>
          </div>
          <div className="mt-4">
            <a 
              href="https://www.ipma.pt/pt/aviation/metar.taf/" 
              target="_blank"
              className="btn btn-secondary"
            >
              IPMA METAR/TAF Format
            </a>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
