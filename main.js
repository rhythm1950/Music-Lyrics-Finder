const showSongs = async () => {
    const songInput = document.getElementById("song-input").value;
    document.getElementById("outer-div").innerHTML = '';

    try {
        const res = await fetch(`https://api.lyrics.ovh/suggest/${songInput}`)
        const data = await res.json();
        songPreview(data.data);
    } catch (error) {
        console.log(error);
    }
};

const songPreview = data => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const innerDiv = document.createElement("div");
        innerDiv.className = "single-result row align-items-center my-3 p-3";
        innerDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${element.title}</h3>
                <p class="author lead">Album by <span>${element.artist.name}</span></p>
                <audio controls>
                <source src="${element.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="showLyrics('${element.title}', '${element.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        document.getElementById("outer-div").appendChild(innerDiv);
        document.getElementById("song-input").value = "";
    }
};

const showLyrics = async (songName, artistName) => {
    document.getElementById("lyrics-div").innerHTML = '';
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`);
        const data = await res.json();
        lyricsDiv(data);
    }
    catch (error) {
        console.log(error);
    }
};

const lyricsDiv = data => {
    const p = document.createElement('p');
    p.innerText = data.lyrics;
    document.getElementById("lyrics-div").appendChild(p);
}