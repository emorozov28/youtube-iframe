# Lazy-load YouTube Iframe
JavaScript-библиотека для отложенной загрузки видео с YouTube


## ДЕМО
 [Демо плагина](https://emorozov.top/app/youtube-iframe/ )

## Работа с библиотекой
Поместите в ваш проект html разметку:
```html
<div class="video__wrap">
    <div class="video-item" data-video-link="https://youtu.be/Kt-tLuszKBA">
        <button class="video-play"></button>
    </div>
</div>
```
В атрибут `data-video-link` нужно вставить код видео со страницы видео на YouTube (нажмите кнопку поделиться, и скопируйте код)
При необходимости вы также можете вставить свою "заглушку" для видео:
```html 
<div class="video-item" data-video-link="..." style="background-image: url (img/intro.png);">
```

Также вы можете сделать подпись к видео, добавив внутрь тег `span` с классом `video-caption`:
```html 
<div class="video-item" data-video-link="...">
    <span class="video-caption">Your text</span>
</div>
```
Если вам нужно изменить стиль подписи, добавьте к нему свой класс `<span class="video-caption your-class">Your text</span>`

## Запуск
Для начала работы плагина скопируйте код ниже и добавьте его в ваш проект
```javascript

const lazyYouTubeLoad = new LazyYouTubeLoad();
```

## Параметры

### button

Если вы хотите изменить кнопку, вам необходимо прописать внутренние элементы этой кнопки в параметре

`default value - null`
```javascript
const youTubeButton = `your code`;
```

### bgImage

Удаление фоновое изображение

`default value - true`
```javascript
const lazyYouTubeLoad = new LazyYouTubeLoad({
    bgImage: true
});
```

### qualityBg

Изменение качества фонового изображения

`default value - hqdefault`
```javascript
const lazyYouTubeLoad = new LazyYouTubeLoad({
    qualityBg: 'hqdefault'
});
```
+ Для высокого качества используйте - `"hqdefault"`
+ Для среднего качества используйте - `"mqdefault"`
+ Для миниатюры стандартной четкости используйте - `"sddefault"`
+ Для миниатюры с максимальным разрешением используйте - `"maxresdefault"`
