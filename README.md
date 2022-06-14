# Lazy-load YouTube Iframe
JavaScript library for lazy loading YouTube videos

[![npm version](https://badge.fury.io/js/lazy-load-youtube.svg)](https://www.npmjs.com/package/lazy-load-youtube)
[![](https://data.jsdelivr.com/v1/package/npm/lazy-load-youtube/badge)](https://www.jsdelivr.com/package/npm/lazy-load-youtube)

 [Demo](https://emorozov.top/app/youtube-iframe/ )

## Working with the library
Place html markup in your project:
```html
<div class="video__wrap">
    <div class="video__item js-video-item" data-video-link="https://youtu.be/Kt-tLuszKBA">
        <button class="video__play js-video-play"></button>
    </div>
</div>
```
In the attribute `data-video-link`, you need to insert a link to the YouTube video or specify an id
Example:
```html
 - https://www.youtube.com/watch?v=Y_plhk1FUQA&t=8278s  <-link video
 - https://youtu.be/Y_plhk1FUQA  <-link video
 - Y_plhk1FUQA  <-id video
 ```

If necessary, you can also insert your own "placeholder" for the video:
```html 
<div class="video__item js-video-item" data-video-link="..." 
    style="background-image: url (img/intro.png);">
```

You can also add a caption to a video by adding a tag with a` video__caption` class and a `js-video-caption` :
```html 
<div class="video__item js-video-item" data-video-link="...">
    <span class="video__caption js-video-caption">Your text</span>
    <button class="video__play js-video-play"></button>
</div>
```

## Start
To get started, download the `npm i lazy-load-youtube` library and import it into your project
Or import into your project
#### css
```css
@import 'lazy-load-youtube/dist';
```
```javascript
or connect styles in js
import 'lazy-load-youtube/dist/index.css';
```
#### js
```javascript
import LazyLoadYouTube from 'lazy-load-youtube';

new LazyLoadYouTube('.js-video-item');
```
#### CDN
CSS
```html
<link href="https://cdn.jsdelivr.net/npm/lazy-load-youtube@1.0.7/dist/index.css" rel="stylesheet">
```
JS
```html
<script defer src="https://cdn.jsdelivr.net/npm/lazy-load-youtube@1.0.7/dist/index.js"></script>
```
HTML
```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        new LazyLoadYouTube('.js-video-item');
    });
</script>
```
### Stop video
Create a button with class `js-video-stop`
```html
<button class="js-video-stop">Stop Video</button>
```
Calling the `stopVideo` method
```javascript
const lazyLoadYouTube = new LazyLoadYouTube('.js-video-item');
lazyLoadYouTube.stopVideo();
```

## Parameters

### button
Changing the content of the launch button
```javascript
new LazyLoadYouTube('.js-video-item', {
    button: '<svg>...</svg>'
});
```
Button name
`default value - Play video`
```javascript
new LazyLoadYouTube('.js-video-item', {
    buttonLabel: 'Play'
});
```

### bgImage

Remove background image
`default value - true`
```javascript
new LazyLoadYouTube('.js-video-item', {
    imageBg: false
});
```

### qualityBg

Change the quality of the background image

`default value - hqdefault`
```javascript
new LazyYouTubeLoad({
    qualityBg: 'hqdefault'
});
```
+ For high quality - `"hqdefault"`
+ For medium quality - `"mqdefault"`
+ For standard definition miniature - `"sddefault"`
+ For a thumbnail at maximum resolution - `"maxresdefault"`

| Name | Type | Default | Description | Extra options |
| --- | --- | --- | --- | --- |
| button | string | svg | Button content | --- |
| buttonLabel | string | Play video | For screen readers | --- |
| imageBg | boolean | true | Background image | --- |
| qualityBg | boolean | hqdefault | Image quality | hqdefault, mqdefault, sddefault, maxresdefault |


### If you have any questions or wishes, write - https://github.com/emorozov28/youtube-iframe/issues