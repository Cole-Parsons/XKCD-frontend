import { useState } from "react"

function App () {
  const[comic, setComic] = useState(null);
  const [comicNum, setComicNum] = useState("");
  
  async function fetchComic(num = comicNum) {
  if (!num && num !== 0) num = "";

  const url = num
    ? `https://api.allorigins.win/get?url=${encodeURIComponent(`https://xkcd.com/${num}/info.0.json`)}`
    : `https://api.allorigins.win/get?url=${encodeURIComponent("https://xkcd.com/info.0.json")}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const wrapped = await res.json();
    const data = JSON.parse(wrapped.contents);

    setComic(data);
    setComicNum(data.num);

  } catch (err) {
    console.error("Failed to fetch comic: ", err);
    alert("Failed to fetch comic. Check comic number or network.");
  }
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

  function handleNext() {
    if (!comic) return
    fetchComic(comic.num + 1);
  }

  function handlePrev() {
    if (!comic || comic.num === 1) return
    fetchComic(comic.num - 1);
  }
  
  
  return (
    
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>XKCD Comic Viewer</h1>

      <div style={{ marginBottom: 12 }}>
      <input
        type="number"
        placeholder="Comic number (leave blank for latest)"
        value={comicNum}
        onChange={(e) => setComicNum(Number(e.target.value))}
        style={{ marginRight: 8 }}
        />
        <button onClick={() => fetchComic()}>Load XKCD</button>
        <button onClick={handleDownload} style ={{marginLeft: 8}}>
          Download Comic
        </button>

        <button onClick={handlePrev} disabled={!comic || comic.num === 1}>Previous</button>
        <button onClick={handleNext} disabled={!comic}>Next</button>
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