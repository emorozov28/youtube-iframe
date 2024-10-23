export enum BackgroundQuality {
    HQ_DEFAULT = 'hqdefault',
    MQ_DEFAULT = 'mqdefault',
    SD_DEFAULT = 'sddefault',
    MAX_RES_DEFAULT = 'maxresdefault',
}

export interface IOptionsConfig {
    buttonContent?: string;
    customBackgroundQuality?: BackgroundQuality;
}
