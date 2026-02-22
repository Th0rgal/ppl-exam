'use client';

import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../../AppLayout';
import { Play, Clock, Check, X, RotateCcw, ChevronRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import exercises from '../../../data/exercises.json';

interface DrillExercise {
  id: string;
  type: string;
  prompt: string;
  solution: string;
  hints?: string[];
  category: string;
}

const drillExercises: DrillExercise[] = [
  { id: 'ex-001', type: 'flashcard', prompt: 'RMZ', solution: 'Radio Mandatory Zone - Airspace where radio communication is required', category: 'Abbreviations', hints: ['Usually around aerodromes'] },
  { id: 'ex-002', type: 'flashcard', prompt: 'TMZ', solution: 'Transponder Mandatory Zone - Airspace requiring transponder', category: 'Abbreviations', hints: ['Usually in TMA'] },
  { id: 'ex-003', type: 'flashcard', prompt: 'CTR', solution: 'Control Zone - Controlled airspace from surface to upper limit', category: 'Abbreviations', hints: ['Class D'] },
  { id: 'ex-004', type: 'flashcard', prompt: 'TMA', solution: 'Terminal Control Area - Control area around major aerodromes', category: 'Abbreviations', hints: ['Class C'] },
  { id: 'ex-005', type: 'flashcard', prompt: 'QDM', solution: 'Magnetic bearing from aircraft to station (heading to steer TO station)', category: 'Navigation', hints: ['QDM + 180 = QDR'] },
  { id: 'ex-006', type: 'flashcard', prompt: 'QDR', solution: 'Magnetic bearing from station to aircraft', category: 'Navigation', hints: ['QDM + 180'] },
  { id: 'ex-007', type: 'flashcard', prompt: 'QFE', solution: 'Atmospheric pressure at aerodrome - altimeter reads 0', category: 'Altimetry', hints: ['Set to 0 on runway'] },
  { id: 'ex-008', type: 'flashcard', prompt: 'QNH', solution: 'Altimeter setting to give aerodrome elevation', category: 'Altimetry', hints: ['Reads altitude on ground'] },
  { id: 'ex-009', type: 'flashcard', prompt: 'VOR', solution: 'VHF Omnidirectional Range - radio navigation aid providing bearing', category: 'Navigation', hints: ['108-118 MHz'] },
  { id: 'ex-010', type: 'flashcard', prompt: 'DME', solution: 'Distance Measuring Equipment - slant range distance to station', category: 'Navigation', hints: ['Usually paired with VOR'] },
  { id: 'ex-011', type: 'flashcard', prompt: 'ILS', solution: 'Instrument Landing System - precision approach aid', category: 'Approaches', hints: ['LOC + GP'] },
  { id: 'ex-012', type: 'flashcard', prompt: 'PAPI', solution: 'Precision Approach Path Indicator - 4-light glide path', category: 'Approaches', hints: ['3W+1R = on path'] },
  { id: 'ex-013', type: 'flashcard', prompt: 'VASI', solution: 'Visual Approach Slope Indicator - 2 or 3-light system', category: 'Approaches', hints: ['White = high, Red = low'] },
  { id: 'ex-014', type: 'flashcard', prompt: 'NDB', solution: 'Non-Directional Beacon - LF/MF radio beacon', category: 'Navigation', hints: ['For ADF'] },
  { id: 'ex-015', type: 'flashcard', prompt: 'METAR', solution: 'Meteorological Aerodrome Report - routine weather report', category: 'Weather', hints: ['Routine observation'] },
  { id: 'ex-016', type: 'decode', prompt: 'LPFR 221950Z 19010KT 9999 FEW040 18/12 Q1015', solution: 'LPFR:190°@10kt,10km+,FEW4000ft,18°/12°,Q1015', category: 'METAR', hints: ['wind/vis/clouds/temp/qnh'] },
  { id: 'ex-017', type: 'decode', prompt: 'LPPR 221800Z 27025G35KT 4000 +RA BKN010 OVC025 12/10 Q1009', solution: 'LPPR:270°@25g35kt,4km,+RA,BKN1000ft,OVC2500ft,12°/10°,Q1009', category: 'METAR', hints: ['gust + rain + low ceiling'] },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DailyDrillPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [completed, setCompleted] = useState<number[]>([]);

  const dailyExercises = shuffleArray(drillExercises).slice(0, 15);

  const handleStart = () => {
    setStarted(true);
    setTotal(dailyExercises.length);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 1);
    setCompleted([...completed, currentIndex]);
    
    setTimeout(() => {
      if (currentIndex < dailyExercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setCompleted([...completed, currentIndex, -1]);
      }
    }, 500);
  };

  useEffect(() => {
    if (!started || completed.includes(-1)) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setCompleted([...completed, -1]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, completed]);

  const isDone = completed.includes(-1);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!started) {
    return (
      <AppLayout>
        <div className="page-header">
          <h1 className="page-title">Daily Drill</h1>
          <p className="page-subtitle">15 symbols + METAR decode in 25 minutes</p>
        </div>

        <div className="card mb-4">
          <h3 className="card-title mb-4">Today&apos;s Plan</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
              <span>15 Flashcards (abbreviations/symbols)</span>
              <span className="badge badge-blue">10 min</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
              <span>2 METAR Decodes</span>
              <span className="badge badge-blue">8 min</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
              <span>Review</span>
              <span className="badge badge-blue">5 min</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="stat-card">
              <div className="stat-value">15</div>
              <div className="stat-label">Exercises</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">25</div>
              <div className="stat-label">Minutes</div>
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleStart} style={{ width: '100%' }}>
            <Play size={20} /> Start Drill
          </button>
        </div>
      </AppLayout>
    );
  }

  if (isDone) {
    const percentage = Math.round((score / total) * 100);
    return (
      <AppLayout>
        <div className="page-header">
          <h1 className="page-title">Drill Complete!</h1>
        </div>

        <div className="card mb-4">
          <div className="text-center">
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: percentage >= 70 ? 'var(--success)' : 'var(--error)' }}>
              {percentage}%
            </div>
            <p className="text-xl">{score} / {total} correct</p>
            <p className="text-muted">
              Time: {25 * 60 - timeLeft}s
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/drills" className="btn btn-secondary" style={{ flex: 1 }}>
            <RotateCcw size={16} /> Retry
          </Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>
            Dashboard
          </Link>
        </div>
      </AppLayout>
    );
  }

  const current = dailyExercises[currentIndex];

  return (
    <AppLayout>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Daily Drill</h1>
          <p className="page-subtitle">
            {currentIndex + 1} / {dailyExercises.length}
          </p>
        </div>
        <div className="drill-timer" style={{ fontSize: '1.5rem', padding: '0.5rem 1rem' }}>
          <Clock size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="progress-bar mb-4">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / dailyExercises.length) * 100}%` }}
        />
      </div>

      <div className="drill-progress mb-4">
        {dailyExercises.map((_, idx) => (
          <div 
            key={idx} 
            className={`drill-dot ${idx === currentIndex ? 'current' : ''} ${completed.includes(idx) ? 'completed' : ''}`}
          />
        ))}
      </div>

      <div className="card">
        <div className="text-center mb-4">
          <span className="badge badge-blue">{current.category}</span>
        </div>
        
        <h3 className="card-title text-center mb-4" style={{ fontSize: '1.5rem' }}>
          {current.type === 'decode' ? (
            <code>{current.prompt}</code>
          ) : (
            current.prompt
          )}
        </h3>

        {showAnswer ? (
          <div>
            <div className="mt-4" style={{ 
              padding: '1.5rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: '0.5rem',
              borderLeft: '4px solid var(--accent)'
            }}>
              <p style={{ fontSize: '1.1rem' }}>{current.solution}</p>
              {current.hints && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={16} style={{ color: 'var(--accent)' }} />
                    <strong>Hint</strong>
                  </div>
                  <p className="text-muted">{current.hints[0]}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button 
                className="btn btn-secondary" 
                onClick={() => handleAnswer(false)}
                style={{ flex: 1 }}
              >
                <X size={20} /> Wrong
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleAnswer(true)}
                style={{ flex: 1 }}
              >
                <Check size={20} /> Got it
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-primary mt-4" 
            onClick={() => setShowAnswer(true)}
            style={{ width: '100%' }}
          >
            Show Answer
          </button>
        )}
      </div>
    </AppLayout>
  );
}
