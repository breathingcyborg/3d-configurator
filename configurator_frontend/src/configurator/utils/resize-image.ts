export function resizeImage(file: File, maxWidth = 1920): Promise<{ base64URL: string, width: number, height: number }> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function (event: ProgressEvent<FileReader>) {
            let img = new Image();

            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx!.drawImage(img, 0, 0, width, height);
                let resizedImage = canvas.toDataURL('image/jpeg');
                resolve({
                    base64URL: resizedImage,
                    width: width,
                    height: height,
                });
            };

            img.src = event.target!.result as string;
        };

        reader.onerror = function (ev) {
            reject(ev);
        };

        reader.readAsDataURL(file);
    });
}
