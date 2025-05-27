export const checkImageUrl = (url, minSize, callback) => {
    const img = new Image();
    img.onload = () => {
        if (img.naturalWidth > minSize && img.naturalHeight > minSize) {
            callback(true);
        } else {
            callback(false);
        }
    };
    img.onerror = () => callback(false); // Ошибка при загрузке
    img.src = url;
};
