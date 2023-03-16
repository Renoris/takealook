export function convertImageScaleSmall(image) {
    const index = image.indexOf("type=");
    return `${image.slice(0, index)}type=m77_110_2`;
}
export function convertImageScaleMedium(image) {
    const index = image.indexOf("type=");
    return `${image.slice(0, index)}type=m203_290_2`;
}

export function getMovieListThumb(thumbs) {
    let index = 0;
    let array = [
        {thumb:`${window.location.protocol}//${window.location.host}/images/no_image.png`},
        {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_black.png`},
        {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_color.png`},
    ];
    for (const item of thumbs) {
        if (item.thumb) {
            array[index] = item;
            index++;
        }
        if (index >= 3) {
            break;
        }
    }
    return array;
}

export function reFreshMovieListImage(refreshThumbArg) {
    let thumbIndex = 0;
    const {thumbArray, thumbNodes} = refreshThumbArg;
    for (let i = 0; i < thumbNodes.length; i++) {
        for (let j = thumbIndex; j < thumbArray.length; j++){
            if (thumbArray[thumbIndex].thumb) {
                thumbNodes[i].src = thumbArray[thumbIndex].thumb;
                thumbIndex++;
                break;
            } else {
                thumbIndex++;
            }
        }
    }
}