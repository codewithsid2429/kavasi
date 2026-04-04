'use client';

export default function AdminContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Content Control</h1>
      <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Hero Text</h2>
        <form className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm mb-1">Headline</label>
            <input type="text" defaultValue="Build Smart Digital Systems with AI & Web Solutions" className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Subheadline</label>
            <textarea rows={3} defaultValue="KAVASI transforms your vision into reality. We build highly scalable apps, automated workflows, and immersive web experiences." className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <button type="button" className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-neutral-200">
            Save Changes (Demo Mode)
          </button>
        </form>
      </div>
    </div>
  );
}
