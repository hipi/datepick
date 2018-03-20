# datepick

根据 element-ui@1.4.12 版本的日期选择的 UI 重制了基于 jQuery 的日期点选择和日期范围选择
>一个老项目要用element-ui日期选择的样式，就动手写了个简单的
### 示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <title>日期选择插件</title>
    <style>
        #main3 {
            margin-top: 500px;
            margin-bottom: 500px;
        }
    </style>
</head>

<body>

    <div id="main1">
        <h1>日期选择</h1>
    </div>

    <div id="main2">
        <h1>日期范围选择1</h1>
    </div>

    <div id="main3">
        <h1>日期范围选择2</h1>
    </div>

    <script src="http://lib.baomitu.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="./datepick.js"></script>
    <script>
        /* 运行 */
        $.datepick("#main1", "date");
        $.datepick("#main2", "daterange");
        $.datepick("#main3", "daterange");
        $("#main3 input").val("2017-10-28 - 2017-11-19");
    </script>
</body>

</html>
```
用法
```js
$.datepick("#main1", "date");
```

### Attributes

| 属性        |   参数                                   |
| ----------- | ---------------------------------------- |
| 选择器      | 类似 JQuery 的选择器 例：#mian           |
| 模式-change | date：日期点选择 daterange：日期范围选择 |

![img](https://github.com/chenyeah/datepick/raw/master/docs/gif.gif)
