// // document.write('<script src="\/\/assets-cdn.kf5.com\/supportbox\/main.js?' + (new Date).getDay() + '" id="kf5-provide-supportBox" kf5-domain="XBrick.kf5.com" charset="utf-8"><\/script>');
// document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-109683993-1"></script>')
// $(function () {

//     var ip = 'http://10.45.0.41:8881'; 
//     // var ip = 'http://10.0.2.61:8881';
//     // var ip = 'http://chain.imwork.net:8881';
//     //    var ip = 'https://webapi.xbrick.io';
//     // var ip = '//testwebapi.xbrick.io';
//     //公告
//     //统计
//     window.dataLayer = window.dataLayer || [];

//     function gtag() {
//         dataLayer.push(arguments);
//     }
//     gtag('js', new Date());
//     gtag('config', 'UA-109683993-1');
//     //下载二维码
//     if (0 != $('.appdownload').length) {
//         $('.appdownload>.app-right>#qrcode').qrcode({
//             width: 150,
//             height: 150,
//             correctLevel: 0,
//             text: 'https://www.xbrick.io/app-download.html'
//         });
//     }
//     // 切换首页轮播图片
//     $('#banner').on('click', function (e) {
//         e = e || window.event,
//             $that = $(e.target);

//         if (0 < $that.closest('.w-sign').length) {
//             $that.addClass('on').siblings('li').removeClass('on');
//         }
//     });
//     //顶部导航
//     $('.set-1').on('touchstart', '>li', function () {
//         $('.set-1>li>ul').css('display', 'none');
//         $(this).children('ul').css('display', 'block');
//     });
//     //滚屏事件
//     // window.onscroll = function(){ 
//     //    var t = document.documentElement.scrollTop || document.body.scrollTop, 
//     //        top_div = $('.fixed>#header'),
//     //        _menu = $('.w-menu>li.on>a');
//     //        // _menu1 = $('.w-menu>li>a');
//     //    if( t >= 100 ) { 
//     //       top_div.css('background-color','rgba(29,30,30,1)')
//     //        // _menu.css('color','#1495e3');
//     //    }else{ 
//     //       top_div.css('background-color','rgba(29,30,30,'+t/100+')');
//     //       // _menu.css('color','#fff')
//     //    } 
//     //    if($('#mask').hasClass('show')){
//     //       $('#mask').height($(document).height());
//     //    }
//     // } 
//     //友情链接悬停
//     $('.section-partner').on('mouseover', '>ul>li', function () {
//         var _this = $(this),
//             _lis = $('.section-partner>ul>li'),
//             _eq = _this.attr('data-id');
//         _lis.eq(_eq).children('a').children('img').prop('src', './imgs/partner' + (_eq * 1 + 1) + '-' + (_eq * 1 + 1) + '.png');
//     });
//     $('.section-partner').on('mouseout', '>ul>li', function () {
//         var _this = $(this),
//             _lis = $('.section-partner>ul>li'),
//             _eq = _this.attr('data-id');
//         _lis.eq(_eq).children('a').children('img').prop('src', './imgs/partner' + (_eq * 1 + 1) + '.png');
//     });
//     //帮助中心悬停
//     $('.section-four').on('mouseover', '>ul>li', function () {
//         var _this = $(this),
//             _lis = $('.section-four>ul>li'),
//             _eq = _this.attr('data-id');
//         _lis.eq(_eq).children('img').prop('src', './imgs/bg2-' + (_eq * 1 + 11) + '.png');
//     });
//     $('.section-four').on('mouseout', '>ul>li', function () {
//         var _this = $(this),
//             _lis = $('.section-four>ul>li'),
//             _eq = _this.attr('data-id');
//         _lis.eq(_eq).children('img').prop('src', './imgs/bg2-' + (_eq * 1 + 1) + '.png');
//     });
//     // 绑定id
//     $('.input-checkbox').on('mouseover', '.bind_ip', function () {
//         $('.cont-tips').css("display", "block");
//     });
//     $('.input-checkbox').on('mouseout', '.bind_ip', function () {
//         $('.cont-tips').css("display", "none");
//     });

//     // 初始化页面
//     setTimeout(function () {
//         var _h = $('.w-banner>li').innerHeight(),
//             _wh = $(window).height(),
//             lb = $('.login-box').outerHeight(true) + 80;
//         //$('#banner').height(_h);
//         //$('#banner>.w-box').height(_h);
//         if (_wh < lb) {
//             $('.login-box').css('margin-top', 100);
//         } else {
//             $('.login-box').css('margin-top', 120);
//         }
//         $(window).resize(function () {
//             var _h = $('.w-banner>li').innerHeight(),
//                 _wh = $(window).height();
//             //$('#banner').height(_h);
//             //$('#banner>.w-box').height(_h);
//             if (0 != $('#bg-wrap').length) {
//                 if (_wh < lb) {
//                     $('.login-box').css('margin-top', 40);
//                 } else {
//                     $('.login-box').css('margin-top', 40 + (_wh - lb) / 2);
//                 }
//             }
//             if ($('#mask').hasClass('show')) {
//                 $('#mask').height($(document).height());
//             }
//         });
//     }, 10);
//     //图片轮播
//     var count = 0,
//         timer = null;
//     $('.w-sign').on('mouseover', '>li', function () {
//         var that = $(this),
//             $show = $('.w-banner>li'),
//             index = that.index();

//         count = index;
//         that.addClass('on').siblings('li').removeClass('on');
//         $show.eq(count).addClass('on').siblings('li').removeClass('on');
//     });
//     $('#banner').on('mouseover', function () {
//         clearTimeout(timer);
//     });
//     $('#banner').on('mouseout', function () {
//         timer = setInterval(times, 5000);
//     });
//     var times = function () {
//         var $show = $('.w-banner>li'),
//             $sign = $('.w-sign>li');
//         count++;
//         if (count >= $show.length) {
//             count = 0;
//         }
//         $sign.eq(count).addClass('on').siblings('li').removeClass('on');
//         $show.eq(count).addClass('on').siblings('li').removeClass('on');
//     };
//     timer = setInterval(times, 5000);

//     // 更新验证码
//     $('#pic-captcha').on('click', function () {
//         var url = ip + '/common/Captcha?rd=' + Math.random();
//         $(this).attr('src', url);
//     });
//     ~(function () {
//         var obj = {
//             // reg_email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
//             //国外邮箱
//             reg_email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)/,
//             reg_ip: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
//             account: localStorage.getItem('account') || '',
//             sign: localStorage.getItem('sign') || false,
//             lang: localStorage.getItem('i18next_lng') || 'en',
//             _notice: sessionStorage.getItem("_notice") || false,
//             codeTimer: null,
//             Controllers: {
//                 MarketController: 1 //市场控制器
//             },
//             ReceiveCommand: {
//                 Error: 0, //发生错误
//                 SingleKLine: 1000, //单条K线数据
//                 BatchKLine: 1001, //批量K线数据
//                 BatchKLineSendComplate: 1002, //批量K线数据发送完成
//                 // ScrollDayKLine: 1006,//日滑动统计数据
//             },
//             SendCommand: {
//                 SetKLineFequency: 900, //设置当前市场K线频度
//                 SetReceiveOtherMarketKLine: 902, //设置接收其它市场的K线数据
//                 RepairKLine: 903, //修复K线数据
//             },
//             otherMarketIds: ["usdt_mbtc", "usdt_eth", "bitcny_mbtc", "bitcny_eth"],
//             currentMarketId: "mbtc_eth", //当前市场ID,用户切换后发生改变
//             dict: {}, //数据缓存
//             validate: function (reg, val) {
//                 var reg = reg || /^/;
//                 return reg.test(val);
//             },
//             // ajax
//             ajaxFn: function (url, opts) {
//                 var _url = ip + url,
//                     _method = opts.method || 'POST',
//                     _dataType = opts.dataType || 'json',
//                     _data = opts.data || null,
//                     _async = opts.async ? true : false,
//                     _jsonp = opts.jsonp || null,
//                     _callback = opts.callback || new Function(),
//                     _errorCallback = opts.errorCallback || new Function();
//                 $.ajax({
//                     url: _url,
//                     method: _method,
//                     dataType: _dataType,
//                     data: _data,
//                     jsonp: _jsonp,
//                     xhrFields: {
//                         withCredentials: true
//                     },
//                     crossDomain: true,
//                     success: function (res) {
//                         var local = window.location,
//                             pathUrl = local.pathname.toLowerCase(),
//                             referrer = document.referrer.toLowerCase(),
//                             sign = false,
//                             notList = ['bind-', 'email-', 'forgot', 'modify-', 'login', 'register', 'reset', 'twocardvalidate'];
//                         if (res.IsSuccess) {
//                             if (_url.toLowerCase().indexOf('/user/getloginstatus') != -1) {
//                                 if ((res.Data & 32) != 0) {
//                                     local.href = './twocardvalidate.html';
//                                 } else if ((res.Data & 16) != 0) {
//                                     if (pathUrl != '/set-gugvalidate.html') {
//                                         local.href = './bind-phone.html';
//                                     }
//                                 }
//                             } else if (_url.toLowerCase().indexOf('/account/login') != -1) {
//                                 for (var i = 0; i < notList.length; i++) {
//                                     if (-1 == referrer.indexOf(notList[i])) {
//                                         sign = true;
//                                     } else {
//                                         sign = false;
//                                         break;
//                                     }
//                                 }
//                                 if ((res.Data & 4) != 0) {
//                                     local.href = './twocardvalidate.html';
//                                 } else {
//                                     if (sign) {
//                                         obj.setCookie('local_href', referrer);
//                                         local.href = obj.getCookie('local_href');
//                                     } else {
//                                         obj.delCookie('local_href');
//                                         if (!(local.pathname == '/')) {
//                                             local.href = '/';
//                                         }
//                                     }
//                                 }
//                             }
//                         } else {
//                             if (-9996 == res.Code) {
//                                 local.href = './twocardvalidate.html';
//                             } else if (-9995 == res.Code) {
//                                 local.href = './twocardvalidate.html';
//                                 // if(obj.validate(obj.reg_email,obj.account)){
//                                 //    local.href = './bind-validate.html';
//                                 // }
//                             } else if (-9997 == res.Code) {
//                                 localStorage.clear();
//                                 if (pathUrl == '/' || pathUrl == '/trade.html') {
//                                     obj.showMenu();
//                                     if (pathUrl != '/trade.html') {
//                                         return false;
//                                     }
//                                 }
//                                 if (pathUrl != '/trade.html') {
//                                     local.href = '/login.html';
//                                 }
//                             }
//                         }
//                         if (typeof (_callback) == "function" && typeof (res) != 'undefined') {
//                             _callback(res);
//                         }
//                     },
//                     error: function (error) {
//                         _errorCallback(error);
//                     }
//                 });
//             },
//             // 上传图片
//             ajaxUpload: function (that, opts) {
//                 var url = opts.url || 'https://image.XBrick.io/File/upload/Certification?action=uploadimage',
//                 // var url = opts.url || 'http://10.0.2.61:8885/File/upload/Certification?action=uploadimage',
//                     // var url = opts.url || 'https://testimage.XBrick.io/File/upload/Certification?action=uploadimage',
//                     // var url = opts.url || '//10.0.0.216:8895/File/upload/Certification?action=uploadimage',
//                     // var url = opts.url || '//chain.imwork.net:8895/File/upload/Certification?action=uploadimage', 
//                     _callback = opts.callback || new Function();

//                 that.ajaxSubmit({
//                     url: url,
//                     type: 'POST',
//                     success: function (res) {
//                         if (typeof (_callback) == "function" && typeof (res) != 'undefined') {
//                             that[0].reset();
//                             _callback(res);
//                         }
//                     },
//                     error: function (error) {
//                         _errorCallback(error);
//                     }
//                 });
//             },
//             //enter提交form表单
//             submitForm: function (_form, _id) {
//                 $(_form).on('keypress', function (event) {
//                     if (event.keyCode == 13) {
//                         $(_id).trigger("click");
//                     }
//                 });
//             },
//             StartWS: function (root) {
//                 var Error = root.lookup("Error");
//                 var KLineInfo = root.lookup("KLineInfo");
//                 var KLineList = root.lookup("KLineList");
//                 // var ScrollDayKLine = root.lookup("ScrollDayKLine");

//                 // var ws = new WebSocket("wss://ws.xbrick.io/");
//                 // var ws = new WebSocket("wss://testws.xbrick.io/");
//                 var ws = new WebSocket("ws://10.45.0.41:8888/");
//                 ws.onopen = function (e) {
//                     // console.log("Connection open...");
//                     ReceiveOtherMarket(root, ws); //接收非选中市场的K线数据
//                     GetMarketKLineChatData(root, ws);
//                     GetMarketKLineChatData(root, ws);
//                 };
//                 ws.binaryType = "arraybuffer";
//                 ws.onmessage = function (e) {
//                     if (e.data instanceof ArrayBuffer) {
//                         var cmdArray = new Uint8Array(e.data, 0, 2);
//                         var receiveBuffer = new Uint8Array(e.data, 2);
//                         var cmd = ByteToUnShort(cmdArray);
//                         if (cmd == obj.ReceiveCommand.Error) {
//                             var data = Error.decode(receiveBuffer);
//                             // console.log("收到错误信息");
//                             // console.log(data);
//                         } else if (cmd == obj.ReceiveCommand.SingleKLine) {
//                             var data = KLineInfo.decode(receiveBuffer);
//                             // console.log('single',data);
//                             //处理数据
//                             processSingleData(ws, root, data);
//                         } else if (cmd == obj.ReceiveCommand.BatchKLine) {
//                             var batchData = KLineList.decode(receiveBuffer);
//                             //处理数据
//                             processListData(batchData.List);
//                         } else if (cmd == obj.ReceiveCommand.BatchKLineSendComplate) {
//                             // console.log("K线数据传输完成");
//                             // drawingKLine();
//                         }
//                     }
//                 };
//                 ws.onerror = function (e) {
//                     // console.log('websocked error');
//                 }
//                 ws.onclose = function (e) {
//                     // console.log("Connection closed", e);
//                     setTimeout(function () {
//                         obj.StartWS(root);
//                     }, 2000);
//                 };
//                 //当用户选中其它市场时执行以下代码(需要替换成实际代码)
//                 // $("#btn_ChangeCurrentMarketId").click(function () {
//                 //     obj.currentMarketId = $("#txt_CurrentMarketId").val();
//                 //     GetMarketKLineChatData(root, ws);
//                 // });
//                 //走势图切换
//                 $('.section-first').on('mouseover', '>ul>li', function () {
//                     var _this = $(this),
//                         _id = _this.attr('data-id'),
//                     _lis = $('.section-first>ul>li'),
//                         _markrtId = _this.prop('id');
//                     $('.section-first>ul>li').removeClass('active');
//                     _this.addClass('active');
//                     obj.currentMarketId = _markrtId;
//                 });
//                 //获取渲染k线图的数据(会批量推送)
//                 function GetMarketKLineChatData(root, ws) {
//                     var Frequency = root.lookup("SetKLineFrequency");
//                     var frequency = Frequency.create({
//                         MarketId: obj.currentMarketId,
//                         FrequencyKey: "M1",
//                         IsGraph: true,
//                         IsReconnect: false
//                     });
//                     var dataBuffer = Frequency.encode(frequency).finish();
//                     var buffer = GenerateCmdBuffer(obj.Controllers.MarketController, obj.SendCommand.SetKLineFequency, dataBuffer);
//                     if (ws.readyState == WebSocket.OPEN) {
//                         ws.send(buffer);
//                     }
//                 }
//                 //获取市场价格的K线数据(只会推送最新一条)
//                 function ReceiveOtherMarket(root, ws) {
//                     var MarketFrequency = root.lookup("MarketKLineFrequency");
//                     var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
//                     var list = new Array();
//                     for (var i = 0; i < obj.otherMarketIds.length; i++) {
//                         var marketId = obj.otherMarketIds[i];
//                         var marketFrequency = MarketFrequency.create({
//                             MarketId: marketId,
//                             Keys: ["D"]
//                         });
//                         list.push(marketFrequency);
//                     }
//                     var fList = MarketFrequencyList.create({
//                         List: list
//                     });
//                     var dataBuffer = MarketFrequencyList.encode(fList).finish();
//                     var buffer = GenerateCmdBuffer(obj.Controllers.MarketController, obj.SendCommand.SetReceiveOtherMarketKLine, dataBuffer);
//                     if (ws.readyState === WebSocket.OPEN) {
//                         ws.send(buffer);
//                     }
//                 }

//                 //处理K线数据的方法
//                 function processListData(list) {
//                     var listMarketId = list[0].MarketId;
//                     var oldData = obj.dict[listMarketId];
//                     if (oldData == undefined) {
//                         var categoryData = [];
//                         var prices = [];
//                         var lastId = 0;
//                         for (var i = 0; i < list.length; i++) {
//                             var data = list[i];
//                             prices.push(data.ClosedPrice);
//                             categoryData.push(data.OpenTime);
//                             lastId = data.Id;
//                         }
//                         var result = {
//                             categoryData: categoryData,
//                             prices: prices,
//                             lastId: lastId,
//                         };
//                         obj.dict[listMarketId] = result;
//                         oldData = result;
//                     } else {
//                         for (var i = 0; i < list.length; i++) {
//                             var data = list[i];
//                             oldData.prices.push(data.ClosedPrice);
//                             oldData.categoryData.push(data.OpenTime);
//                             oldData.lastId = data.Id;
//                         }
//                     }
//                     // if(data.Frequency=='D1'){
//                     //    var item = list[list.length-1];
//                     //    rate = (0!==item.OpenPrice?obj.getFloatValue(((item.ClosedPrice||0)-(item.OpenPrice||0))/item.OpenPrice*100,2):0);
//                     //    if((item.ClosedPrice-item.OpenPrice)>0){
//                     //       sign = '+'+(Number.isNaN(rate)?'-':rate+'%');
//                     //       $('#'+listMarketId).children('p').eq(2).css('color','#30c07b');
//                     //    }else{
//                     //       sign = (Number.isNaN(rate)?'-':rate+'%');
//                     //       $('#'+listMarketId).children('p').eq(2).css('color','#e52e35');
//                     //    }
//                     //    if(0===item.OpenPrice){
//                     //       sign = '0%';
//                     //    }
//                     //    $('#'+listMarketId).children('p').eq(2).text(sign);
//                     // }
//                     //更新特定市场的价格
//                     updatePrice(listMarketId, oldData.prices[oldData.prices.length - 1]);
//                 }

