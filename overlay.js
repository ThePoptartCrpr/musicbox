function MusicBoxOverlayGui(musicbox) {
  this.musicbox = musicbox;
  
  // Create panels
  this.utilityTray = new UtilityTrayPanel();
  this.songManager = new SongManagerPanel();
  this.trackListing = new TrackListingPanel();
  this.playlistSelection = new PlaylistSelectionPanel();

  // GUI values
  this.hovered = false;
  this.open = false;

  // Draw values
  this.color = [170, 0, 0, 100];
  
  
  this.click = function() {
    
  }

  this.tick = function() {
    this.utilityTray.tick();
    this.songManager.tick();
    this.trackListing.tick();
    this.playlistSelection.tick();
  }

  this.draw = function() {
    this.utilityTray.draw();
    this.songManager.draw();
    this.trackListing.draw();
    this.playlistSelection.draw();
  }
  
  
  // Panels
  function UtilityTrayPanel() {
    this.tick = function() {
      
    }
    
    this.draw = function() {
      
    }
  }
  
  function SongManagerPanel() {
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
  
  function TrackListingPanel() {
    this.tick = function() {
      
    }
    
    this.draw = function() {
      
    }
  }
  
  function PlaylistSelectionPanel() {
    this.tick = function() {
      
    }
    
    this.draw = function() {
      
    }
  }
  
  // Elements
  
}

// Tick and draw gui
register('step', function() {
  MusicBox.getGui().tick();
}).setFps(30);

register('renderOverlay', function() {
  MusicBox.getGui().draw();
});
