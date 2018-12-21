function MusicBoxMain() {
  this.manager = new MusicBoxSongManager(this);
  this.gui = new MusicBoxOverlayGui(this);
  this.player = new MusicBoxPlayer(this);

  // Initialization
  this.init = function() {
    this.manager.loadSongs();
  }

  this.onLoadWorld = function() {
    this.manager.output();
  }

  // Component getters
  this.getManager = function() {
    return this.manager;
  }

  this.getGui = function() {
    return this.gui;
  }

  this.getPlayer = function() {
    return this.player;
  }
}

var MusicBox = new MusicBoxMain();

register('gameLoad', function() {
  print('yeehaw loading up');
  MusicBox.init();
});

register('worldLoad', function() {
  MusicBox.onLoadWorld();
});