//                 function processSingleData(ws, root, data) {
//                     // console.log("单条");
//                     // console.log(data);
//                     var kData = [];

//                     var oldData = obj.dict[data.MarketId];
//                     if (oldData == undefined) {
//                         var categoryData = [];
//                         var prices = [];
//                         prices.push(data.ClosedPrice);
//                         categoryData.push(data.OpenTime);
//                         var result = {
//                             categoryData: categoryData,
//                             prices: prices,
//                             lastId: data.Id,
//                         };
//                         obj.dict[data.Market] = result;
//                     } else {
//                         //网K线数组后面加新的K线
//                         if (data.Id == oldData.lastId + 1) {
//                             oldData.prices.push(data.ClosedPrice);
//                             oldData.categoryData.push(data.OpenTime);

//                         } else if (data.Id == oldData.lastId) { //更新K线最后一条数据
//                             oldData.prices[oldData.prices.length - 1] = data.ClosedPrice;
//                         }
//                     }
//                     //如果K线的市场ID等于当前用户选中的市场ID，则更新K线图
//                     // if(data.MarketId == obj.currentMarketId){
//                     //    drawingKLine();
//                     // }
//                     //利率rate
//                     if (data.Frequency == 'D') {
//                         rate = (0 != data.OpenPrice ? obj.getFloatValue(((data.ClosedPrice || 0) - (data.OpenPrice || 0)) / data.OpenPrice * 100, 2) : 0);
//                         // console.log('rate',data);
//                         if ((data.ClosedPrice - data.OpenPrice) > 0) {
//                             sign = '+' + (Number.isNaN(rate) ? '-' : rate + '%');
//                             $('#' + data.Market).children('p').eq(2).css('color', '#28B262');
//                         } else {
//                             sign = (Number.isNaN(rate) ? '-' : rate + '%');
//                             $('#' + data.Market).children('p').eq(2).css('color', '#FF6161');
//                         }
//                         if (0 === data.OpenPrice) {
//                             sign = '0%';
//                         }
//                         $('#' + data.Market).children('p').eq(2).text(sign);
//                         if ('usdt' == data.Market.split('_')[0]) {
//                             $('#' + data.Market).children('p').eq(1).text('$' + data.ClosedPrice);
//                         } else if ('bitcny' == data.Market.split('_')[0]) {
//                             $('#' + data.Market).children('p').eq(1).text('¥' + data.ClosedPrice);
//                         }
//                         // $('#'+data.MarketId).children('p').eq(2).text('--');
//                     }
//                     //更新市场价格
//                     updatePrice(data.Market, data.ClosedPrice);
//                 }
//                 //渲染K线图
//                 // function drawingKLine() {
//                 //    var list = obj.dict[obj.currentMarketId];
//                 //    if (list != undefined) {
//                 //       //渲染逻辑
//                 //       if(200<list.length){
//                 //         list.shift();
//                 //       }
//                 //       var myChart = echarts.init(document.getElementById('chart'));
//                 //       var prices = list.prices;
//                 //       var categoryData = list.categoryData;
//                 //       option = {
//                 //       xAxis: {
//                 //             type: 'category',
//                 //             boundaryGap: false,
//                 //             // data: obj.chartObj._date
//                 //             data: categoryData
//                 //          },
//                 //          yAxis: {
//                 //             type: 'value',
//                 //             boundaryGap: [0, '100%']
//                 //          },
//                 //          animation: false,
//                 //          series: [
//                 //             {
//                 //                name:'实时数据',
//                 //                type:'line',
//                 //                smooth:true,
//                 //                symbol: 'none',
//                 //                sampling: 'average',
//                 //                itemStyle: {
//                 //                    normal: {
//                 //                        color: '#1495e3'
//                 //                    }
//                 //                },
//                 //                areaStyle: {
//                 //                    normal: {
//                 //                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                 //                            offset: 0,
//                 //                            color: '#eef3ff'
//                 //                        }, {
//                 //                            offset: 1,
//                 //                            color: '#eef3ff'
//                 //                        }])
//                 //                    }
//                 //                },
//                 //                data: prices
//                 //             }
//                 //          ]
//                 //       };
//                 //       myChart.setOption(option);
//                 //    }
//                 // }
//                 function updatePrice(market, price) {
//                     var _price = '--';
//                     //更新价格逻辑
//                     if (price) {
//                         _price = price;
//                     } else if (0 == price) {
//                         _price = 0;
//                     }
//                     if ('usdt' == market.split('_')[0]) {
//                         $('#' + market).children('p').eq(1).text('$' + _price);
//                     } else if ('bitcny' == market.split('_')[0]) {
//                         $('#' + market).children('p').eq(1).text('¥' + _price);
//                     }
//                 }
//                 //类库部分，不用处理
//                 function GenerateCmdBuffer(controller, command, dataBuffer) {
//                     var controllerLittleEndian = new dcodeIO.ByteBuffer(4).writeUint32(controller, 0).flip();
//                     var controllerBigEndian = new Uint8Array(4);
//                     controllerBigEndian[0] = controllerLittleEndian.view[3];
//                     controllerBigEndian[1] = controllerLittleEndian.view[2];
//                     controllerBigEndian[2] = controllerLittleEndian.view[1];
//                     controllerBigEndian[3] = controllerLittleEndian.view[0];
//                     var commandLittleEndian = new dcodeIO.ByteBuffer(2).writeUint16(command, 0).flip();
//                     var commandBigEndian = new Uint8Array(2);
//                     commandBigEndian[0] = commandLittleEndian.view[1];
//                     commandBigEndian[1] = commandLittleEndian.view[0];
//                     var allBuffer = dcodeIO.ByteBuffer.concat([controllerBigEndian, commandBigEndian, dataBuffer], "binary");
//                     return allBuffer.view;
//                 }

//                 function ByteToUnShort(b) {
//                     return (b[0] & 0xff) | ((b[1] & 0xff) << 8);
//                 }
//             },
//             // 发送二进制数据
//             GenerateCmdBuffer: function (controller, command, dataBuffer) {
//                 var controllerLittleEndian = new dcodeIO.ByteBuffer(4).writeUint32(controller, 0).flip();
//                 var controllerBigEndian = new Uint8Array(4);
//                 controllerBigEndian[0] = controllerLittleEndian.view[3];
//                 controllerBigEndian[1] = controllerLittleEndian.view[2];
//                 controllerBigEndian[2] = controllerLittleEndian.view[1];
//                 controllerBigEndian[3] = controllerLittleEndian.view[0];
//                 var commandLittleEndian = new dcodeIO.ByteBuffer(2).writeUint16(command, 0).flip();
//                 var commandBigEndian = new Uint8Array(2);
//                 commandBigEndian[0] = commandLittleEndian.view[1];
//                 commandBigEndian[1] = commandLittleEndian.view[0];
//                 var allBuffer = dcodeIO.ByteBuffer.concat([controllerBigEndian, commandBigEndian, dataBuffer], "binary");
//                 return allBuffer.view;
//             },
//             ByteToUnShort: function (b) {
//                 return (b[0] & 0xff) | ((b[1] & 0xff) << 8);
//             },
//             // 获取session值
//             getStorage: function () {
//                 var type = localStorage.getItem('Type'),
//                     id = localStorage.getItem('UserId'),
//                     account = localStorage.getItem('account'),
//                     lang = localStorage.getItem('i18next_lng');
//                 return {
//                     Type: type,
//                     Id: id,
//                     account: account,
//                     lang: lang
//                 };
//             },
//             // 获取url参数
//             getParam: function () {
//                 var params = (window.location.search).substr(1),
//                     items = params.split('&'),
//                     data = {};
//                 for (var i = 0; i < items.length; i++) {
//                     var key = items[i].substr(0, items[i].indexOf('=')),
//                         val = items[i].substr(items[i].indexOf('=') + 1);
//                     if (0 != key.length && 0 != val.length) {
//                         data[key] = val;
//                     }
//                 }
//                 return data;
//             },
//             // 分页
//             page: function (opt) {
//                 if (!opt._class) {
//                     return false;
//                 }

//                 var objs = $(opt._class),
//                     allNum = opt.allNum || 5,
//                     nowNum = opt.nowNum || 1,
//                     html = '',
//                     callback = opt.callback || function () {};
//                 objs.off('click', '>li');
//                 if (opt.allNum <= 0) {
//                     objs.empty();
//                     return false;
//                 }
//                 if (nowNum >= 2) {
//                     html += '<li class="st-page" data-page="' + (nowNum - 1) + '"><i class="icon icon-direction"></i></li>';
//                 }

//                 if (allNum <= 5) {
//                     for (var i = 1; i <= allNum; i++) {
//                         if (nowNum == i) {
//                             html += '<li class="on">' + i + '</li>';
//                         } else {
//                             html += '<li data-page="' + i + '">' + i + '</li>';
//                         }
//                     }
//                 } else {
//                     if (nowNum > 3) {
//                         html += '<li data-page="1">1</li><li class="more">...</li>';
//                     }
//                     for (var i = 1; i <= 5; i++) {
//                         if (nowNum == 1 || nowNum == 2) {
//                             if (nowNum == i) {
//                                 html += '<li class="on">' + i + '</li>';
//                             } else {
//                                 html += '<li data-page="' + i + '">' + i + '</li>';
//                             }
//                         } else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {
//                             if ((allNum - nowNum) == 0 && i == 5) {
//                                 html += '<li class="on">' + (allNum - 5 + i) + '</li>';
//                             } else if ((allNum - nowNum) == 1 && i == 4) {
//                                 html += '<li class="on">' + (allNum - 5 + i) + '</li>';
//                             } else {
//                                 html += '<li data-page="' + (allNum - 5 + i) + '">' + (allNum - 5 + i) + '</li>';
//                             }
//                         } else {
//                             if (i == 3) {
//                                 html += '<li class="on">' + (nowNum - 3 + i) + '</li>';
//                             } else {
//                                 html += '<li data-page="' + (nowNum - 3 + i) + '">' + (nowNum - 3 + i) + '</li>';
//                             }
//                         }
//                     }
//                     if (allNum - nowNum >= 3) {
//                         html += '<li class="more">...</li><li data-page="' + allNum + '">' + allNum + '</li>';
//                     }
//                 }
//                 if (allNum - nowNum >= 1) {
//                     html += '<li class="ed-page" data-page="' + (parseInt(nowNum) + 1) + '"><i class="icon icon-direction"></i></li>';
//                 }
//                 objs.html(html);
//                 if (allNum <= 5) {
//                     if (!objs.find('li:last-child').hasClass('on')) {
//                         objs.find('li:last-child').addClass('last');
//                     }
//                 }
//                 objs.on('click', '>button', function (e) {
//                     var _val = parseInt(objs.find('input').val());
//                     if (_val) {
//                         if (_val > opt.allNum) {
//                             return false;
//                         }
//                     } else {
//                         return false;
//                     }
//                     obj.page({
//                         _class: opt._class,
//                         nowNum: _val,
//                         allNum: opt.allNum,
//                         callback: callback
//                     });
//                     callback(_val, allNum);
//                 });
//                 objs.on('click', '>li', function (e) {
//                     if ($(this).hasClass('on')) {
//                         return false;
//                     }
//                     var now = $(this).attr('data-page');
//                     obj.page({
//                         _class: opt._class,
//                         nowNum: now,
//                         allNum: opt.allNum,
//                         callback: callback
//                     });
//                     callback(now, allNum);
//                 });
//             },
//             pageFn: function (sel, now, all, callback) {
//                 obj.page({
//                     _class: sel || '.pagination-list',
//                     nowNum: now,
//                     allNum: all,
//                     callback: callback
//                 });
//             },
//             // 密码等级验证
//             pwdValidate: function (val) {
//                 var lv = 1,
//                     val = val.trim(),
//                     count = 0,
//                     $li = $('.box-warn>ul>li'),
//                     reg_char = /[a-zA-Z]+/gi,
//                     reg_num = /[0-9]+/g,
//                     reg_spchar = /[^0-9a-zA-Z]+/gi;

//                 if (val.length >= 8 && val.length <= 20) {
//                     if (reg_char.test(val)) {
//                         count++;
//                     }
//                     if (reg_num.test(val)) {
//                         count++;
//                     }
//                     if (reg_spchar.test(val)) {
//                         count++;
//                     }
//                     if (2 === count) {
//                         lv = 3;
//                     } else if (3 === count) {
//                         lv = 4;
//                     }
//                 }
//                 $li.removeClass('active');

