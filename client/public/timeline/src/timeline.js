function timeline({containerId, frameFolder, firstFrameName, frameCount}) {
  const initLayout = (layoutContainer, rangeMax) => {
    const container = document.getElementById(layoutContainer);
    container.classList.add("timelineWrapper");

    // progress bar
    const progressBar = document.createElement("div");
    progressBar.classList.add("progressBar");

    const progress = document.createElement("div");
    progress.classList.add("progress");
    progressBar.appendChild(progress);

    // image
    const image = document.createElement("img");
    image.src = `${window.location.href}${frameFolder}/${firstFrameName}`;
    image.classList.add("timelineImage");

    // range control
    const rangeControl = document.createElement("input");
    rangeControl.type = "range";
    rangeControl.value = "0";
    rangeControl.min = "0";
    rangeControl.max = String(rangeMax - 1);

    container.appendChild(image);
    container.appendChild(progressBar);
    container.appendChild(rangeControl);

    return {image, progress, rangeControl};
  };

  const setProgressPercentage = (percentage) => {
    progress.style.width = percentage + "%";
  }

  const generateFrameData = (folder = "", file = "", count = 0) => {
    const lastDotIndex = file.lastIndexOf('.');
    const name = file.substr(0, lastDotIndex - 5);
    const ext = file.substr(lastDotIndex, file.length - lastDotIndex);
    let data = [];

    for (let i = 0; i < count; i++) {
      data.push(`./${folder}/${name}.${("000" + i).slice(-4)}${ext}`);
    }

    return {data, name, ext};
  }

  const cacheImages = (frameData) => {

    if (!cacheImages.list) {
      cacheImages.list = [];
    }
    let list = cacheImages.list;
    for (let i = 0; i < frameData.length; i++) {

      let img = new Image();
      img.onload = function () {
        let index = list.indexOf(this);
        if (index !== -1) {
          list.splice(index, 1);
        }
        setProgressPercentage(Math.ceil(100 * i / frameData.length));
      }

      list.push(img);
      img.src = frameData[i];
    }
  }

  const {data: frameData, name: fileNamePattern, ext: fileExt} = generateFrameData(frameFolder, firstFrameName, frameCount);
  const {image, progress, rangeControl} = initLayout(containerId, frameCount);
  cacheImages(frameData);

  rangeControl.addEventListener("input", function (e) {
    image.src = `./${frameFolder}/${fileNamePattern}.${("000" + this.value).slice(-4)}${fileExt}`;
  })
}
