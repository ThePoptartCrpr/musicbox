function MusicBoxMain() {
  this.manager = new MusicBoxSongManager(this);
  this.gui = new MusicBoxOverlayGui(this);

  this.init = function() {
    this.manager.loadSongs();
  }
}

var MusicBox = new MusicBoxMain();

register('worldLoad', function() {
  MusicBox.init();
});
