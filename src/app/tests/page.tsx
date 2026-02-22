'use client';

import { useState } from 'react';
import AppLayout from '../AppLayout';
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Play,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  reference: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'In Portugal, what is the minimum VMC visibility outside controlled airspace over sea below 3000ft?',
    options: ['3000m', '5000m', '8000m', '10km'],
    correct: 1,
    explanation: 'According to ENR 1.2, VMC minima in Class G is 5000m visibility and 1000ft cloud clear when below 3000ft AMSL over sea.',
    reference: 'NAV Portugal ENR 1.2'
  },
  {
    id: '2',
    question: 'What does QDM represent?',
    options: [
      'True bearing from aircraft to station',
      'Magnetic bearing from aircraft to station',
      'Distance to station',
      'Magnetic variation'
    ],
    correct: 1,
    explanation: 'QDM is the magnetic bearing from the aircraft to the station - essentially the heading to steer TO the station.',
    reference: 'NAV Portugal GEN 2.2'
  },
  {
    id: '3',
    question: 'Which statement about ILS Category II is correct?',
    options: [
      'DH 100ft, RVR 300m',
      'DH 200ft, RVR 550m',
      'No DH required',
      'DH 50ft, RVR 200m'
    ],
    correct: 0,
    explanation: 'ILS CAT II requires Decision Height of 100ft and Runway Visual Range of 300m.',
    reference: 'NAV Portugal GEN 2.3'
  },
  {
    id: '4',
    question: 'What is the transition altitude in Portuguese airspace?',
    options: ['3000ft', '5000ft', '10000ft', 'FL100'],
    correct: 1,
    explanation: 'The standard transition altitude in Portugal is 5000ft QNH.',
    reference: 'NAV Portugal ENR 1.1'
  },
  {
    id: '5',
    question: 'A PAPI showing 3 white and 1 red light indicates:',
    options: [
      'Above glide path',
      'Below glide path',
      'On correct glide path',
      'Unable to determine'
    ],
    correct: 2,
    explanation: '3 white + 1 red = on the correct 3° glide path. All white = too high, all red = too low.',
    reference: 'NAV Portugal GEN 2.3'
  },
  {
    id: '6',
    question: 'In a TAF, what does BECMG indicate?',
    options: [
      'Temporary change',
      'Becoming - gradual change',
      'From a specific time',
      'End of forecast'
    ],
    correct: 1,
    explanation: 'BECMG (Becoming) indicates a gradual change expected over a period of time. TEMPO indicates temporary fluctuations.',
    reference: 'IPMA TAF Format'
  },
  {
    id: '7',
    question: 'What frequency is Lisbon Information (approximate)?',
    options: ['118.00 MHz', '124.85 MHz', '131.50 MHz', '121.50 MHz'],
    correct: 1,
    explanation: 'Lisbon Information (Porto Sector) is 124.85 MHz. Check GEN 2.4 for complete frequency list.',
    reference: 'NAV Portugal GEN 2.4'
  },
  {
    id: '8',
    question: 'RMZ stands for:',
    options: [
      'Radar Military Zone',
      'Radio Mandatory Zone',
      'Runway Management Zone',
      'Reduced Minimum Zone'
    ],
    correct: 1,
    explanation: 'RMZ = Radio Mandatory Zone, where continuous two-way radio communication is required.',
    reference: 'NAV Portugal ENR 1.2'
  },
  {
    id: '9',
    question: 'What is the VFR cruising level for magnetic course 045°?',
    options: ['FL35', 'FL45', 'FL50', 'FL55'],
    correct: 0,
    explanation: 'Odd flight levels (3, 5, 7...) for magnetic courses 000-179°. 045° = odd = FL35 (3500ft).',
    reference: 'NAV Portugal ENR 1.2'
  },
  {
    id: '10',
    question: 'A NOTAM with "Q" code QEFYQ means:',
    options: [
      'Aerodrome closed',
      'Runway closed',
      'Airspace restricted',
      'Navigation aid unserviceable'
    ],
    correct: 3,
    explanation: 'QEFYQ indicates navigation aid unserviceable. Check NOTAM Q-Code table for details.',
    reference: 'AIS NOTAM Guide'
  }
];

