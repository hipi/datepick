$.extend({
    /* 
     * @parm el 元素选择
     * @parm model : daterange：日期范围选择;date:日期范围选择
     */
    datepick: function (el, model) {
        var _el = $(el);
        var date = new Date();
        var _model = null;
        var _picktimes = 0; //日期选择点击次数
        var modelText = null;
        if (model == "date") {
            modelText = "请选择日期";
            _model = 1;
        } else if (model == "daterange") {
            modelText = "请选择日期范围";
            _model = 2;
        } else {
            throw new Error("datapick 函数参数传输错误");
        }
        _el.append( // 渲染函数
            '<div class="datepick"> \n\
                <input class="datepick-input" type="text" placeholder="' + modelText + '" /> \n\<div class="datepick-pickDiv" style="position:absolute">\n\
                <div class="body">\n\
                <div class="content is-left">\n\
                    <div class="header"><button type="button" class="arrow-left arrow-y-left"><<</button><button type="button" class="arrow-left arrow-m-left"><</button>\n\
                        <div><span class="datepick-y-left year">' + date.getFullYear() + '</span> 年 <span class="datepick-m-left month">' + (date.getMonth() + 1) + '</span> 月</div>\n\
                    </div>\n\
                    <table cellspacing="0" cellpadding="0" class="date-table isleft">\n\
                        <tbody>\n\
                            <tr>\n\
                                <th>日</th>\n\
                                <th>一</th>\n\
                                <th>二</th>\n\
                                <th>三</th>\n\
                                <th>四</th>\n\
                                <th>五</th>\n\
                                <th>六</th>\n\
                            </tr>\n\
                        </tbody>\n\
                    </table>\n\
                    <ul class="datepick-li-left">\n\
                    </ul>\n\
                </div>\n\
                <div class="content is-right">\n\
                        <div class="header"><button type="button" class="arrow-right arrow-y-right">>></button><button type="button" class="arrow-right arrow-m-right">></button>\n\
                            <div><span class="datepick-y-right year">' + date.getFullYear() + '</span> 年 <span class="month datepick-m-right">' + (date.getMonth() + 2) + '</span> 月</div>\n\
                            </div>\n\
                            <table cellspacing="0" cellpadding="0" class="date-table isright">\n\
                                <tbody>\n\
                                    <tr>\n\
                                        <th>日</th>\n\
                                        <th>一</th>\n\
                                        <th>二</th>\n\
                                        <th>三</th>\n\
                                        <th>四</th>\n\
                                        <th>五</th>\n\
                                        <th>六</th>\n\
                                    </tr>\n\
                                </tbody>\n\
                            </table>\n\
                            <ul class="datepick-li-right">\n\
                            </ul>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>'
        );
        var getRows = function (year, month) {
            var day = new Date(year, month, 0);
            var lastdate = day.getDate(); //获取当月最后一天日期
            day.setDate(1);
            var firstWeek = day.getDay(); //获取当月第一天星期
            var liArr = [];
            for (var i = 0; i < firstWeek; i++) {
                liArr.push('');
            }
            for (var i = 0; i < lastdate; i++) {
                liArr.push(i + 1);
            }
            for (var i = 0; i < 42 - lastdate - firstWeek; i++) {
                liArr.push('');
            }
            var leftRows = liArr;
            var Dom = '';
            for (var i = 0; i < leftRows.length; i++) {
                if (i < firstWeek) {
                    Dom += "<li>" + leftRows[i] + "</li>";
                } else if (i < lastdate + firstWeek) {
                    Dom += "<li class='in'>" + leftRows[i] + "</li>";
                } else {
                    Dom += "<li>" + leftRows[i] + "</li>";
                }
            }
            return Dom
        }
        var render = function (direction, year, month) { //渲染函数
            var allDom = getRows(year, month);
            if (direction == "left") {
                _el.find(".datepick-li-left").empty();
                _el.find(".datepick-li-left").append(allDom);
            } else if (direction == "right") {
                _el.find(".datepick-li-right").empty();
                _el.find(".datepick-li-right").append(allDom);
            } else {
                return false
            }
        }
        /* 切换年月事件  贼烦*/
        var changeDate = function (leftyear, leftmonth) {
            var nowpickleftyear = Number(_el.find(".datepick-y-left").html());
            var nowpickleftmonth = Number(_el.find(".datepick-m-left").html());
            var pickleftyear = new Date(nowpickleftyear + leftyear, nowpickleftmonth - 1 +
                leftmonth).getFullYear();
            var pickleftmonth = new Date(nowpickleftyear + leftyear, nowpickleftmonth - 1 +
                    leftmonth).getMonth() +
                1;
            var pickrightyear = new Date(nowpickleftyear + leftyear, nowpickleftmonth +
                leftmonth).getFullYear();
            var pickrightmonth = new Date(nowpickleftyear + leftyear, nowpickleftmonth +
                    leftmonth).getMonth() +
                1;
            _el.find(".datepick-y-left").html(pickleftyear);
            _el.find(".datepick-m-left").html(pickleftmonth);
            _el.find(".datepick-y-right").html(pickrightyear);
            _el.find(".datepick-m-right").html(pickrightmonth);
            render("left", pickleftyear, pickleftmonth);
            render("right", pickrightyear, pickrightmonth);
        }
        _el.find(".arrow-y-left").click(function () { //切换左边年
            changeDate(-1, 0);
            if (_model == 1) {
                renderOriginalDate();
            } else {
                renderOriginalDaterange()
            }
        });
        _el.find(".arrow-m-left").click(function () { //切换左边月
            changeDate(0, -2);
            if (_model == 1) {
                renderOriginalDate();
            } else {
                renderOriginalDaterange()
            }
        })
        _el.find(".arrow-y-right").click(function () { //切换右边年
            changeDate(1, 0);
            if (_model == 1) {
                renderOriginalDate();
            } else {
                renderOriginalDaterange()
            }
        });
        _el.find(".arrow-m-right").click(function () { //切换右边月
            changeDate(0, 2);
            if (_model == 1) {
                renderOriginalDate();
            } else {
                renderOriginalDaterange()
            }
        });
        // 点击其他区域关闭下拉列表
        window.addEventListener('click', function (e) {
            if (e) {
                if (_el.find(".datepick-pickDiv") && _el.find(
                        ".datepick-pickDiv")[0].contains(e.target) || e.target ==
                    _el.find(
                        "input")[0]) {
                    _el.find(".datepick-pickDiv").show();
                } else {
                    _el.find(".datepick-pickDiv").hide();
                    /* 重新渲染本月和下一个月 */
                    if (_model == 1) {
                        render("left", date.getFullYear(), date.getMonth() + 1);
                        render("right", date.getFullYear(), date.getMonth() + 2);
                        _el.find(".datepick-y-left").html(date.getFullYear());
                        _el.find(".datepick-m-left").html(date.getMonth() + 1);
                        _el.find(".datepick-y-right").html(date.getFullYear());
                        _el.find(".datepick-m-right").html(date.getMonth() + 2);
                    }

                }
            }
        });
        var renderOriginalDate = function () {
            var nowInputVal = _el.find(".datepick-input").val().trim();
            if (nowInputVal.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)) {
                var nowyaer = Number(nowInputVal.split('-')[0]);
                var nowmonth = Number(nowInputVal.split('-')[1]);
                var nowdate = Number(nowInputVal.split('-')[2]);
                var changeyear = Number(_el.find(".datepick-y-left").html());
                var changemonth = Number(_el.find(".datepick-m-left").html());
                if (nowyaer == changeyear && nowmonth == changemonth) {
                    _el.find(".datepick-li-left .in").each(function () {
                        $(this).html() == nowdate && $(this).addClass("active")
                    });
                }
            }
        }
        var renderOriginalDaterange = function () {
            var nowInputVal = _el.find(".datepick-input").val().trim();
            if (nowInputVal) {
                /* TODO 根据表格时间翻页*/
                var nowStartyaer = Number(nowInputVal.split(" - ")[0].split('-')[0]);
                var nowStartmonth = Number(nowInputVal.split(" - ")[0].split('-')[1]);
                var nowStartdate = Number(nowInputVal.split(" - ")[0].split('-')[2]);
                var nowEndyaer = Number(nowInputVal.split(" - ")[1].split('-')[0]);
                var nowEndmonth = Number(nowInputVal.split(" - ")[1].split('-')[1]);
                var nowEnddate = Number(nowInputVal.split(" - ")[1].split('-')[2]);
                var changeyear = Number(_el.find(".datepick-y-left").html());
                var changemonth = Number(_el.find(".datepick-m-left").html());
                var changerightyear = Number(_el.find(".datepick-y-right").html());
                var changerightmonth = Number(_el.find(".datepick-m-right").html());
                var timeactiveStartIn;
                var timeactiveEndIn;
                var startTime = new Date(nowStartyaer, nowStartmonth - 1, nowStartdate).getTime();
                var endTime = new Date(nowEndyaer, nowEndmonth - 1, nowEnddate).getTime();
                /* 开始日期一定在左边 */
                if (nowStartyaer == changeyear && nowStartmonth == changemonth) {
                    _el.find(".datepick-li-left li.in").each(function (i) {
                        $(this).html() == nowStartdate && $(this).addClass("timein-active") && (timeactiveStartIn = i);
                    })
                }
                if (nowStartyaer == changerightyear && nowStartmonth == changerightmonth) {

                    _el.find(".datepick-li-right li.in").each(function (i) {
                        $(this).html() == nowStartdate && $(this).addClass("timein-active") && (timeactiveStartIn = i);
                    })
                }
                if ((nowEndyaer == changeyear && nowEndmonth == changemonth) || (nowEndyaer == changerightyear && nowEndmonth == changerightmonth)) {

                    if (nowEndyaer == changeyear && nowEndmonth == changemonth) {
                        _el.find(".datepick-li-left li.in").each(function (i) {
                            $(this).html() == nowEnddate && $(this).addClass("timein-active") && (timeactiveEndIn = i);
                        })
                    } else {
                        _el.find(".datepick-li-right li.in").each(function (i) {
                            $(this).html() == nowEnddate && $(this).addClass("timein-active") && (timeactiveEndIn = i);
                        });
                        timeactiveEndIn = timeactiveEndIn + _el.find(".datepick-li-left li.in").length;
                    }
                }
                /* 左边 */
                _el.find(".datepick-li-left li.in").each(function (i) {
                    var edate = Number($(this).html());
                    var eTime = new Date(changeyear, changemonth - 1, edate).getTime();
                    if (eTime > startTime && eTime < endTime) {
                        $(this).addClass("timein-inrange");
                    }
                })
                /* 右边 */
                _el.find(".datepick-li-right li.in").each(function (i) {
                    var edate = Number($(this).html());
                    var eTime = new Date(changerightyear, changerightmonth - 1, edate).getTime();
                    if (eTime > startTime && eTime < endTime) {
                        $(this).addClass("timein-inrange");
                    }
                })
                if (_picktimes == 1) {
                    _el.find("li.in").removeClass("timein-active").removeClass("timein-inrange").removeClass("timein-activeEnd");
                }
            } else { //选择第一个时间后的翻页
                var changeyear = Number(_el.find(".datepick-y-left").html());
                var changemonth = Number(_el.find(".datepick-m-left").html());
                var changerightyear = Number(_el.find(".datepick-y-right").html());
                var changerightmonth = Number(_el.find(".datepick-m-right").html());
                if (changeyear == firstpickyear && changemonth == firstpickmonth) {
                    _el.find(".datepick-li-left li.in").each(function () {
                        if (Number($(this).html()) == firstpickdate) {
                            $(this).addClass("active")
                        }
                    })
                }
                if (changerightyear == firstpickyear && changerightmonth == firstpickmonth) {
                    _el.find(".datepick-li-right li.in").each(function () {
                        if (Number($(this).html()) == firstpickdate) {
                            $(this).addClass("active")
                        }
                    })
                }
            }
        }
        var takeTwo = function (number) {
            number = Number(number);
            if (number < 10) {
                return 0 + String(number);
            } else {
                return String(number)
            }
        }
        _el.find(".datepick-input").focus(function () { //input 有时间 恢复时间
            _picktimes = 0; // 还原日期点击次数
            position(); //定位问题
            if ($(this).val()) {
                if (_model == 1) { //model1
                    var nowInputVal = $(this).val().trim();
                    if (nowInputVal.match(/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/)) {
                        var nowyaer = Number(nowInputVal.split('-')[0]);
                        var nowmonth = Number(nowInputVal.split('-')[1]);
                        var nowdate = Number(nowInputVal.split('-')[2]);
                        _el.find(".datepick-y-left").html(nowyaer);
                        _el.find(".datepick-m-left").html(nowmonth);
                        /* new Date(nowyaer, nowmonth).getFullYear();
                        new Date(nowyaer, nowmonth).getMonth()+1; */
                        _el.find(".datepick-y-right").html(new Date(nowyaer, nowmonth).getFullYear());
                        _el.find(".datepick-m-right").html(new Date(nowyaer, nowmonth).getMonth() + 1); //有问题 不该加一
                        var _li = _el.find("li");
                        _li.removeClass("active");
                        _el.find(".datepick-li-left .in").each(function () {
                            $(this).html() == nowdate && $(this).addClass("active")
                        });
                    } else {
                        $(this).val(null);
                        alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例  如：2017-07-01\n\r");
                        return;
                    }
                } else { //model2
                    _el.off('mouseover', "li.in");
                    // TODO  日期范围选择
                    var nowInputVal = $(this).val().trim();
                    if (nowInputVal.split(" - ").length == 2 && nowInputVal.split(" - ")[0].match(/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/) && nowInputVal.split(" - ")[1].match(/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/)) {
                        var nowStartyaer = Number(nowInputVal.split(" - ")[0].split('-')[0]);
                        var nowStartmonth = Number(nowInputVal.split(" - ")[0].split('-')[1]);
                        var nowStartdate = Number(nowInputVal.split(" - ")[0].split('-')[2]);
                        var nowEndyaer = Number(nowInputVal.split(" - ")[1].split('-')[0]);
                        var nowEndmonth = Number(nowInputVal.split(" - ")[1].split('-')[1]);
                        var nowEnddate = Number(nowInputVal.split(" - ")[1].split('-')[2]);
                        var startTime = new Date(nowStartyaer, nowStartmonth - 1, nowStartdate).getTime();
                        var endTime = new Date(nowEndyaer, nowEndmonth - 1, nowEnddate).getTime();
                        if(startTime<=endTime){
                            _el.find(".datepick-y-left").html(nowStartyaer);
                            _el.find(".datepick-m-left").html(nowStartmonth);
                            _el.find("li").removeClass("active").removeClass("inrange").removeClass("activeEnd");
                            var timeactiveStartIn;
                            var timeactiveEndIn;
                            _el.find(".datepick-li-left li.in").each(function (i) {
                                $(this).html() == nowStartdate && $(this).addClass("timein-active") && (timeactiveStartIn = i);
                            });
                            _el.find(".datepick-y-right").html(new Date(nowStartyaer, nowStartmonth).getFullYear());
                            _el.find(".datepick-m-right").html(new Date(nowStartyaer, nowStartmonth).getMonth() + 1); //有问题 不该加一
                            if (nowStartyaer == nowEndyaer && nowStartmonth == nowEndmonth) {
                                _el.find(".datepick-li-left li.in").each(function (i) {
                                    $(this).html() == nowEnddate && $(this).addClass("timein-activeEnd") && (timeactiveEndIn = i);
                                });
                                _el.find("li.in:gt(" + timeactiveStartIn + "):lt(" + (timeactiveEndIn - timeactiveStartIn) + ")").addClass("timein-inrange");
                            }
                            if (new Date(nowStartyaer, nowStartmonth).getFullYear() == nowEndyaer && new Date(nowStartyaer, nowStartmonth).getMonth() + 1 == nowEndmonth) {
                                _el.find(".datepick-li-right .in").each(function () {
                                    $(this).html() == nowEnddate && $(this).addClass("timein-activeEnd");
                                });
                                var timeactiveStartIn;
                                _el.find(".datepick-li-left li.in").each(function (i) {
                                    $(this).html() == nowStartdate && $(this).addClass("timein-active") && (timeactiveStartIn = i);
                                });
                                _el.find(".datepick-li-left .in:gt(" + timeactiveStartIn + ")").addClass("timein-inrange");
    
                                _el.find(".datepick-li-right .in.timein-activeEnd").prevAll(".in").addClass("timein-inrange");
                            }
                            if (new Date(nowStartyaer, nowStartmonth).getFullYear() < nowEndyaer || (new Date(nowStartyaer, nowStartmonth).getFullYear() == nowEndyaer && new Date(nowStartyaer, nowStartmonth).getMonth() + 1 < nowEndmonth)) {
                                _el.find(".datepick-li-right li.in").addClass("timein-inrange");
                                var timeactiveStartIn;
                                _el.find(".datepick-li-left li.in").each(function (i) {
                                    $(this).html() == nowStartdate && $(this).addClass("timein-active") && (timeactiveStartIn = i);
                                });
                                _el.find(".datepick-li-left li.in:gt(" + timeactiveStartIn + ")").addClass("timein-inrange");
                            }
                            /* TODO 方案2 */
                            /* _el.find("li").removeClass("active").removeClass("inrange").removeClass("activeEnd");
                            renderOriginalDaterange(); */
                        }else{
                            alert("请输入正确的日期范围");
                        }
                       
                    } else {
                        $(this).val(null);
                        alert("请输入正确的日期\n\r日期格式：yyyy-mm-dd - yyyy-mm-dd");
                        return;
                    }
                }
            } else {
                _el.find("li").removeClass("active").removeClass("inrange").removeClass("activeEnd");
                _el.off('mouseover', "li.in");
            }
        })
        /* 默认本月和下一个月*/
        var rest = function () {
            render("left", date.getFullYear(), date.getMonth() + 1);
            render("right", date.getFullYear(), date.getMonth() + 2);
        }();
        /* 选择事件 */
        if (_model == 1) { //选择日期点
            _el.on('click', "li.in", function (e) {
                $("li.in").removeClass("active");
                $(this).addClass("active");
                var wepickmonth = Number($(this).parent().parent().find(".month").html());
                if (wepickmonth < 10) {
                    wepickmonth = 0 + String(wepickmonth);
                }
                var wepickday = Number($(this).html());
                if (wepickday < 10) {
                    wepickday = 0 + String(wepickday);
                }
                var wepickdate = Number($(this).parent().parent().find(".year").html()) +
                    '-' + wepickmonth + '-' + wepickday;
                _el.find(".datepick-input").val(wepickdate);
                setTimeout(function () {
                    _el.find(".datepick-pickDiv").hide();
                }, 200)
                e.stopPropagation();
            });
        } else {
            var secondpickyear, firstpickyear, secondpickmonth, firstpickmonth, secondpickdate, firstpickdate;
            _el.on('click', "li.in", function (e) {
                // _el.find("li.in").removeClass("active");
                _picktimes++;
                _el.find("li.in").removeClass("timein-active").removeClass("timein-inrange").removeClass("timein-activeEnd")
                if (_picktimes == 1) {
                    
                    firstpickmonth = Number($(this).parent().parent().find(".month").html());
                    firstpickyear = Number($(this).parent().parent().find(".year").html());
                    firstpickdate = Number($(this).html());
                    var firstpickTime = new Date(firstpickyear, firstpickmonth - 1, firstpickdate).getTime();
                    $(this).addClass("active");
                    _el.on('mouseover', "li.in", function () {
                        var changeyear = Number(_el.find(".datepick-y-left").html());
                        var changemonth = Number(_el.find(".datepick-m-left").html());
                        var changerightyear = Number(_el.find(".datepick-y-right").html());
                        var changerightmonth = Number(_el.find(".datepick-m-right").html());
                        /* 左边 */
                        if ($(this).parent().is(".datepick-li-left")) {
                            var moveTime = new Date(changeyear, changemonth - 1, $(this).html()).getTime();

                            if (moveTime < firstpickTime) {
                                $(this).parent().find(".active").addClass("movelessactive");
                            } else {
                                _el.find(".movelessactive").removeClass("movelessactive")
                            }
                            _el.find(".datepick-li-left li.in").each(function (i) {
                                $(this).removeClass("activeEnd");
                                var alldate = Number($(this).html());
                                var eTime = new Date(changeyear, changemonth - 1, alldate).getTime();
                                if (eTime > firstpickTime && eTime < moveTime) {
                                    $(this).addClass("inrange");
                                } else if (eTime == moveTime) {
                                    $(this).addClass("activeEnd");
                                } else {
                                    $(this).removeClass("inrange").removeClass("activeEnd");
                                }
                            })
                            _el.find(".datepick-li-right li.in").each(function (i) {
                                $(this).removeClass("inrange").removeClass("activeEnd");
                            })
                        } else { //右边
                            var moveTime = new Date(changerightyear, changerightmonth - 1, $(this).html()).getTime();
                            if (moveTime < firstpickTime) {
                                $(this).parent().find(".active").addClass("movelessactive");
                            } else {
                                _el.find(".movelessactive").removeClass("movelessactive");
                            }
                            _el.find(".datepick-li-left li.in").each(function (i) {
                                $(this).removeClass("activeEnd");
                                var alldate = Number($(this).html());
                                var eTime = new Date(changeyear, changemonth - 1, alldate).getTime();
                                if (eTime > firstpickTime) {
                                    $(this).addClass("inrange");

                                } else {
                                    $(this).removeClass("inrange").removeClass("activeEnd");
                                }
                            })
                            _el.find(".datepick-li-right li.in").each(function (i) {
                                $(this).removeClass("activeEnd");
                                var alldate = Number($(this).html());
                                var eTime = new Date(changerightyear, changerightmonth - 1, alldate).getTime();
                                if (eTime > firstpickTime && eTime < moveTime) {
                                    $(this).addClass("inrange");

                                } else if (eTime == moveTime) {
                                    $(this).addClass("activeEnd");
                                } else {
                                    $(this).removeClass("inrange").removeClass("activeEnd");

                                }
                            })
                        }
                    })
                } else if (_picktimes == 2) {
                    secondpickmonth = Number($(this).parent().parent().find(".month").html());
                    secondpickyear = Number($(this).parent().parent().find(".year").html());
                    secondpickdate = Number($(this).html());
                    if (new Date(secondpickyear, secondpickmonth - 1, secondpickdate).getTime() >= new Date(firstpickyear, firstpickmonth - 1, firstpickdate).getTime()) {
                        $('this').addClass("active");
                        _el.off('mouseover', "li.in");
                        firstpickmonth = takeTwo(firstpickmonth);
                        firstpickdate = takeTwo(firstpickdate);
                        secondpickmonth = takeTwo(secondpickmonth);
                        secondpickdate = takeTwo(secondpickdate);

                        _el.find(".datepick-input").val(firstpickyear + "-" + firstpickmonth + "-" + firstpickdate + " - " + secondpickyear + "-" + secondpickmonth + "-" + secondpickdate);
                        _picktimes = 0;
                        setTimeout(function () {
                            _el.find(".datepick-pickDiv").hide();
                        }, 200);
                    } else {
                        _picktimes = 1;
                        _el.find(".movelessactive").removeClass("movelessactive");
                        _el.find("li.in").removeClass("active").removeClass("inrange").removeClass("timein-inrange");
                        $(this).addClass("active");
                        _el.off('mouseover', "li.in");
                        firstpickmonth = Number($(this).parent().parent().find(".month").html());
                        firstpickyear = Number($(this).parent().parent().find(".year").html());
                        firstpickdate = Number($(this).html());
                        var firstpickTime = new Date(firstpickyear, firstpickmonth - 1, firstpickdate).getTime();
                        $(this).addClass("active");
                        _el.on('mouseover', "li.in", function () {
                            var changeyear = Number(_el.find(".datepick-y-left").html());
                            var changemonth = Number(_el.find(".datepick-m-left").html());
                            var changerightyear = Number(_el.find(".datepick-y-right").html());
                            var changerightmonth = Number(_el.find(".datepick-m-right").html());
                            /* 左边 */
                            if ($(this).parent().is(".datepick-li-left")) {
                                var moveTime = new Date(changeyear, changemonth - 1, $(this).html()).getTime();
                                _el.find(".datepick-li-left li.in").each(function (i) {
                                    $(this).removeClass("activeEnd");
                                    var alldate = Number($(this).html());
                                    var eTime = new Date(changeyear, changemonth - 1, alldate).getTime();
                                    if (eTime > firstpickTime && eTime < moveTime) {
                                        $(this).addClass("inrange");
                                    } else if (eTime == moveTime) {
                                        $(this).addClass("activeEnd");
                                    } else {
                                        $(this).removeClass("inrange").removeClass("activeEnd");
                                    }
                                })
                                _el.find(".datepick-li-right li.in").each(function (i) {
                                    $(this).removeClass("inrange").removeClass("activeEnd");
                                })
                            } else { //右边
                                var moveTime = new Date(changerightyear, changerightmonth - 1, $(this).html()).getTime();
                                _el.find(".datepick-li-left li.in").each(function (i) {
                                    $(this).removeClass("activeEnd");
                                    var alldate = Number($(this).html());
                                    var eTime = new Date(changeyear, changemonth - 1, alldate).getTime();
                                    if (eTime > firstpickTime) {
                                        $(this).addClass("inrange");
                                    } else {
                                        $(this).removeClass("inrange").removeClass("activeEnd");
                                    }
                                })
                                _el.find(".datepick-li-right li.in").each(function (i) {
                                    $(this).removeClass("activeEnd");
                                    var alldate = Number($(this).html());
                                    var eTime = new Date(changerightyear, changerightmonth - 1, alldate).getTime();
                                    if (eTime > firstpickTime && eTime < moveTime) {
                                        $(this).addClass("inrange");
                                    } else if (eTime == moveTime) {
                                        $(this).addClass("activeEnd");
                                    } else {
                                        $(this).removeClass("inrange").removeClass("activeEnd");
                                    }
                                })
                            }
                        })
                    }
                } else {
                    _picktimes = 0;
                    _el.find("li.in").removeClass("active").removeClass("activeEnd").removeClass("inrange");
                    _el.off('mouseover', "li.in");
                }
                e.stopPropagation();
            });
        }
        /* 定位问题 */
        var position = function () {
            var elBottom = function (el) {
                return $(window).height() - el.height() - el.offset().top + $(document).scrollTop();
            }
            var elRight = function (el) {
                return $(window).width() - el.width() - el.offset().left + $(document).scrollLeft();
            }
            _el.find(".datepick").each(function () {
                if (elBottom($(this)) < 300) {
                    $(this).find(".datepick-pickDiv").css("top", -282);
                } else {
                    $(this).find(".datepick-pickDiv").css("top", "auto")
                }
                var right = 522 - $(this).width();
                if (elRight($(this)) < right) {
                    $(this).find(".datepick-pickDiv").css("left", -522 + $(this).width() + elRight($(this)));
                } else {
                    $(this).find(".datepick-pickDiv").css("left", "auto");
                    $(this).find(".datepick-pickDiv").css("right", "auto");
                }
            })
        }
        $(window).scroll(function () {
            position();
        });
    } //结束
});