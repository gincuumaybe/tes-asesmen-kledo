import { useState } from "react";
import Combobox from "./Combobox";

export default function Sidebar({ filter, provinces, regencies, districts, onChange, onReset }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const filteredRegencies = filter.province
        ? regencies.filter((r) => r.province_id === filter.province)
        : [];

    const filteredDistricts = filter.regency
        ? districts.filter((d) => d.regency_id === filter.regency)
        : [];

    return (
        <>
            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                        </svg>
                    </div>
                    <h1 className="text-sm font-bold text-slate-800">Frontend Assessment</h1>
                </div>
                <button
                    onClick={() => setMobileOpen((v) => !v)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-600"
                >
                    {mobileOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Drawer panel */}
                    <div className="relative z-50 w-72 bg-white h-full flex flex-col shadow-xl">
                        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                                </svg>
                            </div>
                            <h1 className="text-base font-bold text-slate-800 tracking-tight">Frontend Assessment</h1>
                        </div>
                        <div className="flex-1 px-5 py-6 space-y-5 overflow-y-auto">
                            <FilterContent
                                filter={filter}
                                provinces={provinces}
                                filteredRegencies={filteredRegencies}
                                filteredDistricts={filteredDistricts}
                                onChange={(name, val) => { onChange(name, val); setMobileOpen(false); }}
                                onReset={() => { onReset(); setMobileOpen(false); }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 h-screen fixed flex-col shadow-sm">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                        </svg>
                    </div>
                    <h1 className="text-base font-bold text-slate-800 tracking-tight">Frontend Assessment</h1>
                </div>
                <div className="flex-1 px-5 py-6 space-y-5 overflow-y-auto">
                    <FilterContent
                        filter={filter}
                        provinces={provinces}
                        filteredRegencies={filteredRegencies}
                        filteredDistricts={filteredDistricts}
                        onChange={onChange}
                        onReset={onReset}
                    />
                </div>
            </aside>
        </>
    );
}

function FilterContent({ filter, provinces, filteredRegencies, filteredDistricts, onChange, onReset }) {
    return (
        <>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Filter Wilayah
            </p>
            <Combobox
                label="Provinsi"
                name="province"
                value={filter.province}
                options={provinces}
                disabled={false}
                onChange={onChange}
            />
            <Combobox
                label="Kota/Kabupaten"
                name="regency"
                value={filter.regency}
                options={filteredRegencies}
                disabled={!filter.province}
                onChange={onChange}
            />
            <Combobox
                label="Kecamatan"
                name="district"
                value={filter.district}
                options={filteredDistricts}
                disabled={!filter.regency}
                onChange={onChange}
            />
            <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-500 text-blue-600 text-sm font-semibold tracking-wide hover:bg-blue-50 active:scale-95 transition-all duration-200 uppercase"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
                Reset
            </button>
        </>
    );
}