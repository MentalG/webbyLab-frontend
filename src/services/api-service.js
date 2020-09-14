export default class ApiService {
  _apiBase = 'http://localhost:5000/';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Server status is ${res.status}`);
    }

    return await res.json();
  };

  getAllFilms = async () => {
    const response = await this.getResource(`films`);
    return response;
  };

  setFilm = async (params) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    // console.log(this._apiBase + 'films/');

    fetch(this._apiBase + 'films', requestOptions).then((response) =>
      response.json()
    );
  };

  deleteFilm = (params) => {
    const requestOptions = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    fetch(this._apiBase + 'films', requestOptions).then((response) =>
      response.json()
    );
  }
}
