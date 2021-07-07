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
const youTubeButton = `
    <span class="text-hidden">play video</span>
    <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
        <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
        </path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
`;

const lazyYouTubeLoad = new LazyYouTubeLoad('.video-item', {
    button: youTubeButton
});
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
