import {IOptionsConfig, BackgroundQuality} from '@src/types';

const _DEFAULT_OPTIONS = {
    buttonContent: `
            <svg height="100%" viewBox="0 0 68 48" width="100%" fill="#000">
                <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
                </path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>`,
    customBackgroundQuality: BackgroundQuality.HQ_DEFAULT,
};

export class LazyLoadYouTube {
    videoItem: NodeListOf<HTMLElement>;
    options: IOptionsConfig;

    constructor(selector: string, options: IOptionsConfig) {
        this.options = {..._DEFAULT_OPTIONS, ...options};
        this.videoItem = document.querySelectorAll(selector);

        this.init();
    }

    private init(): void {
        if (!this.videoItem.length) return;

        this.showVideoInfo();
        this.listeners();

        this.stopVideoPlay = this.stopVideoPlay.bind(this);
    }

    private showVideoInfo() {
        this.videoItem.forEach((video) => {
            const videoHref = video.getAttribute('data-youtube-video-link');
            const videoId = videoHref && this.youtubeParser(videoHref);

            if (videoId) {
                video.setAttribute('data-youtube-video-id', videoId);
                this.isBgImage(video, videoId);
                this.setVideoButton(video);
            }
        });
    }

    private setVideoButton(video: HTMLElement): void {
        const videoButton = video.querySelector<HTMLElement>('[data-youtube-video-button]');
        if (videoButton) {
            videoButton.innerHTML = typeof this.options.buttonContent === 'string' ? this.options.buttonContent! : _DEFAULT_OPTIONS.buttonContent;
        }
    }

    private listeners(): void {
        this.videoItem.forEach((video) => {
            video?.addEventListener('click', (event) => this.playVideo(event, video));
        });
    }

    private playVideo(event: MouseEvent, video: HTMLElement): void {
        event.preventDefault();
        this.stopVideoPlay();

        const videoHref = video.getAttribute('data-youtube-video-link');
        const videoId = videoHref && this.youtubeParser(videoHref);

        video.setAttribute('data-youtube-video-active', 'true');

        this.hideChildrenElement(video);

        if (videoId) {
            const iframe = this.createIframe(videoId, 1);
            video.appendChild(iframe);
        }
    }

    private hideChildrenElement(video: HTMLElement): void {
        if (!video) return;
        const childrenElements = Array.from(video.children) as HTMLElement[];

        childrenElements.forEach((item) => {
            item.setAttribute('data-youtube-video-item', 'true');
            item.style.cssText = 'opacity: 0; visibility: hidden;';
        });
    }

    private showChildrenElement(video: HTMLElement): void {
        if (!video) return;

        const childrenElements = Array.from(video.children) as HTMLElement[];

        childrenElements.forEach((item) => {
            if (item.getAttribute('data-youtube-video-item')) {
                item.removeAttribute('style');
                item.removeAttribute('data-youtube-video-item');
            }
        });
    }

    private youtubeParser(url: string): string {
        const regExp = /^.*((youtu\.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        const match = url.match(regExp);
        if (match !== null && match[7].length === 11) {
            return match[7];
        }
        return url;
    }

    private isBgImage(element: HTMLElement, videoId: string): void {
        if (!element.getAttribute('style')) {
            const backgroundQuality: BackgroundQuality =
                this.options.customBackgroundQuality && Object.values(BackgroundQuality).includes(this.options.customBackgroundQuality)
                    ? this.options.customBackgroundQuality
                    : _DEFAULT_OPTIONS.customBackgroundQuality;

            const youtubeImgSrc = `https://i.ytimg.com/vi/${videoId}/${backgroundQuality}.jpg`;
            element.style.backgroundImage = `url(${youtubeImgSrc})`;
        }
    }

    private createIframe(id: string, autoplay: number): HTMLIFrameElement {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('title', 'YouTube video player');
        iframe.setAttribute('src', this.generateUrl(id, autoplay));
        return iframe;
    }

    private generateUrl(id: string, autoplay: number) {
        const query = `?rel=0&showinfo=0&autoplay=${autoplay}`;
        return `https://www.youtube.com/embed/${id}${query}`;
    }

    stopVideoPlay() {
        const videoActive = document.querySelectorAll('[data-youtube-video-active="true"]');

        if (videoActive.length) {
            videoActive.forEach((video) => {
                const videoElement = video as HTMLElement;
                const iframe = videoElement.querySelector('iframe');
                iframe?.remove();
                this.showChildrenElement(videoElement);
            });
        }
    }
}
