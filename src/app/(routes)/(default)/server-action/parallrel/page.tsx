'use client'
import { useState } from 'react'
import { A, B, C, callEfficient, D, E, F, G } from '@/actions/server-actions'

export default function ServerActionQueueDemo() {
  const [elapsed, setElapsed] = useState<number | null>(null)
  const [elapsedEfficient, setElapsedEfficient] = useState<number | null>(null)

  async function run() {
    const started = performance.now()
    // ⇩ Even though these are fired "concurrently", Next.js queues them
    //    so they execute A → B → … → G (total ≈ 2 450 ms).
    await Promise.all([A(), B(), C(), D(), E(), F(), G()])

    setElapsed(performance.now() - started)
  }

  async function runEfficient() {
    const started = performance.now()
    await callEfficient()
    setElapsedEfficient(performance.now() - started)
  }

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-xl font-bold">
        Server Action Sequential‑Execution Demo
      </h1>
      <button
        onClick={run}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Run 7 Server Actions
      </button>
      <button
        onClick={runEfficient}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Run 7 Server Actions Efficiently
      </button>
      {elapsed !== null && (
        <p>
          Total time: <strong>{elapsed.toFixed(0)} ms</strong> (expected
          ≈ 2 450 ms)
        </p>
      )}
      {elapsedEfficient !== null && (
        <p>
          Total time: <strong>{elapsedEfficient.toFixed(0)} ms</strong>{' '}
          (expected ≈ 2 450 ms)
        </p>
      )}
      <p className="text-sm text-gray-600">
        ‑ Open the Network tab: you’ll see a single POST request for the Action
        payload, but the server processes each mutation sequentially.
      </p>
    </main>
  )
}
