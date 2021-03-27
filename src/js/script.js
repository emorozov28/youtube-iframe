const videos = document.querySelectorAll('.video-item');

const generateUrl = function (id, autoplay) {
    const query = `?rel=0&showinfo=0&autoplay=${autoplay}`;

    return `https://www.youtube.com/embed/${id}${query}`;
};

const createIframe = function (id, autoplay) {
    const iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('src', generateUrl(id, autoplay));

    return iframe;
};

const imgSrc = [];
const captionText = [];

videos.forEach((el) => {
    const videoHref = el.getAttribute('data-video');

    const deletedLength = 'https://youtu.be/'.length;

    const videoId = videoHref.substring(deletedLength, videoHref.length);

    const img = el.querySelector('.video-img');

    if (!img.hasAttribute('src')) {
        const youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
        img.setAttribute('src', youtubeImgSrc);
    }



    el.addEventListener('click', (e) => {
        imgSrc.push(el.querySelector('img').getAttribute('src'));

        el.querySelector('.video-caption') ?
            captionText.push(el.querySelector('.video-caption').textContent) :
            captionText.push(null)

        videos.forEach(item => {

            if (item.querySelector('iframe')) {
                item.querySelector('iframe').remove();

                const showCaption = () => {
                    if (captionText[captionText.length - 2] !== null) {
                        return `<span class="video-caption">${captionText[captionText.length - 2]}</span>`
                    } 
                    
                    return ''
                }

                console.log(showCaption())

                let DOMElement = `
                    <img src="${imgSrc[imgSrc.length - 2]}" alt="video" class="video__img video-img">
                    <button class="btn-video-play video-play"><span class="text-hidden">play video</span></button>
                    ${showCaption()}
                `;

                item.innerHTML = DOMElement;
            }
        });

        e.preventDefault();
        const iframe = createIframe(videoId, 1);
        el.querySelector('img').remove();
        el.appendChild(iframe);
        el.querySelector('button').remove();
        el.querySelector('.video-caption') ? el.querySelector('.video-caption').remove() : null;
    });
});


