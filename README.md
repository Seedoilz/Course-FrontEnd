# README

201250203 张若皓

## 概述（智能前端卡通化功能）

此次，网络前端智能化，除了上一次登陆注册主要使用的express框架以外还有以下内容：

1. **[White-box-Cartoonization](https://github.com/SystemErrorWang/White-box-Cartoonization)**（老师所给的材料中的项目）
2. tensorflow.js
3. tensorflowjs_converter（用户转化老师所给的模型为json格式的模型以及权重文件）

## 安装、运行过程

1. 与上一次登陆注册几乎一致
2. 首先，进入项目，在项目根目录下运行npm install
3. 随后直接运行npm start
4. 点击http://localhost:3001进入页面
5. 可以运行我所包含的sql代码，然后登陆进入homepage页面，也可以直接输入以下网址http://localhost:3001/index来直接进入**“智能前端卡通化”**的页面。

## 具体功能、呈现效果

### 如果正确登陆

在上一次的登陆注册功能的基础上，如果正确登陆进入了以下界面。那么可以在导航栏中选择**“智能前端卡通化”**进入功能。

![image-20221231215040106](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221231215040image-20221231215040106.png)

### 如果直接进入功能页面

随后可以进入**“智能前端卡通化”**的页面之中，页面如下：

![image-20221231215212081](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221231215212image-20221231215212081.png)

其中，左侧可以选择自己需要卡通化的图片，右侧是预览框。“Upload Pics”按钮点击之后能够上传图片，“Save”按钮点击之后，就能够将生成的图片下载下来。效果如下：

![image-20221231215951978](https://typora-tes.oss-cn-shanghai.aliyuncs.com/uPic/20221231215952image-20221231215951978.png)

## 实现思路（具体方法）

由于老师给的项目所给的模型是tensorflow的模型，不能给在javascript中使用，并且由于我上一次使用的框架为express框架并不支持python文件的运行。偶然间，我发现了tensorflowjs这个东西。tensorflowjs既包括javascript中的代码（可以由npm install安装，也可以直接通过以下代码引入，本次实验运用的后者）；

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
```

tensorflowjs还包括可以python的库，其中python中的库是含有tensorflowjs_converter这个内容的，可以帮助我们将tensorflow_saved_model转化为json文件。随后，我安装了这个库并使用了这个库帮助我将模型进行转化。转化出来的结果存放在这个项目中的/public/model目录下，包含一个模型，和两个权重文件。

### 主要方法的介绍(model.js)

首先将 TensorFlow.js 的后端设置为 'wasm'，然后调用 'runModel' 函数。TensorFlow.js 是一个用于训练和部署机器学习模型的 JavaScript 库，'wasm' 后端允许 TensorFlow.js 在 WebAssembly 运行时上运行，与默认的 JavaScript 后端相比，这可以提高性能。

接下来，脚本为 HTML 输入元素（ID 为 'file'）的 'change' 事件设置了事件监听器。当此事件触发时，脚本会将所选文件读取为 DataURL，并将图像元素（ID 为 'input'）的 'src' 属性设置为 DataURL。这允许用户选择图像文件并在网页中显示它。

###  'APP' 对象

根据教程，我定义了一个名为 'APP' 的对象，该对象主要包含的内容就是model，以及关于model的一些属性，用来包装model，方便进行使用。

#### 'predict' 函数

'predict' 函数是执行图像风格化的主要函数。它接受图像元素作为参数，使用 TensorFlow.js 函数处理图像并将其通过机器学习模型。然后使用模型的预测生成图像的风格化版本，并在网页的 canvas 元素中显示。

### 'normalize' 函数

'normalize' 函数用于在将输入图像传递给模型之前对其进行预处理。它在图像的宽度和高度不相等时填充图像，将其调整为固定大小，并通过从每个像素值中减去一个标量值并将结果除以另一个标量值来进行某些归一化。

### 'draw' 函数

'draw' 函数接受风格化后的图像和输入图像的原始大小作为参数，使用 TensorFlow.js 函数在网页的 canvas 元素中呈现风格化后的图像。'scaleCanvas' 函数用于调整 canvas 元素的大小。

### 'runModel' 函数

'runModel' 函数是一个 async 函数，它从 JSON 文件中加载机器学习模型，然后使用 'input' 图像元素作为参数调用 'predict' 函数。这使得网页显示输入图像的风格化版本。

## 参考文献

https://tensorflow.google.cn/js/tutorials/setup?hl=zh-cn

https://www.cnblogs.com/devilyouwei/p/9127061.html

https://tensorflow.google.cn/js/tutorials/conversion/import_saved_model?hl=zh-cn

https://www.jianshu.com/p/09d0ed7e73db



