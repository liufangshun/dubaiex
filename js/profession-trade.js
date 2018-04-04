$(function(){
	var tobj ={
		basicId: (localStorage.getItem('marketId') || 'cny').toLowerCase(),
	    table: $('#limit-table'),
	    currencylist: [], //测试数据变量（可删）
	    nickname: '',
	    status: 0,
	    timer: null,
	    collect: [],
	    targetList: ['cny','btc','eth','ans'],
	    wWidth: $(window).width(),
	    orderData: {data: {},that: null},
	    charObj: {klineChart: null,depthChart: null},
	    marketId: 'cny_ysc',//当前市场ID
	    Controllers: {
         MarketController:1   //市场控制器
        },
	    ReceiveCommand: {
            Error: 0,//发生错误
            ChatContent: 1,//聊天内容
            SingleKLine: 1000,//单条K线数据
            BatchKLine: 1001,//批量K线数据
            BatchKLineSendComplate: 1002,//批量K线数据发送完成
            MarketDepth:1003,//市场深度数据
            TradeSimpleDto: 1004,//单条交易记录
            TradeSimpleDtoList: 1005,//交易记录列表
            ScrollDayKLine:1006,//滑动24H日线
            CreateOrder: 1008,//新增订单信息
            CreatePlanOrder: 1009,//新增计划订单信息
            UpdateOrder: 1010//更新订单信息
      	},
      	SendCommand: {
	        ClientUserChat: 1,//发送聊天内容
	        ReceiveMarketChat: 3,//接受聊天内容
	        SetKLineFequency: 900,//设置当前市场K线频度
	        SetReceiveOtherMarketKLine: 902,//设置接收其它市场的K线数据
	        RepairKLine: 903,//修复K线数据
	        SetMarketDepth: 906,//设置接收市场深度数据
	        SetTradeOrder: 907,//设置接收交易订单数据
	        BindMarket: 908,//绑定到指定市场
	        Login: 1000//登陆验证
        },
        //target_val:{ basePrice :0,targetBalance:0},
        getParam: obj.getParam(),
        otherMarkerIds: [],//["M_2", "M_3", "M_4", "M_5", "M_6", "M_7"], // 右侧币种列表
        otherMarkerIdsZH: [],
        dict: {},
        tradeObj: {BasicBalance: 0,TargetBalance: 0},
        cancelObj: {},
        cancelAllObj: {},
        signPrice: {buy: null,sale: null},
        sign: 'M1',
        currencyObj: {target: '',base: ''},
        closePrice: 0,
        loginCookie: {key:'',id: ''},
        detailObj: {price: 0,volume: 0,limit: null},
        timeObj: {st: 0,ed: 0,st1: 0,ed1: 0},
        marketObj: {key: '5-8',list: [],clist:[],blist: [],elist: [],alist: [],collect: 0,count: 10},
		// 图表1
      	drawingKLine: function(frequency) {
	        var data = tobj.dict[frequency];
	         // 基于准备好的dom，初始化echarts实例
	        if (!tobj.charObj.klineChart){
	            tobj.charObj.klineChart = echarts.init(document.getElementById('chart'));
	        }
	        var option = {
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {
	                    type: 'cross'
	                },
	                backgroundColor: 'rgba(0, 0, 0, 0.8)',
	                borderWidth: 1,
	                borderColor: '#d4d4d4',
	                padding: 10,
	                textStyle: {
	                    color: '#d4d4d4'
	                }
	            },
	            legend: {
	                data: ['K', 'MA5', 'MA10', 'MA20', 'MA30'],
	                textStyle:{
	                	color: '#d4d4d4'
	                },
	            },
	            grid: [{
	                left: '7%',
	                right: '7%',
	                top: '7%',
	                height: '58%',
	            },
	            {
	                left: '7%',
	                right: '7%',
	                top: '71%',
	                height: '22%',
	            }],
	            xAxis: [{
	                type: 'category',
	                data: data.categoryData,
	                scale: true,
	                boundaryGap: false,
	                axisLine: { onZero: false },
	                splitLine: { show: false },
	                splitNumber: 20,
	                axisLine: {
	                	lineStyle:{
	                		color: '#d4d4d4',
	                		type: 'solid',
	                		width:1
	                	}
	                },
	                min: 'dataMin',
	                max: 'dataMax',
	                axisPointer: {
	                    z: 100
	                }
	            }, {
	                type: 'category',
	                gridIndex: 1,
	                data: data.categoryData,
	                axisLabel: { show: false }
	            }],
	            yAxis: [{
	                name: '价格',
	                nameLocation: 'middle',
	                nameGap: '50',
	                scale: true,
	                axisLine: {
	                	lineStyle:{
	                		color: '#d4d4d4',
	                		type: 'solid',
	                		width:1
	                	},
	                },
	                splitLine: {
	                	show: false
	                },
	                splitArea: {
	                	areaStyle:{
	                		color: 'rgba(0,0,0)'
	                	}
	                }
	            }, {
	                name: '成交量',
	                nameLocation: 'middle',
	                nameGap: '50',
	                scale: true,
	                axisLine: {
	                	lineStyle:{
	                		color: '#d4d4d4',
	                		type: 'solid',
	                		width:1
	                	},
	                },
	                splitLine: {
	                	show: false
	                },
	                splitArea: {
	                	areaStyle:{
	                		color: 'rgba(0,0,0)'
	                	}
	                }
	            }, {
	                name: 'MACD',
	                nameLocation: 'middle',
	                nameGap: '50',
	                gridIndex: 1,
	                splitNumber: 4,
	                axisLine: {
	                	lineStyle:{
	                		color: '#d4d4d4',
	                		type: 'solid',
	                		width:1
	                	},
	                	onZero: false
		            },
		            splitLine:{
		            	lineStyle:{
	                		color: '#d4d4d4',
	                		type: 'solid',
	                		width:1
	                	},
	                	show: false
		            },
	                axisTick: { show: false },
	                axisLabel: { show: true }
	            }],
	            dataZoom: [
	                {
	                    show: false,
	                    xAxisIndex: [0, 0],
	                    type: 'inside',
	                    showDetail: false,
	                    start: 60,
	                    end: 100
	                },
	                {
	                    show: true,
	                    xAxisIndex: [0, 1],
	                    type: 'slider',
	                    height: '5%',
	                    top: '95%',
	                    left: '5%',
	                    right: '4%',
	                    showDetail: false,
	                    start: 60,
	                    end: 100,
	                    dataBackground: {
	                        areaStyle: {
	                            color: '#e95500'
	                        },
	                        lineStyle: {
	                            opacity: 0.8,
	                            color: '#7093DB'
	                        }
	                    }
	                }],
	            series: [
	                {
	                    name: 'K线数据',
	                    type: 'candlestick',
	                    data: data.values,
	                    animation: false,
	                    itemStyle: {
	                        normal: {
	                            color: '#ef232a',
	                            color0: '#14b143',
	                            borderColor: '#ef232a',
	                            borderColor0: '#14b143'
	                        }
	                    },
	                    markPoint: {
	                        animation: false,
	                        label: {
	                            normal: {
	                                formatter: function (param) {
	                                    return param != null ? Math.round(param.value) : '';
	                                }
	                            }
	                        },
	                        data: [
	                            {
	                                name: 'highest value',
	                                type: 'max',
	                                valueDim: 'highest'
	                            },
	                            {
	                                name: 'lowest value',
	                                type: 'min',
	                                valueDim: 'lowest'
	                            },
	                            {
	                                name: 'average value',
	                                type: 'average',
	                                valueDim: 'close'
	                            }
	                        ]
	                    },
	                    markLine: {
	                        symbol: ['nlittleEndian', 'none'],
	                        animation: false,
	                        data: [
	                            [
	                                {
	                                    type: 'min',
	                                    valueDim: 'lowest',
	                                    symbol: 'circle',
	                                    symbolSize: 10,
	                                    label: {
	                                        normal: { show: false },
	                                        emphasis: { show: false }
	                                    }
	                                },
	                                {
	                                    type: 'max',
	                                    valueDim: 'highest',
	                                    symbol: 'circle',
	                                    symbolSize: 10,
	                                    label: {
	                                        normal: { show: false },
	                                        emphasis: { show: false }
	                                    }
	                                }
	                            ],
	                            {
	                                name: 'min line on close',
	                                type: 'min',
	                                valueDim: 'close'
	                            },
	                            {
	                                name: 'max line on close',
	                                type: 'max',
	                                valueDim: 'close'
	                            }
	                        ]
	                    }
	                },
	                {
	                    name: 'MA5',
	                    type: 'line',
	                    animation: false,
	                    data: tobj.calculateMA(5, data),
	                    smooth: true,
	                    lineStyle: {
	                        normal: { opacity: 0.5 }
	                    }
	                },
	                {
	                    name: 'MA10',
	                    type: 'line',
	                    animation: false,
	                    data: tobj.calculateMA(10, data),
	                    smooth: true,
	                    lineStyle: {
	                        normal: { opacity: 0.5 }
	                    }
	                },
	                {
	                    name: 'MA20',
	                    type: 'line',
	                    animation: false,
	                    data: tobj.calculateMA(20, data),
	                    smooth: true,
	                    lineStyle: {
	                        normal: { opacity: 0.5 }
	                    }
	                },
	                {
	                    name: 'MA30',
	                    type: 'line',
	                    animation: false,
	                    data: tobj.calculateMA(30, data),
	                    smooth: true,
	                    lineStyle: {
	                        normal: { opacity: 0.5 }
	                    }
	                },
	                {
	                    name: '成交量',
	                    type: 'bar',
	                    yAxisIndex: [1],
	                    animation: false,
	                    smooth: true,
	                    data: data.volumns,
	                    itemStyle: {
	                        normal: {
	                            color: '#b5c8c9',
	                            color0: '#b5c8c9'
	                        }
	                    }
	                }, 
	                {
	                    name: 'MACD',
	                    type: 'bar',
	                    xAxisIndex: 1,
	                    yAxisIndex: 2,
	                    data: data.Macds,
	                    itemStyle: {
	                        normal: {
	                            color: function (params) {
	                                var colorList;
	                                if (params.data >= 0) {
	                                    colorList = '#ef232a';
	                                } else {
	                                    colorList = '#14b143';
	                                }
	                                return colorList;
	                            },
	                        }
	                    }
	                }, 
	                {
	                    name: 'DIF',
	                    type: 'line',
	                    xAxisIndex: 1,
	                    yAxisIndex: 2,
	                    data: data.Diffs,
	                    itemStyle: {
	                        normal: {
	                            color: '#094786'
	                        }
	                    }
	                }, {
	                    name: 'DEA',
	                    type: 'line',
	                    xAxisIndex: 1,
	                    yAxisIndex: 2,
	                    data: data.Deas,
	                    itemStyle: {
	                        normal: {
	                            color: '#c79be8'
	                        }
	                    }
	                }
	            ],
	         };
	         // 使用刚指定的配置项和数据显示图表。
	         tobj.charObj.klineChart.setOption(option, true);
	         $(window).resize(function(){
	            tobj.charObj.klineChart.resize();
	         });
      	},  
        // 图表2
      	drawingAskBidChart: function(data) {
      		console.log(22222222222222);
         	var priceList = [];
	         var bidCountList = [];
	         var caculateBidCountList = [];
	         var askCountList = [];
	         var bidTotal = 0;
	         var askTotal = 0;
	         for (var i = data.BidList.length; i >0 ; i--) {
	            var depthData = data.BidList[i-1];
	            priceList.push(depthData.Price);
	            bidTotal += depthData.Total;
	            caculateBidCountList.push(bidTotal);
	            askCountList.push(0);
	         }
	         for (var i = caculateBidCountList.length; i > 0; i--) {
	            bidCountList.push(caculateBidCountList[i - 1]);
	         }
	         var middleBid = data.BidList[data.BidList.length - 1];
	         var middleAsk = data.AskList[data.AskList.length - 1];
	         var price = 0;
	         if (middleBid && middleAsk)
	            price = (middleBid.Price + middleAsk.Price) / 2;
	         priceList.push(price);
	         bidCountList.push(0);
	         askCountList.push(0);
	         for (var i = 0; i < data.AskList.length; i++) {
	            var depthData = data.AskList[i];
	            priceList.push(depthData.Price);
	            askTotal += depthData.Total;
	            askCountList.push(askTotal);
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
	                        var result = "价格:" + param[0].name;
	                        if (param[0].value != 0) {
	                            result += "</br>买单累计挂单量:" + param[0].value;
	                            for (var i = 0; i < data.BidList.length; i++) {
	                                var depthData = data.BidList[i];
	                                if (depthData.Price == param[0].name) {
	                                    result += "</br>买单当前挂单量:" + depthData.Total;
	                                    break;
	                                }
	                            }

	                        }
	                        if (param[1].value != 0) {
	                            result += "</br>卖单累计挂单量:" + param[1].value;
	                            for (var i = 0; i < data.AskList.length; i++) {
	                                var depthData = data.AskList[i];
	                                if (depthData.Price == param[0].name) {
	                                    result += "</br>卖单当前挂单量:" + depthData.Total;
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
	                top: '5%',
	                height: '100%'
	            }],
	            xAxis: [
	                {
	                    type: 'category',
	                    boundaryGap: false,
	                    data: priceList
	                }
	            ],
	            yAxis: [
	                {
	                    type: 'value',
	                    name: '市场深度图',
	                    nameLocation: 'middle',
	                    nameGap: '50'
	                }
	            ],
	            series: [
	                {
	                    name: '买单',
	                    type: 'line',
	                    smooth: true,
	                    itemStyle: { normal: { color: '#2c9b00', areaStyle: { type: 'default' } } },
	                    data: bidCountList
	                },
	                {
	                    name: '卖单',
	                    type: 'line',
	                    smooth: true,
	                    itemStyle: { normal: { color: '#e95500', areaStyle: { type: 'default' } } },
	                    data: askCountList
	                }
	            ]
	        }
	        // 使用刚指定的配置项和数据显示图表。
	        tobj.charObj.depthChart.setOption(option, true);
	        $(window).resize(function(){
	           tobj.charObj.depthChart.resize();
	        });
      	},
      	processListData: function(list) {
	         var frequencyKey = list[0].FrequencyKey;
	         var oldData = tobj.dict[frequencyKey];
	         if (oldData == undefined) {
	            var categoryData = [];
	            var values = [];
	            var volumns = [];
	            var lastId = 0;

	            var deas = [];
	            var diffs = [];
	            var deas = [];
	            var macds = [];
	            var preEma12 = 0;
	            var preEma26 = 0;
	            var preDea = 0;
	            for (var i = 0; i < list.length; i++) {
	               var data = list[i];

	               var ema12 = preEma12 * 11 / 13 + data.ClosedPrice * 2 / 13;
	               var ema26 = preEma26 * 25 / 27 + data.ClosedPrice * 2 / 27;
	               var diff = ema12 - ema26;
	               var dea = preDea * 8 / 10 + diff * 2 / 10;
	               var macd = 2 * (diff - dea);
	               diffs.push(diff.toFixed(2));
	               deas.push(dea.toFixed(2));
	               macds.push(macd.toFixed(2));
	               preEma12 = ema12;
	               preEma26 = ema26;
	               preDea = dea;

	               var kData = [];
	               kData.push(data.OpenPrice);
	               kData.push(data.ClosedPrice);
	               kData.push(data.HighPrice);
	               kData.push(data.LowPrice);
	               kData.push(data.Volume);
	               categoryData.push(data.OpenTime);
	               values.push(kData);
	               volumns.push(data.Volume);
	               lastId = data.Id;
	            }
	            var result = {
	               categoryData: categoryData,
	               values: values,
	               volumns: volumns,
	               lastId: lastId,
	               Diffs: diffs,
	               Deas: deas,
	               Macds: macds,
	               PreEma12: preEma12,
	               PreEma26: preEma26,
	               PreDea: preDea
	            };
	            tobj.dict[frequencyKey] = result;
	         } else {
	            for (var i = 0; i < list.length; i++) {
	               var data = list[i];

	               var ema12 = oldData.PreEma12 * 11 / 13 + data.ClosedPrice * 2 / 13;
	               var ema26 = oldData.PreEma26 * 25 / 27 + data.ClosedPrice * 2 / 27;
	               var diff = ema12 - ema26;
	               var dea = oldData.PreDea * 8 / 10 + diff * 2 / 10;
	               var macd = 2 * (diff - dea);
	               oldData.Diffs.push(diff.toFixed(2));
	               oldData.Deas.push(dea.toFixed(2));
	               oldData.Macds.push(macd.toFixed(2));
	               oldData.PreEma12 = ema12;
	               oldData.PreEma26 = ema26;
	               oldData.PreDea = dea;

	               var kData = [];
	               kData.push(data.OpenPrice);
	               kData.push(data.ClosedPrice);
	               kData.push(data.HighPrice);
	               kData.push(data.LowPrice);
	               kData.push(data.Volume);
	               oldData.categoryData.push(data.OpenTime);
	               oldData.values.push(kData);
	               oldData.volumns.push(data.Volume);
	               oldData.lastId = data.Id;
	            }
	         }
	         /*var frequencyKey = list[0].FrequencyKey;
	         var oldData = tobj.dict[frequencyKey];
	         if (oldData == undefined) {
	            var categoryData = [];
	            var values = [];
	            var volumns = [];
	            var lastId = 0;
	            for (var i = 0; i < list.length; i++) {
	               var data = list[i];
	               var kData = [];
	               kData.push(data.OpenPrice);
	               kData.push(data.ClosedPrice);
	               kData.push(data.HighPrice);
	               kData.push(data.LowPrice);
	               kData.push(data.Volume);

	               categoryData.push(data.OpenTime);
	               values.push(kData);
	               volumns.push(data.Volume);
	               lastId = data.Id;
	            }

	            var result = {
	               categoryData: categoryData,
	               values: values,
	               volumns: volumns,
	               lastId: lastId
	            };
	            tobj.dict[frequencyKey] = result;
	         } else {
	            for (var i = 0; i < list.length; i++) {
	               var data = list[i];
	               var kData = [];
	               kData.push(data.OpenPrice);
	               kData.push(data.ClosedPrice);
	               kData.push(data.HighPrice);
	               kData.push(data.LowPrice);
	               kData.push(data.Volume);
	               oldData.categoryData.push(data.OpenTime);
	               oldData.values.push(kData);
	               oldData.volumns.push(data.Volume);
	               oldData.lastId = data.Id;
	            }
	         }*/
      	},
      	processSingleData: function(ws, root, data,objs) {
         var list = tobj.marketObj.clist,count=0,sign,html,_HL/*,dp,dr*/,dsign,dhtml,day_price=0,day_rate=0,
            _sign=$('.s-tab>.active').text().toLowerCase(),
            $tbody=$('.coin-table.show>tbody'),flag=true;
         list=tobj.marketObj[_sign]?tobj.marketObj[_sign]:[];
         if(objs){
            tobj.getAverage(data);
            if(0===list.length){
               list.push(data);
            }else{
               for(i=0;i<list.length;i++){
                  if(list[i].MarketId == data.MarketId){
                     for(var key in data){
                        if(data.hasOwnProperty(key)){
                           list[i][key]=data[key];
                        }
                     }
                     break;
                  }
               }
               // 数据更新
               /*for(i=0;i<list.length;i++){
                  if(list[i].MarketId == data.MarketId){
                     ~(function(sign){
                        var val='',$tr;
                        $tbody.find('tr').each(function(){
                           var that = $(this);
                           if(sign.toUpperCase()==that.find('td').eq(1).text()){
                              $tr=that;
                              val = $tr.find('td').eq(4).text();
                              return false;
                           }
                        });
                        if(-1!=val.indexOf('-')){
                           val = val.substr(val.indexOf('%')-1);
                        }else{
                           val = val.substr(1,val.indexOf('%')-1);
                        }
                        _HL = obj.getFloatValue((data.OpenPrice-data.ClosedPrice)/data.ClosedPrice,8);
                        if(_HL>val){
                           $tr.removeClass().addClass('green up');
                           _HL = '+'+_HL+'%';
                        }else if(_HL==val){
                           $tr.removeClass();
                        }else{
                           $tr.removeClass().addClass('red down');
                           _HL = _HL+'%';
                        }
                        $tr.find('td').eq(2).text('￥'+data.ClosedPrice);
                        $tr.find('td').eq(3).text(obj.getFloatValue(data.Amount,2));
                        $tr.find('td').eq(4).text(_HL);
                        setTimeout(function(){
                           $tr.removeClass('up down');
                        },1000);
                     })(data.MarketId.substr(data.MarketId.indexOf('_')+1));
                     list[i]=data;
                     count++;
                     break;
                  }
               }*/
               
               /*if(data.marketId == tobj.getParam.marketId){
                  /*dp = $('.day-price').text();
                  dr = $('.day-rate').text();*/
                  /*day_price=obj.getFloatValue((data.ClosedPrice-data.OpenPrice),3);
                  day_rate=obj.getFloatValue((data.ClosedPrice-data.OpenPrice)/data.OpenPrice,4);
                  if((data.ClosedPrice-data.OpenPrice)>0){
                     dhtml=day_price+'<i class="icon icon-down3"></i>';
                     dsign = '+'+day_rate+'%';
                     $('.priceTrend').addClass('green').removeClass('red');
                  }else{
                     dhtml=obj.getFloatValue((data.ClosedPrice-data.OpenPrice),3)+'<i class="icon icon-down8"></i>';
                     dsign = '-'+day_rate+'%';
                     $('.priceTrend').addClass('red').removeClass('green');
                  }
                  if(0===data.OpenPrice){
                     dsign = '0%';
                  }

                  $('.day-price').html(dhtml);
                  $('.day-rate').text(dsign);*/
               /*}*/
               
               // 新币种添加
               /*if(0===count){
                  _HL = obj.getFloatValue((data.OpenPrice-data.ClosedPrice)/data.ClosedPrice,8);
                  html = '<tr>\
                           <td><i class="icon icon-unstar" data-market="'+data.MarketId+'"></i></td>\
                           <td><a href="./trade.html?marketId='+data.MarketId+'" target="_blank">'+(data.MarketId).split('_')[1].toUpperCase()+'</a></td>\
                           <td>￥'+data.ClosedPrice+'</td>\
                           <td>'+data.Amount+'</td>\
                           <td>'+_HL+'%</td>\
                        </tr>';
                  list.push(data);
                  $tbody.append(html);
               }*/
               //flag = false;
            }
            //tobj.showCurrencyMarket(list,data.MarketId.split('_')[0]);
         }else{
            if(0===list.length){
               list.push(data);
            }else{
               for(i =0;i<list.length;i++){
                  if(list[i].MarketId == data.MarketId){
                     $.extend(true,list[i],data);
                     break;
                  }
               }
            }
         }
         //tobj.marketObj.clist = list;
         tobj.marketObj[_sign]=list;
         //if(flag){
         tobj.showCurrencyMarket(list,_sign);
         //}
         var kData = [];
         kData.push(data.OpenPrice);
         kData.push(data.ClosedPrice);
         kData.push(data.HighPrice);
         kData.push(data.LowPrice);
         kData.push(data.Volume);
         var oldData = tobj.dict[data.FrequencyKey];
         if (oldData == undefined) {
            var categoryData = [];
            var values = [];
            var volumns = [];

            var deas = [];
            var diffs = [];
            var deas = [];
            var macds = [];

            var ema12 = data.ClosedPrice * 2 / 13;
            var ema26 = data.ClosedPrice * 2 / 27;
            var diff = ema12 - ema26;
            var dea = diff * 2 / 10;
            var macd = 2 * (diff - dea);
            diffs.push(diff.toFixed(2));
            deas.push(dea.toFixed(2));
            macds.push(macd.toFixed(2));

            categoryData.push(data.OpenTime);
            values.push(kData);
            volumns.push(data.Volume);
            var result = {
               categoryData: categoryData,
               values: values,
               volumns: volumns,
               lastId: data.Id,
               Diffs: diffs,
               Deas: deas,
               Macds: macds,
               PreEma12: ema12,
               PreEma26: ema26,
               PreDea: dea
            };
            tobj.dict[data.FrequencyKey] = result;
            var frequencyKey = tobj.sign;
            //更新K线图
            if (data.FrequencyKey == frequencyKey){
               tobj.drawingKLine(frequencyKey);
            }
         }else {
            var ema12 = oldData.PreEma12 * 11 / 13 + data.ClosedPrice * 2 / 13;
            var ema26 = oldData.PreEma26 * 25 / 27 + data.ClosedPrice * 2 / 27;
            var diff = ema12 - ema26;
            var dea = oldData.PreDea * 8 / 10 + diff * 2 / 10;
            var macd = 2 * (diff - dea);

            if (data.Id == oldData.lastId + 1) {
               oldData.categoryData.push(data.OpenTime);
               oldData.values.push(kData);
               oldData.volumns.push(data.Volume);
               oldData.lastId = data.Id;

               oldData.Diffs.push(diff.toFixed(2));
               oldData.Deas.push(dea.toFixed(2));
               oldData.Macds.push(macd.toFixed(2));

               oldData.PreEma12 = ema12;
               oldData.PreEma26 = ema26;
               oldData.PreDea = dea;
               var frequencyKey = tobj.sign;
               //更新K线图
               if (data.FrequencyKey == frequencyKey)
                  tobj.drawingKLine(frequencyKey);

            } else if (data.Id > oldData.lastId) {
               tobj.RepairKLine(data.FrequencyKey, oldData.lastId,root);
            } else if (data.Id == oldData.lastId) {
               oldData.values[oldData.length - 1] = kData;
               oldData.Diffs[oldData.length - 1] = diff.toFixed(2);
               oldData.Deas[oldData.length - 1] = dea.toFixed(2);
               oldData.Macds[oldData.length - 1] = macd.toFixed(2);

               oldData.PreEma12 = ema12;
               oldData.PreEma26 = ema26;
               oldData.PreDea = dea;

               var frequencyKey = tobj.sign;
               //更新K线图
               if (data.FrequencyKey == frequencyKey)
                  tobj.drawingKLine(frequencyKey);
            }
         }
         /*var oldData = tobj.dict[data.FrequencyKey];
         var kData = [];
         kData.push(data.OpenPrice);
         kData.push(data.ClosedPrice);
         kData.push(data.HighPrice);
         kData.push(data.LowPrice);
         kData.push(data.Volume);
         if (oldData == undefined) {
            var categoryData = [];
            var values = [];
            var volumns = [];
            categoryData.push(data.OpenTime);
           
            values.push(kData);
            volumns.push(data.Volume);
            var result = {
               categoryData: categoryData,
               values: values,
               volumns: volumns,
               lastId: data.Id
            };
            tobj.dict[data.FrequencyKey] = result;
            var frequencyKey = tobj.sign;
            //更新K线图
            if (data.FrequencyKey == frequencyKey)
               tobj.drawingKLine(frequencyKey);
         } else {
            if (data.Id == oldData.lastId + 1) {
               oldData.categoryData.push(data.OpenTime);
               oldData.values.push(kData);
               oldData.volumns.push(data.Volume);
               oldData.lastId = data.Id;
            } else if (data.Id > oldData.lastId) {
               tobj.RepairKLine(data.FrequencyKey, oldData.lastId,root);
            }else if (data.Id == oldData.lastId) {
               oldData.values[oldData.length - 1] = kData;
               var frequencyKey = tobj.sign;
               //更新K线图
               if (data.FrequencyKey == frequencyKey)
                  tobj.drawingKLine(frequencyKey);
            }
         }*/
      	},
      	StartWS: function(root) {
	         var BindMarket = root.lookup("BindMarket"),
	            Chat = root.lookup("Chat"),
	            Error = root.lookup("Error"),
	            ReceiveChat = root.lookup("ReceiveChat"),
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
	            ws = new WebSocket("ws://10.45.0.41:8888/");//192.168.3.114:8987
	         ws.onopen = function (e) {
	            console.log("Connection open...");
	            // getMarketList(root,ws);
	            // BindToMarket();//先绑定到市场
	            bindToMarketDepth();//获取市场深度
	            // bindToTradeDetail();//获取交易明细
	            initKChart();// 默认k线图数据
	            // ReceiveChatCmd(); // 接收聊天内容
	            if(obj.sign){
	               LoginVerify();
	               // getMarketInfos();
	            }
	            //initKChart('D1');
	         };
	         ws.binaryType = "arraybuffer";
	         ws.onmessage = function (e) {
	            if (e.data instanceof ArrayBuffer) {
	               var cmdArray = new Uint8Array(e.data, 0, 2);
	               var receiveBuffer = new Uint8Array(e.data, 2);
	               var cmd = tobj.ByteToUnShort(cmdArray),data=null;
	               console.log('cmd',cmd);
	               console.log('cmdtobj',tobj.ReceiveCommand.MarketDepth);
	               if (cmd == tobj.ReceiveCommand.Error) {
	                  var data = Error.decode(receiveBuffer);
	                  obj.hideTips(data.Message,'green');
	                  console.log("系统错误：",data);
	               }else if (cmd == tobj.ReceiveCommand.ChatContent) {
	                  //解析聊天内容
	                  data = Chat.decode(receiveBuffer);
	                  tobj.getChatList([{type: 1,name: data.Name,txt: data.Content}]);
	                  tobj.scrolls();
	               } else if (cmd == tobj.ReceiveCommand.SingleKLine) {
	                  data = KLineInfo.decode(receiveBuffer);
	                  //处理数据
	                  console.log('SingleKLine: ',data);
	                  tobj.processSingleData(ws, root, data,{key: data.FrequencyKey,id: data.MarketId});
	               }else if(cmd==tobj.ReceiveCommand.ScrollDayKLine){
	                  data=ScrollDayKLine.decode(receiveBuffer);
	                  console.log('ScrollDayKLine: ',data);
	                  tobj.processSingleData(ws, root, data);
	               } else if (cmd == tobj.ReceiveCommand.BatchKLine) {
	                  var batchData = KLineList.decode(receiveBuffer);
	                  //处理数据
	                  console.log('BatchKLine:',batchData);
	                  tobj.processListData(batchData.List);
	               }else if(cmd == tobj.ReceiveCommand.BatchKLineSendComplate) {
	                  console.log("传输完成");
	                  var frequencyKey = tobj.sign;
	                  tobj.drawingKLine(frequencyKey);
	               } else if (cmd == tobj.ReceiveCommand.TradeSimpleDto) {
	                  //单条交易数据直接附加
	                  data = TradeSimpleDto.decode(receiveBuffer);
	                  console.log('单条',data);
	                  tobj.timeObj.st1=new Date().getTime();
	                  operateMarketDetail(data,1);
	               } else if (cmd == tobj.ReceiveCommand.TradeSimpleDtoList) {
	                  //批量交易数据需要先清空容器
	                  var list = TradeSimpleDtoList.decode(receiveBuffer);
	                  console.log('批量',list);
	                  tobj.timeObj.st1=new Date().getTime();
	                  operateMarketDetail(list.List||[]);
	               }else if(cmd==tobj.ReceiveCommand.MarketDepth){
	               	console.log('图表22222222222222222222222222');
	                  data=MarketDepth.decode(receiveBuffer);
	                  console.log('MarketDepth: ',data);
	                  operateMarketDepth(data);
	                  tobj.drawingAskBidChart(data);
	               }else if (cmd == tobj.ReceiveCommand.CreateOrder) {
	                  data = OrderInfo.decode(receiveBuffer);
	                  console.log("有普通订单创建",data);
	                  tobj.showOrders(data,1);
	               }else if (cmd == tobj.ReceiveCommand.CreatePlanOrder) {
	                  data = PlanOrderInfo.decode(receiveBuffer);
	                  console.log("有计划订单创建",data);
	                  tobj.showOrders(data,2);
	               }else if (cmd == tobj.ReceiveCommand.UpdateOrder) {
	                  data = UpdateOrderInfo.decode(receiveBuffer);
	                  console.log("订单信息发生改变",data);
	                  tobj.showOrders(data,3);
	               } else if (cmd == tobj.ReceiveCommand.PlanOrderTrigger) {
	                  var data = PlanOrderTrigger.decode(receiveBuffer);
	                  console.log("计划订单被触发",data);
	                  $('#plan-table.on tbody>tr').each(function(){
	                     var that = $(this),
	                        $a=that.find('a'),
	                        _status=$.t('processing');
	                     if(data.Id==$a.data('id')){
	                        if((0!=list[i].Price)&&(1==list[i].Status)){
	                           if(list[i].Price==list[i].HighTriggerPrice){
	                              if(1==list[i].OrderType){
	                                 _status=$.t('al_highTrigger');
	                              }else{
	                                 _status=$.t('al_bottomTrigger');
	                              }
	                           }else if(list[i].Price==list[i].LowTriggerPrice){
	                              if(1==list[i].OrderType){
	                                 _status=$.t('al_stopProfit');
	                              }else{
	                                 _status=$.t('al_stopLose');
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
	         }
	         ws.onclose = function (e) {
	            console.log("Connection closed", e);
	            setTimeout(function () { tobj.StartWS(root); }, 2000);
	         };
	         // 登陆到当前市场
	         function LoginVerify() {

	            var loginInfo = Login.create({ UserId: tobj.loginCookie.id, SecretKey: tobj.loginCookie.key, MarketId: tobj.marketId }),
	               dataBuffer = Login.encode(loginInfo).finish(),
	               buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.Login, dataBuffer);
	            if (ws.readyState == WebSocket.OPEN) {
	               ws.send(buffer);
	            }
	         }
	         // 启动监听市场
	         function BindToMarket() {
	            var bindMarket = BindMarket.create({ MarketId: tobj.marketId });
	            var dataBuffer = BindMarket.encode(bindMarket).finish();
	            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.BindMarket, dataBuffer);
	            if (ws.readyState === WebSocket.OPEN) {
	               ws.send(buffer);
	            } else {

	            }
	         }
	         // 启动监听市场深度
	         function bindToMarketDepth(){
	            var bindMarket = SetMarketDepth.create({ MarketId: tobj.marketId,DepthKey:tobj.marketObj.key });
	            var dataBuffer = SetMarketDepth.encode(bindMarket).finish();
	            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.SetMarketDepth, dataBuffer);
	            if (ws.readyState === WebSocket.OPEN) {
	               ws.send(buffer);
	            } else {

	            }
	         }
	         // 启动监听市场明细
	         function bindToTradeDetail(){
	            var data = SetTradeOrder.create({ MarketId: tobj.marketId, Count: parseInt(tobj.marketObj.count) });
	            var dataBuffer = SetTradeOrder.encode(data).finish();
	            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.SetTradeOrder, dataBuffer);
	            if (ws.readyState === WebSocket.OPEN) {
	               ws.send(buffer);
	            } else {

	            }
	         }
	         // 市场深度/交易明细
	         $('.about-box').on('click','>.about-list>li>span',function(){
	            var index = $('.sort-list>li.on').index();
	            tobj.changeMarketParam();
	            if(0===index){
	               bindToMarketDepth();
	            }else{
	               bindToTradeDetail();
	            }
	         });
	         // 交易明细
	         // function operateMarketDetail(data){
	         //    var list = [],list2=[],html = '',total=0,i=0,$tr,scale,time,val,$i,$current=$('.current-price'),_fk='',dhtml='',_price=0,_diff=0;
	         //    //console.log('==========data',data instanceof Array,'list',tobj.marketObj.list);
	         //    if(data instanceof Array){
	         //       list = data;
	         //       if(0==list.length){return false;}
	         //       list.slice(0,tobj.marketObj.count);
	         //       list2=JSON.parse(JSON.stringify(list));
	         //       list2.sort(function(a,b){return b.Volume-a.Volume;});
	         //       total = list2[0].Volume;
	         //       tobj.detailObj.volume=total;
	         //       for(i;i<list.length;i++){
	         //          scale = (list[i].Volume/total*80<1)?1:(list[i].Volume/total)*80,
	         //          time = (list[i].CreateTime).split(' ');
	                     
	         //          html += '<tr class="'+(list[i].IsAsk?'green':'red')+'" data-id="'+list[i].Id+'">\
	         //                      <td>'+time[1]+'</td>\
	         //                      <td>'+list[i].Price+'</td>\
	         //                      <td class="txt-right"><i class="icon"></i><span class="d_volume">'+list[i].Volume+'</span></td>\
	         //                      <td><i class="buz-scale" style="width: '+(total>list[i].Volume?scale:80)+'px;"></i></td>\
	         //                   </tr>';
	         //       }
	         //       list2.sort(function(a,b){return b.Price-a.Price;});
	         //       tobj.detailObj.price = list2[0].Price;
	         //       //tobj.marketObj.list=list;


	         //       $('#deal-table>tbody').html(html);
	         //       _price=tobj.detailObj.price;
	               
	         //    }else{
	         //       /*list = tobj.marketObj.list;
	               
	         //       list2=JSON.parse(JSON.stringify(list));
	         //       list2.sort(function(a,b){return b.Volume-a.Volume;});*/
	         //       //total = list2[0].Volume;
	         //       //$('#buy-price,#sell-price,#limit-min-buy-price,#limit-min-sell-price').val(data.Price);
	         //       time = (data.CreateTime).split(' ');
	         //       if(data.Volume>tobj.detailObj.volume){
	         //          total= data.Volume;
	         //          $('#deal-table>tbody>tr').each(function(){
	         //             var that = $(this),
	         //                _vol=parseFloat(that.find('.d_volume').text());

	         //             that.find('.buz-scale').css('width',(total>_vol?scale:80));
	         //          });
	         //       }else{
	         //          total=tobj.detailObj.volume;
	         //       }
	         //       scale = (data.Volume/total*80<1)?1:(data.Volume/total)*80;

	         //       html = '<tr class="'+(data.IsAsk?'green':'red')+'" data-id="'+data.Id+'">\
	         //                <td>'+time[1]+'</td>\
	         //                <td>'+data.Price+'</td>\
	         //                <td class="txt-right"><i class="icon '+((data.Price>tobj.detailObj.price)?'icon-down7':'icon-up')+'"></i><span class="d_volume">'+data.Volume+'</span></td>\
	         //                <td><i class="buz-scale" style="width: '+(total>data.Volume?scale:80)+'px;"></i></td>\
	         //             </tr>';
	         //       $('#deal-table>tbody>tr:last').remove();
	         //       $('#deal-table>tbody').prepend(html);
	         //       setTimeout(function(){
	         //          $('#deal-table>tbody>tr[data-id="'+data.Id+'"]').find('.icon').removeClass('icon-down7 icon-up');
	         //       },1000);
	         //       _price=data.Price;
	               
	         //       /*if(0!=count){
	         //          $tr=$('#deal-table>tbody>tr').eq(i);
	         //          $i=$tr.find('.icon');
	         //          val = $tr.find('td').eq(1).text();
	         //          $tr.find('td').eq(0).text(time[1]);
	         //          $tr.find('td').eq(1).text(data.Price);
	         //          $tr.find('.buz-scale').css('width',(total>data.Volume?scale:80));
	         //          if(val<data.Price){
	         //             $tr.removeClass('red').addClass('green');
	         //             $i.addClass('icon-down7').removeClass('icon-up');
	         //          }else if(val>data.Price){
	         //             $tr.removeClass('green').addClass('red');
	         //             $i.addClass('icon-up').removeClass('icon-down7');
	         //          }else{
	         //             $i.removeClass('icon-down7 icon-up');
	         //             $tr.removeClass('green red');
	         //          }
	         //       }else{
	         //          html = '<tr>\
	         //                   <td>'+time[1]+'</td>\
	         //                   <td>'+data.Price+'</td>\
	         //                   <td class="txt-right"><i class="icon"></i><span>'+data.Volume+'</span></td>\
	         //                   <td><i class="buz-scale" style="width: '+(total>data.Volume?scale:80)+'px;"></i></td>\
	         //                </tr>';
	         //          $('#deal-table>tbody').prepend(html);
	         //       }*/
	         //    }
	         //    tobj.changePrice(_price);
	         //    if((''==$current.text())||($current.text()>_price)){
	         //       $current.text(_price).removeClass('green').addClass('red');
	         //    }else{
	         //       $current.text(_price).removeClass('red').addClass('green');
	         //    }
	         //    /*if((''==$current.text())||($current.text()>_price)){
	         //       $current.text(_price).removeClass('green').addClass('red');
	         //       $('.priceTrend').addClass('red').removeClass('green');
	         //       dhtml=_price+'<i class="icon icon-rise"></i>';
	         //       if(''==$current.text()){
	                  
	         //       }
	         //    }else{
	         //       $current.text(_price).removeClass('red').addClass('green');
	         //       $('.priceTrend').addClass('green').removeClass('red');
	         //       dhtml=_price+'<i class="icon icon-fall"></i>';
	         //    }
	         //    _diff=(tobj.timeObj.ed1-tobj.timeObj.st1)/1000;
	         //    if(0>_diff||1<_diff){
	         //       $('.day-price').html(dhtml);
	         //       tobj.timeObj.ed1=new Date().getTime();
	         //    }*/
	         //    tobj.getAverage();
	         //    tobj.marketObj.list = list;
	         // }
	         // 展示市场深度数据
	         function operateMarketDepth(data){
	            var askList = data.AskList || [],
	               bidList = data.BidList || [],
	               tmp = JSON.parse(JSON.stringify(bidList)),tmp2 = JSON.parse(JSON.stringify(askList)),
	               html='',html2='',total = 0,scale=1,i=0,tmp3=0,diff=0,
	               _sign=tobj.marketObj.key.split('-'),
	               less=_sign[1];

	            bidList.sort(function(a,b){return b.Price-a.Price;});
	            askList.sort(function(a,b){return b.Price-a.Price;});
	            tmp.sort(function(a,b){return b.Total-a.Total;});
	            tmp2.sort(function(a,b){return b.Total-a.Total;});

	            // 买
	            if(0<bidList.length){
	               total = tmp[0].Total;
	               tobj.signPrice.buy=bidList[0].Price;
	            }
	            for(i = 0;i<_sign[0];i++){
	               if(bidList[i]&&bidList[i].Total){
	                  scale = (bidList[i].Total/total)*80<1?1:(bidList[i].Total/total)*80;
	                  html += '<tr class="red">\
	                              <td>'+$.t("purchase")+(i+1)+'</td>\
	                              <td>'+obj.getFloatValue(bidList[i].Price,less)+'</td>\
	                              <td class="txt-right"><span>'+bidList[i].Total+'</span></td>\
	                              <td><i class="buz-scale" style="width: '+(total>bidList[i].Total?scale:80)+'px;"></i></td>\
	                           </tr>';
	               }else{
	                  diff=_sign[0]-i;
	                  break;
	                  //html +='<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
	               }
	            }
	            $('#buy-table>tbody').html(html);
	            for(i=0;i<diff;i++){
	               $('#buy-table>tbody').append('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>')
	            }

	            // 卖
	            if(0<askList.length){
	               tmp3 = tmp2[0].Total;
	               total=tmp3<total?total:tmp3;
	               tobj.signPrice.sale=askList[askList.length-1].Price;
	               diff=0;
	            }
	            for(i = 0;i<_sign[0];i++){
	               if(askList[i]&&askList[i].Total){
	                  scale = (askList[i].Total/total)*80<1?1:(askList[i].Total/total)*80;
	                  html2 += '<tr class="green">\
	                              <td>'+$.t("betray")+(askList.length-i)+'</td>\
	                              <td>'+obj.getFloatValue(askList[i].Price,less)+'</td>\
	                              <td class="txt-right"><span>'+askList[i].Total+'</span></td>\
	                              <td><i class="buz-scale" style="width: '+(total>askList[i].Total?scale:80)+'px;"></i></td>\
	                           </tr>';
	               }else{
	                  diff=_sign[0]-i;
	                  break;
	                  //html2 +='';
	               }
	            }
	            $('#sale-table>tbody').html(html2);
	            for(i=0;i<diff;i++){
	               $('#sale-table>tbody').prepend('<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>')
	            }
	         }
	         // 点击深度中的挂单，价格、量、百分比应联动
	         $('.buz-table').on('click','>tbody>tr',function(){
	            var that = $(this);
	               $td = that.find('td'),
	               price = $td.eq(1).text(),
	               $table=that.closest('.buz-table');
	            if(!!price){
	               if('deal-table'!=$table.prop('id')){
	                  //$('#buy-price,#sell-price,#limit-min-buy-price,#limit-min-sell-price').val(price);
	                  tobj.changePrice(price);
	               }
	            }
	         });
	         // 切换基币市场tab
	         $('.s-tab').on('click','>li',function(){
	            var index = $(this).index();
	            if($(this).hasClass('active')){return false;}
	            tobj.currencyObj.base = ($(this).text()).toLowerCase();
	            $(this).addClass('active').siblings().removeClass('active');
	            $('.table-box .coin-table').eq(index).addClass('show').siblings().removeClass('show');
	            tobj.marketObj.collect = 0;
	            $('#input-search').val('');
	            tobj.marketObj.clist = [];
	            getMarketList(root,ws);
	         });
	         // k线图数据切换
	         $('.m-chart').on('click','>.chart-tab>li',function(){
	            tobj.sign = $(this).attr('data-sign');
	            if(!$(this).hasClass('active')){
	               $(this).addClass('active').siblings().removeClass('active');
	            }else{return false;}
	            initKChart();
	         });
	         // 左侧市场切换
	         $('.left-top').on('click','>.top-list>li',function(){
	            var that = $(this),
	               txt = that.text(),
	               $tl = that.parent(),
	               prev = that.closest('.left-top'),
	               marketId = txt.toLowerCase()+'_'+$('.buyType').eq(0).text().toLowerCase();

	            $(document.body).append('<a href="./trade.html?marketid='+marketId+'" id="link-attr" target="_blank"></a>');
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
	         // function getMarketList(root,ws){
	            
	         //    tobj.getBaseMarketListZH(function(res){
	         //       var list = [],list2=[],$table=$('.table-box .coin-table.show');
	         //       if(res.IsSuccess){
	         //          list = res.Data || [];
	         //          tobj.otherMarkerIdsZH = [],tobj.otherMarkerIdsZH=[],tobj.otherMarkerIds=[];
	         //          for(var i = 0;i<list.length;i++){
	         //             list2.push(list[i].Id);
	         //             tobj.otherMarkerIdsZH.push({TargetId: list[i].TargetId,TargetName: list[i].TargetName,Id: list[i].Id});
	         //          }
	         //          for(var i =0;i<list2.length;i++){
	         //             if(-1==list2.indexOf(tobj.otherMarkerIds[i])){
	         //                tobj.otherMarkerIds.push(list2[i]);
	         //             }
	         //          }
	         //          tobj.getMarketCollect(function(res){
	         //             var list = tobj.otherMarkerIdsZH,collect=[],html='',
	         //                _sign=$('.s-tab>.active').text().toLowerCase(),sel='',
	         //                arry=tobj.marketId.split('_'),tmp=[];
	         //             collect = res.Data||[];
	         //             tobj.collect=collect;
	         //             tmp=tobj.marketObj[_sign]=tobj.marketObj[_sign]?tobj.marketObj[_sign]:[];
	         //             if(0===$table.find('tr').length){
	         //                for(var i = 0;i<list.length;i++){
	         //                   list[i].collect=false;
	         //                   for(var j = 0;j<collect.length;j++){
	         //                      if(list[i].Id===collect[j]){
	         //                         list[i].collect=true;
	         //                      }
	         //                   }
	         //                   if(arry[1]==list[i].TargetId){
	         //                      sel="cur";
	         //                   }else{
	         //                      sel='';
	         //                   }
	         //                   html += '<tr data-type="'+list[i].TargetId+'" class="'+sel+'">\
	         //                      <td><i class="icon '+(list[i].collect?'icon-star':'icon-unstar')+'" data-market="'+list[i].Id+'"></i></td>\
	         //                      <td>'+(list[i].TargetId).toUpperCase()+'</td>\
	         //                      <td>--</td>\
	         //                      <td>--</td>\
	         //                      <td>--</td>\
	         //                   </tr>';
	         //                   tmp[i]={MarketId: list[i].Id,TargetName: list[i].TargetName,TargetId: (list[i].TargetId).toUpperCase()};
	         //                }
	         //                tobj.marketObj[_sign]=tmp;
	         //                $table.html(html);
	         //                tobj.otherMarkerIdsZH=list;
	         //             }else{

	         //             }
	         //             tobj.ReceiveOtherMarket(root,ws);
	         //          });
	         //       }
	         //    });
	         // }
	         // 获取市场信息
	         function getMarketInfos(root,ws){
	            tobj.getMarketInfo(function(res){
	               var $span = $('.about-list.show>li:nth-child(2)>span'),data={};
	               if(res.IsSuccess){
	                  data=res.Data;
	                  $span.each(function(){
	                     var that = $(this);
	                     if(data.Precision==that.text()){
	                        that.addClass('on').siblings('span').removeClass('on');
	                        return false;
	                     }
	                  });
	                  tobj.changeMarketParam();
	                  bindToMarketDepth();
	               }
	            });
	         }
	         // 初始化市场图表
	         function initKChart(){
	            var frequency = Frequency.create({ MarketId: tobj.marketId, FrequencyKey: tobj.sign, IsGraph: true, IsReconnect: false });
	            var dataBuffer = Frequency.encode(frequency).finish();
	            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.SetKLineFequency, dataBuffer);
	            if (ws.readyState === WebSocket.OPEN) {
	               ws.send(buffer);
	            } else {

	            }
	         }
	         function ReceiveChatCmd() {
	            var receiveChat = ReceiveChat.create({ MarketId: tobj.marketId });
	            var dataBuffer = ReceiveChat.encode(receiveChat).finish();
	            var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.ReceiveMarketChat, dataBuffer);
	            if (ws.readyState == WebSocket.OPEN) {
	               ws.send(buffer);
	            }
	         }
	         // 聊天信息回车发送
	         // $('#input-chat').on('keypress',function(e){
	         //    e = e || window.event;
	         //    var val = $(this).val(),
	         //       data = { Name: tobj.nickname, Content: val, SourceId: tobj.marketId };
	         //    val.trim();
	         //    if((e.keyCode && 13==e.keyCode) || (e.which && 13==e.which) && !!val){
	         //       console.log(data);
	         //       var newchat = Chat.create(data);
	         //       var dataBuffer = Chat.encode(newchat).finish();
	         //       var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.ClientUserChat, dataBuffer);
	         //       $(this).val('');
	         //       if (ws.readyState === WebSocket.OPEN) {
	         //          ws.send(buffer);
	         //          tobj.getChatList([{type: 2,name: tobj.nickname,txt: val}]);
	         //          tobj.scrolls();
	         //       } else {

	         //       }
	         //       /*tobj.getChatList([{type: 2,name: '匿名',txt: $(this).val()}]);
	         //       tobj.scrolls();
	         //       $(this).val('');*/
	         //    }
	         // });
	    },
	    // 发送二进制数据
	    GenerateCmdBuffer: function(controller,command, dataBuffer) {
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
	        var allBuffer = dcodeIO.ByteBuffer.concat([controllerBigEndian,commandBigEndian, dataBuffer], "binary");
	        return allBuffer.view;
	    },
	    ByteToUnShort: function(b){
        	return (b[0] & 0xff) | ((b[1] & 0xff) << 8);
        },
        calculateMA: function(dayCount, data) {
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
	    ReceiveOtherMarket: function(root, ws) {
	         var otherMarkerIds = tobj.otherMarkerIds;//右上角市场列表
	         //otherMarkerIds.push(tobj.marketId);  // 当前市场
	         var MarketFrequency = root.lookup("MarketKLineFrequency");
	         var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
	         var list = new Array();
	         for (var i = 0; i < otherMarkerIds.length; i++) {
	            var marketId = otherMarkerIds[i];
	            var marketFrequency = MarketFrequency.create({ MarketId: marketId, Keys: ["SD1", "D1"] });
	            list.push(marketFrequency);
	         }
	         var fList = MarketFrequencyList.create({ List: list });
	         var dataBuffer = MarketFrequencyList.encode(fList).finish();
	         var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.SetReceiveOtherMarketKLine, dataBuffer);
	         if (ws.readyState === WebSocket.OPEN) {
	            ws.send(buffer);
	         } else {

	         }
	    },
	    // 获取订单列表
	    getOrderList: function(type){
	        var url = '/order/GetOrderList';
	        if(2==type){
	            url = '/order/GetPlanOrderList';
	        }
	        obj.ajaxFn(url,{
	            data: {marketId: tobj.marketId,orderType: 0,status: 1,page: 1,pageSize: 50},
	            callback: function(res){
	               var list = [];
	               if(res.IsSuccess){
	                  list = res.Data.Items;
	                  tobj.showOrders(list,type||1);
	               }
	            }
	        });
	    },
        showOrders: function(list,type){
	         var html = '',selector='#limit-table',sel = 'red',buz=$.t('buy'),index = 0,data={},diff,_status=$.t('processing');
	         if(3==type){

	            $(selector).find('tbody>tr').each(function(){
	               var _tr=$(this),
	                  _id=_tr.find('a').attr('data-id');
	               if(list.OrderId == _id){
	                  _tr.remove();
	                  return false;
	               }
	            });
	            diff=(tobj.timeObj.ed-tobj.timeObj.st)/1000;
	            if(diff>3){
	               tobj.timeObj.st=new Date().getTime();
	               tobj.getMarket();
	            }
	            return false;
	         }else if(2==type){
	            selector = '#plan-table';
	         }
	         if(list instanceof Array){
	            if(2==type){
	               index = 1;
	               for(var i = 0;i<list.length;i++){
	                  var txtArr = [$.t('high'),$.t('hunt')];
	                  var time=list[i].CreateTime,date=null;
	                  if(-1!==time.indexOf('(')){
	                     time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
	                     date = new Date(time);
	                  }else{
	                     time=time.replace(/\//g,'-');
	                     time=time.substr(time.indexOf('-')+1);
	                  }
	                  if(2==list[i].OrderType){
	                     sel  = 'green';
	                     buz=$.t('sell');
	                     txtArr = [$.t('s_profit'),$.t('s_loss')];
	                  }else{
	                     sel  = 'red';
	                     buz=$.t('buy');
	                  }
	                  if((0!=list[i].Price)&&(1==list[i].Status)){
	                     if(list[i].Price==list[i].HighTriggerPrice){
	                        if(1==list[i].OrderType){
	                           _status=$.t('al_highTrigger');
	                        }else{
	                           _status=$.t('al_bottomTrigger');
	                        }
	                     }else if(list[i].Price==list[i].LowTriggerPrice){
	                        if(1==list[i].OrderType){
	                           _status=$.t('al_stopProfit');
	                        }else{
	                           _status=$.t('al_stopLose');
	                        }
	                     }
	                  }
	                  html += '<tr class="'+sel+'">\
	                        <td>'+(date?date.format("MM-dd hh:mm:ss"):time)+'</td>\
	                        <td>'+buz+'</td>\
	                        <td>'+obj.scienceToNum(list[i].Amount,8)+'/'+(1==list[i].OrderType?list[i].TxAmount:list[i].TxVolume)+'（'+(list[i].CurrencyId).toUpperCase()+'）'+'</td>\
	                        <td>\
	                           <label>'+txtArr[0]+'：<span>'+obj.scienceToNum(list[i].HighTriggerPrice,8)+'</span></label>\
	                           <label>'+txtArr[1]+'：<span>'+obj.scienceToNum(list[i].LowTriggerPrice,8)+'</span></label>\
	                        </td>\
	                        <td>\
	                           <label>'+txtArr[0]+'：<span>'+obj.scienceToNum(list[i].HighPrice,8)+'</span></label>\
	                           <label>'+txtArr[1]+'：<span>'+obj.scienceToNum(list[i].LowPrice,8)+'</span></label>\
	                        </td>\
	                        <td>'+_status+'</td>\
	                        <td><a href="javascript:;" data-id="'+list[i].Id+'" data-type="2" data-order="'+list[i].OrderType+'">'+$.t("revocation")+'</a></td>\
	                     </tr>';
	               }
	            }else if(1==type){
	               for(var i = 0;i<list.length;i++){
	                  var time=list[i].CreateTime,date=null;
	                  if(-1!==time.indexOf('(')){
	                     time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
	                     date = new Date(time);
	                  }else{
	                     time=time.replace(/\//g,'-');
	                     time=time.substr(time.indexOf('-')+1);
	                  }
	                  if(2==list[i].OrderType){
	                     sel  = 'green';
	                     buz=$.t('sell');
	                  }else{
	                     sel  = 'red';
	                     buz=$.t('buy');
	                  }
	                  html +='<tr class="'+sel+'">\
	                        <td>'+(date?date.format("MM-dd hh:mm:ss"):time)+'</td>\
	                        <td>'+buz+'</td>\
	                        <td><span>'+obj.scienceToNum(list[i].Volume,8)+'</span>/<span>'+obj.scienceToNum(list[i].TxVolume,8)+'</span></td>\
	                        <td>¥<span>'+obj.scienceToNum(list[i].Price,8)+'</span></td>\
	                        <td>¥<span>'+obj.scienceToNum(list[i].TxAmount,8)+'</span></td>\
	                        <td><a href="javascript:;" data-id="'+list[i].Id+'" data-type="1" data-order="'+list[i].OrderType+'">'+$.t("revocation")+'</a></td>\
	                     </tr>';
	               }
	            }
	            $(selector).find('tbody').html(html);
	         }else{
	            data=list;
	            if(2===type){
	               index=1;

	               var txtArr = [$.t('high'),$.t('hunt')];
	               var time = data.CreateTime,date=null;
	               if(-1!==time.indexOf('(')){
	                  time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
	                  date = new Date(time);
	               }else{
	                  time=time.replace(/\//g,'-');
	                  time=time.substr(time.indexOf('-')+1);
	               }
	               if(2===data.OrderType){
	                  sel  = 'green';
	                  buz=$.t('sell');
	                  txtArr = [$.t('s_profit'),$.t('s_loss')];
	               }else{
	                  sel  = 'red';
	                  buz=$.t('buy');
	               }
	               if((0!=data.Price)&&(1==data.Status)){
	                  if(data.Price==data.HighTriggerPrice){
	                     if(1==data.OrderType){
	                        _status=$.t('al_highTrigger');
	                     }else{
	                        _status=$.t('al_bottomTrigger');
	                     }
	                  }else if(data.Price==data.LowTriggerPrice){
	                     if(1==data.OrderType){
	                        _status=$.t('al_stopProfit');
	                     }else{
	                        _status=$.t('al_stopLose');
	                     }
	                  }
	               }
	               html = '<tr class="'+sel+'">\
	                     <td>'+(date?date.format("MM-dd hh:mm:ss"):time)+'</td>\
	                     <td>'+buz+'</td>\
	                     <td>'+obj.scienceToNum(data.Amount,8)+'/'+(1==data.OrderType?data.TxAmount:data.TxVolume)+'（'+(data.CurrencyId).toUpperCase()+'）'+'</td>\
	                     <td>\
	                        <label>'+txtArr[0]+'：<span>'+obj.scienceToNum(data.HighTriggerPrice,8)+'</span></label>\
	                        <label>'+txtArr[1]+'：<span>'+obj.scienceToNum(data.LowTriggerPrice,8)+'</span></label>\
	                     </td>\
	                     <td>\
	                        <label>'+txtArr[0]+'：<span>'+obj.scienceToNum(data.HighPrice,8)+'</span></label>\
	                        <label>'+txtArr[1]+'：<span>'+obj.scienceToNum(data.LowPrice,8)+'</span></label>\
	                     </td>\
	                     <td><a href="javascript:;" data-id="'+data.Id+'" data-type="2" data-order="'+data.OrderType+'">'+$.t("revocation")+'</a></td>\
	                  </tr>';
	            }else{
	               var time = data.CreateTime,date=null;
	               if(-1!==time.indexOf('(')){
	                  time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
	                  date = new Date(time);
	               }else{
	                  time=time.replace(/\//g,'-');
	                  time=time.substr(time.indexOf('-')+1);
	               }
	               if(2==data.OrderType){
	                  sel  = 'green';
	                  buz=$.t('sell');
	               }else{
	                  sel  = 'red';
	                  buz=$.t('buy');
	               }
	               html +='<tr class="'+sel+'">\
	                     <td>'+(date?date.format("MM-dd hh:mm:ss"):time)+'</td>\
	                     <td>'+buz+'</td>\
	                     <td><span>'+obj.scienceToNum(data.Volume,8)+'</span>/<span>'+obj.scienceToNum(data.TxVolume,8)+'</span></td>\
	                     <td>¥<span>'+obj.scienceToNum(data.Price,8)+'</span></td>\
	                     <td>¥<span>'+obj.scienceToNum(data.TxAmount,8)+'</span></td>\
	                     <td><a href="javascript:;" data-id="'+data.Id+'" data-type="1" data-order="'+data.OrderType+'">'+$.t("revocation")+'</a></td>\
	                  </tr>';
	            }
	            $(selector).find('tbody').prepend(html);
	         }
	         tobj.table = $('.order-table').eq(index);
	         $('.order-tab>li').eq(index).addClass('on').siblings().removeClass('on');
	         $('.order-table').eq(index).addClass('on').siblings().removeClass('on');
	         if(0==tobj.table.find('tr').length){
	            $('.isNull').eq(0).addClass('show');
	         }else{
	            $('.isNull').eq(0).removeClass('show');
	         }
	         tobj.getWidth();
         //tobj.getOrderInterval();
      	},
      	// 获取等比宽
        getWidth: function(title){
         	sel = tobj.table;
         	title = title || $('.order-title.on'),
         	_oW=$('.order-tables').width(),
         	_aw=1200<tobj.wWidth?(tobj.wWidth<_oW?tobj.wWidth:_oW):tobj.wWidth;

         	setTimeout(function(){
            $('.tables-box,.tables-box .jspContainer,.tables-box .jspPane').css('width',_aw);
            	var $td = sel.find('tbody>tr').eq(0).find('td'),
                $li = title.eq(0).find('li');

            	for(var i = 0;i<$td.length;i++){
               		~(function(index){
                  		var _li = $li.eq(index),
                    	_w = $td.eq(index).width();
                 		_li.width(_w);
               		})(i);
            	}
            	$('.tables-box').jScrollPane({stickToBottom: true,mouseWheelSpeed: 50});
	            $('.tables-box').css('width',_aw);
	        },350);
        },
      	// 获取挂单定时器
	    getOrderInterval: function(){
	        var that = $('.order-tab>li.on'),
	            index = that.index();
	        clearInterval(tobj.timer);
	        tobj.timer = setInterval(function(){
	            if(0===index){
	               tobj.getOrderList();
	            }else{
	               tobj.getOrderList(2);
	            }
	        },1000*30);
	    },
	    // 撤销订单
	    cancelOrder: function(){
	         obj.ajaxFn('/order/CancelOrder',{
	            data: tobj.cancelObj,
	            callback: function(res){
	               var type = tobj.cancelObj.category,msg = '';
	               if(res.IsSuccess){
	                  if(1==type){
	                     $('#limit-table>tbody>tr').each(function(){
	                        var _id = $(this).find('a').attr('data-id');
	                        if(tobj.cancelObj.orderId){
	                           $(this).remove();
	                           return false;
	                        }
	                     });
	                  }else{
	                     $('#plan-table>tbody>tr').each(function(){
	                        var _id = $(this).find('a').attr('data-id');
	                        if(tobj.cancelObj.orderId){
	                           $(this).remove();
	                           return false;
	                        }
	                     });
	                  }
	                  //tobj.getOrderList(type);
	                  tobj.getMarket();
	                  //obj.modHide('#mod-buz');
	               }else{
	                  msg = res.ErrorMsg||$.t('cancellation');
	                  $('#mod-buz .error-tips').html(msg);
	               }
	            }
	         });
	    },
        // 批量撤销订单
	    cancelAllOrder: function(){
	        obj.ajaxFn('/order/CancelAllOrder',{
	            data: tobj.cancelAllObj,
	            callback: function(res){
	               var type = tobj.cancelAllObj.orderCategory;
	               if(res.IsSuccess){
	                  //tobj.getOrderList(type);
	                  $('.order-table.on>tbody').empty();
	                  $('.isNull').eq(0).addClass('show');
	                  tobj.getMarket();
	               }else{
	                  msg = res.ErrorMsg||$.t('cancellation');
	                  $('#mod-buz .error-tips').html(msg);
	               }
	            }
	        });
	    },
	    initWS: function(){
         protobuf.load("../js/proto_market.json", function (err, root) {
            tobj.StartWS(root);
         });
      }
	};
	tobj.initWS();
	if(obj.sign){
        // tobj.getLoginCookie();
        // tobj.getTargetMarketList();
        //tobj.getCurrencyList();
        // tobj.getMarketNotice();
        // tobj.getNewsList();
        tobj.getOrderList();
        // tobj.getMarket();
        // tobj.scrolls();
    }else{
        $('.chat-box .chat-input').eq(0).removeClass('show');
        $('.not-login').addClass('show');
    }
	//tab栏转换
	$('.menu>li').on('mouseover',function(e){
		var _target = $(e.target),
		   	val = _target.attr('value')
		   	box = $('.box-model');
		box.removeClass('hide');
		if(val == 2){
			box.css('left','100px');
		}else if(val == 3){
			box.css('left','180px');
		}else if(val == 4){
			box.css('left','260px');
		}else if(val == 5){
			box.css('left','340px');
		}else if(val == 1){
			box.addClass('hide');
		}
	})
	$('.menu>li').on('mouseout',function(e){
		$('.box-model').addClass('hide');
	})
	//挂单点击切换
	$('.order>ul>li').on('click',function(e){
		var _target = e.target;
		console.log(_target);
		$('.order>ul').children().css('border-bottom','none');
		$(_target).css('border-bottom','2px solid #238afe');
	})
});