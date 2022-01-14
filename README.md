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
Пример:
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
```javascript
@import 'lazy-load-youtube/css';
```
```javascript
or connect styles in js
import 'lazy-load-youtube/css/index.css';
```
#### js
```javascript
import LazyLoadYouTube from 'lazy-load-youtube';
new LazyLoadYouTube('.js-video-item');
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


## Работа с библиотекой
Поместите в ваш проект html разметку:
```html
<div class="video__wrap">
    <div class="video__item js-video-item" data-video-link="https://youtu.be/Kt-tLuszKBA">
        <button class="video__play js-video-play"></button>
    </div>
</div>
```
В атрибут `data-video-link` нужно вставить ссылку на видео YouTube либо указать id
Пример:
```html
 - https://www.youtube.com/watch?v=Y_plhk1FUQA&t=8278s  <-link video
 - https://youtu.be/Y_plhk1FUQA  <-link video
 - Y_plhk1FUQA  <-id video
 ```

При необходимости вы также можете вставить свою "заглушку" для видео:
```html 
<div class="video__item js-video-item" data-video-link="..." 
    style="background-image: url (img/intro.png);">
```

Также вы можете сделать подпись к видео, добавив внутрь тег с классом `video__caption` и `js-video-caption`:
```html 
<div class="video__item js-video-item" data-video-link="...">
    <span class="video__caption js-video-caption">Your text</span>
    <button class="video__play js-video-play"></button>
</div>
```

## Запуск
Для начала работы скачайте библиотеку `npm i lazy-load-youtube` и импортируйте в ваш проект
#### css
```javascript
@import 'lazy-load-youtube/css';
```
```javascript
или подключите стили в js
import 'lazy-load-youtube/css/index.css';
```
#### js
```javascript
import LazyLoadYouTube from 'lazy-load-youtube';
new LazyLoadYouTube('.js-video-item');
```
### Остановика видео
Создаем кнопку с классом `js-video-stop`
```html
<button class="js-video-stop">Stop Video</button>
```
Вызываем метод `stopVideo`
```javascript
const lazyLoadYouTube = new LazyLoadYouTube('.js-video-item');
lazyLoadYouTube.stopVideo();
```




## Параметры

### button
Изменение содержания кнопки запуска
```javascript
new LazyLoadYouTube('.js-video-item', {
    button: '<svg>...</svg>'
});
```
Название кнопки
`default value - Play video`
```javascript
new LazyLoadYouTube('.js-video-item', {
    buttonLabel: 'Play'
});
```

### bgImage

Удаление фоновое изображение
`default value - true`
```javascript
new LazyLoadYouTube('.js-video-item', {
    imageBg: false
});
```

### qualityBg

Изменение качества фонового изображения

`default value - hqdefault`
```javascript
new LazyYouTubeLoad({
    qualityBg: 'hqdefault'
});
```
+ Для высокого качества - `"hqdefault"`
+ Для среднего качества - `"mqdefault"`
+ Для миниатюры стандартной четкости - `"sddefault"`
+ Для миниатюры с максимальным разрешением - `"maxresdefault"`

| Name | Type | Default | Description | Extra options |
| --- | --- | --- | --- | --- |
| button | string | svg | Содержимое кнопки | --- |
| buttonLabel | string | Play video | Для скринридеров | --- |
| imageBg | boolean | true | Фоновое изображение | --- |
| qualityBg | boolean | hqdefault | Качество изображение | hqdefault, mqdefault, sddefault, maxresdefault |