//                 return lv;
//             },
//             // 展开模态框
//             modShow: function (selector) {
//                 var _top = $(window).scrollTop(),
//                     wH = $(window).height() / 3;
//                 $('#mask').addClass('show').height($(document).height());
//                 $(selector).addClass('show');
//                 $(selector).find('.txt-tip.error').remove();
//                 $(selector).css('margin-top', wH - $(selector).height() / 3 + ($(window).scrollTop()));
//             },
//             // 关闭模态框
//             modHide: function (selector) {
//                 var $box = $(selector).closest('.mod-box'),
//                     $form = $box.find('.mod-form');
//                 $('#mask').removeClass('show');
//                 $(selector).removeClass('show');
//                 if (0 < $form.length) {
//                     $form[0].reset();
//                 }
//                 if (0 < $form.find('.send-code>button').length) {
//                     obj.clearCountDown($form.find('.send-code>button'));
//                 }
//             },
//             // 获取用户绑定认证类型
//             getAuthType: function (opts) {
//                 var callback = opts.callback || new Function(),
//                     errorCallback = opts.errorCallback || new Function();
//                 obj.ajaxFn('/user/GetAuthType', {
//                     callback: callback,
//                     errorCallback: errorCallback
//                 });
//             },
//             // 发送手机/邮箱验证码
//             sendPhoneCaptcha: function (that, flag, msgFn) {
//                 var url = '/user/SendPhoneCaptcha',
//                     type = that.attr('data-sign'),
//                     data = {};
//                 msgFn = msgFn || new Function();
//                 if (flag) {
//                     url = '/user/SendEmailCaptcha';
//                 }
//                 if ('addr-voice' == type) {
//                     data = {
//                         isVoice: true
//                     };
//                 }
//                 obj.ajaxFn(url, {
//                     data: data,
//                     callback: function (res) {
//                         var msg = '',
//                             s = 59,
//                             type = false;
//                         if (res.IsSuccess) {
//                             if (flag) {
//                                 s = 59;
//                             }
//                             obj.countDown(that, s);
//                             msg = '';
//                         } else {
//                             if (203 == res.Code) {
//                                 msg = $.t('once_minute');
//                                 if (flag) {
//                                     msg = $.t('email_minute');
//                                 }
//                             } else if (402 == res.Code) {
//                                 msg = $.t('phone_html');
//                                 if (flag) {
//                                     msg = $.t('email_html');
//                                 }
//                                 obj.modHide('#mod-gug');
//                             }
//                             type = true;
//                         }
//                         msgFn({
//                             msg: msg,
//                             type: type
//                         });
//                     }
//                 });
//             },
//             getCaptcha: function (data, that, flag, msgFn) {
//                 var url = '/Common/SendCaptchaBySms';
//                 msgFn = msgFn || new Function();
//                 if (flag) {
//                     url = '/Common/SendCaptchaByEmail';
//                 }
//                 obj.ajaxFn(url, {
//                     data: data,
//                     callback: function (res) {
//                         var msg = '',
//                             s = 59,
//                             type = false;
//                         if (res.IsSuccess) {
//                             if (flag) {
//                                 s = 59;
//                             }
//                             obj.countDown(that, s);
//                         } else {
//                             if (203 == res.Code) {
//                                 msg = $.t('once_minute');
//                                 if (flag) {
//                                     msg = $.t('email_minute');
//                                 }
//                             } else if (402 == res.Code) {
//                                 msg = $.t('phone_html');
//                                 if (flag) {
//                                     msg = $.t('email_html');
//                                 }
//                                 obj.modHide('#mod-gug');
//                             } else if (-3 == res.Code) {
//                                 msg = $.t('verify_error1');
//                             } else if (-1 == res.Code) {
//                                 msg = $.t('once_minute');
//                                 if (flag) {
//                                     msg = $.t('email_minute');
//                                 }
//                             }
//                             type = true;
//                         }
//                         msgFn({
//                             msg: msg,
//                             type: type,
//                             code: res.Code
//                         });
//                     }
//                 });
//             },
//             // 倒计时手机验证码有效期
//             countDown: function (that, s, str) {
//                 s = s || 0;
//                 if (that) {
//                     that.attr('disabled', true);
//                 }
//                 obj.codeTimer = setInterval(function () {
//                     s--;
//                     if (-1 == s) {
//                         clearInterval(obj.codeTimer);
//                         that.text(str || $.t('send_verify'));
//                         that.attr('disabled', false);
//                         return false;
//                     }
//                     var txt = s + $.t('seconds');
//                     that.text(txt);
//                 }, 1000);
//             },
//             // 强制关闭倒计时
//             clearCountDown: function (that) {
//                 if (that) {
//                     that.text($.t('send_verify'));
//                     that.attr('disabled', false);
//                     clearInterval(obj.codeTimer);
//                 }
//             },
//             // 滑动按钮
//             btnFn: function (callback) {
//                 callback = callback || new Function();
//                 //$('.slide-box').on('click','>label>.slide-btn',function(){
//                 $('.slide-box').on('click', '>label>span', function () {
//                     var $p = $(this).closest('.slide-box');
//                     if ($p.hasClass('off')) {
//                         $p.removeClass('off');
//                     } else {
//                         $p.addClass('off');
//                     }
//                     callback($p);
//                 });
//             },
//             // 错误提示
//             formValidate: function (selector, txt, flag) {
//                 var that = $(selector).parent().children('.box-tips'),
//                     flag = flag || false;
//                 if (txt && 0 != txt.length) {
//                     that.children('span').text(txt);
//                 }
//                 if (flag) {
//                     that.removeClass('show');
//                 } else {
//                     that.addClass('show');
//                 }
//             },
//             // 错误提示
//             getTips: function (selector, msg, label) {
//                 var sel = selector || $(window),
//                     $group = sel.parent(),
//                     label = label || 'p',
//                     $warn = $group.find('.error'),
//                     flag = true;
//                 if (!!msg && flag) {
//                     if (0 != sel.next('.error').length) {
//                         sel.next('.error').remove();
//                     }
//                     sel.after('<' + label + ' class="txt-tip error">' + msg + '</' + label + '>');
//                     //$warn.removeClass('hide').html(msg);
//                 } else {
//                     $warn.addClass('hide').html(msg);
//                 }
//             },
//             getTips2: function (selector, msg, label) {
//                 var sel = selector || $(window),
//                     $group = sel.parent(),
//                     label = label || 'p',
//                     $warn = $group.find('.box-tips'),
//                     flag = true,
//                     html = '';
//                 if (!!msg && flag) {
//                     if (0 != $warn.length) {
//                         $warn.remove();
//                     }
//                     html = '<div class="box-tips show"><i class="icon icon-triangle"></i><span>' + msg + '</span></div>';
//                     sel.after(html);
//                 } else {
//                     $warn.remove();
//                 }
//             },
//             // 资产统计
//             myAvailabelAsset: function () {
//                 obj.ajaxFn('/MyAccount/MyAvailableAsset', {
//                     // data:{"currencys":["cny","btc","eth"]},
//                     data: {
//                         "currencys": ["mbtc", "eth", "bitcny", "usdt"]
//                     },
//                     callback: function (res) {
//                         var html = '',
//                             list = [];
//                         if (res.IsSuccess) {
//                             list = res.Data;
//                             for (var i = 0; i < list.length; i++) {
//                                 //<td><img src="./imgs/c-'+list[i].CurrencyId+'.png" alt="币种" /><span>'+list[i].CurrencyId+'</span></td>\
//                                 //<td><i class="icon2 icon-'+list[i].CurrencyId+'"></i><span>'+list[i].CurrencyId+'</span></td>\
//                                 html += '<tr>\
//                                  <td><i class="icon2 icon-' + list[i].CurrencyId + '"></i><span>' + list[i].CurrencyId.toUpperCase() + '</span></td>\
//                                  <td>' + obj.getFloatValue(list[i].Balance, 2) + '</td>\
//                                  <td>' + obj.getFloatValue(list[i].LockedAmount, 2) + '</td>\
//                               </tr>';
//                             }
//                         } else {
//                             html = '';
//                         }
//                         $('#asset-table>tbody').html(html);
//                     }
//                 });
//             },
//             // 资产折合统计
//             myTotalAsset: function () {
//                 obj.ajaxFn('/MyAccount/MyTotalAsset', {
//                     data: {
//                         "currencys": ["mbtc", "eth", "bitcny", "usdt"]
//                     },
//                     callback: function (res) {
//                         var data = res.Data,
//                             a, status = '';
//                         if (res.IsSuccess) {
//                             if (data && data.Result) {
//                                 data = data.Result;
//                                 a = data.UserAccount;
//                                 a = a.substr(0, 3) + '***' + a.substr(a.indexOf('@'));
//                                 $('#user-account').text(a);
//                                 $('#user-id').text(data.UserName || $.t('not_realname'));

//                                 if (data.UserName) {
//                                     $('.certification').addClass("hide");
//                                 } else {
//                                     $('.certification').removeClass("hide");
//                                 }
//                                 $('.asset').text('￥' + obj.getFloatValue(data.AssetList[0].Amount, 2));
//                                 //登录tab栏切换
//                                 $('#asset-list span').on('click', function (e) {
//                                     var lists = $('#asset-list span');
//                                     for (var i = 0; i < lists.length; i++) {
//                                         $(lists[i]).removeClass();
//                                     }
//                                     $(this).addClass('hight');
//                                     var _id = this.getAttribute('id');
//                                     if (_id == 'CnyAmount') {
//                                         $('.asset').text('￥' + obj.getFloatValue(data.AssetList[0].Amount, 2));
//                                     } else if (_id == 'BtcAmount') {
//                                         $('.asset').text(obj.getFloatValue(data.AssetList[1].Amount, 4));
//                                     } else if (_id == 'EthAmount') {
//                                         $('.asset').text(obj.getFloatValue(data.AssetList[2].Amount, 4));
//                                     }
//                                 });
//                                 status = data.Status;
//                                 if (status) {
//                                     if (1 == status) {
//                                         $('.certification').removeClass('hide').html('待审核');
//                                     } else if (2 == status) {
//                                         $('.certification').addClass('hide');
//                                     } else if (3 == status) {
//                                         $('.certification').removeClass('hide').html('审核失败');
//                                     }
//                                 }
//                             }
//                             // $('.asset-btc').text(obj.getSubVal(data.BtcAmount,10));
//                         }
//                     },
//                     errorCallback: function (res) {
//                         $('.asset').html('--');
//                     }
//                 });
//             },
//             // 菜单显示
//             showMenu: function () {
//                 var pic = $('.list-lang>li[data-lang="' + obj.lang + '"]').html();
//                 $('.show-txt').html(pic);
//                 // $('.list-lang>li[data-lang="' + obj.lang + '"]').html(pic);
//                 if (obj.sign) {
//                     $('.set-2').addClass('hide');
//                     $('.set-1').removeClass('hide');
//                 } else {
//                     $('.set-1').addClass('hide');
//                     $('.set-2').removeClass('hide');
//                 }
//                 if (location.pathname.toLowerCase() == '/login.html') {
//                     $('.set-2>li').eq(0).find('a').attr('href', './login.html');
//                     $('.set-2>li').eq(1).find('a').attr('href', 'r.html');
//                     $('.set-2>li').eq(0).addClass('active').siblings().removeClass('active');
//                 } else if (location.pathname.toLowerCase() == '/r.html') {
//                     $('.set-2>li').eq(0).find('a').attr('href', './login.html');
//                     $('.set-2>li').eq(1).find('a').attr('href', './r.html');
//                     $('.set-2>li').eq(1).addClass('active').siblings().removeClass('active');
//                 } else {
//                     $('.w-menu>li').each(function () {
//                         if (location.pathname.toLowerCase() == '/') {
//                             $('.w-menu>li').eq(0).addClass('on').siblings().removeClass('on');
//                             return false;
//                         } else if (location.pathname.toLowerCase() == '/market.html' || location.pathname.toLowerCase() == '/trade.html') {
//                             $('.w-menu>li').eq(1).addClass('on').siblings().removeClass('on');
//                             return false;
//                         }
//                     });
//                 }
//             },
//             // 获取交易统计
//             getTradeStatistics: function () {
//                 obj.ajaxFn('/market/Statistics', {
//                     data: {
//                         "currencys": ["cny", "mbtc", "eth", "ans"]
//                     },
//                     callback: function (res) {
//                         var list = [],
//                             i = 0,
//                             h = '',
//                             rst = '';
//                         if (res.IsSuccess) {
//                             list = res.Data;
//                             for (i; i < list.length; i++) {
//                                 h = '.h-' + list[i].Currency;
//                                 if ('cny' === list[i].Currency) {
//                                     rst = '￥' + obj.getFloatValue(list[i].Result, 2);
//                                 } else {
//                                     rst = obj.getFloatValue(list[i].Result, 2);
//                                 }
//                                 $(h).html(rst);
//                             }
//                         }
//                     },
//                     errorCallback: function (res) {
//                         $('.h-cny').html('--');
//                         $('.h-mbtc').html('--');
//                         $('.h-eth').html('--');
//                         $('.h-ans').html('--');
//                     }
//                 });
//             },
//             // ToFixed: function(d, s) {

//             // },
//             // 取小数点位数
//             getFloatValue: function (d, s) {
//                 var digitsLength = 0;
//                 var digitArray = d.toString().split(".");
//                 if (digitArray.length > 1) {
//                     digitsLength = digitArray[1].length;
//                 }
//                 var sp = Math.pow(10, s);
//                 var truncate = Math.round(d);
//                 if (truncate > d) {
//                     truncate -= 1;
//                 }
//                 var intPow = Math.pow(10, digitsLength);
//                 if (d < 0) {
//                     var num = (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 } else {
//                     var num = (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 }
//                 //千位符
//                 var source = num.toString().split('.');
//                 source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
//                 return source.join(".");
//             },
//             getFloatValue1: function (d, s) {
//                 var digitsLength = 0;
//                 var digitArray = d.toString().split(".");
//                 if (digitArray.length > 1) {
//                     digitsLength = digitArray[1].length;
//                 }
//                 var sp = Math.pow(10, s);
//                 var truncate = Math.round(d);
//                 if (truncate > d) {
//                     truncate -= 1;
//                 }
//                 var intPow = Math.pow(10, digitsLength);
//                 if (d < 0) {
//                     var num = (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 } else {
//                     var num = (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 }
//                 //千位符
//                 var source = num.toFixed(s).split('.');
//                 source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
//                 return source.join(".");
//             },
//             getFloatValue2: function (d, s) {
//                 var digitsLength = 0;
//                 var digitArray = d.toString().split(".");
//                 if (digitArray.length > 1) {
//                     digitsLength = digitArray[1].length;
//                 }
//                 var sp = Math.pow(10, s);
//                 var truncate = Math.round(d);
//                 if (truncate > d) {
//                     truncate -= 1;
//                 }
//                 var intPow = Math.pow(10, digitsLength);
//                 if (d < 0) {
//                     return (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 } else {
//                     return (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
//                 }
//             },
//             //浮点数加法运算
//             getFloatAdd: function (arg1, arg2) {
//                 var r1, r2, m;
//                 try {
//                     r1 = arg1.toString().split(".")[1].length
//                 } catch (e) {
//                     r1 = 0
//                 }
//                 try {
//                     r2 = arg2.toString().split(".")[1].length
//                 } catch (e) {
//                     r2 = 0
//                 }
//                 m = Math.pow(10, Math.max(r1, r2));
//                 return (arg1 * m + arg2 * m) / m;
//             },
//             //浮点数减法运算
//             getFloatSub: function (arg1, arg2) {
//                 var r1, r2, m, n;
//                 try {
//                     r1 = arg1.toString().split(".")[1].length
//                 } catch (e) {
//                     r1 = 0
//                 }
//                 try {
//                     r2 = arg2.toString().split(".")[1].length
//                 } catch (e) {
//                     r2 = 0
//                 }
//                 m = Math.pow(10, Math.max(r1, r2));
//                 //动态控制精度长度
//                 n = (r1 = r2) ? r1 : r2;
//                 return ((arg1 * m - arg2 * m) / m).toFixed(n);
//             },
//             // 科学计数法转10进制数
//             scienceToNum: function (num, count) {
//                 var str = new String(num);
//                 var e_pos = str.indexOf('e+');
//                 var p_pos = str.indexOf('.');
//                 // For Firefox 科学计数法
//                 if (e_pos > 0) {
//                     bit = e_pos - p_pos - 1;
//                     tim = str.substr(e_pos + 2);
//                     str = str.substr(0, e_pos).replace('.', '');
//                     var mov = tim - bit;
//                     while (mov > 0) {
//                         str += '0';
//                         mov--;
//                     }
//                     str += '.';
//                     while (count > 0) {
//                         str += '0';
//                         count--;
//                     }
//                     return str;
//                 } else {
//                     e_pos = str.indexOf('e-');
//                     if (e_pos > 0) {
//                         tim = str.substr(0, e_pos);
//                         mov = parseInt(str.substr(e_pos + 2)) - 1;
//                         var zeros = '0.';
//                         while (mov > 0) {
//                             if (count === mov) {
//                                 break;
//                             }
//                             zeros += '0';
//                             mov--;
//                         }
//                         str = zeros + tim;
//                         return str;
//                     }
//                 }
//                 return num;
//             },
//             // 交易提示
//             hideTips: function (msg, sel) {
//                 sel = sel || '';
//                 var _top = $(document).scrollTop(),
//                     hH = $('#header').height();
//                 if (0 <= _top && hH >= _top) {
//                     _top = hH;
//                 } else {
//                     _top = 0;
//                 }
//                 var that = null,
//                     html = '<div class="msg-tips ' + sel + '" style="top: ' + _top + 'px;"><span>' + msg + '</span></div>';
//                 if (0 != $('.msg-tips').length) {
//                     $('.msg-tips').remove();
//                 }
//                 if (msg) {
//                     $(document.body).append(html);
//                     that = $('.msg-tips');
//                     //that.css('')
//                     setTimeout(function () {
//                         if (sel) {
//                             that.css({
//                                 'background-color': 'rgba(229,46,33,.8)',
//                                 'opacity': 1
//                             });
//                         } else {
//                             that.css({
//                                 'background-color': 'rgba(48,192,123,.8)',
//                                 'opacity': 1
//                             });
//                         }
//                     }, 300);

//                     setTimeout(function () {
//                         if (sel) {
//                             that.css({
//                                 'background-color': 'rgba(229,46,33,.8)',
//                                 'opacity': 0
//                             });
//                         } else {
//                             that.css({
//                                 'background-color': 'rgba(48,192,123,.8)',
//                                 'opacity': 0
//                             });
//                         }
//                         setTimeout(function () {
//                             that.remove();
//                         }, 300);
//                     }, 3000);
//                 }
//                 $('.msg-tips').on('click', function () {
//                     $('.msg-tips').remove();
//                 });
//             },
//             // 国际化
//             getInternation: function (lang) {
//                 if (lang) {
//                     $.i18n.init({
//                         fallbackLng: lang,
//                         fallbackOnEmpty: true,
//                         lowerCaseLng: true,
//                         detectLngFromLocalStorage: true,
//                         resGetPath: "locales/__lng__/translation.json",
//                         debug: true
//                     }, function () {
//                         $("[data-i18n]").i18n();
//                     });

//                     // window.KF5SupportBoxAPI.useLang(lang);
//                 }
//                 //obj.setCookie("i18next",lang);
//                 /*obj.ajaxFn('/common/LangPackage',{
//                    data: {page: 1,pageSize: 100},
//                    callback: function(res){
//                       if(res.IsSuccess){

