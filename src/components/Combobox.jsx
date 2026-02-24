import { useState, useEffect, useRef } from "react";

const iconMap = {
    province: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
    ),
    regency: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
        </svg>
    ),
    district: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        </svg>
    ),
};

export default function Combobox({ label, name, value, options, disabled, onChange }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    const selected = options.find((o) => o.id === value);
    const filtered = query
        ? options.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
        : options;

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1.5 px-0.5">
                {label}
            </p>
            <button
                type="button"
                name={name}
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                className={[
                    "w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200",
                    disabled
                        ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                        : "bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-sm cursor-pointer",
                    open ? "border-blue-400 ring-2 ring-blue-100 shadow-sm" : "",
                ].join(" ")}
            >
                <span className={disabled ? "text-slate-300" : "text-slate-400"}>
                    {iconMap[name]}
                </span>
                <span className="flex-1 text-left truncate">
                    {selected
                        ? selected.name
                        : <span className="text-slate-400">Pilih {label}</span>
                    }
                </span>
                <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Cari..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
                        />
                    </div>
                    <ul className="max-h-48 overflow-y-auto py-1">
                        {filtered.length === 0 && (
                            <li className="px-3 py-2 text-sm text-slate-400 text-center">
                                Tidak ditemukan
                            </li>
                        )}
                        {filtered.map((opt) => (
                            <li
                                key={opt.id}
                                onClick={() => { onChange(name, opt.id); setOpen(false); setQuery(""); }}
                                className={[
                                    "flex items-center gap-2 px-3.5 py-2 text-sm cursor-pointer transition-colors duration-100",
                                    opt.id === value
                                        ? "bg-blue-50 text-blue-700 font-medium"
                                        : "text-slate-700 hover:bg-slate-50",
                                ].join(" ")}
                            >
                                {opt.id === value ? (
                                    <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className="w-3.5" />
                                )}
                                {opt.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}