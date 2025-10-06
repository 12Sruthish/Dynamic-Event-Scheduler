import React from 'react'
import ScheduleBuilder from './components/ScheduleBuilder'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Dynamic Event Scheduler — Demo (Phase 1)</h1>
      <ScheduleBuilder />
    </div>
  )
}
