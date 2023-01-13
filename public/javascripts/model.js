tf.setBackend('wasm').then(() => runModel())

async function predict(imgElement) {
  let img = tf.browser.fromPixels(imgElement)
  var shape = img.shape
  var [w, h] = shape
  var [y, z] = img.shape
  var pad0 = (y > z) ? [[0, 0], [y - z, 0], [0, 0]] : [[z - y, 0], [0, 0], [0, 0]]
  var size = APP.size
  var pianyi = tf.scalar(127.5)
  var temp = performance.now()
  var pad = Math.round(Math.abs(w - h) / Math.max(w, h) * APP.size)
  var slice = (w > h) ? [0, pad, 0] : [pad, 0, 0]
  var result
  var timer
  var scaleby
  img = img.pad(pad0)
  img = tf.image.resizeBilinear(img, [size, size]).reshape([1, size, size, 3])
  img = img.sub(pianyi).div(pianyi)
  temp = performance.now()
  result = await APP.model.predict({ 'input_photo:0': img })
  timer = performance.now() - temp
  let img_out = await result.squeeze().sub(tf.scalar(-1)).div(tf.scalar(2)).clipByValue(0, 1)
  pad = Math.round(Math.abs(w - h) / Math.max(w, h) * APP.size)
  slice = (w > h) ? [0, pad, 0] : [pad, 0, 0]
  img_out = img_out.slice(slice)
  scaleby = shape[0] / img_out.shape[0]
  tf.browser.toPixels(img_out, document.getElementById('output'))
  document.getElementById('output').classList.remove('d-none')
  document.getElementById('output').classList.add('d-block')
  document.getElementById('status').classList.add('d-none')
  setTimeout(() => scaleCanvas(scaleby))
  console.log(Math.round(timer / 1000 * 10) / 10)
}

document.getElementById('file').addEventListener('change', event1 => {
  event1.target.files.forEach(f => {
    if (!f.type.match('image.*')) { return }
    let reader = new FileReader()
    reader.onload = e => { document.getElementById('input').src = e.target.result }
    reader.readAsDataURL(f)
  })
  event1.target.value = null
})

document.querySelectorAll('#examples img').forEach(
  img => img.addEventListener('click', event2 => 
  { document.getElementById('input').src = img.src })
)

const APP = {
  model: null, size: 600,
  $: n => document.getElementById(n),
  path: '../model/model.json'
}

function scaleCanvas(p=2) {
  var canvas = APP.$('result')
  var tmpcan = document.createElement('canvas')
  var tctx = tmpcan.getContext('2d')
  var cw = canvas.width
  var ch = canvas.height
  var ctx = canvas.getContext('2d')
  tmpcan.width = cw
  tmpcan.height = ch
  tctx.drawImage(canvas, 0, 0)
  canvas.width = canvas.width * p
  canvas.height = canvas.height * p
  ctx.drawImage(tmpcan, 0, 0, cw, ch, 0, 0, cw*p, ch*p)
  document.getElementById('download').href = canvas.toDataURL('image/png')
}

const runModel = async () => {
  APP.model = await tf.loadGraphModel(APP.path)
  APP.model.predict(tf.zeros([1, 1, 1, 3])).dispose()
  predict(document.getElementById('input'))
  document.getElementById('input').onload = () => {
    setTimeout(() => {
      document.getElementById('status').classList.remove('d-none')
      document.getElementById('output').classList.add('d-none')
      document.getElementById('output').classList.remove('d-block')
    }, 0)
    setTimeout(() => { predict(document.getElementById('input')) }, 50)
  }
}