import { useState } from "react"

function App () {
  const[comic, setComic] = useState(null);
  
  async function fetchComic() {
    const res = await fetch("https://api.allorigins.win/raw?url=https://xkcd.com/info.0.json");
    const data = await res.json();
    setComic(data);
  }
  
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
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