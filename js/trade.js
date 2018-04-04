$(function () {
    // 滑动比例
    var Scroll = {
        flag: false,
        value: 0,
        maxVal: 100,
        x: 0,
        lightFn: function (that, cv) {
            var $prev = that.prev(),
                $next = that.next(),
                $list = that.closest('.scale-width').find('.scale-line>li'),
                count = 0,
                _val = Scroll.value,
                _tmp = obj.getFloatValue((12 / $('.scale-line').width()) * 100, 2);

            $prev.width((cv > 0 ? parseFloat((cv - _tmp > 0) ? (cv - _tmp) : 1) : 0) + '%');
            that.css({
                'left': (cv > 0 ? parseFloat((cv - _tmp > 0) ? (cv - _tmp) : 1) : 0) + '%'
            });
            $next.find('span').text(_val);
            if (0 < _val) {
                count = 1;
            }
            if (25 <= _val) {
                count = 2;
            }
            if (50 <= _val) {
                count = 3;
            }
            if (75 <= _val) {
                count = 4;
            }
            if (100 <= _val) {
                count = 5;
            }
            $list.each(function () {
                $(this).removeClass('active');
            });
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    $list.eq(i).addClass('active');
                }
            }
        }
    };

    var tobj = {
        basicId: (location.search.split('=')[1].split('_')[0] || 'eth').toLowerCase(),
        table: $('#limit-table'),
        currencylist: [], //测试数据变量（可删）
        nickname: '',
        status: 0,
        timer: null,
        serverTime: parseInt((new Date().valueOf()) / 1000),
        collect: [],
        mediums: {
            bCny: 0,
            bUsdt: 0,
            eCny: 0,
            eUsdt: 0
        },
        klineStore : new StoreHandler(),
        datafeed : {},
        HasStarted : false,
        kLineCache : {},
        
        // targetList: ['cny','btc','eth','ans'],
        targetList: ['eth', 'mbtc', 'bitcny', 'usdt'],
        wWidth: $(window).width(),
        orderData: {
            data: {},
            that: null
        },
        charObj: {
            klineChart: null,
            depthChart: null
        },
        marketId: 'mbtc_eth', //当前市场ID
        Controllers: {
            MarketController: 1 //市场控制器
        },
        ReceiveCommand: {
            Error: 0, //发生错误
            ChatContent: 1, //聊天内容
            SingleKLine: 1000, //单条K线数据
            BatchKLine: 1001, //批量K线数据
            BatchKLineSendComplate: 1002, //批量K线数据发送完成
            MarketDepth: 1003, //市场深度数据
            TradeSimpleDto: 1004, //单条交易记录
            TradeSimpleDtoList: 1005, //交易记录列表
            ScrollDayKLine: 1006, //滑动24H日线
            CreateOrder: 1008, //新增订单信息
            CreatePlanOrder: 1009, //新增计划订单信息
            UpdateOrder: 1010, //更新订单信息
            PlanOrderTrigger: 1011 //计划订单触发
        },
        SendCommand: {
            ClientUserChat: 1, //发送聊天内容
            ReceiveMarketChat: 3, //接受聊天内容
            SetKLineFequency: 900, //设置当前市场K线频度
            SetReceiveOtherMarketKLine: 902, //设置接收其它市场的K线数据
            // RepairKLine: 903, //修复K线数据
            SetMarketDepth: 906, //设置接收市场深度数据
            SetTradeOrder: 907, //设置接收交易订单数据
            BindMarket: 908, //绑定到指定市场
            Login: 1000 //登陆验证
        },
        //target_val:{ basePrice :0,targetBalance:0},
        getParam: obj.getParam(),
        otherMarkerIds: [], //["M_2", "M_3", "M_4", "M_5", "M_6", "M_7"], // 右侧币种列表
        otherMarkerIdsZH: [],
        dict: {},
        tradeObj: {
            BasicBalance: 0,
            TargetBalance: 0
        },
        cancelObj: {},
        cancelAllObj: {},
        signPrice: {
            buy: null,
            sale: null
        },
        sign: 'M15',
        currencyObj: {
            target: '',
            base: location.search.split('=')[1].split('_')[0] || ''
        },
        closePrice: 0,
        marketInfo: {
            pP: 8,
            vP: 8,
            dP: 8,
            bsP: 2,
            tsP: 4
        },
        loginCookie: {
            key: '',
            id: ''
        },
        detailObj: {
            price: 0,
            volume: 0,
            limit: null
        },
        timeObj: {
            st: 0,
            ed: 0,
            st1: 0,
            ed1: 0
        },
        marketObj: {
            precision: 8,
            limit: 5,
            list: [],
            clist: [],
            blist: [],
            elist: [],
            alist: [],
            collect: 0,
            count: 14
        },
        // 币种数据列表（可删）
        getCurrencyList: function () {
            var list = [],
                html = '';
            if (0 == this.currencylist.length) {
                /*obj.ajaxFn('',{
                   data: {},
                   callback: function(res){

                   }
                });*/
                list = [{
                        collect: false,
                        type: 'NBC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'KPC',
                        newprice: 0.1348,
                        h24: 22721778.11,
                        day: s6913
                    },
                    {
                        collect: false,
                        type: 'MBTC',
                        newprice: 6148.85,
                        h24: 395.49,
                        day: -4.8916
                    }, {
                        collect: true,
                        type: 'GSS',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 3.5316
                    },
                    {
                        collect: false,
                        type: 'ANS',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'MGC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 2.4
                    },
                    {
                        collect: false,
                        type: 'ETH',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'BKC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 2.4
                    },
                    {
                        collect: false,
                        type: 'CFC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'VTC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 2.4
                    },
                    {
                        collect: false,
                        type: 'ELC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'XYC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 2.4
                    },
                    {
                        collect: false,
                        type: 'ATC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }, {
                        collect: true,
                        type: 'FTC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: 2.4
                    },
                    {
                        collect: false,
                        type: 'GMC',
                        newprice: 1.811,
                        h24: 18.11,
                        day: -2.4
                    }
                ];
                for (var i = 0; i < list.length; i++) {
                    var _clz = 'class="red"',
                        _sign = '<i class="icon icon-unstar"></i>',
                        _day = '';
                    if (list[i].day > 0) {
                        _day = '+' + list[i].day;
                        _clz = 'class="green"';
                    } else {
                        _clz = 'class="red"';
                        _day = list[i].day;
                    }
                    if (list[i].collect) {
                        _sign = '<i class="icon icon-star"></i>';
                    } else {
                        _sign = '<i class="icon icon-unstar"></i>';
                    }

                    html += '<tr ' + _clz + '>\
                           <td>' + _sign + '</td>\
                           <td>' + list[i].type + '</td>\
                           <td>' + list[i].newprice + '</td>\
                           <td>' + list[i].h24 + '</td>\
                           <td>' + _day + '%</td>\
                        </tr>';
                }
                $('#cny-table>tbody').append(html);
            }
        },
        // 聊天数据列表（可删）
        getChatList: function (list) {
            var html = '';
            /*list = list || [{type: 1,name: 'user01',txt: '今天比特币又大涨'},
                  {type: 2,name: 'user02',txt: '是的，不知道明天怎么样？巴拉巴拉巴拉'},
                  {type: 2,name: 'user01',txt: '今天比特币又大涨'},
                  {type: 1,name: 'user02',txt: 'dddawerwerwe'}
            ]*/
            ;
            for (var i = 0; i < list.length; i++) {
                var sel = 'class="other"';
                if (1 == list[i].type) {
                    sel = 'class="other"';
                } else {
                    sel = 'class="me"';
                    //html += '<li '+sel+'><span>'+list[i].txt+'</span></li>';
                }
                html += '<li ' + sel + '><label>' + list[i].name + '</label><span>' + list[i].txt + '</span></li>';
            }
            $('.chat-list').append(html);
            /*if(list.length > 1){
               $('.chat-list>li').each(function(){
                  $(this).height($(this).find('span').innerHeight());
               });
            }else if(list.length == 1){
               var $li = $('.chat-list>li').eq($('.chat-list>li').length-1);
               $li.height($li.find('span').innerHeight());
            }*/
        },
        // 获取公告
        getMarketNotice: function () {
            obj.ajaxFn('/news/GetMarketNotice', {
                data: {
                    marketId: tobj.marketId,
                    page: 1,
                    pageSize: 10
                },
                callback: function (res) {
                    var list = [],
                        timer = null,
                        $notice = $('.notice-top');

                    function notice(list) {
                        var html = '';
                        if (list) {
                            for (var i = 0; i < list.length; i++) {
                                html += '<li><a href="./news-detail.html?id=' + list[i].Id + '" target="_blank">' + list[i].Title + '</a></li>';
                            }
                        }
                        $('.notice-list').html(html);
                        if (list) {
                            $notice.removeClass('hide');
                            for (var j = 0; j < list.length; j++) {
                                (function (index) {
                                    setTimeout(function () {
                                        $('.notice-list').css('transform', 'translateY(' + -(index * 25) + 'px)');
                                    }, 1000 * index);
                                    if (index == list.length - 1) {
                                        timerFn();
                                    } else if (index < list.length) {
                                        clearInterval(timer);
                                    }
                                })(j);
                            }
                        } else {
                            $notice.addClass('hide');
                        }
                    }

                    function timerFn() {
                        timer = setInterval(function () {
                            notice(list);
                        }, 1000 * 10);
                    }
                    if (res.IsSuccess) {
                        list = res.Data.Items;
                        /*list = [{Intro: '公告1'},{Intro: '公告2'},{Intro: '公告3'},{Intro: '公告4'},{Intro: '公告5'},
                        {Intro: '公告6'},{Intro: '公告7'},{Intro: '公告7'},{Intro: '公告8'},{Intro: '公告9'},{Intro: '公告10'},{Intro: '公告11'}];*/
                        if ((!list) || 0 == list.length) {
                            $('.icon-close2').parent().addClass('hide');
                        } else {
                            notice(list);
                        }
                    }
                }
            });
        },
        // 新闻列表
        getNewsList: function (list) {
            var html = '';
            /*list = list || [
               {pic: './imgs/user02.jpg',title: 'XBrick网“新年新惊喜”每日大转盘抽奖XBrick网“新年新惊喜”每日大转盘抽奖',content: '为答谢新老用户对我们的支持与厚爱，藉新春佳节来为答谢新老用户对我们的支持与厚爱，藉新春佳节来',date: '2017-01-10'},
               {pic: './imgs/user02.jpg',title: 'XBrick网“新年新惊喜”每',content: '为答谢新老用户对我们的支持与厚爱，藉新',date: '2017-01-10'}
            ];*/
            obj.ajaxFn('/news/GetMarketNews', {
                data: {
                    marketId: tobj.marketId,
                    page: 1,
                    pageSize: 10
                },
                callback: function (res) {
                    var msg = '',
                        list = [],
                        html = '';
                    if (res.IsSuccess) {
                        list = res.Data.Items;
                        for (var i = 0; i < list && list.length; i++) {
                            var _t1 = list[i].Title,
                                _t2 = '',
                                _c1 = list[i].Intro,
                                _c2 = '',
                                time = obj.dateFormate(list[i].PublishTime, true);
                            /*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
                            var date = new Date(time);*/
                            if (30 < tobj.getBLen(_t1)) {
                                _t2 = _t1.substr(0, 30 / 1.8) + '...';
                            } else {
                                _t2 = _t1;
                            }
                            if (40 < tobj.getBLen(_c1)) {
                                _c2 = _c1.substr(0, 40 / 1.8) + '...';
                            } else {
                                _c2 = _c1;
                            }
                            html += '<li>\
                        <img src="./imgs/user02.jpg" alt="pic" />\
                        <p>\
                           <span title="' + _t1 + '">' + _t2 + '</span>\
                           <a href="./news-detail.html?id=' + list[i].Id + '">' + _c2 + '</a>\
                           <label>' + time + '</label>\
                        </p>\
                     </li>';
                        }
                    } else {
                        msg = res.ErrorMsg + '，' + $.t("operate_fail");
                    }
                    $('.news-list').html(html);
                }
            });
        },
        // 获取等比宽
        getWidth: function (title) {
            sel = tobj.table;
            title = title || $('.order-title.on'),
                _oW = $('.order-tables').width(),
                _aw = 1200 < tobj.wWidth ? (tobj.wWidth < _oW ? tobj.wWidth : _oW) : tobj.wWidth;

            setTimeout(function () {
                $('.tables-box,.tables-box .jspContainer,.tables-box .jspPane').css('width', _aw);
                $('.jspContainer').css('overflow-y', 'auto');
                var $td = sel.find('tbody>tr').eq(0).find('td'),
                    $li = title.eq(0).find('li');

                for (var i = 0; i < $td.length; i++) {
                    ~(function (index) {
                        var _li = $li.eq(index),
                            _w = $td.eq(index).width();
                        _li.width(_w);
                    })(i);
                }
                $('.tables-box').jScrollPane({
                    stickToBottom: true,
                    mouseWheelSpeed: 50
                });
                //$('.tables-box').css('width',_aw);
            }, 350);
        },
        // 获取滚动条
        scrolls: function () {
            $('.table-box').jScrollPane({
                stickToBottom: true,
                mouseWheelSpeed: 50
            });

            $('.chat-body').jScrollPane({
                stickToBottom: true,
                mouseWheelSpeed: 50
            });
            if ($('.chat-list').innerHeight() >= $('.chat-body').innerHeight()) {
                $('.chat-body .jspPane').css('top', -($('.chat-list').innerHeight() - $('.chat-body').innerHeight()));
                $('.chat-body .jspDrag').css('top', $('.chat-body .jspTrack').innerHeight() - $('.chat-body .jspDrag').innerHeight());
            }

            //$('.tables-box').jScrollPane({stickToBottom: true,mouseWheelSpeed: 50});
        },
        // 获取混合字符串长度
        getBLen: function (str) {
            if (str == null) return 0;
            if (typeof str != "string") {
                str += "";
            }
            return str.replace(/[^\x00-\xff]/g, "01").length;
        },
        // 获取个人信息
        getUserInfo: function () {
            obj.ajaxFn('/user/GetLoginInfo', {
                callback: function (res) {
                    var data = res.Data;
                    tobj.nickname = (data && data.NickName) ? data.NickName : $.t('anonymity');
                },
                errorCallback: function (res) {
                    tobj.nickname = $.t('anonymity');
                }
            });
        },
        // 获取用户登陆密钥
        getLoginCookie: function () {
            obj.ajaxFn('/user/GetLoginCookie', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.loginCookie.id = res.Data.UserId;
                        tobj.loginCookie.key = res.Data.SecretKey;
                    }
                }
            });
        },
        // 图表2
        drawingAskBidChart: function (data) {
            var priceList = [];
            var bidCountList = [];
            var caculateBidCountList = [];
            var askCountList = [];
            var bidTotal = 0;
            var askTotal = 0;
            for (var i = data.BidList.length; i > 0; i--) {
                var depthData = data.BidList[i - 1];
                priceList.push(depthData.Price);
                bidTotal += depthData.Total;
                caculateBidCountList.push(obj.getFloatValue2(bidTotal, tobj.marketInfo.vP));
                askCountList.push(0);
            }
            for (var i = caculateBidCountList.length; i > 0; i--) {
                bidCountList.push(caculateBidCountList[i - 1]);
            }
            var middleBid = data.BidList[data.BidList.length - 1];
            var middleAsk = data.AskList[data.AskList.length - 1];
            var price = 0;
            if (middleBid && middleAsk)
                price = obj.getFloatValue2((middleBid.Price + middleAsk.Price) / 2);
            priceList.push(price);
            bidCountList.push(0);
            askCountList.push(0);
            for (var i = 0; i < data.AskList.length; i++) {
                var depthData = data.AskList[i];
                priceList.push(depthData.Price);
                askTotal += depthData.Total;
                askCountList.push(obj.getFloatValue2(askTotal, tobj.marketInfo.vP));
                bidCountList.push(0);
            }
            if (!tobj.charObj.depthChart)
                tobj.charObj.depthChart = echarts.init(document.getElementById('askbid'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    formatter: function (param) {
                        if (param[0].value != 0 || param[1].value != 0) {
                            var result = "Price:" + param[0].name;
                            if (param[0].value != 0) {
                                result += "</br>Cumulative Buy:" + param[0].value;
                                for (var i = 0; i < data.BidList.length; i++) {
                                    var depthData = data.BidList[i];
                                    if (depthData.Price == param[0].name) {
                                        result += "</br>Current Buy:" + depthData.Total;
                                        break;
                                    }
                                }

                            }
                            if (param[1].value != 0) {
                                result += "</br>Cumulative Sell:" + param[1].value;
                                for (var i = 0; i < data.AskList.length; i++) {
                                    var depthData = data.AskList[i];
                                    if (depthData.Price == param[0].name) {
                                        result += "</br>Current Sell:" + depthData.Total;
                                        break;
                                    }
                                }
                            }
                            return result;
                        }
                    }
                },
                calculable: true,
                animation: false,
                grid: [{
                    left: '7%',
                    right: '7%',
                    top: '10%',
                    height: '100%'
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: priceList
                }],
                yAxis: [{
                    type: 'value',
                    // name: '市场深度图',
                    nameLocation: 'middle',
                    nameGap: '50',
                    show: false
                }],
                series: [{
                        name: '买单',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#28B262',
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: bidCountList
                    },
                    {
                        name: '卖单',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#FF6161',
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: askCountList
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
            tobj.charObj.depthChart.setOption(option, true);
            $(window).resize(function () {
                tobj.charObj.depthChart.resize();
            });
        },
        // processListData: function (list) {
  
        // },
        processSingleData: function (ws, root, data, objs) {
            var list = tobj.marketObj.clist,
                count = 0,
                sign, html, _HL /*,dp,dr*/ , dsign, dhtml, day_price = 0,
                day_rate = 0,
                _sign = $('.s-tab>.active').text().toLowerCase(),
                $tbody = $('.coin-table.show>tbody'),
                flag = true;
            list = tobj.marketObj[_sign] ? tobj.marketObj[_sign] : [];
            if (objs) {
                tobj.getAverage(data);
                if (0 === list.length) {
                    list.push(data);
                } else {
                    for (i = 0; i < list.length; i++) {
                        if (list[i].MarketId == data.MarketId) {
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    list[i][key] = data[key];
                                }
                            }
                            break;
                        }
                    }
                }
                //tobj.showCurrencyMarket(list,data.MarketId.split('_')[0]);
            } else {
                if (0 === list.length) {
                    list.push(data);
                } else {
                    for (i = 0; i < list.length; i++) {
                        if (list[i].MarketId == data.MarketId) {
                            $.extend(true, list[i], data);
                            break;
                        }
                    }
                }
            }
            //tobj.marketObj.clist = list;
            tobj.marketObj[_sign] = list;
            //if(flag){
            tobj.showCurrencyMarket(list, _sign);
            //}
            var kData = [];
            kData.push(data.OpenPrice);
            kData.push(data.ClosedPrice);
            kData.push(data.LowPrice);
            kData.push(data.HighPrice);
            kData.push(data.Volume);
            var oldData = tobj.dict[data.FrequencyKey];
        },
        //修复数据
        RepairKLine: function (dataFrequencyKey, lastId, root) {
            var Repair = root.lookup("RepairKLine");
            var frequencyKey = tobj.sign;
            if (dataFrequencyKey == frequencyKey) {
                var epairData = Repair.create({
                    MarketId: tobj.marketId,
                    FrequencyKey: dataFrequencyKey,
                    StartId: lastId
                });
                var dataBuffer = Repair.encode(epairData).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.RepairKLine, dataBuffer);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(buffer);
                }
            }
        },
        // websocket
        StartWS: function (root) {
            var BindMarket = root.lookup("BindMarket"),
                //Chat = root.lookup("Chat"),
                Error = root.lookup("Error"),
                //ReceiveChat = root.lookup("ReceiveChat"),
                Frequency = root.lookup("SetKLineFrequency"),
                KLineInfo = root.lookup("KLineInfo"),
                KLineList = root.lookup("KLineList"),
                SetTradeOrder = root.lookup("SetTradeOrder"),
                TradeSimpleDto = root.lookup("TradeSimpleDto"),
                TradeSimpleDtoList = root.lookup("TradeSimpleDtoList"),
                MarketDepth = root.lookup("MarketDepthDto"),
                SetMarketDepth = root.lookup("SetMarketDepth"),
                ScrollDayKLine = root.lookup("ScrollDayKLine"),
                SetTradeOrder = root.lookup('SetTradeOrder'),
                Login = root.lookup("LoginToMarket"),
                UpdateOrderInfo = root.lookup("UpdateOrderInfo"),
                PlanOrderInfo = root.lookup("PlanOrderInfo"),
                OrderInfo = root.lookup("OrderInfo"),
                PlanOrderTrigger = root.lookup("PlanOrderTrigger"),
                ws = new WebSocket("ws://10.45.0.41:8888/"),
                BatchSendComplate = root.lookup("BatchSendComplate");
            // ws = new WebSocket("wss://testws.xbrick.io/");
            // ws = new WebSocket("ws://10.0.0.216:8888");
            ws.onopen = function (e) {
                // console.log("Connection open...");
                if (obj.sign) {
                    LoginVerify();
                }
                getMarketInfos();
                tobj.dict = {};
                getMarketList(root, ws);
                BindToMarket(); //先绑定到市场
                // bindToMarketDepth();//获取市场深度
                // setTimeout(function(){
                // getToMarketDepthChat();//获取市场深度图数据
                // },1000);
                bindToTradeDetail(); //获取交易明细
                initKChart(); // 默认k线图数据
                //ReceiveChatCmd(); // 接收聊天内容
                //initKChart('D1');
                ReceiveOtherMarket(root, ws); //接收非选中市场的K线数据
            };
            ws.binaryType = "arraybuffer";
            ws.onmessage = function (e) {
                if (e.data instanceof ArrayBuffer) {
                    var cmdArray = new Uint8Array(e.data, 0, 2);
                    var receiveBuffer = new Uint8Array(e.data, 2);
                    var cmd = tobj.ByteToUnShort(cmdArray),
                        data = null;
                        console.log(cmd);
                    if (cmd == tobj.ReceiveCommand.Error) {
                        var data = Error.decode(receiveBuffer);
                        obj.hideTips(data.Message, 'green');
                    } else if (cmd == tobj.ReceiveCommand.ChatContent) {
                        //解析聊天内容
                        data = Chat.decode(receiveBuffer);
                        tobj.getChatList([{
                            type: 1,
                            name: data.Name,
                            txt: data.Content
                        }]);
                        tobj.scrolls();
                    } else if (cmd == tobj.ReceiveCommand.SingleKLine) {
                        // data = KLineInfo.decode(receiveBuffer);
                        var bar = KLineInfo.decode(receiveBuffer);
                        // console.log('SingleKLine', bar);
                        var newBar = { market: bar.Market, resolution: bar.Frequency, time: parseInt(bar.OpenTime.toString())*1000, open: bar.OpenPrice, high: bar.HighPrice, low: bar.LowPrice, close: bar.ClosedPrice, volume: bar.Volume };
                        tobj.klineStore.SingleProcess(newBar.market, newBar.frequency, newBar);
                        tobj.processSingleData(ws, root, bar, {
                            key: bar.FrequencyKey,
                            id: bar.MarketId
                        });
                    } else if (cmd == tobj.ReceiveCommand.ScrollDayKLine) {
                        data = ScrollDayKLine.decode(receiveBuffer);
                        // console.log('ScrollDayKLine: ',data);
                        tobj.processSingleData(ws, root, data);
                    } else if (cmd == tobj.ReceiveCommand.BatchKLine) {
                        // var batchData = KLineList.decode(receiveBuffer);
                        // tobj.processListData(batchData.List);

                        var batchData = KLineList.decode(receiveBuffer);
                        //处理数据
                        var key = batchData.List[0].Market + '_' + batchData.List[0].Frequency;
                        var cache = tobj.kLineCache[key];
                        if (!cache) {
                            tobj.kLineCache[key] = batchData.List;
                        }
                        else {
                            batchData.List.forEach(function (bar) {
                                cache.push(bar);
                            });
                        }
                    } else if (cmd == tobj.ReceiveCommand.BatchKLineSendComplate) {
                        // console.log("传输完成");
                        // var frequencyKey = tobj.sign;
                        // tobj.drawingKLine(frequencyKey);
                        
                        var data = BatchSendComplate.decode(receiveBuffer);
                        // console.log('BatchKLineSendComplate', data, tobj.kLineCache);
                        var key = data.Market + '_' + data.Frequency;
                        var cache = tobj.kLineCache[key];
                        var bars = [];
                        cache.forEach(function (bar) {
                            bars.push({ market: bar.Market, resolution: bar.Frequency, time: parseInt(bar.OpenTime.toString())*1000, open: bar.OpenPrice, high: bar.HighPrice, low: bar.LowPrice, close: bar.ClosedPrice, volume: bar.Volume });
                        });
                        tobj.klineStore.BatchProcess(data.Market, data.Frequency, bars, parseInt(data.Start.toString()), parseInt(data.End.toString()),data.NoData);
                        tobj.kLineCache[key] = [];
                    } else if (cmd == tobj.ReceiveCommand.TradeSimpleDto) {
                        //单条交易数据直接附加
                        data = TradeSimpleDto.decode(receiveBuffer);
                        // console.log('单条',data);
                        tobj.timeObj.st1 = new Date().getTime();
                        operateMarketDetail(data, 1);
                    } else if (cmd == tobj.ReceiveCommand.TradeSimpleDtoList) {
                        //批量交易数据需要先清空容器
                        var list = TradeSimpleDtoList.decode(receiveBuffer);
                        // console.log('批量',list);
                        tobj.timeObj.st1 = new Date().getTime();
                        operateMarketDetail(list.List || []);
                    } else if (cmd == tobj.ReceiveCommand.MarketDepth) {
                        data = MarketDepth.decode(receiveBuffer);
                        // console.log('MarketDepth: ',data);
                        if (!data.IsChat) {
                            operateMarketDepth(data);
                        } else {
                            tobj.drawingAskBidChart(data);
                        }
                    } else if (cmd == tobj.ReceiveCommand.CreateOrder) {
                        data = OrderInfo.decode(receiveBuffer);
                        // console.log("有普通订单创建",data);
                        tobj.showOrders(data, 1);
                    } else if (cmd == tobj.ReceiveCommand.CreatePlanOrder) {
                        data = PlanOrderInfo.decode(receiveBuffer);
                        // console.log("有计划订单创建",data);
                        tobj.showOrders(data, 2);
                    } else if (cmd == tobj.ReceiveCommand.UpdateOrder) {
                        data = UpdateOrderInfo.decode(receiveBuffer);
                        // console.log("订单信息发生改变",data);
                        tobj.showOrders(data, 3);
                    } else if (cmd == tobj.ReceiveCommand.PlanOrderTrigger) {
                        var data = PlanOrderTrigger.decode(receiveBuffer);
                        // console.log("计划订单被触发",data);
                        $('#plan-table.on tbody>tr').each(function () {
                            var that = $(this),
                                $a = that.find('a'),
                                _status = $.t('processing');
                            if (data.Id == $a.data('id')) {
                                if ((0 != list[i].Price) && (1 == list[i].Status)) {
                                    if (list[i].Price == list[i].HighTriggerPrice) {
                                        if (1 == list[i].OrderType) {
                                            _status = $.t('al_highTrigger');
                                        } else {
                                            _status = $.t('al_bottomTrigger');
                                        }
                                    } else if (list[i].Price == list[i].LowTriggerPrice) {
                                        if (1 == list[i].OrderType) {
                                            _status = $.t('al_stopProfit');
                                        } else {
                                            _status = $.t('al_stopLose');
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            };
            ws.onerror = function (e) {
                console.log('websocked error');
                console.log(e);
            }
            ws.onclose = function (e) {
                console.log("Connection closed", e);
                setTimeout(function () {
                    tobj.StartWS(root);
                }, 2000);
            };
            // 登陆到当前市场
            function LoginVerify() {

                var loginInfo = Login.create({
                        UserId: tobj.loginCookie.id,
                        SecretKey: tobj.loginCookie.key,
                        MarketId: tobj.marketId
                    }),
                    dataBuffer = Login.encode(loginInfo).finish(),
                    buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.Login, dataBuffer);
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send(buffer);
                }
            }
            // 启动监听市场
            function BindToMarket() {
                var bindMarket = BindMarket.create({
                    MarketId: tobj.marketId
                });
                var dataBuffer = BindMarket.encode(bindMarket).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.BindMarket, dataBuffer);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(buffer);
                } else {

                }
            }
            // 启动监听市场深度
            function bindToMarketDepth() {
                var bindMarket = SetMarketDepth.create({
                    MarketId: tobj.marketId,
                    Limit: tobj.marketObj.limit,
                    Precision: tobj.marketObj.precision,
                    IsChat: false
                });
                var dataBuffer = SetMarketDepth.encode(bindMarket).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetMarketDepth, dataBuffer);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(buffer);
                } else {

                }
            }
            // 市场深度图
            function getToMarketDepthChat() {
                var bindMarket = SetMarketDepth.create({
                    MarketId: tobj.marketId,
                    Limit: 100,
                    Precision: tobj.marketInfo.pP,
                    IsChat: true
                });
                var dataBuffer = SetMarketDepth.encode(bindMarket).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetMarketDepth, dataBuffer);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(buffer);
                } else {

                }
            }
            // 启动监听市场明细
            function bindToTradeDetail() {
                var data = SetTradeOrder.create({
                    MarketId: tobj.marketId,
                    Count: parseInt(tobj.marketObj.count)
                });
                var dataBuffer = SetTradeOrder.encode(data).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetTradeOrder, dataBuffer);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(buffer);
                } else {

                }
            }
            //接收其他市场
            function ReceiveOtherMarket(root, ws) {
                var MarketFrequency = root.lookup("MarketKLineFrequency");
                var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
                var list = new Array();
                for (var i = 0; i < obj.otherMarketIds.length; i++) {
                    var marketId = obj.otherMarketIds[i];
                    var marketFrequency = MarketFrequency.create({
                        MarketId: marketId,
                        Keys: ["SD1"]
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
            // 市场深度/交易明细
            $('.about-box').on('click', '>.about-list>li>span', function () {
                var index = $('.sort-list>li.on').index();
                tobj.changeMarketParam();
                if (0 === index) {
                    bindToMarketDepth();
                } else {
                    bindToTradeDetail();
                }
            });
            // 交易明细
            function operateMarketDetail(data) {
                var list = [],
                    list2 = [],
                    html = '',
                    total = 0,
                    i = 0,
                    $tr, scale, time, val, $i, $current = $('.current-price'),
                    _fk = '',
                    dhtml = '',
                    _price = 0,
                    _diff = 0;
                if (data instanceof Array) {
                    list = data;
                    if (0 == list.length) {
                        return false;
                    }
                    list.slice(0, tobj.marketObj.count);
                    list2 = JSON.parse(JSON.stringify(list));
                    list2.sort(function (a, b) {
                        return b.Volume - a.Volume;
                    });
                    total = list2[0].Volume;
                    tobj.detailObj.volume = total;
                    for (i; i < list.length; i++) {
                        scale = (list[i].Volume / total * 80 < 1) ? 1 : (list[i].Volume / total) * 80,
                            // time = (list[i].CreateTime).split(' ');
                            html += '<tr class="' + (list[i].IsAsk ? 'red' : 'green') + '" data-id="' + list[i].Id + '">\
                              <td>' + list[i].CreateTime + '</td>\
                              <td>' + list[i].Price + '</td>\
                              <td class="txt-right"><i class="icon"></i><span class="d_volume">' + obj.getFloatValue((list[i].Volume || 0), tobj.marketInfo.dP) + '</span></td>\
                              <td><i class="buz-scale" style="width: ' + (total > list[i].Volume ? scale : 80) + 'px;"></i></td>\
                           </tr>';
                    }
                    list2.sort(function (a, b) {
                        return b.Price - a.Price;
                    });
                    tobj.detailObj.price = list[0].Price;
                    //tobj.marketObj.list=list;


                    $('#deal-table>tbody').html(html);
                    _price = tobj.detailObj.price;

                } else {
                    /*list = tobj.marketObj.list;
               
                    list2=JSON.parse(JSON.stringify(list));
                    list2.sort(function(a,b){return b.Volume-a.Volume;});*/
                    //total = list2[0].Volume;
                    //$('#buy-price,#sell-price,#limit-min-buy-price,#limit-min-sell-price').val(data.Price);
                    time = data.CreateTime;
                    if (data.Volume > tobj.detailObj.volume) {
                        total = data.Volume;
                        $('#deal-table>tbody>tr').each(function () {
                            var that = $(this),
                                _vol = parseFloat(that.find('.d_volume').text());

                            that.find('.buz-scale').css('width', (total > _vol ? scale : 80));
                        });
                    } else {
                        total = tobj.detailObj.volume;
                    }
                    scale = (data.Volume / total * 80 < 1) ? 1 : (data.Volume / total) * 80;

                    html = '<tr class="' + (data.IsAsk ? 'red' : 'green') + '" data-id="' + data.Id + '">\
                        <td>' + time + '</td>\
                        <td>' + data.Price + '</td>\
                        <td class="txt-right"><i class="icon ' + ((data.Price > tobj.detailObj.price) ? 'icon-down7' : 'icon-up') + '"></i><span class="d_volume">' + obj.getFloatValue((data.Volume || 0), tobj.marketInfo.dP) + '</span></td>\
                        <td><i class="buz-scale" style="width: ' + (total > data.Volume ? scale : 80) + 'px;"></i></td>\
                     </tr>';
                    // $('#deal-table>tbody>tr:last').remove();
                    $('#deal-table>tbody').prepend(html);
                    setTimeout(function () {
                        $('#deal-table>tbody>tr[data-id="' + data.Id + '"]').find('.icon').removeClass('icon-down7 icon-up');
                    }, 1000);
                    _price = data.Price;
                    if (tobj.detailObj.price < _price) {
                        tobj.detailObj.price = _price;
                    }
                    /*if(0!=count){
                       $tr=$('#deal-table>tbody>tr').eq(i);
                       $i=$tr.find('.icon');
                       val = $tr.find('td').eq(1).text();
                       $tr.find('td').eq(0).text(time[1]);
                       $tr.find('td').eq(1).text(data.Price);
                       $tr.find('.buz-scale').css('width',(total>data.Volume?scale:80));
                       if(val<data.Price){
                          $tr.removeClass('red').addClass('green');
                          $i.addClass('icon-down7').removeClass('icon-up');
                       }else if(val>data.Price){
                          $tr.removeClass('green').addClass('red');
                          $i.addClass('icon-up').removeClass('icon-down7');
                       }else{
                          $i.removeClass('icon-down7 icon-up');
                          $tr.removeClass('green red');
                       }
                    }else{
                       html = '<tr>\
                                <td>'+time[1]+'</td>\
                                <td>'+data.Price+'</td>\
                                <td class="txt-right"><i class="icon"></i><span>'+data.Volume+'</span></td>\
                                <td><i class="buz-scale" style="width: '+(total>data.Volume?scale:80)+'px;"></i></td>\
                             </tr>';
                       $('#deal-table>tbody').prepend(html);
                    }*/
                }
                // tobj.changePrice(_price);
                if (('' == $current.text()) || ($current.text() > _price)) {
                    $current.text(_price).removeClass('green').addClass('red');
                } else {
                    $current.text(_price).removeClass('red').addClass('green');
                }

                /*if((''==$current.text())||($current.text()>_price)){
                   $current.text(_price).addClass('red').removeClass('green');
                   $('.priceTrend').addClass('red').removeClass('green');
                   dhtml=_price+'<i class="icon icon-rise"></i>';
                   if(''==$current.text()){
                      
                   }
                }else{
                   $current.text(_price).addClass('green').removeClass('red');
                   $('.priceTrend').addClass('green').removeClass('red');
                   dhtml=_price+'<i class="icon icon-fall"></i>';
                }
                _diff=(tobj.timeObj.ed1-tobj.timeObj.st1)/1000;
                if(0>_diff||1<_diff){
                   $('.day-price').html(dhtml);
                   tobj.timeObj.ed1=new Date().getTime();
                }*/

                tobj.getAverage();
                tobj.marketObj.list = list;
            }
            // 展示市场深度数据
            function operateMarketDepth(data) {
                var askList = data.AskList || [],
                    bidList = data.BidList || [],
                    tmp = JSON.parse(JSON.stringify(bidList)),
                    tmp2 = JSON.parse(JSON.stringify(askList)),
                    html = '',
                    html2 = '',
                    total = 0,
                    scale = 1,
                    i = 0,
                    tmp3 = 0,
                    diff = 0,
                    // _sign=tobj.marketObj.key.split('-'),
                    _sign = [tobj.marketObj.limit, tobj.marketObj.precision],
                    less = _sign[1];

                bidList.sort(function (a, b) {
                    return b.Price - a.Price;
                });
                askList.sort(function (a, b) {
                    return b.Price - a.Price;
                });
                tmp.sort(function (a, b) {
                    return b.Total - a.Total;
                });
                tmp2.sort(function (a, b) {
                    return b.Total - a.Total;
                });

                // 买
                if (0 < bidList.length) {
                    total = tmp[0].Total;
                    tobj.signPrice.buy = bidList[0].Price;
                }
                for (i = 0; i < _sign[0]; i++) {
                    if (bidList[i] && (bidList[i].Total || bidList[i].Total == 0)) {
                        scale = (bidList[i].Total / total) * 80 < 1 ? 1 : (bidList[i].Total / total) * 80;
                        html += '<tr class="red">\
                              <td>' + $.t("purchase") + (i + 1) + '</td>\
                              <td>' + obj.getFloatValue1(bidList[i].Price, less) + '</td>\
                              <td class="txt-right"><span>' + bidList[i].Total + '</span></td>\
                              <td><i class="buz-scale" style="width: ' + (total > bidList[i].Total ? scale : 80) + 'px;"></i></td>\
                           </tr>';
                    } else {
                        diff = _sign[0] - i;
                        break;
                        //html +='<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
                    }
                }
                $('#buy-table>tbody').html(html);
                for (i = 0; i < diff; i++) {
                    $('#buy-table>tbody').append('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
                }
                // 卖
                if (0 < askList.length) {
                    tmp3 = tmp2[0].Total;
                    total = tmp2[0].Total;
                    //total=tmp3<total?total:tmp3;
                    tobj.signPrice.sale = askList[askList.length - 1].Price;
                    diff = 0;
                }
                for (i = 0; i < _sign[0]; i++) {
                    if (askList[i] && (askList[i].Total || askList[i].Total == 0)) {
                        scale = (askList[i].Total / total) * 80 < 1 ? 1 : (askList[i].Total / total) * 80;
                        html2 += '<tr class="green">\
                              <td>' + $.t("betray") + (askList.length - i) + '</td>\
                              <td>' + obj.getFloatValue1(askList[i].Price, less) + '</td>\
                              <td class="txt-right"><span>' + askList[i].Total + '</span></td>\
                              <td><i class="buz-scale" style="width: ' + (total > askList[i].Total ? scale : 80) + 'px;"></i></td>\
                           </tr>';
                    } else {
                        diff = _sign[0] - i;
                        break;
                        //html2 +='';
                    }
                }
                $('#sale-table>tbody').html(html2);
                for (i = 0; i < diff; i++) {
                    $('#sale-table>tbody').prepend('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
                }
            }
            // 点击深度中的挂单，价格、量、百分比应联动
            $('.buz-table').on('click', '>tbody>tr', function () {
                var that = $(this);
                $td = that.find('td'),
                    price = $td.eq(1).text(),
                    $table = that.closest('.buz-table');
                if (!!price) {
                    if ('deal-table' != $table.prop('id')) {
                        //$('#buy-price,#sell-price,#limit-min-buy-price,#limit-min-sell-price').val(price);
                        tobj.changePrice(price);
                    }
                }
            });
            // 切换基币市场tab
            $('.s-tab').on('click', '>li', function () {
                var index = $(this).index();
                if ($(this).hasClass('active')) {
                    return false;
                }
                tobj.currencyObj.base = ($(this).text()).toLowerCase();
                $(this).addClass('active').siblings().removeClass('active');
                $('.table-box .coin-table').eq(index).addClass('show').siblings().removeClass('show');
                tobj.marketObj.collect = 0;
                $('#input-search').val('');
                tobj.marketObj.clist = [];
                getMarketList(root, ws);
            });
            // k线图数据切换
            $('.m-chart').on('click', '>.chart-tab>li', function () {
                tobj.sign = $(this).attr('data-sign');
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings().removeClass('active');
                } else {
                    return false;
                }
                initKChart();
            });
            // 左侧市场切换
            $('.left-top').on('click', '>.top-list>li', function () {
                var that = $(this),
                    txt = that.text(),
                    $tl = that.parent(),
                    prev = that.closest('.left-top'),
                    marketId = txt.toLowerCase() + '_' + $('.buyType').eq(0).text().toLowerCase();

                $(document.body).append('<a href="./trade.html?marketid=' + marketId + '" id="link-attr" target="_blank"></a>');
                $('#link-attr')[0].click();
                $('#link-attr').remove();
                $tl.removeClass('show');
                /*prev.find('label>span').text(txt);
                that.addClass('on').siblings('li').removeClass('on');
                $tl.removeClass('show');*/

                //tobj.currencyObj.base = (that.text()).toLowerCase();
                // you
                /*$('.s-tab>li').each(function(){
                   var _t = $(this);
                   if(_t.text()===(tobj.currencyObj.base).toUpperCase()){
                      _t.addClass('active').siblings('li').removeClass('active');
                      return false;
                   }
                });*/
            });
            // 右侧市场列表
            function getMarketList(root, ws) {
                tobj.getBaseMarketListZH(function (res) {
                    var list = [],
                        list2 = [],
                        $table = $('.table-box .coin-table.show');
                    if (res.IsSuccess) {
                        list = res.Data || [];
                        tobj.otherMarkerIdsZH = [], tobj.otherMarkerIdsZH = [], tobj.otherMarkerIds = [];
                        for (var i = 0; i < list.length; i++) {
                            list2.push(list[i].Id);
                            tobj.otherMarkerIdsZH.push({
                                TargetId: list[i].TargetId,
                                TargetName: list[i].TargetName,
                                Id: list[i].Id
                            });
                        }
                        for (var i = 0; i < list2.length; i++) {
                            if (-1 == list2.indexOf(tobj.otherMarkerIds[i])) {
                                tobj.otherMarkerIds.push(list2[i]);
                            }
                        }
                        if (obj.sign) {
                            tobj.getMarketCollect(function (res) {
                                var list = tobj.otherMarkerIdsZH,
                                    collect = [],
                                    html = '',
                                    _sign = $('.s-tab>.active').text().toLowerCase(),
                                    sel = '',
                                    arry = tobj.marketId.split('_'),
                                    tmp = [];
                                collect = res.Data || [];
                                tobj.collect = collect;
                                tmp = tobj.marketObj[_sign] = tobj.marketObj[_sign] ? tobj.marketObj[_sign] : [];
                                if (0 === $table.find('tr').length) {
                                    for (var i = 0; i < list.length; i++) {
                                        list[i].collect = false;
                                        for (var j = 0; j < collect.length; j++) {
                                            if (list[i].Id === collect[j]) {
                                                list[i].collect = true;
                                            }
                                        }
                                        if (arry[1] == list[i].TargetId) {
                                            sel = "cur";
                                        } else {
                                            sel = '';
                                        }
                                        html += '<tr data-type="' + list[i].TargetId + '" class="' + sel + '">\
                                 <td><i class="icon ' + (list[i].collect ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                                 <td>' + (list[i].TargetId).toUpperCase() + '</td>\
                                 <td>0</td>\
                                 <td>0</td>\
                                 <td>0%</td>\
                              </tr>';
                                        tmp[i] = {
                                            MarketId: list[i].Id,
                                            TargetName: list[i].TargetName,
                                            TargetId: (list[i].TargetId).toUpperCase()
                                        };
                                    }
                                    tobj.marketObj[_sign] = tmp;
                                    $table.html(html);
                                    tobj.otherMarkerIdsZH = list;
                                } else {

                                }
                                tobj.ReceiveOtherMarket(root, ws);
                            });
                        } else {
                            var list = tobj.otherMarkerIdsZH,
                                html = '',
                                _sign = $('.s-tab>.active').text().toLowerCase(),
                                sel = '',
                                arry = tobj.marketId.split('_'),
                                tmp = [];
                            tmp = tobj.marketObj[_sign] = tobj.marketObj[_sign] ? tobj.marketObj[_sign] : [];
                            if (0 === $table.find('tr').length) {
                                for (var i = 0; i < list.length; i++) {
                                    if (arry[1] == list[i].TargetId) {
                                        sel = "cur";
                                    } else {
                                        sel = '';
                                    }
                                    html += '<tr data-type="' + list[i].TargetId + '" class="' + sel + '">\
                              <td><i class="icon icon-unstar" data-market="' + list[i].Id + '"></i></td>\
                              <td>' + (list[i].TargetId).toUpperCase() + '</td>\
                              <td>0</td>\
                              <td>0</td>\
                              <td>0%</td>\
                           </tr>';
                                    tmp[i] = {
                                        MarketId: list[i].Id,
                                        TargetName: list[i].TargetName,
                                        TargetId: (list[i].TargetId).toUpperCase()
                                    };
                                }
                                tobj.marketObj[_sign] = tmp;
                                $table.html(html);
                                tobj.otherMarkerIdsZH = list;
                            } else {

                            }
                            tobj.ReceiveOtherMarket(root, ws);
                        }
                    }
                });
            }
            // 获取市场信息
            function getMarketInfos(root, ws) {
                tobj.getMarketInfo(function (res) {
                    var $span = $('.about-list.show>li:nth-child(2)>span'),
                        data = {};
                    if (res.IsSuccess) {
                        data = res.Data;
                        tobj.marketInfo.pP = data.PricePrecision;
                        tobj.marketInfo.vP = data.VolumePrecision;
                        tobj.marketInfo.dP = data.DepthVolumePrecision;
                        tobj.marketInfo.bsP = data.BasicShowPrecision;
                        tobj.marketInfo.tsP = data.TargetShowPrecision;
                        $span.each(function () {
                            var that = $(this);
                            if (data.PricePrecision == that.text()) {
                                that.addClass('on').siblings('span').removeClass('on');
                                return false;
                            }
                        });
                        var flag = tobj.marketInfo.pP;
                        if (7 <= flag) {
                            $span.removeClass('hide');
                        } else if (5 <= flag) {
                            $span.addClass('hide');
                            $span.eq(3).removeClass('hide');
                            $span.eq(2).removeClass('hide');
                            $span.eq(1).removeClass('hide');
                        } else if (3 <= flag) {
                            $span.addClass('hide');
                            $span.eq(3).removeClass('hide');
                            $span.eq(2).removeClass('hide');
                        } else if (1 <= flag) {
                            $span.addClass('hide');
                            $span.eq(3).removeClass('hide');
                        } else if (7 <= flag) {
                            $span.addClass('hide');
                        }
                        tobj.changeMarketParam();
                        bindToMarketDepth();
                        getToMarketDepthChat();
                    }
                });
            }
            // 初始化市场图表
            function initKChart() {
                // var frequency = Frequency.create({
                //     MarketId: tobj.marketId,
                //     FrequencyKey: tobj.sign,
                //     IsGraph: true,
                //     IsReconnect: false
                // });
                // var dataBuffer = Frequency.encode(frequency).finish();
                // var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetKLineFequency, dataBuffer);
                // if (ws.readyState === WebSocket.OPEN) {
                //     ws.send(buffer);
                // } else {

                // }
                //新
                tobj.klineStore.HaveSubscribedEndTimeDict = {};
                tobj.klineStore.GetBarsFunc = function (request) {
                    // console.log('request', request);
                    var key = request.market + '_' + request.resolution;
                    var HaveSubscribedEndTime = tobj.klineStore.HaveSubscribedEndTimeDict[key];
                    if (!HaveSubscribedEndTime) {
                        HaveSubscribedEndTime = 0;
                        tobj.klineStore.HaveSubscribedEndTimeDict[key] = 0;
                    }
                    if (HaveSubscribedEndTime == 0 || request.end < HaveSubscribedEndTime) {
                        var frequency = Frequency.create({ Market: request.market, Frequency: request.resolution, Start: request.start, End: request.end, Subscribe: HaveSubscribedEndTime == 0 });
                        var dataBuffer = Frequency.encode(frequency).finish();
                        var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetKLineFequency, dataBuffer);
                        if (ws.readyState == WebSocket.OPEN) {
                            // console.log('xinxixn',tobj.marketId,buffer);
                            ws.send(buffer);
                            HaveSubscribedEndTime = request.end;
                            tobj.klineStore.HaveSubscribedEndTimeDict[key] = HaveSubscribedEndTime;
                        }
                    } else {
                        tobj.klineStore.BatchProcess(request.market, request.resolution, []);
                    }
                }
				tobj.CreateBars();
            }
            // 聊天记录请求
            function ReceiveChatCmd() {
                var receiveChat = ReceiveChat.create({
                    MarketId: tobj.marketId
                });
                var dataBuffer = ReceiveChat.encode(receiveChat).finish();
                var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.ReceiveMarketChat, dataBuffer);
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send(buffer);
                }
            }
            // 聊天信息回车发送
            $('#input-chat').on('keypress', function (e) {
                e = e || window.event;
                var val = $(this).val(),
                    data = {
                        Name: tobj.nickname,
                        Content: val,
                        SourceId: tobj.marketId
                    };
                val.trim();
                if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which) && !!val) {
                    var newchat = Chat.create(data);
                    var dataBuffer = Chat.encode(newchat).finish();
                    var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.ClientUserChat, dataBuffer);
                    $(this).val('');
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(buffer);
                        tobj.getChatList([{
                            type: 2,
                            name: tobj.nickname,
                            txt: val
                        }]);
                        tobj.scrolls();
                    } else {

                    }
                    /*tobj.getChatList([{type: 2,name: '匿名',txt: $(this).val()}]);
                    tobj.scrolls();
                    $(this).val('');*/
                }
            });
        },
        // 监听指定市场K线数据
        ReceiveOtherMarket: function (root, ws) {
            var otherMarkerIds = tobj.otherMarkerIds; //右上角市场列表
            // otherMarkerIds.push(tobj.marketId);  // 当前市场
            var MarketFrequency = root.lookup("MarketKLineFrequency");
            var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
            var list = new Array();
            for (var i = 0; i < otherMarkerIds.length; i++) {
                var marketId = otherMarkerIds[i];
                var marketFrequency = MarketFrequency.create({
                    MarketId: marketId,
                    Keys: ["SD1"]
                });
                list.push(marketFrequency);
            }
            var fList = MarketFrequencyList.create({
                List: list
            });
            var dataBuffer = MarketFrequencyList.encode(fList).finish();
            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.SetReceiveOtherMarketKLine, dataBuffer);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(buffer);
            } else {

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
        //k线 新
        getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		CreateBars: function() {
			if (tobj.HasStarted == false){
                tobj.HasStarted = true;
            }else {
                return
            }
			var isMobile = false; //initiate as false
			// device detection
			if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
				|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

			var preset = isMobile ? 'mobile' : "";
			var disabledFeatures = ["header_symbol_search", "use_localstorage_for_settings", 'header_compare', 'header_saveload'], enabledFeatures = [];
			isAffiliates = tobj.getParameterByName('affiliates') || false;

			if (isMobile) {
				enabledFeatures.push('header_resolutions');
				enabledFeatures.push('header_chart_type');
				enabledFeatures.push('header_indicators');
				enabledFeatures.push('header_widget_dom_node');
				disabledFeatures.push('header_screenshot');
			} else {
				//enabledFeatures.push("study_templates"); //TODO
			}
			if (isAffiliates) {
				disabledFeatures.push('header_fullscreen_button');
			}
			disabledFeatures.push('chart_property_page_timezone_sessions');

			var widget = window.tvWidget = new TradingView.widget({
				fullscreen: true,
				symbol: 'eth_ae',
				interval: '15',
				container_id: "chart",
				datafeed: tobj.datafeed,
				library_path: "charting_library/",
				locale: (localStorage.getItem('i18next_lng') == 'zh-cn')? "zh" : "en",
				drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
				disabled_features: disabledFeatures,
				enabled_features: enabledFeatures,
				time_frames: [
					{ text: "1year", resolution: "D" },
					{ text: "1month", resolution: "D" },
					{ text: "7d", resolution: "60" },
					{ text: "3d", resolution: "30" },
					{ text: "1d", resolution: "15" },
					{ text: "6h", resolution: "5" },
					{ text: "1h", resolution: "1" }
				],
				charts_storage_url: 'http://saveload.tradingview.com',
				charts_storage_api_version: "1.1",
				client_id: 'tradingview.com',
				user_id: 'public_user_id'
			});
		},

        calculateMA: function (dayCount, data) {
            var result = [];
            for (var i = 0, len = data.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data.values[i - j][1];
                }
                result.push(+(sum / dayCount).toFixed(3));
            }
            return result;
        },
        // 获取币种市场列表（zh）
        getBaseMarketListZH: function (callbacks) {
            obj.ajaxFn('/market/GetFullListByBasic', {
                data: {
                    basicId: $('.s-tab>li.active').text().toLowerCase()
                },
                callback: callbacks
            });
        },
        // 获取基币市场列表
        /*getBaseMarketList: function(callbacks){
           obj.ajaxFn('/market/GetListByBasic',{
              data: {basicId: tobj.currencyObj.base},
              callback: callbacks
           });
        },*/
        // 获取当前币种市场列表
        getTargetMarketList: function () {
            obj.ajaxFn('/market/GetListByTarget', {
                data: {
                    targetId: tobj.currencyObj.target
                },
                callback: function (res) {
                    var list = [],
                        html = '',
                        current = (tobj.currencyObj.base).toUpperCase() || 'ETJ';
                    if (res.IsSuccess) {
                        list = res.Data || [];
                        for (var i = 0; i < list.length; i++) {
                            if (tobj.currencyObj.base != list[i].split('_')[0]) {
                                var k = list[i].split('_')[0].toUpperCase();
                                /*if(0==i){current=k;}*/
                                html += '<li>' + k + '</li>';
                            }
                        }
                        if (!html) {
                            $('.left-top .icon-down5').addClass('hide');
                        } else {
                            $('.left-top .icon-down5').removeClass('hide');
                        }
                        $('.top-list').html(html);
                        $('.top-list>li').each(function () {
                            var that = $(this);
                            if (that.text() === current) {
                                that.addClass('on');
                            }
                        });
                        // $('.current-market').text(current);
                        $('.current-market').text(tobj.marketId.split('_')[0].toUpperCase());
                    }
                }
            });
        },
        // 获取用户当前市场的余额
        getMarket: function () {
            obj.ajaxFn('/market/GetUserInfo', {
                data: {
                    marketId: tobj.marketId
                },
                callback: function (res) {
                    var data = {},
                        $buy = $('.form-buy'),
                        $sale = $('.form-sale'),
                        bid = 0,
                        ask = 0,
                        basePrice = 0,
                        targetPrice = 0,
                        limit = '';
                    if (res.IsSuccess) {
                        data = res.Data;
                        data.BasicBalance = data.BasicBalance || 0;
                        data.TargetBalance = data.TargetBalance || 0;
                        // $('#baseBalance').text(obj.scienceToNum(obj.getFloatValue(data.BasicBalance,tobj.marketInfo.pP),tobj.marketInfo.pP)||'0');
                        // $('#targetBalance').text(obj.scienceToNum(obj.getFloatValue(data.TargetBalance,tobj.marketInfo.vP),tobj.marketInfo.vP)||'0');
                        $('#baseBalance').text(obj.scienceToNum(obj.getFloatValue(data.BasicBalance, tobj.marketInfo.bsP), tobj.marketInfo.bsP) || '0');
                        $('#targetBalance').text(obj.getFloatValue(data.TargetBalance, tobj.marketInfo.tsP) || '0');
                        if (0 != tobj.detailObj.price) {
                            data.basePrice = obj.toDiv(data.BasicBalance, tobj.detailObj.price);
                            data.targetBalance = obj.toMul(data.TargetBalance, tobj.detailObj.price);
                            if (Number.isNaN(basePrice)) {
                                data.basePrice = 0;
                            }
                            if (Number.isNaN(targetBalance)) {
                                data.targetBalance = 0;
                            }
                            $('#able-buy').text(obj.scienceToNum(obj.getFloatValue(obj.toDiv(data.BasicBalance, tobj.detailObj.price), tobj.marketInfo.tsP), tobj.marketInfo.tsP) || '0');
                            $('#able-sale').text(obj.scienceToNum(obj.getFloatValue(obj.toMul(data.TargetBalance, tobj.detailObj.price), tobj.marketInfo.bsP), tobj.marketInfo.bsP) || '0');
                        }
                        limit = data.OrderPriceLimit;
                        if (limit && -1 == limit.indexOf('OFF')) {
                            tobj.detailObj.limit = 1 + parseFloat(limit.substr(limit.indexOf(',') + 1));
                        }

                        bid = parseFloat(obj.getFloatValue(data.BidFeeRate * 100, 2));
                        ask = parseFloat(obj.getFloatValue(data.AskFeeRate * 100, 2));
                        $('#buyFeeRate').text(bid || 0);
                        $('#sellFeeRate').text(ask || 0);
                        //tobj.target_val={basePrice: data.BasicBalance,targetBalance: data.TargetBalance};
                        /*Scroll.value = data.BidFeeRate*100;
                        Scroll.lightFn($buy.find('.scale-btn'),parseFloat(data.BidFeeRate*325).toFixed(2));
                        Scroll.value = data.AskFeeRate*100;
                        Scroll.lightFn($sale.find('.scale-btn'),parseFloat(data.AskFeeRate*325).toFixed(2));*/
                        tobj.tradeObj = data;
                    }
                    tobj.timeObj.ed = new Date().getTime();
                },
                errorCallback: function () {
                    tobj.timeObj.ed = new Date().getTime();
                }
            });
        },
        // 获取市场信息
        getMarketInfo: function (callback) {
            obj.ajaxFn('/market/GetMarketInfo', {
                data: {
                    marketId: tobj.marketId
                },
                callback: callback
            });
        },
        // 提交限价订单
        submitLimetOrder: function (opt, that) {
            var data = {
                marketId: tobj.marketId,
                orderType: opt.orderType,
                orderSource: 1,
                price: opt.price,
                volume: opt.volume
            };
            if (opt.tradePassword) {
                data.tradePassword = opt.tradePassword;
            }
            obj.ajaxFn('/Order/SubmitOrder', {
                data: data,
                callback: function (res) {
                    var msg = '',
                        param = null,
                        sel = '';
                    if (res.IsSuccess) {
                        msg = $.t('limit_success');
                        //that[0].reset();

                        if (2 === tobj.orderData.type) {
                            param = 2;
                        }
                        obj.modHide('#mod-buz');
                        //tobj.getOrderList(param);
                        tobj.getMarket();
                    } else {
                        if (1008 == res.Code) {
                            msg = $.t('trade_error12');
                        } else if (1007 === res.Code) {
                            msg = $.t('trade_error11');
                        } else if (1006 == res.Code) {
                            msg = $.t('trade_error8');
                        } else if (1005 == res.Code) {
                            msg = $.t('trade_error7');
                        } else if (1004 == res.Code) {
                            msg = $.t('trade_error4');
                        } else if (1002 == res.Code) {
                            msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
                        } else if (407 == res.Code) {
                            msg = $.t('tra_pwd') + $.t('more_wrong') + $.t('bargain') + $.t('lock_hour');
                        } else if (144 == res.Code) {
                            msg = $.t('trade_error2');
                        } else if (145 == res.Code) {
                            msg = $.t('trade_error3');
                        } else if (102 == res.Code) {
                            msg = $.t('trade_error6');
                        } else if (101 == res.Code) {
                            msg = $.t('trade_error10');
                        } else {
                            msg = res.ErrorMsg;
                        }
                        sel = 'green';
                    }
                    if (102 != res.Code && 1002 != res.Code) {
                        obj.hideTips(msg, sel);
                    } else if (1002 == res.Code) {
                        obj.getTips($('#input-pwd'), msg);
                    } else {
                        obj.modShow('#mod-prompt');
                        $('#mod-prompt .tips-txt').html(msg);
                    }
                },
                errorCallback: function (res) {
                    msg = $.t('limit_fail');
                    obj.hideTips(msg, 'green');
                }
            });
        },
        // 提交计划订单
        submitPlanOrder: function (opt, that) {
            var data = {
                marketId: tobj.marketId,
                orderType: opt.orderType,
                orderSource: 1,
                highTriggerPrice: opt.highTriggerPrice,
                lowTriggerPrice: opt.lowTriggerPrice,
                highPrice: opt.highPrice,
                lowPrice: opt.lowPrice,
                amount: opt.amount
            };
            if (opt.tradePassword) {
                data.tradePassword = opt.tradePassword;
            }
            obj.ajaxFn('/Order/SubmitPlanOrder', {
                data: data,
                callback: function (res) {
                    var msg = '',
                        param = null,
                        sel = '';
                    if (res.IsSuccess) {
                        msg = $.t('plan_success');
                        //that.find('input[type="text"]').val(0);
                        if (2 === tobj.orderData.type) {
                            param = 2;
                        }
                        obj.modHide('#mod-buz');
                        //tobj.getOrderList(param);
                        tobj.getMarket();
                    } else {
                        if (1008 == res.Code) {
                            msg = $.t('trade_error12');
                        } else if (1007 === res.Code) {
                            msg = $.t('trade_error11');
                        } else if (1006 === res.Code) {
                            msg = $.t('trade_error8');
                        } else if (1005 === res.Code) {
                            msg = $.t('trade_error7');
                        } else if (1002 === res.Code) {
                            msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
                        } else if (407 == res.Code) {
                            msg = $.t('tra_pwd') + $.t('more_wrong') + $.t('bargain') + $.t('lock_hour');
                        } else if (147 === res.Code) {
                            msg = $.t('trade_error9');
                        } else if (144 === res.Code) {
                            msg = $.t('trade_error2');
                        } else if (145 === res.Code) {
                            msg = $.t('trade_error3');
                        } else if (102 === res.Code) {
                            msg = $.t('trade_error6');
                        } else if (101 == res.Code) {
                            msg = $.t('trade_error10');
                        } else {
                            msg = res.ErrorMsg;
                        }
                        sel = 'green';
                    }
                    if (102 != res.Code && 1002 != res.Code) {
                        obj.hideTips(msg, sel);
                    } else if (1002 == res.Code) {
                        obj.getTips($('#input-pwd'), msg);
                    } else {
                        obj.modShow('#mod-prompt');
                        $('#mod-prompt .tips-txt').html(msg);
                    }
                },
                errorCallback: function (res) {
                    msg = $.t('plan_fail');
                    obj.hideTips(msg, 'green');
                }
            });
        },
        // 提交批量订单
        submitBatchOrder: function (opt, that) {
            var data = {
                marketId: tobj.marketId,
                batchType: opt.batchType,
                orderType: opt.orderType,
                orderSource: 1,
                highPrice: opt.highPrice,
                lowPrice: opt.lowPrice,
                volume: opt.volume
            };

            if (opt.tradePassword) {
                data.tradePassword = opt.tradePassword;
            }
            obj.ajaxFn('/Order/SubmitBatchOrder', {
                data: data,
                callback: function (res) {
                    var msg = '',
                        param, sel = '';
                    if (res.IsSuccess) {
                        msg = $.t('bulk_success');
                        //that.find('input[type="text"]').val(0);
                        /*if('sell'==tobj.orderData.sign){
                           param = 2;
                        }*/
                        obj.modHide('#mod-buz');
                        //tobj.getOrderList();
                        tobj.getMarket();
                    } else {
                        if (1008 == res.Code) {
                            msg = $.t('trade_error12');
                        } else if (1007 === res.Code) {
                            msg = $.t('trade_error11');
                        } else if (1006 === res.Code) {
                            msg = $.t('trade_error8');
                        } else if (1005 === res.Code) {
                            msg = $.t('trade_error7');
                        } else if (1004 === res.Code) {
                            msg = $.t('trade_error4');
                        } else if (1002 === res.Code) {
                            msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
                        } else if (407 == res.Code) {
                            msg = $.t('tra_pwd') + $.t('more_wrong') + $.t('bargain') + $.t('lock_hour');
                        } else if (144 === res.Code) {
                            msg = $.t('trade_error2');
                        } else if (145 === res.Code) {
                            msg = $.t('trade_error3');
                        } else if (102 === res.Code) {
                            msg = $.t('trade_error6');
                        } else if (101 == res.Code) {
                            msg = $.t('trade_error10');
                        } else {
                            msg = res.ErrorMsg;
                        }
                        sel = 'green';
                    }
                    if (102 != res.Code && 1002 != res.Code) {
                        obj.hideTips(msg, sel);
                    } else if (1002 == res.Code) {
                        obj.getTips($('#input-pwd'), msg);
                    } else {
                        obj.modShow('#mod-prompt');
                        $('#mod-prompt .tips-txt').html(msg);
                    }
                },
                errorCallback: function (res) {
                    msg = $.t('bulk_fail');
                    obj.hideTips(msg, 'green');
                }
            });
        },
        // 判断是否需要输入交易密码
        isNeedPwd: function () {
            obj.ajaxFn('/user/GetTradePasswordStatus', {
                callback: function (res) {
                    var _sign = $('#to-addr').attr('data-sign'),
                        msg = '';
                    if (res.IsSuccess) {
                        if (0 == res.Data) {
                            //localStorage.setItem('account',)
                            obj.modShow('#mod-prompt');
                            $('#mod-prompt .tips-txt').html('<span>' + $.t("account_set") + '</span><a href="./set-buzPwd.html">' + $.t("set_pwd") + '</a>');
                        } else if (1 == res.Data) {
                            obj.modShow('#mod-buz');
                        } else {
                            if ('ok' == _sign) {
                                tobj.submitOrder();
                            } else if ('cancel' == _sign) {
                                tobj.cancelOrder();
                            } else if ('cancelAll' == _sign) {
                                tobj.cancelAllOrder();
                            }
                        }
                    } else {
                        if (-9997 != res.Code) {
                            msg = res.ErrorMsg + '，' + $.t("operate_fail");
                        } else {
                            msg = $.t("function") + '<a href="./login.html" target="_blank">' + $.t("login") + '</a>/<a href="./r.html" target="_blank">' + $.t("register") + '</a>';
                        }
                        obj.modShow('#mod-prompt');
                        $('#mod-prompt .tips-txt').html(msg);
                    }
                }
            });
        },
        // 提交订单
        submitOrder: function () {
            var data = tobj.orderData.data,
                that = tobj.orderData.that,
                _type = tobj.orderData.type;

            if (1 == _type) {
                tobj.submitLimetOrder(data, that);
            } else if (2 == _type) {
                tobj.submitPlanOrder(data, that);
            } else if (3 == _type) {
                tobj.submitBatchOrder(data, that);
            }
        },
        // 收藏
        toCollect: function (marketId) {
            obj.ajaxFn('/UserCollect/MarketCollect', {
                data: {
                    marketId: marketId
                },
                callback: function (res) {
                    /*var msg = '';
                    if(res.IsSuccess){
                       msg = '收藏成功！';
                    }else{
                       msg = res.ErrorMsg+'，操作失败！';
                    }
                    obj.modShow('#mod-prompt');
                    $('#mod-prompt .tips-txt').text(msg);*/
                }
            });
        },
        // 取消收藏
        cancelMarketCollect: function (marketId) {
            obj.ajaxFn('/UserCollect/CancelMarketCollect', {
                data: {
                    marketId: marketId
                },
                callback: function (res) {
                    /*var msg = '';
                    if(res.IsSuccess){
                       msg = '取消收藏成功！';
                    }else{
                       msg = res.ErrorMsg+'，操作失败！';
                    }
                    obj.modShow('#mod-prompt');
                    $('#mod-prompt .tips-txt').text(msg);*/
                }
            })
        },
        // 获取已收藏的市场列表
        getMarketCollect: function (callback) {
            obj.ajaxFn('/UserCollect/GetMarketCollect', {
                async: false,
                callback: callback
            });
        },
        // 获取可买/可得数量
        getAverage: function (data) {
            var _price = tobj.detailObj.price,
                able_buy = (_price ? obj.toDiv(tobj.tradeObj.BasicBalance, _price) : tobj.tradeObj.BasicBalance) + '',
                able_sale = (_price ? obj.toMul(tobj.tradeObj.TargetBalance, _price) : tobj.tradeObj.TargetBalance) + '';
            if (data && (data.MarketId == tobj.marketId)) {
                _price = data.ClosedPrice;

                /*$('#buy-price,#limit-max-buy-price').val(_price);
                $('#sell-price,#limit-max-sell-price').val(_price);*/
                //tobj.closePrice = _price;

                // $('#heightPrice').text(data.HighPrice);
                // $('#lowPrice').text(data.LowPrice);
            }
            if (0 != able_buy) {
                able_buy = obj.getFloatValue(able_buy, tobj.marketInfo.tsP);
            } else {
                able_buy = 0;
            }
            if (0 != able_sale) {
                able_sale = obj.getFloatValue(able_sale, tobj.marketInfo.bsP);
            } else {
                able_sale = 0;
            }

            $('#able-buy').text(able_buy);
            $('#able-sale').text(able_sale);
        },
        // 获取比率数值
        getNumFromScale: function (that) {
            var $forms = that.closest('.forms-box'),
                $form = $forms.find('.form-box.show'),
                _id = parseInt($form.attr('data-type')),
                _scale = $forms.find('.scale-txt>span').text(),
                _sign = that.closest('.items-body'),
                $expect = $forms.find('.expect-price'),
                buy_price = tobj.getNum($('#buy-price').val().trim()),
                buy_num = tobj.getNum($('#buy-num').val().trim()),
                sell_price = tobj.getNum($('#sell-price').val().trim()),
                sell_num = tobj.getNum($('#sell-num').val().trim()),
                buy_order = tobj.getNum($('#buy-order').val().trim()),
                sell_order = tobj.getNum($('#sell-order').val().trim()),
                sell_pOPrice = tobj.getNum($('#sell-pOPrice').val().trim()),
                buy_limit_max_price = tobj.getNum($('#limit-max-buy-price').val().trim()),
                buy_limit_min_price = tobj.getNum($('#limit-min-buy-price').val().trim()),
                buy_limit_num = tobj.getNum($('#limit-buy-num').val().trim()),
                sell_limit_max_price = tobj.getNum($('#limit-max-sell-price').val().trim()),
                sell_limit_min_price = tobj.getNum($('#limit-min-sell-price').val().trim()),
                sell_limit_num = tobj.getNum($('#limit-sell-num').val().trim()),
                _total = 0,
                index = 0;

            if (_sign.hasClass('buy')) {
                if (1 == _id) {
                    if (0 != buy_price) {
                        $('#buy-num').val(obj.scienceToNum(obj.getFloatValue(obj.toDiv(obj.toMul(obj.toDiv(_scale, 100), tobj.tradeObj.BasicBalance), buy_price), tobj.marketInfo.vP), tobj.marketInfo.vP));
                    } else {
                        $('#buy-num').val(0);
                    }
                    _total = tobj.getNum(obj.toMul($('#buy-price').val().trim(), $('#buy-num').val().trim()));
                } else if (2 == _id) {
                    $('#buy-order').val(obj.getFloatValue((_scale / 100) * tobj.tradeObj.BasicBalance, 2));
                    //_total = buy_order;
                } else if (3 == _id) {
                    if (0 != buy_limit_max_price) {
                        $('#limit-buy-num').val(obj.scienceToNum(obj.getFloatValue(obj.toDiv(obj.toMul(obj.toDiv(_scale, 100), tobj.tradeObj.BasicBalance), buy_limit_max_price), tobj.marketInfo.vP), tobj.marketInfo.vP));
                        buy_limit_num = tobj.getNum($('#limit-buy-num').val().trim());
                    } else {
                        $('#limit-buy-num').val(0);
                    }
                    //_total = tobj.getNum($('#limit-max-buy-price').val().trim()*$('#limit-buy-num').val().trim());
                }
            } else if (_sign.hasClass('sell')) {

                if (1 == _id) {
                    $('#sell-num').val(obj.scienceToNum(obj.getFloatValue(obj.toMul(obj.toDiv(_scale, 100), tobj.tradeObj.TargetBalance), tobj.marketInfo.vP), tobj.marketInfo.vP));
                    _total = tobj.getNum(obj.toMul($('#sell-price').val().trim(), $('#sell-num').val().trim()));
                } else if (2 == _id) {
                    $('#sell-order').val(obj.scienceToNum(obj.getFloatValue(obj.toMul(obj.toDiv(_scale, 100), tobj.tradeObj.TargetBalance), tobj.marketInfo.vP), tobj.marketInfo.vP));
                    sell_order = tobj.getNum($('#sell-order').val().trim());
                    //_total = tobj.getNum($('#sell-order').val().trim()*$('#sell-pOPrice').val().trim());
                } else if (3 == _id) {
                    $('#limit-sell-num').val(obj.scienceToNum(obj.getFloatValue(obj.toMul(obj.toDiv(_scale, 100), tobj.tradeObj.TargetBalance), tobj.marketInfo.vP), tobj.marketInfo.vP));
                    sell_limit_num = tobj.getNum($('#limit-sell-num').val().trim());
                    //_total = tobj.getNum($('#limit-max-sell-price').val().trim()*$('#limit-sell-num').val().trim());
                }
                index = 1;
            }

            if (1 == _id || 3 == _id) {
                if (3 == _id) {
                    _total = (1 != index) ? (buy_limit_num || 0) * ((buy_limit_max_price + buy_limit_min_price) || 0) / 2 : sell_limit_num * ((sell_limit_max_price + sell_limit_min_price) || 0) / 2;
                }
                $expect.text(_total || 0);
            }
        },
        // 返回数值
        getNum: function (str) {
            return Number.isNaN(str) ? 0 : parseFloat(str);
        },
        // 获取订单列表
        getOrderList: function (type) {
            var url = '/order/GetOrderList';
            if (2 == type) {
                url = '/order/GetPlanOrderList';
            }
            obj.ajaxFn(url, {
                data: {
                    marketId: tobj.marketId,
                    orderType: 0,
                    status: 1,
                    page: 1,
                    pageSize: 50
                },
                callback: function (res) {
                    var list = [];
                    if (res.IsSuccess) {
                        list = res.Data.Items;
                        tobj.showOrders(list, type || 1);
                    }
                }
            });
        },
        showOrders: function (list, type) {
            var html = '',
                selector = '#limit-table',
                sel = 'red',
                buz = $.t('buy'),
                index = 0,
                data = {},
                diff, _status = $.t('processing');
            if (3 == type) {
                $(selector).find('tbody>tr').each(function () {
                    var _tr = $(this),
                        _td = _tr.find('td'),
                        $volume = _tr.find('.o-v'),
                        $txV = _tr.find('.o-txV'),
                        $txA = _tr.find('.o-txA'),
                        _id = _tr.find('a').attr('data-id');
                    if (list.OrderId == _id) {
                        if (list.TxVolume == $volume.text()) {
                            _tr.remove();
                        } else {
                            $txV.text(list.TxVolume);
                            $txA.text(list.TxAmount);
                        }
                        return false;
                    }
                });
                diff = (tobj.timeObj.ed - tobj.timeObj.st) / 1000;
                if (diff > 3) {
                    tobj.timeObj.st = new Date().getTime();
                    tobj.getMarket();
                }
                return false;
            } else if (2 == type) {
                selector = '#plan-table';
            }
            if (list instanceof Array) {
                if (2 == type) {
                    index = 1;
                    for (var i = 0; i < list.length; i++) {
                        var txtArr = [$.t('high'), $.t('hunt')];
                        var time = list[i].CreateTime,
                            date = null;
                        var date = new Date(time).format('yyyy-MM-dd hh:mm:ss');
                        /*if(-1!==time.indexOf('(')){
                           time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
                           date = new Date(time);
                        }else{
                           time=time.replace(/\//g,'-');
                           time=time.substr(time.indexOf('-')+1);
                        }*/
                        if (2 == list[i].OrderType) {
                            sel = 'green';
                            buz = $.t('sell');
                            txtArr = [$.t('s_profit'), $.t('s_loss')];
                        } else {
                            sel = 'red';
                            buz = $.t('buy');
                        }
                        if ((0 != list[i].Price) && (1 == list[i].Status)) {
                            if (list[i].Price == list[i].HighTriggerPrice) {
                                if (1 == list[i].OrderType) {
                                    _status = $.t('al_highTrigger');
                                } else {
                                    _status = $.t('al_bottomTrigger');
                                }
                            } else if (list[i].Price == list[i].LowTriggerPrice) {
                                if (1 == list[i].OrderType) {
                                    _status = $.t('al_stopProfit');
                                } else {
                                    _status = $.t('al_stopLose');
                                }
                            }
                        }
                        html += '<tr class="' + sel + '">\
                        <td>' + date /*(date?date.format("MM-dd hh:mm:ss"):time)*/ + '</td>\
                        <td>' + buz + '</td>\
                        <td>' + obj.scienceToNum(list[i].Amount, tobj.marketInfo.pP) /*+'/'+(1==list[i].OrderType?list[i].TxAmount:list[i].TxVolume)*/ + '（' + (list[i].CurrencyId).toUpperCase() + '）' + '</td>\
                        <td>\
                           <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(list[i].HighTriggerPrice, tobj.marketInfo.pP) + '</span></label>\
                           <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(list[i].LowTriggerPrice, tobj.marketInfo.pP) + '</span></label>\
                        </td>\
                        <td>\
                           <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(list[i].HighPrice, tobj.marketInfo.pP) + '</span></label>\
                           <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(list[i].LowPrice, tobj.marketInfo.pP) + '</span></label>\
                        </td>\
                        <td>' + _status + '</td>\
                        <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="2" data-order="' + list[i].OrderType + '">' + $.t("revocation") + '</a></td>\
                     </tr>';
                    }
                } else if (1 == type) {
                    for (var i = 0; i < list.length; i++) {
                        var time = list[i].CreateTime,
                            date = new Date(time).format("MM-dd hh:mm:ss");
                        /*if(-1!==time.indexOf('(')){
                           time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
                           date = new Date(time);
                        }else{
                           time=time.replace(/\//g,'-');
                           time=time.substr(time.indexOf('-')+1);
                        }(date?date.format("MM-dd hh:mm:ss"):time)*/
                        if (2 == list[i].OrderType) {
                            sel = 'green';
                            buz = $.t('sell');
                        } else {
                            sel = 'red';
                            buz = $.t('buy');
                        }
                        html += '<tr class="' + sel + '">\
                        <td>' + date + '</td>\
                        <td>' + buz + '</td>\
                        <td><span class="o-v">' + obj.scienceToNum(list[i].Volume, tobj.marketInfo.pP) + '</span>/<span class="o-txV">' + obj.scienceToNum(list[i].TxVolume, tobj.marketInfo.pP) + '</span></td>\
                        <td><span class="o-p">' + obj.scienceToNum(list[i].Price, tobj.marketInfo.vP) + '</span></td>\
                        <td><span class="o-txA">' + obj.scienceToNum(list[i].TxAmount, tobj.marketInfo.vP) + '</span></td>\
                        <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="1" data-order="' + list[i].OrderType + '">' + $.t("revocation") + '</a></td>\
                     </tr>';
                    }
                }
                $(selector).find('tbody').prepend(html);
            } else {
                data = list;
                if (2 === type) {
                    index = 1;

                    var txtArr = [$.t('high'), $.t('hunt')];
                    var time = data.CreateTime,
                        date = null;
                    if (-1 !== time.indexOf('(')) {
                        time = parseInt(time.substring(time.indexOf('(') + 1, time.lastIndexOf(')')));
                        date = new Date(time);
                    } else {
                        time = time.replace(/\//g, '-');
                        time = time.substr(time.indexOf('-') + 1);
                    }
                    if (2 === data.OrderType) {
                        sel = 'green';
                        buz = $.t('sell');
                        txtArr = [$.t('s_profit'), $.t('s_loss')];
                    } else {
                        sel = 'red';
                        buz = $.t('buy');
                    }
                    if ((0 != data.Price) && (1 == data.Status)) {
                        if (data.Price == data.HighTriggerPrice) {
                            if (1 == data.OrderType) {
                                _status = $.t('al_highTrigger');
                            } else {
                                _status = $.t('al_bottomTrigger');
                            }
                        } else if (data.Price == data.LowTriggerPrice) {
                            if (1 == data.OrderType) {
                                _status = $.t('al_stopProfit');
                            } else {
                                _status = $.t('al_stopLose');
                            }
                        }
                    }
                    html = '<tr class="' + sel + '">\
                     <td>' + (date ? date.format("MM-dd hh:mm:ss") : time) + '</td>\
                     <td>' + buz + '</td>\
                     <td>' + obj.scienceToNum(data.Amount, tobj.marketInfo.pP) /*+'/'+(1==data.OrderType?data.TxAmount:data.TxVolume)*/ + '（' + (data.CurrencyId).toUpperCase() + '）' + '</td>\
                     <td>\
                        <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(data.HighTriggerPrice, tobj.marketInfo.pP) + '</span></label>\
                        <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(data.LowTriggerPrice, tobj.marketInfo.pP) + '</span></label>\
                     </td>\
                     <td>\
                        <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(data.HighPrice, tobj.marketInfo.pP) + '</span></label>\
                        <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(data.LowPrice, tobj.marketInfo.pP) + '</span></label>\
                     </td>\
                     <td><a href="javascript:;" data-id="' + data.Id + '" data-type="2" data-order="' + data.OrderType + '">' + $.t("revocation") + '</a></td>\
                  </tr>';
                } else {
                    var time = data.CreateTime,
                        date = null;
                    // if(-1!==time.indexOf('(')){
                    //    time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
                    //    date = new Date(time);
                    // }else{
                    //    time=time.replace(/\//g,'-');
                    //    time=time.substr(time.indexOf('-')+1);
                    // }
                    if (2 == data.OrderType) {
                        sel = 'green';
                        buz = $.t('sell');
                    } else {
                        sel = 'red';
                        buz = $.t('buy');
                    }
                    html += '<tr class="' + sel + '">\
                     <td>' + time + '</td>\
                     <td>' + buz + '</td>\
                     <td><span class="o-v">' + obj.scienceToNum(data.Volume, tobj.marketInfo.pP) + '</span>/<span class="o-txV">' + obj.scienceToNum(data.TxVolume, tobj.marketInfo.pP) + '</span></td>\
                     <td><span class="o-p">' + obj.scienceToNum(data.Price, tobj.marketInfo.vP) + '</span></td>\
                     <td><span class="o-txA">' + obj.scienceToNum(data.TxAmount, tobj.marketInfo.vP) + '</span></td>\
                     <td><a href="javascript:;" data-id="' + data.Id + '" data-type="1" data-order="' + data.OrderType + '">' + $.t("revocation") + '</a></td>\
                  </tr>';
                }
                $(selector).find('tbody').prepend(html);
            }
            tobj.table = $('.order-table').eq(index);
            $('.order-tab>li').eq(index).addClass('on').siblings().removeClass('on');
            $('.order-table').eq(index).addClass('on').siblings().removeClass('on');
            if (0 == tobj.table.find('tr').length) {
                $('.isNull').eq(0).addClass('show');
            } else {
                $('.isNull').eq(0).removeClass('show');
            }
            tobj.getWidth();
            //tobj.getOrderInterval();
        },
        // 撤销订单
        cancelOrder: function () {
            obj.ajaxFn('/order/CancelOrder', {
                data: tobj.cancelObj,
                callback: function (res) {
                    var type = tobj.cancelObj.category,
                        msg = '';
                    if (res.IsSuccess) {
                        if (1 == type) {
                            $('#limit-table>tbody>tr').each(function () {
                                var _id = $(this).find('a').attr('data-id');
                                if (tobj.cancelObj.orderId == _id) {
                                    $(this).remove();
                                    return false;
                                }
                            });
                        } else {
                            $('#plan-table>tbody>tr').each(function () {
                                var _id = $(this).find('a').attr('data-id');
                                if (tobj.cancelObj.orderId == _id) {
                                    $(this).remove();
                                    return false;
                                }
                            });
                        }
                        //tobj.getOrderList(type);
                        tobj.getMarket();
                        //obj.modHide('#mod-buz');
                    } else {
                        if (1002 == res.Code) {
                            msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
                            obj.getTips($('#input-pwd'), msg);
                        } else {

                            msg = res.ErrorMsg || $.t('cancellation');
                            if ($('#mod-buz').hasClass('show')) {
                                $('#mod-buz .error-tips').html(msg);
                            } else {
                                obj.hideTips(msg, 'green');
                            }
                        }
                    }
                }
            });
        },
        // 批量撤销订单
        cancelAllOrder: function () {
            obj.ajaxFn('/order/CancelAllOrder', {
                data: tobj.cancelAllObj,
                callback: function (res) {
                    var type = tobj.cancelAllObj.orderCategory,
                        msg = '';
                    if (res.IsSuccess) {
                        //tobj.getOrderList(type);
                        $('.order-table.on>tbody').empty();

                        $('.isNull').eq(0).addClass('show');
                        tobj.getMarket();
                    } else {
                        if (1002 == res.Code) {
                            msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
                            obj.getTips($('#input-pwd'), msg);
                        } else {
                            msg = res.ErrorMsg || $.t('cancellation');
                            $('#mod-buz .error-tips').html(msg);
                        }
                    }
                }
            });
        },
        // 获取参数
        changeMarketParam: function () {
            var $span = $('.about-list>li>span.on');
            // tobj.marketObj.key = $span.eq(0).text()+'-'+$span.eq(1).text();
            tobj.marketObj.limit = $span.eq(0).text();
            tobj.marketObj.precision = $span.eq(1).text();
            tobj.marketObj.count = 14; //$span.eq(2).text();
        },
        // 展示币种市场
        showCurrencyMarket: function (list, sign) {
            var sel = '#' + (sign || 'eth') + '-table>tbody',
                html = '',
                $tr = null,
                inserts = null;
            if (list instanceof Array) {
                //if(0==tobj.marketObj.collect){
                //tobj.getMarketCollect(function(res){
                var /*collect = [],*/ mkArr = [],
                    list2 = [],
                    list3 = tobj.otherMarkerIdsZH,
                    dsign, day_price = 0,
                    day_rate = 0,
                    dhtml = '',
                    lang = localStorage.getItem('i18next_lng');

                //if(res.IsSuccess){
                //collect = ['cny_btc']//||res.Data;
                //}
                if ('en' == lang) {
                    var _mediums = [tobj.mediums.bUsdt, tobj.mediums.eUsdt];
                } else {
                    var _mediums = [tobj.mediums.bCny, tobj.mediums.eCny];
                }
                for (var i = 0; i < list.length; i++) {
                    mkArr = (list[i].MarketId).split('_');
                    if (tobj.currencyObj.target === mkArr[1]) {
                        // if ('D1' == list[i].FrequencyKey) {
                            if (list[i].Amount) {
                                $('.day-amount').text(obj.getFloatValue(list[i].Amount, 2));
                            } else {
                                $('.day-amount').text(0);
                            }
                            if (list[i].Volume) {
                                $('.day-volume').text(obj.getFloatValue(list[i].Volume, 2));
                            } else {
                                $('.day-volume').text(0);
                            }
                            $('#heightPrice').text(list[i].HighPrice);
                            $('#lowPrice').text(list[i].LowPrice);
                        // }
                        day_price = list[i].ClosedPrice || 0; //obj.getFloatValue(((list[i].ClosedPrice||0)-(list[i].OpenPrice||0)),3);
                        // list[i].dayDiff=($('.current-price').text()||0)-(list[i].OpenPrice||0);
                        // day_rate = (0!=list[i].OpenPrice?obj.getFloatValue(list[i].dayDiff/list[i].OpenPrice*100,2):0);
                        day_rate = (0 != list[i].OpenPrice ? obj.getFloatValue((list[i].ClosedPrice - list[i].OpenPrice) / list[i].OpenPrice * 100, 2) : 0);
                        day_rate = Number.isNaN(day_rate) ? 0 : day_rate;
                        if (day_rate >= 0) {
                            dsign = '+' + (Number.isNaN(day_rate) ? 0 : day_rate + '%');
                            // dhtml=day_price+'<i class="icon icon-rise"></i>';
                            dhtml = day_price;
                            $('.priceTrend').addClass('red').removeClass('green');
                            /*dhtml=(Number.isNaN(day_price)?'--':day_price+'<i class="icon icon-down3"></i>');
                            $('.priceTrend').addClass('green').removeClass('red');*/
                        } else {
                            dsign = (Number.isNaN(day_rate) ? '-' : day_rate + '%');
                            // dhtml=day_price+'<i class="icon icon-fall"></i>';
                            dhtml = day_price;
                            $('.priceTrend').addClass('green').removeClass('red');
                            /*dhtml=(Number.isNaN(day_price)?'--':day_price+'<i class="icon icon-down8"></i>');
                            $('.priceTrend').addClass('red').removeClass('green');*/
                        }
                        if (0 === list[i].OpenPrice) {
                            dsign = '0%';
                        }
                        // if ('D1' == list[i].FrequencyKey) {
                            //_diff=(tobj.timeObj.ed1-tobj.timeObj.st1)/1000;
                            //if(0>_diff||1<_diff){
                            if (tobj.marketId.split('_')[0] == list[i].MarketId.split('_')[0]) {
                                $('.day-price').html(dhtml);
                                tobj.timeObj.ed1 = new Date().getTime();
                                $('.day-rate').html(dsign);
                                var _baseId = list[i].MarketId.split('_')[0];
                                if ('mbtc' == _baseId || 'eth' == _baseId) {
                                    $('.conversion').text(('en' == lang ? "$" : "¥") + obj.getFloatValue1(list[i].ClosedPrice * ('mbtc' == _baseId ? _mediums[0] : _mediums[1]), 2))
                                }
                            }
                            //}   
                        // }
                        // console.log('list3.length',list3);
                        for (var j = 0; j < list3.length; j++) {
                            if (tobj.currencyObj.target == list3[j].TargetId) {
                                $('.right-top .icon2').addClass('icon-' + list3[j].TargetId);
                                $('.icon-zn').text(list3[j].TargetName.toUpperCase());
                                $('.buyType').text((list3[j].TargetId).toUpperCase());
                                break;
                            }
                        }
                        //交易页title
                        // var title_content = tobj.marketId.split('_').join('/').toUpperCase()+tobj.marketPrice;
                        var title_content = (tobj.marketId.split('_')[0].toUpperCase() + '/' + tobj.currencyObj.target).toUpperCase() + day_price;
                        $('title').text((tobj.currencyObj.base && tobj.currencyObj.target && day_price) ? title_content : $.t('trade_page'));
                    }
                    if (tobj.currencyObj.base === mkArr[0]) {
                        var _clz = 'green',
                            /*_sign = '<i class="icon icon-unstar" data-market="'+list[i].MarketId+'"></i>',*/ $tr = $(sel).find('tr[data-type="' + mkArr[1] + '"]'),
                            // _HL = (0!==list[i].OpenPrice?obj.getFloatValue((($('.current-price').text()||0)-(list[i].OpenPrice||0))/list[i].OpenPrice*100,2):0),$td=$tr.find('td');
                            _HL = (0 != list[i].OpenPrice ? obj.getFloatValue((list[i].ClosedPrice - list[i].OpenPrice) / list[i].OpenPrice * 100 || 0, 2) : 0),
                            $td = $tr.find('td');
                        _HL = Number.isNaN(_HL) ? 0 : _HL;
                        list[i].dayDiff = ($('.current-price').text() || 0) - (list[i].OpenPrice || 0);
                        list[i].dayRate = _HL;
                        if (_HL >= 0) {
                            /*if(_HL!=0){
                               _HL = '+'+_HL;
                            }*/
                            _clz = 'red';
                        }
                        var val = '',
                            $tr;
                        $(sel).find('tr').each(function () {
                            var that = $(this);
                            if (mkArr[1].toUpperCase() == that.find('td').eq(1).text()) {
                                $tr = that;
                                val = $tr.find('td').eq(4).text();
                                return false;
                            }
                        });
                        if (-1 != val.indexOf('%')) {
                            val = val.substr(0, val.indexOf('%'));
                        }
                        if (_HL >= 0) {
                            $tr.removeClass().addClass('red up');
                            _HL = '+' + _HL + '%';
                        } else {
                            $tr.removeClass().addClass('green down');
                            _HL = _HL + '%';
                        }
                        /*list[i].collect = false;
                        if(collect.indexOf(list[i].MarketId)!=-1){
                           _sign = '<i class="icon icon-star" data-market="'+list[i].MarketId+'"></i>';
                           list[i].collect = true;
                        }*/

                        /*html += '<tr '+_clz+'>\
                                    <td>'+_sign+'</td>\
                                    <td><a href="./trade.html?marketId='+list[i].MarketId+'" target="_blank">'+(list[i].MarketId).split('_')[1].toUpperCase()+'</a></td>\
                                    <td>￥'+list[i].ClosedPrice+'</td>\
                                    <td>'+obj.getFloatValue(list[i].Amount,2)+'</td>\
                                    <td>'+_HL+'%</td>\
                                 </tr>';*/
                        $tr.addClass(_clz);
                        $td.eq(2).html(list[i].ClosedPrice || 0);
                        // $td.eq(3).html('￥'+list[i].dayDiff);
                        $td.eq(3).html(list[i].Amount ? obj.getFloatValue(list[i].Amount, tobj.marketInfo.bsP) : 0);
                        $td.eq(4).html(_HL);
                        setTimeout(function () {
                            $tr.removeClass('up down');
                        }, 1000);
                        list2.push(list[i]);
                    }
                }
                //tobj.marketObj[sign.substr(0,1)+'list'] = list2;
                tobj.marketObj[sign] = list2;

                //$(sel).html(html);
                $tr = $(sel).find('tr');
                $tr.each(function () {
                    var that = $(this);
                    if (0 == that.find('td>i.icon-star').length) {
                        inserts = that;
                        return false;
                    }
                });
                $tr.each(function () {
                    var that = $(this);
                    if (0 != that.find('td>i.icon-star').length) {
                        that.insertBefore(inserts);
                    }
                    if (tobj.currencyObj.target == that.data('type')) {

                        that.addClass('cur');
                    }
                });
                //});
                //}
                tobj.marketObj.collect = 1;
            }
        },
        // 显示筛选后列表
        showFilterCurrencyMarket: function (that, sign) {
            var list = [],
                item = [],
                sel = '',
                html = '',
                _val = that ? that.val().trim() : '';
            list = tobj.marketObj[sign] || [];
            item = tobj.otherMarkerIdsZH;
            /*if(sign =='first'){
               list = tobj.marketObj.clist;
            }else if(sign =='second'){
               list = tobj.marketObj.blist;
            }else if(sign == 'third'){
               list = tobj.marketObj.elist;
            }else if(sign == 'fourth'){
               list = tobj.marketObj.alist;
            }*/
            sel = '#' + sign + '-table>tbody';
            for (var i = 0; i < list.length; i++) {
                if ((list[i].MarketId).indexOf(_val) != -1) {
                    var _clz = 'red',
                        _sign = '<i class="icon icon-unstar" data-market="' + list[i].MarketId + '"></i>',
                        // _HL = (0!==list[i].OpenPrice?obj.getFloatValue((($('.current-price').text()||0)-(list[i].OpenPrice||0))/list[i].OpenPrice*100,2):0);
                        _HL = (0 != list[i].OpenPrice ? obj.getFloatValue((list[i].ClosedPrice - list[i].OpenPrice) / list[i].OpenPrice * 100, 2) : 0);
                    if (_HL >= 0) {
                        if (_HL != 0) {
                            _HL = '+' + _HL;
                        }
                        _clz = 'red';
                    } else {
                        _clz = 'green';
                    }
                    for (var j = 0; j < item.length; j++) {
                        if (list[i].MarketId == item[j].Id) {
                            list[i].collect = item[j].collect;
                        }
                    }
                    if (list[i].collect) {
                        _sign = '<i class="icon icon-star" data-market="' + list[i].MarketId + '"></i>';
                    }
                    html += '<tr data-type="' + list[i].TargetId.toLowerCase() + '" class="' + _clz + ' ' + ((tobj.currencyObj.target == list[i].TargetId.toLowerCase()) ? 'cur' : '') + '">\
                           <td>' + _sign + '</td>\
                           <td>' + (list[i].MarketId).split('_')[1].toUpperCase() + '</td>\
                           <td>' + (list[i].ClosedPrice || 0) + '</td>\
                           <td>' + (obj.getFloatValue(list[i].Amount || 0, tobj.marketInfo.bsP) || 0) + '</td>\
                           <td>' + (Number.isNaN(_HL) ? 0 : _HL) + '%</td>\
                        </tr>';
                } else {
                    continue;
                }
            }
            $(sel).html(html);
        },
        // 仅显示收藏列表
        onlyCollect: function (type, sign) {
            var list = [],
                sel = '',
                html = '',
                item = tobj.otherMarkerIdsZH;
            list = tobj.marketObj[sign] || [];
            sel = '#' + sign + '-table>tbody';
            for (var i = 0; i < list.length; i++) {
                var _clz = 'red',
                    _sign = '<i class="icon icon-unstar" data-market="' + list[i].MarketId + '"></i>',
                    // _HL = (0!==list[i].OpenPrice?obj.getFloatValue((($('.current-price').text()||0)-(list[i].OpenPrice||0))/list[i].OpenPrice*100,2):0);
                    _HL = (0 != list[i].OpenPrice ? obj.getFloatValue((list[i].ClosedPrice - list[i].OpenPrice) / list[i].OpenPrice * 100, 2) : 0);
                if (_HL >= 0) {
                    if (_HL != 0) {
                        _HL = '+' + _HL;
                    }
                    _clz = 'red';
                } else {
                    _clz = 'green';
                }
                for (var j = 0; j < item.length; j++) {
                    if (list[i].MarketId == item[j].Id) {
                        list[i].collect = item[j].collect;
                    }
                }
                if (!list[i].collect) {
                    continue;
                }
                if (list[i].collect) {
                    _sign = '<i class="icon icon-star" data-market="' + list[i].MarketId + '"></i>';
                }
                html += '<tr data-type="' + list[i].TargetId.toLowerCase() + '" class="' + _clz + ' ' + ((tobj.currencyObj.target == list[i].TargetId.toLowerCase()) ? 'cur' : '') + '">\
                           <td>' + _sign + '</td>\
                           <td>' + (list[i].MarketId).split('_')[1].toUpperCase() + '</td>\
                           <td>' + (list[i].ClosedPrice || 0) + '</td>\
                           <td>' + (obj.getFloatValue(list[i].Amount || 0, tobj.marketInfo.bsP) || 0) + '</td>\
                           <td>' + (Number.isNaN(_HL) ? 0 : _HL) + '%</td>\
                        </tr>';
            }
            $(sel).html(html);
        },
        // 设置市场标记
        setMarketSign: function () {
            var type = tobj.marketId.toUpperCase().split('_');
            $('.baseType').text(type[0]);
            $('.buyType').text(type[1]);
            $('.buy-recharge').prop('href', './transaction.html?type=recharge&mkid=' + type[1]);
            $('.base-recharge').prop('href', './transaction.html?type=recharge&mkid=' + type[0]);
            $('.more-order').prop('href', './trade-order.html?marketid=' + tobj.marketId);
        },
        // 获取挂单定时器
        getOrderInterval: function () {
            var that = $('.order-tab>li.on'),
                index = that.index();
            clearInterval(tobj.timer);
            tobj.timer = setInterval(function () {
                if (0 === index) {
                    tobj.getOrderList();
                } else {
                    tobj.getOrderList(2);
                }
            }, 1000 * 30);
        },
        // 设置交易密码类型
        setTradePwdType: function (that, data) {
            obj.ajaxFn('/user/SetTradePwdType', {
                data: data,
                callback: function (res) {
                    var msg = '',
                        $modify = that.find('#to-modify'),
                        $btn = that.find('#to-addr'),
                        $error = that.find('.error-tips'),
                        $closeBuz = that.find('.close-buzPwd'),
                        tip = that.find('.buz-tips').eq(0),
                        tip2 = that.find('.buz-tips').eq(1);
                    if (res.IsSuccess) {
                        $modify.addClass('hide');
                        $btn.removeClass('hide');
                        $error.addClass('hide');
                        $closeBuz.addClass('hide');
                        tip.addClass('hide');
                        tip2.removeClass('hide');
                        obj.hideTips($.t('modify_success'));
                        $('#to-addr').trigger('click');
                    } else {
                        tip.removeClass('hide');
                        tip2.addClass('hide');
                        if (133 == res.Code) {
                            msg = $.t('trade_error');
                            $error.html(msg).removeClass('hide');
                        }
                    }
                    $modify.prop('disabled', false);
                }
            });
        },
        // 保存订单数据状态
        saveOrderStatus: function (opts) {
            tobj.orderData.data = opts.data;
            tobj.orderData.that = opts.form;
            tobj.orderData.type = opts.type;
            tobj.orderData.sign = opts.sign;
        },
        // 右侧tab列表
        rightTabList: function () {
            var list = tobj.targetList,
                i = 0,
                $tab = $('.s-tab'),
                html = '';
            for (i; i < list.length; i++) {
                if (i == 0) {
                    html += '<li id="' + list[i] + '" class="active">' + list[i].toUpperCase() + '</li>';
                } else {
                    html += '<li id="' + list[i] + '">' + list[i].toUpperCase() + '</li>';
                }
            }
            $tab.html(html);
        },
        // 焦点不改变市场价
        changePrice: function (price) {
            if ('1' == $('#buy-price').attr('data-f')) {
                $('#buy-price').val(price);
            }
            if ('1' == $('#sell-price').attr('data-f')) {
                $('#sell-price').val(price);
            }
            if ('1' == $('#limit-min-buy-price').attr('data-f')) {
                $('#limit-min-buy-price').val(price);
            }
            if ('1' == $('#limit-min-sell-price').attr('data-f')) {
                $('#limit-min-sell-price').val(price);
            }
        },
        //基币市场的显示
        baseIdShow: function () {
            var _baseId = tobj.marketId.split('_')[0];
            $('.s-tab>li').removeClass('active');
            $('#' + _baseId).addClass('active');
        },
        // 触发ws
        initWS: function () {
            protobuf.load("../js/proto_market.json", function (err, root) {
                tobj.StartWS(root);
            });
        },
        //获取mbtc，eth价格
        getBitcnyMbtcPrice: function () {
            obj.ajaxFn('/market/GetBitcnyMbtcPrice', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.mediums.bCny = res.Data;
                    }
                }
            });
        },
        getBitcnyEthPrice: function () {
            obj.ajaxFn('/market/GetBitcnyEthPrice', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.mediums.eCny = res.Data;
                    }
                }
            });
        },
        getUsdtMbtcPrice: function () {
            obj.ajaxFn('/market/GetUsdtMbtcPrice', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.mediums.bUsdt = res.Data;
                    }
                }
            });
        },
        getUsdtEthPrice: function () {
            obj.ajaxFn('/market/GetUsdtEthPrice', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.mediums.eUsdt = res.Data;
                    }
                }
            });
        },
        //获取k线服务器时间
        getServerTime: function () {
            obj.ajaxFn('/Common/GetServerTime', {
                callback: function (res) {
                    if (res.IsSuccess) {
                        tobj.serverTime = parseInt(res.Data);
                    }
                }
            });
        },
        //存储basicId
        // setBasicId: function(){
        //    var _baseId = location.search.split('=')[1].split('_')[0];
        //    se
        // }
    };
    // localStorage.setItem('marketId',location.search.split('=')[1].split('_')[0]);
    $('.table-box .coin-table').removeClass('show');
    $('#' + location.search.split('=')[1].split('_')[0] + '-table').addClass('show');
    tobj.marketId = (tobj.getParam && tobj.getParam.marketid) ? tobj.getParam.marketid : 'mbtc_eth';
    //新k
	tobj.datafeed = new Datafeeds.UDFCompatibleDatafeed(tobj.klineStore,tobj.marketId,Math.pow(10,tobj.marketObj.precision),tobj.serverTime);

    $('.form-box input[type=text]').each(function () {
        var that = $(this);
        that.val(0);
    });
    if ('en' == localStorage.getItem('i18next_lng')) {
        // var _market = location.search.split('=')[1].split('_')[0]
        if ('mbtc' == tobj.basicId) {
            tobj.getUsdtMbtcPrice();
            setInterval(function () {
                tobj.getUsdtMbtcPrice();
            }, 5000)
        } else if ('eth' == tobj.basicId) {
            tobj.getUsdtEthPrice();
            setInterval(function () {
                tobj.getUsdtEthPrice();
            }, 5000)
        }
    } else {
        if ('mbtc' == tobj.basicId) {
            tobj.getBitcnyMbtcPrice();
            setInterval(function () {
                tobj.getBitcnyMbtcPrice();
            }, 5000)
        } else if ('eth' == tobj.basicId) {
            tobj.getBitcnyEthPrice();
            setInterval(function () {
                tobj.getBitcnyEthPrice();
            }, 5000)
        }
    }
    // tobj.getBitcnyMbtcPrice();
    // tobj.getBitcnyEthPrice();
    // tobj.getUsdtMbtcPrice();
    // tobj.getUsdtEthPrice();
    // setInterval(function(){
    //    tobj.getBitcnyMbtcPrice();
    //    tobj.getBitcnyEthPrice();
    //    tobj.getUsdtMbtcPrice();
    //    tobj.getUsdtEthPrice();
    // },5000);
    tobj.getServerTime();
    tobj.rightTabList();
    tobj.initWS();
    tobj.setMarketSign();
    tobj.baseIdShow();
    if (obj.sign) {
        tobj.getUserInfo();
    }

    tobj.currencyObj = {
        target: (tobj.marketId).substr((tobj.marketId).indexOf('_') + 1),
        base: tobj.basicId
    };
    if (obj.sign) {
        tobj.getLoginCookie();
        tobj.getTargetMarketList();
        //tobj.getCurrencyList();
        tobj.getMarketNotice();
        //tobj.getNewsList();
        tobj.getOrderList();
        tobj.getMarket();
        tobj.scrolls();
    } else {
        $('.chat-box .chat-input').eq(0).removeClass('show');
        $('.not-login').addClass('show');
    }

    $(window).resize(function () {
        var w = $(window).width();
        if (tobj.wWidth != w) {
            if (0 < $('.order-title').length) {
                tobj.getWidth();
                tobj.wWidth = w;
            }
        }
    });
    $(window).on('click', function () {
        // 关闭市场下拉列表
        var $tl = $('.top-list');
        if ($tl.hasClass('show')) {
            $tl.removeClass('show');
        }
    });
    //市场
    $('.current-market').text(tobj.marketId.split('_')[0].toUpperCase());

    // 关闭公告
    $('.notice-top').on('click', '>.icon-close2', function () {
        $(this).parent().addClass('hide');
    });

    // 市场选择
    $('.left-top').on('click', function (e) {
        e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
    });
    $('.left-top').on('click', '>label', function () {

        var $tl = $(this).next('.top-list');
        if (0 != $tl.find('li').length) {
            if ($tl.hasClass('show')) {
                $tl.removeClass('show');
            } else {
                $tl.addClass('show');
            }
        }
    });

    // 买卖数据展示切换
    /*$('.sort-list').on('click','>li',function(){
       var that = $(this),
          index = that.index(),
          $items = that.closest('.m-items'),
          $order = $('.m-order'),
          $table = $('.buz-table'),
          $list = $('.about-box>.about-list.show'),
          $span = $list.find('li').eq(0).find('span.on');

       if(!that.hasClass('on')){
          that.addClass('on').siblings().removeClass('on');
          $list.removeClass('show').siblings().addClass('show');
          $list = $('.about-box>.about-list.show');
          $span = $list.find('li').eq(0).find('span.on');
          if(0<index){
             $table.eq(0).removeClass('show');
             $table.eq(1).removeClass('show');
             $('.current-price').addClass('hide');
             $table.eq(2).addClass('show');
             if(20<=$span.text()){
                $items.addClass('rows');
                $order.addClass('cols');
             }else{
                $items.removeClass('rows');
                $order.removeClass('cols');
             }
          }else{
             $table.eq(0).addClass('show');
             $table.eq(1).addClass('show');
             $('.current-price').removeClass('hide');
             $table.eq(2).removeClass('show');
             if(10<=$span.text()){
                $items.addClass('rows');
                $order.addClass('cols');
             }else{
                $items.removeClass('rows');
                $order.removeClass('cols');
             }
          }
          tobj.getWidth();
       }
    });*/

    // 选择档位/明细
    $('.about-box').on('click', '>.about-list>li>span', function () {
        var that = $(this),
            index = that.index(),
            _sign = parseInt(that.parent().attr('data-sign')),
            $item = $('.m-items:nth-child(4)'),
            $order = $('.m-order');

        if (!that.hasClass('on')) {
            that.addClass('on').siblings().removeClass('on');
            if (1 === _sign) {
                if (1 < index) {
                    $item.addClass('rows');
                    $order.addClass('cols');
                } else {
                    $item.removeClass('rows');
                    $order.removeClass('cols');
                }
            } else if (3 === _sign) {
                if (1 < index) {
                    $item.addClass('rows');
                    $order.addClass('cols');
                } else {
                    $item.removeClass('rows');
                    $order.removeClass('cols');
                }
            }
            if ($('#limit-table').hasClass('active')) {
                tobj.table = $('#limit-table');
            }
            if ($('#plan-table').hasClass('active')) {
                tobj.table = $('#plan-table');
            }
            tobj.changeMarketParam();
            tobj.getWidth();
        }
    });

    // 挂单切换
    $('.order-tab').on('click', '>li', function () {
        var that = $(this),
            $login = $('.not-login'),
            index = that.index(),
            $title = null,
            $table = null;
        if (that.hasClass('on')) {
            return false;
        } else {
            if (2 != index) {
                that.addClass('on').siblings('li').removeClass('on');
                $title = $('.order-title').eq(index);
                $table = $('.tables-box table').eq(index);
                $title.addClass('on').siblings('.order-title').removeClass('on');
                $table.addClass('on').siblings('table').removeClass('on');
                tobj.table = $table;
                tobj.getWidth();
                if (!$login.hasClass('show') && 0 == $table.find('tr').length) {
                    tobj.getOrderList(0 == index ? null : 2);
                    /*if(0==index){
                       tobj.getOrderList();
                    }else if(1==index){
                       tobj.getOrderList(2);
                    }*/
                    //tobj.getOrderInterval();
                }
            }
        }
        if (0 == $('.order-table.on').find('tr').length) {
            $('.isNull').eq(0).addClass('show');
        } else {
            $('.isNull').eq(0).removeClass('show');
        }
    });
    $('.items-body').on('click', '>.body-tab>li', function () {
        var that = $(this),
            index = that.index(),
            $forms = that.parent().next('.forms-box'),
            $box = $forms.find('.form-box').eq(index),
            $sp = $forms.find('.service-price'),
            $btn = that.closest('.items-body').next('.submit-btn'),
            $sbtn = that.closest('.items-body').find('.scale-btn');
        if (that.hasClass('active')) {
            return false;
        } else {
            that.addClass('active').siblings('li').removeClass('active');
            $box.addClass('show').siblings('.form-box').removeClass('show');
            if (0 === index) {
                $btn.removeClass('thetwo').addClass('theone');
            } else {
                $btn.removeClass('theone thetwo');
                if (2 === index) {
                    $btn.addClass('thetwo');
                }
            }
            /*$box2.each(function(){
               var that = $(this);
               that.find('input[type=text]').not('#buy-price,#limit-max-buy-price,#sell-price,#limit-max-sell-price').val(0);
            });*/
            if (0 == index || 2 == index) {
                $sp.find('.price_1th').removeClass('hide');
                $sp.find('.price_2th').addClass('hide');
            } else if (1 == index) {
                $sp.find('.price_1th').addClass('hide');
                $sp.find('.price_2th').removeClass('hide');
            }
            Scroll.value = 0;
            Scroll.lightFn($sbtn, 0);
        }
    });
    // $('.scale-btn').on('mousedown',function(e){
    //    Scroll.flag = true;
    //    var that = $(this);
    //    $(document.body).on('mousemove',function(e){
    //       e = e || window.event;
    //       e.stopPropagation();
    //       e.preventDefault();

    //       if(Scroll.flag){
    //          var $left = that.closest('.scale-width').find('.scale-line').offset().left,
    //             currentValue = e.clientX-$left,
    //             maxW = $('.scale-line').width()-12;
    //          if( currentValue >= maxW){
    //             currentValue = maxW;
    //          }else if(currentValue <0){
    //             currentValue = 0;
    //          }else if(currentValue<12){
    //             currentValue=12;
    //          }
    //          Scroll.value = Math.round(100 *((currentValue)/maxW));
    //          //Scroll.lightFn(that,currentValue);
    //          Scroll.lightFn(that,Scroll.value);
    //          tobj.getNumFromScale(that);
    //       }
    //    });
    // });
    // $(document.body,'.scale-btn').on('mouseup',function(e){
    //    Scroll.flag = false;
    //    $(document.body).unbind('mousemove');
    // });

    // // 条形比率选择
    // $('.scale-line').on('click',function(e){
    //    e = e || window.event;
    //    var $p = $(this).closest('.scale-width'),
    //       $btn = $p.find('.scale-btn'),
    //       maxW = $(this).width()-12,
    //       scale = e.clientX-$(this).offset().left,
    //       val = 0;
    //    if(scale >= maxW){
    //       scale = maxW;
    //    }else if(scale < 0){
    //       scale = 0;
    //    }
    //    val = Math.round(100 *((scale)/maxW));
    //    Scroll.value = val;
    //    //Scroll.lightFn($btn,scale);
    //    Scroll.lightFn($btn,val);
    //    tobj.getNumFromScale($btn);
    // });
    // $('.scale-highlight').on('click',function(e){
    //    e = e || window.event;
    //    var $p = $(this).closest('.scale-width'),
    //       $btn = $p.find('.scale-btn'),
    //       maxW = $(this).prev().width()-12,
    //       scale = e.clientX-$(this).offset().left,
    //       val = 0;
    //    if(scale >= maxW){
    //       scale = maxW;
    //    }else if(scale < 0){
    //       scale = 0;
    //    }
    //    val = Math.round(100 *((scale)/maxW));
    //    Scroll.value = val;
    //    Scroll.lightFn($btn,val);
    //    tobj.getNumFromScale($btn);
    // });
    //鼠标拖拽小球运动路线
    $('.scale-btn').on('mousedown', function (e) {
        var that = $(this),
            x = e.clientX,
            y = e.clientY,
            btn_left = $(this).position().left;

        $(document.body).on('mousemove', function (e) {
            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();

            var
                _x = e.clientX - x,
                maxW = $('.scale-line').width() - 12,

                $prev = that.prev(),
                $next = that.next(),
                $list = that.closest('.scale-width').find('.scale-line>li'),
                count = 0,
                l = _x + btn_left,
                left = Math.round(l / maxW * 100);
            //鼠标滑动了多少除以总的宽度 得到小数百分比，乘以100变成整数进行四舍五入；

            if (l > maxW) {
                l = maxW;
            }
            if (l < 0) {
                l = 0;
            }
            if (0 <= left) {
                count = 1;
            }
            if (25 <= left) {
                count = 2;
            }
            if (50 <= left) {
                count = 3;
            }
            if (75 <= left) {
                count = 4;
            }
            if (100 <= left) {
                count = 5;
            }
            if (left <= 0) {
                left = 0;
            }
            if (left >= 100) {
                left = 100;
            }

            $list.each(function () {
                $(this).removeClass('active');
            });
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    $list.eq(i).addClass('active');
                }
            }
            that.css('left', l);
            $next.find('span').text(left);
            $prev.width(l);
            tobj.getNumFromScale(that);
        });
    });
    $(document.body, '.scale-btn').on('mouseup', function (e) {
        $(document.body).unbind('mousemove');
    });
    //点击切换百分比操作
    $('.scale-line').on('click', function (e) {
        e = e || window.event;
        var liNode = e.target.parentNode.getElementsByTagName('li'),
            $p = $(this).closest('.scale-width'),
            $btn = $p.find('.scale-btn'),
            that = $(this).prev();

        if (e.target.nodeName.toLowerCase() == 'li') {
            var target = e.target;

            for (var i = 0; i < liNode.length; i++) {
                liNode[i].className = ''

            }
            for (var i = 0; i < liNode.length; i++) {
                liNode[i].className = 'active';
                if (liNode[i] == target) {
                    break;
                }

            }
            target.className = 'active';
            var indexVal = e.target.getAttribute('data-scale');
            var left = e.target.offsetLeft;

            $(this).next().next().css('left', left + 'px')
            $(this).next().next().next().find('span').html(indexVal)
            $(this).next().css('width', left + 'px')
        } else {
            for (var i = 0; i < liNode.length; i++) {
                liNode[i].className = ''

            }
            $(this).next().css('width', e.offsetX + 'px')
            $(this).next().next().css('left', e.offsetX + 'px')
            var bfb = e.offsetX / ($('.scale-line').width() - 12);
            $(this).next().next().next().find('span').html(Math.round(bfb * 100))

            for (var i = 0; i < liNode.length; i++) {

                if (Number(liNode[i].getAttribute('data-scale')) <= bfb * 100) {
                    liNode[i].className = 'active'
                }
            }

        }

        tobj.getNumFromScale($btn);
    });

    $('.scale-highlight').on('click', function (e) {

        $(this).prev().find('li').removeClass('active');

        $(this).css('width', e.offsetX + 'px')
        $(this).next().css('left', e.offsetX + 'px')
        var bfb = e.offsetX / ($('.scale-line').width() - 12);
        $(this).next().next().find('span').html(Math.round(bfb * 100))

        var liNode = $(this).prev().find('li'),
            that = $(this).next(),
            $p = $(this).closest('.scale-width'),
            $btn = $p.find('.scale-btn');

        for (var i = 0; i < liNode.length; i++) {

            if (Number(liNode.eq(i).attr('data-scale')) <= bfb * 100) {
                liNode.eq(i).addClass('active');
            }
        }
        tobj.getNumFromScale($btn);
    })

    // 收藏/取消收藏
    $('.coin-table').on('click', '>tbody>tr', function (e) {
        e = e || window.event;
        var that = $(e.target),
            $tr = $(this),
            marketId = '';
        if ($(e.target).hasClass('icon')) {
            if (obj.flag) {
                marketId = that.attr('data-market');
                if (that.hasClass('icon-star')) {
                    tobj.cancelMarketCollect(marketId);
                    that.removeClass('icon-star').addClass('icon-unstar');
                } else {
                    tobj.toCollect(marketId);
                    that.removeClass('icon-unstar').addClass('icon-star');
                }
            } else {
                obj.modShow('#mod-prompt');
                $('#mod-prompt .tips-txt').html($.t('log_first'));
            }
        } else {
            marketId = ($('.s-tab>li.active').text() + '_' + $tr.data('type')).toLowerCase();
            $('.table-box').append('<a href="./trade.html?marketid=' + marketId + '" id="link-attr"></a>');
            $('#link-attr')[0].click();
            $('#link-attr').remove();
        }
    });

    // 仅显示收藏
    $('.s-search').on('click', '>input', function () {
        var _type = parseInt($(this).attr('data-type')),
            _sign = $('.s-tab>.active').text().toLowerCase(),
            _attr = $(this).attr('data-sign');
        if (1 == _attr) {
            $(this).attr('data-sign', '2');
        } else {
            $(this).attr('data-sign', '1');
        }
        if (1 == _attr) {
            tobj.onlyCollect(_type, _sign);
        } else {
            tobj.showFilterCurrencyMarket(null, _sign);
        }
    });
    // 筛选币种
    $('.box-search').on('input', '#input-search', function () {
        var that = $(this),
            _sign = $('.s-tab>.active').text().toLowerCase(),
            _id = that.closest('.s-search').next().find('.coin-table.show').prop('id');
        $('.icon-starlist').attr('data-type', 1);
        setTimeout(function () {
            _id = _id.substr(0, _id.indexOf('-'));
            //tobj.showFilterCurrencyMarket(that,_id);
            tobj.showFilterCurrencyMarket(that, _sign);
        }, 500);
    });

    /*$('#input-chat').on('keypress',function(e){
       e = e || window.event;
       var val = $(this).val(),name = '匿名';
       val.trim();
       if(e.keyCode && 13==e.keyCode) || (e.which && 13==e.which) && !!val){
          
          tobj.getChatList([{type: 2,name: '匿名',txt: $(this).val()}]);
          tobj.scrolls();
          $(this).val('');
       }
    });*/

    // 获取订单数据
    $('.m-items').on('click', '.submit-btn', function () {
        var _sign = $(this).attr('data-sign'),
            data = {},
            $form = $(this).prev().find('.form-box.show'),
            _type = parseInt($form.attr('data-type')),
            _dir = parseInt($(this).prev().find('.group-direction>li.on').attr('data-sign')),
            buy_price = $('#buy-price').val() || 0,
            buy_num = parseFloat($('#buy-num').val() || 0),
            buy_order = parseFloat($('#buy-order').val() || 0),
            buy_hTPrice = parseFloat($('#buy-hTPrice').val() || 0),
            buy_hOPrice = parseFloat($('#buy-hOPrice').val() || 0),
            buy_bTPrice = parseFloat($('#buy-bTPrice').val() || 0),
            buy_bOPrice = parseFloat($('#buy-bOPrice').val() || 0),
            buy_limit_max_price = parseFloat($('#limit-max-buy-price').val() || 0),
            buy_limit_min_price = parseFloat($('#limit-min-buy-price').val() || 0),
            buy_limit_num = parseFloat($('#limit-buy-num').val() || 0),
            sell_price = $('#sell-price').val() || 0,
            sell_num = parseFloat($('#sell-num').val() || 0),
            sell_order = parseFloat($('#sell-order').val() || 0),
            sell_hTPrice = parseFloat($('#sell-pTPrice').val() || 0),
            sell_hOPrice = parseFloat($('#sell-pOPrice').val() || 0),
            sell_bTPrice = parseFloat($('#sell-lTPrice').val() || 0),
            sell_bOPrice = parseFloat($('#sell-lOPrice').val() || 0),
            sell_limit_max_price = parseFloat($('#limit-max-sell-price').val() || 0),
            sell_limit_min_price = parseFloat($('#limit-min-sell-price').val() || 0),
            sell_limit_num = parseFloat($('#limit-sell-num').val() || 0);
        if (!obj.sign) {
            obj.hideTips($.t('before_trade'), 'green');
            return false;
        }
        if ('buy' == _sign) {
            if (1 == _type) {
                if (0 == buy_price || 0 == buy_num) {
                    obj.hideTips($.t('buy_buy'), 'green');
                    return false;
                }

                if (tobj.detailObj.limit && (0 != tobj.detailObj.price) && (buy_price > obj.toMul(tobj.detailObj.limit, tobj.detailObj.price))) {
                    obj.modShow('#mod-prompt');
                    $('#mod-prompt .tips-txt').html($.t('trade_error4'));
                    return false;
                }
                data = {
                    orderType: 1,
                    price: buy_price,
                    volume: buy_num
                };
                if ((0 != tobj.detailObj.price) && (buy_price > obj.toMul(tobj.detailObj.price, 1.02))) {
                    obj.modShow('#mod-warn');
                    $('#mod-warn .tips-txt').html($.t('buy_buy3'));
                    tobj.saveOrderStatus({
                        data: data,
                        form: $form,
                        type: _type,
                        sign: _sign
                    });
                    return false;
                }
            } else if (2 == _type) {
                if (0 == buy_order) {
                    obj.hideTips($.t('amount_great'), 'green');
                    return false;
                } else {
                    if (tobj.signPrice.buy && (buy_hTPrice != 0) && (buy_hTPrice <= tobj.signPrice.buy) && tobj.signPrice.sale && (buy_bTPrice >= tobj.signPrice.sale)) {
                        obj.hideTips($.t('current_price') + tobj.signPrice.sale, 'green');
                        return false;
                    } else if (tobj.signPrice.sale && (buy_bTPrice >= tobj.signPrice.sale)) {
                        obj.hideTips($.t('trigger_current') + tobj.signPrice.buy, 'green');
                        return false;
                    } else if (buy_hOPrice <= buy_bOPrice && (buy_hOPrice != 0) && (buy_bOPrice != 0)) {
                        obj.hideTips($.t('unit_great'), 'green');
                        return false;
                    }
                    data = {
                        orderType: 1,
                        highTriggerPrice: buy_hTPrice,
                        lowTriggerPrice: buy_bTPrice,
                        highPrice: buy_hOPrice,
                        lowPrice: buy_bOPrice,
                        amount: buy_order
                    };
                }
            } else if (3 == _type) {
                if (0 == buy_limit_max_price || 0 == buy_limit_min_price) {
                    obj.hideTips($.t('purchase_price'), 'green');
                    return false;
                } else {
                    if (buy_limit_max_price < buy_limit_min_price) {
                        obj.hideTips($.t('minimun_bid'), 'green');
                        return false;
                    } else {
                        if (tobj.detailObj.limit && (0 != tobj.detailObj.price) && (buy_limit_max_price > obj.toMul(tobj.detailObj.limit, tobj.detailObj.price))) {
                            obj.modShow('#mod-prompt');
                            $('#mod-prompt .tips-txt').html($.t('trade_error4'));
                            return false;
                        }
                        data = {
                            batchType: _dir,
                            orderType: 1,
                            highPrice: buy_limit_max_price,
                            lowPrice: buy_limit_min_price,
                            volume: buy_limit_num
                        };
                    }
                }
            }
        } else {
            if (1 == _type) {
                if (0 == sell_price || 0 == sell_num) {
                    obj.hideTips($.t('sell_great'), 'green');
                    return false;
                }
                if (tobj.detailObj.limit && (0 != tobj.detailObj.price) && (sell_price > obj.toMul(tobj.detailObj.limit, tobj.detailObj.price))) {
                    obj.modShow('#mod-prompt');
                    $('#mod-prompt .tips-txt').html($.t('trade_error4'));
                    return false;
                }
                data = {
                    orderType: 2,
                    price: sell_price,
                    volume: sell_num
                };
                if ((0 != tobj.detailObj.price) && (obj.toMul(sell_price, 1.02) < tobj.detailObj.price)) {
                    obj.modShow('#mod-warn');
                    $('#mod-warn .tips-txt').html($.t('buy_buy2'));
                    tobj.saveOrderStatus({
                        data: data,
                        form: $form,
                        type: _type,
                        sign: _sign
                    });
                    return false;
                }
            } else if (2 == _type) {
                if (0 == sell_order) {
                    obj.hideTips($.t('list_great'), 'green');
                    return false;
                }
                if (tobj.signPrice.buy && (sell_hTPrice != 0) && (sell_hTPrice <= tobj.signPrice.buy) && tobj.signPrice.sale && (sell_bTPrice >= tobj.signPrice.sale)) {
                    obj.hideTips($.t('trigger_bigger') + tobj.signPrice.sale, 'green');
                    return false;
                } else if (tobj.signPrice.sale && (sell_bTPrice >= tobj.signPrice.sale)) {
                    obj.hideTips($.t('trigger_less') + tobj.signPrice.buy, 'green');
                    return false;
                } else if (sell_hOPrice <= sell_bOPrice && (sell_hOPrice != 0) && (sell_bOPrice != 0)) {
                    obj.hideTips($.t('unit_big'), 'green');
                    return false;
                }
                data = {
                    orderType: 2,
                    highTriggerPrice: sell_hTPrice,
                    lowTriggerPrice: sell_bTPrice,
                    highPrice: sell_hOPrice,
                    lowPrice: sell_bOPrice,
                    amount: sell_order
                };
            } else if (3 == _type) {
                if (0 == sell_limit_max_price || 0 == sell_limit_min_price) {
                    obj.hideTips($.t('lowest_bid'), 'green');
                    return false;
                } else {
                    if (sell_limit_max_price < sell_limit_min_price) {
                        obj.hideTips($.t('high_bid'), 'green');
                        return false;
                    } else {
                        if (tobj.detailObj.limit && (0 != tobj.detailObj.price) && (sell_limit_max_price > obj.toMul(tobj.detailObj.limit, tobj.detailObj.price))) {
                            obj.modShow('#mod-prompt');
                            $('#mod-prompt .tips-txt').html($.t('trade_error4'));
                            return false;
                        }
                        data = {
                            batchType: _dir,
                            orderType: 2,
                            highPrice: sell_limit_max_price,
                            lowPrice: sell_limit_min_price,
                            volume: sell_limit_num
                        };
                    }
                }
            }
        }
        tobj.isNeedPwd();
        tobj.saveOrderStatus({
            data: data,
            form: $form,
            type: _type,
            sign: _sign
        });
        $('#to-addr').attr('data-sign', 'ok');
    });
    // 
    $('.form-box').on('focus', 'input[type=text]', function () {
        var that = $(this),
            _val = that.val();
        if (0 == _val) {
            that.val('');
        }
    });
    $('.form-box').on('blur', 'input[type=text]', function () {
        var that = $(this),
            _val = that.val();
        if ('' === _val) {
            that.val(0);
        }
    });

    // 异常价格提交确定
    $('#form-allow').on('click', function () {
        tobj.isNeedPwd();
        $('#to-addr').attr('data-sign', 'ok');
    });
    // 设置交易密码类型
    if (0 != $('#to-modify').length) {
        $('#to-modify').on('click', function () {
            var that = $(this),
                $form = that.closest('#buz-form'),
                $pwd = $form.find('#input-pwd').val(),
                _audit = $form.find('.close-buzPwd input[name="close"]:checked').prop('value');
            data = {
                password: '',
                auditType: ''
            };
            if ($pwd) {
                data.password = $pwd.trim();
            }
            if (_audit) {
                data.auditType = parseInt(_audit);
            }
            tobj.setTradePwdType($form, data);
        });
    }

    // 提交订单
    $('#buz-form').on('keypress', function (e) {
        e = e || window.event;
        if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
            $('#to-addr').trigger('click');
        }
    });
    $('#to-addr').on('click', function (e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();

        var $form = $(this).closest('.mod-form'),
            pwd = $form.find('#input-pwd').val(),
            data = tobj.orderData.data,
            _sign = $(this).attr('data-sign');

        if (pwd && '' != pwd) {
            if ('ok' == _sign) {
                data.tradePassword = pwd;
                tobj.submitOrder();
            } else if ('cancel' == _sign || 'cancelAll' == _sign) {
                tobj.cancelObj.tradePassword = pwd;
                if ('cancel' == _sign) {
                    tobj.cancelOrder();
                } else {
                    tobj.cancelAllOrder();
                }
            }
        }
    });

    // 切换提示
    $('.group-direction').on('mouseover', '>li', function () {
        var _tip = $(this).attr('data-tip');
        if (0 == $(this).find('.dir-tip').length) {
            $(this).append($('.dir-tip'));
        }
        $(this).find('.dir-tip').addClass('show');
        $(this).find('.dir-tip>label>span').html(_tip);
    });
    $('.group-direction').on('mouseout', '>li', function () {
        $(this).find('.dir-tip').removeClass('show');
    });
    $('.group-direction').on('click', '>li', function () {
        $(this).addClass('on').siblings().removeClass('on');
    });

    // 币种排序
    $('.list-title').on('click', '>li.filter', function () {
        var that = $(this),
            _sign = that.attr('data-sign'),
            _to = that.attr('data-to'),
            $i = that.find('.icon-filter'),
            _key = $('.s-tab>.active').text().toLowerCase() || 'eth',
            list = tobj.marketObj[_key];

        if ($i.hasClass('to')) {
            $i.removeClass('to');
        } else {
            $i.addClass('to');
        }
        if (1 == _sign) {
            if (1 == _to) {
                list.sort(function (a, b) {
                    return a.TargetId.localeCompare(b.TargetId);
                });
            } else {
                list.sort(function (a, b) {
                    return b.TargetId.localeCompare(a.TargetId);
                });
            }
        } else if (2 == _sign) {
            if (1 == _to) {
                list.sort(function (a, b) {
                    return (b.ClosedPrice || 0) - (a.ClosedPrice || 0);
                });
            } else {
                list.sort(function (a, b) {
                    return (a.ClosedPrice || 0) - (b.ClosedPrice || 0);
                });
            }
        } else if (3 == _sign) {
            if (1 == _to) {
                list.sort(function (a, b) {
                    return (b.dayDiff || 0) - (a.dayDiff || 0);
                });
            } else {
                list.sort(function (a, b) {
                    return (a.dayDiff || 0) - (b.dayDiff || 0);
                });
            }
        } else if (4 == _sign) {
            if (1 == _to) {
                list.sort(function (a, b) {
                    return (b.dayRate || 0) - (a.dayRate || 0);
                });
            } else {
                list.sort(function (a, b) {
                    return (a.dayRate || 0) - (b.dayRate || 0);
                });
            }
        }
        _to = (1 == _to) ? 0 : 1;
        that.attr('data-to', _to);
        tobj.marketObj[_key] = list;
        tobj.showFilterCurrencyMarket(null, _key);
    });

    // 买卖比率
    $('.forms-box').on('input', '.form-group>input', function () {
        var that = $(this),
            _total = 0,
            param = 0,
            index = 0,
            $p2 = null,
            $forms = that.closest('.forms-box'),
            $form = that.closest('.form-box'),
            _id = parseInt($form.attr('data-type')),
            buy_price = tobj.getNum($('#buy-price').val().trim()),
            buy_num = tobj.getNum($('#buy-num').val().trim()),
            sell_price = tobj.getNum($('#sell-price').val().trim()),
            sell_num = tobj.getNum($('#sell-num').val().trim()),

            buy_order = tobj.getNum($('#buy-order').val().trim()),
            buy_hOPrice = tobj.getNum($('#buy-hOPrice').val().trim()),
            buy_bOPrice = tobj.getNum($('#buy-bOPrice').val().trim()),
            sell_order = tobj.getNum($('#sell-order').val().trim()),
            sell_pOPrice = tobj.getNum($('#sell-pOPrice').val().trim()),
            sell_bOPrice = tobj.getNum($('#sell-lOPrice').val().trim()),

            buy_limit_max_price = tobj.getNum($('#limit-max-buy-price').val().trim()),
            buy_limit_min_price = tobj.getNum($('#limit-min-buy-price').val().trim()),
            buy_limit_num = tobj.getNum($('#limit-buy-num').val().trim()),
            sell_limit_max_price = tobj.getNum($('#limit-max-sell-price').val().trim()),
            sell_limit_min_price = tobj.getNum($('#limit-min-sell-price').val().trim()),
            sell_limit_num = tobj.getNum($('#limit-sell-num').val().trim()),
            limits = ['buy-num', 'limit-buy-num', 'sell-num', 'sell-order', 'limit-sell-num'],
            _vals = that.val(),
            _end = 0;

        //if(that.val()===''){that.val(0);}
        if (limits.indexOf(that.attr('id')) == -1) {
            if (_vals.indexOf('.') != -1) {
                _end = _vals.substr(_vals.lastIndexOf('.') + 1);
                _vals = _vals.substr(0, _vals.lastIndexOf('.'));
                if (tobj.marketInfo.pP < _end.length) {
                    _end = _end.substr(0, tobj.marketInfo.pP);
                }
                _vals = _vals + '.' + _end;
                that.val(_vals);
            }
        } else {
            if (_vals.indexOf('.') != -1) {
                _end = _vals.substr(_vals.lastIndexOf('.') + 1);
                _vals = _vals.substr(0, _vals.lastIndexOf('.'));
                if (tobj.marketInfo.vP < _end.length) {
                    _end = _end.substr(0, tobj.marketInfo.vP);
                }
                _vals = _vals + '.' + _end;
                that.val(_vals);
            }
        }
        that.val(that.val().replace(/[^\d.]/g, ''));
        if (Number.isNaN(that.val())) {
            that.val(0);
        }
        // 买单
        if (0 != $forms.find('.form-buy').length) {
            var _buy_price = $('#buy-price').val().trim();
            if (1 == _id) {
                // if(buy_num>=tobj.tradeObj.BasicBalance){
                // buy_num=obj.getFloatValue(tobj.tradeObj.BasicBalance/(0!=_buy_price?_buy_price:1),tobj.marketInfo.vP);
                // $('#buy-num').val(obj.scienceToNum(obj.getFloatValue(buy_num,tobj.marketInfo.vP),tobj.marketInfo.vP));
                param = 100;
                // }
                _total = obj.toMul(buy_price, buy_num || 0);
                param = (0 != tobj.tradeObj.BasicBalance ? Math.round(obj.toMul(obj.getFloatValue(obj.toDiv(_total, tobj.tradeObj.BasicBalance), 2), 100)).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                /*if(buy_num>=tobj.target_val.basePrice){
                   buy_num=obj.getFloatValue(tobj.target_val.basePrice,8);
                   $('#buy-num').val(buy_num);
                }*/
                // if(tobj.tradeObj.BasicBalance<_total){
                //    $('#buy-num').val(obj.scienceToNum(tobj.getNum(obj.getFloatValue(obj.toDiv(tobj.tradeObj.BasicBalance,buy_price),tobj.marketInfo.vP)),tobj.marketInfo.vP));
                //    _total = obj.toMul(tobj.getNum($('#buy-price').val().trim()),tobj.getNum($('#buy-num').val().trim()||0));
                // }
                $('#bidFeeRate').text(param || 0);
                Scroll.value = param;
                Scroll.lightFn($('.form-buy').find('.scale-btn'), param); //obj.toMul(obj.toDiv(param,100),325).toFixed(2)
            } else if (2 == _id) {
                _total = buy_order || 0;
                param = (0 != tobj.tradeObj.BasicBalance ? obj.toMul(obj.toDiv(buy_order, tobj.tradeObj.BasicBalance), 100).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                if (100 >= param) {
                    $('#bidFeeRate').text(param || 0);
                    Scroll.value = param;
                    Scroll.lightFn($('.form-buy').find('.scale-btn'), param); //obj.toMul(obj.toDiv(buy_order,tobj.tradeObj.BasicBalance),325).toFixed(2)
                }
            } else if (3 == _id) {
                _total = obj.toMul(buy_limit_max_price, buy_limit_num);
                param = (0 != tobj.tradeObj.BasicBalance ? obj.toMul(obj.toDiv(_total, tobj.tradeObj.BasicBalance), 100).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                // if(tobj.tradeObj.BasicBalance<_total){
                // if(0!=buy_limit_max_price){
                //    $('#limit-buy-num').val(obj.scienceToNum(tobj.getNum(obj.getFloatValue(obj.toDiv(tobj.tradeObj.BasicBalance ,buy_limit_max_price),tobj.marketInfo.vP)),tobj.marketInfo.vP));
                // }else{
                //    $('#limit-buy-num').val(0);
                // }
                // _total = obj.toMul(tobj.getNum($('#limit-max-buy-price').val().trim()),tobj.getNum($('#limit-buy-num').val().trim()));
                // }
                if (100 >= param) {
                    $('#bidFeeRate').text(param || 0);
                    Scroll.value = param;
                    Scroll.lightFn($('.form-buy').find('.scale-btn'), param); //obj.toMul(obj.toDiv(_total,tobj.tradeObj.BasicBalance),325).toFixed(2)
                }
            }
            // 卖单
        } else if (0 != $forms.find('.form-sale').length) {
            if (1 == _id) {
                // if(sell_num>=tobj.tradeObj.TargetBalance){
                // sell_num=obj.scienceToNum(obj.getFloatValue(tobj.tradeObj.TargetBalance,tobj.marketInfo.vP),tobj.marketInfo.vP);
                // $('#sell-num').val(sell_num);
                // }
                _total = obj.toMul((sell_price || 0), (sell_num || 0));
                param = (0 != tobj.tradeObj.TargetBalance ? obj.toMul(obj.toDiv((sell_num || 0), tobj.tradeObj.TargetBalance), 100).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                if (100 >= param) {
                    $('#askFeeRate').text(param || 0);
                    Scroll.value = param;
                    Scroll.lightFn($('.form-sale').find('.scale-btn'), param); //obj.toMul(obj.toDiv(sell_num,tobj.tradeObj.TargetBalance),325).toFixed(2)
                }
            } else if (2 == _id) {
                _total = sell_order || 0;
                param = (0 != tobj.tradeObj.TargetBalance ? obj.toMul(obj.toDiv(_total, tobj.tradeObj.TargetBalance), 100).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                if (100 >= param) {
                    $('#askFeeRate').text(param || 0);
                    Scroll.value = param;
                    Scroll.lightFn($('.form-sale').find('.scale-btn'), param); //obj.toMul(obj.toDiv(_total,tobj.tradeObj.TargetBalance),325).toFixed(2)
                }
            } else if (3 == _id) {
                _total = sell_limit_num || 0;
                param = (0 != tobj.tradeObj.TargetBalance ? obj.toMul(obj.toDiv(_total, tobj.tradeObj.TargetBalance), 100).toFixed(2) : 0);
                param <= 100 ? param = param : param = 100;
                if (100 >= param) {
                    $('#askFeeRate').text(param || 0);
                    Scroll.value = param;
                    Scroll.lightFn($('.form-sale').find('.scale-btn'), param); //obj.toMul(obj.toDiv(_total,tobj.tradeObj.TargetBalance),325).toFixed(2)
                }
            }
            index = 1;
        }
        $p2 = $forms.find('.price_2th').eq(0);
        $p22 = $forms.find('.price_2th').eq(0);

        // 预计追高/抄底（止盈/止损）成交额
        if (2 == _id) {
            _total = (1 != index) ? (0 != buy_hOPrice ? obj.getFloatValue((buy_order || 0) / (buy_hOPrice || 0), tobj.marketInfo.pP) : 0) : (0 != sell_pOPrice ? obj.getFloatValue((sell_order || 0) * (sell_pOPrice || 0), tobj.marketInfo.pP) : 0);
            $p2.find('.expect-h-price').text(obj.getFloatValue(_total, tobj.marketInfo.pP) || 0);
            _total = (1 != index) ? (0 != buy_bOPrice ? obj.getFloatValue((buy_order || 0) / (buy_bOPrice || 0), tobj.marketInfo.pP) : 0) : (0 != sell_bOPrice ? obj.getFloatValue((sell_order || 0) * (sell_bOPrice || 0), tobj.marketInfo.pP) : 0);
            $p22.find('.expect-l-price').text(obj.getFloatValue(_total, tobj.marketInfo.pP) || 0);
        }
        // 预计成交额
        if (1 == _id || 3 == _id) {
            if (3 == _id) {
                _total = (1 != index) ? (buy_limit_num || 0) * (obj.toAdd(buy_limit_max_price, buy_limit_min_price) || 0) / 2 : sell_limit_num * (obj.toAdd(sell_limit_max_price, sell_limit_min_price) || 0) / 2;
            }
            $forms.find('.expect-price').text(obj.getFloatValue(_total, tobj.marketInfo.pP) || 0);
        }
    });

    $('.forms-box').on('focus', '.form-group>input', function () {
        var that = $(this),
            $form = that.closest('.form-box');
        $form.find('[data-f]').attr('data-f', 0);
    });
    $('.forms-box').on('blur', '.form-group>input', function () {
        var that = $(this),
            $form = that.closest('.form-box');
        $form.find('[data-f]').attr('data-f', 1);
    });

    // 撤销挂单
    $('.order-table').on('click', '>tbody>tr>td>a', function () {
        var _id = $(this).attr('data-id'),
            _type = $(this).attr('data-type'),
            _order = $(this).attr('data-order');
        //$('#to-addr').attr('data-sign','cancel');
        tobj.cancelObj = {
            marketId: tobj.marketId,
            category: _type,
            orderType: _order,
            orderId: _id,
            tradePassword: ''
        };
        tobj.cancelOrder();
        //tobj.isNeedPwd();
    });
    // 批量撤销挂单
    $('.order-title').on('click', '>li>.batch-back', function () {
        var that = $(this),
            category = that.attr('data-type'),
            $tr = $('.order-table.on>tbody>tr');
        /*$tr = $('.order-table.on>tbody>tr'),
        list = []*/
        //$('#to-addr').attr('data-sign','cancelAll');
        /*$tr.each(function(){
           var t = $(this),
              id=t.find('a').attr('data-id');
           list.push(id);
        });*/
        if (0 != $tr.length) {
            tobj.cancelAllObj = {
                marketId: tobj.marketId,
                orderCategory: category,
                tradePassword: ''
            };
            obj.modShow('#mod-cancel');
            $('#mod-cancel .tips-txt').html($.t('Whether_with') + (tobj.currencyObj.base + '/' + tobj.currencyObj.target).toUpperCase() + $.t('order_market'));
            $('#mod-cancel').on('click', '>.mod-body>.tips-btn>.btn-default', function () {
                tobj.cancelAllOrder();
            });
        } else {
            obj.hideTips($.t('without_order'), 'green');
        }
        //tobj.isNeedPwd(1);
    });
});