import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";

const STORAGE_KEY = "region_filter";
const INITIAL_FILTER = { province: null, regency: null, district: null };

function RegionCard({ label, name, placeholder }) {
  return (
    <div className="py-4">
      <p className="text-[11px] font-bold tracking-widest text-blue-400 uppercase mb-2">
        {label}
      </p>
      <p
        className={`text-3xl md:text-5xl font-black tracking-tight ${name ? "text-slate-900" : "text-slate-300"}`}
      >
        {name || placeholder}
      </p>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState({ provinces: [], regencies: [], districts: [] });
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_FILTER;
    } catch {
      return INITIAL_FILTER;
    }
  });

  useEffect(() => {
    fetch("/indonesia_regions.json")
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false); })
      .catch((err) => { console.error("Failed to load region data:", err); setLoading(false); });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filter));
  }, [filter]);

  const selectedProvince = data.provinces.find((p) => p.id === filter.province) || null;
  const selectedRegency = data.regencies.find((r) => r.id === filter.regency) || null;
  const selectedDistrict = data.districts.find((d) => d.id === filter.district) || null;

  function handleChange(name, value) {
    setFilter((prev) => {
      if (name === "province") return { province: value, regency: null, district: null };
      if (name === "regency") return { ...prev, regency: value, district: null };
      return { ...prev, district: value };
    });
  }

  function handleReset() { setFilter(INITIAL_FILTER); }

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Memuat data wilayah...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex bg-slate-50">
      <Sidebar
        filter={filter}
        provinces={data.provinces}
        regencies={data.regencies}
        districts={data.districts}
        onChange={handleChange}
        onReset={handleReset}
      />

      {/* Offset for desktop sidebar, top bar on mobile */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen pt-14 lg:pt-0">
        {/* Breadcrumb bar */}
        <div className="sticky top-14 lg:top-0 z-10 bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 shadow-sm">
          <Breadcrumb
            province={selectedProvince}
            regency={selectedRegency}
            district={selectedDistrict}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-10 md:py-16">
          {!selectedProvince ? (
            <div className="text-center space-y-3">
            </div>
          ) : (
            <div className="w-full max-w-xl text-center">
              <RegionCard label="Provinsi" name={selectedProvince.name} />
              <div className="flex justify-center py-1">
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
              <RegionCard label="Kota / Kabupaten" name={selectedRegency?.name} placeholder="Belum dipilih" />
              <div className="flex justify-center py-1">
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
              <RegionCard label="Kecamatan" name={selectedDistrict?.name} placeholder="Belum dipilih" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}