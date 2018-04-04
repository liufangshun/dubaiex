$(function () {
	var tobj = {};
	// 筛选框样式
	$('#currency-search').on('focus', function () {
		var val = $(this).val().trim();
		if (0 == val.length) {
			$('.search-input').addClass('active');
		}
	});
	$('#currency-search').on('blur', function () {
		var val = $(this).val().trim();
		if (0 == val.length) {
			$('.search-input').removeClass('active');
		}
	});
	if (0 != $('.market').length) {
		// top5切换
		$('.ctt').on('click', '>.tab-top5>li', function () {
			var index = $(this).index();
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.top5-box>ul').eq(index).addClass('show').siblings('ul').removeClass('show');
		});
		// 币种列表切换
		/*$('.ctt').on('click','>.tab-currency>li',function(){
		   var index = $(this).index();
		   $(this).addClass('active').siblings('li').removeClass('active');
		   $('.currency-box>table').eq(index).addClass('show').siblings('table').removeClass('show');
		});*/

		tobj = {
			dict: {},
			pageObj: {
				page: 0,
				size: 1,
				totalPg: 0
			},
			mediums: {
				bCny: 0,
				bUsdt: 0,
				eCny: 0,
				eUsdt: 0
			},
			Controllers: {
				MarketController: 1 //市场控制器
			},
			ReceiveCommand: {
				SingleKLine: 1000, //单条K线数据
				ScrollDayKLine: 1006, //滑动24H日线
				RankingDataList: 1007 //价格上涨幅度排行列表
			},
			SendCommand: {
				SetReceiveOtherMarketKLine: 902, //设置接收其它市场的K线数据
				BindMarket: 908, //绑定到指定市场
				GetRankingList: 909 //获取交易市场排行
			},
			marketObj: {
				clist: [],
				eth: [],
				mbtc: [],
				usdt: [],
				bitcny: []
			},
			otherMarkerIds: [],
			otherMarkerIdsZH: [],
			// baseMarkerIds: [],
			collectObj: [], //收藏
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
			// 获取3个主币种的交易量
			getPandect: function () {
				var list = ["usdt_mbtc", "usdt_eth", 'mbtc', 'eth', 'bitcny', 'usdt'];
				for (var i = 0; i < list.length; i++) {
					~(function (currencyId) {
						obj.ajaxFn('/Currency/GetTurnover', {
							data: {
								currencyId: currencyId
							},
							callback: function (res) {
								var sel = '.' + currencyId + '-num',
									data = res.Data;
								data = data.toFixed(2);
								if ('cny' == currencyId) {
									data = '￥' + data;
								}
								$(sel).text(data);
							}
						});
					})(list[i]);
				}
			},
			// 获取币种市场列表（zh）
			getBaseMarketListZH: function (callbacks) {
				obj.ajaxFn('/market/GetFullListByBasic', {
					data: {
						basicId: $('.tab-currency>li.active').text().toLowerCase()
					},
					callback: callbacks
				});
			},
			/*// 获取币种市场列表（en）
			getBaseMarketList: function(callbacks){
			   obj.ajaxFn('/market/GetListByBasic',{
			      data: {basicId: $('.tab-currency>li.active').text().toLowerCase()},
			      callback: callbacks
			   });
			},*/
			// 展示top5数据
			showTop5Data: function (list) {
				var html = '',
					index = $('.tab-top5>li.active').index(),
					$ul = $('.top5-box>ul'),
					sel = ['', ''],
					val = [0, 0],
					drfp = 0,
					wrfp = 0,
					lang = localStorage.getItem('i18next_lng');
				if ('en' == lang) {
					var _mediums = [tobj.mediums.bUsdt, tobj.mediums.eUsdt];
				} else {
					var _mediums = [tobj.mediums.bCny, tobj.mediums.eCny];
				}
				for (var i = 0; i < list.length; i++) {
					drfp = obj.getFloatValue(list[i].DayRiseFallPercent * 100, 2);
					wrfp = obj.getFloatValue(list[i].WeekRiseFallPercent * 100, 2);
					var targetId = list[i].MarketId.substr(list[i].MarketId.indexOf('_') + 1);
					var baseId = list[i].MarketId.split('_')[0];
					if (0 <= drfp) {
						// sel[0]='red';
						val[0] = '+' + drfp + '%';
					} else {
						// sel[0]='green';
						val[0] = drfp + '%';
					}
					if (0 <= wrfp) {
						// sel[1]='red';
						val[1] = '+' + wrfp + '%';
					} else {
						// sel[1]='green';
						val[1] = wrfp + '%';
					}
					// console.log('list',list[i]);
					// <img src="../imgs/icon-'+list[i].CurrencyIcon+'" alt="'+list[i].CurrencyName+'" />\
					html += '<li>\
							<a href="./trade.html?marketid=' + list[i].MarketId + '">\
							<div class="head-top5-list">\
							<div class="mesTop-head"> \
								<h5>' + ('en' == lang ? "$" : "¥") + obj.getFloatValue1(list[i].Price * ('mbtc' == baseId ? _mediums[0] : _mediums[1]), 2) + '</h5>\
								<p>' + list[i].Price + '</p>\
							</div>\
							<p class="mesTop-log">\
								<img src="' + (list[i].CurrencyId || targetId) + '"/><span>' + (list[i].CurrencyId.toUpperCase() || targetId.toUpperCase()) + '</span>\
							</a></p><div class="mesTop-hq"><div class="mesTop-hq-inf"><span>' + $.t("day") + '</span><p>' + sel[0] + val[0] + '</p></div><i></i><div class="mesTop-hq-inf" ><span>' + $.t("seven") + '</span><p>' + sel[1]  + val[1] + '</p></div>\
							</div><img src="../imgs/top' + (i + 1) + '.png" class="list-topnum"/></div>\
					 </li>';
					 
				}
				$ul.eq(index).html(html);
			},
			// 更新/添加币种数据
			updateTableData: function (data, sign, opts) {
				var defaults = $.t('currency'),
					name = '',
					html = '',
					diff = 0,
					diff2 = 0,
					_sign = $('.tab-currency>.active').text().toLowerCase(),
					list = tobj.marketObj[_sign] || [],
					list2 = tobj.otherMarkerIdsZH,
					$body = $('.table-currency.show>tbody'),
					$tr, $td,
					_clz = 'green',
					clz = 'green',
					_flag = '',
					flag = '',
					lang = localStorage.getItem('i18next_lng');
				if ('mbtc' == _sign) {
					var _mediums = [tobj.mediums.bCny, tobj.mediums.bUsdt]
				} else if ('eth' == _sign) {
					var _mediums = [tobj.mediums.eCny, tobj.mediums.eUsdt]
				}
				if ('update' == sign) {
					// diff2=obj.getFloatValue((data.ClosedPrice-data.OpenPrice)/(data.OpenPrice||0),2);
					diff2 = (0 != data.OpenPrice ? obj.getFloatValue((data.ClosedPrice - data.OpenPrice) / data.OpenPrice * 100, 2) : 0);
					$tr = $body.find('tr[data-mkid="' + data.MarketId + '"]');
					$td = $tr.find('td');
					// $td.eq(2).text('￥'+(data.ClosedPrice||0));
					// $td.eq(3).text('￥'+(data.HighPrice||0));
					// $td.eq(4).text('￥'+(data.LowPrice||0));
					// if(data.Amount){
					//    $td.eq(5).text('￥'+(Number.isNaN(data.Amount)?0:obj.getFloatValue(data.Amount,2)));
					// }
					// if(data.Volume){
					//    $td.eq(6).text(Number.isNaN(data.Volume)?0:obj.getFloatValue(data.Volume,2));
					// }
					if (0 <= diff2) {
						$td.eq(7).html('+' + (Number.isNaN(diff2) ? 0 : diff2) + '%').addClass('red').removeClass('green');
					} else {
						$td.eq(7).html((Number.isNaN(diff2) ? 0 : diff2) + '%').addClass('green').removeClass('red');
					}
					//$td.eq(8).text(data.OpenTime);
				} else if ('24h' == sign) {
					// if('bitcny_mbtc' == data.MarketId){
					//    tobj.mediums.bCny = data.ClosedPrice;
					// }else if('usdt_mbtc' == data.MarketId){
					//    tobj.mediums.bUsdt = data.ClosedPrice;
					// }else if('bitcny_eth' == data.MarketId){
					//    tobj.mediums.eCny = data.ClosedPrice;
					// }else if('usdt_eth' == data.MarketId){
					//    tobj.mediums.eUsdt = data.ClosedPrice;
					// }
					$tr = $body.find('tr[data-mkid="' + data.MarketId + '"]');
					$td = $tr.find('td');
					if ('mbtc' == _sign || 'eth' == _sign) {
						$td.eq(2).html((data.ClosedPrice || 0) + '(' + (data.MarketId.split('_')[0].toUpperCase()) + ')<span>' + (lang == 'en' ? '$' : '¥') + obj.getFloatValue1((data.ClosedPrice || 0) * (lang == 'en' ? _mediums[1] : _mediums[0]), 2) + '</span>');
					} else {
						$td.eq(2).html((data.ClosedPrice || 0) + '(' + (data.MarketId.split('_')[0].toUpperCase()) + ')');
					}
					$td.eq(3).text((data.HighPrice || 0) + '(' + (data.MarketId.split('_')[0].toUpperCase()) + ')');
					$td.eq(4).text((data.LowPrice || 0) + '(' + (data.MarketId.split('_')[0].toUpperCase()) + ')');
					if (data.Amount) {
						$td.eq(5).text((Number.isNaN(data.Amount) ? 0 : obj.getFloatValue(data.Amount, 2)) + '(' + (data.MarketId.split('_')[0].toUpperCase()) + ')');
					}
					if (data.Volume) {
						$td.eq(6).text(Number.isNaN(data.Volume) ? 0 : obj.getFloatValue(data.Volume, 2));
					}
				} else {
					for (var i = opts.index; i < list.length; i++) {
						if (opts.txt && (-1 == list[i].TargetId.toUpperCase().indexOf(opts.txt))) {
							continue;
						}
						diff = (list[i].ClosedPrice ? list[i].ClosedPrice : 0) - (list[i].OpenPrice ? list[i].OpenPrice : 0);
						if (0 <= list[i].Wday) {
							flag = '+';
							clz = 'red';
						} else {
							clz = 'green';
							flag = '';
						}
						if (0 <= diff) {
							_clz = 'red';
							_flag = '+';
						} else {
							_clz = 'green';
							_flag = '';
						}
						if ('mbtc' == _sign || 'eth' == _sign) {
							html += '<tr data-mkId="' + list[i].MarketId + '">\
                        <td><i class="icon ' + ((tobj.collectObj.indexOf(list[i].MarketId) != -1) ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                        <td><i class="icon2 icon-' + (list[i].TargetId).toLowerCase() + '"></i><span>' + (list[i].TargetId).toUpperCase() + '</span></td>\
                        <td>' + (list[i].ClosedPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')<span>' + (lang == 'en' ? '$' : '¥') + obj.getFloatValue1((list[i].ClosedPrice || 0) * (lang == 'en' ? _mediums[1] : _mediums[0]), 2) + '</span></td>\
                        <td>' + (list[i].HighPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].LowPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].Amount ? (Number.isNaN(list[i].Amount) ? 0 : obj.getFloatValue(list[i].Amount, 2)) : 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].Volume ? (Number.isNaN(list[i].Volume) ? 0 : obj.getFloatValue(list[i].Volume, 2)) : 0) + '</td>\
                        <td class="' + _clz + '">' + _flag + ((list[i].OpenPrice && 0 !== list[i].OpenPrice) ? Number.isNaN(list[i].OpenPrice) ? 0 : obj.getFloatValue(diff / (list[i].OpenPrice || 0) * 100, 2) : 0) + '%</td>\
						<td class="' + clz + '">' + flag + (list[i].Wday || 0) + '%</td>\
                     </tr>';
						} else {
							html += '<tr data-mkId="' + list[i].MarketId + '">\
                        <td><i class="icon ' + ((tobj.collectObj.indexOf(list[i].MarketId) != -1) ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                        <td><i class="icon2 icon-' + (list[i].TargetId).toLowerCase() + '"></i><span>' + (list[i].TargetId).toUpperCase() + '</span></td>\
                        <td>' + (list[i].ClosedPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].HighPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].LowPrice || 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].Amount ? (Number.isNaN(list[i].Amount) ? 0 : obj.getFloatValue(list[i].Amount, 2)) : 0) + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + (list[i].Volume ? (Number.isNaN(list[i].Volume) ? 0 : obj.getFloatValue(list[i].Volume, 2)) : 0) + '</td>\
                        <td class="' + _clz + '">' + _flag + ((list[i].OpenPrice && 0 !== list[i].OpenPrice) ? Number.isNaN(list[i].OpenPrice) ? 0 : obj.getFloatValue(diff / (list[i].OpenPrice || 0) * 100, 2) : 0) + '%</td>\
						<td class="' + clz + '">' + flag + (list[i].Wday || 0) + '%</td>\
                     </tr>';
						}
					}
					tobj.pageObj.totalPg = Math.ceil(list.length / tobj.pageObj.size);
					tobj.pageObj.page = opts.index;
					$body.html(html);
					/*name = data.MarketId;
					name = name.substr(name.indexOf('_')+1);
					for(var j = 0;j<list2.length;j++){
					   if(name == list2[j].TargetId){
					      defaults = list2[j].TargetName;
					      break;
					   }
					}
					html ='<tr data-mkId="'+data.MarketId+'">\
					      <td><i class="icon icon-circle"></i><span>'+defaults+'</span><span>'+name.toUpperCase()+'</span></td>\
					      <td>￥'+data.ClosedPrice+'</td>\
					      <td>￥'+data.HighPrice+'</td>\
					      <td>￥'+data.LowPrice+'</td>\
					      <td>￥'+obj.getFloatValue(data.Amount,2)+'</td>\
					      <td>'+obj.getFloatValue(data.Volume,2)+'</td>\
					      <td>'+(0!=data.OpenPrice?obj.getFloatValue(diff/(data.OpenPrice||0),5):0)+'%</td>\
					      <td>'+(data.Wday||0)+'%</td>\
					      <td>'+data.OpenTime+'</td>\
					   </tr>';
					$body.append(html);
					tobj.pageObj.totalPg = Math.ceil(list.length/tobj.pageObj.size);
					console.log('totalPg: ',tobj.pageObj.totalPg);
					if(1!=tobj.pageObj.totalPg){
					   tobj.page(null,tobj.pageObj.page,tobj.pageObj.totalPg,function(now,all){
					      tobj.pageObj.page = now;
					      tobj.showCurrencyTable(list,null,now);
					   });
					}else{
					   $('.pagination-list').empty();
					}*/
				}
			},
			// 展示币种表格
			showCurrencyTable: function (list, txt, index) {
				var list = list || [],
					list2 = tobj.otherMarkerIdsZH,
					html = '',
					sign = 'green',
					sign2 = 'green',
					defaults = $.t('cur_name'),
					name = '',
					diff = 0,
					count = 1;
				index = (index > 0 ? index - 1 : 0) || 0;
				for (var i = index; i < list.length; i++) {
					if (count > tobj.pageObj.size) {
						break;
					}
					name = list[i].MarketId;
					name = name.substr(name.indexOf('_') + 1);
					diff = list[i].ClosedPrice - list[i].OpenPrice;
					//if(list[i].LowPrice){}
					if (txt && -1 == list[i].MarketId.indexOf(txt)) {
						continue;
					}
					for (var j = 0; j < list2.length; j++) {
						if (name == list2[j].TargetId) {
							defaults = list2[j].TargetName;
							break;
						}
					}

					/*if(0>diff){
					   sign = 'red';
					}
					if(0>list[i].Wday){
					   sign2 = 'red';
					}*/
					html += '<tr data-mkId="' + list[i].MarketId + '">\
                        <td><i class="icon ' + ((tobj.collectObj.indexOf(list[i].Id) != -1) ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                        <td><img src="' + 1 + '" alt="" /><span>' + defaults + '</span><span>' + name.toUpperCase() + '</span></td>\
                        <td>' + list[i].ClosedPrice + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + list[i].HighPrice + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + list[i].LowPrice + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + list[i].Amount ? (Number.isNaN(list[i].Amount) ? 0 : obj.getFloatValue(list[i].Amount, 2)) : 0 + '(' + (list[i].MarketId.split('_')[0].toUpperCase()) + ')</td>\
                        <td>' + list[i].Volume ? (Number.isNaN(list[i].Volume) ? 0 : obj.getFloatValue(list[i].Volume, 2)) : 0 + '</td>\
                        <td>' + (0 != list[i].OpenPrice ? obj.getFloatValue(diff / (list[i].OpenPrice || 0), 2) * 100 : 0) + '%</td>\
                        <td>' + (list[i].Wday || 0) + '%</td>\
                     </tr>';
					count++;
				}
				if (0 == list.length) {
					html = '<tr><td colspan="10" style="text-align: center;">' + $.t("no_data") + '</td></tr>';
				}
				$('.table-currency.show>tbody').html(html);
				tobj.pageObj.totalPg = Math.ceil(list.length / tobj.pageObj.size);
				if (1 < tobj.pageObj.totalPg) {
					obj.pageFn(null, tobj.pageObj.page, tobj.pageObj.totalPg, function (now, all) {
						tobj.pageObj.page = now;
						tobj.showCurrencyTable(list, txt, now);
					});
				} else {
					$('.pagination-list').empty();
				}
			},
			// 展示币种列表
			showCurrencyList: function (list, index) {
				var _sign = $('.tab-currency>.active').text().toLowerCase(),
					list = tobj.marketObj[_sign] || [];
				index = 0;
				for (var i = index; i < list.length; i++) {
					list2.push(list[i].Id);
					tobj.otherMarkerIdsZH.push({
						TargetId: list[i].TargetId,
						TargetName: list[i].TargetName
					});
					if (0 === $tbody.find('tr').length) {
						html += '<tr data-mkId="' + list[i].Id + '">\
                           <td><i class="icon ' + ((tobj.collectObj.indexOf(list[i].Id) != -1) ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                           <td><i class="icon icon-' + (list[i].TargetId) + '"></i><span>' + (list[i].TargetId).toUpperCase() + '</span></td>\
                           <td>--</td>\
                           <td>--</td>\
                           <td>--</td>\
                           <td>--</td>\
                           <td>--</td>\
                           <td>--</td>\
                           <td>--</td>\
                        </tr>';

						tmp[i] = {
							MarketId: list[i].Id,
							TargetName: list[i].TargetName,
							TargetId: (list[i].TargetId).toUpperCase()
						};
					}
				}
				if (0 === $tbody.find('tr').length) {
					tobj.marketObj[_sign] = tmp;
					if (0 === list.length) {
						html = '<tr><td colspan="10" style="text-align: center;">' + $.t("no_data") + '</td></tr>';
					}
					$tbody.html(html);
				} else {
					tobj.updateTableData(null, 'filter', {
						index: 0,
						txt: ''
					});
				}
			},
			processSingleData: function (ws, root, data, objs) {
				var Wday = '',
					i = 0,
					count = 0,
					flag = true,
					diff,
					$body = $('.table-currency.show>tbody'),
					$tr, $td, html = '',
					_sign = $('.tab-currency>.active').text().toLowerCase(),
					list = tobj.marketObj[_sign] || [];
				//if(objs){
				// 更新7日涨跌数据
				if ('7D' === data.Frequency) {
					for (i = 0; i < list.length; i++) {
						if (list[i].MarketId === data.Market) {
							$tr = $body.find('tr[data-mkid="' + data.Market + '"]');
							$td = $tr.find('td');
							diff = data.ClosedPrice - data.OpenPrice;
							if (0 <= diff) {
								Wday = (0 != data.OpenPrice ? obj.getFloatValue((diff) * 100 / data.OpenPrice, 2) : 0);
								$td.eq(8).html('+' + Wday + '%').addClass('red').removeClass('green');
							} else {
								Wday = (0 != data.OpenPrice ? obj.getFloatValue((diff) * 100 / data.OpenPrice, 2) : 0);
								$td.eq(8).html(Wday + '%').addClass('green').removeClass('red');
							}
							list[i].Wday = Wday;

							flag = false;
							break;
						}
					}
				} else {
					for (i = 0; i < list.length; i++) {
						if (list[i].MarketId === data.MarketId) {
							for (var d in data) {
								if (data.hasOwnProperty(d)) {
									list[i][d] = data[d];
								}
							}
							tobj.updateTableData(list[i], 'update');
							break;
						}
					}
					if (!data.Frequency) {
						tobj.updateTableData(data, '24h');
					}
					/*if(0!==list.length){
					   for(i=0;i<list.length;i++){
					      if(list[i].MarketId === data.MarketId){
					         for(var d in data){
					            list[i][d]=data.d;
					         }
					         tobj.updateTableData(data,'update');
					         flag = false;
					         count++;
					         break;
					      }
					   }
					}
					if(0==count && (data && data.FrequencyKey)){
					   //tobj.updateTableData(data,'add');
					   list.push(data);
					   //flag=false;
					}
					count=0;*/
				}
				/*}else{
				   if(0===list){
				      list.push(data);
				   }
				   //tobj.updateTableData(data,'update');
				   for(i =0;i<list.length;i++){
				      if(list[i].MarketId == data.MarketId){
				         $.extend(true,list[i],data);
				         tobj.updateTableData(data,'update');
				         flag = false;
				         count++;
				         break;
				      }
				   }
				   if(0==count && (data && data.FrequencyKey)){
				      //tobj.updateTableData(data,'add');
				      list.push(data);
				      //flag=false;
				   }
				}*/
				tobj.marketObj[_sign] = list;
				if (flag) {
					//tobj.showCurrencyTable(list,null,0);
				}

				var oldData = tobj.dict[data.FrequencyKey];
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
					/*if (data.FrequencyKey == frequencyKey)
					   tobj.drawingKLine(frequencyKey);*/
				} else {
					if (data.Id == oldData.lastId + 1) {
						oldData.categoryData.push(data.OpenTime);
						oldData.values.push(kData);
						oldData.volumns.push(data.Volume);
						oldData.lastId = data.Id;
					} else if (data.Id > oldData.lastId) {
						tobj.RepairKLine(data.FrequencyKey, oldData.lastId, root);
					} else if (data.Id == oldData.lastId) {
						oldData.values[oldData.length - 1] = kData;
						var frequencyKey = tobj.sign;
						//更新K线图
						/*if (data.FrequencyKey == frequencyKey)
						   tobj.drawingKLine(frequencyKey);*/
					}
				}
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
			// 监听指定市场K线数据
			ReceiveOtherMarket: function (root, ws) {
				var otherMarkerIds = tobj.otherMarkerIds; //右上角市场列表
				//otherMarkerIds.push(tobj.marketId);  // 当前市场
				var MarketFrequency = root.lookup("MarketKLineFrequency");
				var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
				var list = new Array();

				for (var i = 0; i < otherMarkerIds.length; i++) {
					var marketId = otherMarkerIds[i];
					var marketFrequency = MarketFrequency.create({
						MarketId: marketId,
						Keys: ["SD1", "D", "7D"]
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
			// 监听指定市场K线数据
			// ReceivebaseMarket: function(root, ws) {
			//    var baseMarkerIds = tobj.baseMarkerIds;
			//    var MarketFrequency = root.lookup("MarketKLineFrequency");
			//    var MarketFrequencyList = root.lookup("SetReceiveOtherMarketKLine");
			//    var list = new Array();

			//    for (var i = 0; i < baseMarkerIds.length; i++) {
			//       var marketId = baseMarkerIds[i];
			//       var marketFrequency = MarketFrequency.create({ MarketId: marketId, Keys: ["D1"]});
			//       list.push(marketFrequency);
			//    }
			//    var fList = MarketFrequencyList.create({ List: list });
			//    var dataBuffer = MarketFrequencyList.encode(fList).finish();
			//    var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController,tobj.SendCommand.SetReceiveOtherMarketKLine, dataBuffer);
			//    if (ws.readyState === WebSocket.OPEN) {
			//       ws.send(buffer);
			//    } else {

			//    }
			// },
			// websocket
			StartWS: function (root) {
				var KLineInfo = root.lookup("KLineInfo"),
					ScrollDayKLine = root.lookup("ScrollDayKLine"),
					//获取TOP5市场排行
					GetRankingList = root.lookup("GetRankingList"),
					RankCurrencyDtoList = root.lookup("RankCurrencyDtoList"),
					// ws = new WebSocket("wss://ws.xbrick.io/");
				// ws = new WebSocket("wss://testws.xbrick.io/");
				ws = new WebSocket("ws://10.45.0.41:8888/");
				ws.onopen = function (e) {
					// console.log("Connection open...");
					getMarketList(root, ws);
					//获取TOP5排行数据
					getRankingListCmd();
				};
				ws.binaryType = "arraybuffer";
				ws.onmessage = function (e) {
					if (e.data instanceof ArrayBuffer) {
						var cmdArray = new Uint8Array(e.data, 0, 2);
						var receiveBuffer = new Uint8Array(e.data, 2);
						var cmd = tobj.ByteToUnShort(cmdArray);
						if (cmd == tobj.ReceiveCommand.SingleKLine) {
							var data = KLineInfo.decode(receiveBuffer);
							//处理数据
							// console.log('SingleKLine: ',data);
							tobj.processSingleData(ws, root, data, {
								key: data.FrequencyKey,
								id: data.MarketId
							});
						} else if (cmd == tobj.ReceiveCommand.ScrollDayKLine) {
							var data = ScrollDayKLine.decode(receiveBuffer);
							// console.log('ScrollDayKLine: ',data);
							tobj.processSingleData(ws, root, data);
						} else if (cmd == tobj.ReceiveCommand.RankingDataList) {
							var data = RankCurrencyDtoList.decode(receiveBuffer);
							// console.log("收到排行TOP5数据",data.List);
							setTimeout(function () {
								tobj.showTop5Data(data.List);
							}, 500);
						}
					}
				};
				ws.onerror = function (e) {
					// console.log('websocked error');
				}
				ws.onclose = function (e) {
					// console.log("Connection closed", e);
					setTimeout(function () {
						tobj.StartWS(root);
					}, 2000);
				};
				// 筛选市场
				$('#currency-search').on('input', function () {
					var txt = $(this).val(),
						_sign = $('.tab-currency>.active').text().toLowerCase(),
						list = tobj.marketObj[_sign] || [];
					txt = txt.toUpperCase();
					setTimeout(function () {
						tobj.updateTableData(null, 'filter', {
							index: 0,
							txt: txt
						});
					}, 500);
				});
				// 切换基币市场tab
				$('.tab-currency').on('click', '>li', function () {
					var index = $(this).index();
					if ($(this).hasClass('active')) {
						return false;
					}
					//tobj.currencyObj.base = ($(this).text()).toLowerCase();
					$(this).addClass('active').siblings().removeClass('active');
					$('.table-currency').eq(index).addClass('show').siblings().removeClass('show');
					$('.currency-box>table').eq(index).addClass('show').siblings('table').removeClass('show');
					//tobj.marketObj.collect = 0;
					$('.currency-box .pagination-list').empty();
					$('#currency-search').val('');
					//tobj.marketObj.clist = [];
					getMarketList(root, ws);
				});
				$('.tab-top5').on('click', '>li', function () {
					var _class = $(this).attr('class'),
						index = $(this).attr('data-sign'),
						$ul = $('.top5-box>ul');
					if (_class == 'active') {
						return false;
					} else {
						$ul.eq(index).addClass('show').html('<li style="text-align:center; width: 100%; height: 40px; line-height: 40px; font-size:12px;">' + $.t('no_data') + '</li>');
						setTimeout(function () {
							getRankingListCmd();
						}, 100);
					}

				});

				function getMarketList(root, ws) {
					/*tobj.getBaseMarketList(function(res){
					   var list = [];
					   if(res.IsSuccess){
					      list = res.Data || [];

					      tobj.otherMarkerIds = list;
					      tobj.getBaseMarketListZH(function(res){
					         var list = [];
					         if(res.IsSuccess){
					            list = res.Data || [];
					            tobj.otherMarkerIdsZH = [];
					            for(var i = 0;i<list.length;i++){
					               tobj.otherMarkerIdsZH.push({TargetId: list[i].TargetId,TargetName: list[i].TargetName});
					            }
					            tobj.ReceiveOtherMarket(root,ws);
					         }
					      });
					   }
					});*/
					tobj.getBaseMarketListZH(function (res) {
						var list = [],
							list2 = [],
							html = '',
							$tbody = $('.table-currency.show>tbody'),
							_sign = $('.tab-currency>.active').text().toLowerCase(),
							tmp = tobj.marketObj[_sign] || [],
							date, time;

						if (res.IsSuccess) {
							list = res.Data || [];
							tobj.otherMarkerIdsZH = [];
							if (obj.sign) {
								tobj.getMarketCollect(function (res) {
									var item = res.Data;
									tobj.collectObj = item;
									for (var i = 0; i < list.length; i++) {
										if (tobj.collectObj.indexOf(list[i].Id) != -1) {
											var ele = list[i];
											list.splice(i, 1);
											list.unshift(ele);
										}
									}
									for (var i = 0; i < list.length; i++) {
										list2.push(list[i].Id);
										time = obj.dateFormate(list[i].CreatedAt, true);
										/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
										date = new Date(time);
										date=date.format("yyyy-MM-dd");*/
										tobj.otherMarkerIdsZH.push({
											TargetId: list[i].TargetId,
											TargetName: list[i].TargetName,
											date: date
										});
										if (0 === $tbody.find('tr').length) {
											html += '<tr data-mkId="' + list[i].Id + '">\
                                          <td><i class="icon ' + ((item.indexOf(list[i].Id) != -1) ? 'icon-star' : 'icon-unstar') + '" data-market="' + list[i].Id + '"></i></td>\
                                          <td><i class="icon2 icon-' + list[i].TargetId + '"></i><span>' + (list[i].TargetId).toUpperCase() + '</span></td>\
                                          <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                          <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                          <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                          <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                          <td>0</td>\
                                          <td>0%</td>\
                                          <td>0%</td>\
                                       </tr>';

											tmp[i] = {
												MarketId: list[i].Id,
												TargetName: list[i].TargetName,
												TargetId: (list[i].TargetId).toUpperCase(),
												date: time
											};
										}
									}
									tobj.marketObj[_sign] = tmp;
									if (0 === $tbody.find('tr').length) {
										if (0 === list.length) {
											html = '<tr><td colspan="10" style="text-align: center;">' + $.t("no_data") + '</td></tr>';
										}
										$tbody.html(html);
										/*$tbody.find('tr .pic').each(function(){
										   var $img=$(this);
										   $img.error(function(){
										      $(this).prop('src','./imgs/pic.png');
										   });
										});*/
									} else {
										tobj.updateTableData(null, 'filter', {
											index: 0,
											txt: ''
										});
									}
									for (var i = 0; i < list2.length; i++) {
										if (list2.length > (tobj.otherMarkerIds && tobj.otherMarkerIds.length)) {
											if (-1 == list2.indexOf(tobj.otherMarkerIds[i])) {
												tobj.otherMarkerIds.push(list2[i]);
											}
										} else {
											if (-1 == tobj.otherMarkerIds.indexOf(list2[i])) {
												tobj.otherMarkerIds.push(list2[i]);
											}
										}
									}
									tobj.ReceiveOtherMarket(root, ws);
								});
							} else {
								for (var i = 0; i < list.length; i++) {
									if (tobj.collectObj.indexOf(list[i].Id) != -1) {
										var ele = list[i];
										list.splice(i, 1);
										list.unshift(ele);
									}
								}
								for (var i = 0; i < list.length; i++) {
									list2.push(list[i].Id);
									time = obj.dateFormate(list[i].CreatedAt, true);
									/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
									date = new Date(time);
									date=date.format("yyyy-MM-dd");*/
									tobj.otherMarkerIdsZH.push({
										TargetId: list[i].TargetId,
										TargetName: list[i].TargetName,
										date: date
									});
									if (0 === $tbody.find('tr').length) {
										html += '<tr data-mkId="' + list[i].Id + '">\
                                       <td><i class="icon icon-unstar" data-market="' + list[i].Id + '"></i></td>\
                                       <td><i class="icon2 icon-' + list[i].TargetId + '"></i><span>' + (list[i].TargetId).toUpperCase() + '</span></td>\
                                       <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                       <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                       <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                       <td>0(' + (list[i].Id.split('_')[0].toUpperCase()) + ')</td>\
                                       <td>0</td>\
                                       <td>0%</td>\
                                       <td>0%</td>\
                                    </tr>';

										tmp[i] = {
											MarketId: list[i].Id,
											TargetName: list[i].TargetName,
											TargetId: (list[i].TargetId).toUpperCase(),
											date: time
										};
									}
								}
								tobj.marketObj[_sign] = tmp;
								if (0 === $tbody.find('tr').length) {
									if (0 === list.length) {
										html = '<tr><td colspan="10" style="text-align: center;">' + $.t("no_data") + '</td></tr>';
									}
									$tbody.html(html);
									/*$tbody.find('tr .pic').each(function(){
									   var $img=$(this);
									   $img.error(function(){
									      $(this).prop('src','./imgs/pic.png');
									   });
									});*/
								} else {
									tobj.updateTableData(null, 'filter', {
										index: 0,
										txt: ''
									});
								}
								for (var i = 0; i < list2.length; i++) {
									if (list2.length + 4 > (tobj.otherMarkerIds && tobj.otherMarkerIds.length)) {
										if (-1 == list2.indexOf(tobj.otherMarkerIds[i])) {
											tobj.otherMarkerIds.push(list2[i]);
										}
									} else {
										if (-1 == tobj.otherMarkerIds.indexOf(list2[i])) {
											tobj.otherMarkerIds.push(list2[i]);
										}
									}
								}
								tobj.ReceiveOtherMarket(root, ws);
							}
						}
					});
				}

				function getRankingListCmd() {
					var getRankingList = GetRankingList.create({
						BasicId: $('.tab-top5>li.active>span:first-child').text().toLowerCase()
					});
					var dataBuffer = GetRankingList.encode(getRankingList).finish();
					var buffer = tobj.GenerateCmdBuffer(tobj.Controllers.MarketController, tobj.SendCommand.GetRankingList, dataBuffer);
					if (ws.readyState == WebSocket.OPEN) {
						ws.send(buffer);
					} else {

					}
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
			// 收藏
			toCollect: function (marketId) {
				obj.ajaxFn('/UserCollect/MarketCollect', {
					data: {
						marketId: marketId
					},
					callback: function (res) {}
				});
			},
			// 取消收藏
			cancelMarketCollect: function (marketId) {
				obj.ajaxFn('/UserCollect/CancelMarketCollect', {
					data: {
						marketId: marketId
					},
					callback: function (res) {}
				})
			},
			// 获取已收藏的市场列表
			getMarketCollect: function (callback) {
				obj.ajaxFn('/UserCollect/GetMarketCollect', {
					async: false,
					callback: callback
				});
			},
			// 触发ws
			initWS: function () {
				protobuf.load("../js/proto_market.json", function (err, root) {
					tobj.StartWS(root);
				});
			}
		};
		if ('en' == localStorage.getItem('i18next_lng')) {
			tobj.getUsdtMbtcPrice();
			tobj.getUsdtEthPrice();
			setInterval(function () {
				tobj.getUsdtMbtcPrice();
				tobj.getUsdtEthPrice();
			}, 5000);
		} else {
			tobj.getBitcnyMbtcPrice();
			tobj.getBitcnyEthPrice();
			setInterval(function () {
				tobj.getBitcnyMbtcPrice();
				tobj.getBitcnyEthPrice();
			}, 5000);
		}
		/*tobj.getTotalTurnover();*/
		tobj.getPandect();
		tobj.initWS();
		$('.currency-box').on('click', 'tbody>tr', function (e) {
			var that = $(this),
				marketId = that.attr('data-mkId');

			// $('.currency-box').append('<a href="./trade.html?marketid='+marketId+'" id="link-attr"></a>');
			// $('#link-attr')[0].click();
			// $('#link-attr').remove();
		});
		// 收藏/取消收藏
		$('.table-currency').on('click', '>tbody>tr', function (e) {
			e = e || window.event;
			var that = $(e.target),
				$tr = $(this),
				marketId = '';
			if ($(e.target).hasClass('icon')) {
				if (obj.flag) {
					marketId = $tr.attr('data-mkid');
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

				// var _key=$('.tab-currency>.active').text().toLowerCase()||'cny',
				//    list = tobj.marketObj[_key]||[];
				// for(var i = 0; i < list.length; i++){
				//    if(list[i].Id==marketId){
				//       var ele = list[i];
				//       list.splice(i,1);
				//       list.unshift(ele);
				//    }
				// }
				// tobj.marketObj[_key]=list;
			} else {
				marketId = $tr.attr('data-mkId');
				$('.currency-box').append('<a href="./trade.html?marketid=' + marketId + '" id="link-attr"></a>');
				$('#link-attr')[0].click();
				$('#link-attr').remove();
			}
		});
		// 币种排序
		$('.currency-box').on('click', 'thead>tr>th.filter', function () {
			var that = $(this),
				_sign = that.attr('data-sign'),
				_to = that.attr('data-to'),
				$i = that.find('.icon-filter'),
				_key = $('.tab-currency>.active').text().toLowerCase() || 'mbtc';
			list = tobj.marketObj[_key] || [];
			for (var i = 0; i < list.length; i++) {
				var diff = (list[i].ClosedPrice ? list[i].ClosedPrice : 0) - (list[i].OpenPrice ? list[i].OpenPrice : 0);
				list[i].dayDiff = (list[i].OpenPrice && 0 !== list[i].OpenPrice) ? Number.isNaN(list[i].OpenPrice) ? 0 : obj.getFloatValue(diff / (list[i].OpenPrice || 0) * 100, 2) : 0;
			}
			if ($i.hasClass('to')) {
				$i.removeClass('to');
			} else {
				$i.addClass('to');
			}
			if (0 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return a.TargetId.localeCompare(b.TargetId);
					});
				} else {
					list.sort(function (a, b) {
						return b.TargetId.localeCompare(a.TargetId);
					});
				}
			} else if (1 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.ClosedPrice || 0)) - (a && (a.ClosedPrice || 0));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.ClosedPrice || 0)) - (b && (b.ClosedPrice || 0));
					});
				}
			} else if (2 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.Amount || 0)) - (a && (a.Amount || 0));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.Amount || 0)) - (b && (b.Amount || 0));
					});
				}
			} else if (3 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.Volume || 0)) - (a && (a.Volume || 0));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.Volume || 0)) - (b && (b.Volume || 0));
					});
				}
			} else if (4 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.dayDiff || 0)) - (a && (a.dayDiff || 1));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.dayDiff || 1)) - (b && (b.dayDiff || 0));
					});
				}
			} else if (5 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.Wday || 0)) - (a && (a.Wday || 1));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.Wday || 1)) - (b && (b.Wday || 0));
					});
				}
			} else if (6 == _sign) {
				if (1 == _to) {
					list.sort(function (a, b) {
						return (b && (b.date || 0)) > (a && (a.date || 0));
					});
				} else {
					list.sort(function (a, b) {
						return (a && (a.date || 0)) > (b && (b.date || 0));
					});
				}
			}
			_to = (1 == _to) ? 0 : 1;
			that.attr('data-to', _to);
			tobj.marketObj[_key] = list;
			tobj.updateTableData(null, null, {
				index: tobj.pageObj.page,
				txt: ''
			});
		});
	}
	if (0 != $('.transaction').length) {
		var that = {
			sign: null,
			type: ''
		};
		tobj = {
			bankCardList: [],
			myBankCardList: [],
			myAddressList: [],
			validateSign: 0,
			assetList: [],
			cnyAmount: 0,
			isVerifyAbles: false,
			isValidAbles: false,
			detail: {},
			accountId: '',
			generateCount: 0,
			applyData: {
				depositWay: 1,
				amount: 0,
				remark: ''
			},
			myBankData: {
				bankType: 1,
				province: '',
				city: '',
				subbranch: '',
				cardNumber: ''
			},
			addAddressData: {
				accountId: '',
				address: '',
				tag: '',
				memo: ''
			},
			cnyData: {
				currencyId: '',
				bankId: '',
				amount: '',
				verifyWay: '',
				password: '',
				validCode: ''
			},
			coinData: {
				currencyId: '',
				address: '',
				volume: ''
			},
			delData: {
				id: '',
				that: null
			},
			addrTimer: null,
			authObj: {
				trade: false,
				code: false
			},
			filter: {
				txt: null,
				hold: false
			},
			pageObj: {
				page: 0,
				size: 20,
				totalPg: 0
			},
			getData: function (data, type) {
				var $arrow = $('.actionArrow'),
					$actual = $arrow.find('.box-actual'),
					$virtual = $arrow.find('.box-virtual');
				if (1 == type && data) {
					this.isVerifyAbles = data.isVerifyAbles;
					if (this.isVerifyAbles) {
						$actual.find('.mod-recharge .toAuth').removeClass('show');
						$actual.find('.allow-recharge').addClass('show');

						$virtual.find('.mod-recharge .toAuth').removeClass('show');
						$virtual.find('.allow-recharge').addClass('show');
					} else {
						$actual.find('.mod-recharge .toAuth').addClass('show');
						$actual.find('.allow-recharge').removeClass('show');

						$virtual.find('.mod-recharge .toAuth').addClass('show');
						$virtual.find('.allow-recharge').removeClass('show');
					}
				} else if (2 == type && data) {
					if ('true' == data.flag) {
						this.myAddressList = data.Data.AddressList || [];
						this.myAddressListFn(this.myAddressList, false, true);
					} else {
						this.myBankCardList = data.Data.BankCardList || [];
						this.myBankCardListFn(this.myBankCardList);
					}
					this.isValidAbles = data.isValidAbles;
					if (this.isValidAbles) {
						this.accountId = data.Data.AccountId;
						this.validateSign = data.Data.DefaultVerifyWay;
						$actual.find('.mod-cash .toAuth').eq(0).removeClass('show');
						$actual.find('.allow-cash').addClass('show');
						$virtual.find('.mod-cash .toAuth').eq(0).removeClass('show');
						$virtual.find('.allow-cash').addClass('show');
					} else {
						$actual.find('.mod-cash .toAuth').eq(0).addClass('show');
						$actual.find('.allow-cash').removeClass('show');
						$virtual.find('.mod-cash .toAuth').eq(0).addClass('show');
						$virtual.find('.allow-cash').removeClass('show');
					}
					// $virtual.find('.code-box').each(function(){
					//    var stype = $(this).children('.code-tab').attr('data-type'),sign = 0;
					//    sign = 'phone'==stype ? 1:2;
					//    if(tobj.validateSign == sign){
					//       $(this).removeClass('auth-code');
					//    }else{
					//       $(this).addClass('auth-code');
					//    }
					// });
					if (0 < this.myBankCardList.length) {
						$('.bank-add').removeClass('show');
						$('.bank-select').addClass('show');
					} else {
						$('.bank-add').addClass('show');
						$('.bank-select').removeClass('show');
					}
					$actual.find('.code-box').each(function () {
						var stype = $(this).children('.code-tab').attr('data-type'),
							sign = 0;
						sign = 'phone' == stype ? 1 : 2;
						if (tobj.validateSign == sign) {
							$(this).addClass('show');
						} else {
							$(this).removeClass('show');
						}
					});
				}
			},
			// 获取个人信息
			getUserInfo: function () {
				obj.ajaxFn('/user/GetLoginInfo', {
					async: false,
					callback: function (res) {
						var data = {};
						if (res.IsSuccess) {
							data = res.Data;
							$('.username').text(data.RealName || $.t('anonym'));
							if (1 != data.TradePasswordType) {
								tobj.authObj.trade = true;
							}
							if (tobj.authObj.trade && tobj.authObj.code) {
								$('#input-auth').prop('disabled', false);
								$('#apply-auth').removeClass('disabled');
							} else {
								$('#input-auth').prop('disabled', true);
								$('#apply-auth').addClass('disabled');
							}
							$('#mod-addAddr').on('click', '#apply-auth.disabled', function () {
								$('.form-tips').removeClass('hide');
							});
						}
					}
				});
			},
			// 添加银行卡
			addMyBank: function (that) {
				obj.ajaxFn('/MyAccount/AddBankCard', {
					data: this.myBankData,
					callback: function (res) {
						var msg = '';
						if (res.IsSuccess) {
							that.find('.open-account').html('--' + $.t("Choose_bank") + '--');
							that.find('.bank-list').removeClass('on');
							that.find('.bank-list>li.active').removeClass('active');
							that.find('#bank-province').val('');
							that.find('#bank-city').val('');
							that.find('#bank-subbranch').val('');
							that.find('#bank-number').val('');
							that.removeClass('show');
							msg = $.t('add_success');
							tobj.getMyBankCardList();
							obj.modHide('#mod-addBank');
							obj.hideTips(msg);
						} else {
							if (0 == res.Code) {
								msg = $.t('not_pass5');
							} else {
								msg = res.ErrorMsg;
							}
							obj.getTips($('#bank-number'), msg);
						}
						/*$('#mod-prompt>.mod-body>.tips-txt').text(msg);
						obj.modShow('#mod-prompt');*/
					}
				});
			},
			// 删除银行卡
			delMyBank: function (that) {
				obj.ajaxFn('/MyAccount/RemoveBankCard', {
					data: {
						bankId: tobj.delData.id
					},
					callback: function (res) {
						var msg = '',
							$box = that.closest('.dropdown-box'),
							_txt = $box.find('.txt-bank').attr('data-id'),
							_val = that.attr('data-id');
						if (res.IsSuccess) {
							msg = $.t('delete_bank');
							if (_txt === _val) {
								$('.txt-bank,.txt-num').text('--');
							}
							that.remove();
							if (1 >= $('.card-list>li').length) {
								$('.txt-bank,.txt-num').text('--');
								$box.find('.bank-add').addClass('show').next().removeClass('show');
							}
						} else {
							msg = res.ErrorMsg + '，' + $.t('operate_fail');
						}
						$('#mod-prompt>.mod-body>.tips-txt').text(msg);
						obj.modShow('#mod-prompt');
					}
				});
			},
			// 添加提现地址
			addMyAddr: function (that, isAuth) {
				var url = '/Withdraw/AddAddress';
				if (isAuth) {
					url = '/Withdraw/AddVerifiedAddress';
				}
				obj.ajaxFn(url, {
					data: tobj.addAddressData,
					callback: function (res) {
						var msg = '',
							list = [],
							data = null;
						if (res.IsSuccess) {
							data = tobj.addAddressData;
							that.find('#input-address').val('');
							that.find('#input-tag').val('');
							that.find('#input-auth').prop('checked', false);
							that.find('#input-tradePwd').val('');
							that.find('#input-phone').val('');
							that.find('#input-gug').val('');
							that.find('.auth-box.show').removeClass('show');
							msg = $.t('addsuccess');
							list.push({
								Address: data.address,
								Id: data.accountId,
								IsVerified: 2 != data.verifyWay ? false : true,
								Tag: data.tag,
								Memo: data.memo
							});
							tobj.myAddressListFn(list, true);
							var accountId = data.accountId.split('_')[1];
							tobj.isValidAble('true', accountId);
						} else {
							if (201 == res.Code) {
								msg = $.t('otp');
							} else if (133 == res.Code) {
								msg = $.t('trade_error');
							}
						}
						$('#mod-prompt>.mod-body>.tips-txt').text(msg);
						obj.modShow('#mod-prompt');
					}
				});
			},
			// 删除我的地址
			delMyAddr: function (that) {
				obj.ajaxFn('/Withdraw/RemoveAddress', {
					data: {
						accountId: this.accountId,
						addressId: this.delData.id
					},
					callback: function (res) {
						var msg = '',
							$box = that.closest('.box-form'),
							_txt = $box.find('.addr-txt').attr('data-id'),
							_val = that.attr('data-id');
						if (res.IsSuccess) {
							msg = $.t('delete_address');
							if (_txt === _val) {
								$box.find('.dropdown-txt .icon-unauth').remove();
								$box.find('.dropdown-txt .addr-txt').text('-- --');
							}
							that.remove();
							if (1 >= $box.find('.wallet-list>li').length) {
								if (0 == $box.find('.wallet-add').length) {
									$box.find('.dropdown-txt').html('<i class="icon icon-down2"></i><span class="operate-style wallet-operate wallet-add show" data-type="new-addr">' + $.t('add_address') + '</span>');
								} else {
									$box.find('.wallet-add').addClass('show');
								}
							}
						} else {
							msg = res.ErrorMsg + '，' + $.t('operate_fail');
						}
						$('#mod-prompt>.mod-body>.tips-txt').text(msg);
						obj.modShow('#mod-prompt');
					}
				});
			},
			// 获取我的银行卡列表
			getMyBankCardList: function () {
				obj.ajaxFn('/MyAccount/GetBankCardList', {
					callback: function (res) {
						var list = [];
						if (res.IsSuccess) {
							list = res.Data || [];
							tobj.myBankCardListFn(list);
						}
					}
				});
			},
			myBankCardListFn: function (list) {
				function unique(arr) {　　
					var newArr = [arr[0]];　　
					for (var i = 1; i < arr.length; i++) {　　　
						if (newArr.indexOf(arr[i]) == -1) {
							newArr.push(arr[i]);　
						}
					}
					return newArr;
				}
				var list = unique(list);
				var html = '<li class="active" data-type="mod-addBank">＋' + $.t("quick_add") + '</li>',
					$operate = $('.card-list').prev('.dropdown-txt').find('.operate-style');
				if (0 < list.length && (list[0] != undefined)) {
					for (var i = 0; i < list.length; i++) {
						var lastFour = list[i].CardNumber;
						lastFour = lastFour.substr(lastFour.length - 4);
						html += '<li data-id=' + list[i].Id + '><i class="icon icon-card"></i><span class="bankname">' + list[i].Bank + '</span><span class="banknum">尾号' + lastFour + '</span><i class="icon icon-del"></i></li>';
					}
					$operate.eq(0).removeClass('show');
					$operate.eq(1).addClass('show');
					$('.card-list').html(html);
					$('.bank-select').addClass('show').prev().removeClass('show');
				} else {
					$operate.eq(1).removeClass('show');
					$operate.eq(0).addClass('show');
				}
			},
			// 获取所有银行列表
			getAllBankCardList: function () {

				if (0 == tobj.bankCardList.length) {
					obj.ajaxFn('/MyAccount/GetPayTypeList', {
						callback: function (res) {
							var html = '<li class="active" data-type="default">--' + $.t("Choose_bank") + '--</li>',
								list = [];
							if (res.IsSuccess) {
								list = res.Data;
								for (var i = 0; i < list.length; i++) {
									if (15 == list[i].Id || 61 == list[i].Id || 62 == list[i].Id) {
										continue;
									}
									html += '<li data-id="' + list[i].Id + '"><i class="bank ' + list[i].BankCode.toLowerCase() + '"></i><span class="bankname">' + list[i].BankName + '</span></li>';
								}
								$('.bank-list').html(html);
								tobj.bankCardList = list;
							}
						}
					});
				}
			},
			// 获取我的地址列表
			myAddressListFn: function (list, flag, sign) {
				var html = '<li data-type="mod-addAddr">＋' + $.t("quick_address") + '</li>',
					_authTxt = ''
				$list = $('.wallet-list'), $form = $('.virtual-cash'), _remark = '';
				$form.find('.dropdown-txt>.addr-txt').html('');
				$form.find('.dropdown-txt>.icon-unauth').html('');
				if (sign) {
					for (var i = 0; i < $list.find('li').length; i++) {
						$list.find('li').eq(i).remove();
					}
				}
				if (0 != $list.find('[data-type]').length) {
					flag = true;
				} else {
					flag = false;
				}
				if (flag) {
					html = '';
				}
				if (0 < list.length) {
					for (var i = 0; i < list.length; i++) {
						if (list[i].IsVerified) {
							_authTxt = '<i class="icon icon-auth"></i>';
						} else {
							_authTxt = '<i class="icon icon-unauth"></i>';
						}
						if (!list[i].IsValid) {
							_remark = '（无效地址）';
						} else {
							_remark = '';
						}
						html += '<li data-sign="' + list[i].Memo + '" data-id="' + list[i].Id + '">' + _authTxt + '\
                        <label><span style="display:inline;">' + list[i].Tag + '</span><span style="color:red; display:inline;">' + _remark + '</span><span class="addr-txt">' + list[i].Address + '</span></label>\
                        <i class="icon icon-del"></i>\
                     </li>';
					}
					$('.wallet-add').removeClass('show');
				} else {
					$form[0].reset();
					$form.find('.dropdown-txt').html('<i class="icon icon-down2"></i><span class="operate-style wallet-operate wallet-add show" data-type="new-addr">' + $.t('add_address') + '</span>');
				}
				if (flag) {
					$list.append(html);
				} else {
					$list.html(html);
				}
			},
			// 确定CNY提现申请
			toCNYCash: function (that) {
				obj.ajaxFn('/Withdraw/Apply', {
					data: this.cnyData,
					callback: function (res) {
						var msg = '',
							_t;
						if (res.IsSuccess) {
							msg = $.t('withdrawal_request');
							/*that.find('.txt-bank').text('--');
							that.find('.txt-num').text('--');*/
							that.find('#cash-num').val('');
							that.find('#buz-pwd').val('');
							that.find('#phone-code').val('');
							that.find('#gug-code').val('');
							obj.hideTips(msg);
						} else {
							if (133 == res.Code) {
								msg = $.t('trade_error');
								_t = $('#buz-pwd');
							} else if (201 == res.Code) {
								msg = $.t('otp');
								_t = $('#gug-code');
								if (that.find('.phone-code').hasClass('show')) {
									msg = $.t('verify_error');
									_t = $('#phone-code');
								}
							} else if (202 == res.Code) {
								msg = $.t('phone_expires');
								_t = $('#phone-code');
							} else if (212 == res.Code) {
								msg = $.t('reset_passd') + $.t('later_24');
							}
							if (133 == res.Code || 201 == res.Code || 202 == res.Code) {
								obj.getTips(_t, msg);
							} else {
								msg = msg || res.ErrorMsg;
								$('#mod-prompt>.mod-body>.tips-txt').text(msg);
								obj.modShow('#mod-prompt');
							}
						}
						that.find('.cash-btn').prop('disabled', false);
					},
					errorCallback: function () {
						that.find('.cash-btn').prop('disabled', false);
					}
				});
			},
			// 确定虚拟币提现申请
			toCoinCash: function (that, isAuth) {
				var url = '/Withdraw/ApplyCoin';
				if (isAuth) {
					url = '/Withdraw/ApplyVerifiedCoin';
				}
				obj.ajaxFn(url, {
					data: this.coinData,
					callback: function (res) {
						var msg = '';
						if (res.IsSuccess) {
							that.find('.dropdown-txt').html('<i class="icon icon-down2"></i>');
							that.find('#virCash-num').val('');
							that.find('#virCash-remarks').val('');
							that.find('#virBuz-pwd').val(''),
								that.find('#addr-gug').val('');
							that.find('#addr-phone').val('');
							that.find('.dropdown-list>li.active').removeClass('active');
							msg = $.t('withdrawal_request');
							obj.hideTips(msg);
						} else {
							//msg = res.ErrorMsg+'，'+$.t('apply_fail');
							if (133 == res.Code) {
								msg = $.t('trade_error');
								_t = $('#virBuz-pwd');
							} else if (201 == res.Code) {
								msg = $.t('otp');
								_t = $('#addr-gug');
								if (that.find('.phone-code').hasClass('show')) {
									msg = $.t('verify_error');
									_t = $('#addr-phone');
								}
							} else if (202 == res.Code) {
								msg = $.t('phone_expires');
								_t = $('#addr-phone');
							}
							if (133 == res.Code || 201 == res.Code || 202 == res.Code) {
								obj.getTips(_t, msg);
							} else {
								msg = res.ErrorMsg;
								if (-1 == res.Code) {
									msg = $.t('the_invalid');
								}
								$('#mod-prompt>.mod-body>.tips-txt').text(msg);
								obj.modShow('#mod-prompt');
							}
						}
						that.find('.cash-btn').prop('disabled', false);
					},
					errorCallback: function () {
						that.find('.cash-btn').prop('disabled', false);
					}
				})
			},
			// 获取资产列表
			myAsset: function () {
				obj.ajaxFn('/MyAccount/MyAsset', {
					data: {
						currencys: ['mbtc', 'eth', 'bitcny', 'usdt']
					},
					callback: function (res) {
						if (res.IsSuccess) {
							tobj.assetList = res.Data && res.Data.AssetList;
							for (var i = 0; i < tobj.assetList.length; i++) {
								if ('AE' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Aeternity';
								} else if ('BTS' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Bitshares';
								} else if ('EOS' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'EOS';
								} else if ('BITCNY' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'BITCNY';
								} else if ('ETH' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Ethereum';
								} else if ('ETC' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Ethereum Classic';
								} else if ('MBTC' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Bitcoin';
								} else if ('ARDR' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Ardor';
								} else if ('FLDC' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'FoldingCoin';
								} else if ('NEO' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'NEO';
								} else if ('USDT' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Tether';
								} else if ('HLC' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'HalalChain';
								} else if ('XAS' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'Asch';
								} else if ('SEER' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'SEER';
								} else if ('BTO' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'BOTTOS';
								} else if ('VTC' == tobj.assetList[i].CurrencyId) {
									tobj.assetList[i].All = 'VertCoin';
								}
							}
							tobj.showAssetList();
						}
					}
				});
			},
			// 展示资产列表
			showAssetList: function (index) {
				var list = tobj.assetList || [],
					html = '',
					param = obj.getParam(),
					$tr = null,
					$a = null,
					mkId = '',
					_ele = '',
					count = 0,
					_s;
				index = index || 0;
				if (index > list.length) {
					index = list.length - 1;
				}
				if (0 == list.length || 10 >= list.length) {
					obj.resizeHeight('.currency-list');
					$(window).on('resize', function () {
						obj.resizeHeight('.currency-list');
					});
				} else {
					$(window).on('resize', null);
				}
				if (list.length != 0) {
					mkId = param.mkid || 'MBTC';
					var lang = localStorage.getItem('i18next_lng'),
						_cny = 0,
						_usdt = 0;
					if (lang == 'zh-cn') {
						$('#usdt-bitcny').text('BITCNY')
					}
					for (var i = index; i < list.length; i++) {
						var r_msg = $.t("recharge"),
							c_msg = $.t("cash"),
							r_class = '',
							c_class = '';
						_usdt += list[i].ExchangeList[3].Amount;
						_cny += list[i].ExchangeList[2].Amount;
						if (list[i].IsVirtualCoin) {
							_ele = '<span>' + list[i].CurrencyId + '</span>';
						} else {
							_ele = '<span>' + list[i].CurrencyId + '</span>';
						}
						if (tobj.filter.txt && (-1 == list[i].CurrencyId.toLowerCase().indexOf(tobj.filter.txt))) {
							continue;
						}
						if (tobj.filter.hold && list[i].TotalAmount === 0) {
							continue;
						}
						if (2 == list[i].CurrencyStatus || 3 == list[i].CurrencyStatus) {
							c_msg = $.t('suspend');
							c_class = 'pause';
						} else if (4 == list[i].CurrencyStatus || 5 == list[i].CurrencyStatus) {
							r_msg = $.t('suspend');
							r_class = 'pause';
						} else if (6 == list[i].CurrencyStatus || 7 == list[i].CurrencyStatus) {
							c_msg = $.t('suspend');
							r_msg = $.t('suspend');
							r_class = 'pause';
							c_class = 'pause';
						}
						//if(tobj.filter.shelve&&)
						html += '<tr class="operate-capital" data-type="' + list[i].IsVirtualCoin + '" data-id="' + list[i].Id + '" data-sign="' + list[i].CurrencyId + '">\
                           <td><i class="icon2 icon-' + list[i].CurrencyId.toLowerCase() + '"></i><span></span>' + _ele + '</td>\
                           <td>' + list[i].TotalAmount + '</td>\
                           <td>' + obj.getFloatValue(list[i].Balance, list[i].ShowPrecision) + '</td>\
                           <td>' + obj.getFloatValue(list[i].LockedAmount, list[i].ShowPrecision) + '</td>\
                           <td>' + list[i].ExchangeList[0].Amount + '</td>\
                           <td>' + list[i].ExchangeList[1].Amount + '</td>\
                           <td>' + (lang == "en" ? list[i].ExchangeList[3].Amount : list[i].ExchangeList[2].Amount) + '</td>\
                           <td><a href="javascript:;" class="' + r_class + '" data-type="recharge">' + r_msg + '</a><a href="javascript:;" class="' + c_class + '" data-type="cash" >' + c_msg + '</a></td>\
                        </tr>'; //<td>'+list[i].ExchangeList[1].Amount+'</td>\
						count++;
						_s++;
						if (count >= tobj.pageObj.size) {
							break;
						}

						// $('.fixed_fee').eq(i).text(list[i].WithdrawFixedFee);
					}
					if (lang == 'zh-cn') {
						$('.con_asset').text('¥' + obj.getFloatValue(_cny, 2));
					} else {
						$('.con_asset').text('$' + obj.getFloatValue(_usdt, 2));
					}
				} else if (list.length == 0) {
					html = '<tr class="operate-capital"><td colspan="7" style="text-align:center;">' + $.t("relate_content") + '</td></tr>';
				}
				
				$('.table-currency>tbody>tr').each(function () {
					var _that = $(this);
					if (!_that.hasClass('actionArrow')) {
						_that.remove();
					}
				});
				$('.table-currency>tbody>.actionArrow').eq(0).before(html);
				$('a.pause').css('pointer-events', 'none');
				$tr = $('.table-currency>tbody>tr');
				$tr.each(function () {
					if (mkId == $(this).attr('data-sign')) {
						$a = $(this).find('a');
						return false;
					}
				});
				if (param && param.type) {
					if ($a && 0 < $a.length) {
						$a.each(function () {
							if (param.type == $(this).attr('data-type')) {
								$(this).trigger('click');
								return false;
							}
						});
					}
				}
				if (tobj.filter.hold || tobj.filter.txt) {
					tobj.pageObj.totalPg = Math.ceil((list.length - _s) / tobj.pageObj.size);
				} else {
					tobj.pageObj.totalPg = Math.ceil(list.length / tobj.pageObj.size);
				}
				if (1 < tobj.pageObj.totalPg) {
					obj.pageFn(null, tobj.pageObj.page, tobj.pageObj.totalPg, function (now, all) {
						tobj.pageObj.page = now;
						var _index = now - 2 + tobj.pageObj.size;
						if (now == 1) {
							_index = 0;
						}
						$('.actionArrow.show').removeClass('show');
						tobj.showAssetList(_index);
					});
				} else {
					$('.pagination-list').empty();
				}
			},
			// 获取当前用户的实名验证等级
			getVerifyLevel: function () {
				obj.ajaxFn('/user/GetVerifyLevel', {
					callback: function (res) {
						var count = 5,
							timer = null;
						if (res.IsSuccess) {
							if (0 >= res.Data) {
								timer = setInterval(function () {
									count--;
									$('#mod-prompt2 .countdown').text(count);
									if (0 === count) {
										clearInterval(timer);
										window.location.href = './toRealName.html';
									}
								}, 1000);
								obj.modShow('#mod-prompt2');
							} else {
								tobj.myAsset();
							}
						}
					}
				});
			},
			// generate虚拟币地址
			/*getGenAddress: function(id){
			   tobj.generateCount++;
			   if(1<tobj.generateCount){
			      clearInterval(tobj.addrTimer);
			      tobj.addrTimer = setTimeout(function(){
			         tobj.getAddress(id);
			      },1000*3);
			   }else{
			      obj.ajaxFn('/MyAccount/GenerateAddress',{
			         data: {currencyId: id},
			         callback: function(res){
			            clearInterval(tobj.addrTimer);
			            tobj.addrTimer = setTimeout(function(){
			               tobj.getAddress(id);
			            },1000*3);
			         }
			      });
			   }
			},*/
			// 获取虚拟币地址
			getAddress: function (id) {
				obj.ajaxFn('/MyAccount/GetAddress', {
					data: {
						currencyId: id
					},
					callback: function (res) {
						if (res.IsSuccess) {
							if (res.Data) {
								clearInterval(tobj.addrTimer);
								$('#address').val(res.Data);
								$('#qrcode>canvas').remove();
								if (0 != tobj.detail.Address.length) {
									$('#qrcode').qrcode({
										width: 132,
										height: 132,
										correctLevel: 0,
										text: 'otpauth://totp/' + obj.account + '?secret=' + res.Data
									});
								}
							} else {
								tobj.addrTimer = setTimeout(function () {
									//tobj.getGenAddress(id);
									tobj.getAddress(id);
								}, 1000 * 3);
							}
						}
					}
				});
			},
			// 提交充值申请
			toDepositApply: function ($box, sign, that) {
				obj.ajaxFn('/Deposit/Apply', {
					data: this.applyData,
					callback: function (res) {
						var msg = '';
						if (res.Data) {
							$box.removeClass('show');
							$box.next('.items-box').addClass('show');
							if (1 == sign) {
								$('#txt-bankAccount').text(res.Data.AccountNumber);
								$('#txt-subbranch').text('中国银行上海闵行支行');
								$('#txt-ownername').text(res.Data.OwnerName);
								$('#txt-payAccount').text(res.Data.Amount);
								$('#txt-currency2').text('CNY');
								$('#txt-remark').text(res.Data.Identify);
							} else if (2 == sign) {
								$('#txt-accountNumber').text(res.Data.AccountNumber);
								$('#txt-ownerName').text(res.Data.OwnerName);
								$('#txt-amount').text(res.Data.Amount);
								//$('#txt-currency').text('CNY');
								$('#txt-identify').text(res.Data.Identify);
							}
						} else {
							msg = res.ErrorMsg;
							$('#mod-prompt>.mod-body>.tips-txt').text(msg);
							obj.modShow('#mod-prompt');
						}
						that.prop('disabled', false).text($.t('submit'));
					},
					errorCallback: function () {
						that.prop('disabled', false).text($.t('submit'));
					}
				});
			},
			// 提交充值码申请充值
			toUseCodeApply: function (tr, that) {
				obj.ajaxFn('/Deposit/UseCode', {
					data: {
						code: $('#alipay-code').val() + '/' + $('#alipay-codePwd').val()
					},
					callback: function (res) {
						var msg = '';
						that.prop('disabled', false).text($.t('submit'));
						if (res.IsSuccess) {
							$('#alipay-code').val('');
							$('#alipay-codePwd').val('');
							// var td = tr.find('td');
							// td.eq(1).text('100');
							// td.eq(3).text('100');
							// td.eq(4).text('100');
							// td.eq(5).text('100');
							msg = $.t('application');
						} else {
							msg = res.ErrorMsg;
						}
						$('#mod-prompt>.mod-body>.tips-txt').text(msg);
						obj.modShow('#mod-prompt');
					},
					errorCallback: function () {
						that.prop('disabled', false).text($.t('submit'));
					}
				});
			},
			// 是否可以进行充值
			isVerifyAble: function () {
				obj.ajaxFn('/MyAccount/VerifyLevel', {
					callback: function (res) {
						var data = {};
						if (res.IsSuccess) {
							tobj.isVerifyAbles = true;
							$('#alipay-phone,#bank-phone').val(res.Data);
						} else {
							tobj.isVerifyAbles = false;
							$('#mod-prompt>.mod-body>.tips-txt').text(res.ErrorMsg);
							obj.modShow('#mod-prompt');
						}
						data.isVerifyAbles = tobj.isVerifyAbles;
						tobj.getData(data, 1);
					}
				});
			},
			// 是否可以进行提现
			isValidAble: function (flag, id) {
				var url = '',
					data = {};
				if ('false' == flag) {
					url = '/Withdraw/ValidApply';
				} else {
					url = '/Withdraw/CoinValidApply';
					data.currencyId = id;
				}
				obj.ajaxFn(url, {
					data: data,
					callback: function (res) {
						var data = {};
						data.Data = res.Data;
						if (res.IsSuccess) {
							tobj.isValidAbles = true;
						} else {
							tobj.isValidAbles = false;
							$('#mod-prompt>.mod-body>.tips-txt').text(res.ErrorMsg);
							obj.modShow('#mod-prompt');
						}
						data.isValidAbles = tobj.isValidAbles;
						data.flag = flag;
						tobj.getData(data, 2);
					}
				});
			},
			// 获取用户绑定类型
			getAuthType: function () {
				obj.getAuthType({
					async: false,
					callback: function (res) {
						var $phone = $('.phone-code'),
							$gug = $('.gug-code'),
							_phone = $('.code-tab[data-type="phone"]'),
							_gug = $('.code-tab[data-type="gug"]'),
							_gug2 = $('.auth-box[data-auth]').eq(0),
							_phone2 = $('.auth-box[data-auth]').eq(1);
						if (res.IsSuccess) {
							if (2 == res.Data || 3 == res.Data) {
								$phone.addClass('show');
								$gug.removeClass('show');
								_phone.removeClass('hide');
								_phone2.removeClass('hide').removeClass('code-box');
								_gug.addClass('hide');
							} else if (4 == res.Data || 5 == res.Data) {
								$phone.removeClass('show');
								$gug.addClass('show');
								_phone.addClass('hide');
								_gug.removeClass('hide');
								_gug2.removeClass('hide').removeClass('code-box');
							} else if (6 == res.Data || 7 == res.Data) {
								$phone.addClass('show');
								$gug.addClass('show');
								_phone.removeClass('hide');
								_phone2.removeClass('hide');
								_gug2.removeClass('hide').removeClass('code-box');
							}
							if (0 != res.Data) {
								tobj.authObj.code = true;
							}
						}
					}
				});
			},
			// 省市级联
			getProCity: function () {
				var citydata = {
						"北京": ["北京"],
						"上海": ["上海"],
						"天津": ["天津"],
						"重庆": ["重庆"],
						"广东": ["广州", "深圳", "珠海", "汕头", "东莞", "中山", "佛山", "韶关", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "潮州", "揭阳", "云浮"],
						"广西": ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "南宁地区", "柳州地区", "贺州", "百色", "河池"],
						"江苏": ["南京", "镇江", "苏州", "南通", "扬州", "盐城", "徐州", "连云港", "常州", "无锡", "宿迁", "泰州", "淮安"],
						"浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
						"辽宁": ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
						"吉林": ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边"],
						"黑龙江": ["哈尔滨", "齐齐哈尔", "牡丹江", "佳木斯", "大庆", "绥化", "鹤岗", "鸡西", "黑河", "双鸭山", "伊春", "七台河", "大兴安岭"],
						"河南": ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "济源"],
						"河北": ["石家庄", "邯郸", "邢台", "保定", "张家口", "承德", "廊坊", "唐山", "秦皇岛", "沧州", "衡水"],
						"湖南": ["长沙", "常德", "株洲", "湘潭", "衡阳", "岳阳", "邵阳", "益阳", "娄底", "怀化", "郴州", "永州", "湘西", "张家界"],
						"湖北": ["武汉", "宜昌", "荆州", "襄樊", "黄石", "荆门", "黄冈", "十堰", "恩施", "潜江", "天门", "仙桃", "随州", "咸宁", "孝感", "鄂州"],
						"山东": ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"],
						"山西": ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "吕梁", "忻州", "晋中", "临汾", "运城"],
						"安徽": ["合肥", "芜湖", "蚌埠", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "宿州", "池州", "淮南", "巢湖", "阜阳", "六安", "宣城", "亳州"],
						"福建": ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
						"江西": ["南昌", "景德镇", "九江", "鹰潭", "萍乡", "新馀", "赣州", "吉安", "宜春", "抚州", "上饶"],
						"海南": ["海口", "三亚", "儋州市"],
						"新疆": ["乌鲁木齐", "石河子", "克拉玛依", "伊犁", "巴音郭勒", "昌吉", "克孜勒苏柯尔克孜", "博尔塔拉", "吐鲁番", "哈密", "喀什", "和田", "阿克苏"],
						"贵州": ["贵阳", "六盘水", "遵义", "安顺", "铜仁", "黔西南", "毕节", "黔东南", "黔南"],
						"云南": ["昆明", "大理", "曲靖", "玉溪", "昭通", "楚雄", "红河", "文山", "思茅", "西双版纳", "保山", "德宏", "丽江", "怒江", "迪庆", "临沧"],
						"西藏": ["拉萨", "日喀则", "山南", "林芝", "昌都", "阿里", "那曲"],
						"陕西": ["西安", "宝鸡", "咸阳", "铜川", "渭南", "延安", "榆林", "汉中", "安康", "商洛"],
						"甘肃": ["兰州", "嘉峪关", "金昌", "白银", "天水", "酒泉", "张掖", "武威", "定西", "陇南", "平凉", "庆阳", "临夏", "甘南"],
						"四川": ["成都", "绵阳", "德阳", "自贡", "攀枝花", "广元", "内江", "乐山", "南充", "宜宾", "广安", "达州", "雅安", "眉山", "甘孜", "凉山", "泸州", "遂宁", "阿坝州"],
						"内蒙古": ["呼和浩特", "包头", "乌海", "赤峰", "呼伦贝尔盟", "阿拉善盟", "哲里木盟", "兴安盟", "乌兰察布盟", "锡林郭勒盟", "巴彦淖尔盟", "伊克昭盟", "鄂尔多斯"],
						"宁夏": ["银川", "石嘴山", "吴忠", "固原"],
						"青海": ["西宁", "海东", "海南", "海北", "黄南", "玉树", "果洛", "海西"]
					},
					$province = $('#bank-province'),
					$city = $('#bank-city'),
					list = [],
					html = '',
					html2 = '';
				for (var k in citydata) {
					html += '<option>' + k + '</option>';
				}
				$province.html(html);
				html2 = '<option>北京</option>';
				$city.html(html2);
				$province.on('change', function () {
					var val = $(this).val();
					list = citydata[val];
					html2 = '';
					for (var i = 0; i < list.length; i++) {
						html2 += '<option>' + list[i] + '</option>';
					}
					$city.html(html2);
				});
			}
		};
		if (obj.account) {
			tobj.getAuthType();
			tobj.getVerifyLevel();
			tobj.getUserInfo();
		}
		//联系客服
		$('.re-cs').on('click', function () {
			$('#kf5-support-btn').trigger('click');
		});
		// 充值/提现操作
		$('.table-currency').on('click', '.operate-capital a[data-type]', function () {
			var type = $(this).attr('data-type'),
				$tr = $(this).closest('.operate-capital'),
				tType = $tr.attr('data-type'),
				_sign = $tr.attr('data-sign').toLowerCase(),
				$arrow = $('.actionArrow'),
				$actual = $arrow.find('.box-actual'),
				$virtual = $arrow.find('.box-virtual'),
				$box = $(this).closest('.mod-box'),
				targetTop = $tr.offset().top - ($(window).innerHeight() - $('.mod-' + type).height() / 2),
				$btn;
			// if('flc'==_sign){
			//    var msg = '闪链';
			// if('nbc'==_sign){
			//    msg='新赛波币'
			// }else{
			//    msg='闪链'
			// }
			//    obj.hideTips(msg+'暂不支持该功能！','green');
			//    return false;
			// }
			if ('cny' == _sign) {
				$('#cny-cash').html('提现金额：');
			} else {
				$('#cny-cash').html($.t('amount1'));
			}
			if ('bts' == _sign || 'ardr' == _sign) {
				$('.form-group.memo').removeClass('hide');
			} else {
				$('.form-group.memo').addClass('hide');
			}
			$('.actionArrow').insertAfter($tr);
			for (var i = 0; i < tobj.assetList.length; i++) {
				if (tobj.assetList[i].CurrencyId.toLowerCase() === _sign) {
					tobj.detail = tobj.assetList[i];
					break;
				}
			}
			clearInterval(tobj.addrTimer);
			if ('recharge' == type) {
				$('#address').val('');
				tobj.isVerifyAble();
				if ('true' === tType) {
					// 充值二维码
					$('#qrcode>canvas').remove();
					if (0 != tobj.detail.Address.length) {
						$('#address').val(tobj.detail.Address);
						$('#qrcode').qrcode({
							width: 132,
							height: 132,
							correctLevel: 0,
							text: tobj.detail.Address
						});
					} else {
						tobj.getAddress((tobj.detail.CurrencyId).toLowerCase());
					}
				}
				if ('MBTC' == tobj.detail.CurrencyId) {
					tobj.detail.CurrencyId = 'BTC';
				}
				$('.txt-name').text(tobj.detail.CurrencyId);
				$('.txt-allname').text(tobj.detail.All);
				var userId = localStorage.getItem('userId');
				if ('bts' == _sign || 'bitcny' == _sign) {
					$('.meimo').val(userId);
					$('.form-bts').removeClass('hide');
					$('.form-coin').addClass('hide');
				} else {
					$('.form-bts').addClass('hide');
					$('.form-coin').removeClass('hide');
				}
				//点击复制
				$('.copy-bts').on('click', function () {
					var _address1 = document.getElementById("copy1"),
						_address2 = document.getElementById("copy2"),
						_sign = $(this).attr('data-sign');
					if (1 == _sign) {
						_address1.select(); // 选择对象
						// var value = _address1.innerHTML;
					} else {
						_address2.select(); // 选择对象
						// var value = _address2.innerHTML;
					}
					document.execCommand("Copy");
					obj.hideTips($.t('copy_success'));
				});

			} else if ('cash' == type) {
				tobj.isValidAble(tType, _sign);
				var lang = localStorage.getItem('i18next_lng');
				if ('en' == lang) {
					$('.cash-notice.english').removeClass('hide');
					$('.cash-notice.chinese').addClass('hide');
				} else {
					$('.cash-notice.english').addClass('hide');
					$('.cash-notice.chinese').removeClass('hide');
				}
				if ($('.mod-cash').hasClass('show')) {
					$('.mod-cash.show').find('form')[0].reset();
					$('.actual-cash .dropdown-txt').find('.txt-bank,.txt-num').html('--');
				} else {
					$('.box-form.show').find('.txt-tip.error').remove();
				}
				//$('.username').text(tobj.detail.UserName || $.t('anonym'));
				$('.txt-name').text(tobj.detail.CurrencyId);
				$('.txt-min').text(tobj.detail.WithdrawOnceMin);
				$('.txt-limit').text(tobj.detail.WithdrawOnceLimit);
				$('.currency-name').text(tobj.detail.CurrencyId);
				//充值费率
				$('.oncelimit').text(tobj.detail.WithdrawOnceLimit);
				$('.oncemin').text(tobj.detail.WithdrawOnceMin);
				$('.fee_rate').text(tobj.detail.WithdrawFixedFee);
				$('#virCash-num').prop('placeholder', $.t('maximum') + tobj.detail.Balance);
				if ('false' === tType) {
					$('#cash-num').prop('placeholder', $.t('maximum') + tobj.detail.Balance);
				} else {
					$('#virCash-num').prop('placeholder', $.t('maximum') + tobj.detail.Balance);
				}
				tobj.cnyAmount = tobj.detail.ExchangeList[0].Amount;
				$('#cash-num,#virCash-num').on('input', function () {
					var that = $(this),
						_val = that.val();
					if (_val) {
						_val = _val.trim();
						if (tobj.detail.Balance <= _val) {
							that.val(tobj.detail.Balance);
						}
					}
				});
				if (!tobj.authObj.trade) {
					$('.rightips').eq(1).removeClass('hide');
					$('.rightips').eq(3).removeClass('hide');
					setTimeout(function () {
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').html($.t('not_set_pwd'));
						$('#mod-prompt .tips-btn').html('<a href="./set-buzpwd.html" class="btn btn-default">' + $.t('certain') + '</a>');
					});
				} else {
					$('.rightips').eq(0).removeClass('hide');
					$('.rightips').eq(2).removeClass('hide');
				}
				/*if('false'===tType){
				   if(1>=$('.card-list>li').length){
				      tobj.getMyBankCardList();
				   }
				}*/
			}
			$('.operate-capital a').each(function () {
				$(this).removeClass('on');
			});
			if (!$(this).hasClass('on')) {
				$(this).addClass('on');
			}

			if (tType == 'false') {
				$('.box-actual').addClass('show');
				$('.box-virtual').removeClass('show');
			} else {
				$('.box-actual').removeClass('show');
				$('.box-virtual').addClass('show');
			}
			$('.mod-box').removeClass('show');
			if (that.sign != _sign) {
				$arrow.addClass('show');
				$('.mod-' + type).addClass('show');
				if (Math.abs(targetTop - window.pageYOffset) > 45) {
					$('body').animate({
						scrollTop: targetTop
					}, 400);
				}
			} else if (that.sign == _sign && that.type != type) {
				$arrow.addClass('show');
				$('.mod-' + type).addClass('show');
			} else {
				if ($arrow.hasClass('show')) {
					$arrow.removeClass('show');
				} else {
					$arrow.addClass('show');
					$('.mod-' + type).addClass('show');
				}
			}
			$('.operate-capital').removeClass('active');
			if (!$tr.hasClass('active')) {
				$tr.addClass('active');
			} else if (!$('.actionArrow').hasClass('show')) {
				$('.operate-capital').removeClass('active');
			}
			// 复制充值地址
			btn = new Clipboard('#copy-addr');
			btn.on('success', function (e) {
				obj.hideTips($.t('copy_success'));
				e.clearSelection();
			});
			/*$('#copy-addr').zclip({path: './js/ZeroClipboard.swf',
			   copy: function(){
			      return $('#address').val();
			   },
			   afterCopy: function(){
			      obj.hideTips($.t('copy_success'));
			   }
			});*/
			that.type = type;
			that.sign = _sign;
			var _height = $arrow[0].offsetTop;
			$('.actionArrow.mask').css('top', _height + 'px');
			if ('cash' == type) {
				$('.actionArrow.mask').removeClass('show');
			}
			$('.cancel-mask').on('click', function () {
				$('.actionArrow.mask').removeClass('show');
			})
		});
		$('#buz-pwd,#virBuz-pwd').on('blur', function () {
			var that = $(this),
				$msg = $('.msg-buzpwd');
			if (tobj.authObj.trade) {
				$msg.addClass('hide');
			} else {
				$msg.removeClass('hide');
			}
		});

		// 我的资产充值tab
		$('.allow-recharge').on('click', '>.recharge-tab>li', function () {
			var selector = '',
				index = $(this).index();
			if ($(this).hasClass('on')) {
				return false;
			}
			$(this).addClass('on').siblings('li').removeClass('on');
			if (index == 1) {

			}
			$('.recharge-boxs>.recharge-box').eq(index).addClass('show').siblings('div').removeClass('show');
		});

		// 提交充值申请
		$('.box-form').on('click', '>.form-group>.commit-apply', function () {
			var that = $(this),
				type = that.attr('data-id'),
				$box = that.closest('.items-box'),
				$tr = that.closest('tr').prev('tr');

			if ('alipay' == type) {
				var aplipay_val = parseFloat($('#alipay-num').val() || 0);
				if (!!$('#alipay-phone').val()) {
					if (!Number.isNaN(aplipay_val) && aplipay_val >= 100) {
						that.prop('disabled', true).text($.t('commit'));
						tobj.applyData = {
							depositWay: 2,
							amount: aplipay_val,
							remark: $('#alipay-phone').val() || ''
						};
						tobj.toDepositApply($box, 2, that);
						$('#alipay-num').val('');
						$('#alipay-phone').val('');
					} else {
						obj.hideTips($.t('valid_amount'), 'green');
					}
				} else {
					obj.hideTips($.t('phone_number') + $.t('content_blank'), 'green');
				}
			} else if ('bank' == type) {
				var bank_val = parseFloat($('#bank-num').val() || 0);
				if (!!$('#bank-phone').val()) {
					if (!Number.isNaN(bank_val) && bank_val >= 100) {
						that.prop('disabled', true).text($.t('commit'));
						tobj.applyData = {
							depositWay: 1,
							amount: $('#bank-num').val(),
							remark: $('#bank-phone').val() || ''
						};
						tobj.toDepositApply($box, 1, that);
						$('#bank-num').val('');
						$('#bank-phone').val('');
					} else {
						obj.hideTips($.t('valid_amount'), 'green');
					}
				} else {
					obj.hideTips($.t('phone_number') + $.t('content_blank'), 'green');
				}
			} else if ('code' == type) {
				tobj.toUseCodeApply($tr, that);
			}
		});

		// 切换谷歌/手机验证
		// $('.code-tab').on('click',function(){
		//    var type = $(this).attr('data-type'),
		//       $p = $(this).parent();
		//    if(0!=$(this).closest('.actual-cash').length){
		//       $(this).parent().removeClass('show');
		//       $('.'+type+'-code').addClass('show');
		//    }else if(0!=$(this).closest('.virtual-cash').length){
		//       $('.allow-cash .code-box').each(function(){
		//          var _type = $(this).children('.code-tab').attr('data-type');
		//          if(type == _type){
		//             $(this).addClass('auth-code');
		//          }else{
		//             $(this).removeClass('auth-code');
		//          }
		//       });
		//    }else if(0!=$(this).closest('.mod-form').length){
		//       codeFn(type);
		//    }
		// });
		//切换银行图标
		$('#bank-logo').on('click', '>li', function () {
			var _this = $(this);
			$('#bank-logo>li>i').removeClass('bank1').addClass('bank2');
			_this.children('i').removeClass('bank2').addClass('bank1');
			$('#bank-logo>li').removeClass('active');
			_this.addClass('active');
		});
		//网银充值
		$('.btn-cyber').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			var code = $('#bank-logo>li.active').attr('data-id'),
				amount = $('input[name=amount]').val(),
				val = $('#bank-amount').val().trim();
			$('input[name="bankCode"]').val(code);
			$('input[name="depositWay"]').val(5);
			$('#cyber-box').attr('action', '//v2web.XBrick.com/Deposit/ApplyYSB');
			if (amount && code && 100 <= val) {
				$('#cyber-box')[0].submit();
			} else {
				if (!amount) {
					msg = $.t('enter_amount');
				}
				if (val < 100) {
					msg = '充值金额不能小于100';
				} else {
					msg = $.t('select_bank')
				}
				$('#mod-prompt>.mod-body>.tips-txt').text(msg);
				obj.modShow('#mod-prompt');
			}
			// if(!){}
			// var code = $('#bank-logo>li.active').attr('data-id'),
			//    amount = $('#bank-amount').val().trim();
			// obj.ajaxFn('/Deposit/ApplyYSB',{
			//    data: {bankCode: code, amount: amount,remark: '',depositWay: 5},
			//    dataType: 'html',
			//    callback: function(res){
			//       // window.open('Deposit/ApplyYSB?depositWay=5&amount='+amount+'&bankCode='+code);

			//       $('html').html(res);
			//       // $('html').html(res);
			//    }
			// });
		});
		$('#buz-pwd,#gug-code,#phone-code,#virBuz-pwd,#addr-gug,#addr-phone').on('blur', function () {
			var that = $(this),
				_val = that.val(),
				$p = that.parent();

			if (!!_val) {
				$p.find('.txt-tip').remove();
			}
		});
		// 确认CNY提现
		$('.cash-btn').on('click', function () {

			var that = $(this),
				_sign = that.attr('data-sign'),
				$box = that.closest('.box-form'),
				$rt = $box.find('.rightips'),
				$ptr = that.closest('tr').prev().attr('data-sign').toLowerCase(),
				flag = true;

			if (!tobj.authObj.trade) {
				obj.modShow('#mod-prompt');
				$('#mod-prompt .tips-txt').html($.t('not_set_pwd'));
				$('#mod-prompt .tips-btn').html('<a href="./set-buzpwd.html" class="btn btn-default">' + $.t('certain') + '</a>');
				return false;
			}
			if ('cny' == _sign) {
				var $num = $('#cash-num').val(),
					$pwd = $('#buz-pwd').val(),
					$gug = $('#gug-code').val(),
					$phone = $('#phone-code').val(),
					_id = $('.card-list>li.active').attr('data-id'),
					$code = $box.find('.code-box.show'),
					$p = that.closest('.actual-cash');

				if (tobj.detail.WithdrawOnceMin > $num) {
					obj.hideTips($.t('cash_withdrawal') + $.t('less_than2') + tobj.detail.WithdrawOnceMin, 'green');
					flag = false;
				}
				if (tobj.detail.Balance < $num) {
					obj.hideTips($.t('maximum') + $.t('cash_out') + tobj.detail.Balance, 'green');
					$('#cash-num').focus();
					flag = false;
				}
				if (!tobj.authObj.trade) {
					$rt.eq(1).removeClass('hide');
				} else {
					$rt.eq(0).removeClass('hide');
				}
				if (flag) {
					that.prop('disabled', true);
					tobj.cnyData = {
						currencyId: '',
						bankId: _id,
						amount: $num,
						verifyWay: '',
						password: $pwd,
						validCode: ''
					};
					if ($code.hasClass('gug-code')) {
						tobj.cnyData.validCode = $gug;
						tobj.cnyData.verifyWay = 1;
					} else {
						tobj.cnyData.validCode = $phone;
						tobj.cnyData.verifyWay = 2;
					}
					tobj.cnyData.currencyId = $ptr;
					tobj.toCNYCash($p);
				}
			} else if ('coin' == _sign) {
				var _addr = $box.find('.dropdown-txt>.addr-txt').text(),
					_vir_auth = $box.find('.dropdown-txt>.icon-unauth').length,
					_vir_num = $box.find('#virCash-num').val(),
					_vir_remarks = $box.find('#virCash-remarks').val() || '',
					$codes = $box.find('.code-box.show'),
					_vir_pwd = $box.find('#virBuz-pwd').val(),
					_gug = $box.find('#addr-gug').val(),
					_phone = $box.find('#addr-phone').val(),
					isAuth = false;

				if (tobj.detail.WithdrawOnceMin > _vir_num) {
					obj.hideTips($.t('cash_withdrawal') + $.t('less_than2') + tobj.detail.WithdrawOnceMin, 'green');
					flag = false;
				}
				if (tobj.detail.Balance < _vir_num) {
					obj.hideTips($.t('maximum') + $.t('cash_out') + tobj.detail.Balance, 'green');
					$box.find('#virCash-num').focus();
					flag = false;
				}
				if (flag) {
					that.prop('disabled', true);
					tobj.coinData = {
						currencyId: $ptr,
						address: _addr,
						volume: _vir_num,
						memo: _vir_remarks
					};
					if (1 == _vir_auth && !!_addr) {
						tobj.coinData.password = _vir_pwd;
						isAuth = false;
						if (!$codes.hasClass('gug-code')) {
							tobj.coinData.verifyWay = 2;
							tobj.coinData.validCode = _phone;
						} else {
							tobj.coinData.verifyWay = 1;
							tobj.coinData.validCode = _gug;
						}
					} else if (0 == _vir_auth && !!_addr) {
						isAuth = true;
					}
					tobj.toCoinCash($box, isAuth);
				}
			}
		});
		$('.send-code').on('click', '>button', function () {
			var that = $(this),
				sign = that.attr('data-sign');
			/*if('act-code'==sign){

			}else if('vir-code'==sign){

			}else if('addr-code'==sign){

			}*/
			obj.sendPhoneCaptcha(that);
		});
		// 我的资产币种过滤
		$('#hide-null').on('click', function () {
			var that = $(this),
				isChecked = that.prop('checked');
			tobj.filter.hold = isChecked;
			tobj.showAssetList();
			$('.actionArrow').removeClass('show');
		});
		$('#currency-search').on('input', function (e) {
			e = e || window.event;

			var that = $(this),
				_val = that.val().toLowerCase();
			if (0 != _val.length) {
				_val = _val.trim();
			} else {
				_val = null;
			}
			tobj.filter.txt = _val;
			tobj.showAssetList();
			$('.actionArrow').removeClass('show');
		});
		if (0 != $('.dropdown-box').length) {

			// 下拉银行卡列表
			$('.dropdown-box').on('click', '>.dropdown-txt', function (e) {
				e = e || window.event;
				e.stopPropagation();
				e.preventDefault();
				var $list = $(this).next('.dropdown-list'),
					$operate = $(this).find('.operate-style.show'),
					$vir =
					type = $operate.attr('data-type');

				if (0 != $operate.length && 'add' == type) {
					obj.modShow('#mod-addBank');
					tobj.getAllBankCardList();
					tobj.getProCity();
					return false;
				} else if (0 != $operate.length && 'new-addr' == type) {
					obj.modShow('#mod-addAddr');
					return false;
				}
				if ($list.hasClass('on')) {
					$list.removeClass('on');
				} else {
					$list.addClass('on');
				}
			});
			$('.dropdown-box').on('click', '>.dropdown-list>li', function (e) {
				e = e || window.event;
				e.stopPropagation();
				e.preventDefault();

				var that = $(this),
					_bankname = that.children('.bankname').text(),
					_banknum = that.children('.banknum').text(),
					_addrTxt = that.find('.addr-txt').text(),
					_auth = '',
					_unauth = '',
					_html = '',
					$box = that.closest('.dropdown-box'),
					selector = that.attr('data-type'),
					$p = that.parent(),
					index = that.index();
				if (0 != index) {
					if ($p.hasClass('bank-list')) {
						$('.open-account').text(_bankname);
					} else if ($p.hasClass('card-list')) {
						$('.txt-bank').text(_bankname).attr('data-id', that.attr('data-id'));
						$('.txt-num').text(_banknum);
					} else if ($p.hasClass('wallet-list')) {

						$box.find('.dropdown-txt').empty();
						if (0 != $(this).find('.icon-auth').length) {
							_auth = $(this).find('.icon-auth');
							html = _auth.prop("outerHTML") + '<span class="addr-txt" data-id="' + that.attr('data-id') + '">' + _addrTxt + '</span><i class="icon icon-down2"></i>';
						} else {
							_unauth = $(this).find('.icon-unauth');
							html = _unauth.prop("outerHTML") + '<span class="addr-txt" data-id="' + that.attr('data-id') + '">' + _addrTxt + '</span><i class="icon icon-down2"></i>';
						}
						var _val = that.attr('data-sign') || '';
						$('#virCash-remarks').val(_val);
						if (_auth) {
							$('.virtual-cash .code-box').each(function () {
								var type = $(this).children('.code-tab').attr('data-type');
								$(this).addClass('auth-code');
							});
							$('.virtual-cash .trade-box').addClass('auth-code');
							// $('.virtual-cash').css('padding-top', '60px');
						} else if (_unauth) {
							// var sign = 'phone';

							$('.virtual-cash .code-box').each(function () {
								var type = $(this).children('.code-tab').attr('data-type');
								if (sign == type) {
									$(this).addClass('auth-code');
								} else {
									$(this).removeClass('auth-code');
								}
							});
							var type = $('.code-tab').attr('data-type');
							$('.allow-cash .code-box').each(function () {
								var _type = $(this).children('.code-tab').attr('data-type');
								// if(type == _type){
								//    $(this).addClass('auth-code');
								// }else{
								//    $(this).removeClass('auth-code');
								// }
							});
							$('.virtual-cash .trade-box').removeClass('auth-code');
							$('.virtual-cash').removeAttr('style');
						}
						$box.find('.dropdown-txt').append(html);
					}
				} else {
					tobj.getAllBankCardList();
					tobj.getProCity();
					if (selector) {
						if ('mod-addAddr' == selector) {
							var sign = 'phone',
								_title = $(this).closest('.actionArrow').prev().attr('data-sign').toLowerCase();
							if (1 == tobj.validateSign) {
								sign = 'gug';
							}
							$('#' + selector).find('.mod-title>.currency-name').text(_title);
							codeFn(sign);
						}
						obj.modShow('#' + selector);
					}
				}
				$(this).addClass('active').siblings('li').removeClass('active');
				$(this).parent().removeClass('on');
			});

			function codeFn(sign) {
				$('#mod-addAddr [data-auth]').each(function () {
					var type = $(this).find('.code-tab').attr('data-type');
					if (sign == type) {
						$(this).addClass('code-box');
					} else {
						$(this).removeClass('code-box');
					}
				});
			}

			// 申请认证
			$('#input-auth').on('change', function () {
				var flag = $(this).prop('checked');
				if (flag) {
					$('#mod-addAddr .auth-box').addClass('show');
				} else {
					$('#mod-addAddr .auth-box').removeClass('show');
				}
			});
			// 添加银行卡
			$('.mod-box').on('click', 'button', function () {
				var id = $(this).prop('id'),
					$form = $(this).closest('.mod-form'),
					$p = $(this).closest('.mod-box'),
					$list = $('.wallet-list>li'),
					flag = true;

				if ('add-bank' == id) {
					var _id = parseInt($form.find('.bank-list>li.active').attr('data-id')),
						_province = $('#bank-province').val(),
						_city = $('#bank-city').val(),
						_sub = $('#bank-subbranch').val(),
						_num = $('#bank-number').val(),
						flag = true;

					if (!_num) {
						flag = false;
					}
					if (!_sub) {
						flag = false;
					}
					if (Number.isNaN(_id)) {
						flag = false;
					}
					if (flag) {
						tobj.myBankData = {
							bankType: _id,
							province: _province,
							city: _city,
							subbranch: _sub,
							cardNumber: _num
						};
						tobj.addMyBank($p);
					} else {
						obj.hideTips($.t('to_complate2'), 'green');
					}
				} else if ('add-addr' == id) {
					var _addr = $('#input-address').val(),
						_tag = $('#input-tag').val(),
						_memo = $('#input-memo').val() || '',
						_isAuth = $('#input-auth').prop('checked'),
						_pwd = $('#input-tradePwd').val(),
						_phone = $('#input-phone'),
						_gug = $('#input-gug');

					for (var i = 1; i < $list.length; i++) {
						if ($list.eq(i).find('.addr-txt').text() === _addr) {
							obj.hideTips($.t('addr_exist'), 'green');
							$('#input-address').focus();
							flag = false;
							break;
						}
					}
					if (!_addr) {
						obj.hideTips('接受地址不能为空', 'green');
					} else if (!_tag) {
						obj.hideTips('标签不能为空', 'green');
					}
					if (flag && _addr && _tag) {
						tobj.addAddressData = {
							accountId: tobj.accountId,
							address: _addr,
							tag: _tag,
							memo: _memo
						};
						if (_isAuth) {
							tobj.addAddressData.password = _pwd;
							if (_phone.parent().hasClass('code-box')) {
								tobj.addAddressData.validCode = _gug.val();
								tobj.addAddressData.verifyWay = 1;
							} else {
								tobj.addAddressData.validCode = _phone.val();
								tobj.addAddressData.verifyWay = 2;
							}
						}
						$p.removeClass('show');
						tobj.addMyAddr($p, _isAuth);
					}
				}
			});
			// 删除某个记录
			$('.dropdown-box').on('click', '>.dropdown-list .icon-del', function (e) {
				e = e || window.event;
				e.stopPropagation();
				e.preventDefault();

				var type = $(this).closest('.dropdown-list'),
					$p = $(this).parent(),
					id = $p.attr('data-id');

				tobj.delData = {
					id: id,
					that: $p
				};
				if (type.hasClass('wallet-list')) {
					obj.modShow('#mod-delAddr');
				} else {
					obj.modShow('#mod-delBank');
				}
			});
			// 确定删除某张银行卡
			$('.mod-box').on('click', '.del-btn', function () {
				var _sign = $(this).attr('data-sign');
				if ('bank' == _sign) {
					obj.modHide('#mod-delBank');
					tobj.delMyBank(tobj.delData.that);
				} else {
					obj.modHide('#mod-delAddr');
					tobj.delMyAddr(tobj.delData.that);
				}
			});
			$('.mod-box').on('click', '[data-action]', function (e) {
				e = e || window.event;
				e.stopPropagation();
				e.preventDefault();

				var $box = $(this).closest('#mod-addAddr');
				if (0 != $box.length) {
					$box.find('.auth-box').removeClass('show');
				}
			});
			$(window).on('click', function () {
				if (0 != $('.dropdown-list').length) {
					$('.dropdown-list').removeClass('on');
				}
			});
		}
	}
});