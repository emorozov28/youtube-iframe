class LazyYouTube {

    constructor(selector) {
        this.selector = document.querySelectorAll(selector);

        this.imgSrc = [];
        this.captionText = [];

        this.buttonItem = false;
        this.buttonItemContent = false;
        this.buttonItemClasses = false;


        this.isButton();
        this.init();
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

    isButton() {
        this.selector.forEach(buton => {
            buton.querySelectorAll('.video-play').forEach(el => {
                this.buttonItem = el;
                this.buttonItemContent = this.buttonItem.innerHTML;
                this.buttonItemClasses = this.buttonItem.className;
            });
        });
    }

    init() {
        if (!this.selector) {
            throw new Error('Selector not found');
        }

        this.selector.forEach((el) => {
            const videoHref = el.getAttribute('data-video');
            const deletedLength = 'https://youtu.be/'.length;
            const videoId = videoHref.substring(deletedLength, videoHref.length);
            const img = el.querySelector('.video-img');

            if (!img.hasAttribute('src')) {
                const youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
                img.setAttribute('src', youtubeImgSrc);
            }

            el.addEventListener('click', (e) => {
                this.imgSrc.push(el.querySelector('img').getAttribute('src'));

                el.querySelector('.video-caption') ?
                this.captionText.push(el.querySelector('.video-caption').textContent) :
                this.captionText.push(null);

                this.selector.forEach(item => {

                    if (item.querySelector('iframe')) {
                        item.querySelector('iframe').remove();

                        const showCaption = () => {
                            if (this.captionText[this.captionText.length - 2] !== null) {
                                return `<span class="video-caption">${this.captionText[this.captionText.length - 2]}</span>`
                            }

                            return '';
                        }

                        const showButton = () => {
                            if (this.buttonItem !== false) {
                                return `<button class="${this.buttonItemClasses}">${this.buttonItemContent}</button>`
                            }

                            return '';
                        }

                        const DOMElement = `
                            <img src="${this.imgSrc[this.imgSrc.length - 2]}" alt="video" class="video__img video-img">
                            ${showButton()}
                            ${showCaption()}
                        `;
                        item.innerHTML = DOMElement;
                    }
                });

                e.preventDefault();
                const iframe = this.createIframe(videoId, 1);
                el.querySelector('.video-img') ? el.querySelector('.video-img').remove() : null;
                el.appendChild(iframe);
                el.querySelector('.video-play') ? el.querySelector('.video-play').remove() : null;
                el.querySelector('.video-caption') ? el.querySelector('.video-caption').remove() : null;
            });
        });
    }
}

const lazyYouTube = new LazyYouTube('.video-item');