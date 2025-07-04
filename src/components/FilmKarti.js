const VARSAYILAN_POSTER_URL =
  "https://via.placeholder.com/500x750.png?text=Poster+Bulunamadı";

function FilmKarti({ film }) {
  const tamPosterURL = film.poster_path
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : VARSAYILAN_POSTER_URL;

  return (
    <div className="film-karti">
      <img src={tamPosterURL} alt={`${film.title} posteri`}></img>
      <div className="film-bilgisi">
        <h3>Film Başlığı: {film.title}</h3>
        <p>Filmin Çıkış Tarihi: {film.release_date}</p>
        <p>Film Başlığı: {film.vote_average}</p>
      </div>
    </div>
  );
}

export default FilmKarti;
