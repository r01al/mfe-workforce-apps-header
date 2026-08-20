import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Bell, ChevronRight, Moon, Search, Sun } from 'lucide-react';
import { getTheme, setTheme, type ThemeMode } from '@r01al/mfe-workforce-common-client';
import { useLocation, useNavigate } from 'react-router-dom';
import './header.css';

function resolveTitle(pathname: string): string {
	if (pathname.startsWith('/calendar')) return 'Team calendar';
	if (pathname.startsWith('/settings')) return 'Settings';
	if (pathname.startsWith('/workers/')) return 'Worker profile';
	if (pathname.startsWith('/workers')) return 'Workers';
	return 'Overview';
}

export default function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [theme, updateTheme] = useState<ThemeMode>(getTheme);
	const [query, setQuery] = useState('');
	const title = useMemo(() => resolveTitle(pathname), [pathname]);

	useEffect(() => {
		const onTheme = (event: Event) => updateTheme((event as CustomEvent<ThemeMode>).detail);
		window.addEventListener('workforce:theme', onTheme);
		return () => window.removeEventListener('workforce:theme', onTheme);
	}, []);

	const toggleTheme = () => {
		const next = theme === 'light' ? 'dark' : 'light';
		setTheme(next);
		updateTheme(next);
	};

	const search = (event: FormEvent) => {
		event.preventDefault();
		if (query.trim()) navigate(`/workers?search=${encodeURIComponent(query.trim())}`);
	};

	return (
		<div className="header-content">
			<div className="page-context">
				<div className="eyebrow">
					<span>Workforce</span><ChevronRight size={10} /><span>Operations</span>
				</div>
				<h1 className="header-title">{title}</h1>
			</div>

			<div className="header-actions">
				<form className="header-search" role="search" onSubmit={search}>
					<Search size={14} aria-hidden="true" />
					<input className="input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team…" aria-label="Search team" />
				</form>
				<button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
					{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
				</button>
				<button className="icon-button" type="button" aria-label="Notifications">
					<Bell size={15} /><span className="notification-dot" />
				</button>
				<span className="header-divider" />
				<div className="current-user">
					<span className="avatar avatar--sm" style={{ '--avatar': '#6757d9' } as React.CSSProperties}>AD</span>
					<span className="user-meta"><strong>Alex Doe</strong><span>Administrator</span></span>
				</div>
			</div>
		</div>
	);
}
