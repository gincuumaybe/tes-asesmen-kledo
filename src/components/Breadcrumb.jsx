export default function Breadcrumb({ province, regency, district }) {
    const crumbs = [
        "Indonesia",
        province?.name,
        regency?.name,
        district?.name,
    ].filter(Boolean);

    return (
        <nav className="breadcrumb flex items-center gap-1.5 text-sm flex-wrap p-2">
            {crumbs.map((label, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-slate-300">›</span>}
                    <span className={i === crumbs.length - 1 ? "text-blue-600 font-semibold" : "text-slate-400"}>
                        {label}
                    </span>
                </span>
            ))}
        </nav>
    );
}