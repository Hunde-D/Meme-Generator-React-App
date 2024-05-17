import { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/39t1o.jpg",
  });
  const [allMemes, setallMemes] = useState([]);

  useEffect(() => {
    async function fetchMemes() {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setallMemes(data.data.memes);
    }
    fetchMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));
    // setMeme({ ...meme, randomImage: url });

    /* not recommended way of updating state 
    because it may not give the updated state value 
    because of the asynchronous nature of setMeme function */
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <div>
          <label htmlFor="top-text" className="form--lable">
            Top Text
          </label>
          <input
            id="top-text"
            type="text"
            placeholder="Top text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            className="form--input"
          />
        </div>
        <div>
          <label htmlFor="bottom-text" className="form--lable">
            Bottom Text
          </label>
          <input
            id="bottom-text"
            type="text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            placeholder="Bottom text"
            className="form--input"
          />
        </div>
        <button className="form--btn" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme--container">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