//                       }
//                    }
//                 });*/
//             },
//             //获取语言类型
//             getLanguageType: function () {
//                 obj.ajaxFn('/common/GetLangType', {
//                     async: false,
//                     callback: function (res) {
//                         if (res.IsSuccess) {
//                             var lang = res.Data;
//                             if (lang == 'EN') {
//                                 lang = 'en';
//                             } else if (lang == 'ZH') {
//                                 lang = 'zh-cn';
//                             } else {
//                                 lang = 'en';
//                             }
//                             // else if (lang == 'ES'){
//                             //     lang = 'es';
//                             // }
//                             obj.setCookie("i18next", lang);
//                             localStorage.setItem('i18next_lng', lang);
//                             obj.getInternation(lang);
//                         }
//                     }
//                 });
//             },
//             setCookie: function (c_name, value, expiredays) {
//                 var exdate = new Date();
//                 exdate.setHours(exdate.getHours() + expiredays);
//                 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
//             },
//             delCookie: function (name) {
//                 var exp = new Date();
//                 exp.setTime(exp.getTime() - 1);
//                 var cval = obj.getCookie(name);
//                 if (cval != null) {
//                     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//                 }
//             },
//             getCookie: function (name) {
//                 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//                 if (arr = document.cookie.match(reg)) {
//                     return unescape(arr[2]);
//                 } else {
//                     return null;
//                 }
//             },
//             // 首页上浮
//             // animate:function(){
//             //    var sections = $('.section'),
//             //    section_one=$('.section-first'),
//             //    section_two=$('.section-second'),
//             //    section_three=$('.section-third'),
//             //    section_four=$('.section-four'),
//             //    section_five=$('.section-fifth');
//             //    prev =section_one.prev();
//             //    section_one.find('p').addClass('show animated fadeInUp');
//             //    section_one.find('span').addClass('show animated fadeInUp');
//             //    section_one.find('li').css('display','inline-block');
//             //    section_one.find('li').addClass('animated fadeInUp');
//             //    $(window).scroll(function(){
//             //       var sTop = $(this).scrollTop()+prev.height();
//             //       if(sTop>=section_one.offset().top+600){
//             //          // section_two.find('p').addClass('show animated fadeInUp');
//             //          section_two.find('span').addClass('show animated fadeInUp');
//             //          section_two.find('li').addClass('show animated fadeInUp');
//             //       }
//             //       if(sTop>=section_two.offset().top+600){
//             //          section_three.find('p').addClass('show animated fadeInUp');
//             //          section_three.find('span').addClass('show animated fadeInUp');
//             //          section_three.find('.pic').css('display','inline-block');
//             //          section_three.find('.pic').addClass('animated fadeInUp');
//             //          section_three.find('ul').css('display','inline-block');
//             //          section_three.find('ul').addClass('show animated fadeInUp');
//             //       }
//             //       if(sTop>=section_three.offset().top+600){
//             //          section_four.find('p').addClass('show animated fadeInUp');
//             //          section_four.find('span').addClass('show animated fadeInUp');
//             //          section_four.find('li').css('display',"inline-block");
//             //          section_four.find('li').addClass('animated fadeInUp');
//             //       }
//             //       if(sTop>=section_four.offset().top+500){
//             //          section_five.find("p").addClass('show animated fadeInUp');
//             //          section_five.find("span").addClass('show animated fadeInUp');
//             //          section_five.find("li").addClass('show animated fadeInUp');
//             //       }
//             //    });
//             // },
//             //vip等级
//             getVipgrade: function () {
//                 obj.ajaxFn('/user/GetLoginInfo', {
//                     callback: function (res) {
//                         if (res.IsSuccess) {
//                             var grade = res.Data.VipLevel;
//                             var userId = res.Data.UserId;
//                             localStorage.setItem('userId', userId);
//                             $('.show-vip').text('VIP' + grade);
//                         }
//                     }
//                 });
//             },
//             // 获取已收藏的市场列表
//             getMarketCollect: function (callback) {
//                 obj.ajaxFn('/UserCollect/GetFullMarketCollect', {
//                     async: false,
//                     callback: function (res) {
//                         if (res.IsSuccess) {
//                             var list = res.Data;
//                             var html1 = '',
//                                 html2 = '',
//                                 html3 = '',
//                                 html4 = '',
//                                 times = 4,
//                                 _width = 420;
//                             for (var i = 0; i < list.length; i++) {
//                                 var flag = list[i].MarketId.split('_')[0];
//                                 var icon = list[i].MarketId.split('_')[1];
//                                 var _name = list[i].TargetCurrencyName;
//                                 if ('mbtc' == flag) {
//                                     html1 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
//                                 } else if ('eth' == flag) {
//                                     html2 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
//                                 } else if ('bitcny' == flag) {
//                                     html3 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
//                                 } else if ('usdt' == flag) {
//                                     html4 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
//                                 }

//                                 // $('.cny-collect>ul').html(html);
//                                 $('.mbtc-collect>ul').html(html1);
//                                 $('.eth-collect>ul').html(html2);
//                                 $('.bitcny-collect>ul').html(html3);
//                                 $('.usdt-collect>ul').html(html4);
//                             }
//                             // if(!html){
//                             //    $('.list-collect>li').eq(0).addClass('hide');
//                             //    times -= 1;
//                             // }else{
//                             //     $('.list-collect>li').eq(0).removeClass('hide');
//                             // }  
//                             if (!html1) {
//                                 $('.list-collect>li').eq(0).addClass('hide');
//                                 times -= 1;
//                             } else {
//                                 $('.list-collect>li').eq(0).removeClass('hide');
//                             }
//                             if (!html2) {
//                                 $('.list-collect>li').eq(1).addClass('hide');
//                                 times -= 1;
//                             } else {
//                                 $('.list-collect>li').eq(1).removeClass('hide');
//                             }
//                             if (!html3) {
//                                 $('.list-collect>li').eq(2).addClass('hide');
//                                 times -= 1;
//                             } else {
//                                 $('.list-collect>li').eq(2).removeClass('hide');
//                             }
//                             if (!html4) {
//                                 $('.list-collect>li').eq(3).addClass('hide');
//                                 times -= 1;
//                             } else {
//                                 $('.list-collect>li').eq(3).removeClass('hide');
//                             }
//                             _width = 190 * times;
//                             $('.list-collect').css('width', _width + 'px');
//                             //收藏列表的高度
//                             var arr = [$('.mbtc-collect>ul>li').length, $('.eth-collect>ul>li').length, $('.usdt-collect>ul>li').length, $('.bitcny-collect>ul>li').length];

//                             var _height = Math.max.apply(null, arr) * 42 + 66;
//                             $('.list-collect').css('height', _height + 'px');
//                             if (0 == times) {
//                                 $('.list-collect').html('<li><p>' + $.t("collection") + '</p></li>');
//                                 $('.list-collect').css('left', '-60px');
//                                 $('.list-collect').css('width', '190px');
//                                 $('.list-collect').css('height', '110px');
//                                 $('.list-collect>li').css('border-bottom', 'none');
//                             } else if (1 == times) {
//                                 $('.list-collect').css('left', '-60px');
//                             } else if (2 == times) {
//                                 $('.list-collect').css('left', '-125px');
//                             }
//                             //收藏删除
//                             $('.del-collect').on('mouseover', function () {
//                                 $(this).prop('src', './imgs/del2.png');
//                             });
//                             $('.del-collect').on('mouseout', function () {
//                                 $(this).prop('src', './imgs/del1.png');
//                             });
//                             $('.del-collect').on('click', function () {
//                                 var _id = $(this).parent('li').prop('class');
//                                 obj.cancelMarketCollect(_id);
//                                 obj.getMarketCollect();
//                             });
//                         }
//                     }
//                 });
//             },
//             //取消收藏
//             cancelMarketCollect: function (marketId) {
//                 obj.ajaxFn('/UserCollect/CancelMarketCollect', {
//                     data: {
//                         marketId: marketId
//                     },
//                     callback: function (res) {}
//                 })
//             },
//             // 获取中英文字符长度
//             getLen: function (str) {
//                 var len = 0;
//                 for (var i = 0; i < str.length; i++) {
//                     var c = str.charCodeAt(i);
//                     //单字节加1
//                     if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
//                         len++;
//                     } else {
//                         len += 2;
//                     }
//                 }
//                 return len;
//             },
//             // 转换时间
//             dateFormate: function (str, flag) {
//                 // var arr = str.split('T'),
//                 // a2=arr[1].substr(0,arr[1].indexOf('.'));

//                 // if(flag){
//                 //    return arr[0];
//                 // }else{
//                 //    return arr[0]+' '+a2;
//                 // }
//                 return str;
//             },
//             // 除法
//             toDiv: function (arg1, arg2) {
//                 var t1 = 0,
//                     t2 = 0,
//                     r1, r2;
//                 try {
//                     t1 = arg1.toString().split(".")[1].length
//                 } catch (e) {}
//                 try {
//                     t2 = arg2.toString().split(".")[1].length
//                 } catch (e) {}
//                 with(Math) {
//                     r1 = Number(arg1.toString().replace(".", ""));
//                     r2 = Number(arg2.toString().replace(".", ""));
//                     return (r1 / r2) * pow(10, t2 - t1);
//                 }
//             },
//             // 乘法
//             toMul: function (arg1, arg2) {
//                 var m = 0,
//                     s1 = arg1.toString(),
//                     s2 = arg2.toString();
//                 try {
//                     m += s1.split(".")[1].length
//                 } catch (e) {}
//                 try {
//                     m += s2.split(".")[1].length
//                 } catch (e) {}
//                 return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
//             },
//             // 加法
//             toAdd: function (arg1, arg2) {
//                 var r1, r2, m;
//                 try {
//                     r1 = arg1.toString().split(".")[1].length
//                 } catch (e) {
//                     r1 = 0
//                 }
//                 try {
//                     r2 = arg2.toString().split(".")[1].length
//                 } catch (e) {
//                     r2 = 0
//                 }
//                 m = Math.pow(10, Math.max(r1, r2));
//                 return (parseInt(arg1 * m) + parseInt(arg2 * m)) / m;
//             },
//             // 减法
//             toSub: function (arg1, arg2) {
//                 var r1, r2, m, n;
//                 try {
//                     r1 = arg1.toString().split(".")[1].length
//                 } catch (e) {
//                     r1 = 0
//                 }
//                 try {
//                     r2 = arg2.toString().split(".")[1].length
//                 } catch (e) {
//                     r2 = 0
//                 }
//                 m = Math.pow(10, Math.max(r1, r2));
//                 //last modify by deeka
//                 //动态控制精度长度
//                 n = (r1 >= r2) ? r1 : r2;
//                 return ((arg1 * m - arg2 * m) / m).toFixed(n);
//             },
//             resizeHeight: function (sel) {
//                 sel = sel || '.other-body';
//                 $(sel).removeAttr('style');
//                 if ($('#content').height() < $(window).height() - ($('#header').height() + $('#footer').height())) {
//                     $(sel).height($(window).height() - ($('#header').height() + $('#footer').height()));
//                 }
//             },
//             //首页弹出层
//             getNotice: function () {
//                 if (!obj._notice) {
//                     obj.modShow('#mod-notice');
//                     sessionStorage.setItem("_notice", true);
//                 }
//             },
//             // 触发ws
//             initWS: function () {
//                 protobuf.load("../js/proto_market.json", function (err, root) {
//                     obj.StartWS(root);
//                 });
//             },
//             flag: true
//         };

//         if (0 == $('.login-box').length) {
//             if (obj.sign) {
//                 obj.myAvailabelAsset();
//                 $('#login>ul').eq(0).removeClass('show').siblings().addClass('show');
//             } else {
//                 $('#login>ul').eq(1).removeClass('show').siblings().addClass('show');
//             }
//         }
//         if (0 != $('.echarts').length) {
//             obj.initWS();
//             //初始化图表
//             // obj.chartLine();
//             //登陆框
//             var _width = $('.w-menu').offset().left - 106;
//             $('#login').css('right', _width + 'px');
//             //点击进入不同市场
//             $('.section-first').on('click', 'ul>li', function () {
//                 var that = $(this),
//                     marketId = that.prop('id');
//                 $('.section-first').append('<a href="./trade.html?marketid=' + marketId + '" id="link-attr"></a>');
//                 $('#link-attr')[0].click();
//                 $('#link-attr').remove();
//             });
//         }
//         /*$('.w-menu').on('click','>li',function(){
//            var that = $(this),
//               index = that.index(),
//               url = './market.html';

//            if(2==index||3==index){
//               if(!obj.sign){
//                  obj.hideTips('请先登录！');
//               }
//            }
//         });*/
//         // obj.getLanguageType();
//         obj.showMenu();
//         // obj.getNotice();
//         // obj.notice();
//         if (obj.sign && (0 == $('.validate-box').length) && (0 == $('.choose-validate').length) && (0 == $('.bind-phone').length) && (0 == $('.my-gugValidate').length)) {
//             obj.getVipgrade();
//             obj.getMarketCollect();
//             $('.show-vip').removeClass('hide');
//         } else {
//             $('.list-collect.clearfix').html('<p data-i18n="collection"></p>');
//         }
//         // if(0!=$('#banner').length){
//         //    obj.animate();
//         // }
//         if ('/' == location.pathname.toLowerCase()) {
//             if (obj.sign) {
//                 obj.myTotalAsset();
//                 // window.KF5SupportBoxAPI.ready(function(){
//                 //    // 传递用户信息给组件使用
//                 //    var data = {name: ''};
//                 //    var user = obj.account;
//                 //    if(obj.validate(obj.reg_email,user)){
//                 //       data.email=user;
//                 //    }else{
//                 //       data.phone=user;
//                 //    }
//                 //    window.KF5SupportBoxAPI.identify(data);
//                 // });
//             }
//             obj.getTradeStatistics();
//         }
//         if (!obj.sign) {
//             var notAllow = ['modify-', 'set-', 'bind-', 'api-', 'buzpwd', 'transaction'];
//             for (var i = 0; i < notAllow.length; i++) {
//                 if (-1 !== location.pathname.toLowerCase().indexOf(notAllow[i])) {
//                     location.href = '/login.html';
//                 }
//             }
//         }
//         if (obj.sign) {
//             $('.section.section-second').addClass('hide');
//         } else {
//             $('.section.section-second').removeClass('hide');
//         }
//         // 语言切换
//         $('.lang-box').on('click', function () {
//             $('.lang-box>.list-lang').css('display', 'block');
//         });
//         $('.lang-box').on('click', '.list-lang>li', function () {
//             var that = $(this),
//                 lang = 'en',
//                 type = 'ZH',
//                 index = that.index(),
//                 url = '';
//             if (1 != index) {
//                 type = 'EN';
//                 lang = 'zh-cn';
//                 $('#support>a').prop('href', '//XBrick.kf5.com/hc/?lang=zh_cn');
//             }
//             // else if(2 == index){
//             //     type = 'ES';
//             //     lang = 'es';
//             // }
//             obj.ajaxFn('/common/SetLangType', {
//                 data: {
//                     type: type
//                 },
//                 callback: function (res) {
//                     if (res.IsSuccess) {}
//                 }
//             });
//             url = window.location.pathname + window.location.search; //+'?lang='+lang

//             obj.setCookie("i18next", lang);
//             localStorage.setItem('i18next_lng', lang);
//             $('.w-set').append('<a href="' + url + '" id="link-attr"></a>');
//             $('#link-attr')[0].click();
//             $('#link-attr').remove();
//         });
//         obj.getInternation(obj.lang);
//         //obj.myAvailabelAsset();
//         // 关闭模态框
//         $('.mod-box').on('click', '[data-action]', function (e) {
//             e = e || window.event;
//             e.stopPropagation();
//             e.preventDefault();

//             var action = $(this).attr('data-action'),
//                 $box = $(this).closest('.mod-box'),
//                 _id = $box.prop('id'),
//                 $form = $box.find('.mod-form');
//             if ('close' == action) {
//                 obj.modHide('#' + _id);
//             }
//             $form.find('.error').addClass('hide');
//         });

//         // 点击回车登陆
//         $('#login').on('keypress', function (e) {
//             e = e || window.event;
//             if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
//                 $('.login-btn').trigger('click');
//             }
//         });

//         // 登录
//         $('.login-btn').on('click', function () {
//             //obj.getLanguageType();
//             var user = $('#input-user').val(),
//                 pwd = $('#input-pwd').val(),
//                 that = $(this),
//                 sign = false,
//                 checked = $('#remember').prop('checked');

//             if (user && '' != user) {
//                 user = user.trim();
//             }
//             if (pwd && '' != pwd) {
//                 pwd = pwd.trim();
//             }
//             if (checked) {
//                 var data = {
//                     account: user,
//                     password: pwd,
//                     Name: 'bindIp'
//                 };
//             } else {
//                 data = {
//                     account: user,
//                     password: pwd
//                 };
//             }
//             $('#input-user').trigger('blur');
//             $('#input-pwd').trigger('blur');
//             if (obj.flag) {
//                 that.prop('disabled', true).text($.t('Log_in'));
//                 obj.ajaxFn('/account/Login', {
//                     data: data,
//                     callback: function (res) {
//                         if (res.IsSuccess) {
//                             obj.sign = true;
//                             localStorage.setItem('account', user);
//                             $('#support>a').prop('href', 'http://v2web.XBrick.com/KF5/KF5Login?lang=zh_cn');
//                             // obj.ajaxFn('/KF5/KF5LoginSSO',{
//                             //    _method: 'GET',
//                             //    callback: function(res){
//                             //       console.log('一登录');
//                             //    }
//                             // });
//                             // $('body').append('<a href="http://v2web.XBrick.com/KF5/KF5LoginSSO" id="link-attr"></a>');
//                             // $('#link-attr')[0].click();
//                             // $('#link-attr').remove();
//                             localStorage.setItem('sign', 1);
//                             obj.showMenu();
//                             obj.myTotalAsset();
//                             obj.myAvailabelAsset();
//                             $('#login>ul').eq(0).removeClass('show').siblings().addClass('show');
//                         } else {
//                             if (2 == res.Code) {
//                                 msg = $.t('incorrect_pwd'); //+$.t('surplus')+(5-res.ErrorMsg)+$.t('chance')+'！'+$.t('more_wrong')+$.t('lock_minute');
//                             } else if (8 == res.Code) {
//                                 msg = $.t('account_lock');
//                             } else if (16 == res.Code) {
//                                 msg = $.t('more_wrong') + $.t('lock_minute');
//                             } else if (32 == res.Code) {
//                                 msg = $.t('account_exist');
//                             }
//                             if (-1 != [2, 8, 16].indexOf(res.Code)) {
//                                 obj.getTips($('#input-pwd'), msg);
//                                 //$('#input-pwd').next().removeClass('hide').html(msg);
//                             } else {
//                                 obj.getTips($('#input-user'), msg);
//                             }
//                             localStorage.removeItem('sign');
//                         }
//                         that.prop('disabled', false).text($.t('login'));
//                     },
//                     errorCallback: function (res) {
//                         localStorage.removeItem('sign');
//                         that.prop('disabled', false).text($.t('login'));
//                     }
//                 });
//             }
//         });
//         $('#input-user').on('blur', function () {
//             var user = $('#input-user').val(),
//                 that = $(this),
//                 flag = true;

//             if (null != user && '' != user) {
//                 user = user.trim();
//                 that.next().addClass('hide');
//             } else {
//                 flag = false;
//                 that.next().removeClass('hide').html($.t('account_empty'));
//             }
//             obj.flag = flag;
//         });
//         $('#input-pwd').on('blur', function () {
//             var pwd = $('#input-pwd').val(),
//                 that = $(this),
//                 flag = true;
//             if (null != pwd && '' != pwd) {
//                 pwd = pwd.trim();
//                 that.next().addClass('hide');
//             } else {
//                 flag = false;
//                 that.next().removeClass('hide').html($.t('passd_empty'));
//             }
//             obj.flag = flag;
//         });

