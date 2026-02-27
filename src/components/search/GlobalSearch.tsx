import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, User, Bell, Calendar, GraduationCap, FileText } from 'lucide-react';
import { searchableContent } from '@/data/extendedData';

const typeIcons: Record<string, typeof Search> = {
  Course: BookOpen,
  Faculty: User,
  Notice: Bell,
  Event: Calendar,
  Alumni: GraduationCap,
  Page: FileText,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.length > 1
    ? searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const grouped = results.reduce<Record<string, typeof results>>((acc, item) => {
    (acc[item.type] = acc[item.type] || []).push(item);
    return acc;
  }, {});

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-primary/20 text-primary font-semibold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 animate-fade-in">
        <div className="feature-card overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search courses, faculty, notices, events..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {query.length > 1 && results.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No results found for "{query}"</p>
            )}

            {Object.entries(grouped).map(([type, items]) => {
              const Icon = typeIcons[type] || Search;
              return (
                <div key={type} className="mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">{type}</p>
                  {items.map(item => (
                    <button
                      key={item.title + item.path}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-muted transition-colors"
                    >
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{highlightMatch(item.title)}</span>
                    </button>
                  ))}
                </div>
              );
            })}

            {query.length <= 1 && (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Start typing to search...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">ESC</kbd> to close</span>
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
