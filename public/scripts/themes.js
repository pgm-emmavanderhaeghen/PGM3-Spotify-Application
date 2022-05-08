(() => {
  const themeSwitcher = {
    init() {
      // get defined themes from themes module
      this.root = document.documentElement;

      // set active theme and get from local storage
      this.activeThemeName =
        localStorage.getItem('activeThemeName') || 'cool-light-theme';

      this.cacheElements();

      // change theme, based on active theme
      this.changeDOMTheme();
    },
    cacheElements() {
      this.$toggle = document.querySelector('.switch');
      this.$switch = document.querySelector('.switch__circle');
    },

    changeDOMTheme() {
      this.$toggle.addEventListener('click', () => {
        if (this.$toggle) {
          this.$switch.style.marginLeft = 'calc(1.6rem - 0.15rem)';
          this.$toggle = false;

          this.root.style.setProperty('--black', '#F5F5F5');
          this.root.style.setProperty('--white', '#000000');
          this.root.style.setProperty('--dark-grey', '#EAEAEA');
        } else {
          this.$switch.style.marginLeft = '0rem';
          this.$toggle = true;

          this.root.style.setProperty('--white', '#161518');
          this.root.style.setProperty('--black', '#FFFFFF');
          this.root.style.setProperty('--dark-grey', '#181818');

          this.root.style.removeProperty('--black', '#F5F5F5');
          this.root.style.removeProperty('--white', '#000000');
          this.root.style.removeProperty('--dark-grey', '#EAEAEA');
        }
      });
    },
  };
  themeSwitcher.init();
})();
