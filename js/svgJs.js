document.getElementById("onlyimage").src = "../" + localStorage["svg"];
var watermarksvg = ''
  function renderWatermark (svgText = '201250203 张若皓') {
    let fontSize = 18
    let svgWidth = fontSize * svgText.length
    let svgHeight = svgWidth
    let rotate = -45
    watermarksvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgWidth}px' height='${svgHeight}px'%3E  %3Ctext  x='${fontSize}' y='0'  fill-opacity='0.1' fill='%23000' transform='translate(0,${svgHeight})rotate(${rotate})'    font-size='${fontSize}'%3E${svgText}%3C/text%3E%3C/svg%3E")`
    document.body.style.setProperty('--watermarksvg', watermarksvg);
  }

renderWatermark('201250203 张若皓')