function MusicBoxSongManager(musicbox) {
  this.gui = musicbox.gui;
  this.playlists = [];
  this.allSongs = new Playlist('All Songs');

  this.loadSongs = function() {
    var libraryDir = new java.io.File('config/musicbox');
    // print(libraryDir.isDirectory());
    if (!(libraryDir.exists()) || !(libraryDir.isDirectory())) {
      libraryDir.mkdir();

      // Welcome message?
      // ChatLib.chat('&e&m' + ChatLib.getChatBreak('-'));
    } else {
      var songs = libraryDir.listFiles();
      for (var i = 0; i < songs.length; i++) {
        var item = songs[i];
        if (!item.isDirectory()) this.loadSong(item.getPath());
        else this.loadPlaylist(item.getPath());
      }
    }

    // Cleanup deleted songs
    var assetsDir = new java.io.File('config/ChatTriggers/modules/musicbox/assets');
    if (assetsDir.exists()) {
      var assetSongs = assetsDir.listFiles();
      for (var i = 0; i < assetSongs.length; i++) {
        var song = assetSongs[i];

        var inPlaylist = false;
        this.allSongs.getSongs().forEach(function(song) {
          if (song.getName())
        })
      }
    }
  }

  this.loadPlaylist = function(path) {
    var playlistDir = new java.io.File(path);
    if (playlistDir.exists() && playlistDir.isDirectory()) {
      var songs = playlistDir.listFiles();
      for (var i = 0; i < songs.length; i++) {
        var item = songs[i];
        if (!item.isDirectory()) this.loadSong(item.getPath(), playlistDir.getName());
      }
    }
  }

  this.loadSong = function(path, playlistName) {
    var song = new java.io.File(path);

    if (song.exists()) {

      // .ogg -> mp3 conversion not yet supported, ignore file
      if (getFileExtension(song) != '.ogg') return ChatLib.chat('&e[musicbox] &7> &cSorry, only &l.ogg &r&cfiles are supported at this time.\n   &7' + song.getName() + ' was not loaded.');

      // Copy file into assets if not already
      var targetFile = new java.io.File('config/ChatTriggers/modules/musicbox/assets/' + song.getName());
      if (!(targetFile.exists())) {
        targetFile.mkdirs();
        java.nio.file.Files.copy(song.toPath(), targetFile.toPath(), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
      }

      // Load into playlists
      if (playlistName) {
        var playlist;
        this.playlists.forEach(function(playlistEntry) {
          if (playlistEntry.getName() == playlistName) playlist = playlistEntry;
        })
        if (!playlist) {
          // Create new playlist
          playlist = new Playlist(playlistName);
          this.playlists.push(playlist);
        }
        playlist.addSong(song.getName());
      }
      this.allSongs.addSong(song.getName());
    }
  }

  function Playlist(name) {
    this.name = name;
    this.songs = [];

    this.addSong = function(songName) {
      this.songs.push(new Song(songName));
    }

    this.getName = function() {
      return this.name;
    }

    this.getSongs = function() {
      return this.songs;
    }
  }

  function Song(title) {
    this.title = title;

    this.getTitle = function() {
      return this.title;
    }
  }
}
