import { useState } from "react"

function App () {
  const[comic, setComic] = useState(null);
  const [comicNum, setComicNum] = useState("");
  
  async function fetchComic() {
    const url = comicNum
    ? `https://api.allorigins.win/raw?url=https://xkcd.com/${comicNum}/info.0.json`
    : "https://api.allorigins.win/raw?url=https://xkcd.com/info.0.json";
    const res = await fetch(url);
    const data = await res.json();
    setComic(data);
  }

  async function handleDownload() {
    if (!comic) {
      alert("Please load a comic first");
        return;
    }

    try {
      const response = await fetch(`http://host.docker.internal:8080/comic/${comic.num}`, {
        method: "POST"
    });

    if (response.ok) {
      alert(`Download requested for comic #${comic.num}`);
    } else {
      alert("Failed to request download. Is server running?");
      }
    } catch (error) {
      console.error(error);
      alert("Error contacting the server");
    }
  }
  
  return (
    
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>XKCD Comic Viewer</h1>

      <div style={{ marginBottom: 12 }}>
      <input
        type="number"
        placeholder="Comic number (leave blank for latest)"
        value={comicNum}
        onChange={(e) => setComicNum(e.target.value)}
        style={{ marginRight: 8 }}
        />
        <button onClick={fetchComic}>Load XKCD</button>
        <button onClick={handleDownload} style ={{marginLeft: 8}}>
          Download Comic
        </button>
      </div>

      {comic && (
        <>
          <h2>{comic.safe_title} - #{comic.num}</h2>
          <img src={comic.img} alt={comic.alt} width="300" />
        </>
      )}
    </div>
  );
}
export default App;