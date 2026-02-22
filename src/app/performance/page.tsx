'use client';

import { useState } from 'react';
import AppLayout from '../AppLayout';
import { Calculator, Plane, Info } from 'lucide-react';

interface AircraftPerf {
  name: string;
  maxTakeoff: number;
  maxLanding: number;
  emptyWeight: number;
  arm: { nose: number; rear: number; baggage: number };
  moments: { nose: number; rear: number; baggage: number };
}

const aircraft: AircraftPerf[] = [
  {
    name: 'Cessna 152',
    maxTakeoff: 1670,
    maxLanding: 1670,
    emptyWeight: 1110,
    arm: { nose: 37, rear: 73.3, baggage: 95 },
    moments: { nose: 2550, rear: 4800, baggage: 350 }
  },
  {
    name: 'Piper PA-28-181',
    maxTakeoff: 2550,
    maxLanding: 2550,
    emptyWeight: 1416,
    arm: { nose: 30, rear: 93, baggage: 123 },
    moments: { nose: 2210, rear: 9640, baggage: 420 }
  },
  {
    name: 'Diamond DA40',
    maxTakeoff: 2300,
    maxLanding: 2300,
    emptyWeight: 1410,
    arm: { nose: 40, rear: 87, baggage: 122 },
    moments: { nose: 2920, rear: 7900, baggage: 380 }
  }
];

function calculateDensityAltitude(pressureAlt: number, tempC: number): number {
  const standardTemp = 15 - (pressureAlt / 1000) * 2;
  const deviation = tempC - standardTemp;
  return pressureAlt + deviation * 120;
}

function calculateCG(noseWeight: number, noseArm: number, rearWeight: number, rearArm: number, baggageWeight: number, baggageArm: number, emptyWeight: number, emptyCG: number): number {
  const totalWeight = noseWeight + rearWeight + baggageWeight + emptyWeight;
  const moment = (noseWeight * noseArm) + (rearWeight * rearArm) + (baggageWeight * baggageArm) + (emptyWeight * emptyCG);
  return moment / totalWeight;
}

export default function PerformancePage() {
  const [selectedAircraft, setSelectedAircraft] = useState(aircraft[0]);
  const [noseWeight, setNoseWeight] = useState(0);
  const [rearWeight, setRearWeight] = useState(0);
  const [baggageWeight, setBaggageWeight] = useState(0);
  const [pressureAlt, setPressureAlt] = useState(0);
  const [temp, setTemp] = useState(15);
  const [result, setResult] = useState<{ densityAlt: number; cg: number; totalWeight: number; withinLimits: boolean } | null>(null);

  const handleCalculate = () => {
    const densityAlt = calculateDensityAltitude(pressureAlt, temp);
    const emptyCG = selectedAircraft.moments.nose / selectedAircraft.arm.nose * 0.9;
    const cg = calculateCG(
      noseWeight, selectedAircraft.arm.nose,
      rearWeight, selectedAircraft.arm.rear,
      baggageWeight, selectedAircraft.arm.baggage,
      selectedAircraft.emptyWeight, emptyCG
    );
    const totalWeight = noseWeight + rearWeight + baggageWeight + selectedAircraft.emptyWeight;
    const withinLimits = totalWeight <= selectedAircraft.maxTakeoff && cg > 31 && cg < 35;

    setResult({ densityAlt, cg, totalWeight, withinLimits });
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Performance</h1>
        <p className="page-subtitle">Density altitude & weight & balance</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title mb-4">
            <Plane size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Aircraft
          </h3>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Select Aircraft
            </label>
            <select 
              className="input"
              value={selectedAircraft.name}
              onChange={(e) => setSelectedAircraft(aircraft.find(a => a.name === e.target.value) || aircraft[0])}
            >
              {aircraft.map(ac => (
                <option key={ac.name} value={ac.name}>{ac.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Front Seat (lbs)
            </label>
            <input 
              type="number"
              className="input"
              value={noseWeight}
              onChange={(e) => setNoseWeight(Number(e.target.value))}
              min={0}
              max={400}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Rear Seat (lbs)
            </label>
            <input 
              type="number"
              className="input"
              value={rearWeight}
              onChange={(e) => setRearWeight(Number(e.target.value))}
              min={0}
              max={400}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Baggage (lbs)
            </label>
            <input 
              type="number"
              className="input"
              value={baggageWeight}
              onChange={(e) => setBaggageWeight(Number(e.target.value))}
              min={0}
              max={120}
            />
          </div>
        </div>

        <div className="card">
          <h3 className="card-title mb-4">
            <Calculator size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Density Altitude
          </h3>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Pressure Altitude (ft)
            </label>
            <input 
              type="number"
              className="input"
              value={pressureAlt}
              onChange={(e) => setPressureAlt(Number(e.target.value))}
              min={0}
              max={15000}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              OAT (°C)
            </label>
            <input 
              type="number"
              className="input"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              min={-40}
              max={50}
            />
          </div>

          <button className="btn btn-primary" onClick={handleCalculate} style={{ width: '100%' }}>
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="card mt-4">
          <h3 className="card-title mb-4">Results</h3>
          
          <div className="grid-3">
            <div className="stat-card">
              <div className="stat-value">{result.totalWeight}</div>
              <div className="stat-label">Total Weight (lbs)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{result.densityAlt.toFixed(0)}</div>
              <div className="stat-label">Density Altitude (ft)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: result.withinLimits ? 'var(--success)' : 'var(--error)' }}>
                {result.cg.toFixed(1)}"
              </div>
              <div className="stat-label">CG (inches)</div>
            </div>
          </div>

          <div 
            className="mt-4" 
            style={{ 
              padding: '1rem', 
              borderRadius: '0.5rem',
              background: result.withinLimits ? '#dcfce7' : '#fee2e2',
              color: result.withinLimits ? '#166534' : '#991b1b'
            }}
          >
            <strong>{result.withinLimits ? '✓ Within Limits' : '✗ Outside Limits'}</strong>
            <p className="text-sm mt-1">
              Max takeoff: {selectedAircraft.maxTakeoff} lbs | CG range: 31-35 inches
            </p>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Info size={18} style={{ color: 'var(--accent)' }} />
          <h3>Quick Reference</h3>
        </div>
        <p className="text-sm text-muted">
          Rule of thumb: Density altitude increases ~1000ft for every 10°C above standard temperature.
          Standard temperature at sea level = 15°C, decreases 2°C per 1000ft.
        </p>
      </div>
    </AppLayout>
  );
}
