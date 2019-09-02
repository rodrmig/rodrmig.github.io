/* MySpace Music Player ***************************************************** */
class UserInterface {
  constructor(settings) {
    this._settings = settings;
    this._extendSettings();
    this._setRootContainer();
    this._setUserInterfaceHTML();
    this.setPauseState();
  }

  _extendSettings() {
    this._settings.buttonIconClass = 'mmp-icon';
    this._settings.buttonIconSelector = '.' + this._settings.buttonIconClass;
    this._settings.buttonIconPlayInnerHTML = 'play_arrow';
    this._settings.buttonIconPlayClasses = this._settings.buttonIconClass + ' material-icons mmp-play-icon';
    this._settings.buttonIconPauseInnerHTML = 'pause';
    this._settings.buttonIconPauseClasses = this._settings.buttonIconClass + ' material-icons mmp-pause-icon';
    this._settings.equalizerImageClass = 'mmp-equalizer';
    this._settings.equalizerImageSelector = '.' + this._settings.equalizerImageClass;
    this._settings.equalizerPauseImageSource = 'img/eq_pause.png';
    this._settings.equalizerPlayImageSource = 'img/eq_play.gif';
  }

  _setRootContainer() {
    this._rootContainer = document.getElementById(this._settings.containerID);
  }

  _setUserInterfaceHTML() {
    let userInterfaceContainerWithInnerHTML = this._createUserInterfaceContainerWithInnerHTML();
    this._rootContainer.appendChild(userInterfaceContainerWithInnerHTML);
  }

  _createUserInterfaceContainerWithInnerHTML() {
    let userInterfaceContainer = this._createUserInterfaceContainer();
    let userInterfaceInnerHTML = this._getUserInterfaceInnerHTML();
    userInterfaceContainer.innerHTML = userInterfaceInnerHTML;

    return userInterfaceContainer;
  }

  _createUserInterfaceContainer() {
    let userInterfaceContainer = document.createElement('div');
    userInterfaceContainer.setAttribute('class', 'mmp-ui-container');

    return userInterfaceContainer;
  }

  _getUserInterfaceInnerHTML() {
    let html = '';
    html += '  <div class="mmp-button-container">';
    html += '    <button type="button">';
    html += '      <i class="' + this._settings.buttonIconClass + '"></i>';
    html += '    </button>';
    html += '  </div>';
    html += '  <div class="mmp-display-container">';
    html += '    <div class="mmp-song-info-container">';
    html += '      <div class="mmp-song-name">' + this._settings.song + '</div>';
    html += '      <div class="mmp-artist-name">' + this._settings.artist + '</div>';
    html += '    </div>';
    html += '    <div class="mmp-eq-container">';
    html += '      <img class="' + this._settings.equalizerImageClass + '" src="" alt="Eq Icon">';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

  setPauseState() {
    this._setButtonPauseState();
    this._setEqualizerPauseState();
  }

  _setButtonPauseState() {
    let buttonIcon = this._rootContainer.querySelector(this._settings.buttonIconSelector);
    buttonIcon.innerHTML = this._settings.buttonIconPlayInnerHTML;
    buttonIcon.setAttribute('class', this._settings.buttonIconPlayClasses);
  }

  _setEqualizerPauseState() {
    let equalizer = this._rootContainer.querySelector(this._settings.equalizerImageSelector);
    equalizer.setAttribute('src', this._settings.equalizerPauseImageSource);
  }

  setPlayState() {
    this._setButtonPlayState();
    this._setEqualizerPlayState();
  }

  _setButtonPlayState() {
    let buttonIcon = this._rootContainer.querySelector(this._settings.buttonIconSelector);
    buttonIcon.innerHTML = this._settings.buttonIconPauseInnerHTML;
    buttonIcon.setAttribute('class', this._settings.buttonIconPauseClasses);
  }

  _setEqualizerPlayState() {
    let equalizer = this._rootContainer.querySelector(this._settings.equalizerImageSelector);
    equalizer.setAttribute('src', this._settings.equalizerPlayImageSource);
  }

  setButtonClickCallback(callback) {
    let button = this._rootContainer.querySelector('button');
    button.addEventListener('click', callback);
  }
}

class Engine {
  constructor(settings) {
    this._settings = settings;
    this._extendSettings();
    this._setRootContainer();
    this._setEngineHTML();
  }

  _extendSettings() {
    this._settings.audioTag = 'audio';
  }

  _setRootContainer() {
    this._rootContainer = document.getElementById(this._settings.containerID);
  }

  _setEngineHTML() {
    let audioElementWithInnerHTML = this._createAudioElementWithInnerHTML();
    this._rootContainer.appendChild(audioElementWithInnerHTML);
  }

  _createAudioElementWithInnerHTML() {
    let audioElement = this._createAudioElement();
    let audioElementInnerHTML = this._getAudioElementInnerHTML();
    audioElement.innerHTML = audioElementInnerHTML;
    return audioElement;
  }

  _createAudioElement() {
    let audioElement = document.createElement(this._settings.audioTag);
    return audioElement;
  }

  _getAudioElementInnerHTML() {
    let audioElementInnerHTML = '<source src="' + this._settings.audioFilePath + '" type="audio/mpeg">';
    return audioElementInnerHTML;
  }

  play() {
    let engine = this._rootContainer.querySelector(this._settings.audioTag);
    engine.play();
  }

  pause() {
    let engine = this._rootContainer.querySelector(this._settings.audioTag);
    engine.pause();
  }

  isPaused() {
    let engine = this._rootContainer.querySelector(this._settings.audioTag);
    return engine.paused;
  }

