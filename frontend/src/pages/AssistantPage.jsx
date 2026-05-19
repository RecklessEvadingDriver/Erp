import { useState } from 'react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I can help with attendance, fees, and timetable insights.' }]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: q }, { role: 'assistant', text: `AI assistant placeholder: I understood "${q}".` }]);
    setInput('');
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-1 text-lg font-semibold">AI Chatbot Assistant</h2>
      <p className="mb-3 text-sm text-slate-500">Ask for reports, trend summaries, fee alerts, and attendance insights.</p>
      <div className="mb-3 h-80 space-y-2 overflow-auto rounded-lg border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-950/30">
        {messages.map((m, i) => (
          <div key={i} className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${m.role === 'user' ? 'ml-10 bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'mr-10 bg-white dark:bg-slate-800'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about reports, attendance, fees..."
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-600/25" onClick={send}>Send</button>
      </div>
    </div>
  );
}
