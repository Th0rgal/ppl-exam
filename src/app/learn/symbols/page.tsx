import AppLayout from '../../AppLayout';
import officialSymbols from '@/data/official_symbols.json';
import officialSources from '@/data/official_sources.json';

type OfficialSymbol = {
  id: string;
  name: string;
  category: string;
  image: string;
  sourceImage: string;
  sourcePage: string;
};

const symbols = officialSymbols as OfficialSymbol[];
const sources = officialSources.pages;

function groupByCategory(items: OfficialSymbol[]) {
  const grouped = new Map<string, OfficialSymbol[]>();
  for (const item of items) {
    const bucket = grouped.get(item.category);
    if (bucket) {
      bucket.push(item);
      continue;
    }
    grouped.set(item.category, [item]);
  }
  return Array.from(grouped.entries());
}

export default function SymbolsPage() {
  const groupedSymbols = groupByCategory(symbols);

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Official Chart Symbols (GEN 2.3)</h1>
        <p className="page-subtitle">
          Official NAV Portugal eAIP image assets extracted from GEN 2.3 (current AIRAC cycle)
        </p>
      </div>

      <div className="card mb-4" style={{ padding: '1rem 1.25rem' }}>
        <h3 className="card-title mb-2">Sources Used (Verifiable)</h3>
        <div className="flex flex-col gap-2">
          {sources.map((source: any) => (
            <div key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
              <p className="text-sm text-muted">{source.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {groupedSymbols.map(([category, items]) => (
        <section key={category} className="mb-4">
          <h3 className="card-title mb-3">{category}</h3>
          <div className="grid-3">
            {items.map((symbol) => (
              <div key={symbol.id} className="card" style={{ padding: '1rem' }}>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={symbol.image}
                    alt={symbol.name}
                    loading="lazy"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      background: 'var(--bg-secondary)',
                      padding: '0.25rem',
                    }}
                  />
                  <h4 style={{ margin: 0 }}>{symbol.name}</h4>
                </div>
                <p className="text-sm text-muted">Source section: GEN 2.3 / {category}</p>
                <a
                  href={symbol.sourceImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  Open official image source
                </a>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="card" style={{ padding: '1rem 1.25rem' }}>
        <h3 className="card-title mb-2">Related Official Links</h3>
        <p className="text-sm text-muted mb-2">
          Similar references used while extracting and validating symbols and related VFR chart context:
        </p>
        <div className="flex flex-col gap-2">
          {(sources[2]?.sampleCharts ?? []).slice(0, 5).map((chart: any) => (
            <a key={chart.pdf} href={chart.pdf} target="_blank" rel="noopener noreferrer" className="text-sm">
              {chart.title}
            </a>
          ))}
          {(sources[1]?.extractedHeadings ?? []).slice(0, 3).map((heading: string) => (
            <p key={heading} className="text-sm text-muted">
              ENR 1.2 topic: {heading}
            </p>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
