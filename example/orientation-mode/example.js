import ImageViewer from '../../src/ImageViewer';

const images = [
  { small: '../images/1.jpg', big: '../images/1_big.jpg' },
  { small: '../images/2.jpg', big: '../images/2_big.jpg' },
  { small: '../images/3.jpg', big: '../images/3_big.jpg' },
  { small: '../images/4.jpg', big: '../images/4_big.jpg' },
];

let viewer = null;

function createViewer () {
  if (viewer) {
    viewer.destroy();
  }

  const topCenter = document.getElementById('toggle-top-center').checked;
  const snapView  = document.getElementById('toggle-snap-view').checked;

  viewer = new ImageViewer(document.getElementById('image-container'), {
    fitMode: 'orientation',
    initialPosition: topCenter ? 'top-center' : 'center',
    snapView,
    hasZoomButtons: true,
  });

  window.viewer = viewer;

  // load currently active image
  const activeBtn = document.querySelector('.controls button.active');
  const idx = parseInt(activeBtn.dataset.index, 10);
  viewer.load(images[idx].small, images[idx].big);
}

// image switcher
document.querySelectorAll('.controls button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.controls button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const idx = parseInt(btn.dataset.index, 10);
    viewer.load(images[idx].small, images[idx].big);
  });
});

// options toggles — rebuild viewer to apply new options
document.getElementById('toggle-top-center').addEventListener('change', createViewer);
document.getElementById('toggle-snap-view').addEventListener('change', createViewer);

// init
createViewer();
