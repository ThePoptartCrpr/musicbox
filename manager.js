function MusicBoxSongManager(musicbox) {
  this.musicbox = musicbox;
  this.playlists = [];
  this.allSongs = new Playlist('All Songs');

  this.errors = {
    invalid_filetype: {
      files: [],
    }
  }

  this.loadSongs = function() {
    print('loading songs!');
    var libraryDir = new java.io.File('config/musicbox');
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
        var currentSong = assetSongs[i];
        var songName = getVisibleFileName(currentSong);

        var inPlaylist = false;
        this.allSongs.getSongs().forEach(function(song) {
          if (!inPlaylist && songName === song.getTitle()) {
            inPlaylist = true;
          }
        });

        if (!inPlaylist) currentSong.delete();
      }
    }

    // Make All Songs a usable playlist
    this.playlists.push(this.allSongs);
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
      if (getFileExtension(song) != '.ogg') return this.errors.invalid_filetype.files.push(song.getName());

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
        playlist.addSong(getVisibleFileName(song));
      }
      this.allSongs.addSong(getVisibleFileName(song));
    }
  }

  this.output = function() {
    print('yeehaw outputting');
    if (this.errors.invalid_filetype.files.length != 0) {
      ChatLib.chat('&e[musicbox] &7> &cSorry, only &l.ogg &r&cfiles are supported at this time.');
      this.errors.invalid_filetype.files.forEach(function(filename) {
        ChatLib.chat('   &7' + filename + ' was not loaded.');
      });
      // this.errors.invalid_filetype.files = [];
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
