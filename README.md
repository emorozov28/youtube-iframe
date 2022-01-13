# Lazy-load YouTube Iframe
JavaScript-библиотека для отложенной загрузки видео с YouTube

## ДЕМО
 [Демо плагина](https://emorozov.top/app/youtube-iframe/ )

## Работа с библиотекой
Поместите в ваш проект html разметку:
```html
<div class="video__wrap">
    <div class="video__item js-video-item" data-video-link="https://youtu.be/Kt-tLuszKBA">
        <button class="video__play js-video-play"></button>
    </div>
</div>
```
В атрибут `data-video-link` нужно вставить ссылку на видео YouTube (нажмите кнопку поделиться, и скопируйте код)
При необходимости вы также можете вставить свою "заглушку" для видео:
```html 
<div class="video__item js-video-item" data-video-link="..." 
    style="background-image: url (img/intro.png);">
```

Также вы можете сделать подпись к видео, добавив внутрь тег `span` с классом `video__caption` и `js-video-caption`:
```html 
<div class="video__item js-video-item" data-video-link="...">
    <span class="video__caption js-video-caption">Your text</span>
    <button class="video__play js-video-play"></button>
</div>
```

## Запуск
Для начала работы скачайте библиотеку и подключите ее на страницу HTML и вызовете ниже, указав в качестве параметра `.js-video-item`
```javascript
<script src="script.js"></script>
<script>
    new LazyLoadYouTube('.js-video-item');
</script>
```
Либо импортируйте в ваш проект
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
