function MusicBoxOverlayGui(musicbox) {
  this.musicbox = musicbox;

  // GUI values
  this.hovered = false;
  this.open = false;

  // Draw values
  this.color = [170, 0, 0, 100];

  this.tick = function() {

  }

  this.draw = function() {
    Renderer.drawRect(
      Renderer.color(this.color[0], this.color[1], this.color[2], this.color[3]),
      Renderer.screen.getWidth() - 20,
      10,
      3,
      40
    )

    Renderer.drawRect(
      Renderer.color(0, 0, 0, this.color[3]),
      Renderer.screen.getWidth() - 17,
      10,
      17,
      40
    )
  }
}

register('step', function() {
  MusicBox.getGui().tick();
}).setFps(30);

register('renderOverlay', function() {
  MusicBox.getGui().draw();
});
