import './scss/index.scss';

import LazyLoadYouTube from './js/script';

const lazyLoadYouTube = new LazyLoadYouTube('.js-video-item');

lazyLoadYouTube.stopVideo();

export default LazyLoadYouTube;