//         // 关闭交易密码/取消关闭交易密码操作
//         $('.buz-tips').on('click', '[data-type]', function () {
//             var that = $(this),
//                 type = that.attr('data-type'),
//                 $p = that.parent(),
//                 $form = that.closest('.mod-form');

//             if (2 == type) {
//                 $p.addClass('hide');
//                 $p.prev().removeClass('hide');
//                 $('#to-modify').removeClass('hide');
//                 $('#to-addr').addClass('hide');
//                 $form.find('.close-buzPwd').removeClass('hide');
//             } else {
//                 $p.addClass('hide');
//                 $p.next().removeClass('hide');
//                 $('#to-modify').addClass('hide');
//                 $('#to-addr').removeClass('hide');
//                 $form.find('.close-buzPwd').addClass('hide');
//             }
//         });

//         // 退出登录
//         $('.list-user').on('click', '>li', function () {
//             var index = $(this).index();
//             if (3 === index) {
//                 obj.ajaxFn('/account/LoginOut', {
//                     callback: function (res) {
//                         if (res.IsSuccess) {
//                             localStorage.clear();
//                             window.location.href = "./login.html";
//                         }
//                     }
//                 });
//             }
//         });
//         if ('en' == obj.lang) {
//             // $('.banner-three').css('background', 'url(../imgs/wid-en.jpg) center center no-repeat');
//             $('.banner-one').css('background', 'url(../imgs/banner-en.jpg) center center no-repeat');
//             $('.banner-one>a').prop('href', 'https://xbc.xbrick.io/index.html');
//             $('.pst-img').prop('src', './imgs/pstup-en.png');
//             $('.app-right>img').prop('src', './imgs/load-en.png');
//         } else if ('zh-cn' == obj.lang) {
//             // $('.banner-three').css('background', 'url(../imgs/wid-zh.jpg) center center no-repeat');
//             $('.banner-one').css('background', 'url(../imgs/banner-zh.jpg) center center no-repeat');
//             $('.banner-one>a').prop('href', 'https://xbc.xbrick.io/index-zh-CN.html');
//             $('.pst-img').prop('src', './imgs/pstup-zh.png');
//             $('.app-right>img').prop('src', './imgs/load-zh.png');
//         }
//         // 日期格式化 例如(new Date()).format('yyyy-MM-dd')
//         Date.prototype.format = function (format) {
//             var o = {
//                 "M+": this.getMonth() + 1, //month 
//                 "d+": this.getDate(), //day 
//                 "h+": this.getHours(), //hour 
//                 "m+": this.getMinutes(), //minute 
//                 "s+": this.getSeconds(), //second 
//                 "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
//                 "S": this.getMilliseconds() //millisecond 
//             }
//             if (/(y+)/.test(format)) {
//                 format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//             }
//             for (var k in o) {
//                 if (new RegExp("(" + k + ")").test(format)) {
//                     format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//                 }
//             }
//             return format;
//         };

//         if (!Number.isNaN) {
//             Number.isNaN = function (n) {
//                 return (typeof n === "number" && window.isNaN(n));
//             };
//         }

//         // 返回顶部
//         $('.goback').on('click', function () {
//             $('body').animate({
//                 scrollTop: 0
//             }, 400);
//         });
//         window.obj = obj;
//     })();
// });


// var username = localStorage.getItem("account");
// $(".accountName").text(username);   

// $(function() {
// 	var Accordion = function(el, multiple) {
// 		this.el = el || {};
// 		this.multiple = multiple || false;

// 		// Variables privadas
// 		var links = this.el.find('.link');
// 		// Evento
// 		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
// 	}

// 	Accordion.prototype.dropdown = function(e) {
// 		var $el = e.data.el;
// 			$this = $(this),
// 			$next = $this.next();

// 		$next.slideToggle();
// 		$this.parent().toggleClass('open');

// 		if (!e.data.multiple) {
// 			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
// 		};
// 	}	

