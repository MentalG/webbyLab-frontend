export const dumpFilm = data => {
    return {
        id: data._id,
        key: data._id,
        name: data.Title,
        releaseDate: data["Release Year"],
        format: data.Format,
        stars: data.Stars,
    }
}