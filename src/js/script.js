export default class LazyYouTubeLoad {

    constructor({
            selector,
            button = null,
            bgImage = true,
            qualityBg = 'hqdefault' }) {

        this.selector = selector,
        this.qualityBg = qualityBg;
        this.button = button;
        this.bgImage = bgImage;

        this.captionText = [];

        this.init();
    }

    init() {

        const selector = document.querySelectorAll(this.selector);

        if (selector && selector.length === 0) {
            throw new Error(`Selector "${this.selector}" not found`);
        }

        selector.forEach((el) => {
            const videoHref = el.getAttribute('data-video-link');
            const deletedLength = 'https://youtu.be/'.length;
            const videoId = videoHref.substring(deletedLength, videoHref.length);

            el.querySelector('.video-play').innerHTML = this.button;

            this.isBgImage(el, videoId)

            el.addEventListener('click', (e) => {

                el.querySelector('.video-caption') ?
                    this.captionText.push(el.querySelector('.video-caption').textContent) :
                    this.captionText.push(null);

                selector.forEach(item => {

                    if (item.querySelector('iframe')) {
                        item.querySelector('iframe').remove();

                        const captionText = this.captionText[this.captionText.length - 2];

                        const showCaption = () => {
                            if (captionText !== null) {
                                return `<span class="video-caption">${this.captionText[this.captionText.length - 2]}</span>`
                            }

                            return '';
                        }

                        const DOMElement = `
                            <button class="btn-video-play video-play">${this.button}</button>
                            ${showCaption()}
                        `;
                        item.innerHTML = DOMElement;
                    }
                });

                e.preventDefault();
                const iframe = this.createIframe(videoId, 1);
                el.appendChild(iframe);
                el.querySelector('.video-play') ? el.querySelector('.video-play').remove() : null;
                el.querySelector('.video-caption') ? el.querySelector('.video-caption').remove() : null;
            });
        });
    }

    generateUrl(id, autoplay) {
        const query = `?rel=0&showinfo=0&autoplay=${autoplay}`;
        return `https://www.youtube.com/embed/${id}${query}`;
    }

    createIframe(id, autoplay) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('src', this.generateUrl(id, autoplay));
        return iframe;
    }

    isBgImage(element, videoId) {

        if (this.bgImage) {
            const youtubeImgSrc = `https://i.ytimg.com/vi/${videoId}/${this.qualityBg}.jpg`;
            console.log(youtubeImgSrc)
            element.style.backgroundImage = `url(${youtubeImgSrc})`;
        } else {
            element.removeAttribute('style');
        }
    }
}