export default function TestsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null));
  const [examStarted, setExamStarted] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleCheck = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers(new Array(sampleQuestions.length).fill(null));
  };

  const score = answers.reduce((acc: number, ans, idx) => {
    return acc + (ans === sampleQuestions[idx].correct ? 1 : 0);
  }, 0);

  if (!examStarted) {
    return (
      <AppLayout>
        <div className="page-header">
          <h1 className="page-title">Tests</h1>
          <p className="page-subtitle">Exam mode with timed sessions</p>
        </div>

        <div className="card mb-4">
          <h3 className="card-title mb-4">Quick Test - 10 Questions</h3>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} />
              <span>10 questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} />
              <span>Immediate feedback</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setExamStarted(true)}>
            <Play size={16} /> Start Test
          </button>
        </div>

        <div className="grid-2">
          <div className="card">
            <h3 className="card-title mb-4">Recent Sessions</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                <span>10 QCM - METAR/TAF</span>
                <span className="badge badge-green">90%</span>
              </div>
              <div className="flex items-center justify-between" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                <span>10 QCM - Airspace</span>
                <span className="badge badge-green">80%</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title mb-4">Weak Topics</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>NOTAM Q-Codes</span>
                <span className="tag tag-error">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ILS Categories</span>
                <span className="tag tag-warning">75%</span>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <AppLayout>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Test in Progress</h1>
          <p className="page-subtitle">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </p>
        </div>
        <div className="drill-timer" style={{ fontSize: '1.5rem', padding: '0.5rem 1rem' }}>
          15:00
        </div>
      </div>

      <div className="progress-bar mb-4">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
        />
      </div>

      <div className="drill-progress mb-4">
        {answers.map((ans, idx) => (
          <div 
            key={idx} 
            className={`drill-dot ${idx === currentQuestion ? 'current' : ''} ${ans !== null ? (ans === sampleQuestions[idx].correct ? 'completed' : 'incorrect') : ''}`}
            onClick={() => {
              setCurrentQuestion(idx);
              setSelectedAnswer(ans);
              setShowResult(false);
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      <div className="card">
        <h3 className="card-title mb-4">{question.question}</h3>
        
        <div className="flex flex-col gap-2">
          {question.options.map((option, idx) => (
            <div
              key={idx}
              className={`quiz-option ${selectedAnswer === idx ? 'selected' : ''} ${
                showResult 
                  ? idx === question.correct 
                    ? 'correct' 
                    : selectedAnswer === idx 
                      ? 'incorrect' 
                      : ''
                  : ''
              }`}
              onClick={() => handleAnswer(idx)}
            >
              <div className="flex items-center gap-3">
                <span style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
                {showResult && idx === question.correct && (
                  <CheckCircle size={20} style={{ marginLeft: 'auto', color: 'var(--success)' }} />
                )}
                {showResult && selectedAnswer === idx && idx !== question.correct && (
                  <XCircle size={20} style={{ marginLeft: 'auto', color: 'var(--error)' }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {showResult && (
          <div className="mt-4" style={{ 
            padding: '1rem', 
            background: 'var(--bg-secondary)', 
            borderRadius: '0.5rem',
            borderLeft: '4px solid var(--accent)'
          }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={18} style={{ color: 'var(--accent)' }} />
              <strong>Explanation</strong>
            </div>
            <p>{question.explanation}</p>
            <p className="text-sm text-muted mt-2">Reference: {question.reference}</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={currentQuestion === 0}>
            Previous
          </button>
          
          {!showResult ? (
            <button className="btn btn-primary" onClick={handleCheck} disabled={selectedAnswer === null}>
              Check
            </button>
          ) : currentQuestion < sampleQuestions.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <Link href="/tests/results" className="btn btn-primary">
              View Results
            </Link>
          )}
        </div>
      </div>

      {currentQuestion === sampleQuestions.length - 1 && showResult && (
        <div className="card mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4>Current Score</h4>
              <p className="text-muted">{score} / {sampleQuestions.length} correct</p>
            </div>
            <button className="btn btn-secondary" onClick={handleRestart}>
              <RotateCcw size={16} /> Restart
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
