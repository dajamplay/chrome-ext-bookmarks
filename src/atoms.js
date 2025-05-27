import { atom } from 'recoil';

export const bookmarksState = atom({
    key: 'bookmarksState', // Уникальный ключ атома
    default: [], // Начальное значение
});

export const settingsWindowState = atom({
    key: 'settingsWindowState', // Уникальный ключ атома
    default: false, // Начальное значение
});

export const marginItemsState = atom({
    key: 'marginItemsState',
    default: localStorage.getItem('margin') ?? 10,
});

export const sizeItemState = atom({
    key: 'sizeItemState',
    default: localStorage.getItem('size') ?? 140,
});

export const marginLeftRightState = atom({
    key: 'marginLeftRightState',
    default: localStorage.getItem('marginLeftRight') ?? 20,
});

export const dragItemId = atom({
    key: 'dragItemId',
    default: null,
});

export const titleFontSizeState = atom({
    key: 'titleFontSizeState',
    default: localStorage.getItem('titleFontSizeState') ?? 14,
});

export const bgColorState = atom({
    key: 'bgColorState',
    default: localStorage.getItem('bgColorState') ?? '#FFFFFF',
});

export const uploadedImageState = atom({
    key: 'uploadedImageState',
    default: localStorage.getItem('uploadedImage') ?? '',
});

export const isDarkState = atom({
    key: 'isDarkState',
    default: localStorage.getItem('isDarkState') ? localStorage.getItem('isDarkState') !== 'false' : false,
});
