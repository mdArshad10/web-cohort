// Problem statement
// Create a Playlist constructor that initializes with an empty songs array. Add a method addSong(song) to the prototype that adds a new song to the playlist.

// Challenge
// • Implement a constructor function Playlist that initializes an empty songs array.
// • Attach a method addSong (song) to its prototype that adds the song to the songs array.

function Playlist() {
  this.songs = [];
}

Playlist.prototype.addSong = function (song) {
  this.songs.push(song);
};

const playlist = new Playlist();
playlist.addSong("Tum hi ho");
console.log(playlist.songs);