// 	var accordion = new Accordion($('#accordion'), false);
// });
// document.write('<script src="\/\/assets-cdn.kf5.com\/supportbox\/main.js?' + (new Date).getDay() + '" id="kf5-provide-supportBox" kf5-domain="XBrick.kf5.com" charset="utf-8"><\/script>');
document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-109683993-1"></script>')
$(function () {

    var ip = 'http://10.45.0.41:8881'; 
    // var ip = 'http://10.0.2.61:8881';
    // var ip = 'http://chain.imwork.net:8881';
    //    var ip = 'https://webapi.xbrick.io';
    // var ip = '//testwebapi.xbrick.io';
    //公告
    //统计
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-109683993-1');
    //下载二维码
    if (0 != $('.appdownload').length) {
        $('.appdownload>.app-right>#qrcode').qrcode({
            width: 150,
            height: 150,
            correctLevel: 0,
            text: 'https://www.xbrick.io/app-download.html'
        });
    }
    // 切换首页轮播图片
    $('#banner').on('click', function (e) {
        e = e || window.event,
            $that = $(e.target);

        if (0 < $that.closest('.w-sign').length) {
            $that.addClass('on').siblings('li').removeClass('on');
        }
    });
    //顶部导航
    $('.set-1').on('touchstart', '>li', function () {
        $('.set-1>li>ul').css('display', 'none');
        $(this).children('ul').css('display', 'block');
    });
    //滚屏事件
    // window.onscroll = function(){ 
    //    var t = document.documentElement.scrollTop || document.body.scrollTop, 
    //        top_div = $('.fixed>#header'),
    //        _menu = $('.w-menu>li.on>a');
    //        // _menu1 = $('.w-menu>li>a');
    //    if( t >= 100 ) { 
    //       top_div.css('background-color','rgba(29,30,30,1)')
    //        // _menu.css('color','#1495e3');
    //    }else{ 
    //       top_div.css('background-color','rgba(29,30,30,'+t/100+')');
    //       // _menu.css('color','#fff')
    //    } 
    //    if($('#mask').hasClass('show')){
    //       $('#mask').height($(document).height());
    //    }
    // } 
    //友情链接悬停
    $('.section-partner').on('mouseover', '>ul>li', function () {
        var _this = $(this),
            _lis = $('.section-partner>ul>li'),
            _eq = _this.attr('data-id');
        _lis.eq(_eq).children('a').children('img').prop('src', './imgs/partner' + (_eq * 1 + 1) + '-' + (_eq * 1 + 1) + '.png');
    });
    $('.section-partner').on('mouseout', '>ul>li', function () {
        var _this = $(this),
            _lis = $('.section-partner>ul>li'),
            _eq = _this.attr('data-id');
        _lis.eq(_eq).children('a').children('img').prop('src', './imgs/partner' + (_eq * 1 + 1) + '.png');
    });
    //帮助中心悬停
    $('.section-four').on('mouseover', '>ul>li', function () {
        var _this = $(this),
            _lis = $('.section-four>ul>li'),
            _eq = _this.attr('data-id');
        _lis.eq(_eq).children('img').prop('src', './imgs/bg2-' + (_eq * 1 + 11) + '.png');
    });
    $('.section-four').on('mouseout', '>ul>li', function () {
        var _this = $(this),
            _lis = $('.section-four>ul>li'),
            _eq = _this.attr('data-id');
        _lis.eq(_eq).children('img').prop('src', './imgs/bg2-' + (_eq * 1 + 1) + '.png');
    });
    // 绑定id
    $('.input-checkbox').on('mouseover', '.bind_ip', function () {
        $('.cont-tips').css("display", "block");
    });
    $('.input-checkbox').on('mouseout', '.bind_ip', function () {
        $('.cont-tips').css("display", "none");
    });

    // 初始化页面
    setTimeout(function () {
        var _h = $('.w-banner>li').innerHeight(),
            _wh = $(window).height(),
            lb = $('.login-box').outerHeight(true) + 80;
        //$('#banner').height(_h);
        //$('#banner>.w-box').height(_h);
        if (_wh < lb) {
            $('.login-box').css('margin-top', 100);
        } else {
            $('.login-box').css('margin-top', 120);
        }
        $(window).resize(function () {
            var _h = $('.w-banner>li').innerHeight(),
                _wh = $(window).height();
            //$('#banner').height(_h);
            //$('#banner>.w-box').height(_h);
            if (0 != $('#bg-wrap').length) {
                if (_wh < lb) {
                    $('.login-box').css('margin-top', 40);
                } else {
                    $('.login-box').css('margin-top', 40 + (_wh - lb) / 2);
                }
            }
            if ($('#mask').hasClass('show')) {
                $('#mask').height($(document).height());
            }
        });
    }, 10);
    //图片轮播
    var count = 0,
        timer = null;
    $('.w-sign').on('mouseover', '>li', function () {
        var that = $(this),
            $show = $('.w-banner>li'),
            index = that.index();

        count = index;
        that.addClass('on').siblings('li').removeClass('on');
        $show.eq(count).addClass('on').siblings('li').removeClass('on');
    });
    $('#banner').on('mouseover', function () {
        clearTimeout(timer);
    });
    $('#banner').on('mouseout', function () {
        timer = setInterval(times, 5000);
    });
    var times = function () {
        var $show = $('.w-banner>li'),
            $sign = $('.w-sign>li');
        count++;
        if (count >= $show.length) {
            count = 0;
        }
        $sign.eq(count).addClass('on').siblings('li').removeClass('on');
        $show.eq(count).addClass('on').siblings('li').removeClass('on');
    };
    timer = setInterval(times, 5000);

    // 更新验证码
    $('#pic-captcha').on('click', function () {
        var url = ip + '/common/Captcha?rd=' + Math.random();
        $(this).attr('src', url);
    });
    ~(function () {
        var obj = {
            // reg_email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            //国外邮箱
            reg_email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)/,
            reg_ip: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
            account: localStorage.getItem('account') || '',
            sign: localStorage.getItem('sign') || false,
            lang: localStorage.getItem('i18next_lng') || 'en',
            _notice: sessionStorage.getItem("_notice") || false,
            codeTimer: null,
            Controllers: {
                MarketController: 1 //市场控制器
            },
            ReceiveCommand: {
                Error: 0, //发生错误
                SingleKLine: 1000, //单条K线数据
                BatchKLine: 1001, //批量K线数据
                BatchKLineSendComplate: 1002, //批量K线数据发送完成
                // ScrollDayKLine: 1006,//日滑动统计数据
            },
            SendCommand: {
                SetKLineFequency: 900, //设置当前市场K线频度
                SetReceiveOtherMarketKLine: 902, //设置接收其它市场的K线数据
                RepairKLine: 903, //修复K线数据
            },
            otherMarketIds: ["usdt_mbtc", "usdt_eth", "bitcny_mbtc", "bitcny_eth"],
            currentMarketId: "mbtc_eth", //当前市场ID,用户切换后发生改变
            dict: {}, //数据缓存
            validate: function (reg, val) {
                var reg = reg || /^/;
                return reg.test(val);
            },
            // ajax
            ajaxFn: function (url, opts) {
                var _url = ip + url,
                    _method = opts.method || 'POST',
                    _dataType = opts.dataType || 'json',
                    _data = opts.data || null,
                    _async = opts.async ? true : false,
                    _jsonp = opts.jsonp || null,
                    _callback = opts.callback || new Function(),
                    _errorCallback = opts.errorCallback || new Function();
                $.ajax({
                    url: _url,
                    method: _method,
                    dataType: _dataType,
                    data: _data,
                    jsonp: _jsonp,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (res) {
                        var local = window.location,
                            pathUrl = local.pathname.toLowerCase(),
                            referrer = document.referrer.toLowerCase(),
                            sign = false,
                            notList = ['bind-', 'email-', 'forgot', 'modify-', 'login', 'register', 'reset', 'twocardvalidate'];
                        if (res.IsSuccess) {
                            if (_url.toLowerCase().indexOf('/user/getloginstatus') != -1) {
                                if ((res.Data & 32) != 0) {
                                    local.href = './twocardvalidate.html';
                                } else if ((res.Data & 16) != 0) {
                                    if (pathUrl != '/set-gugvalidate.html') {
                                        local.href = './bind-phone.html';
                                    }
                                }
                            } else if (_url.toLowerCase().indexOf('/account/login') != -1) {
                                for (var i = 0; i < notList.length; i++) {
                                    if (-1 == referrer.indexOf(notList[i])) {
                                        sign = true;
                                    } else {
                                        sign = false;
                                        break;
                                    }
                                }
                                if ((res.Data & 4) != 0) {
                                    local.href = './twocardvalidate.html';
                                } else {
                                    if (sign) {
                                        obj.setCookie('local_href', referrer);
                                        local.href = obj.getCookie('local_href');
                                    } else {
                                        obj.delCookie('local_href');
                                        if (!(local.pathname == '/')) {
                                            local.href = '/';
                                        }
                                    }
                                }
                            }
                        } else {
                            if (-9996 == res.Code) {
                                local.href = './twocardvalidate.html';
                            } else if (-9995 == res.Code) {
                                local.href = './twocardvalidate.html';
                                // if(obj.validate(obj.reg_email,obj.account)){
                                //    local.href = './bind-validate.html';
                                // }
                            } else if (-9997 == res.Code) {
                                localStorage.clear();
                                if (pathUrl == '/' || pathUrl == '/trade.html') {
                                    obj.showMenu();
                                    if (pathUrl != '/trade.html') {
                                        return false;
                                    }
                                }
                                if (pathUrl != '/trade.html') {
                                    local.href = '/login.html';
                                }
                            }
                        }
                        if (typeof (_callback) == "function" && typeof (res) != 'undefined') {
                            _callback(res);
                        }
                    },
                    error: function (error) {
                        _errorCallback(error);
                    }
                });
            },
            // 上传图片
            ajaxUpload: function (that, opts) {
                var url = opts.url || 'https://image.XBrick.io/File/upload/Certification?action=uploadimage',
                // var url = opts.url || 'http://10.0.2.61:8885/File/upload/Certification?action=uploadimage',
                    // var url = opts.url || 'https://testimage.XBrick.io/File/upload/Certification?action=uploadimage',
                    // var url = opts.url || '//10.0.0.216:8895/File/upload/Certification?action=uploadimage',
                    // var url = opts.url || '//chain.imwork.net:8895/File/upload/Certification?action=uploadimage', 
                    _callback = opts.callback || new Function();

                that.ajaxSubmit({
                    url: url,
                    type: 'POST',
                    success: function (res) {
                        if (typeof (_callback) == "function" && typeof (res) != 'undefined') {
                            that[0].reset();
                            _callback(res);
                        }
                    },
                    error: function (error) {
                        _errorCallback(error);
                    }
                });
            },
            //enter提交form表单
            submitForm: function (_form, _id) {
                $(_form).on('keypress', function (event) {
                    if (event.keyCode == 13) {
                        $(_id).trigger("click");
                    }
                });
            },
            StartWS: function (root) {
                var Error = root.lookup("Error");
                var KLineInfo = root.lookup("KLineInfo");
                var KLineList = root.lookup("KLineList");
                // var ScrollDayKLine = root.lookup("ScrollDayKLine");

                // var ws = new WebSocket("wss://ws.xbrick.io/");
                // var ws = new WebSocket("wss://testws.xbrick.io/");
                var ws = new WebSocket("ws://10.45.0.41:8888/");
                ws.onopen = function (e) {
                    // console.log("Connection open...");
                    ReceiveOtherMarket(root, ws); //接收非选中市场的K线数据
                    GetMarketKLineChatData(root, ws);
                    GetMarketKLineChatData(root, ws);
                };
                ws.binaryType = "arraybuffer";
                ws.onmessage = function (e) {
                    if (e.data instanceof ArrayBuffer) {
                        var cmdArray = new Uint8Array(e.data, 0, 2);
                        var receiveBuffer = new Uint8Array(e.data, 2);
                        var cmd = ByteToUnShort(cmdArray);
                        if (cmd == obj.ReceiveCommand.Error) {
                            var data = Error.decode(receiveBuffer);
                            // console.log("收到错误信息");
                            // console.log(data);
                        } else if (cmd == obj.ReceiveCommand.SingleKLine) {
                            var data = KLineInfo.decode(receiveBuffer);
                            // console.log('single',data);
                            //处理数据
                            processSingleData(ws, root, data);
                        } else if (cmd == obj.ReceiveCommand.BatchKLine) {
                            var batchData = KLineList.decode(receiveBuffer);
                            //处理数据
                            processListData(batchData.List);
                        } else if (cmd == obj.ReceiveCommand.BatchKLineSendComplate) {
                            // console.log("K线数据传输完成");
                            // drawingKLine();
                        }
                    }
                };
                ws.onerror = function (e) {
                    // console.log('websocked error');
                }
                ws.onclose = function (e) {
                    // console.log("Connection closed", e);
                    setTimeout(function () {
                        obj.StartWS(root);
                    }, 2000);
                };
                //当用户选中其它市场时执行以下代码(需要替换成实际代码)
                // $("#btn_ChangeCurrentMarketId").click(function () {
                //     obj.currentMarketId = $("#txt_CurrentMarketId").val();
                //     GetMarketKLineChatData(root, ws);
                // });
                //走势图切换
                $('.section-first').on('mouseover', '>ul>li', function () {
                    var _this = $(this),
                        _id = _this.attr('data-id'),
                    _lis = $('.section-first>ul>li'),
                        _markrtId = _this.prop('id');
                    $('.section-first>ul>li').removeClass('active');
                    _this.addClass('active');
                    obj.currentMarketId = _markrtId;
                });
                //获取渲染k线图的数据(会批量推送)
                function GetMarketKLineChatData(root, ws) {
                    var Frequency = root.lookup("SetKLineFrequency");
                    var frequency = Frequency.create({
                        MarketId: obj.currentMarketId,
                        FrequencyKey: "M1",
                        IsGraph: true,
                        IsReconnect: false
                    });
                    var dataBuffer = Frequency.encode(frequency).finish();
                    var buffer = GenerateCmdBuffer(obj.Controllers.MarketController, obj.SendCommand.SetKLineFequency, dataBuffer);
                    if (ws.readyState == WebSocket.OPEN) {
                        ws.send(buffer);
                    }
                }
                //获取市场价格的K线数据(只会推送最新一条)
                function ReceiveOtherMarket(root, ws) {
                    var MarketFrequency = root.lookup("MarketKLineFrequency");
                    var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
                    var list = new Array();
                    for (var i = 0; i < obj.otherMarketIds.length; i++) {
                        var marketId = obj.otherMarketIds[i];
                        var marketFrequency = MarketFrequency.create({
                            MarketId: marketId,
                            Keys: ["D"]
                        });
                        list.push(marketFrequency);
                    }
                    var fList = MarketFrequencyList.create({
                        List: list
                    });
                    var dataBuffer = MarketFrequencyList.encode(fList).finish();
                    var buffer = GenerateCmdBuffer(obj.Controllers.MarketController, obj.SendCommand.SetReceiveOtherMarketKLine, dataBuffer);
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(buffer);
                    }
                }

                //处理K线数据的方法
                function processListData(list) {
                    var listMarketId = list[0].MarketId;
                    var oldData = obj.dict[listMarketId];
                    if (oldData == undefined) {
                        var categoryData = [];
                        var prices = [];
                        var lastId = 0;
                        for (var i = 0; i < list.length; i++) {
                            var data = list[i];
                            prices.push(data.ClosedPrice);
                            categoryData.push(data.OpenTime);
                            lastId = data.Id;
                        }
                        var result = {
                            categoryData: categoryData,
                            prices: prices,
                            lastId: lastId,
                        };
                        obj.dict[listMarketId] = result;
                        oldData = result;
                    } else {
                        for (var i = 0; i < list.length; i++) {
                            var data = list[i];
                            oldData.prices.push(data.ClosedPrice);
                            oldData.categoryData.push(data.OpenTime);
                            oldData.lastId = data.Id;
                        }
                    }
                    // if(data.Frequency=='D1'){
                    //    var item = list[list.length-1];
                    //    rate = (0!==item.OpenPrice?obj.getFloatValue(((item.ClosedPrice||0)-(item.OpenPrice||0))/item.OpenPrice*100,2):0);
                    //    if((item.ClosedPrice-item.OpenPrice)>0){
                    //       sign = '+'+(Number.isNaN(rate)?'-':rate+'%');
                    //       $('#'+listMarketId).children('p').eq(2).css('color','#30c07b');
                    //    }else{
                    //       sign = (Number.isNaN(rate)?'-':rate+'%');
                    //       $('#'+listMarketId).children('p').eq(2).css('color','#e52e35');
                    //    }
                    //    if(0===item.OpenPrice){
                    //       sign = '0%';
                    //    }
                    //    $('#'+listMarketId).children('p').eq(2).text(sign);
                    // }
                    //更新特定市场的价格
                    updatePrice(listMarketId, oldData.prices[oldData.prices.length - 1]);
                }

                function processSingleData(ws, root, data) {
                    // console.log("单条");
                    // console.log(data);
                    var kData = [];

                    var oldData = obj.dict[data.MarketId];
                    if (oldData == undefined) {
                        var categoryData = [];
                        var prices = [];
                        prices.push(data.ClosedPrice);
                        categoryData.push(data.OpenTime);
                        var result = {
                            categoryData: categoryData,
                            prices: prices,
                            lastId: data.Id,
                        };
                        obj.dict[data.Market] = result;
                    } else {
                        //网K线数组后面加新的K线
                        if (data.Id == oldData.lastId + 1) {
                            oldData.prices.push(data.ClosedPrice);
                            oldData.categoryData.push(data.OpenTime);

                        } else if (data.Id == oldData.lastId) { //更新K线最后一条数据
                            oldData.prices[oldData.prices.length - 1] = data.ClosedPrice;
                        }
                    }
                    //如果K线的市场ID等于当前用户选中的市场ID，则更新K线图
                    // if(data.MarketId == obj.currentMarketId){
                    //    drawingKLine();
                    // }
                    //利率rate
                    if (data.Frequency == 'D') {
                        rate = (0 != data.OpenPrice ? obj.getFloatValue(((data.ClosedPrice || 0) - (data.OpenPrice || 0)) / data.OpenPrice * 100, 2) : 0);
                        // console.log('rate',data);
                        if ((data.ClosedPrice - data.OpenPrice) > 0) {
                            sign = '+' + (Number.isNaN(rate) ? '-' : rate + '%');
                            $('#' + data.Market).children('p').eq(2).css('color', '#28B262');
                        } else {
                            sign = (Number.isNaN(rate) ? '-' : rate + '%');
                            $('#' + data.Market).children('p').eq(2).css('color', '#FF6161');
                        }
                        if (0 === data.OpenPrice) {
                            sign = '0%';
                        }
                        $('#' + data.Market).children('p').eq(2).text(sign);
                        if ('usdt' == data.Market.split('_')[0]) {
                            $('#' + data.Market).children('p').eq(1).text('$' + data.ClosedPrice);
                        } else if ('bitcny' == data.Market.split('_')[0]) {
                            $('#' + data.Market).children('p').eq(1).text('¥' + data.ClosedPrice);
                        }
                        // $('#'+data.MarketId).children('p').eq(2).text('--');
                    }
                    //更新市场价格
                    updatePrice(data.Market, data.ClosedPrice);
                }
                //渲染K线图
                // function drawingKLine() {
                //    var list = obj.dict[obj.currentMarketId];
                //    if (list != undefined) {
                //       //渲染逻辑
                //       if(200<list.length){
                //         list.shift();
                //       }
                //       var myChart = echarts.init(document.getElementById('chart'));
                //       var prices = list.prices;
                //       var categoryData = list.categoryData;
                //       option = {
                //       xAxis: {
                //             type: 'category',
                //             boundaryGap: false,
                //             // data: obj.chartObj._date
                //             data: categoryData
                //          },
                //          yAxis: {
                //             type: 'value',
                //             boundaryGap: [0, '100%']
                //          },
                //          animation: false,
                //          series: [
                //             {
                //                name:'实时数据',
                //                type:'line',
                //                smooth:true,
                //                symbol: 'none',
                //                sampling: 'average',
                //                itemStyle: {
                //                    normal: {
                //                        color: '#1495e3'
                //                    }
                //                },
                //                areaStyle: {
                //                    normal: {
                //                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //                            offset: 0,
                //                            color: '#eef3ff'
                //                        }, {
                //                            offset: 1,
                //                            color: '#eef3ff'
                //                        }])
                //                    }
                //                },
                //                data: prices
                //             }
                //          ]
                //       };
                //       myChart.setOption(option);
                //    }
                // }
                function updatePrice(market, price) {
                    var _price = '--';
                    //更新价格逻辑
                    if (price) {
                        _price = price;
                    } else if (0 == price) {
                        _price = 0;
                    }
                    if ('usdt' == market.split('_')[0]) {
                        $('#' + market).children('p').eq(1).text('$' + _price);
                    } else if ('bitcny' == market.split('_')[0]) {
                        $('#' + market).children('p').eq(1).text('¥' + _price);
                    }
                }
                //类库部分，不用处理
                function GenerateCmdBuffer(controller, command, dataBuffer) {
                    var controllerLittleEndian = new dcodeIO.ByteBuffer(4).writeUint32(controller, 0).flip();
                    var controllerBigEndian = new Uint8Array(4);
                    controllerBigEndian[0] = controllerLittleEndian.view[3];
                    controllerBigEndian[1] = controllerLittleEndian.view[2];
                    controllerBigEndian[2] = controllerLittleEndian.view[1];
                    controllerBigEndian[3] = controllerLittleEndian.view[0];
                    var commandLittleEndian = new dcodeIO.ByteBuffer(2).writeUint16(command, 0).flip();
                    var commandBigEndian = new Uint8Array(2);
                    commandBigEndian[0] = commandLittleEndian.view[1];
                    commandBigEndian[1] = commandLittleEndian.view[0];
                    var allBuffer = dcodeIO.ByteBuffer.concat([controllerBigEndian, commandBigEndian, dataBuffer], "binary");
                    return allBuffer.view;
                }

                function ByteToUnShort(b) {
                    return (b[0] & 0xff) | ((b[1] & 0xff) << 8);
                }
            },
            // 发送二进制数据
            GenerateCmdBuffer: function (controller, command, dataBuffer) {
                var controllerLittleEndian = new dcodeIO.ByteBuffer(4).writeUint32(controller, 0).flip();
                var controllerBigEndian = new Uint8Array(4);
                controllerBigEndian[0] = controllerLittleEndian.view[3];
                controllerBigEndian[1] = controllerLittleEndian.view[2];
                controllerBigEndian[2] = controllerLittleEndian.view[1];
                controllerBigEndian[3] = controllerLittleEndian.view[0];
                var commandLittleEndian = new dcodeIO.ByteBuffer(2).writeUint16(command, 0).flip();
                var commandBigEndian = new Uint8Array(2);
                commandBigEndian[0] = commandLittleEndian.view[1];
                commandBigEndian[1] = commandLittleEndian.view[0];
                var allBuffer = dcodeIO.ByteBuffer.concat([controllerBigEndian, commandBigEndian, dataBuffer], "binary");
                return allBuffer.view;
            },
            ByteToUnShort: function (b) {
                return (b[0] & 0xff) | ((b[1] & 0xff) << 8);
            },
            // 获取session值
            getStorage: function () {
                var type = localStorage.getItem('Type'),
                    id = localStorage.getItem('UserId'),
                    account = localStorage.getItem('account'),
                    lang = localStorage.getItem('i18next_lng');
                return {
                    Type: type,
                    Id: id,
                    account: account,
                    lang: lang
                };
            },
            // 获取url参数
            getParam: function () {
                var params = (window.location.search).substr(1),
                    items = params.split('&'),
                    data = {};
                for (var i = 0; i < items.length; i++) {
                    var key = items[i].substr(0, items[i].indexOf('=')),
                        val = items[i].substr(items[i].indexOf('=') + 1);
                    if (0 != key.length && 0 != val.length) {
                        data[key] = val;
                    }
                }
                return data;
            },
            // 分页
            page: function (opt) {
                if (!opt._class) {
                    return false;
                }

                var objs = $(opt._class),
                    allNum = opt.allNum || 5,
                    nowNum = opt.nowNum || 1,
                    html = '',
                    callback = opt.callback || function () {};
                objs.off('click', '>li');
                if (opt.allNum <= 0) {
                    objs.empty();
                    return false;
                }
                if (nowNum >= 2) {
                    html += '<li class="st-page" data-page="' + (nowNum - 1) + '"><i class="icon icon-direction"></i></li>';
                }

                if (allNum <= 5) {
                    for (var i = 1; i <= allNum; i++) {
                        if (nowNum == i) {
                            html += '<li class="on">' + i + '</li>';
                        } else {
                            html += '<li data-page="' + i + '">' + i + '</li>';
                        }
                    }
                } else {
                    if (nowNum > 3) {
                        html += '<li data-page="1">1</li><li class="more">...</li>';
                    }
                    for (var i = 1; i <= 5; i++) {
                        if (nowNum == 1 || nowNum == 2) {
                            if (nowNum == i) {
                                html += '<li class="on">' + i + '</li>';
                            } else {
                                html += '<li data-page="' + i + '">' + i + '</li>';
                            }
                        } else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {
                            if ((allNum - nowNum) == 0 && i == 5) {
                                html += '<li class="on">' + (allNum - 5 + i) + '</li>';
                            } else if ((allNum - nowNum) == 1 && i == 4) {
                                html += '<li class="on">' + (allNum - 5 + i) + '</li>';
                            } else {
                                html += '<li data-page="' + (allNum - 5 + i) + '">' + (allNum - 5 + i) + '</li>';
                            }
                        } else {
                            if (i == 3) {
                                html += '<li class="on">' + (nowNum - 3 + i) + '</li>';
                            } else {
                                html += '<li data-page="' + (nowNum - 3 + i) + '">' + (nowNum - 3 + i) + '</li>';
                            }
                        }
                    }
                    if (allNum - nowNum >= 3) {
                        html += '<li class="more">...</li><li data-page="' + allNum + '">' + allNum + '</li>';
                    }
                }
                if (allNum - nowNum >= 1) {
                    html += '<li class="ed-page" data-page="' + (parseInt(nowNum) + 1) + '"><i class="icon icon-direction"></i></li>';
                }
                objs.html(html);
                if (allNum <= 5) {
                    if (!objs.find('li:last-child').hasClass('on')) {
                        objs.find('li:last-child').addClass('last');
                    }
                }
                objs.on('click', '>button', function (e) {
                    var _val = parseInt(objs.find('input').val());
                    if (_val) {
                        if (_val > opt.allNum) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                    obj.page({
                        _class: opt._class,
                        nowNum: _val,
                        allNum: opt.allNum,
                        callback: callback
                    });
                    callback(_val, allNum);
                });
                objs.on('click', '>li', function (e) {
                    if ($(this).hasClass('on')) {
                        return false;
                    }
                    var now = $(this).attr('data-page');
                    obj.page({
                        _class: opt._class,
                        nowNum: now,
                        allNum: opt.allNum,
                        callback: callback
                    });
                    callback(now, allNum);
                });
            },
            pageFn: function (sel, now, all, callback) {
                obj.page({
                    _class: sel || '.pagination-list',
                    nowNum: now,
                    allNum: all,
                    callback: callback
                });
            },
            // 密码等级验证
            pwdValidate: function (val) {
                var lv = 1,
                    val = val.trim(),
                    count = 0,
                    $li = $('.box-warn>ul>li'),
                    reg_char = /[a-zA-Z]+/gi,
                    reg_num = /[0-9]+/g,
                    reg_spchar = /[^0-9a-zA-Z]+/gi;

                if (val.length >= 8 && val.length <= 20) {
                    if (reg_char.test(val)) {
                        count++;
                    }
                    if (reg_num.test(val)) {
                        count++;
                    }
                    if (reg_spchar.test(val)) {
                        count++;
                    }
                    if (2 === count) {
                        lv = 3;
                    } else if (3 === count) {
                        lv = 4;
                    }
                }
                $li.removeClass('active');

                return lv;
            },
            // 展开模态框
            modShow: function (selector) {
                var _top = $(window).scrollTop(),
                    wH = $(window).height() / 3;
                $('#mask').addClass('show').height($(document).height());
                $(selector).addClass('show');
                $(selector).find('.txt-tip.error').remove();
                $(selector).css('margin-top', wH - $(selector).height() / 3 + ($(window).scrollTop()));
            },
            // 关闭模态框
            modHide: function (selector) {
                var $box = $(selector).closest('.mod-box'),
                    $form = $box.find('.mod-form');
                $('#mask').removeClass('show');
                $(selector).removeClass('show');
                if (0 < $form.length) {
                    $form[0].reset();
                }
                if (0 < $form.find('.send-code>button').length) {
                    obj.clearCountDown($form.find('.send-code>button'));
                }
            },
            // 获取用户绑定认证类型
            getAuthType: function (opts) {
                var callback = opts.callback || new Function(),
                    errorCallback = opts.errorCallback || new Function();
                obj.ajaxFn('/user/GetAuthType', {
                    callback: callback,
                    errorCallback: errorCallback
                });
            },
            // 发送手机/邮箱验证码
            sendPhoneCaptcha: function (that, flag, msgFn) {
                var url = '/user/SendPhoneCaptcha',
                    type = that.attr('data-sign'),
                    data = {};
                msgFn = msgFn || new Function();
                if (flag) {
                    url = '/user/SendEmailCaptcha';
                }
                if ('addr-voice' == type) {
                    data = {
                        isVoice: true
                    };
                }
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = '',
                            s = 59,
                            type = false;
                        if (res.IsSuccess) {
                            if (flag) {
                                s = 59;
                            }
                            obj.countDown(that, s);
                            msg = '';
                        } else {
                            if (203 == res.Code) {
                                msg = $.t('once_minute');
                                if (flag) {
                                    msg = $.t('email_minute');
                                }
                            } else if (402 == res.Code) {
                                msg = $.t('phone_html');
                                if (flag) {
                                    msg = $.t('email_html');
                                }
                                obj.modHide('#mod-gug');
                            }
                            type = true;
                        }
                        msgFn({
                            msg: msg,
                            type: type
                        });
                    }
                });
            },
            getCaptcha: function (data, that, flag, msgFn) {
                var url = '/Common/SendCaptchaBySms';
                msgFn = msgFn || new Function();
                if (flag) {
                    url = '/Common/SendCaptchaByEmail';
                }
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = '',
                            s = 59,
                            type = false;
                        if (res.IsSuccess) {
                            if (flag) {
                                s = 59;
                            }
                            obj.countDown(that, s);
                        } else {
                            if (203 == res.Code) {
                                msg = $.t('once_minute');
                                if (flag) {
                                    msg = $.t('email_minute');
                                }
                            } else if (402 == res.Code) {
                                msg = $.t('phone_html');
                                if (flag) {
                                    msg = $.t('email_html');
                                }
                                obj.modHide('#mod-gug');
                            } else if (-3 == res.Code) {
                                msg = $.t('verify_error1');
                            } else if (-1 == res.Code) {
                                msg = $.t('once_minute');
                                if (flag) {
                                    msg = $.t('email_minute');
                                }
                            }
                            type = true;
                        }
                        msgFn({
                            msg: msg,
                            type: type,
                            code: res.Code
                        });
                    }
                });
            },
            // 倒计时手机验证码有效期
            countDown: function (that, s, str) {
                s = s || 0;
                if (that) {
                    that.attr('disabled', true);
                }
                obj.codeTimer = setInterval(function () {
                    s--;
                    if (-1 == s) {
                        clearInterval(obj.codeTimer);
                        that.text(str || $.t('send_verify'));
                        that.attr('disabled', false);
                        return false;
                    }
                    var txt = s + $.t('seconds');
                    that.text(txt);
                }, 1000);
            },
            // 强制关闭倒计时
            clearCountDown: function (that) {
                if (that) {
                    that.text($.t('send_verify'));
                    that.attr('disabled', false);
                    clearInterval(obj.codeTimer);
                }
            },
            // 滑动按钮
            btnFn: function (callback) {
                callback = callback || new Function();
                //$('.slide-box').on('click','>label>.slide-btn',function(){
                $('.slide-box').on('click', '>label>span', function () {
                    var $p = $(this).closest('.slide-box');
                    if ($p.hasClass('off')) {
                        $p.removeClass('off');
                    } else {
                        $p.addClass('off');
                    }
                    callback($p);
                });
            },
            // 错误提示
            formValidate: function (selector, txt, flag) {
                var that = $(selector).parent().children('.box-tips'),
                    flag = flag || false;
                if (txt && 0 != txt.length) {
                    that.children('span').text(txt);
                }
                if (flag) {
                    that.removeClass('show');
                } else {
                    that.addClass('show');
                }
            },
            // 错误提示
            getTips: function (selector, msg, label) {
                var sel = selector || $(window),
                    $group = sel.parent(),
                    label = label || 'p',
                    $warn = $group.find('.error'),
                    flag = true;
                if (!!msg && flag) {
                    if (0 != sel.next('.error').length) {
                        sel.next('.error').remove();
                    }
                    sel.after('<' + label + ' class="txt-tip error">' + msg + '</' + label + '>');
                    //$warn.removeClass('hide').html(msg);
                } else {
                    $warn.addClass('hide').html(msg);
                }
            },
            getTips2: function (selector, msg, label) {
                var sel = selector || $(window),
                    $group = sel.parent(),
                    label = label || 'p',
                    $warn = $group.find('.box-tips'),
                    flag = true,
                    html = '';
                if (!!msg && flag) {
                    if (0 != $warn.length) {
                        $warn.remove();
                    }
                    html = '<div class="box-tips show"><i class="icon icon-triangle"></i><span>' + msg + '</span></div>';
                    sel.after(html);
                } else {
                    $warn.remove();
                }
            },
            // 资产统计
            myAvailabelAsset: function () {
                obj.ajaxFn('/MyAccount/MyAvailableAsset', {
                    // data:{"currencys":["cny","btc","eth"]},
                    data: {
                        "currencys": ["mbtc", "eth", "bitcny", "usdt"]
                    },
                    callback: function (res) {
                        var html = '',
                            list = [];
                        if (res.IsSuccess) {
                            list = res.Data;
                            for (var i = 0; i < list.length; i++) {
                                //<td><img src="./imgs/c-'+list[i].CurrencyId+'.png" alt="币种" /><span>'+list[i].CurrencyId+'</span></td>\
                                //<td><i class="icon2 icon-'+list[i].CurrencyId+'"></i><span>'+list[i].CurrencyId+'</span></td>\
                                html += '<tr>\
                                 <td><i class="icon2 icon-' + list[i].CurrencyId + '"></i><span>' + list[i].CurrencyId.toUpperCase() + '</span></td>\
                                 <td>' + obj.getFloatValue(list[i].Balance, 2) + '</td>\
                                 <td>' + obj.getFloatValue(list[i].LockedAmount, 2) + '</td>\
                              </tr>';
                            }
                        } else {
                            html = '';
                        }
                        $('#asset-table>tbody').html(html);
                    }
                });
            },
            // 资产折合统计
            myTotalAsset: function () {
                obj.ajaxFn('/MyAccount/MyTotalAsset', {
                    data: {
                        "currencys": ["mbtc", "eth", "bitcny", "usdt"]
                    },
                    callback: function (res) {
                        var data = res.Data,
                            a, status = '';
                        if (res.IsSuccess) {
                            if (data && data.Result) {
                                data = data.Result;
                                a = data.UserAccount;
                                a = a.substr(0, 3) + '***' + a.substr(a.indexOf('@'));
                                $('#user-account').text(a);
                                $('#user-id').text(data.UserName || $.t('not_realname'));

                                if (data.UserName) {
                                    $('.certification').addClass("hide");
                                } else {
                                    $('.certification').removeClass("hide");
                                }
                                $('.asset').text('￥' + obj.getFloatValue(data.AssetList[0].Amount, 2));
                                //登录tab栏切换
                                $('#asset-list span').on('click', function (e) {
                                    var lists = $('#asset-list span');
                                    for (var i = 0; i < lists.length; i++) {
                                        $(lists[i]).removeClass();
                                    }
                                    $(this).addClass('hight');
                                    var _id = this.getAttribute('id');
                                    if (_id == 'CnyAmount') {
                                        $('.asset').text('￥' + obj.getFloatValue(data.AssetList[0].Amount, 2));
                                    } else if (_id == 'BtcAmount') {
                                        $('.asset').text(obj.getFloatValue(data.AssetList[1].Amount, 4));
                                    } else if (_id == 'EthAmount') {
                                        $('.asset').text(obj.getFloatValue(data.AssetList[2].Amount, 4));
                                    }
                                });
                                status = data.Status;
                                if (status) {
                                    if (1 == status) {
                                        $('.certification').removeClass('hide').html('待审核');
                                    } else if (2 == status) {
                                        $('.certification').addClass('hide');
                                    } else if (3 == status) {
                                        $('.certification').removeClass('hide').html('审核失败');
                                    }
                                }
                            }
                            // $('.asset-btc').text(obj.getSubVal(data.BtcAmount,10));
                        }
                    },
                    errorCallback: function (res) {
                        $('.asset').html('--');
                    }
                });
            },
            // 菜单显示
            showMenu: function () {
                var pic = $('.list-lang>li[data-lang="' + obj.lang + '"]').html();
                $('.show-txt').html(pic);
                // $('.list-lang>li[data-lang="' + obj.lang + '"]').html(pic);
                if (obj.sign) {
                    $('.set-2').addClass('hide');
                    $('.set-1').removeClass('hide');
                } else {
                    $('.set-1').addClass('hide');
                    $('.set-2').removeClass('hide');
                }
                if (location.pathname.toLowerCase() == '/login.html') {
                    $('.set-2>li').eq(0).find('a').attr('href', './login.html');
                    $('.set-2>li').eq(1).find('a').attr('href', 'r.html');
                    $('.set-2>li').eq(0).addClass('active').siblings().removeClass('active');
                } else if (location.pathname.toLowerCase() == '/r.html') {
                    $('.set-2>li').eq(0).find('a').attr('href', './login.html');
                    $('.set-2>li').eq(1).find('a').attr('href', './r.html');
                    $('.set-2>li').eq(1).addClass('active').siblings().removeClass('active');
                } else {
                    $('.w-menu>li').each(function () {
                        if (location.pathname.toLowerCase() == '/') {
                            $('.w-menu>li').eq(0).addClass('on').siblings().removeClass('on');
                            return false;
                        } else if (location.pathname.toLowerCase() == '/market.html' || location.pathname.toLowerCase() == '/trade.html') {
                            $('.w-menu>li').eq(1).addClass('on').siblings().removeClass('on');
                            return false;
                        }
                    });
                }
            },
            // 获取交易统计
            getTradeStatistics: function () {
                obj.ajaxFn('/market/Statistics', {
                    data: {
                        "currencys": ["cny", "mbtc", "eth", "ans"]
                    },
                    callback: function (res) {
                        var list = [],
                            i = 0,
                            h = '',
                            rst = '';
                        if (res.IsSuccess) {
                            list = res.Data;
                            for (i; i < list.length; i++) {
                                h = '.h-' + list[i].Currency;
                                if ('cny' === list[i].Currency) {
                                    rst = '￥' + obj.getFloatValue(list[i].Result, 2);
                                } else {
                                    rst = obj.getFloatValue(list[i].Result, 2);
                                }
                                $(h).html(rst);
                            }
                        }
                    },
                    errorCallback: function (res) {
                        $('.h-cny').html('--');
                        $('.h-mbtc').html('--');
                        $('.h-eth').html('--');
                        $('.h-ans').html('--');
                    }
                });
            },
            // ToFixed: function(d, s) {

            // },
            // 取小数点位数
            getFloatValue: function (d, s) {
                var digitsLength = 0;
                var digitArray = d.toString().split(".");
                if (digitArray.length > 1) {
                    digitsLength = digitArray[1].length;
                }
                var sp = Math.pow(10, s);
                var truncate = Math.round(d);
                if (truncate > d) {
                    truncate -= 1;
                }
                var intPow = Math.pow(10, digitsLength);
                if (d < 0) {
                    var num = (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                } else {
                    var num = (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                }
                //千位符
                var source = num.toString().split('.');
                source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
                return source.join(".");
            },
            getFloatValue1: function (d, s) {
                var digitsLength = 0;
                var digitArray = d.toString().split(".");
                if (digitArray.length > 1) {
                    digitsLength = digitArray[1].length;
                }
                var sp = Math.pow(10, s);
                var truncate = Math.round(d);
                if (truncate > d) {
                    truncate -= 1;
                }
                var intPow = Math.pow(10, digitsLength);
                if (d < 0) {
                    var num = (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                } else {
                    var num = (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                }
                //千位符
                var source = num.toFixed(s).split('.');
                source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
                return source.join(".");
            },
            getFloatValue2: function (d, s) {
                var digitsLength = 0;
                var digitArray = d.toString().split(".");
                if (digitArray.length > 1) {
                    digitsLength = digitArray[1].length;
                }
                var sp = Math.pow(10, s);
                var truncate = Math.round(d);
                if (truncate > d) {
                    truncate -= 1;
                }
                var intPow = Math.pow(10, digitsLength);
                if (d < 0) {
                    return (truncate * sp + Math.ceil((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                } else {
                    return (truncate * sp + Math.floor((d * intPow - truncate * intPow) / intPow * sp)) / sp;
                }
            },
            //浮点数加法运算
            getFloatAdd: function (arg1, arg2) {
                var r1, r2, m;
                try {
                    r1 = arg1.toString().split(".")[1].length
                } catch (e) {
                    r1 = 0
                }
                try {
                    r2 = arg2.toString().split(".")[1].length
                } catch (e) {
                    r2 = 0
                }
                m = Math.pow(10, Math.max(r1, r2));
                return (arg1 * m + arg2 * m) / m;
            },
            //浮点数减法运算
            getFloatSub: function (arg1, arg2) {
                var r1, r2, m, n;
                try {
                    r1 = arg1.toString().split(".")[1].length
                } catch (e) {
                    r1 = 0
                }
                try {
                    r2 = arg2.toString().split(".")[1].length
                } catch (e) {
                    r2 = 0
                }
                m = Math.pow(10, Math.max(r1, r2));
                //动态控制精度长度
                n = (r1 = r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            },
            // 科学计数法转10进制数
            scienceToNum: function (num, count) {
                var str = new String(num);
                var e_pos = str.indexOf('e+');
                var p_pos = str.indexOf('.');
                // For Firefox 科学计数法
                if (e_pos > 0) {
                    bit = e_pos - p_pos - 1;
                    tim = str.substr(e_pos + 2);
                    str = str.substr(0, e_pos).replace('.', '');
                    var mov = tim - bit;
                    while (mov > 0) {
                        str += '0';
                        mov--;
                    }
                    str += '.';
                    while (count > 0) {
                        str += '0';
                        count--;
                    }
                    return str;
                } else {
                    e_pos = str.indexOf('e-');
                    if (e_pos > 0) {
                        tim = str.substr(0, e_pos);
                        mov = parseInt(str.substr(e_pos + 2)) - 1;
                        var zeros = '0.';
                        while (mov > 0) {
                            if (count === mov) {
                                break;
                            }
                            zeros += '0';
                            mov--;
                        }
                        str = zeros + tim;
                        return str;
                    }
                }
                return num;
            },
            // 交易提示
            hideTips: function (msg, sel) {
                sel = sel || '';
                var _top = $(document).scrollTop(),
                    hH = $('#header').height();
                if (0 <= _top && hH >= _top) {
                    _top = hH;
                } else {
                    _top = 0;
                }
                var that = null,
                    html = '<div class="msg-tips ' + sel + '" style="top: ' + _top + 'px;"><span>' + msg + '</span></div>';
                if (0 != $('.msg-tips').length) {
                    $('.msg-tips').remove();
                }
                if (msg) {
                    $(document.body).append(html);
                    that = $('.msg-tips');
                    //that.css('')
                    setTimeout(function () {
                        if (sel) {
                            that.css({
                                'background-color': 'rgba(229,46,33,.8)',
                                'opacity': 1
                            });
                        } else {
                            that.css({
                                'background-color': 'rgba(48,192,123,.8)',
                                'opacity': 1
                            });
                        }
                    }, 300);

                    setTimeout(function () {
                        if (sel) {
                            that.css({
                                'background-color': 'rgba(229,46,33,.8)',
                                'opacity': 0
                            });
                        } else {
                            that.css({
                                'background-color': 'rgba(48,192,123,.8)',
                                'opacity': 0
                            });
                        }
                        setTimeout(function () {
                            that.remove();
                        }, 300);
                    }, 3000);
                }
                $('.msg-tips').on('click', function () {
                    $('.msg-tips').remove();
                });
            },
            // 国际化
            getInternation: function (lang) {
                if (lang) {
                    $.i18n.init({
                        fallbackLng: lang,
                        fallbackOnEmpty: true,
                        lowerCaseLng: true,
                        detectLngFromLocalStorage: true,
                        resGetPath: "locales/__lng__/translation.json",
                        debug: true
                    }, function () {
                        $("[data-i18n]").i18n();
                    });

                    // window.KF5SupportBoxAPI.useLang(lang);
                }
                //obj.setCookie("i18next",lang);
                /*obj.ajaxFn('/common/LangPackage',{
                   data: {page: 1,pageSize: 100},
                   callback: function(res){
                      if(res.IsSuccess){

                      }
                   }
                });*/
            },
            //获取语言类型
            getLanguageType: function () {
                obj.ajaxFn('/common/GetLangType', {
                    async: false,
                    callback: function (res) {
                        if (res.IsSuccess) {
                            var lang = res.Data;
                            if (lang == 'EN') {
                                lang = 'en';
                            } else if (lang == 'ZH') {
                                lang = 'zh-cn';
                            } else {
                                lang = 'en';
                            }
                            // else if (lang == 'ES'){
                            //     lang = 'es';
                            // }
                            obj.setCookie("i18next", lang);
                            localStorage.setItem('i18next_lng', lang);
                            obj.getInternation(lang);
                        }
                    }
                });
            },
            setCookie: function (c_name, value, expiredays) {
                var exdate = new Date();
                exdate.setHours(exdate.getHours() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            delCookie: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = obj.getCookie(name);
                if (cval != null) {
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                }
            },
            getCookie: function (name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                    return unescape(arr[2]);
                } else {
                    return null;
                }
            },
            // 首页上浮
            // animate:function(){
            //    var sections = $('.section'),
            //    section_one=$('.section-first'),
            //    section_two=$('.section-second'),
            //    section_three=$('.section-third'),
            //    section_four=$('.section-four'),
            //    section_five=$('.section-fifth');
            //    prev =section_one.prev();
            //    section_one.find('p').addClass('show animated fadeInUp');
            //    section_one.find('span').addClass('show animated fadeInUp');
            //    section_one.find('li').css('display','inline-block');
            //    section_one.find('li').addClass('animated fadeInUp');
            //    $(window).scroll(function(){
            //       var sTop = $(this).scrollTop()+prev.height();
            //       if(sTop>=section_one.offset().top+600){
            //          // section_two.find('p').addClass('show animated fadeInUp');
            //          section_two.find('span').addClass('show animated fadeInUp');
            //          section_two.find('li').addClass('show animated fadeInUp');
            //       }
            //       if(sTop>=section_two.offset().top+600){
            //          section_three.find('p').addClass('show animated fadeInUp');
            //          section_three.find('span').addClass('show animated fadeInUp');
            //          section_three.find('.pic').css('display','inline-block');
            //          section_three.find('.pic').addClass('animated fadeInUp');
            //          section_three.find('ul').css('display','inline-block');
            //          section_three.find('ul').addClass('show animated fadeInUp');
            //       }
            //       if(sTop>=section_three.offset().top+600){
            //          section_four.find('p').addClass('show animated fadeInUp');
            //          section_four.find('span').addClass('show animated fadeInUp');
            //          section_four.find('li').css('display',"inline-block");
            //          section_four.find('li').addClass('animated fadeInUp');
            //       }
            //       if(sTop>=section_four.offset().top+500){
            //          section_five.find("p").addClass('show animated fadeInUp');
            //          section_five.find("span").addClass('show animated fadeInUp');
            //          section_five.find("li").addClass('show animated fadeInUp');
            //       }
            //    });
            // },
            //vip等级
            getVipgrade: function () {
                obj.ajaxFn('/user/GetLoginInfo', {
                    callback: function (res) {
                        if (res.IsSuccess) {
                            var grade = res.Data.VipLevel;
                            var userId = res.Data.UserId;
                            localStorage.setItem('userId', userId);
                            $('.show-vip').text('VIP' + grade);
                        }
                    }
                });
            },
            // 获取已收藏的市场列表
            getMarketCollect: function (callback) {
                obj.ajaxFn('/UserCollect/GetFullMarketCollect', {
                    async: false,
                    callback: function (res) {
                        if (res.IsSuccess) {
                            var list = res.Data;
                            var html1 = '',
                                html2 = '',
                                html3 = '',
                                html4 = '',
                                times = 4,
                                _width = 420;
                            for (var i = 0; i < list.length; i++) {
                                var flag = list[i].MarketId.split('_')[0];
                                var icon = list[i].MarketId.split('_')[1];
                                var _name = list[i].TargetCurrencyName;
                                if ('mbtc' == flag) {
                                    html1 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
                                } else if ('eth' == flag) {
                                    html2 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
                                } else if ('bitcny' == flag) {
                                    html3 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
                                } else if ('usdt' == flag) {
                                    html4 += '<li class="' + list[i].MarketId + '"><i class="icon2 icon-' + icon + '"></i><a href="./trade.html?marketid=' + list[i].MarketId + '">' + icon + '</a><img class="del-collect" src="./imgs/del1.png" alt=""></li>';
                                }

                                // $('.cny-collect>ul').html(html);
                                $('.mbtc-collect>ul').html(html1);
                                $('.eth-collect>ul').html(html2);
                                $('.bitcny-collect>ul').html(html3);
                                $('.usdt-collect>ul').html(html4);
                            }
                            // if(!html){
                            //    $('.list-collect>li').eq(0).addClass('hide');
                            //    times -= 1;
                            // }else{
                            //     $('.list-collect>li').eq(0).removeClass('hide');
                            // }  
                            if (!html1) {
                                $('.list-collect>li').eq(0).addClass('hide');
                                times -= 1;
                            } else {
                                $('.list-collect>li').eq(0).removeClass('hide');
                            }
                            if (!html2) {
                                $('.list-collect>li').eq(1).addClass('hide');
                                times -= 1;
                            } else {
                                $('.list-collect>li').eq(1).removeClass('hide');
                            }
                            if (!html3) {
                                $('.list-collect>li').eq(2).addClass('hide');
                                times -= 1;
                            } else {
                                $('.list-collect>li').eq(2).removeClass('hide');
                            }
                            if (!html4) {
                                $('.list-collect>li').eq(3).addClass('hide');
                                times -= 1;
                            } else {
                                $('.list-collect>li').eq(3).removeClass('hide');
                            }
                            _width = 190 * times;
                            $('.list-collect').css('width', _width + 'px');
                            //收藏列表的高度
                            var arr = [$('.mbtc-collect>ul>li').length, $('.eth-collect>ul>li').length, $('.usdt-collect>ul>li').length, $('.bitcny-collect>ul>li').length];

                            var _height = Math.max.apply(null, arr) * 42 + 66;
                            $('.list-collect').css('height', _height + 'px');
                            if (0 == times) {
                                $('.list-collect').html('<li><p>' + $.t("collection") + '</p></li>');
                                $('.list-collect').css('left', '-60px');
                                $('.list-collect').css('width', '190px');
                                $('.list-collect').css('height', '110px');
                                $('.list-collect>li').css('border-bottom', 'none');
                            } else if (1 == times) {
                                $('.list-collect').css('left', '-60px');
                            } else if (2 == times) {
                                $('.list-collect').css('left', '-125px');
                            }
                            //收藏删除
                            $('.del-collect').on('mouseover', function () {
                                $(this).prop('src', './imgs/del2.png');
                            });
                            $('.del-collect').on('mouseout', function () {
                                $(this).prop('src', './imgs/del1.png');
                            });
                            $('.del-collect').on('click', function () {
                                var _id = $(this).parent('li').prop('class');
                                obj.cancelMarketCollect(_id);
                                obj.getMarketCollect();
                            });
                        }
                    }
                });
            },
            //取消收藏
            cancelMarketCollect: function (marketId) {
                obj.ajaxFn('/UserCollect/CancelMarketCollect', {
                    data: {
                        marketId: marketId
                    },
                    callback: function (res) {}
                })
            },
            // 获取中英文字符长度
            getLen: function (str) {
                var len = 0;
                for (var i = 0; i < str.length; i++) {
                    var c = str.charCodeAt(i);
                    //单字节加1
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                        len++;
                    } else {
                        len += 2;
                    }
                }
                return len;
            },
            // 转换时间
            dateFormate: function (str, flag) {
                // var arr = str.split('T'),
                // a2=arr[1].substr(0,arr[1].indexOf('.'));

                // if(flag){
                //    return arr[0];
                // }else{
                //    return arr[0]+' '+a2;
                // }
                return str;
            },
            // 除法
            toDiv: function (arg1, arg2) {
                var t1 = 0,
                    t2 = 0,
                    r1, r2;
                try {
                    t1 = arg1.toString().split(".")[1].length
                } catch (e) {}
                try {
                    t2 = arg2.toString().split(".")[1].length
                } catch (e) {}
                with(Math) {
                    r1 = Number(arg1.toString().replace(".", ""));
                    r2 = Number(arg2.toString().replace(".", ""));
                    return (r1 / r2) * pow(10, t2 - t1);
                }
            },
            // 乘法
            toMul: function (arg1, arg2) {
                var m = 0,
                    s1 = arg1.toString(),
                    s2 = arg2.toString();
                try {
                    m += s1.split(".")[1].length
                } catch (e) {}
                try {
                    m += s2.split(".")[1].length
                } catch (e) {}
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
            },
            // 加法
            toAdd: function (arg1, arg2) {
                var r1, r2, m;
                try {
                    r1 = arg1.toString().split(".")[1].length
                } catch (e) {
                    r1 = 0
                }
                try {
                    r2 = arg2.toString().split(".")[1].length
                } catch (e) {
                    r2 = 0
                }
                m = Math.pow(10, Math.max(r1, r2));
                return (parseInt(arg1 * m) + parseInt(arg2 * m)) / m;
            },
            // 减法
            toSub: function (arg1, arg2) {
                var r1, r2, m, n;
                try {
                    r1 = arg1.toString().split(".")[1].length
                } catch (e) {
                    r1 = 0
                }
                try {
                    r2 = arg2.toString().split(".")[1].length
                } catch (e) {
                    r2 = 0
                }
                m = Math.pow(10, Math.max(r1, r2));
                //last modify by deeka
                //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            },
            resizeHeight: function (sel) {
                sel = sel || '.other-body';
                $(sel).removeAttr('style');
                if ($('#content').height() < $(window).height() - ($('#header').height() + $('#footer').height())) {
                    $(sel).height($(window).height() - ($('#header').height() + $('#footer').height()));
                }
            },
            //首页弹出层
            getNotice: function () {
                if (!obj._notice) {
                    obj.modShow('#mod-notice');
                    sessionStorage.setItem("_notice", true);
                }
            },
            // 触发ws
            initWS: function () {
                protobuf.load("../js/proto_market.json", function (err, root) {
                    obj.StartWS(root);
                });
            },
            flag: true
        };

        if (0 == $('.login-box').length) {
            if (obj.sign) {
                obj.myAvailabelAsset();
                $('#login>ul').eq(0).removeClass('show').siblings().addClass('show');
            } else {
                $('#login>ul').eq(1).removeClass('show').siblings().addClass('show');
            }
        }
        if (0 != $('.echarts').length) {
            obj.initWS();
            //初始化图表
            // obj.chartLine();
            //登陆框
            var _width = $('.w-menu').offset().left - 106;
            $('#login').css('right', _width + 'px');
            //点击进入不同市场
            $('.section-first').on('click', 'ul>li', function () {
                var that = $(this),
                    marketId = that.prop('id');
                $('.section-first').append('<a href="./trade.html?marketid=' + marketId + '" id="link-attr"></a>');
                $('#link-attr')[0].click();
                $('#link-attr').remove();
            });
        }
        /*$('.w-menu').on('click','>li',function(){
           var that = $(this),
              index = that.index(),
              url = './market.html';

           if(2==index||3==index){
              if(!obj.sign){
                 obj.hideTips('请先登录！');
              }
           }
        });*/
        // obj.getLanguageType();
        obj.showMenu();
        // obj.getNotice();
        // obj.notice();
        if (obj.sign && (0 == $('.validate-box').length) && (0 == $('.choose-validate').length) && (0 == $('.bind-phone').length) && (0 == $('.my-gugValidate').length)) {
            obj.getVipgrade();
            obj.getMarketCollect();
            $('.show-vip').removeClass('hide');
        } else {
            $('.list-collect.clearfix').html('<p data-i18n="collection"></p>');
        }
        // if(0!=$('#banner').length){
        //    obj.animate();
        // }
        if ('/' == location.pathname.toLowerCase()) {
            if (obj.sign) {
                obj.myTotalAsset();
                // window.KF5SupportBoxAPI.ready(function(){
                //    // 传递用户信息给组件使用
                //    var data = {name: ''};
                //    var user = obj.account;
                //    if(obj.validate(obj.reg_email,user)){
                //       data.email=user;
                //    }else{
                //       data.phone=user;
                //    }
                //    window.KF5SupportBoxAPI.identify(data);
                // });
            }
            obj.getTradeStatistics();
        }
        if (!obj.sign) {
            var notAllow = ['modify-', 'set-', 'bind-', 'api-', 'buzpwd', 'transaction'];
            for (var i = 0; i < notAllow.length; i++) {
                if (-1 !== location.pathname.toLowerCase().indexOf(notAllow[i])) {
                    location.href = '/login.html';
                }
            }
        }
        if (obj.sign) {
            $('.section.section-second').addClass('hide');
        } else {
            $('.section.section-second').removeClass('hide');
        }
        // 语言切换
        $('.lang-box').on('click', function () {
            $('.lang-box>.list-lang').css('display', 'block');
        });
        $('.lang-box').on('click', '.list-lang>li', function () {
            var that = $(this),
                lang = 'en',
                type = 'ZH',
                index = that.index(),
                url = '';
            if (1 != index) {
                type = 'EN';
                lang = 'zh-cn';
                $('#support>a').prop('href', '//XBrick.kf5.com/hc/?lang=zh_cn');
            }
            // else if(2 == index){
            //     type = 'ES';
            //     lang = 'es';
            // }
            obj.ajaxFn('/common/SetLangType', {
                data: {
                    type: type
                },
                callback: function (res) {
                    if (res.IsSuccess) {}
                }
            });
            url = window.location.pathname + window.location.search; //+'?lang='+lang

            obj.setCookie("i18next", lang);
            localStorage.setItem('i18next_lng', lang);
            $('.w-set').append('<a href="' + url + '" id="link-attr"></a>');
            $('#link-attr')[0].click();
            $('#link-attr').remove();
        });
        obj.getInternation(obj.lang);
        //obj.myAvailabelAsset();
        // 关闭模态框
        $('.mod-box').on('click', '[data-action]', function (e) {
            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();

            var action = $(this).attr('data-action'),
                $box = $(this).closest('.mod-box'),
                _id = $box.prop('id'),
                $form = $box.find('.mod-form');
            if ('close' == action) {
                obj.modHide('#' + _id);
            }
            $form.find('.error').addClass('hide');
        });

        // 点击回车登陆
        $('#login').on('keypress', function (e) {
            e = e || window.event;
            if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
                $('.login-btn').trigger('click');
            }
        });

        // 登录
        $('.login-btn').on('click', function () {
            //obj.getLanguageType();
            var user = $('#input-user').val(),
                pwd = $('#input-pwd').val(),
                that = $(this),
                sign = false,
                checked = $('#remember').prop('checked');

            if (user && '' != user) {
                user = user.trim();
            }
            if (pwd && '' != pwd) {
                pwd = pwd.trim();
            }
            if (checked) {
                var data = {
                    account: user,
                    password: pwd,
                    Name: 'bindIp'
                };
            } else {
                data = {
                    account: user,
                    password: pwd
                };
            }
            $('#input-user').trigger('blur');
            $('#input-pwd').trigger('blur');
            if (obj.flag) {
                that.prop('disabled', true).text($.t('Log_in'));
                obj.ajaxFn('/account/Login', {
                    data: data,
                    callback: function (res) {
                        if (res.IsSuccess) {
                            obj.sign = true;
                            localStorage.setItem('account', user);
                            $('#support>a').prop('href', 'http://v2web.XBrick.com/KF5/KF5Login?lang=zh_cn');
                            // obj.ajaxFn('/KF5/KF5LoginSSO',{
                            //    _method: 'GET',
                            //    callback: function(res){
                            //       console.log('一登录');
                            //    }
                            // });
                            // $('body').append('<a href="http://v2web.XBrick.com/KF5/KF5LoginSSO" id="link-attr"></a>');
                            // $('#link-attr')[0].click();
                            // $('#link-attr').remove();
                            localStorage.setItem('sign', 1);
                            obj.showMenu();
                            obj.myTotalAsset();
                            obj.myAvailabelAsset();
                            $('#login>ul').eq(0).removeClass('show').siblings().addClass('show');
                        } else {
                            if (2 == res.Code) {
                                msg = $.t('incorrect_pwd'); //+$.t('surplus')+(5-res.ErrorMsg)+$.t('chance')+'！'+$.t('more_wrong')+$.t('lock_minute');
                            } else if (8 == res.Code) {
                                msg = $.t('account_lock');
                            } else if (16 == res.Code) {
                                msg = $.t('more_wrong') + $.t('lock_minute');
                            } else if (32 == res.Code) {
                                msg = $.t('account_exist');
                            }
                            if (-1 != [2, 8, 16].indexOf(res.Code)) {
                                obj.getTips($('#input-pwd'), msg);
                                //$('#input-pwd').next().removeClass('hide').html(msg);
                            } else {
                                obj.getTips($('#input-user'), msg);
                            }
                            localStorage.removeItem('sign');
                        }
                        that.prop('disabled', false).text($.t('login'));
                    },
                    errorCallback: function (res) {
                        localStorage.removeItem('sign');
                        that.prop('disabled', false).text($.t('login'));
                    }
                });
            }
        });
        $('#input-user').on('blur', function () {
            var user = $('#input-user').val(),
                that = $(this),
                flag = true;

            if (null != user && '' != user) {
                user = user.trim();
                that.next().addClass('hide');
            } else {
                flag = false;
                that.next().removeClass('hide').html($.t('account_empty'));
            }
            obj.flag = flag;
        });
        $('#input-pwd').on('blur', function () {
            var pwd = $('#input-pwd').val(),
                that = $(this),
                flag = true;
            if (null != pwd && '' != pwd) {
                pwd = pwd.trim();
                that.next().addClass('hide');
            } else {
                flag = false;
                that.next().removeClass('hide').html($.t('passd_empty'));
            }
            obj.flag = flag;
        });

        // 关闭交易密码/取消关闭交易密码操作
        $('.buz-tips').on('click', '[data-type]', function () {
            var that = $(this),
                type = that.attr('data-type'),
                $p = that.parent(),
                $form = that.closest('.mod-form');

            if (2 == type) {
                $p.addClass('hide');
                $p.prev().removeClass('hide');
                $('#to-modify').removeClass('hide');
                $('#to-addr').addClass('hide');
                $form.find('.close-buzPwd').removeClass('hide');
            } else {
                $p.addClass('hide');
                $p.next().removeClass('hide');
                $('#to-modify').addClass('hide');
                $('#to-addr').removeClass('hide');
                $form.find('.close-buzPwd').addClass('hide');
            }
        });

        // 退出登录
        $('.list-user').on('click', '>li', function () {
            var index = $(this).index();
            if (3 === index) {
                obj.ajaxFn('/account/LoginOut', {
                    callback: function (res) {
                        if (res.IsSuccess) {
                            localStorage.clear();
                            window.location.href = "./login.html";
                        }
                    }
                });
            }
        });
        if ('en' == obj.lang) {
            // $('.banner-three').css('background', 'url(../imgs/wid-en.jpg) center center no-repeat');
            $('.banner-one').css('background', 'url(../imgs/banner-en.jpg) center center no-repeat');
            $('.banner-one>a').prop('href', 'https://xbc.xbrick.io/index.html');
            $('.pst-img').prop('src', './imgs/pstup-en.png');
            $('.app-right>img').prop('src', './imgs/load-en.png');
        } else if ('zh-cn' == obj.lang) {
            // $('.banner-three').css('background', 'url(../imgs/wid-zh.jpg) center center no-repeat');
            $('.banner-one').css('background', 'url(../imgs/banner-zh.jpg) center center no-repeat');
            $('.banner-one>a').prop('href', 'https://xbc.xbrick.io/index-zh-CN.html');
            $('.pst-img').prop('src', './imgs/pstup-zh.png');
            $('.app-right>img').prop('src', './imgs/load-zh.png');
        }
        // 日期格式化 例如(new Date()).format('yyyy-MM-dd')
        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, //month 
                "d+": this.getDate(), //day 
                "h+": this.getHours(), //hour 
                "m+": this.getMinutes(), //minute 
                "s+": this.getSeconds(), //second 
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
                "S": this.getMilliseconds() //millisecond 
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };

        if (!Number.isNaN) {
            Number.isNaN = function (n) {
                return (typeof n === "number" && window.isNaN(n));
            };
        }

        // 返回顶部
        $('.goback').on('click', function () {
            $('body').animate({
                scrollTop: 0
            }, 400);
        });
        window.obj = obj;
    })();
});


var username = localStorage.getItem("account");
$(".accountName").text(username);   

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#accordion'), false);
});