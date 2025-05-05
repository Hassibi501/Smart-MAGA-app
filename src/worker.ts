export interface Env {
    OPENAI_API_KEY: string
  }
  
  export default {
    async fetch(req: Request, env: Env): Promise<Response> {
      if (req.method !== 'POST') {
        return new Response('Smart MAGA wavescanner up', { status: 200 })
      }
  
      try {
        const { lat, lon, paranoia = 1 } = await req.json()
        if (typeof lat !== 'number' || typeof lon !== 'number') {
          return new Response('Invalid coords', { status: 400 })
        }
  
        // deterministic—but fake—“intensity”
        const intensity = Math.round(Math.abs(Math.sin(lat * lon)) * 100 * paranoia)
  
        const prompt =
          `One‑sentence comedic report (≤20 words) on 5G level ${intensity}. ` +
          `Include tin‑foil hat thickness in mm.`
  
        // ───── fallback text while you wait for API keys ─────
        let line = `5G level ${intensity}. Wrap your skull in ${Math.ceil(intensity / 50) + 1} mm foil.`
        /*  ←‑‑‑ remove the surrounding comment marks once your key is active
        const gptResp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
          })
        }).then(r => r.json())
  
        line = gptResp.choices[0].message.content.trim()
        */  // ‑‑‑► keep this closing tag with the opening /*
  
        // respond
        return Response.json({ report: line, intensity })
      } catch (err) {
        return new Response('Bad request', { status: 400 })
      }
    }
  }
  