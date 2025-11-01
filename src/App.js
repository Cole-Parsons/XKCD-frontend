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
  
  return (
    
    <div style={{ textAlign: "center", padding: 20 }}>
      <input
        type="number"
        placeholder="Comic number (leave blank for latest)"
        value={comicNum}
        onChange={(e) => setComicNum(e.target.value)}
        style={{ marginRight: 8 }}
        />
      <button onClick={fetchComic}>Load XKCD</button>
      {comic && (
        <>
          <h2>{comic.safe_title}</h2>
          <img src={comic.img} alt={comic.alt} width="300" />
        </>
      )}
    </div>
  );
}
export default App;