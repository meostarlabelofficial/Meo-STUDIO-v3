import { useStore } from '../store/useStore';
import { Check, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const PLANS = [
  {
    name: 'Free',
    price: 'Rp0',
    period: 'selamanya',
    features: [
      '20 Mecral / hari',
      'Maksimal 5 generate / hari',
      'Resolusi hingga 720p',
      'Watermark Meo Studio',
      'Dukungan email dasar'
    ]
  },
  {
    name: 'M-Pro',
    price: 'Rp20.000',
    period: 'per bulan',
    popular: true,
    features: [
      '80 Mecral / hari',
      'Maksimal 5 generate / hari',
      'Resolusi hingga 4K',
      'Tanpa Watermark',
      'Prioritas pemrosesan AI'
    ]
  },
  {
    name: 'M-Premium',
    price: 'Rp50.000',
    period: 'per bulan',
    features: [
      '140 Mecral / hari',
      'Maksimal 5 generate / hari',
      'Resolusi hingga 4K',
      'Tanpa Watermark',
      'Akses ke Editor Lanjutan'
    ]
  },
  {
    name: 'M-Vip',
    price: 'Rp80.000',
    period: 'per bulan',
    features: [
      '240 Mecral / hari',
      'Maksimal 5 generate / hari',
      'Resolusi hingga 4K',
      'Tanpa Watermark',
      'Dukungan chat prioritas VIP'
    ]
  }
];

export default function SubscriptionPage() {
  const { userProfile } = useStore();

  const handleBuy = (planName: string) => {
    const message = encodeURIComponent(`Halo, saya ingin membeli plan ${planName} untuk akun Meo Studio saya.`);
    window.open(`https://wa.me/6283181577853?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <h1 className="text-3xl font-bold">Pilih Paket yang Sesuai</h1>
        <p className="text-neutral-400">Tingkatkan kreativitasmu dengan kuota Mecral yang lebih besar dan resolusi 4K. Pembelian dilakukan melalui konfirmasi Admin via WhatsApp.</p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/20 text-blue-400 border border-blue-800/50 rounded-full text-sm font-medium mt-4">
          <Info className="w-4 h-4" />
          Setiap user dibatasi maksimal 5 proyek (generate) per hari, apa pun plan-nya.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map(plan => (
          <div 
            key={plan.name}
            className={cn(
              "relative bg-neutral-900 border rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1",
              plan.popular ? "border-red-500 shadow-xl shadow-red-500/10" : "border-neutral-800 hover:border-neutral-600",
              userProfile?.plan === plan.name ? "ring-2 ring-blue-500 bg-blue-900/5" : ""
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 inset-x-0 flex justify-center">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Terpopuler</span>
              </div>
            )}
            {userProfile?.plan === plan.name && (
              <div className="absolute -top-3 inset-x-0 flex justify-center">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Plan Kamu</span>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span className="text-neutral-500 text-sm">/{plan.period}</span>
              </div>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(plan.name)}
              disabled={userProfile?.plan === plan.name || userProfile?.plan === 'Admin'}
              className={cn(
                "w-full py-3 rounded-lg font-bold transition-colors",
                userProfile?.plan === plan.name || userProfile?.plan === 'Admin'
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : plan.popular 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-neutral-800 hover:bg-neutral-700 text-white"
              )}
            >
              {userProfile?.plan === plan.name ? 'Sedang Aktif' : userProfile?.plan === 'Admin' ? 'Tidak Tersedia' : 'Beli via WhatsApp'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
