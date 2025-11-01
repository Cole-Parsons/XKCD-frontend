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

    console.log(`Requesting download for comic #${comic.num}`);
    alert(`Would request download for comic #${comic.num}`);
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