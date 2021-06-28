class LazyYouTubeLoad {

    constructor(selector, options) {

        const defaultOptions = {
            button: `
                <span class="text-hidden">Play video</span>
                <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
                    <path
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
                    </path>
                    <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                </svg>`,
            bgImage: true,
            qualityBg: 'hqdefault'
        }

        this.options = { ...defaultOptions, ...options };
        this.selector = selector;
        this.captionText = [];

        this.init();
    }

    init() {

        const selector = document.querySelectorAll(this.selector);

        if (selector && !selector.length) {
            console.info(`Selector "${this.selector}" not found`);
            return;
        }

        selector.forEach((el) => {
            const videoHref = el.getAttribute('data-video-link');
            const deletedLength = 'https://youtu.be/'.length;
            const videoId = videoHref.substring(deletedLength, videoHref.length);

            el.querySelector('.video-play').innerHTML = this.options.button;
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
                            if (captionText !== null) return `<span class="video-caption">${captionText}</span>`;
                            return '';
                        }

                        const DOMElement = `
                            <button class="btn-video-play video-play">${this.options.button}</button>
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
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('title', 'YouTube video player');
        iframe.setAttribute('src', this.generateUrl(id, autoplay));
        return iframe;
    }

    isBgImage(element, videoId) {
        if (!this.options.bgImage) {
            element.removeAttribute('style');
            return;
        } else if (!element.hasAttribute('style') && this.options.bgImage) {
            const youtubeImgSrc = `https://i.ytimg.com/vi/${videoId}/${this.options.qualityBg}.jpg`;
            element.style.backgroundImage = `url(${youtubeImgSrc})`;
        }

    }
}


const lazyYouTubeLoad = new LazyYouTubeLoad('.video-item', {
    // bgImage: false
    // buttonPlaceholder: 'play video 2'
});