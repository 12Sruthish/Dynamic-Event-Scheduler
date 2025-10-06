            import React, { useState } from 'react';
            import axios from 'axios';

            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

            export default function ScheduleBuilder() {
              const [sessionsText, setSessionsText] = useState(`[
  {"id": "s1", "title": "Talk A", "start": 9, "end": 10, "score": 1},
  {"id": "s2", "title": "Talk B", "start": 9.5, "end": 11, "score": 1},
  {"id": "s3", "title": "Talk C", "start": 10.5, "end": 11.5, "score": 1},
  {"id": "s4", "title": "Talk D", "start": 11, "end": 12, "score": 1}
]`);
              const [optimized, setOptimized] = useState([]);

              async function optimize() {
                try {
                  const sessions = JSON.parse(sessionsText);
                  const res = await axios.post(`${API_BASE}/schedule/optimize`, { sessions });
                  setOptimized(res.data.optimized || []);
                } catch (err) {
                  alert('Error: ' + (err.response?.data?.error || err.message));
                }
              }

              return (
                <div>
                  <p>Paste sessions JSON (start/end can be numbers like 9, 9.5, 10.25):</p>
                  <textarea value={sessionsText} onChange={e=>setSessionsText(e.target.value)} rows={12} cols={80} />
                  <div style={{ marginTop: 10 }}>
                    <button onClick={optimize} style={{ padding: '8px 12px' }}>Optimize Schedule</button>
                  </div>

                  <h3>Optimized (selected) sessions:</h3>
                  <ul>
                    {optimized.map(s => (
                      <li key={s.id}>{s.title} — {s.start} to {s.end} (score: {s.score})</li>
                    ))}
                  </ul>
                </div>
              )
            }
