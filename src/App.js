import { useEffect, useState } from "react";
import "./App.css";
import FilmKarti from "./components/FilmKarti";

function App() {
  const [filmler, setFilmler] = useState([]); // filmleri tutmak için bir state
  const [aramaTerimi, setAramaTerimi] = useState(""); // arama kısmına girdğimiz kısmı tutmak için bir state
  const [loading, setLoading] = useState(false); //yüklenirken insanları beklettiğmize dair info için loading
  const [error, setError] = useState(null); // hata için hatayı tutcagımız error state
  const [sorgu, setSorgu] = useState("inception"); // arama sonucunu tutacagımız ıcın bır state

  useEffect(() => {
    async function filmleriGetir() {
      //Sorgu statei yenilendiğinde filmleri getirmek için bir fonksiyon.
      setLoading(true);
      setError(null);

      const API = process.env.REACT_APP_TMDB_API_KEY;

      try {
        //try catch blogunda
        const response = await fetch(
          //film apisinde istek atıyoruz.
          `https://api.themoviedb.org/3/search/movie?query=${sorgu}&api_key=${API}`
        );
        // eğer istek başarılı olmazsa error bastırıyoruz
        if (!response.ok) {
          throw new Error(`HTTPS Hatası! Durum: ${response.status}`);
        }

        // gelen isteği datada tutuyoruz jsona cevirip.
        const data = await response.json();
        setFilmler(data.results); //gelen sonucları filmler stateinde saklıyoruz.
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    filmleriGetir();
  }, [sorgu]);

  function handleSearch(event) {
    event.preventDefault();

    setSorgu(aramaTerimi); // sorgu stateine arama kısmına girilen kelimeyi gönderiyoruz.
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Film Arama Motoru</h1>
        <form onSubmit={handleSearch} className="arama-formu">
          <input
            type="text"
            value={aramaTerimi}
            onChange={(e) => setAramaTerimi(e.target.value)}
            placeholder="Bir Film Adı Yazın..."
          ></input>
          <button type="submit">Ara</button>
        </form>
      </header>

      <main className="film-konteyneri">
        {loading && <p className="durum-mesajı"> Filmler Yükleniyor...</p>}
        {error && <p className="durum-mesajı-hata">Hata: {error} </p>}
        {!loading &&
          !error &&
          filmler.length > 0 &&
          filmler.map((film) => <FilmKarti key={film.id} film={film} />)}
      </main>
    </div>
  );
}

export default App;
