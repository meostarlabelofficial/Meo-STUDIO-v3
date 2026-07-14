import { Mail, Send, Play } from 'lucide-react';

export default function ContactAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hubungi Admin</h1>
        <p className="text-neutral-400">Punya pertanyaan atau kendala? Hubungi tim Meo Studio melalui saluran resmi kami.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <a 
          href="https://wa.me/6283181577853" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-4 p-6 hover:bg-neutral-800 transition-colors border-b border-neutral-800"
        >
          <div className="w-12 h-12 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">WhatsApp (Fast Response)</h3>
            <p className="text-sm text-neutral-400">+62 831-8157-7853</p>
          </div>
        </a>

        <a 
          href="#"
          className="flex items-center gap-4 p-6 hover:bg-neutral-800 transition-colors border-b border-neutral-800"
        >
          <div className="w-12 h-12 bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Telegram</h3>
            <p className="text-sm text-neutral-400">@meostudio_support</p>
          </div>
        </a>

        <a 
          href="#"
          className="flex items-center gap-4 p-6 hover:bg-neutral-800 transition-colors border-b border-neutral-800"
        >
          <div className="w-12 h-12 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Email</h3>
            <p className="text-sm text-neutral-400">support@meostudio.com</p>
          </div>
        </a>

        <a 
          href="#"
          className="flex items-center gap-4 p-6 hover:bg-neutral-800 transition-colors"
        >
          <div className="w-12 h-12 bg-neutral-800 text-white rounded-full flex items-center justify-center shrink-0">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">TikTok Resmi</h3>
            <p className="text-sm text-neutral-400">@meostudio.id</p>
          </div>
        </a>
      </div>
    </div>
  );
}
