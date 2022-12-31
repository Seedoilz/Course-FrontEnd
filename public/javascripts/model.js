tf.setBackend('wasm').then(() => runModel())

document.getElementById('file').addEventListener('change', evt => {
  evt.target.files.forEach(f => {
    if (!f.type.match('image.*')) { return }
    let reader = new FileReader()
    reader.onload = e => { document.getElementById('input').src = e.target.result }
    reader.readAsDataURL(f)
  })
  evt.target.value = null
})

document.querySelectorAll('#examples img').forEach(
  img => img.addEventListener('click', evt => { document.getElementById('input').src = img.src })
)

const APP = {
  model: null, size: 600,
  $: n => document.getElementById(n),
  path: '../model/model.json'
}

async function predict(imgElement) {
  let img = tf.browser.fromPixels(imgElement)
  const shape = img.shape
  const [w, h] = shape
  img = normalize(img)
  const temp = performance.now()
  const result = await APP.model.predict({ 'input_photo:0': img })
  const timer = performance.now() - temp
  let img_out = await result.squeeze().sub(tf.scalar(-1)).div(tf.scalar(2)).clipByValue(0, 1)
  const pad = Math.round(Math.abs(w - h) / Math.max(w, h) * APP.size)
  const slice = (w > h) ? [0, pad, 0] : [pad, 0, 0]
  img_out = img_out.slice(slice)
  draw(img_out, shape)
  console.log(Math.round(timer / 1000 * 10) / 10)
}

function normalize(img) {
  const [w, h] = img.shape
  const pad = (w > h) ? [[0, 0], [w - h, 0], [0, 0]] : [[h - w, 0], [0, 0], [0, 0]]
  img = img.pad(pad)
  const size = APP.size
  img = tf.image.resizeBilinear(img, [size, size]).reshape([1, size, size, 3])
  const offset = tf.scalar(127.5)
  return img.sub(offset).div(offset)
}

function draw(img, size) {
  const scaleby = size[0] / img.shape[0]
  tf.browser.toPixels(img, document.getElementById('output'))
  document.getElementById('output').classList.remove('d-none')
  document.getElementById('output').classList.add('d-block')
  document.getElementById('status').classList.add('d-none')
  setTimeout(() => scaleCanvas(scaleby))
}

function scaleCanvas(pct=2) {
  const canvas = APP.$('result')
  const tmpcan = document.createElement('canvas')
  const tctx = tmpcan.getContext('2d')
  const cw = canvas.width
  const ch = canvas.height
  tmpcan.width = cw
  tmpcan.height = ch
  tctx.drawImage(canvas, 0, 0)
  canvas.width *= pct
  canvas.height *= pct
  const ctx = canvas.getContext('2d')
  ctx.drawImage(tmpcan, 0, 0, cw, ch, 0, 0, cw*pct, ch*pct)
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