// Functional API route to fetch metrics from a Python script
'use client';
import { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const scriptPath = path.join(process.cwd(), 'src', 'scripts', 'metrics.py')

  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Exec Error:', error)
      return res.status(500).json({ error: 'Script execution failed' })
    }

    try {
      const data = JSON.parse(stdout)
      return res.status(200).json(data)
    } catch (e) {
      console.error('JSON Parse Error. stdout:', stdout)
      return res.status(500).json({ error: 'Invalid JSON from script' })
    }
  })
}