  setOnEndedCallback(callback) {
    let engine = this._rootContainer.querySelector(this._settings.audioTag);
    engine.addEventListener('ended', callback);
  }
}

class MyspaceMusicPlayer {
  constructor(settings) {
    this._settings = settings;
    this._buildUserInterface();
    this._buildEngine();
    this._setButtonClickCallback();
    this._setOnEndedCallback();
  }

  _buildUserInterface() {
    let userInterfaceSettings = {
      containerID: this._settings.containerID,
      song: this._settings.song,
      artist: this._settings.artist,
    };

    this._userInterface = new UserInterface(userInterfaceSettings);
  }

  _buildEngine() {
    let engineSettings = {
      containerID: this._settings.containerID,
      audioFilePath: this._settings.audioFilePath
    };

    this._engine = new Engine(engineSettings);
  }

  _setButtonClickCallback() {
    let buttonClickCallback = this._buttonClickCallback(this._userInterface, this._engine);
    this._userInterface.setButtonClickCallback(buttonClickCallback);
  }

  _buttonClickCallback(userInterface, engine) {
    return function() {
      if (engine.isPaused()) {
        engine.play();
        userInterface.setPlayState();
      } else {
        engine.pause();
        userInterface.setPauseState();
      }
    }
  }

  _setOnEndedCallback() {
    let onEndedCallback = this._onEndedCallback(this._userInterface);
    this._engine.setOnEndedCallback(onEndedCallback);
  }

  _onEndedCallback(userInterface) {
    return function() {
      userInterface.setPauseState();
    }
  }

}

let musicPlayerSettings = {
  containerID: 'music-player',
  song: '93_Till_Infinity.mp3',
  artist: 'Souls_of_Mischief',
  audioFilePath: 'audio/93_Till_Infinity.mp3'
};

let musicPlayer = new MyspaceMusicPlayer(musicPlayerSettings);

/* Photo Space ************************************************************** */
class Modal {
  constructor(settings) {
    this._settings = settings;
    this._setRoot();
    this._setHTML();
    this._setCloseListener();
  }

  _setRoot() {
    this._root = document.getElementById(this._settings.containerID);
  }

  _setHTML() {
    let modalNode = this._createModalNode();
    this._root.appendChild(modalNode);
  }

  _createModalNode() {
    let container = this._createContainer();
    let innerHTML = this._getInnerHTML();
    container.innerHTML = innerHTML;
    return container;
  }

  _createContainer() {
    let container = document.createElement('div');
    container.setAttribute('class', 'ps-modal ps-fade-in');
    return container;
  }

  _getInnerHTML() {
    let innerHTML = '';
    innerHTML += '<span class="ps-modal-close">&times;</span>';
    innerHTML += '<img class="ps-modal-image ps-zoom-in" src="">';
    return innerHTML;
  }

  _setCloseListener() {
    let closeButton = this._root.querySelector('.ps-modal-close');
    let closeCallback = this._getCloseCallback();
    closeButton.addEventListener('click', closeCallback);
  }

  _getCloseCallback() {
    return function() {
      let modal = this.closest('.ps-modal');
      modal.style.display = 'none';
    }
  }

  show(imageSource) {
    this._setImageSource(imageSource);
    this._showContainer();
  }

  _setImageSource(imageSource) {
    let image = this._root.querySelector('.ps-modal-image');
    image.setAttribute('src', imageSource);
  }

  _showContainer() {
    let container = this._root.querySelector('.ps-modal');
    container.style.display = 'block';
  }
}

class Grid {
  constructor(settings) {
    this._settings = settings;
    this._setRoot();
    this._setHTML();
  }

  _setRoot() {
    this._root = document.getElementById(this._settings.containerID);
  }

  _setHTML() {
    let gridNode = this._createGridNode();
    this._root.appendChild(gridNode);
  }

  _createGridNode() {
    let container = this._createContainer();
    let innerHTML = this._getInnerHTML();
    container.innerHTML = innerHTML;
    return container;
  }

  _createContainer() {
    let container = document.createElement('div');
    container.setAttribute('class', 'ps-container');
    return container;
  }

  _getInnerHTML() {
    let innerHTML = '';

    for (let image of this._settings.images) {
      innerHTML += '<img class="ps-image ps-hvr-grow" src="' + image + '">';
    }

    return innerHTML;
  }

  setImageClickCallback(callback) {
    let imagesDisplayed = this._root.querySelectorAll('.ps-image');

    for (let image of imagesDisplayed) {
      image.addEventListener('click', callback);
    }
  }
}

class PhotoSpace{
  constructor(settings){
    this._settings = settings;
    this._createGrid();
    this._createModal();
    this._setImageClickCallback();
  }

  _createGrid(){
      let gridSettings = this._settings;
      this._grid = new Grid(gridSettings);
  }

  _createModal(){
    let modalSettings = {containerID: this._settings.containerID};
    this._modal = new Modal(modalSettings);
  }

  _setImageClickCallback(){
    let imageClickCallback = this._getImageClickCallback();
    this._grid.setImageClickCallback(imageClickCallback);
  }

  _getImageClickCallback(){
    let modal = this._modal;

    return function(){
      let imageSource = this.getAttribute('src');
      modal.show(imageSource);
    }
  }
}

let photoSpaceSettings = {
  containerID: 'photo-space',
  images: ['img/img_01.jpeg', 'img/img_02.jpeg', 'img/img_03.jpeg', 'img/img_04.jpeg', 'img/img_05.jpeg', 'img/img_06.jpeg']
};

let photoSpace = new PhotoSpace(photoSpaceSettings);
