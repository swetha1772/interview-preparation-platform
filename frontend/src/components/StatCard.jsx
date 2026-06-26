function StatCard({
  title,
  value
}) {
  return (
    <div className="
      bg-gradient-to-br
      from-slate-900
      to-slate-800
      border
      border-slate-700
      hover:border-cyan-500/50
      rounded-xl
      p-6
      transition-all
      duration-200
      hover:shadow-lg
      hover:shadow-cyan-500/10
      cursor-pointer
      hover:scale-105
    ">

      <p className="text-slate-400 text-sm font-medium">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-cyan-400 mt-3">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;