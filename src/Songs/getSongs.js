const fetchSongs = async (props) => {
    const fetchedSongs = await fetch('https://spotify23.p.rapidapi.com/search/?q=1&type=tracks&limit=50&numberOfTopResults=0', {
        method : 'GET',
        headers: {
            'X-RapidAPI-Key': 'ce4eef9951msh4bc0c05a251b723p135889jsn15e48e0311b4',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    })
    const resultJSON = await fetchedSongs.json()

    return resultJSON
}

export { fetchSongs }