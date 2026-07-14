import { Scissors, Play, Settings2, Download, Type, Music } from 'lucide-react';

export default function EditorPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold mb-1">Video Editor</h1>
          <p className="text-sm text-neutral-400">Edit klip, tambahkan teks, dan sesuaikan efek.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md font-bold text-white transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex-1 min-h-[400px] flex gap-4">
        {/* Main Canvas & Controls */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 bg-black border border-neutral-800 rounded-xl relative overflow-hidden flex items-center justify-center">
             <div className="w-[300px] h-[533px] bg-neutral-900 border border-neutral-800 relative shadow-2xl flex items-center justify-center">
                <span className="text-neutral-600 font-medium">9:16 Canvas (Preview)</span>
                {/* Simulated text overlay */}
                <div className="absolute bottom-20 inset-x-4 text-center">
                  <span className="bg-yellow-400 text-black px-2 py-1 font-bold text-sm transform -rotate-2 inline-block">HOOK KEREN DI SINI</span>
                </div>
             </div>
             
             {/* Play controls overlay */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-neutral-900/80 px-4 py-2 rounded-full backdrop-blur-sm">
                <button className="text-white hover:text-red-400"><Play className="fill-current w-5 h-5" /></button>
                <div className="text-xs text-neutral-300 font-mono">00:12 / 00:45</div>
             </div>
          </div>
        </div>

        {/* Right Sidebar Tools */}
        <div className="w-80 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col shrink-0 overflow-hidden">
          <div className="flex border-b border-neutral-800 text-sm font-medium text-neutral-400">
            <button className="flex-1 py-3 text-white border-b-2 border-red-500 flex items-center justify-center gap-2">
              <Type className="w-4 h-4" /> Teks
            </button>
            <button className="flex-1 py-3 hover:text-white flex items-center justify-center gap-2">
              <Music className="w-4 h-4" /> Audio
            </button>
            <button className="flex-1 py-3 hover:text-white flex items-center justify-center gap-2">
              <Settings2 className="w-4 h-4" /> Filter
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2">Teks Subtitle</label>
              <textarea 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-md p-3 text-sm focus:outline-none focus:border-red-500 resize-none h-24"
                defaultValue="HOOK KEREN DI SINI"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2">Font</label>
              <button className="w-full flex items-center justify-between p-3 bg-neutral-950 border border-neutral-700 rounded-md text-sm hover:border-neutral-500 transition-colors">
                <span>Inter (Default)</span>
                <span className="text-blue-400 text-xs font-semibold">Cari Font</span>
              </button>
            </div>
            
             <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2">Gaya Text</label>
              <div className="grid grid-cols-4 gap-2">
                <div className="aspect-square bg-yellow-400 rounded-md border border-neutral-700"></div>
                <div className="aspect-square bg-white rounded-md border border-neutral-700"></div>
                <div className="aspect-square bg-red-500 rounded-md border border-neutral-700"></div>
                <div className="aspect-square bg-blue-500 rounded-md border border-neutral-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Editor */}
      <div className="h-48 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shrink-0 flex flex-col">
        <div className="flex items-center gap-4 mb-2">
          <Scissors className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-medium text-neutral-400">Timeline Editor</span>
        </div>
        
        <div className="flex-1 relative border border-neutral-800 rounded bg-neutral-950 overflow-hidden">
          {/* Playhead */}
          <div className="absolute top-0 bottom-0 w-px bg-red-500 left-1/3 z-10">
            <div className="w-3 h-3 bg-red-500 rounded-sm -translate-x-1.5 -translate-y-1"></div>
          </div>
          
          {/* Tracks */}
          <div className="absolute inset-0 flex flex-col p-2 gap-2">
            {/* Video Track */}
            <div className="h-10 bg-blue-900/30 border border-blue-800/50 rounded flex items-center px-2 w-[80%] mx-auto">
              <Film className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-xs text-blue-400 font-medium truncate">source_video.mp4</span>
            </div>
            {/* Text Track */}
            <div className="h-8 bg-yellow-900/30 border border-yellow-800/50 rounded flex items-center px-2 w-[30%] ml-[25%]">
              <Type className="w-3 h-3 text-yellow-400 mr-2" />
              <span className="text-xs text-yellow-400 font-medium truncate">HOOK KEREN...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
