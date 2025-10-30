import { useState } from "react"
import { generateContent } from "../services/api"

function Generate() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState(null)

  const handleGenerate = async () => {
    const res = await generateContent(prompt, "test-user-001") // temporary ID
    setResult(res)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Content Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "60%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Caption:</h3>
          <p>{result.caption}</p>
          <h3>Hashtags:</h3>
          <p>{result.hashtags}</p>
        </div>
      )}
    </div>
  )
}

export default Generate
