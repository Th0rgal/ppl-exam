'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../AppLayout';
import Link from 'next/link';
import { BookOpen, Search, ChevronRight, ArrowRight, RotateCcw, Check, X } from 'lucide-react';
import glossary from '../../data/glossary.json';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(glossary.map((g: any) => g.category)));

  const filtered = glossary.filter((g: any) => {
    const matchesSearch = !search || 
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || g.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Glossary</h1>
        <p className="page-subtitle">Quick reference for aviation terms</p>
      </div>

      <div className="search-bar mb-4">
        <Search size={20} />
        <input 
          type="text" 
          className="input" 
          placeholder="Search terms..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '3rem' }}
        />
      </div>

      <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
        <button 
          className={`btn ${!category ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCategory(null)}
        >
          All ({glossary.length})
        </button>
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((item: any) => (
          <div key={item.term} className="card" style={{ padding: '1rem' }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>{item.term}</h3>
                <p className="text-muted">{item.definition}</p>
                <div className="flex gap-2 mt-2">
                  <span className="tag">{item.category}</span>
                  {item.related?.map((r: string) => (
                    <span key={r} className="tag tag-blue">{r}</span>
                  ))}
                </div>
              </div>
              {item.references?.[0] && (
                <a 
                  href={`https://ais.nav.pt/aip/`}
                  target="_blank"
                  className="btn btn-secondary btn-sm"
                >
                  Source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
