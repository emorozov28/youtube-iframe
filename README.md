# Lazy-load YouTube Iframe
A lightweight JavaScript library for lazy loading YouTube videos.

[![](https://data.jsdelivr.com/v1/package/npm/lazy-load-youtube/badge)](https://www.jsdelivr.com/package/npm/lazy-load-youtube)

[Demo](https://emorozov28.github.io/youtube-iframe/demo/index.html)

## Overview
`lazy-load-youtube` provides an easy way to load YouTube videos only when they are requested, improving page performance by reducing initial load times.

#### css
```css
@import '~lazy-load-youtube/dist/index.css';
//or
@import '/node_modules/lazy-load-youtube/dist/index.css';
```
```javascript
// or connect styles in js
import 'lazy-load-youtube/dist/index.css';
```
#### js
```javascript
import LazyLoadYouTube from 'lazy-load-youtube';

new LazyLoadYouTube('.jsYouTubeVideoItem');
```
#### CDN
CSS
```html
<link href="https://cdn.jsdelivr.net/npm/lazy-load-youtube@1.1.1/dist/index.css" rel="stylesheet">
```
JS
```html
<script defer src="https://cdn.jsdelivr.net/npm/lazy-load-youtube@1.1.1/dist/index.js"></script>
```
HTML
```html
<script>
     document.addEventListener('DOMContentLoaded', function() {
        const lazyLoadYouTube = new LazyLoadYouTube('.jsYouTubeVideoItem');
    });
</script>
```
## Working with the library
Place html markup in your project:
```html
<div class="YouTubeVideoContainer">
    <div class="YouTubeVideoItem jsYouTubeVideoItem" data-youtube-video-link="Y_plhk1FUQA">
        <button class="YouTubePlayButton" data-youtube-video-button></button>
    </div>
</div>
```
In the attribute `data-video-link`, you need to insert a link to the YouTube video or specify an id
Example:
```html
 - https://www.youtube.com/watch?v=Y_plhk1FUQA&t=8278s  <!-- full link -->
 - https://youtu.be/Y_plhk1FUQA  <!-- short link -->
 - Y_plhk1FUQA  <!-- video ID -->
 ```

If necessary, you can also insert your own "background" for the video:
```html 
<div class="YouTubeVideoItem jsYouTubeVideoItem"
    data-youtube-video-link="..."
    style="background-image: url(img/intro.png);">
</div>
```

### Stop video
Calling the `stopVideoPlay` method
```javascript
 document.addEventListener('DOMContentLoaded', function() {
    const stopVideo = document.querySelector('.jsYouTubeVideoStop');
    const lazyLoadYouTube = new LazyLoadYouTube('.jsYouTubeVideoItem');

    stopVideo.addEventListener('click', lazyLoadYouTube.stopVideoPlay);
});
```

## Parameters

### buttonContent
Changing the content of the launch button
```javascript
new LazyLoadYouTube('.jsYouTubeVideoItem', {
    buttonContent: '<svg>...</svg>'
});
```

### onPlay
```javascript
const lazyLoadYouTube = new LazyLoadYouTube('.jsYouTubeVideoItem', {
    onPlay: (videoElement) => {
        console.log('Play video', videoElement);
    }
});
```

### customBackgroundQuality

Change the quality of the background image

`default value - hqdefault`
```javascript
new LazyYouTubeLoad('.jsYouTubeVideoItem', {
    customBackgroundQuality: 'hqdefault'
});
```
+ For high quality - `"hqdefault"`
+ For medium quality - `"mqdefault"`
+ For standard definition miniature - `"sddefault"`
+ For a thumbnail at maximum resolution - `"maxresdefault"`

| Name | Type | Default | Description | Extra options |
| --- | --- | --- | --- | --- |
| onPlay | function | --- | Video launch event | --- |
| buttonContent | string | HTMLElement | The content of the play button | --- |
| customBackgroundQuality | string | hqdefault | The quality of the background image | hqdefault, mqdefault, sddefault, maxresdefault |


### If you have any questions or wishes, write - https://github.com/emorozov28/youtube-iframe/issues