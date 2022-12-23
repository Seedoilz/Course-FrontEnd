// 获取所有 class 为 btn 的 button 元素
var btnElements = document.querySelectorAll('.svgBtn');
console.log(btnElements);   
// 遍历这些元素，为每个元素添加事件监听器
btnElements.forEach(function(btn) {
btn.addEventListener('click', function() {
// 在这里执行按钮点击事件的逻辑
var parentDiv = btn.parentNode;
var imgSrc = parentDiv.querySelector('img').getAttribute("src");
console.log(imgSrc);
localStorage["svg"] = imgSrc;
window.location.href = "/subpages/svgPage";
});
});

var FTTbtnElements = document.querySelectorAll('.fttBtn'); 
// 遍历这些元素，为每个元素添加事件监听器
FTTbtnElements.forEach(function(btn) {
btn.addEventListener('click', function() {
// 在这里执行按钮点击事件的逻辑
var parentDiv = btn.parentNode;
var imgSrc = parentDiv.querySelector('img').getAttribute("src");
console.log(imgSrc);
localStorage["ftt"] = imgSrc;
window.location.href = "/subpages/fttPage";
});
});
