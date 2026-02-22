import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { SessionResult, UserProgress } from './types';

interface PPLExamDB extends DBSchema {
  sessions: {
    key: string;
    value: SessionResult;
    indexes: { 'by-timestamp': number; 'by-exercise': string };
  };
  progress: {
    key: string;
    value: UserProgress;
  };
  settings: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<PPLExamDB>> | null = null;

export async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<PPLExamDB>('ppl-exam-db', 1, {
      upgrade(db) {
        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
        sessionStore.createIndex('by-timestamp', 'timestamp');
        sessionStore.createIndex('by-exercise', 'exerciseId');
        db.createObjectStore('progress', { keyPath: 'exerciseId' });
        db.createObjectStore('settings', { keyPath: 'key' });
      },
    });
  }
  return dbPromise;
}

export async function saveSessionResult(result: SessionResult) {
  const db = await getDB();
  await db.put('sessions', result);
  
  const progress = await db.get('progress', result.exerciseId);
  if (progress) {
    progress.timesAttempted += 1;
    if (result.correct) progress.timesCorrect += 1;
    progress.lastAttempt = result.timestamp;
    progress.mastery = progress.timesCorrect / progress.timesAttempted;
    if (result.errors) progress.errors = [...new Set([...progress.errors, ...result.errors])];
    await db.put('progress', progress);
  } else {
    await db.put('progress', {
      exerciseId: result.exerciseId,
      timesAttempted: 1,
      timesCorrect: result.correct ? 1 : 0,
      lastAttempt: result.timestamp,
      mastery: result.correct ? 1 : 0,
      errors: result.errors || [],
    });
  }
}

export async function getProgress(): Promise<UserProgress[]> {
  const db = await getDB();
  return db.getAll('progress');
}

export async function getRecentSessions(limit = 10): Promise<SessionResult[]> {
  const db = await getDB();
  const sessions = await db.getAllFromIndex('sessions', 'by-timestamp');
  return sessions.reverse().slice(0, limit);
}

export async function getStreak(): Promise<number> {
  const sessions = await getRecentSessions(100);
  if (sessions.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentDate = today.getTime();
  
  for (const session of sessions) {
    const sessionDate = new Date(session.timestamp);
    sessionDate.setHours(0, 0, 0, 0);
    
    if (sessionDate.getTime() === currentDate) {
      streak++;
      currentDate -= 86400000;
    } else if (sessionDate.getTime() < currentDate) {
      break;
    }
  }
  
  return streak;
}

export async function getErrorStats(): Promise<{ exerciseId: string; errorCount: number }[]> {
  const progress = await getProgress();
  return progress
    .filter(p => p.errors.length > 0)
    .map(p => ({ exerciseId: p.exerciseId, errorCount: p.errors.length }))
    .sort((a, b) => b.errorCount - a.errorCount)
    .slice(0, 10);
}

export async function getSettings(key: string): Promise<any> {
  const db = await getDB();
  const setting = await db.get('settings', key);
  return setting?.value;
}

export async function saveSettings(key: string, value: any) {
  const db = await getDB();
  await db.put('settings', { key, value });
}

export async function exportData() {
  const db = await getDB();
  const sessions = await db.getAll('sessions');
  const progress = await db.getAll('progress');
  return { sessions, progress, exportDate: new Date().toISOString() };
}
