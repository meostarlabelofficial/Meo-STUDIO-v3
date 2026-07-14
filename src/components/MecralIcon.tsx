export default function MecralIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" className="fill-blue-600 text-blue-600" />
      <path d="M12 2a10 10 0 0 1 10 10" className="stroke-red-500" strokeWidth="2.5" />
      <path d="M8 12h8" className="stroke-white" />
      <path d="M12 8v8" className="stroke-white" />
      <circle cx="12" cy="12" r="3" className="fill-white stroke-none" />
      <path d="M12 10.5l1.5 3h-3z" className="fill-red-500 stroke-none" />
    </svg>
  );
}
