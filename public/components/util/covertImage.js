export function convertImageScaleSmall(image) {
    const index = image.indexOf("type=");
    return `${image.slice(0, index)}type=m77_110_2`;
}
export function convertImageScaleMedium(image) {
    const index = image.indexOf("type=");
    return `${image.slice(0, index)}type=m203_290_2`;
}