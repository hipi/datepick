# datepick
基于 jQuery 的日期点选择和日期范围选择
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <title>Document</title>
</head>

<body>
    <h1>日期选择</h1>
    <div id="main1">
    </div>
    <h1>日期范围选择1</h1>
    <div id="main2">
    </div>
    <h1>日期范围选择2</h1>
    <div id="main3">
    </div>
    <script src="http://lib.baomitu.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="./datepick.js"></script>
    <script>
        /* 运行 */
        $.datepick("#main1", "date");
        $.datepick("#main2", "daterange");
        $.datepick("#main3", "daterange");
    </script>
</body>

</html>
```
### 示例
 用法$.datepick("#main1", "date");

### Attributes
| 属性       |    参数  |
|---------- |-------- |
| 选择器 | 类似JQuery的选择器 例：#mian | 
| 模式-change | date：日期点选择 daterange：日期范围选择 | 



![img](https://github.com/chenyeah/datepick/raw/master/gif.gif) 
