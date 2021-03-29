# Lazy-load YouTube Iframe

Lazy-load YouTube Iframe

Preview - https://emorozov.top/other/lazy-youtube-load/
```
<link rel="stylesheet" href="lazyYouTubeLoad.css">

<script src="js/app.js" type="module"></script>

import LazyYouTubeLoad from './LazyYouTubeLoad.js';

const youTubeButton = `
    <span class="text-hidden">play video</span>
    <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
        <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
        </path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
`;

const lazyYouTubeLoad = new LazyYouTubeLoad({
    selector: '.video-item',
    button: youTubeButton
});
```

## Examples

```
In the attribute data-video-link enter the video code from the video page on YouTube (click on the share button and copy the code)

You can also put an image stub if needed - <div class="video-item" data-video-link="..." style="background-image: url(img/intro.png);">

You can also write a caption for the video - 
    <div class="video-item" data-video-link="...">
        <span class="video-caption">Your text</span>
    </div>

If you need to change the signature style, add your class to it
        <span class="video-caption your-class">Your text</span>

<ul>
    <li>
        <div class="video__wrap">
            <div class="video-item" data-video-link="https://youtu.be/Kt-tLuszKBA">
                <button class="video-play"></button>
            </div>
        </div>
    </li>
    <li>
        <div class="video__wrap">
            <div class="video-item" data-video-link="https://youtu.be/CwrVwstqNOs" style="background-image: url(img/intro.png);">
                <span class="video-caption">2K</span>
                <button class="video-play"></button>
            </div>
        </div>
    </li>
</ul>

const youTubeButton = `
    <span class="text-hidden">play video</span>
    <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
        <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
        </path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
`;

const lazyYouTubeLoad = new LazyYouTubeLoad({
    selector: '.video-item',
    bgImage: true,
    button: youTubeButton
});
```

## Options
### selector
```
Specify the item on which the attribute hangs "data-video-link"

const lazyYouTubeLoad = new LazyYouTubeLoad({
    selector: '.video-item'
});
```

### button
```
If you want to change the button, enter text, you need to register the internal elements of this button in the parameter

default value - null

const youTubeButton = `
    <span class="text-hidden">play video</span>
    <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
        <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
        </path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
`;

const lazyYouTubeLoad = new LazyYouTubeLoad({
    button: youTubeButton
});
```

### bgImage
```
If you need to remove the background image

default value - true

const lazyYouTubeLoad = new LazyYouTubeLoad({
    bgImage: true
});
```

### qualityBg
```
Change the quality of the background image

default value - hqdefault

const lazyYouTubeLoad = new LazyYouTubeLoad({
    qualityBg: 'hqdefault'
});

For the high quality version of the thumbnail use - "hqdefault"
For the medium quality version of the thumbnail use - "mqdefault"
For the standard definition version of the thumbnail use - "sddefault"
For the maximum resolution version of the thumbnail use - "maxresdefault"
```