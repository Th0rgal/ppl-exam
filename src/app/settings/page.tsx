'use client';

import { useState } from 'react';
import AppLayout from '../AppLayout';
import { 
  Settings as SettingsIcon, 
  Plane, 
  Download, 
  Upload, 
  Trash2,
  Database,
  MapPin
} from 'lucide-react';

const aerodromes = [
  { code: 'LPFR', name: 'Faro', region: 'South' },
  { code: 'LPPR', name: 'Porto', region: 'North' },
  { code: 'LPMA', name: 'Madeira', region: 'Madeira' },
  { code: 'LPPS', name: 'Lisbon', region: 'Central' },
  { code: 'LPBJ', name: 'Beja', region: 'South' },
];

const aircraft = [
  { id: 'c152', name: 'Cessna 152' },
  { id: 'pa28', name: 'Piper PA-28' },
  { id: 'da40', name: 'Diamond DA40' },
  { id: 'dr400', name: 'Robin DR400' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    baseAerodrome: 'LPFR',
    aircraft: 'da40',
    units: 'metric',
    magneticVariation: -7,
    theme: 'light',
    dailyGoal: 25,
  });

  const handleSave = () => {
    localStorage.setItem('ppl-settings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  const handleExport = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ppl-exam-export.json';
    a.click();
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your learning environment</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title mb-4">
            <Plane size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Flight Profile
          </h3>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Base Aerodrome
            </label>
            <select 
              className="input"
              value={settings.baseAerodrome}
              onChange={(e) => setSettings({ ...settings, baseAerodrome: e.target.value })}
            >
              {aerodromes.map((ad) => (
                <option key={ad.code} value={ad.code}>
                  {ad.code} - {ad.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-muted mt-1">
              Used for circuit practice and default scenarios
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Aircraft Type
            </label>
            <select 
              className="input"
              value={settings.aircraft}
              onChange={(e) => setSettings({ ...settings, aircraft: e.target.value })}
            >
              {aircraft.map((ac) => (
                <option key={ac.id} value={ac.id}>
                  {ac.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-muted mt-1">
              Used for performance calculations
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Units
            </label>
            <div className="flex gap-2">
              <button 
                className={`btn ${settings.units === 'metric' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSettings({ ...settings, units: 'metric' })}
              >
                Metric (m, km, hPa)
              </button>
              <button 
                className={`btn ${settings.units === 'imperial' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSettings({ ...settings, units: 'imperial' })}
              >
                Imperial (ft, nm, inHg)
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Magnetic Variation
            </label>
            <input 
              type="number" 
              className="input"
              value={settings.magneticVariation}
              onChange={(e) => setSettings({ ...settings, magneticVariation: parseInt(e.target.value) })}
            />
            <p className="text-sm text-muted mt-1">
              For {settings.baseAerodrome} region (Portugal ~{-7}°W)
            </p>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title mb-4">
            <SettingsIcon size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Learning
          </h3>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Daily Training Goal
            </label>
            <input 
              type="range" 
              min="15" 
              max="60" 
              step="5"
              value={settings.dailyGoal}
              onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) })}
              style={{ width: '100%' }}
            />
            <div className="flex justify-between text-sm text-muted">
              <span>15 min</span>
              <span>{settings.dailyGoal} min</span>
              <span>60 min</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2" style={{ display: 'block' }}>
              Theme
            </label>
            <div className="flex gap-2">
              <button 
                className={`btn ${settings.theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSettings({ ...settings, theme: 'light' })}
              >
                Light
              </button>
              <button 
                className={`btn ${settings.theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
              >
                Dark
              </button>
              <button 
                className={`btn ${settings.theme === 'system' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSettings({ ...settings, theme: 'system' })}
              >
                System
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <h3 className="card-title mb-4">
          <Database size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Data Management
        </h3>
        
        <div className="flex gap-4">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} /> Export Data
          </button>
          <button className="btn btn-secondary">
            <Upload size={16} /> Import Data
          </button>
          <button className="btn btn-error">
            <Trash2 size={16} /> Clear Progress
          </button>
        </div>
        
        <p className="text-sm text-muted mt-4">
          Export includes: progress, errors, settings. Does not include uploaded documents.
        </p>
      </div>

      <div className="card mt-4">
        <h3 className="card-title mb-4">Anki Export</h3>
        <p className="text-muted mb-4">
          Generate an Anki deck from your wrong answers and weak areas
        </p>
        <button className="btn btn-primary">
          <Download size={16} /> Export to Anki (.apkg)
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </AppLayout>
  );
}
