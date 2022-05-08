(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.registerListeners();
    },

    cacheElements() {
      this.$artistDeleteButtons = document.querySelectorAll(
        '.artists .btn__delete'
      );
      this.$playlistDeleteButtons = document.querySelectorAll(
        '.playlists .btn__delete'
      );

      this.$albumDeleteButtons = document.querySelectorAll(
        '.album-card .btn__delete'
      );
      this.$songDeleteButtons = document.querySelectorAll(
        '.song-list .btn__delete'
      );
      this.$playMusicBtn = document.querySelector('.play-music');
    },

    playMusic(soundpath) {
      this.music = new Audio(`../${soundpath}`);
      this.music.play();
    },

    registerListeners() {
      if (this.$artistDeleteButtons) {
        this.$artistDeleteButtons.forEach((button) => {
          button.addEventListener('click', async (ev) => {
            const id =
              ev.target.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/artist/${id}`, {
              method: 'DELETE',
              headers: { 'Content-type': 'application/json' },
            });
            document.location.reload();
          });
        });
      }
      if (this.$playlistDeleteButtons) {
        this.$playlistDeleteButtons.forEach((button) => {
          button.addEventListener('click', async (ev) => {
            const id =
              ev.target.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/playlist/${id}`, {
              method: 'DELETE',
              headers: { 'Content-type': 'application/json' },
            });
            document.location.reload();
          });
        });
      }
      if (this.$albumDeleteButtons) {
        this.$albumDeleteButtons.forEach((button) => {
          button.addEventListener('click', async (ev) => {
            const id =
              ev.target.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/album/${id}`, {
              method: 'DELETE',
              headers: { 'Content-type': 'application/json' },
            });
            document.location.reload();
          });
        });
      }
      if (this.$songDeleteButtons) {
        this.$songDeleteButtons.forEach((button) => {
          button.addEventListener('click', async (ev) => {
            const id =
              ev.target.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            await fetch(`http://localhost:3000/api/song/${id}`, {
              method: 'DELETE',
              headers: { 'Content-type': 'application/json' },
            });
            document.location.reload();
          });
        });
      }
      this.$playMusicBtn.addEventListener(
        'click',
        () => {
          this.playMusic('./assets/songs/AllStar.mp3');
        },
        false
      );
    },
  };
  app.initialize();
})();
