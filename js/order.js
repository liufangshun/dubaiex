



window.onload = function () {
	if (0 != $('.recharge-cash').length || 0 != $('.my-order').length || 0 != $('.order-history').length) {
		$('.tab-change').on('click', '>li', function () {
			var index = $(this).index(),
				$p = $(this).parent(),
				_sign = $p.attr('data-sign'),
				$log_tables = $('.other-tables>.log-table').eq(index);
			if (!$(this).hasClass('on')) {
				$(this).addClass('on').siblings().removeClass('on');
				if ('currency' == _sign) {
					$log_tables.addClass('show').siblings().removeClass('show');
					$log_tables.find('.tab-logs>li').eq(0).addClass('on').siblings().removeClass('on');
					$log_tables.find('.table-log').eq(0).removeClass('hide').siblings('.table-log').addClass('hide');
					if (1 == index) {
						tobj.getCoinRechargeList();
						//tobj.getCoinCashList();
					} else {
						tobj.getCnyRechargeList();
						//tobj.getCnyCashList();
					}
				} else if ('order' == _sign) {
					$('.other-tables>.table-order').eq(index).addClass('show').siblings().removeClass('show');
					if (tobj.getMarketId()) {
						tobj.pageObj.page = 1;
						tobj.getOrders();
						/*if('限价挂单'==$('.tab-change>li.on').text()){
						   tobj.getOrderList();
						}else{
						   tobj.getOrderList(2);
						}*/
					}
				} else if ('bail' == _sign) {} else if ('history' == _sign) {
					$('.order-1th>tbody>.actionArrow').removeClass('show');
					$('.order-2th>tbody>.actionArrow').removeClass('show');
					$('.other-tables>.table-order').eq(index).addClass('show').siblings().removeClass('show');
					if (tobj.getMarketId()) {
						tobj.pageObj.page = 1;
						tobj.getHistoryOrders();
					}
				}
			}
		});
	}
	// if( ){
	//    $('.tab-change').on('click','>li',function(){
	//       var index = $(this).index(),
	//          $p = $(this).parent(),
	//          _sign = $p.attr('data-sign'),
	//          $log_tables = $('.other-tables>.log-table').eq(index);

	//       if(!$(this).hasClass('on')){
	//          $(this).addClass('on').siblings().removeClass('on');
	//          if('currency'==_sign){
	//             $log_tables.addClass('show').siblings().removeClass('show');
	//             $log_tables.find('.tab-logs>li').eq(0).addClass('on').siblings().removeClass('on');
	//             $log_tables.find('.table-log').eq(0).removeClass('hide').siblings('.table-log').addClass('hide');
	//             if(1==index){
	//                // tobj.getCoinRechargeList();
	//             }else{
	//                // tobj.getCnyRechargeList();
	//             }
	//          }else if('order'==_sign){
	//             $('.other-tables>.table-order').eq(index).addClass('show').siblings().removeClass('show');
	//             if(tobj.getMarketId()){
	//                // tobj.getOrders();
	//             }
	//          }else if('bail'==_sign){
	//          }
	//       }
	//    });
	// $('.check').on('mouseover',function() {
	//    $('.dir-tip').css('display','table');
	// }); 
	// $('.check').on('mouseout',function() {
	//    $('.dir-tip').css('display','none');
	// });
	// }
	if (0 != $('.login-form').length) {
		// 密码强度
		$('#newPwd').on('focus', function (e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();

			var $warn = $('.box-warn');
			if (!$warn.hasClass('show')) {
				$('.box-warn').addClass('show');
			}
		});
		$('#newPwd').on('blur', function (e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation(),
				val = $(this).val().trim(),
				flag = true;

			var $warn = $('.box-warn'),
				$li = $('.box-warn>ul>li'),
				lv = obj.pwdValidate($(this).val());
			for (var i = 0; i < lv; i++) {
				$li.eq(i).addClass('active');
			}
			if (lv > 1) {
				$warn.removeClass('show');
			}
			if (0 == val.length) {
				flag = false;
			}
		});
		$('#newPwd').on('input', function (e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();

			var $warn = $('.box-warn'),
				$li = $('.box-warn>ul>li'),
				lv = obj.pwdValidate($(this).val());

			for (var i = 0; i < lv; i++) {
				$li.eq(i).addClass('active');
			}
		});
	}

	var tobj = {
		timer: null,
		cancelObj: {},
		userId: '',
		pageObj: {
			page: 1,
			pageSize: 20
		},
		marketId: 'mbtc',
		imgs: [],
		icoImages: [],
		flag: Object.keys(obj.getParam()),
		beforeScrollTop: 0,
		logList: [],
		cfnObj: null,
		marketList: [],
		ip_id: '',
		ipList: [],
		phone: '',
		that: null,
		pass: false,
		exchange: {
			mbtc: 0,
			eth: 0
		},
		pathname: location.pathname.toLowerCase(),
		simpleData: [],
		window: $(window),
		realCertification: false,
		// 获取订单列表
		getOrderList: function (type) {
			var url = '/order/GetOrderList',
				data = {
					marketId: tobj.marketId,
					orderType: 0,
					status: 1,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				};

			if (2 == type) {
				url = '/order/GetPlanOrderList';
			}
			if (!data.marketId) {
				delete data.marketId;
			}
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var list = [],
						html = '',
						selector = '.order-1th',
						sel = 'red',
						buz = $.t('buy'),
						index = 0;
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 == list.length) {
							$('.isNull').addClass('show');
							html = '<tr><td colspan="7" text-align:center;">' + $.t('no_data') + '</td></tr>';
						} else {
							$('.isNull').removeClass('show');
						}
						if (0 == list.length || 10 >= list.length) {
							obj.resizeHeight();
							$(window).on('resize', function () {
								obj.resizeHeight();
							});
						} else {
							$(window).unbind('resize');
						}
						if (2 == type) {
							selector = '.order-2th';
							index = 1;
							for (var i = 0; i < list.length; i++) {
								var txtArr = [$.t('high'), $.t('hunt')];
								var time = obj.dateFormate(list[i].CreateTime),
									market = (list[i].MarketId).toUpperCase().split('_');
								/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
								var date = new Date(time);*/
								if (2 == list[i].OrderType) {
									sel = 'green';
									buz = $.t('sell');
									txtArr = [$.t('s_profit'), $.t('s_loss')];
								} else {
									sel = 'red';
									buz = $.t('buy');
								}
								html += '<tr class="' + sel + '">\
                              <td>' + time + '</td>\
                              <td><span>' + market[0] + '</span>/<span>' + market[1] + '</span></td>\
                              <td>' + buz + '</td>\
                              <td><span>' + obj.scienceToNum(list[i].Amount, 8) + '</span>(<span>' + market[1] + '</span>)</td>\
                              <td>\
                                 <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(list[i].HighTriggerPrice, 8) + '</span></label>\
                                 <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(list[i].LowTriggerPrice, 8) + '</span>(<span>' + market[0] + '</span>)</label>\
                              </td>\
                              <td>\
                                 <label>' + txtArr[0] + '：<span>' + obj.scienceToNum(list[i].HighPrice, 8) + '</span></label>\
                                 <label>' + txtArr[1] + '：<span>' + obj.scienceToNum(list[i].LowPrice, 8) + '</span>(<span>' + market[0] + '</span>)</label>\
                              </td>\
                              <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="2" data-order="' + list[i].OrderType + '">' + $.t("revocation") + '</a></td>\
                           </tr>';

								/*'<tr class="'+sel+'">\
								      <td>'+date.format("MM-dd hh:mm:ss")+'</td>\
								      <td>'+buz+'</td>\
								      <td>'+list[i].Amount+'（'+(list[i].CurrencyId).toUpperCase()+'）'+'</td>\
								      <td>\
								         <label>'+txtArr[0]+'：<span>'+list[i].HighTriggerPrice+'</span></label>\
								         <label>'+txtArr[1]+'：<span>'+list[i].LowTriggerPrice+'</span></label>\
								      </td>\
								      <td>\
								         <label>'+txtArr[0]+'：<span>'+list[i].HighPrice+'</span></label>\
								         <label>'+txtArr[1]+'：<span>'+list[i].LowPrice+'</span></label>\
								      </td>\
								      <td><a href="javascript:;" data-id="'+list[i].Id+'" data-type="2" data-order="'+list[i].OrderType+'">撤销</a></td>\
								   </tr>';*/
							}
						} else {
							for (var i = 0; i < list.length; i++) {
								var time = obj.dateFormate(list[i].CreateTime),
									market = (list[i].MarketId).toUpperCase().split('_');
								/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')))*/
								;
								var date = new Date(time);
								if (2 == list[i].OrderType) {
									sel = 'green';
									buz = $.t('sell');
								} else {
									sel = 'red';
									buz = $.t('buy');
								}
								html += '<tr class="' + sel + '">\
                              <td>' + time + '</td>\
                              <td><span>' + market[0] + '</span>/<span>' + market[1] + '</span></td>\
                              <td>' + buz + '</td>\
                              <td><span>' + list[i].Volume + '</span>/<span>' + list[i].TxVolume + '</span>(<span>' + market[1] + '</span>)</td>\
                              <td><span>' + list[i].Price + '</span>(<span>' + market[0] + '</span>)</td>\
                              <td><span>' + list[i].TxAmount + '</span>(<span>' + market[0] + '</span>)</td>\
                              <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="1" data-order="' + list[i].OrderType + '">' + $.t("revocation") + '</a></td>\
                           </tr>';
							}
						}
						$(selector).find('tbody').html(html);
						tobj.table = $('.order-table').eq(index);
						$('.tab-change>li').eq(index).addClass('on').siblings().removeClass('on');
						$('.other-tables>.table-order').eq(index).addClass('show').siblings().removeClass('show');

						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getOrders();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
					}
				}
			});
		},
		// 获取历史订单列表
		getOrderHistoryList: function (type) {
			var url = '/order/GetOrderList',
				data = {
					marketId: tobj.marketId,
					status: 0,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				};

			if (2 == type) {
				url = '/order/GetPlanOrderList';
			}
			// if(!data.marketId){
			//    delete data.marketId;
			// }
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var list = [],
						html = '',
						selector = '.order-1th',
						sel = 'red',
						buz = $.t('buy'),
						index = 0;
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 == list.length) {
							$('.isNull').addClass('show');
							html = '<tr><td colspan="9" text-align:center;">' + $.t('no_data') + '</td></tr>';
							if (2 == type) {
								html = '<tr><td colspan="8" text-align:center;">' + $.t('no_data') + '</td></tr>';
							}
						} else {
							$('.isNull').removeClass('show');
						}
						if (0 == list.length || 10 >= list.length) {
							obj.resizeHeight();
							$(window).on('resize', function () {
								obj.resizeHeight();
							});
						} else {
							$(window).unbind('resize');
						}
						if (2 == type) {
							selector = '.order-2th';
							index = 1;
							for (var i = 0; i < list.length; i++) {
								var txtArr = [$.t('high'), $.t('hunt')];
								var time = obj.dateFormate(list[i].CreateTime),
									market = (list[i].MarketId).toUpperCase().split('_');
								/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
								var date = new Date(time);*/
								if (2 == list[i].OrderType) {
									sel = 'green1';
									buz = $.t('sell');
									txtArr = [$.t('s_profit'), $.t('s_loss')];
								} else {
									sel = 'red1';
									buz = $.t('buy');
									list[i].TxVolume = list[i].TxAmount;
								}
								if (1 == list[i].Status) {
									// if(list[i].Price>0){
									//    if(1==list[i].OrderType){
									//       if(list[i].Price==list[i].HighPrice){
									//          list[i].status=$.t('high_trigger');
									//       }else{
									//          list[i].Status=$.t('bottom_trigger');
									//       }
									//    }else if(2==list[i].OrderType){
									//       if(list[i].Price==list[i].HighPrice){
									//          list[i].status=$.t('check_trigger');
									//       }else{
									//          list[i].Status=$.t('stop_trigger');
									//       }
									//    }
									// }
									list[i].Status = $.t('not_trigger');
								} else if (2 == list[i].Status) {
									list[i].Status = $.t('triggered');
								} else if (3 == list[i].Status) {
									list[i].Status = $.t('canceled');
								}
								html += '<tr class="' + sel + ' operate-capital' + '" data-id="' + list[i].Id + '" data-type="' + list[i].OrderType + '" data-sign="' + list[i].MarketId + '">\
                           <td>' + time + '</td>\
                           <td><span>' + market[0] + '</span>/<span>' + market[1] + '</span></td>\
                           <td>' + buz + '</td>\
                           <td><span>' + obj.scienceToNum(list[i].Amount, 8) + '</span>(<span>' + market[1] + '</span>)</td>\
                           <td><span>' + txtArr[0] + '：' + obj.scienceToNum(list[i].HighPrice, 8) + '</span>(<span>' + market[0] + '</span>)<br><span>' + txtArr[1] + '：' + obj.scienceToNum(list[i].LowPrice, 8) + '<span>(<span>' + market[0] + '</span>)</td>\
                           <td><span>' + txtArr[0] + '：' + obj.scienceToNum(list[i].HighTriggerPrice, 8) + '</span>(<span>' + market[0] + '</span>)<br><span>' + txtArr[1] + '：' + obj.scienceToNum(list[i].LowTriggerPrice, 8) + '<span>(<span>' + market[0] + '</span>)</td>\
                           <td>' + list[i].Status + '</td>\
                           <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="2" data-order="' + list[i].OrderType + '">' + $.t('check') + '</a></td>\
                        </tr>';
								// <td><span>'+obj.scienceToNum(list[i].TxAmount,8)+'</span>(<span>'+market[0]+'</span>)</td>\
								/*'<tr class="'+sel+'">\
								      <td>'+date.format("MM-dd hh:mm:ss")+'</td>\
								      <td>'+buz+'</td>\
								      <td>'+list[i].Amount+'（'+(list[i].CurrencyId).toUpperCase()+'）'+'</td>\
								      <td>\
								         <label>'+txtArr[0]+'：<span>'+list[i].HighTriggerPrice+'</span></label>\
								         <label>'+txtArr[1]+'：<span>'+list[i].LowTriggerPrice+'</span></label>\
								      </td>\
								      <td>\
								         <label>'+txtArr[0]+'：<span>'+list[i].HighPrice+'</span></label>\
								         <label>'+txtArr[1]+'：<span>'+list[i].LowPrice+'</span></label>\
								      </td>\
								      <td><a href="javascript:;" data-id="'+list[i].Id+'" data-type="2" data-order="'+list[i].OrderType+'">撤销</a></td>\
								   </tr>';*/
							}
						} else {
							for (var i = 0; i < list.length; i++) {
								var time = obj.dateFormate(list[i].CreateTime),
									market = (list[i].MarketId).toUpperCase().split('_');
								/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
								var date = new Date(time);*/
								if (2 == list[i].OrderType) {
									sel = 'green';
									buz = $.t('sell');
								} else {
									sel = 'red';
									buz = $.t('buy');
								}
								if (1 == list[i].Status) {
									if (0 < list[i].TxVolume) {
										list[i].Status = $.t('clinch');
									} else {
										list[i].Status = $.t('unsettled');
									}
								} else if (2 == list[i].Status) {
									list[i].Status = $.t('traded');
								} else if (3 == list[i].Status) {
									list[i].Status = $.t('canceled');
								}
								html += '<tr class="' + sel + ' operate-capital' + '" data-id="' + list[i].Id + '" data-type="' + list[i].OrderType + '" data-sign="' + list[i].MarketId + '">\
                              <td>' + time + '</td>\
                              <td><span>' + market[0] + '</span>/<span>' + market[1] + '</span></td>\
                              <td>' + buz + '</td>\
                              <td><span>' + obj.scienceToNum(list[i].Volume, 8) + '</span>/<span>' + obj.scienceToNum(list[i].TxVolume, 8) + '</span>(<span>' + market[1] + '</span>)</td>\
                              <td><span>' + obj.scienceToNum(list[i].Price, 8) + '</span>(<span>' + market[0] + '</span>)</td>\
                              <td><span>' + obj.getFloatValue(obj.scienceToNum(list[i].TxAmount / (list[i].TxVolume || 1), 8), 8) + '</span>(<span>' + market[0] + '</span>)</td>\
                              <td class="txt-right"><span>' + obj.scienceToNum(list[i].TxAmount, 8) + '</span>(<span>' + market[0] + '</span>)</td>\
                              <td>' + list[i].Status + '</td>\
                              <td><a href="javascript:;" data-id="' + list[i].Id + '" data-type="1" data-order="' + list[i].OrderType + '">' + $.t('check') + '</a></td>\
                           </tr>';
							}
						}
						$('.table-order>tbody>tr').each(function () {
							var _name = $(this).prop("className");
							if (_name != 'actionArrow') {
								$(this).remove();
							}
						});
						$(selector + '>tbody>.actionArrow').before(html);
						tobj.table = $('.order-table').eq(index);
						$('.tab-change>li').eq(index).addClass('on').siblings().removeClass('on');
						$('.other-tables>.table-order').eq(index).addClass('show').siblings().removeClass('show');

						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								$('.order-1th>tbody>.actionArrow').removeClass('show');
								$('.order-2th>tbody>.actionArrow').removeClass('show');
								tobj.getHistoryOrders();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
					}
				}
			});
		},
		//获取订单的交易列表
		getTradeOrder: function (marketId, orderType, orderId) {
			obj.ajaxFn('/trade/GetTradeList', {
				data: {
					marketId: marketId,
					orderId: orderId,
					orderType: orderType,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 == list.length) {
							// $('.isNull').addClass('show');
							html = '<tr><td colspan="3" text-align:center;">' + $.t("no_data") + '</td></tr>';
						} else {
							// $('.isNull').removeClass('show');
						}
						if (0 == list.length || 10 >= list.length) {
							obj.resizeHeight();
							$(window).on('resize', function () {
								obj.resizeHeight();
							});
						} else {
							$(window).unbind('resize');
						}
						for (var i = 0; i < list.length; i++) {
							var time = obj.dateFormate(list[i].CreateTime);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							var date = new Date(time);*/
							html += '<tr>\
                              <td>' + time + '</td>\
                              <td>' + list[i].Price + '</td>\
                              <td>' + list[i].Volume + '</td>\
                              </tr>';
						}
						$('.check-table').find('tbody').html(html);
						if (1 < res.Data.TotalPage) {
							$('.pagination-list1').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page('.pagination-list1', tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getTradeOrder(marketId, orderType, orderId);
							});
						} else {
							$('.pagination-list1').empty().addClass('hide');
						}
					} else {

					}
				}
			});
		},
		// 判断是否需要输入交易密码
		isNeedPwd: function (type) {
			obj.ajaxFn('/user/GetTradePasswordStatus', {
				callback: function (res) {
					var _sign = $('#to-addr').attr('data-sign'),
						msg = '';
					if (res.IsSuccess) {
						if (0 == res.Data) {
							obj.modShow('#mod-prompt');
							$('#mod-prompt .tips-txt').html('<span>' + $.t("account_set") + '</span><a href="./set-buzpwd.html">' + $.t("set_pwd") + '</a>');
						} else if (1 == res.Data) {
							if (1 == type) {
								obj.modShow('#mod-buz');
							} else if (2 == type) {
								obj.modShow('#mod-operate');
								$('#mod-operate .mod-title>span').html($.t('prompt'));
							}
						} else {
							if (1 == type) {
								tobj.cancelOrder();
							} else if (2 == type) {
								tobj.getOpenKeyList();
							}
						}
					} else {
						if (-9997 != res.Code) {
							msg = res.ErrorMsg + '，' + $.t('operate_fail');
						} else {
							msg = $.t("function") + '<a href="./login.html" target="_blank">' + $.t("login") + '</a>/<a href="./r.html" target="_blank">' + $.t("register") + '</a>';
						}
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').html(msg);
					}
				}
			});
		},
		// 分页
		page: function (sel, now, all, callback) {
			obj.page({
				_class: sel || '.pagination-list',
				nowNum: now,
				allNum: all,
				callback: callback
			});
		},
		getMarketId: function () {
			var pobj = obj.getParam(),
				marketObj = {};
			if (pobj.marketid) {
				marketObj = pobj.marketid.split('_');
				marketObj[0] = marketObj[0].toUpperCase();
				marketObj[1] = marketObj[1].toUpperCase();
				$('.dropdown-txt>span').text(marketObj[0]);
				$('.dropdown-list>li').each(function () {
					var that = $(this);
					if (marketObj[0] === that.find('span')) {
						that.addClass('on');
						return false;
					}
				});
				$('#market-search').val(marketObj[1]);
				$('#market-search2').val(marketObj[1]);
				$('.c-base').text(marketObj[0]);
				$('.c-base2').text('(' + marketObj[0] + ')');
				$('.c-target').text(marketObj[1]);
			}

			var st = $('.dropdown-txt>span').eq(0).text().toLowerCase(),
				ed = $('#market-search').val().trim().toLowerCase(),
				flag = false;
			if (0 != ed.length) {
				tobj.marketId = st + '_' + ed;
				//$('.my-order-link').prop('href','./trade-order.html?marketId='+tobj.marketId);
				$('.my-turnover-link').prop('href', './turnoverLog.html?marketid=' + tobj.marketId);
				flag = true;
			} else {
				tobj.marketId = '';
				flag = true;
			}
			return flag;
		},
		// 获取基币市场列表
		getBaseMarketList: function (id) {
			obj.ajaxFn('/market/GetListByBasic', {
				data: {
					basicId: id || tobj.marketId
				},
				callback: function (res) {
					var list = [];
					if (res.IsSuccess) {
						list = res.Data;
						tobj.marketList = list;
					}
				}
			});
		},
		// 获取基币市场列表
		getActiveList: function () {
			obj.ajaxFn('/market/GetActiveList', {
				callback: function (res) {
					var list = [];
					if (res.IsSuccess) {
						list = res.Data;
						tobj.marketList = list;
					}
				}
			});
		},
		// 展示市场列表
		getMarketList: function (that, filter) {
			var html = '',
				list = tobj.marketList;
			if (!list.length) {
				list = ["mbtc_etc", "mbtc_ae", "mbtc_fldc", "mbtc_vtc", "mbtc_eos", "mbtc_bts", "mbtc_eth", "mbtc_ardr"];
			}
			for (var i = 0; i < list.length; i++) {
				if (filter && list[i].indexOf(filter.toLowerCase()) == -1) {
					continue;
				}
				html += '<li><i class="icon2 icon-' + list[i].substr(list[i].indexOf('_') + 1) + '"></i><span class="search-txt">' + list[i].substr(list[i].indexOf('_') + 1).toUpperCase() + '</span></li>'; // (<span>New SaiBoCoin</span>)
			}
			that.next().html(html);
		},
		// 获取Otp密钥
		getOtpSecretKey: function () {
			obj.ajaxFn('/user/GetOtpSecretKey', {
				callback: function (res) {
					var count = 4;
					if (res.IsSuccess) {
						if (res.Data) {
							$('.secret-key').text(res.Data);
							$('.bind-feedback>span').text(res.Data);
							$('#qcode>canvas').remove();
							$('#qcode').qrcode({
								width: 170,
								height: 170,
								correctLevel: 0,
								text: 'otpauth://totp/' + ('XBrick-' + (obj.account || '')) + '?secret=' + res.Data
							});
						} else {
							obj.modShow('#mod-prompt2');
							// var timer = setInterval(function(){
							//    count--;
							//    if(0==count){
							//       clearInterval(timer);
							//       location.href = './tosafeset.html';
							//    }
							//    $('#mod-prompt2 .tips-txt .countdown').text(count);
							// },1000);
						}
					}
				}
			});
		},
		// 是否已绑定手机
		getAuthTypes: function () {
			obj.ajaxFn('/user/GetAuthType', {
				callback: function (res) {
					var $phone = $('#otp-captcha').parent();
					if (res.IsSuccess) {
						if ((res.Data & 2) != 0) {
							$phone.removeClass('hide');
						} else {
							$phone.addClass('hide');
						}
					}
				}
			});
		},
		// 绑定otp
		bindOtp: function (data, that) {
			obj.ajaxFn('/user/BindOtp', {
				data: {
					code: data.code,
					captcha: data.captcha
				},
				callback: function (res) {
					var count = 4;
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('goo_authenty');
						that.closest('.bind-form')[0].reset();
						// obj.modShow('#mod-prompt');
						obj.getAuthType({
							callback: function (res) {
								var $phone = $('#input-phone').parent(),
									$gug = $('#input-gug').parent(),
									local = window.location,
									wUrl = local.pathname.toLowerCase(),
									data = res.Data;
								if (res.IsSuccess) {
									obj.ajaxFn('/user/GetLoginInfo', {
										callback: function (res) {
											if (5 == data && 0 == res.Data.VerifyLevel) { // 邮箱+otp
												obj.modShow('#mod-prompt3');
												$('#mod-prompt3 .mod-body').html('<p>' + $.t('to_Auth') + '</p>');
											} else {
												obj.modShow('#mod-prompt2');
												$('#mod-prompt .tips-txt').text(msg);
												var timer = setInterval(function () {
													count--;
													if (0 == count) {
														clearInterval(timer);
														location.href = './tosafeset.html';
													}
													$('#mod-prompt2 .tips-txt .countdown').text(count);
												}, 1000);
												// $('#mod-prompt .tips-btn').html('<a href="./tosafeset.html">'+$.t('certain')+'</a>');
											}
										}
									});
								}
							}
						});
					} else {
						if (0 == res.Code) {
							msg = $.t('otp');
						} else if (201 == res.Code) {
							msg = $.t('verify_error');
						} else if (202 == res.Code) {
							msg = $.t('expired');
						} else if (401 == res.Code) {
							msg = $.t('otp_key');
						}
						obj.hideTips(msg, 'green');
					}

					that.prop('disabled', false).text($.t('sub'));
				},
				errorCallback: function (res) {
					that.prop('disabled', false).text($.t('sub'));
				}
			});
		},
		// 获取基本实名认证信息
		getCertification: function () {
			obj.ajaxFn('/user/GetCertification', {
				callback: function (res) {
					var data = null,
						result = '',
						cn = '',
						cookie = obj.getCookie('country'),
						status = 0,
						_t = '',
						_sel = '',
						sign = location.search.split('=')[1];
					if (res.IsSuccess) {
						if (!res.Data || 1 == sign || 2 == sign) {
							$('.area-list').closest('.form-group').removeClass('hide');
							tobj.getAllBankCardList();
							if (2 == sign) {
								$('.upload-box').removeClass('hide');
							}
							if (cookie) {
								cookie = cookie.split(';');
								if (('/torealname.html' == tobj.pathname) && 86 == cookie[0]) {
									location.href = "./torealnameinland.html";
								}
								$('.sel_area').html('<span data-val="' + cookie[0] + '">' + cookie[1] + '</span><i class="icon icon-down2"></i>');
								$('.dropdown-list>li').removeClass('on');
								$('.dropdown-list>li').each(function () {
									var that = $(this),
										_val = that.data('value'),
										_id = '';
									_id = _val.substr(_val.indexOf('+') + 1);
									if (cookie[0] == _id) {
										$(this).addClass('on');
										return false;
									}
								});
								$('.form-group').each(function () {
									var that = $(this);
									if (!that.hasClass('code-box')) {
										that.removeClass('hide');
									}
								});
								$('.upload-box').removeClass('hide');
								$('.realname-explain').removeClass('hide');
							}
							/*if('/torealname1.html'==tobj.pathname){
							   $('.dropdown-txt').html('<span data-val="86">中国China</span><i class="icon icon-down2"></i>');
							   $('.dropdown-list>li').each(function(){
							      $(this).removeClass('on');
							   });
							   $('.dropdown-list>li').eq(0).addClass('on');
							}*/
						} else {
							//tobj.cfnObj = res.Data;
							tobj.pass = true;
							data = res.Data.Data;
							data = JSON.parse(data.replace(/\'/g, '"'));
							if (86 != data.Country) {
								if ('/torealnameinland.html' == tobj.pathname) {
									location.href = "./torealname.html";
								}
							} else {
								if ('/torealname.html' == tobj.pathname) {
									location.href = "./torealnameinland.html";
								}
								// result = res.Data.VerifyLevel.Result;
							}
							if (res.Data && res.Data.Data) {
								data = res.Data.Data;
								status = res.Data.Status;
								data = JSON.parse(data.replace(/\'/g, '"'));

								if (86 == data.Country) {
									data.Birthday = data.Birthday.split('-');
								} else {
									data.LivingAddress = JSON.parse(data.LivingAddress.replace(/\'/g, '"'));
									data.Name = data.Name.split(' ');
								}
								if (1 == status) {
									status = $.t('under_review');
								} else if (2 == status) {
									status = $.t('name_pass');
								} else if (3 == status) {
									status = $.t('resubmit_info');
									$('.examine_status').css('background', 'rgba(255, 97, 97,.05)');
									$('.examine_status').css('color', 'rgb(255, 97, 97)');
									$('.rebegin').removeClass('hide');
								}
							}
							$('.sel_area').html('<span data-val="' + data.Country + '">' + data.CountryName + '</span><i class="icon icon-down2"></i>');
							$('.realname-explain>li').eq(3).addClass('hide');
							$('.optional').addClass('hide');
							$('.form-group').removeClass('hide');
							if ('/torealnameinland.html' == tobj.pathname) {
								$('.txt-tip.tips').addClass('hide');
								$('.txt-info.realname').addClass('hide');
								$('.txt-info.dropdown-box').addClass('hide');
								$('.txt-info.area').removeClass('hide');
								$('.txt-info.bank').removeClass('hide');
								$('.txt-info.name').removeClass('hide');
								$('.txt-info.area>input').prop('disabled', true).val(data.CountryName);
								$('.txt-info.bank>input').prop('disabled', true).val(data.Bank);
								$('.txt-info.name>input').prop('disabled', true).val(data.Name);
								// $('select[name=year]').val(data.Birthday[0]).prop('disabled',true);
								// $('select[name=month]').val(data.Birthday[1]).prop('disabled',true);
								// $('select[name=day]').val(data.Birthday[2]).prop('disabled',true);
								// $('#realname').prop('disabled',true).val(data.Name);
								$('#certificate-num').prop('disabled', true).val(data.CardNumber);
								$('#address').prop('disabled', true).val(data.LivingAddress);
								$('#postcode').prop('disabled', true).val(data.Postcode);
								$('#bank-num').prop('disabled', true).val(data.BankcardNumber);
								$('.dropdown-txt.sel_area>span').val()
								$('.form-group').eq(2).addClass('hide');
								$('.form-group').eq(3).addClass('hide');
								$('.form-group').eq(6).addClass('hide');
								$('.form-group').eq(8).addClass('hide');
								$('.upload-box').addClass('hide');
								$('.realname-explain').addClass('hide');
								$('.examine_status').removeClass('hide').text(status);
							} else if ('/torealname.html' == tobj.pathname) {
								$('.form-group').eq(1).addClass('hide');
								$('.txt-tip.tips').addClass('hide');
								$('.txt-info.dropdown-box').addClass('hide');
								$('.txt-info.birthday').addClass('hide');
								$('.txt-info.verify').removeClass('hide');
								$('.txt-info.address').removeClass('hide');
								// $('.txt-info.birth').removeClass('hide');
								$('.txt-info.verify>input').prop('disabled', true).val(data.CountryName);
								$('.txt-info.address>input').prop('disabled', true).val(data.LivingAddress.Country);
								// $('.txt-info.birth>input').prop('disabled',true).val(data.Birthday);
								$('#postcode').prop('disabled', true).val(data.Postcode);
								$('#surname').prop('disabled', true).val(data.Name[0]);
								$('#forename').prop('disabled', true).val(data.Name[3]);
								$('#state').prop('disabled', true).val(data.LivingAddress.State);
								$('#street').prop('disabled', true).val(data.LivingAddress.Street);
								$('#city').prop('disabled', true).val(data.LivingAddress.City);
								$('#buildingNum').prop('disabled', true).val(data.LivingAddress.BuildingNum);
								$('#apartmentNum').prop('disabled', true).val(data.LivingAddress.ApartmentNum);
								$('#version').prop('disabled', true).val(data.Version);
								$('#number').prop('disabled', true).val(data.CardNumber);
								$('#fund-num').prop('disabled', true).val(data.CardNumber);
								$('.upload-box').addClass('hide');
								$('.examine_status').removeClass('hide').text(status);
							}
							for (var i = 0; i < (res.Data.Images && res.Data.Images.length); i++) {
								// tobj.imgs.push({name: i,url: res.Data.Images[i]});
								tobj.imgs.push(res.Data.Images[i]);
								$('.upload-pic>li').eq(i).find('img').css({
									'scr': res.Data.Images[i]
								});
							}
							$('.dropdown-list>li').each(function () {
								var _val = $(this).find('span').text();
								if (data.Country == _val) {
									$(this).addClass('on');
									return false;
								}
							});
						}

					} else {
						//$('.form-group').addClass('hide');
						$('.form-group').eq(0).removeClass('hide');
						if (cookie) {
							cookie = cookie.split(';');
							if (('/torealname.html' == tobj.pathname) && 86 == cookie[0]) {
								location.href = "./torealnameinland.html";
							}
							$('.sel_area').html('<span data-val="' + cookie[0] + '">' + cookie[1] + '</span><i class="icon icon-down2"></i>');
							$('.dropdown-list>li').removeClass('on');
							// $('.dropdown-list>li').each(function(){
							//    var that = $(this),
							//       _val=that.data('value'),
							//       _id='';
							//    _id=_val.substr(_val.indexOf('+')+1);
							//    if(cookie[0]==_id){
							//       $(this).addClass('on');
							//       return false;
							//    }
							// });
							$('.form-group').each(function () {
								var that = $(this);
								if (!that.hasClass('code-box')) {
									that.removeClass('hide');
								}
							});
							// if (!tobj.phone) {
							// 	$($('.code-box')[0]).removeClass('hide');
							// }
							$('.upload-box').removeClass('hide');
							$('.realname-explain').removeClass('hide');
						}
					}
				}
			});
		},
		//年月日联动
		birthday: function () {
			var i = 1945;
			var date = new Date();
			var year = date.getFullYear(); //获取当前年份
			var dropList = "<option selected value='' data-i18n='year'></option>";;
			for (i; i < 2012; i++) {
				if (i == year) {
					dropList = dropList + "<option value='" + i + "'>" + i + "</option>";
				} else {
					dropList = dropList + "<option value='" + i + "'>" + i + "</option>";
				}
			}
			$('select[name=year]').html(dropList); //生成年份下拉菜单
			var monthly = "<option value='' selected data-i18n='month1'>月份</option>";;
			for (month = 1; month < 13; month++) {
				monthly = monthly + "<option value='" + month + "'>" + month + "</option>";
			}
			$('select[name=month]').html(monthly); //生成月份下拉菜单
			var dayly = "<option value='' selected data-i18n='day1'></option>";;
			for (day = 1; day <= 31; day++) {
				dayly = dayly + "<option value='" + day + "'>" + day + "</option>";
			}
			$('select[name=day]').html(dayly); //生成天数下拉菜单
			// var currentHour = "<option value='' selected data-i18n='hour'></option>";;
			// for(var hour = 1 ;i <= 24; i++){
			//    currentHour = currentHour + "<option value='"+i+"'>"+i+"</option>";
			// }
			// if(0 != $('select[name=hour]')){
			//    $('select[name=hour]').html(currentHour);//生成日期下拉菜单
			// }
			/*
			 * 处理每个月有多少天---联动
			 */
			$('select[name=month]').change(function () {
				var currentDay;
				var Flag = $('select[name=year]').val();
				var currentMonth = $('select[name=month]').val();
				switch (currentMonth) {
					case "1":
					case "3":
					case "5":
					case "7":
					case "8":
					case "10":
					case "12":
						total = 31;
						break;
					case "4":
					case "6":
					case "9":
					case "11":
						total = 30;
						break;
					case "2":
						if ((Flag % 4 == 0 && Flag % 100 != 0) || Flag % 400 == 0) {
							total = 29;
						} else {
							total = 28;
						}
					default:
						break;
				}
				for (day = 1; day <= total; day++) {
					currentDay = currentDay + "<option value='" + day + "'>" + day + "</option>";
				}
				$('select[name=day]').html(currentDay); //生成日期下拉菜单
			})
		},
		//ico页面的年月日
		icoBirthday: function () {
			var i = 2017;
			var date = new Date();
			var year = date.getFullYear(); //获取当前年份
			var dropList = "<option selected value='' data-i18n='year'></option>";;
			for (i; i < 2019; i++) {
				if (i == year) {
					dropList = dropList + "<option value='" + i + "'>" + i + "</option>";
				} else {
					dropList = dropList + "<option value='" + i + "'>" + i + "</option>";
				}
			}
			$('select[name=year]').html(dropList); //生成年份下拉菜单
			var monthly = "<option value='' selected data-i18n='month1'>月份</option>";;
			for (month = 1; month < 13; month++) {
				if (month < 10) {
					month = '0' + month;
				}
				monthly = monthly + "<option value='" + month + "'>" + month + "</option>";
			}
			$('select[name=month]').html(monthly); //生成月份下拉菜单
			var dayly = "<option value='' selected data-i18n='day1'></option>";;
			for (day = 1; day <= 31; day++) {
				if (day < 10) {
					day = '0' + day;
				}
				dayly = dayly + "<option value='" + day + "'>" + day + "</option>";
			}
			$('select[name=day]').html(dayly); //生成天数下拉菜单
			var currentHour = "<option value='' selected data-i18n='hour'></option>";;
			for (var i = 0; i < 24; i++) {
				if (i < 10) {
					i = '0' + i;
				}
				currentHour = currentHour + "<option value='" + i + "'>" + i + "</option>";
			}
			$('select[name=hour]').html(currentHour); //生成日期下拉菜单
			/*
			 * 处理每个月有多少天---联动
			 */
			// $('select[name=month]').change(function(){
			//    var currentDay;
			//    var Flag = $('select[name=year]').val();
			//    var currentMonth = $('select[name=month]').val();
			//    switch(currentMonth){
			//       case "01" :
			//       case "03" :
			//       case "05" :
			//       case "07" :
			//       case "08" :
			//       case "10" :
			//       case "12" :total = 31;break;
			//       case "04" :
			//       case "06" :
			//       case "09" :
			//       case "11" :total = 30;break;
			//       case "02" :
			//       if((Flag%4 == 0 && Flag%100 != 0) || Flag%400 == 0){
			//          total = 29;
			//       }else{
			//          total = 28;
			//       }
			//       default:break;
			//    }
			//    for(day=1;day <= total;day++){
			//       if(day<10){
			//          day = '0'+day;
			//       }
			//       currentDay = currentDay + "<option value='"+day+"'>"+day+"</option>";
			//    } 
			//    $('select[name=day]').html(currentDay);
			// })
		},
		// 实名认证申请/修改
		applyCertification: function (data, that, type) {
			/*var url = '/user/ApplyCertification',flag = true;
			if(tobj.cfnObj){
			   if(Object.keys(tobj.cfnObj)){
			      if('AuditFail'==tobj.cfnObj.Status || 'AuditSucess'==tobj.cfnObj.Status){
			         flag = false;
			         if('IdCard'==tobj.cfnObj.Type || 'Passport'==tobj.cfnObj.Type){
			            if(data.images.length)
			            flag = true;
			         }
			      }
			   }
			}
			if(flag){
			   obj.ajaxFn(url,{
			      data: data,
			      callback: function(res){
			         var msg = '',btn = '',
			            $form = that.closest('form');
			         if(res.IsSuccess){
			            if(0!=tobj.flag){
			            }else{
			               msg = '<span class="txt">'+$.t("infor_success")+'</span><span class="txt notice">'+$.t("someday")+'</span>';
			               if(2==type){
			                  msg='<span class="txt">'+$.t("infor_success")+'</span>\
			                     <span class="txt">'+$.t("manual")+'</span>\
			                     <span class="txt notice">'+$.t("improve")+'</span>';
			                  btn = '<a href="./user-info.html" class="btn btn-default">'+$.t("certain")+'</a>';
			                  
			               }
			            }
			         }else{
			            if(205==res.Code){
			               msg = $.t('duplicate');
			            }else{
			               msg = '<span class="txt">'+$.t("sorry")+'</span><span class="txt">'+$.t("re_submit")+'</span>';
			            }
			         }
			         that.prop('disabled',false);
			         obj.modShow('#mod-prompt');
			         $('#mod-prompt .tips-txt').html(msg);
			         $('#mod-prompt .tips-btn').html(btn);
			      },
			      errorCallback: function(error){
			         var msg = $.t('ren_fail'),btn = '<button type="button" class="btn btn-default" data-action="close">'+$.t("certain")+'</button>';
			         that.prop('disabled',false);
			         obj.modShow('#mod-prompt');
			         $('#mod-prompt .tips-txt').html(msg);
			         $('#mod-prompt .tips-btn').html(btn);
			      }
			   });
			}else{
			   that.prop('disabled',false);
			   obj.modShow('#mod-prompt');
			   $('#mod-prompt .tips-txt').html($.t('upload'));
			   $('#mod-prompt .tips-btn').html('<button type="button" class="btn btn-default" data-action="close">'+$.t('certain')+'</button>');
			}*/
		},
		// 获取当前用户交易密码类型
		getTradePwdType: function (type) {
			obj.ajaxFn('/user/GetTradePasswordType', {
				callback: function (res) {
					if (res.IsSuccess) {
						if (0 == type) {
							if (1 == res.Data) {
								$('.radio-txt').text($.t('no_set'));
								$('.operate-set').html('<a href="./set-buzpwd.html">' + $.t('set') + '</a>');
								/*obj.modShow('#mod-prompt');
								$('#mod-prompt .tips-txt').html($.t('not_set_pwd'));
								$('#mod-prompt .tips-btn').html('<a href="./set-buzpwd.html" class="btn btn-default">'+$.t('certain')+'</a>');*/
							} else if (3 == res.Data) {

							}
							$('.operate-radio>li').each(function () {
								var $btn = $(this).find('button'),
									_val = parseInt($btn.attr('data-val'));
								if (res.Data == _val) {
									$btn.prop('disabled', true).text($.t('current_settings'));
									$('.radio-txt').text('"' + $btn.prev().text() + '"');
								} else {
									$btn.prop('disabled', false).text($.t('select_option'));
								}
							});
						} else if (1 == type) {
							var _buz = '#set-buzPwd',
								btd = _buz + '>td:nth-child(2)',
								ba = _buz + ' .opearate-btn>a';
							if (1 == res.Data) {
								$(_buz).addClass('red').removeClass('green');
								$(btd).text($.t('no_set'));
								$(ba).eq(0).removeClass('hide').next().addClass('hide');
							} else {
								$(_buz).addClass('green').removeClass('red');
								$(btd).text($.t('h_set'));
								$(ba).eq(0).addClass('hide').next().removeClass('hide');
							}
						} else if (2 == type) {
							if (1 == res.Data) {
								location.href = './set-buzpwd.html';
							}
						}
						/*else if(3==type){
						                     if(1==res.Data){
						                        obj.modShow('#mod-prompt');
						                        $('#mod-prompt .tips-txt').html($.t('not_set_pwd'));
						                        $('#mod-prompt .tips-btn').html('<a href="./set-buzpwd.html" class="btn btn-default">'+$.t('certain')+'</a>');
						                     }
						                  }*/
					}
				}
			});
		},
		// 设置当前用户交易密码类型
		setTradePwdType: function (that, data, type) {
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
						if (type) {
							$modify.addClass('hide');
							$btn.removeClass('hide');
							$error.addClass('hide');
							$closeBuz.addClass('hide');
							tip.addClass('hide');
							tip2.removeClass('hide');
						} else {
							$('.radio-txt').text('"' + that.prev().text() + '"');
							that.closest('.operate-radio').find('button:disabled').prop('disabled', false);
							$('.operate-radio button').text($.t('select_option'));
							that.prop('disabled', true).text($.t('current_settings'));
						}
						obj.modHide('#mod-setTradeType');
						obj.hideTips($.t('tran_veri') + $.t('modify_success'));
					} else {
						if (type) {
							tip.removeClass('hide');
							tip2.addClass('hide');
							if (133 == res.Code) {
								msg = $.t('trade_error');
								$error.html(msg).removeClass('hide');
							}
						} else {
							if (133 == res.Code) {
								msg = $.t('trade_error');
							}
							tobj.getTips($('#trade-pwd'), msg);
							/*obj.modShow('#mod-prompt');
							$('#mod-prompt .tips-txt').html(msg);*/
						}
					}
					if (type) {
						$modify.prop('disabled', false);
					}
				}
			});
		},
		// 获取用户配置信息
		getUserCofig: function () {
			obj.ajaxFn('/user/GetUserConfigList', {
				callback: function (res) {
					var list = [],
						$box = $('.set-notice>li').find('.slide-box');
					if (res.IsSuccess) {
						list = res.Data;
						for (var i = 0; i < list.length; i++) {
							if (i == 4) {
								$('.pass-status').eq(0).empty();
								if ('ON' == list[i].Value) {
									$('.login-status').removeClass('off');
									$('.pass-status').eq(0).append('<span>"' + $.t('login_pwd') + '+' + $.t('verification2') + '"</span>');
								} else {
									$('.pass-status').eq(0).append('<span>' + $.t('login_pwd') + '</span>');
									$('.login-status').addClass('off');
								}
								break;
							}
							btnStatus(i);
							/*if('LoginEmailNotice'==list[i].Key){
							   btnStatus(i,0);
							}else if('DistanceLoginNotice'==list[i].Key){
							   btnStatus(i,1);
							}else if('TopUpNotice'==list[i].Key){
							   btnStatus(i,2);
							}else if('WithrawalNotice'==list[i].Key){
							   btnStatus(i,3);
							}else if('NeedSecondaryAuth'==list[i].Key){
							   btnStatus(i,4);
							}*/
							function btnStatus(index) {
								if ('ON' == list[index].Value) {
									$box.eq(index).removeClass('off');
								} else {
									$box.eq(index).addClass('off');
								}
							}
						}
					}
				}
			});
		},
		// 设置用户配置信息
		setUserInfo: function (data, type) {

			obj.ajaxFn('/user/SetUserConfig', {
				data: data,
				callback: function (res) {
					var msg = '设置成功！',
						sel = '';
					if (res.IsSuccess) {
						if (data.key == 'LoginEmailNotice' && data.value == 'ON') {
							msg = $.t('email_noti') + $.t('opened');
						} else if (data.key == 'LoginEmailNotice' && data.value == 'OFF') {
							msg = $.t('email_noti') + $.t('closed');
							sel = 'green';
						} else if (data.key == 'DistanceLoginNotice' && data.value == 'ON') {
							msg = $.t('top_up') + $.t('opened');
						} else if (data.key == 'DistanceLoginNotice' && data.value == 'OFF') {
							msg = $.t('top_up') + $.t('closed');
							sel = 'green';
						} else if (data.key == 'TopUpNotice' && data.value == 'ON') {
							msg = $.t('place_notice') + $.t('opened');
						} else if (data.key == 'TopUpNotice' && data.value == 'OFF') {
							msg = $.t('place_notice') + $.t('closed');
							sel = 'green';
						} else if (data.key == 'WithrawalNotice' && data.value == 'ON') {
							msg = $.t('cash_noti') + $.t('opened');
						} else if (data.key == 'WithrawalNotice' && data.value == 'OFF') {
							msg = $.t('cash_noti') + $.t('closed');
							sel = 'green';
						} else if (data.key == 'NeedSecondaryAuth' && data.value == 'ON') {
							msg = $.t('authenty') + $.t('opened');
							$('.pass-status').eq(0).empty();
							$('.pass-status').eq(0).append('<span>"' + $.t('login_pwd') + '+' + $.t('pho_verify2') + ' ' + $.t('or') + ' ' + $.t('verification2') + '"</span>');
						} else if (data.key == 'NeedSecondaryAuth' && data.value == 'OFF') {
							msg = $.t('authenty') + $.t('closed');
							$('.pass-status').eq(0).empty();
							$('.pass-status').eq(0).append('<span>"' + $.t('login_pwd') + '"</span>');
							sel = 'green';
						}
						if (type == 'limit') {
							msg = $.t('price_set') + $.t('success');
						} else if (type == 6 && data.value.indexOf('ON') != -1) {
							msg = $.t('price_set') + $.t('opened');
						} else if (type == 6 && data.value.indexOf('OFF') != -1) {
							msg = $.t('price_set') + $.t('closed');
							sel = 'green';
						}
					} else {
						msg = $.t('setup');
						sel = 'green';
						// obj.modShow('#mod-prompt');
						// $('#mod-prompt .tips-txt').text(msg);
					}
					obj.hideTips(msg, sel);
				}
			});
		},
		// 解除谷歌绑定
		unbindOtp: function (data, flag) {
			var url = '/user/UnbindOtpByOtp';
			if (flag) {
				url = '/user/UnbindOtpByPhone';
			}
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var msg = '',
						that;
					if (res.IsSuccess) {
						msg = $.t('captcha');
						tobj.bindFn('gug', true);
						tobj.showOpearate(['gug']);
						obj.hideTips(msg);
						obj.modHide('#mod-gug');
						if (!flag) {
							obj.ajaxFn('/user/GetAuthType', {
								callback: function (res) {
									if (res.IsSuccess) {
										if (1 == res.Data) {
											window.location.href = './bind-validate.html';
										}
									}
								}
							});
						}
					} else {
						if (201 == res.Code) {
							msg = $.t('otp');
							if (flag) {
								msg = $.t('verify_error');
							}
						} else if (202 == res.Code) {
							msg = $.t('expired');
						} else if (0 == res.Code) {
							msg = $.t('otp');
							if (flag) {
								msg = $.t('verify_error');
							}
						}
						if (flag) {
							that = $('#mod-gug #input-phone');
							$('#input-phone').focus();
						} else {
							that = $('#mod-gug #input-gug');
							$('#input-gug').focus();
						}
						tobj.getTips(that, msg);
					}
					/*obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').text(msg);*/
				}
			});
		},
		// 解绑手机/邮箱
		unbindOther: function (data, flag) {
			var url = '/user/UnBindPhone';
			if (flag) {
				url = '/user/UnBindEmail';
			}
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var msg = '',
						sel = 'phone',
						that;
					if (res.IsSuccess) {
						msg = $.t('timeframe');
						if (flag) {
							sel = 'email';
						}
						tobj.bindFn(sel, true);
						tobj.showOpearate([sel]);
						obj.hideTips(msg);
						if (flag) {
							obj.modHide('#mod-email');
						} else {
							obj.modHide('#mod-phone');
						}
					} else {
						if (201 == res.Code) {
							msg = $.t('verify_error');
							if (flag) {
								msg = $.t('email_error');
							}
						} else if (202 == res.Code) {
							msg = $.t('expired');
						} else if (209 == res.Code) {
							msg = $.t('solution');
						}
						if (flag) {
							that = $('#mod-email #input-phone');
						} else {
							that = $('#mod-phone #input-phone');
						}
						tobj.getTips(that, msg);
					}
					/*obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').text(msg);*/
				}
			});
		},
		// 获取用户绑定认证类型
		getAuthType: function (type) {
			obj.getAuthType({
				callback: function (res) {
					if (res.IsSuccess) {
						var $phone = $('#input-phone').parent(),
							$gug = $('#input-gug').parent(),
							_phone = $('#input-phone').parent().parent(),
							_gug = $('#input-gug').parent().parent(),
							phone = $('.input-phone').parent(),
							gug = $('.input-gug').parent();
						if (1 == type) {
							if (0 == res.Data) { // 未绑定
								tobj.bindFn('phone', true);
								tobj.bindFn('email', true);
								tobj.bindFn('gug', true);
							} else if (1 == res.Data) { // 绑定邮箱
								tobj.bindFn('email');
								//$('#email>td:nth-child(4)>a').addClass('hide');
							} else if (2 == res.Data) { // 绑定手机
								tobj.bindFn('phone');
								tobj.showOpearate(['phone']);
							} else if (3 == res.Data) { // 邮箱+手机
								tobj.bindFn('email');
								tobj.bindFn('phone');
								tobj.showOpearate(['phone', 'email']);
							} else if (4 == res.Data) { // 绑定otp
								tobj.bindFn('gug');
								tobj.showOpearate(['gug']);
							} else if (5 == res.Data) { // 邮箱+otp
								tobj.bindFn('email');
								tobj.bindFn('gug');
								tobj.showOpearate(['email', 'gug']);
							} else if (6 == res.Data) { // 手机+otp
								tobj.bindFn('phone');
								tobj.bindFn('gug');
								tobj.showOpearate(['phone', 'gug']);
							} else if (7 == res.Data) { // 邮箱+手机+otp
								tobj.bindFn('phone');
								tobj.bindFn('email');
								tobj.bindFn('gug');
								tobj.showOpearate(['phone', 'email', 'gug']);
							}
							if (2 == res.Data || 3 == res.Data) {
								$phone.addClass('on').removeClass('hide');
								_phone.addClass('on').removeClass('hide');
								phone.addClass('on').removeClass('hide');
							} else if (4 == res.Data || 5 == res.Data) {
								$gug.addClass('on').removeClass('hide');
								_gug.addClass('on').removeClass('hide');
								gug.addClass('on').removeClass('hide');
							} else if (6 == res.Data || 7 == res.Data) {
								$gug.addClass('on').removeClass('hide').find('.code-tab').removeClass('hide');
								$phone.find('.code-tab').removeClass('hide')
								_gug.addClass('on').removeClass('hide').find('.code-tab').removeClass('hide');
								_phone.find('.code-tab').removeClass('hide')
								gug.addClass('on').removeClass('hide').find('.code-tab').removeClass('hide');
								phone.find('.code-tab').removeClass('hide')
							}
						}
					}
				}
			});
		},
		// 判断用户是否为手机注册
		isPhoneRegistered: function () {
			obj.ajaxFn('/user/IsPhoneRegistered', {
				callback: function (res) {
					if (res.IsSuccess) {
						var $pspan = $('#set-phone .opearate-btn>span'),
							$espan = $('#set-email .opearate-btn>span');
						if (!res.Data) {
							$pspan.text($.t('unbound')).attr('data-bind', 'phone');
							$espan.text($.t('unable')).attr('data-bind', 'other');

						} else {
							$pspan.text($.t('unable')).attr('data-bind', 'other');
							$espan.text($.t('unbound')).attr('data-bind', 'email');
						}
					}
				}
			});
		},
		// 获取个人信息
		getUserInfo: function () {
			obj.ajaxFn('/user/GetLoginInfo', {
				callback: function (res) {
					var data = {},
						_realName = $('.real-name'),
						resultMsg = $.t("not_real") + '<a href="./torealname.html" class="green">（' + $.t("certification") + '）</a>',
						resultTips = '',
						safeCount = 0,
						lhtml = '',
						auth = $.t('auth'),
						lhref = 'javascript:;';
					if (res.IsSuccess) {
						data = res.Data;
						var /*time = data.LastLoginTime,*/ $li = $('.account-top>li'),
							tType = data.TradePasswordType,
							msg = '',
							bType = data.BindType;
						/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
						var date = new Date(time);*/
						tobj.userId = data.UserId;
						var num = data.PhoneNumber;
						if (num) {
							num = num.substr(num.indexOf('-') + 1);
						}

						$('.email-txt').text(data.Email || $.t('not_bound'));
						$('.phone-num').text(num || $.t('not_bound'));

						$('.nickname').text(data.NickName || $.t('anonym'));
						$('#nickname').val(data.NickName || '');
						if (data.RealName) {
							if (!!data.Status) {
								if (1 == data.Status) {
									resultMsg = data.RealName + '<span class="brown">（' + $.t('auditing') + '）</span>';
								} else if (2 == data.Status) {
									resultMsg = data.RealName + '<span class="red">（' + $.t("auth") + $.t('pass') + '）</span>';
								} else if (3 == data.Status) {
									resultMsg = data.RealName + '<a href="./torealname.html" class="green">（' + $.t("auth_fail") + '）</a>';
								}
							} else {
								resultMsg = data.RealName + '<span class="red">（C' + data.VerifyLevel + '）</span>';
							}
						}
						_realName.html(resultMsg);
						//$('.login-time').text(date.format("yyyy-MM-dd hh:mm:ss"));
						if (1 == tType) {
							msg = $.t('no_trade');
							$('.buz-pwd').text($.t('set'));
							$('.buz-pwd').prop('href', './set-buzpwd.html');
							if ('/api-keys.html' == tobj.pathname) {
								obj.modShow('#mod-prompt');
								$('#mod-prompt .tips-txt').html($.t('not_set_pwd'));
								$('#mod-prompt .tips-btn').html('<a href="./set-buzpwd.html" class="btn btn-default">' + $.t('certain') + '</a>');
								return false;
							}
						} else if (2 == tType) {
							// msg = $.t('each_login');
						} else if (3 == tType) {
							// msg = $.t('each_trade');
						} else if (4 == tType) {
							// msg = $.t('not_validate');
						}
						if (data.Country) {
							if (86 == data.Country) {
								$('.auth').prop('href', '');
							}
						}
						// if(1==tType){
						//    $('.buz-pwd').prop('href','./set-buzpwd.html');
						// }

						if (0 === bType) {
							showHide($li, 1, true);
							showHide($li, 2, true);
						}
						if (1 == bType || 5 == bType) {
							showHide($li, 2);
						} else if (2 == bType || 6 == bType) {
							showHide($li, 1);
						} else if (3 == bType || 7 == bType) {
							showHide($li, 1);
							showHide($li, 2);
						}
						if (86 != data.Country) {
							if (3 >= bType) {
								$('.safe-tip').text($.t('low')).addClass('green');
							} else if (3 < bType) {
								$('.safe-tip').text($.t('tall')).addClass('red');
							}
						} else {
							if (1 == bType || 2 == bType) {
								$('.safe-tip').text($.t('low')).addClass('green');
							} else if (3 == bType || 4 == bType || 5 == bType || 6 == bType) {
								$('.safe-tip').text($.t('centre')).addClass('brown');
							} else if (7 == bType) {
								$('.safe-tip').text($.t('tall')).addClass('red');
							}
						}
						if (4 == bType || 5 == bType || 6 == bType || 7 == bType) {
							safeCount++;
						}
						if (data.Email) {
							safeCount++;
						}
						if (data.PhoneNumber) {
							safeCount++;
						}
						if (data.IsPhoneRegistered) {
							showHide($li, 1);
							showHide($li, 2, true);
							if (data.Email) {
								$('.set-email').text($.t('modify_email')).prop('href', './tosafeset.html');

							} else {
								$('.set-email').text($.t('binding_mailbox')).prop('href', './bind-email.html');
							}
						} else {
							showHide($li, 1, true);
							showHide($li, 2);
							if (num) {
								$('.set-phone').text($.t('modify_phone')).prop('href', './tosafeset.html');
							} else {
								$('.set-phone').text($.t('bind_phone')).prop('href', './bind-phone.html');
							}
						}
						if (1 != data.TradePasswordType) {
							safeCount++;
						}


						if (4 == safeCount) {
							$('.safe-count').remove();
							$('[data-i18n="protection"]').text($.t('protection2'));
						} else {
							$('.safe-count').text(safeCount + 1);
						}
						$('.trade-type').text(msg);
						if (2 == data.VerifyLevel) {
							$('.verify-level').text('C' + data.VerifyLevel).addClass('red');
							lhtml = $.t('c2');
							auth = $.t('check');
							$('.auth').prop('href', './torealname.html').html(auth);
							$('.verify-tips').html(lhtml);
						} else {
							obj.ajaxFn('/user/GetCertification', {
								callback: function (res) {
									if (res.IsSuccess) {
										if (res.Data) {
											if (86 == (res.Data.Country || res.Data.Data.Country)) {
												if (1 == data.VerifyLevel) {
													$('.verify-level').text('C' + data.VerifyLevel).addClass('red');
													lhtml = $.t('c1');
													auth = $.t('promote');
												}
											} else {
												if (1 == data.VerifyLevel) {
													$('.verify-level').text('C' + data.VerifyLevel).addClass('red');
													lhtml = $.t('c1');
													auth = $.t('check');
												} else {
													if (!!res.Data.Status) {
														if (1 == res.Data.Status) {
															$('.verify-level').html($.t('auditing')).addClass('brown');
															auth = $.t('check');
															lhtml = $.t('infor_success') + $.t('someday') + $.t('manual');
														} else if (2 == res.Data.Status) {
															$('.verify-level').html($.t('auth') + $.t('pass')).addClass('red').removeClass('green');
															auth = $.t('check');
															lhtml = $.t('real_name') + $.t('pass');
														} else if (3 == res.Data.Status) {
															$('.verify-level').html($.t('auth_fail'));
															auth = $.t('resubmit');
															lhtml = $.t('sorry') + $.t('re_submit');
														}
													} else {
														$('.verify-level').html($.t('not_realname'));
														auth = $.t('auth');
														lhtml = $.t('c0');
													}
												}
											}
											$('.auth').prop('href', './torealname.html').html(auth);
											$('.verify-tips').html(lhtml);
										}
									} else {
										$('.verify-level').html($.t('not_realname'));
										auth = $.t('auth');
										lhtml = $.t('c0');
										$('.auth').prop('href', './torealname.html').html(auth);
										$('.verify-tips').html(lhtml);
									}
								}
							});
						}

						/*if(0===data.VerifyLevel){
						   resultTips = $.t('wei');
						}else{
						   resultTips = $.t('yi');
						}*/
						//resultTips+=$.t('completed');
						//$('.verify-tips').text(resultTips);
						$('.vip-level').text('VIP' + data.VipLevel);
						var _rate = '';
						if (1 == data.VipLevel) {
							_rate = 0.5;
						} else if (2 == data.VipLevel) {
							_rate = (0.5 * 10) * (0.9 * 10) / 100;
						} else if (3 == data.VipLevel) {
							_rate = (0.5 * 10) * (0.8 * 10) / 100;
						} else if (4 == data.VipLevel) {
							_rate = (0.5 * 10) * (0.76 * 100) / 1000;
						} else if (5 == data.VipLevel) {
							_rate = (0.5 * 10) * (0.7 * 10) / 100;
						} else if (6 == data.VipLevel) {
							_rate = (0.5 * 10) * (0.6 * 10) / 100;
						}

						$('.rate-value').html(_rate + '%')
					}

					function showHide(that, index, flag) {
						that.eq(index).find('a').removeClass('hide');
						if (flag) {
							that.eq(index).find('a').addClass('hide');
						}
					}
				}
			});
		},
		// 修改昵称
		modifyNickName: function (that, name) {
			obj.ajaxFn('/user/SetNickName', {
				data: {
					nickName: name
				},
				callback: function (res) {
					var msg = '',
						sel = '';
					if (res.IsSuccess) {
						msg = $.t('modify_success');
						$('#nickname').val(name).addClass('hide');
						that.parent().find('span').text(name).removeClass('hide');
						that.addClass('hide').prev().removeClass('hide');
					} else {
						msg = $.t('modify_fail');
						sel = 'green';
					}
					obj.hideTips(msg, sel);
				}
			});
		},
		// 修改登陆/交易密码
		updatePwd: function (that, data, flag) {
			var url = '/user/UpdatePassword';
			if (flag) {
				url = '/user/UpdateTradePwd';
			}
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('pwd_success');
						that.closest('.form-default')[0].reset();
						$('#btn-certain').on('click', function () {
							window.location.href = './toSafeSet.html';
						});
					} else {
						if (133 == res.Code) {
							msg = $.t('origin_corrct');
						} else if (213 == res.Code) {
							msg = $.t('pwd_same');
						} else if (0 == res.Code) {
							msg = $.t('otp');
						}
					}
					that.prop('disabled', false).text($.t('submit'));
					obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').text(msg);
				}
			});
		},
		// 未/已绑定
		bindFn: function (sel, flag) {
			var selector = '#set-' + sel + '>td:nth-child(2)',
				that = '#set-' + sel;
			if (flag) {
				$(that).addClass('red').removeClass('green');
				$(selector).text($.t('not_bound'));
			} else {
				$(that).addClass('green').removeClass('red');
				$(selector).text($.t('is_bind'));
			}
		},
		// 修改操作
		showOpearate: function (list) {
			var sel = '';
			for (var i = 0; i < list.length; i++) {
				sel = '#set-' + list[i];
				$(sel).find('.opearate-btn .hide').removeClass('hide').siblings().addClass('hide');
			}
		},
		// 原密码是否为空
		oldPwdFn: function (that) {
			var val = that.val().trim(),
				flag = true;
			if (val && '' != val) {
				obj.formValidate('#oldPwd', null, true);
			} else {
				obj.formValidate('#oldPwd', $.t('password_null'));
				flag = false;
			}
			return flag;
		},
		// 密码是否一致
		twoPwdFn: function (that) {
			var repwd = that.val().trim(),
				val = $('#newPwd').val().trim(),
				flag = true;

			if (val && '' != val) {
				if (val != repwd) {
					obj.formValidate('#rePwd', $.t('consist'));
					flag = false;
				} else {
					obj.formValidate('#rePwd', null, true);
				}
			} else {
				flag = false;
			}
			return flag;
		},
		//愿密码与新密码是否一致
		oldNewPwdFn: function (that) {
			var newpwd = that.val().trim(),
				val = $('#oldPwd').val().trim(),
				flag = true;
			if (val && '' != val) {
				if (val === newpwd) {
					obj.formValidate('#newPwd', $.t('agree_pwd'));
					flag = false;
				} else {
					obj.formValidate('#newPwd', null, true);
				}
			} else {
				flag = false;
			}
			return flag;
		},
		// 图片截取
		cutImage: function (img, fitwidth, fitheight) {
			var image = new Image();
			image.src = img.src;
			if (image.width > fitwidth && image.height > fitheight) {
				if (image.width > image.height) {
					img.height = fitheight;
				} else {
					img.width = fitwidth;
				}
			} else {
				img.style.position = 'absolute';
				img.style.top = '50%';
				img.style.marginTop = -(img.height / 2) + 'px';
				img.style.left = '50%';
				img.style.marginLeft = -(img.width / 2) + 'px';
			}
		},
		// 返回文字描述的日期
		getTxtDate: function (date) {
			var curr = new Date().getTime(),
				diff = curr - date,
				minute = 60 * 1000,
				hour = 60 * minute,
				day = 24 * hour,
				month = 31 * day,
				year = 12 * month,
				r = 0;
			txt = $.t('just_now');
			if (diff > year) {
				r = Math.floor(diff / year);
				txt = r + $.t('year_old');
			} else if (diff > month) {
				r = Math.floor(diff / month);
				txt = r + $.t('month_ago');
			} else if (diff > day) {
				r = Math.floor(diff / day);
				txt = r + $.t('day_ago');
			} else if (diff > hour) {
				r = Math.floor(diff / hour);
				txt = r + $.t('hour_ago');
			} else if (diff > minute) {
				r = Math.floor(diff / minute);
				txt = r + $.t('minute_ago');
			}
			return txt;
		},
		// 请求新闻列表
		newsList: function () {
			obj.ajaxFn('/news/GetMarketNews', {
				data: {
					marketId: '',
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					if (res.IsSuccess) {
						tobj.newsShow(res.Data.Items);
						tobj.pageObj.page = res.Data.CurrentPage + res.Data.PageSize;
						if (2 < res.Data.TotalPage) {
							tobj.getMoreNews();
							$('.more-btn').one('click', function () {
								tobj.getMoreNews();
							});
						} else {
							$('.more-btn').addClass('hide');
						}
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		// 展示新闻列表
		newsShow: function (list) {
			var list = list || [],
				msg = '',
				html = '',
				i = 0,
				pic = './imgs/news.jpg',
				time, date,
				$items = $('.news-items'),
				$li = $items.find('li'),
				count = $li.length,
				that;
			for (i; i < list.length; i++) {
				if (list[i].Cover) {
					pic = list[i].Cover;
				}
				time = list[i].PublishTime;
				time = parseInt(time.substring(time.indexOf('(') + 1, time.lastIndexOf(')')));
				date = new Date(time);
				time = tobj.getTxtDate(date.getTime());
				html += '<li>\
                  <label><img src="' + pic + '" alt="pic" /></label>\
                  <div class="news-info">\
                     <a href="./news-detail.html?id=' + list[i].Id + '" target="_blank">' + list[i].Title + '</a>\
                     <p>' + list[i].Intro + '</p>\
                     <label class="remark-tip"><span>' + (list[i].Author || $.t("anonymity")) + '</span><span></span><span>' + time + '</span></label>\
                  </div>\
               </li>';
			}
			$items.append(html);
			for (i = count; i < $('.news-items>li').length; i++) {
				$('.news-items>li').eq(i).find('img').load(function () {
					tobj.cutImage(this, 260, 150);
				});
			}
		},
		// 更多新闻
		getMoreNews: function () {
			$(window).on('scroll', function (e) {
				e = e || window.event;

				if (0 < $(this).scrollTop() - tobj.beforeScrollTop) {
					if ($(document).scrollTop() >= Math.abs($(document).height() - $(window).height() - $('#footer').height())) {
						tobj.pageObj.page = tobj.pageObj.page + tobj.pageObj.pageSize;
						tobj.newsList();
					}
				}
				tobj.beforeScrollTop = $(this).scrollTop();
			});
		},
		// 新闻详情
		newsDetail: function (id) {
			if (id) {
				obj.ajaxFn('/news/Detail', {
					data: {
						newsId: id
					},
					callback: function (res) {
						var msg = '',
							data, date, time = '',
							html = '';
						if (res.IsSuccess) {
							data = res.Data;
							time = obj.dateFormate(data.PublishTime);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							date = new Date(time);*/
							html = data.Content;

							$('.news-author').text(data.Author || $.t('anonymity'));
							$('.news-title').text(data.Title);
							$('.news-publishTime').text(time);
							$('.news-content').html(html);
						} else {
							msg = res.ErrorMsg + '，' + $.t("get_fail");
							obj.modShow('#mod-prompt');
							$('#mod-prompt .tips-txt').text(msg);
						}
					}
				});
			}
		},
		// 人民币充值列表
		getCnyRechargeList: function () {
			obj.ajaxFn('/Deposit/GetList', {
				data: {
					pageIndex: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '',
						time = '',
						date, status = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							// console.log(list[i].Remark||$.t('no_data2'));
							var _data = list[i].Remark || $.t('no_data2');
							time = obj.dateFormate(list[i].CreatedAt);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							date = new Date(time);*/
							//list[i].CreatedAt = date.format('yyyy-MM-dd');
							if (1 == list[i].Status) {
								status = $.t('pend');
							} else if (2 == list[i].Status) {
								status = $.t('stock');
							} else if (3 == list[i].Status) {
								status = $.t('apply_false');
							} else if (4 == list[i].Status) {
								status = $.t('apply_false');
							} else if (5 == list[i].Status) {
								status = $.t('canceled');
							}
							html += '<tr>\
                              <td>' + time + '</td>\
                              <td>' + list[i].PayWay + '</td>\
                              <td class="txt-price txt-right">' + list[i].Amount + '</td>\
                              <td>' + status + '</td>\
                              <td class="txt-price">' + _data + '</td>\
                           </tr>';
						}
						$('#log-first>tbody').html(html);
						tobj.page(null, res.Data.CurrentPage, res.Data.TotalPage, function (now, all) {
							tobj.pageObj.page = now;
							tobj.getCnyRechargeList();
						});
					}
				}
			});
		},
		// 人民币提现列表
		getCnyCashList: function () {
			obj.ajaxFn('/Withdraw/GetList', {
				data: {
					pageIndex: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '',
						time = '',
						date, status = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							if (1 == list[i].Status) {
								status = $.t("pend") + '（<a href="javascript:;" data-action="cancel" data-dId="' + list[i].Id + '">' + $.t("revocation") + '</a>）';
							} else if (2 == list[i].Status) {
								status = $.t('allocated');
							} else if (3 == list[i].Status) {
								status = $.t('processe');
							} else if (4 == list[i].Status) {
								status = $.t('stock');
							} else if (5 == list[i].Status) {
								status = $.t('fail');
							} else if (6 == list[i].Status) {
								status = $.t('canceled');
							} else if (7 == list[i].Status) {
								status = $.t('canceled');
							}
							time = obj.dateFormate(list[i].CreatedAt);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							date = new Date(time);*/
							if (!list[i].UserName) {
								list[i].UserName = '';
							}
							html += '<tr>\
                              <td>' + time + '</td>\
                              <td>' + list[i].BankName + ' ' + list[i].Subbranch + '</td>\
                              <td><span class="txt-aName">' + list[i].UserName + '</span><span class="txt-aNum">' + list[i].AccountNumber + '</span></td>\
                              <td class="txt-price txt-right">' + (list[i].Amount || 0) + '/' + (list[i].TxAmount || 0) + '</td>\
                              <td>' + list[i].Fee + '</td>\
                              <td>' + status + '</td>\
                              <td class="txt-price">' + (list[i].Remark || $.t('no_data2')) + '</td>\
                           </tr>';
						}
						// console.log(html);
						$('#log-second>tbody').html(html);
						tobj.page(null, res.Data.CurrentPage, res.Data.TotalPage, function (now, all) {
							tobj.pageObj.page = now;
							tobj.getCnyCashList();
						});
					}
				}
			});
		},
		// 虚拟币充值列表
		getCoinRechargeList: function () {
			obj.ajaxFn('/Deposit/GetCoinList', {
				data: {
					pageIndex: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '',
						time = '',
						date, status = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							time = obj.dateFormate(list[i].CreatedAt);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							date = new Date(time);*/
							if (1 == list[i].Status) {
								//取消快速到账按钮
								// status = $.t("pend")+'（<a href="javascript:;" data-action="quick" data-dId="'+list[i].Id+'" data-cId="'+list[i].CurrencyId+'" data-num="'+list[i].Volume+'">'+$.t("quick_arrive")+'</a>）';
								status = $.t("pend");
							} else if (2 == list[i].Status) {
								status = $.t('confirmed');
							} else if (9 == list[i].Status) {
								status = $.t('pledge') + '<span data-action="bail" data-id="' + list[i].Id + '">' + $.t('cancel_bail') + '</span>';
							} else if (10 == list[i].Status) {
								status = $.t('redeem');
								//status = $.t("guaranty")+'<span data-action="question">?</span><div class="bail-tip"><i></i><span>'+$.t("refill")+'</span></div>';
							} else if (17 == list[i].Status) {
								//取消快速到账按钮
								// status = $.t('pledge_fail')+'（<a href="javascript:;" data-action="quick" data-dId="'+list[i].Id+'" data-cId="'+list[i].CurrencyId+'" data-num="'+list[i].Volume+'">'+$.t("quick_arrive")+'</a>）';
								status = $.t('pledge_fail');
							} else if (32 == list[i].Status) {
								status = $.t('safed');
							} else if (64 == list[i].Status) {
								status = $.t('canceled');
							}
							html += '<tr>\
                              <td>' + time + '</td>\
                              <td><i class="icon2 icon-' + list[i].CurrencyId + '"></i> <span class="txt-sign">' + (list[i].CurrencyId).toUpperCase() + '</span></td>\
                              <td class="txt-price txt-right">' + list[i].Volume + '</td>\
                              <td>' + status + '</td>\
                              <td><span class="txt-price ok-num">' + list[i].Confirmation + '</span></td>\
                              <td><a href="' + list[i].ExplorerUrl + '" target="_blank">' + $.t("view_detail") + '</a></td>\
                           </tr>';
						}
						$('#log-third>tbody').html(html);
						tobj.page('.pagination-list2', res.Data.CurrentPage, res.Data.TotalPage, function (now, all) {
							tobj.pageObj.page = now;
							tobj.getCoinRechargeList();
						});
					}
				}
			});
		},
		// 虚拟币提现列表
		getCoinCashList: function () {
			obj.ajaxFn('/Withdraw/GetCoinList', {
				data: {
					pageIndex: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '',
						time = '',
						date, url = '&nbsp;';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							time = obj.dateFormate(list[i].CreatedAt);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							date = new Date(time);*/
							if (1 == list[i].Status) {
								status = $.t("pend") + '（<a href="javascript:;" data-action="vcancel" data-vId="' + list[i].Id + '">' + $.t("revocation") + '</a>）';
							} else if (2 == list[i].Status) {
								status = $.t('processe') + '（<a href="javascript:;" data-action="vcancel" data-vId="' + list[i].Id + '">' + $.t("revocation") + '</a>）';
							} else if (3 == list[i].Status) {
								status = $.t('processe');
							} else if (4 == list[i].Status) {
								status = $.t('stock');
							} else if (5 == list[i].Status) {
								status = $.t('deal_fail');
							} else if (6 == list[i].Status) {
								status = $.t('deal_fail');
							} else if (7 == list[i].Status) {
								status = $.t('canceled');
							} else if (8 == list[i].Status) {
								status = $.t('processe');
							}
							if (4 == list[i].Status) {
								url = '<a href="' + list[i].ExplorerUrl + '" target="_blank">' + $.t("view_detail") + '</a>';
							} else {
								url = '&nbsp;';
							}
							html += '<tr>\
                              <td>' + time + '</td>\
                              <td><i class="icon2 icon-' + list[i].CurrencyId + '"></i> <span class="txt-sign">' + (list[i].CurrencyId).toUpperCase() + '</span></td>\
                              <td class="txt-price txt-right">' + list[i].Amount + '/' + list[i].TxAmount + '</td>\
                              <td style="text-align:right;">' + list[i].Fee + '</td>\
                              <td>' + list[i].Address + '</td>\
                              <td>' + status + '</td>\
                              <td>' + url + '</td>\
                           </tr>';
						}
						$('#log-fourth>tbody').html(html);
						tobj.page('.pagination-list2', res.Data.CurrentPage, res.Data.TotalPage, function (now, all) {
							tobj.pageObj.page = now;
							tobj.getCoinCashList();
						});
					}
				}
			});
		},
		// 申请担保
		toMortgage: function (dId, cId, that) {
			obj.ajaxFn('/Deposit/Mortgage', {
				data: {
					depositId: dId,
					currencyId: cId
				},
				callback: function (res) {
					that.prop('disabled', false);
					if (res.IsSuccess) {
						obj.modHide('#mod-bail');
						tobj.getCoinRechargeList();
					} else {
						obj.modShow('#mod-prompt2');
						$('#mod-prompt2>.tips-txt').text((res.ErrorMsg || '') + '，' + $.t("apply_false"));
					}
				}
			});
		},
		// 取消担保
		cancelMortgage: function (id) {
			obj.ajaxFn('/Deposit/Redeem', {
				data: {
					depositId: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						obj.hideTips($.t('bail') + $.t('canceled'));
						tobj.getCoinRechargeList();
					} else {
						obj.modShow('#mod-prompt2');
						$('#mod-prompt2>.tips-txt').text((res.ErrorMsg || '') + '，' + $.t("cancellation"));
					}
				}
			});
		},
		// 获取担保金额
		getExchange: function (cId, amount) {
			var tId = $('.currency-list>li.on').text().toLowerCase();
			if (0 != tobj.exchange[tId]) {
				$('#mod-bail #bail-num').val(amount * tobj.exchange[tId]);
				return false;
			}
			obj.ajaxFn('/Currency/Exchange', {
				data: {
					currencyId: cId,
					targetCurrencyId: tId,
					amount: amount
				},
				callback: function (res) {
					if (res.IsSuccess) {
						tobj.exchange[tId] = res.Data;
						obj.ajaxFn('/Currency/GetMortgageDiscount', {
							data: {
								currencyId: cId
							},
							callback: function (res) {
								var $num = $('#mod-bail #bail-num');
								if (res.IsSuccess && res.Data) {
									$num.val(tobj.exchange[tId] * res.Data);
								} else {
									obj.getTips($num, $.t('abnormal_error'));
									$('#to-bail').prop('disabled', true);
								}
							}
						});
					} else {
						// obj.modShow('#mod-prompt2');
						// $('#mod-prompt2>.tips-txt').text(res.ErrorMsg+'，'+$.t("get_fail"));
						obj.getTips($('#mod-bail #bail-num'), res.ErrorMsg + '，' + $.t("get_fail"));
					}
				}
			});
		},
		// 撤销人民币提现
		cancelCnyCash: function (id, that) {
			obj.ajaxFn('/Withdraw/Repeal', {
				data: {
					id: id
				},
				callback: function (res) {
					var msg = '',
						sel = '';
					that.prop('disabled', false);
					if (res.IsSuccess) {
						obj.modHide('#mod-prompt2');
						msg = $.t('cancelok');
						tobj.getCnyCashList();
					} else {
						msg = $.t('cancellation');
						sel = 'green';
						/*obj.modShow('#mod-prompt2');
						$('#mod-prompt2>.tips-txt').text(res.ErrorMsg+'，'+$.t("get_fail"));*/
					}
					obj.hideTips(msg, sel);
				}
			});
		},
		// 撤销虚拟币提现
		cancelCoinCash: function (id, that) {
			obj.ajaxFn('/Withdraw/CoinRepeal', {
				data: {
					id: id
				},
				callback: function (res) {
					var msg = '',
						sel = '';
					that.prop('disabled', false);
					if (res.IsSuccess) {
						obj.modHide('#mod-prompt2');
						msg = $.t('cancelok');
						tobj.getCoinCashList();
					} else {
						msg = $.t('cancellation');
						sel = 'green';
					}
					obj.hideTips(msg, sel);
				}
			});
		},
		// 登陆日志列表
		getLoginLog: function () {
			obj.ajaxFn('/user/GetLogs', {
				data: {
					type: 1,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							var log = JSON.parse(list[i].Log);
							tobj.logList.push({
								id: list[i].Id,
								ip: log.IP
							});
							//log.Location = log.Location.trim();
							html += '<tr>\
                           <td>' + log.Time + '</td>\
                           <td>' + log.Ip + '</td>\
                           <td>' + log.Location + '</td>\
                        </tr>';
						}
						$('.log-table>tbody').html(html);

						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getLoginLog();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
						//tobj.getGeographicalPos();
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		//投票列表
		getVoteLog: function () {
			obj.ajaxFn('/Vote/GetLastVoteList', {
				callback: function (res) {
					var list = [],
						html = '',
						_count = 0;
					if (res.IsSuccess) {
						list = res.Data.CurrencyList;
						list.sort(function (a, b) {
							return (b && (b.Count || 0)) - (a && (a.Count || 0))
						});
						item = res.Data.Project;
						for (var i = 0; i < list.length; i++) {
							_count += list[i].Count;
							html += '<tr>\
                           <td class="cup">' + 'NO.' + (i + 1) + '</td>\
                           <td><i class="icon2 icon-' + list[i].Currencyid.toLowerCase() + '"></i></td>\
                           <td>' + list[i].Currencyid.toUpperCase() + '</td>\
                           <td>' + list[i].Count + '</td>\
                           <td class="count">' + ((list[i].Count / (res.Data.TotalVote || 1)) * 100).toFixed() + '%</td>\
                           <td><span class="btn-vote" data-id="' + list[i].Currencyid + '">' + $.t("coin_vote") || Vote + '</span></td>\
                        </tr>';
						}
						$('.vote-table>tbody').html(html);
						$('.vote-data').html(item.Begindat + ' — ' + item.Enddat + '(UTC+10)');
						$('.phase').html(item.Title);
						$('.cup').eq(0).html('<img src="./imgs/cup.png" alt="cup" />')
						//关闭投票
						// $('.btn-vote').on('click',function(){
						//    var _this = $(this);
						//    if(obj.sign){
						//       tobj.sendVote(item.Id.toString(),_this.data('id'));
						//    }else{
						//       obj.modShow('#mod-prompt');
						//       $('#mod-prompt .tips-txt').text($.t('log_first'));
						//    }
						// });
						// if(1<res.Data.TotalPage){
						//    $('.pagination-list').removeClass('hide');
						//    tobj.pageObj.page = res.Data.CurrentPage;
						//    tobj.page(null,tobj.pageObj.page,res.Data.TotalPage,function(now,all){
						//       tobj.pageObj.page = now;
						//       tobj.getLoginLog();
						//    });
						//    $('.turnover-log').css('top','22px');
						// }else{
						//    $('.pagination-list').empty().addClass('hide');
						//    $('.turnover-log').css('top','10px');
						// }
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		sendVote: function (id, currencyId) {
			obj.ajaxFn('/Vote/Vote', {
				data: {
					projectId: id,
					currencyId: currencyId
				},
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						tobj.getVoteLog();
						msg = $.t('vote_success');
						obj.hideTips(msg);
					} else {
						if (300 == res.Code) {
							msg = $.t('voted');
							obj.modShow('#mod-prompt');
							$('#mod-prompt .tips-txt').text(msg);
						} else if (204 == res.Code) {
							msg = $.t('vote_verifation');
							obj.modShow('#mod-prompt');
							$('#mod-prompt .tips-txt').text(msg);
						}
					}
				}
			});
		},
		// 累计分红列表
		getCommission: function () {
			obj.ajaxFn('/User/GetPromoterStatistics', {
				data: {
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 == list.length) {
							html = '<tr><td colspan="3">' + $.t("no_data") + '</td></tr>';
						} else {
							for (var i = 0; i < list.length; i++) {
								html += '<tr>\
                              <td>' + list[i].CurrencyId + '</td>\
                              <td>' + list[i].DividendAmount + '</td>\
                              <td>' + list[i].DividendTime + '</td>\
                           </tr>';
							}
						}
						$('.log-table>tbody').html(html);

						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getCommission();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
						//tobj.getGeographicalPos();
					} else {
						varmsg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		// 邀请人列表
		getInviter: function () {
			obj.ajaxFn('/user/GetPromotionPageList', {
				data: {
					type: 1,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '',
						_inviter = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 == list.length) {
							html = '<tr><td colspan="2">' + $.t("no_data") + '</td></tr>';
						} else {
							for (var i = 0; i < list.length; i++) {
								if (list[i].Phone) {
									_inviter = list[i].Phone;
								} else {
									_inviter = list[i].Email;
								}
								html += '<tr>\
                              <td>' + _inviter + '</td>\
                              <td>' + list[i].CreateTime + '</td>\
                           </tr>';
							}
						}
						$('.log-table>tbody').html(html);

						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getInviter();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
						//tobj.getGeographicalPos();
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		// 新赛博分红
		getNewSaibo: function () {
			obj.ajaxFn('/user/GetLogs', {
				data: {
					type: 1,
					page: tobj.pageObj.page,
					pageSize: tobj.pageObj.pageSize
				},
				callback: function (res) {
					var list = [],
						html = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							var log = JSON.parse(list[i].Log);
							tobj.logList.push({
								id: list[i].Id,
								ip: log.IP
							});
							//log.Location = log.Location.trim();
							html += '<tr>\
                           <td>' + log.Time + '</td>\
                           <td>' + log.Ip + '</td>\
                           <td>' + log.Location + '</td>\
                        </tr>';
						}
						$('.log-table>tbody').html(html);

						// if(1<res.Data.TotalPage){
						//    $('.pagination-list').removeClass('hide');
						//    tobj.pageObj.page = res.Data.CurrentPage;
						//    tobj.page(null,tobj.pageObj.page,res.Data.TotalPage,function(now,all){
						//       tobj.pageObj.page = now;
						//       tobj.getLoginLog();
						//    });
						//    $('.turnover-log').css('top','22px');
						// }else{
						//    $('.pagination-list').empty().addClass('hide');
						//    $('.turnover-log').css('top','10px');
						// }
						//tobj.getGeographicalPos();
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		// 获取地理位置
		getGeographicalPos: function () {
			var list = tobj.logList;
			for (var i = 0; i < list.length; i++) {
				$.ajax({
					url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + list[i].ip + '',
					async: false,
					type: "GET",
					dataType: "jsonp",
					error: function () {
						var html = $.t('intranet');
						if (-1 != remote_ip_info.ret) {
							html = '<span class="province">' + remote_ip_info.country + '</span>\
                           <span class="city">' + remote_ip_info.province + '</span>\
                           <span class="area">' + remote_ip_info.city + '</span>';
						}
						$('.log-table>tbody>tr').eq(i).find('td:last-child').html(html);
					}
				});
			}
		},
		// 获取挂单
		getOrders: function () {
			var index = $('.tab-change>li.on').index();
			if (0 == index) {
				tobj.getOrderList();
			} else {
				tobj.getOrderList(2);
			}
		},
		// 获取历史挂单
		getHistoryOrders: function () {
			var index = $('.tab-change>li.on').index();
			if (0 == index) {
				tobj.getOrderHistoryList();
			} else {
				tobj.getOrderHistoryList(2);
			}
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
							$('.order-1th>tbody>tr').each(function () {
								var _id = $(this).find('a').attr('data-id');
								if (tobj.cancelObj.orderId) {
									$(this).remove();
									return false;
								}
							});
						} else {
							$('.order-2th>tbody>tr').each(function () {
								var _id = $(this).find('a').attr('data-id');
								if (tobj.cancelObj.orderId) {
									$(this).remove();
									return false;
								}
							});
						}
						tobj.getOrderList(type);
						tobj.getMarketId();
						//obj.modHide('#mod-buz');
					} else {
						msg = res.ErrorMsg || $.T('cancellation');
						$('#mod-buz .error-tips').html(msg);
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
						index = $('.tab-change>li.on').index(),
						$table = $('.other-tables>table'),
						html = '<tr><td colspan="7" text-align:center;">' + $.t('no_data') + '</td></tr>';
					if (res.IsSuccess) {
						if (1 == index) {
							$table.eq(1).find('tbody').html(html);
						} else {
							$table.eq(0).find('tbody').html(html);
						}
						$('.pagination-list').empty().addClass('hide');
						$('.turnover-log').css('top', '10px');
						/*tobj.getOrderList(type);
						tobj.getMarketList();*/
					} else {
						msg = res.ErrorMsg || $.T('cancellation');
						$('#mod-buz .error-tips').html(msg);
					}
				}
			});
		},
		// 获取成交记录列表
		getTradeList: function () {
			var data = {
				marketId: tobj.marketId,
				pageIndex: tobj.pageObj.page,
				pageSize: tobj.pageObj.pageSize
			};
			if (!data.marketId) {
				delete data.marketId;
			}
			obj.ajaxFn('/Market/GetTradeList', {
				data: data,
				callback: function (res) {
					var list = [],
						html = '',
						sel = '',
						mk = (tobj.marketId.toUpperCase()).split('_');
					var storage = window.localStorage;
					if (res.IsSuccess) {
						obj.ajaxFn('/user/GetLoginCookie', {
							callback: function (res) {
								userId = res.Data.UserId;
								storage.setItem("userId", userId);
							}
						})
						var userId = storage.getItem("userId");
						list = res.Data.Items;
						for (var i = 0; i < list.length; i++) {
							// sel = list[i].IsAsk?'green':'red';
							sel = list[i].AskUserId == userId ? 'green' : 'red';
							var time = obj.dateFormate(list[i].CreateTime);
							/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
							var date = new Date(time);*/
							html += '<tr class="' + sel + '">\
                              <td>' + time + '</td>\
                              <td><span>' + mk[0] + '</span>/<span>' + mk[1] + '</span></td>\
                              <td>' + (list[i].AskUserId == userId ? $.t("sell") : $.t("buy")) + '</td>\
                              <td><span>' + list[i].Volume + '</span>(<span>' + mk[1] + '</span>)</td>\
                              <td><span>' + list[i].Price + '</span>(<span>' + mk[0] + '</span>)</td>\
                              <td><span>' + list[i].Amount + '</span>(<span>' + mk[0] + '</span>)</td>\
                              <td><span>' + (list[i].AskUserId == userId ? list[i].AskFee : list[i].BidFee) + '</span>(<span>' + (list[i].AskUserId == userId ? mk[0] : mk[1]) + '</span>)</td>\
                           </tr>';
							if (list[i].AskUserId == userId && list[i].BidUserId == userId) {
								html += '<tr class="' + sel + '">\
                              <td>' + time + '</td>\
                              <td><span>' + mk[0] + '</span>/<span>' + mk[1] + '</span></td>\
                              <td>' + $.t("buy") + '</td>\
                              <td><span>' + list[i].Volume + '</span>(<span>' + mk[1] + '</span>)</td>\
                              <td><span>' + list[i].Price + '</span>(<span>' + mk[0] + '</span>)</td>\
                              <td><span>' + list[i].Amount + '</span>(<span>' + mk[0] + '</span>)</td>\
                              <td><span>' + list[i].BidFee + '</span>(<span>' + mk[1] + '</span>)</td>\
                           </tr>';
							}
						}
						if (0 == list.length) {
							html = '<tr><td colspan="7" text-align:center;">' + $.t("no_data") + '</td></tr>';
						}
						if (0 == list.length || 10 == list.length) {
							obj.resizeHeight();
							$(window).on('resize', function () {
								obj.resizeHeight();
							});
						}
						$('.table-order>tbody').html(html);
						if (res.Data.TotalPage > 1) {
							$(".pagination-list").removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;

							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getTradeList();
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$(".pagination-list").addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
					}
				}
			});
		},
		// 交易分析
		getTradeProfit: function () {
			var data = {
				marketId: tobj.marketId
			};
			if (!data.marketId) {
				delete data.marketId;
			}
			obj.ajaxFn('/Market/GetTradeProfit', {
				data: data,
				callback: function (res) {
					var data = {},
						hp = 0,
						fp = 0,
						tp = 0,
						rate = 0,
						rate2 = 0,
						rate3 = 0;
					if (res.IsSuccess) {
						data = res.Data;
						$('.askAvgPrice').text(data.AskAvgPrice);
						$('.askVolume').text(data.AskVolume);
						$('.askAmount').text(data.AskAmount);
						$('.bidAvgPrice').text(data.BidAvgPrice);
						$('.bidVolume').text(data.BidVolume);
						$('.bidAmount').text(data.BidAmount);
						hp = data.HistoryProfit;
						if (0 <= hp) {
							hp = '+' + hp;
						}
						$('.historyProfit').text(hp);
						rate = data.HistoryProfitRate * 100;
						if (0 <= rate) {
							rate = '+' + rate + '%';
						} else {
							rate = rate + '%';
						}
						$('.historyProfitRate').text(rate);
						$('.heldAvgPrice').text(data.HeldAvgPrice);
						$('.heldVolume').text(data.HeldVolume);
						$('.heldAmount').text(data.HeldAmount);
						$('.marketPrice').text(data.MarketPrice);
						$('.marketAmount').text(data.MarketAmount);
						fp = data.FloatProfit;
						if (0 <= fp) {
							fp = '+' + fp;
						}
						$('.floatProfit').text(fp);
						rate2 = data.FloatProfitRate * 100;
						if (0 <= rate2) {
							rate2 = '+' + rate2 + '%';
						} else {
							rate2 = rate2 + '%';
						}
						$('.floatProfitRate').text(rate2);
						tp = data.TotalProfit;
						if (0 <= tp) {
							tp = '+' + tp;
						}
						$('.totalProfit').text(tp);
						rate3 = data.TotalProfitRate * 100;
						if (0 <= rate3) {
							rate3 = '+' + rate3 + '%';
						} else {
							rate3 = rate3 + '%';
						}
						$('.totalProfitRate').text(rate3);
					}
				}
			});
		},
		//获取限价设置
		getLimitSet: function () {
			var data = {
				key: 'MarketOrderPriceLimit'
			};
			obj.ajaxFn('/user/GetUserConfig', {
				data: data,
				callback: function (res) {
					if (res.IsSuccess) {
						if (res.Data) {
							// $('.slide-box').css('display','block');
							$('.form-default').css('display', 'block');
							var flag = res.Data;
							if (flag.indexOf('OFF') != -1 && flag != 'OFF,') {
								$('.slide-box').addClass('off');
								// $('input').prop('disabled',true);
								// $('button').prop('disabled',true);
								$('.form-default').css('display', 'none');
								// $('button').css('background','#b8c3cc');
								flag = flag.split(',')[1];
								$('.price').val(flag * 100);
							} else if (flag == 'OFF,') {
								$('.form-default').css('display', 'none');
								// $('.slide-box').css('display','none');
							} else {
								$('.slide-box').removeClass('off');
								flag = flag.split(',')[1];
								$('.price').val(flag * 100);
							}
						} else {
							// $('.slide-box').css('display','none');
							$('.form-default').css('display', 'none');
							// $('.slide-box').addClass('off');
							// $('input').prop('disabled',true);
							// $('button').prop('disabled',true);
							// $('button').css('background','#b8c3cc');
						}
					} else {
						msg = res.ErrorMsg || $.T('cancellation');
						$('#mod-buz .error-tips').html(msg);
					}
				}
			});
		},
		// 用户是否创建了Openkey
		isCreatedOpenKey: function () {
			obj.ajaxFn('/user/OpenKeyIsCreated', {
				callback: function (res) {
					var $api = $('.api-box.hide');
					if (res.IsSuccess) {
						if (res.Data) {
							obj.modShow('#mod-operate');
							$('#mod-operate .mod-title>span').html($.t('prompt'));
						} else {
							$api.eq(0).removeClass('hide');
							//tobj.getTradePwdType(3);
						}
					}
				}
			});
		},
		// 创建open key
		createOpenKey: function (data, that) {
			obj.ajaxFn('/user/CreateOpenKey', {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						tobj.ipList = [res.Data];
						msg = $.t('create_success');
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').html(msg);
						$('#ok-tip').addClass('create');
						$('#ok-tip').on('click', function () {
							var that = $(this),
								$api = $('.api-box.hide');

							if (that.hasClass('create')) {
								$api.removeClass('hide').siblings('.api-box').addClass('hide');
								that.removeClass('create');
								tobj.showIpList();
								//tobj.getOpenKeyList(data.tradePassword);
							}
						});
					} else {
						if (407 == res.Code) {
							msg = $.t('more_wrong') + $.t('lock_hour');
							obj.hideTips(msg, 'green');
						} else if (502 == res.Code) {
							msg = 'open key' + $.t('exceed_limit');
							obj.hideTips(msg, 'green');
						} else if (1002 == res.Code) {
							msg = $.t('trade_error') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance');
							tobj.getTips($('#buzPwd'), msg);
							$('#buzPwd').focus();
						} else if (201 == res.Code) {
							msg = $.t('verify_error1');
							obj.hideTips(msg, 'green');
						}
					}
					that.prop('disabled', false).text($.t('establish'));
				},
				errorCallback: function () {
					that.prop('disabled', false).text($.t('establish'));
				}
			});
		},
		// 获取open key列表
		getOpenKeyList: function (data) {
			obj.ajaxFn('/user/GetOpenKeyList', {
				data: data,
				callback: function (res) {
					var msg = '',
						html = '',
						tmp = '',
						list = [],
						time, date;
					if (res.IsSuccess) {
						list = res.Data;
						tobj.ipList = list;
						tobj.showIpList();
						obj.modHide('#mod-operate');
					} else {
						if (1002 == res.Code) {
							msg = $.t('trade_error') + $.t('surplus') + (5 - parseInt(res.ErrorMsg)) + $.t('chance');
							tobj.getTips($('#o-buzPwd'), msg);
						} else if (407 == res.Code) {
							msg = $.t('more_wrong') + $.t('lock_hour');
							tobj.getTips($('#o-buzPwd'), msg);
						} else if (201 == res.Code) {
							msg = $.t('verify_error1');
							tobj.getTips($('.input-gug'), msg);
							tobj.getTips($('.input-phone'), msg);
						}

					}
				}
			});
		},
		// 展示ip列表
		showIpList: function () {
			var $box = $('.api-box'),
				html = '',
				tmp = '',
				time, date = [];
			list = tobj.ipList;
			if (0 < list.length) {
				$box.eq(0).addClass('hide').end().eq(1).removeClass('hide');
				for (var i = 0; i < list.length; i++) {
					for (var j = 0; j < (list[i].IPs && list[i].IPs.length); j++) {
						tmp += '<span class="ip-item">' + list[i].IPs[j] + '</span>';
					}
					time = obj.dateFormate(list[i].CreateTime);
					/*time = parseInt(time.substring(time.indexOf('(')+1,time.lastIndexOf(')')));
					date = new Date(time);
					date= date.format('yyyy-MM-dd hh:mm:ss').split(' ');*/
					date = time.split(' ');
					html += '<tr data-id="' + list[i].Id + '">\
                     <td><span class="ip-item">' + date[0] + '</span><span class="ip-item">' + date[1] + '</span></td>\
                     <td>' + tobj.userId + '</td>\
                     <td>' + list[i].Label + '</td>\
                     <td>' + list[i].Id + '</td>\
                     <td>' + list[i].Secretkey + '</td>\
                     <td>' + tmp + '</td>\
                     <td><i class="icon icon-edit" data-type="edit" data-i18n="[title]edit"></i><i class="icon icon-del" data-type="del" data-i18n="[title]del"></i></td>\
                  </tr>';
				}
			} else {
				html = '<tr><td colspan="7" style="text-align: center;">' + $.t('no_data') + '</td></tr>';
				$box.eq(0).removeClass('hide').end().eq(1).addClass('hide');
				$box.eq(0).find('form')[0].reset();
			}
			$('.api-table>tbody').html(html);
		},
		// 删除Open Key
		delOpenKey: function (data, that) {
			obj.ajaxFn('/user/RemoveOpenKey', {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('del_success');
						//tobj.getOpenKeyList(data.tradePassword);
						tobj.ipList = [];
						tobj.showIpList();
						obj.modHide('#mod-operate');
						obj.hideTips(msg);
					} else {
						if (1002 == res.Code) {
							msg = $.t('trade_error') + $.t('surplus') + (5 - res.Data) + $.t('chance');
							tobj.getTips($('#o-buzPwd'), msg);
						} else if (201 == res.Code) {
							msg = $.t('verify_error1');
							tobj.getTips($('.input-gug'), msg);
							tobj.getTips($('.input-phone'), msg);
						}
					}
					that.removeClass('del');
					that.prop('disabled', false).text($.t('certain'));
				},
				errorCallback: function () {
					that.removeClass('del');
					that.prop('disabled', false).text($.t('certain'));
				}
			});
		},
		// Open Key绑定IP
		bindOpenKeyIp: function (data, that) {
			obj.ajaxFn('/user/OpenKeyBindIp', {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('modify_success');
						tobj.getOpenKeyList(data.tradePassword);
						obj.modHide('#mod-edit');
						obj.hideTips(msg);
					} else {
						if (1002 == res.Code) {
							msg = $.t('trade_error') + $.t('surplus') + (5 - res.Data) + $.t('chance');
							tobj.getTips(that.closest('form').find('input[type="password"]'), msg);
						} else if (201 == res.Code) {
							msg = $.t('verify_error1');
							tobj.getTips($('.input-gug'), msg);
							tobj.getTips($('.input-phone'), msg);
						}
					}
					that.prop('disabled', false).text($.t('certain'));
				},
				errorCallback: function () {
					that.prop('disabled', false).text($.t('certain'));
				}
			});
		},
		// 实名认证（国内）
		realnameFromInternal: function (data, that) {
			var url = '/User/IdCardCertification';
			// if(tobj.pass){
			//    url='/user/ApplyCertification86AddPhone';
			// }
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var msg = '',
						btn = '',
						_ele = null,
						$form = that.closest('form');
					if (res.IsSuccess) {
						obj.modHide('#mod-prompt4');
						// if (-3 == res.Code) {

						// } else if (3 == res.Code) {
						// 	msg = '<span>' + $.t('real_pass') + '</span>';
						// 	btn = '<a href="' + location.href + '" class="btn btn-default">' + $.t('certain') + '</a>';
						// } else if (1 == res.Code) {}
						if (2 == res.Code) {
							msg = '<span>' + $.t('realname_success') + '</span>';
							btn = '<a href=" ./torealnameinland.html" class="btn btn-default">' + $.t('certain') + '</a>';
						}

						$form.find('.dropdown-txt>span').remove();
						$form.find('.dropdown-txt').prepend('<span class="default-txt">' + $.t("sel_area") + '</span>');
						$form.find('.dropdown-list>li.on').removeClass('on');
						$form[0].reset();

						$('.box-tips.show').remove();
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').html(msg);
						$('#mod-prompt .tips-btn').html(btn);
					} else {
						obj.modHide('#mod-prompt4');
						msg = $.t('real_info');
						// if (205 == res.Code) {
						// 	msg = $.t('duplicate');
						// } else if (-2 == res.Code) {
						// 	msg = $.t('three_time');
						// }
						if (-2 == res.Code) {
							msg = $.t('three_time');
						}
						// else if(-1==res.Code){
						//    msg = 'PEP认证未通过';
						// } 
						if (!tobj.pass) {
							obj.modShow('#mod-prompt2');
							$('#mod-prompt2 .tips-txt').html(msg);
							if (btn) {
								$('#mod-prompt2 .tips-btn').html(btn);
							}
						}
					}
					that.prop('disabled', false).find('span').text($.t('sub_infor'));
				},
				errorCallback: function () {
					that.prop('disabled', false).find('span').text($.t('sub_infor'));
				}
			});
		},
		// 实名认证（国外）
		realnameFromAbroad: function (data, that) {
			obj.ajaxFn('/User/OtherCertification', {
				data: data,
				callback: function (res) {
					var msg = '',
						btn = '',
						$form = that.closest('form');
					if (res.IsSuccess) {
						obj.modHide('#mod-prompt2');
						// if (3 == res.Code) {
						// 	msg = '<span>' + $.t('real_pass') + '</span>';
						// 	btn = '<a href="' + location.href + '" class="btn btn-default">' + $.t('certain') + '</a>';
						// } else if (2 == res.Code) {
						// 	msg = $.t('submit_success');
						// 	$('#mod-prompt .tips-txt1').html($.t('manual_verification'));
						// 	btn = '<a href="' + location.href + '" class="btn btn-default">' + $.t('certain') + '</a>';
						// }
						if (2 == res.Code) {
							msg = $.t('submit_success');
							$('#mod-prompt .tips-txt1').html($.t('realname_success'));
							btn = '<a href="torealname.html" class="btn btn-default">' + $.t('certain') + '</a>';
						}
					} else {
						obj.modHide('#mod-prompt2');
						// if (205 == res.Code) {
						// 	msg = $.t('duplicate');
						// } else if (-2 == res.Code) {
						// 	msg = $.t('three_time');
						// 	$('.btn.times').addClass('hide');
						// } else if (-3 == res.Code) {
						// 	msg = $.t('auth_fail');
						// 	$('#mod-prompt .tips-txt1').html($.t('review_automatic'));
						// } else if (-1) {
						// 	msg = $.t('pep_error');
						// }
						if (2 == res.Code) {
							msg = $.t('three_time');
						}
						$('.btn.labour').on('click', function () {
							$('.upload-pic').removeClass('hide');
						});
					}
					if (!tobj.pass) {
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').html(msg);
						if (btn) {
							$('#mod-prompt .tips-btn').html(btn);
						}
					}
				},
				errorCallback: function () {
					that.prop('disabled', false).find('span').text($.t('sub_infor'));
				}
			});
		},
		GetCertificationCount: function () {
			obj.ajaxFn('/User/GetCertification24Count', {
				callback: function (res) {
					if (res.IsSuccess) {
						var _time = res.Data;
						if (2 < _time) {
							$('#submit-info').prop('disabled', true);
						}
					}
				}
			});
		},
		// 获取用户手机号码
		getUserPhone: function () {
			obj.ajaxFn('/user/GetPhone', {
				callback: function (res) {
					var $group = $('.phone-group'),
						$box = $('.code-box');
					if (res.IsSuccess) {
						tobj.phone = res.Data;
						if (tobj.phone) {
							//$group.removeClass('hide');
							$('#binded-phone').html(tobj.phone);
							$('#yes').prop('checked', true);
							$('input[name="is_myPhone"]').on('click', function () {
								var that = $(this),
									isChecked = $('#yes').prop('checked');
								if (isChecked) {
									$('.code-box').addClass('hide');
								} else {
									$($box[0]).removeClass('hide');
									//$($box[1]).removeClass('hide');
									$('.code-box .box-tips.show').remove();
								}
							});
							tobj.c2Event(true);
						} else {
							$group.remove();

							//$($box[0]).removeClass('hide');
							//$($box[1]).removeClass('hide');
							tobj.c2Event();

							/*$('#is_myPhone').prop('checked',false);
							$('.code-box').removeClass('hide');*/
						}
					}
				}
			});
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
		c2Event: function (flag) {
			var $phone = $('#phone'),
				$code = $('#pic_code'),
				$msg = $('#msg_code');
			if (flag) {
				$phone.on('blur', function () {
					var that = $(this),
						_val = that.val().trim(),
						msg = '';

					if (!_val) {
						msg = $.t('phone_number') + $.t('cannot_empty');
					}
					tobj.getTips2($(this), msg);
				});
				$code.on('blur', function () {
					var that = $(this),
						_val = that.val().trim(),
						msg = '';

					if (!_val) {
						msg = $.t('pic') + $.t('enter_sms') + $.t('cannot_empty');
					}
					tobj.getTips2($(this), msg);
				});
				$msg.on('blur', function () {
					var that = $(this),
						_val = that.val().trim(),
						msg = '';

					if (!_val) {
						msg = $.t('pic') + $.t('enter_sms') + $.t('cannot_empty');
					}
					tobj.getTips2($(this), msg);
				});
			} else {
				$phone.on('blur', null);
				$code.on('blur', null);
				$msg.on('blur', null);
			}
		},
		// 获取所有银行列表
		getAllBankCardList: function () {
			obj.ajaxFn('/MyAccount/GetPayTypeList', {
				callback: function (res) {
					var html = '<li class="active" data-type="default">--' + $.t("Choose_bank") + '--</li>',
						list = [];
					if (res.IsSuccess) {
						list = res.Data;
						for (var i = 0; i < list.length; i++) {
							if (15 == list[i].Id || 61 == list[i].Id || 62 == list[i].Id || 63 == list[i].Id) {
								continue;
							}
							html += '<li data-id="' + list[i].Id + '"><i class="bank ' + list[i].BankCode.toLowerCase() + '"></i><span class="bankname">' + list[i].BankName + '</span></li>';
						}
						$('.bank-list').html(html);
						tobj.bankCardList = list;
					}
				}
			});
		},
		//获取积分
		getIntegral: function () {
			var userId = localStorage.getItem('userId');
			obj.ajaxFn('/user/GetPointList', {
				data: {
					userId: userId
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data,
							html = '';
						for (var i = 0; i < list.length; i++) {
							time = obj.dateFormate(list[i].Createdat);
							if (list[i].Remark == '绑定谷歌验证') {
								list[i].Remark = $.t('google_verify');
							} else if (list[i].Remark == '高级实名认证') {
								list[i].Remark = $.t('real_auth');
							} else if (list[i].Remark == '设置交易密码') {
								list[i].Remark = $.t('set_pwd');
							} else if (list[i].Remark == '绑定邮箱') {
								list[i].Remark = $.t('binding_mailbox');
							} else if (list[i].Remark == '第一次充值') {
								list[i].Remark = $.t('first_recharge');
							} else if (list[i].Remark == 'The daily login bonus points') {
								list[i].Remark = $.t('bonus_point');
							}
							html += '<tr>\
                        <td>' + time + '</td>\
                        <td>' + list[i].Points + '</td>\
                        <td>' + list[i].Remark + '</td>\
                     </tr>';
						}
						$('.detail>table').find('tbody').html(html);
					}
				}
			});
		},
		//获取当前积分
		getTotalIntegral: function () {
			obj.ajaxFn('/user/GetPoints', {
				data: {
					userId: userId
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var text = res.Data;
						$('.get-integral').html(text);
					}
				}
			});
		},
		getGeneralizeProfit: function () {
			obj.ajaxFn('/user/GetPromoterStatistics', {
				data: {
					page: 1,
					pageSize: 10
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data.Items,
							html = '';
						if (0 < list.length) {
							for (var i = 0; i < list.length; i++) {
								html += '<tr>\
                           <td>' + list[i].CurrencyId + '</td>\
                           <td>' + list[i].DividendAmount + '</td>\
                           <td>' + list[i].DividendTime + '</td>\
                        </tr>';
							}
						} else {
							html = '<tr><td colspan="3">' + $.t('no_data') + '</td></tr>';
						}
						$('.log-table').eq(0).find('tbody').html(html);
					}
				}
			});
		},
		getPromotion: function () {
			obj.ajaxFn('/user/GetPromotionPageList', {
				data: {
					page: 1,
					pageSize: 10
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data.Items,
							html = '',
							account = '';
						$('.total-items').text(res.Data.TotalItems);
						if (0 < list.length) {
							for (var i = 0; i < list.length; i++) {
								time = obj.dateFormate(list[i].CreateTime);
								if (list[i].Phone) {
									account = list[i].Phone;
								} else if (list[i].Email) {
									account = list[i].Email;
								}
								html += '<tr>\
                           <td>' + account + '</td>\
                           <td>' + time + '</td>\
                        </tr>';
							}
						} else {
							html = '<tr><td colspan="2">' + $.t('no_data') + '</td></tr>';
						}
						$('.log-table').eq(1).find('tbody').html(html);
					}
				}
			});
		},
		getGeneralLevel: function () {
			obj.ajaxFn('/user/GetPromoteLevel', {
				callback: function (res) {
					if (res.IsSuccess) {
						var level = res.Data
						if (10 == level) {
							$('.general-level').css('display', 'block');
						}
					}
				}
			});
		},
		getType: function () {
			var cType = $('.sel_area>span').eq(0).data('val');
			if (001 == cType) {
				$('#version').parent().parent().addClass('hide');
				$('#number').parent().parent().addClass('hide');
				$('#fund-num').parent().parent().removeClass('hide');
				$('#state').parent().parent().removeClass('hide');
				$('#mod-version').parent().parent().addClass('hide');
				$('#mod-number').parent().parent().addClass('hide');
				$('#mor-fund-num').parent().parent().removeClass('hide');
				$('#mod-state').parent().parent().removeClass('hide');
			} else if (64 == cType) {
				$('#fund-num').parent().parent().addClass('hide');
				$('#version').parent().parent().removeClass('hide');
				$('#number').parent().parent().removeClass('hide');
				$('#state').parent().parent().removeClass('hide');
				$('#mod-fund-num').parent().parent().addClass('hide');
				$('#mod-version').parent().parent().removeClass('hide');
				$('#mod-number').parent().parent().removeClass('hide');
				$('#mod-state').parent().parent().removeClass('hide');
			} else if (44 == cType) {
				$('#version').parent().parent().addClass('hide');
				$('#number').parent().parent().addClass('hide');
				$('#fund-num').parent().parent().addClass('hide');
				$('#state').parent().parent().addClass('hide');
				$('#mod-version').parent().parent().addClass('hide');
				$('#mod-number').parent().parent().addClass('hide');
				$('#mod-fund-num').parent().parent().addClass('hide');
				$('#mod-state').parent().parent().addClass('hide');
			} else {
				$('#version').parent().parent().addClass('hide');
				$('#number').parent().parent().addClass('hide');
				$('#fund-num').parent().parent().addClass('hide');
				$('#state').parent().parent().removeClass('hide');
				$('#mod-version').parent().parent().addClass('hide');
				$('#mod-number').parent().parent().addClass('hide');
				$('#mod-fund-num').parent().parent().addClass('hide');
				$('#mod-state').parent().parent().removeClass('hide');
			}
			if (44 == cType || 64 == cType || 61 == cType || 001 == cType) {
				var sign = location.search.split('=')[1];
				if (2 != sign) {
					$('.upload-pic').addClass('hide');
				} else {
					$('.upload-pic').removeClass('hide');
				}
			} else {
				$('.upload-pic').removeClass('hide');
			}
		},
		applyItem: function (data, type) {
			obj.ajaxFn('/userico/SubmitIco', {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('submit_success');
						if (2 == type) {
							msg = $.t('submit_draft');
						}
						$(".btn-default").click(function () {
							window.location.href = "./ico-publish.html";
						});
					} else {
						msg = '提交失败！';
					}
					obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').html(msg);
				}
			});
		},
		getApplyItem: function (id) {
			obj.ajaxFn('/userico/GetById', {
				data: {
					id: id
				},
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						var list = res.Data;
						tobj.icoImages = list.Image.split(',');
						$('#title').val(list.Title);
						$('#currency').val(list.Currency);
						$('#contactPersion').val(list.ContactPersion);
						$('#contactEmail').val(list.ContactEmail);
						$('#totalAmount').val(list.TotalAmount);
						$('#icoAmount').val(list.IcoAmount);
						$('#introduce').val(list.Introduce);
						$('#ico-content').val(list.Content);
						$('#docLinks').val(list.DocLinks);
						var itemList = JSON.parse(res.Data.ItemList),
							advanceItemList = JSON.parse(res.Data.AdvanceItemList),
							_isLocked = false,
							_setList = [];
						for (var i = 0; i < itemList.length; i++) {
							var _currency = itemList[i].Currency.toLowerCase();
							$('#item-' + _currency).addClass('active');
							$('.' + _currency + '-rate').removeClass('hide');
							$('.ExchangeRate.' + _currency).val(itemList[i].ExchangeRate * 100);
							$('.item-TotalVolume.' + _currency).val(itemList[i].TotalVolume);
						}
						if (0 < advanceItemList.length) {
							for (var i = 0; i < advanceItemList.length; i++) {
								if (advanceItemList[i].Currency) {
									_isLocked = true;
								} else {
									$('.set-bouns').addClass('active');
									_setList.push(advanceItemList[i]);
								}
							}
						}
						if (_isLocked) {
							$('.support-lock>li').removeClass('active');
							$('.locked').addClass('active');
							$('.link-lock').removeClass('hide');
							var _selects = $('.link-lock>.txt-info>select'),
								_startTimes = advanceItemList[0].StartTime,
								_endTimes = advanceItemList[0].EndTime;
							_selects.eq(0).val(_startTimes.split(' ')[0].split('-')[0]);
							_selects.eq(1).val(_startTimes.split(' ')[0].split('-')[1]);
							_selects.eq(2).val(_startTimes.split(' ')[0].split('-')[2]);
							_selects.eq(3).val(_startTimes.split(' ')[1].split(':')[0]);
							_selects.eq(4).val(_endTimes.split(' ')[0].split('-')[0]);
							_selects.eq(5).val(_endTimes.split(' ')[0].split('-')[1]);
							_selects.eq(6).val(_endTimes.split(' ')[0].split('-')[2]);
							_selects.eq(7).val(_endTimes.split(' ')[1].split(':')[0]);
						}
						if (0 < _setList.length) {
							var _sections = $('.section');
							$('.ico-bonus').removeClass('hide');
							for (var i = 0; i < _setList.length; i++) {
								_sections.eq(i).removeClass('hide');
								var _sels = _sections.eq(i).children('.form-group').children('.txt-info').children('select'),
									_startDatas = advanceItemList[i].StartTime,
									_endDatas = advanceItemList[i].EndTime;
								_sels.eq(0).val(_startDatas.split(' ')[0].split('-')[0]);
								_sels.eq(1).val(_startDatas.split(' ')[0].split('-')[1]);
								_sels.eq(2).val(_startDatas.split(' ')[0].split('-')[2]);
								_sels.eq(3).val(_startDatas.split(' ')[1].split(':')[0]);
								_sels.eq(4).val(_endDatas.split(' ')[0].split('-')[0]);
								_sels.eq(5).val(_endDatas.split(' ')[0].split('-')[1]);
								_sels.eq(6).val(_endDatas.split(' ')[0].split('-')[2]);
								_sels.eq(7).val(_endDatas.split(' ')[1].split(':')[0]);
							}
						}
						var _startTime = list.StartTime,
							_endTime = list.EndTime;
						var _by = _startTime.split(' ')[0].split('-')[0];
						var _bm = _startTime.split(' ')[0].split('-')[1];
						var _bd = _startTime.split(' ')[0].split('-')[2];
						var _bh = _startTime.split(' ')[1].split(':')[0];
						$('#ico-by').val(_by);
						$('#ico-bm').val(_bm);
						$('#ico-bd').val(_bd);
						$('#ico-bh').val(_bh);
						var _ey = _startTime.split(' ')[0].split('-')[0];
						var _em = _startTime.split(' ')[0].split('-')[1];
						var _ed = _startTime.split(' ')[0].split('-')[2];
						var _eh = _startTime.split(' ')[1].split(':')[0];
						$('#ico-ey').val(_ey);
						$('#ico-em').val(_em);
						$('#ico-ed').val(_ed);
						$('#ico-eh').val(_eh);

					} else {

					}
				}
			});
		},
		// 获取ico发起列表
		getIcoPublish: function (sign) {
			var url = '/userico/GetLaunchedPageList'
			if ('all' == sign) {
				url = '/userico/GetAllPageList'
				var data = {
					page: tobj.pageObj.page,
					pageSize: 9
				}
			} else {
				var data = {
					page: tobj.pageObj.page,
					pageSize: 9,
					status: sign
				}
			}
			obj.ajaxFn(url, {
				data: data,
				callback: function (res) {
					var list = [],
						html = '',
						_status = '',
						_href = '',
						_operation = '',
						_color = '',
						_hide = '';
					if (res.IsSuccess) {
						list = res.Data.Items;
						if (0 < list.length) {
							for (var i = 0; i < list.length; i++) {
								if (0 == list[i].Status) {
									_status = $.t('ico_drafts1');
									_href = './ico-apply.html'
									_operation = $.t('modify');
									_color = 'red';
									_hide = '';
								} else if (1 == list[i].Status) {
									_status = $.t('ico_under');
									_href = 'javascript:;'
									_operation = '';
									_color = 'red';
									_hide = 'hide';
								} else if (2 == list[i].Status) {
									_status = $.t('ico_failed');
									_href = './ico-apply.html'
									_operation = $.t('modify');
									_color = 'red';
									_hide = '';
								} else if (4 == list[i].Status) {
									_status = $.t('success');
									_href = './ico-details.html'
									_operation = $.t('check');
									_color = 'green';
									_hide = 'hide';
								} else if (8 == list[i].Status || 5 == list[i].Status) {
									_status = $.t('ico_active');
									_href = './ico-details.html'
									_operation = $.t('check');
									_color = 'green';
									_hide = 'hide';
								} else if (16 == list[i].Status) {
									_status = $.t('ico_success');
									_href = './ico-details.html'
									_operation = $.t('check');
									_color = 'green';
									_hide = 'hide';
								} else if (132 == list[i].Status) {
									_status = $.t('ico_failed');
									_href = './ico-details.html'
									_operation = $.t('check');
									_color = 'red';
									_hide = 'hide';
								} else if (64 == list[i].Status) {
									_status = $.t('ico_return');
									_href = 'javascript:;'
									_operation = '';
									_color = 'red';
									_hide = 'hide';
								} else if (128 == list[i].Status) {
									_status = $.t('ico_settle');
									_href = 'javascript:;'
									_operation = '';
									_color = 'green';
									_hide = 'hide';
								}

								html += '<tr>\
                              <td>' + list[i].CreateTime + '</td>\
                              <td>' + list[i].Title + '</td>\
                              <td>' + list[i].StartTime + '</td>\
                              <td>' + list[i].EndTime + '</td>\
                              <td class="' + _color + '">' + _status + '</td>\
                              <td><a class="ico-btn" href="' + _href + '?id=' + list[i].Id + '">' + _operation + '</a><a href="javascript:;" data-id="' + list[i].Id + '" class="' + _hide + ' ico-del">删除</a></td>\
                           </tr>';
							}
						} else {
							html = '<tr><td colspan="6">' + $.t('no_data') + '</td></tr>';
						}
						$('.ico-table>tbody').html(html);
						//删除列表
						$('.ico-del').on('click', function () {
							var that = $(this);
							var _id = that.data('id');
							tobj.delIcoPublish(_id);
							tobj.getIcoPublish();
						});
						if (1 < res.Data.TotalPage) {
							$('.pagination-list').removeClass('hide');
							tobj.pageObj.page = res.Data.CurrentPage;
							tobj.page(null, tobj.pageObj.page, res.Data.TotalPage, function (now, all) {
								tobj.pageObj.page = now;
								tobj.getIcoPublish(sign);
							});
							$('.turnover-log').css('top', '22px');
						} else {
							$('.pagination-list').empty().addClass('hide');
							$('.turnover-log').css('top', '10px');
						}
					} else {
						msg = res.ErrorMsg + '，' + $.t("get_fail");
						obj.modShow('#mod-prompt');
						$('#mod-prompt .tips-txt').text(msg);
					}
				}
			});
		},
		//删除ico发起列表
		delIcoPublish: function (id) {
			obj.ajaxFn('/userico/Delete', {
				data: {
					Id: id
				},
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('del_success');
					} else {

					}
					obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').html(msg);
				}
			});
		},
		showIcoList: function (page, status) {
			var _status = status || 1;
			obj.ajaxFn('/ico/GetList', {
				data: {
					page: 1,
					status: status
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data,
							html = '',
							_text = '',
							_hide = 'hide';
						if (9 > list.length) {
							$('.more').addClass('hide');
						} else {
							$('.more').removeClass('hide');
						}
						if (0 < list.length) {
							for (var i = 0; i < list.length; i++) {
								if (8 == list[i].Base.Status) {
									list[i].Base.Status = $.t('ico_active');
									_text = $.t("invest_in");
									_hide = 'hide';
								} else if (5 == list[i].Base.Status) {
									list[i].Base.Status = $.t('ico_active');
									_text = $.t("invest_in");
									_hide = '';
									if (list[i].Simple.AdvanceItemList[0] && list[i].Simple.AdvanceItemList[0].GroupId != 0) {
										_hide = 'hide';
									}
								} else if (4 == list[i].Base.Status) {
									_hide = 'hide';
									if (4 == status) {
										list[i].Base.Status = $.t('ico_active');
										_text = $.t("invest_in");
									} else {
										list[i].Base.Status = $.t('ico_up');
										_text = $.t('ico_view');
									}
								} else if (16 == list[i].Base.Status || 32 == list[i].Base.Status || 64 == list[i].Base.Status || 128 == list[i].Base.Status) {
									list[i].Base.Status = $.t('ico_end');
									_text = $.t('ico_view');
									_hide = 'hide';
								}
								if (list[i].Base.Id != '5a445e5cd6f8013d045da9dd') {
									html += '<li>\
										<div class="show-status">' + list[i].Base.Status + '</div>\
										<img src="' + list[i].Base.Image.split(',')[0] + '" alt="">\
										<p>' + list[i].Base.Title + '</p>\
										<p>' + list[i].Base.introduce + '</p>\
										<p class="hide"><span class="">' + list[i].Simple.ItemList[0].InvestVolume + '</span><span>' + list[i].Simple.ItemList[0].Currency.toUpperCase() + '</span><span class="schedule">' + ((list[i].Simple.ItemList[0].InvestVolume / (list[i].Simple.ItemList[0].TotalVolume || 1)) * 100).toFixed() + '%</span></p>\
										<progress class="processbar hide" id="processbar" max="100" value="' + ((list[i].Simple.ItemList[0].InvestVolume / (list[i].Simple.ItemList[0].TotalVolume || 1)) * 100).toFixed() + '"></progress>\
										<p class="aim hide">\
										<span>' + $.t("ico_goal") + '</span>\
										<span>' + list[i].Simple.ItemList[0].TotalVolume + '</span>\
										<span>' + list[i].Simple.ItemList[0].Currency.toUpperCase() + '</span>\
										</p>\
										<a href="./ico-details.html?id=' + list[i].Base.Id + '">' + _text + '</a>\
										<div class="ahead-locked ' + _hide + '">' + $.t("ico_process") + '</div>\
									</li>'
								}
							}
							// html += '<li>\
							// 	<div class="show-status">' + $.t('ico_up') + '</div>\
							// 	<img src="./imgs/bottos1.jpg" alt="">\
							// 	<p>' + $.t('ico_bottos') + '</p>\
							// 	<p>' + $.t('bottos_intro') + '</p>\
							// 	<p class="hide"><span class=""></span><span></span><span class="schedule"></span></p>\
							// 	<progress class="processbar hide" id="processbar" max="100" value=""></progress>\
							// 	<p class="aim hide">\
							// 	<span></span>\
							// 	<span></span>\
							// 	<span></span>\
							// 	</p>\
							// 	<a href="./ico-bottos.html">' + $.t('ico_view') + '</a>\
							// </li>'
						} else {
							html = '<li>' + $.t('no_data') + '</li>'
						}

						$('.ico-list').html(html);
					} else {

					}
				}
			});
		},
		getIcoDetails: function (id) {
			obj.ajaxFn('/ico/GetById', {
				data: {
					id: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var _data = res.Data;
						if (8 == _data.Status || 5 == _data.Status) {
							if (5 == _data.Status) {
								// $('.ahead-locked').removeClass('hide');
							}
						} else {
							$('.btn-join').css('pointer-events', 'none');
							$('.btn-join').css('background', '#D4D7E2');
							// $('.ahead-locked').addClass('hide');
						}
						$('.btn-joining').prop('href', './ico-invest.html?id=' + _data.Id);
						$('.ico-title').text(_data.Title);
						$('.ico-date').text(_data.StartTime + ' - ' + _data.EndTime);
						$('.picture>img').prop('src', _data.Image.split(',')[1]);
						var list = JSON.parse(res.Data.ItemList),
							html = '';
						for (var i = 0; i < list.length; i++) {
							// if (res.Data.Id == '5a445e5cd6f8013d045da9d2') {
							// 	html += '<span class="aim-amount">' + list[i].TotalVolume * 3 + '</span><span>' + list[i].Currency.toUpperCase() + '</span> ';
							// } else {
							html += '<span class="aim-amount">' + obj.getFloatValue(list[i].TotalVolume,2) + '</span><span>' + list[i].Currency.toUpperCase() + '</span> ';
							// }
							// $('.exchangeRate').eq(i).removeClass('hide').text('1'+list[i].Currency.toUpperCase()+'='+list[i].ExchangeRate+' '+_data.Currency.toUpperCase());
							$('.limit-total').eq(i).removeClass('hide').text(obj.getFloatValue(list[i].TotalVolume,2) + ' ' + list[i].Currency.toUpperCase());
							// if (res.Data.Id == '5a445e5cd6f8013d045da9d2') {
							// 	$('.limit-total').eq(i).removeClass('hide').text(list[i].TotalVolume * 3 + ' ' + list[i].Currency.toUpperCase());
							// }
						}
						$('.ico-amount').html(html);
						$('.ico-currency').text(_data.Currency.toUpperCase());
						$('.totalAmount').text(obj.getFloatValue(_data.TotalAmount,2));
						$('.icoAmount').text(obj.getFloatValue(_data.IcoAmount,2));
						var item = JSON.parse(res.Data.AdvanceItemList),
							_isLocked = false,
							_isBird = false,
							_lockDate = [],
							_text = '';
						if (0 < item.length) {
							for (var i = 0; i < item.length; i++) {
								if (0 == item[i].GroupId) {
									_isLocked = true;
									$('.locked-num').eq(i).removeClass('hide').text(obj.getFloatValue(item[i].TotalVolume,2) + ' ' + item[i].Currency.toUpperCase());
									// if (res.Data.Id == '5a445e5cd6f8013d045da9d2') {
									// 	$('.locked-num').eq(i).removeClass('hide').text(item[i].TotalVolume * 3 + ' ' + item[i].Currency.toUpperCase());
									// }
									_text += '1' + item[i].Currency.toUpperCase() + '=' + obj.getFloatValue(item[i].BonusRate,2) + _data.Currency.toUpperCase() + ' ';
								} else {
									$('.award').removeClass('hide');
									_isBird = true;
								}
							}
							if (_isBird) {
								for (var j = 1; j <= item[item.length - 1].GroupId; j++) {
									var _text1 = '',
										arr = [];
									for (var i = 0; i < item.length; i++) {
										if (j == item[i].GroupId) {
											arr.push(item[i]);
										}
									}
									for (k = 0; k < arr.length; k++) {
										_text1 += '1' + arr[k].Currency.toUpperCase() + '=' + obj.getFloatValue(arr[k].BonusRate,2) + _data.Currency.toUpperCase() + ' ';
									}
									$('.lock-date').eq(j - 1).text(arr[0].StartTime + ' ' + arr[0].EndTime);
									$('.first-bonus').eq(j - 1).removeClass('hide').text(_text1);
									$('.first-show').eq(j - 1).removeClass('hide');
								}
							}

							$('.locked-bonus').text(_text);
							if (_isLocked) {
								$('.lock').removeClass('hide');
								$('.locked-date').text(item[0].StartTime + ' ' + item[0].EndTime);
							}
						}
						// if(0 < item.length){
						//    $('.locked-date').text(item[0].StartTime+' '+item[0].EndTime);
						//    $('.locked-bonus').text(item[0].BonusRate*100+'%');
						//    for(var i = 0; i < item.length; i++){
						//       if(item[i].Currency){
						//          _isLocked = true;
						//          $('.locked-num').eq(i).removeClass('hide').text(item[i].TotalVolume+' '+item[i].Currency);
						//       }else{
						//          _lockDate.push(item[i]);
						//       }
						//    }
						//    if(_isLocked){
						//       $('.lock').removeClass('hide');
						//    }
						// }
						// if(0 < _lockDate.length){
						//    $('.award').removeClass('hide');
						//    for(var i = 0; i < _lockDate.length; i++){
						//       $('.first-show').eq(i).removeClass('hide');
						//       $('.lock-date').eq(i).text(_lockDate[i].StartTime+' '+_lockDate[i].EndTime);
						//       $('.first-bonus').eq(i).text(_lockDate[i].BonusRate*100+'%');
						//    }
						// }
					} else {

					}
				}
			});
		},
		getSimpleData: function (id) {
			obj.ajaxFn('/ico/GetSimpleDataById', {
				data: {
					id: id
				},
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						var _data = res.Data;
						$('.tip').text(_data.Title);
						$('#ico-title').val(_data.Title);
						$('.ico-cancel').prop('href', './ico-details.html?id=' + _data.Id);
						var list = _data.ItemList,
							html = '<option value="">' + $.t("ico_choose") + '</option>',
							item = _data.AdvanceItemList;
						for (var i = 0; i < list.length; i++) {
							html += '<option value="' + list[i].Currency + '">' + list[i].Currency.toUpperCase() + '</option>';
							if (item[i].TotalVolume != 0) {
								var _asset = item[i].TotalVolume - item[i].InvestVolume;
							} else {
								var _asset = list[i].TotalVolume - list[i].InvestVolume;
							}
							tobj.simpleData.push({
								"currency": list[i].Currency,
								"asset": _asset,
								"limited": list[i].Limited
							})
						}
						$('.ico-currency').html(html);
					} else {

					}
				}
			});
		},
		getBalance: function (id) {
			obj.ajaxFn('/MyAccount/GetBalance', {
				data: {
					currencyId: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						$('.account').text(res.Data + ' ' + id.toUpperCase());
					} else {

					}
				}
			});
		},
		submitInvest: function (data) {
			obj.ajaxFn('/userico/InvestIco', {
				data: data,
				callback: function (res) {
					var msg = '';
					if (res.IsSuccess) {
						msg = $.t('ico_payment');
						$(".certain-support").click(function () {
							window.location.href = "./ico-support.html";
						});
					} else {
						if (201 == res.Code) {
							msg = $.t('otp');
						} else if (133 == res.Code) {
							msg = $.t('trade_error');
						} else if (-1 == res.Code) {
							msg = $.t('ico_not');
						} else if (-2 == res.Code) {
							msg = $.t('ico_has');
						} else if (-3 == res.Code) {
							msg = $.t('ico_allocation');
						} else if (-4 == res.Code) {
							msg = $.t('ico_person');
						} else {
							msg = res.ErrorMsg;
						}
					}
					obj.modShow('#mod-prompt1');
					$('#mod-prompt1 .tips-txt').html(msg);
				}
			});
		},
		getSupportItem: function (status) {
			if ('all' == status) {
				data = {
					"page": 1,
					"isAll": true
				};
			} else {
				data = {
					"page": 1,
					status: status
				};
			}
			obj.ajaxFn('/UserIco/GetInvestPageList', {
				data: data,
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data.Items,
							html = '';
						for (var i = 0; i < list.length; i++) {
							if (1 == list[i].Ico.Status) {
								list[i].Ico.Status = $.t('ico_unfinish');
							} else if (2 == list[i].Ico.Status) {
								list[i].Ico.Status = $.t('ico_received');
							} else if (3 == list[i].Ico.Status) {
								list[i].Ico.Status = $.t('ico_failed')
							}
							var items = list[i].InvestList,
								html1 = '',
								refunds = 0,
								allocate = 0;
							for (var j = 0; j < items.length; j++) {
								refunds += items[j].AllocateVolume;
								allocate += items[j].Volume;
								if (0 == items[j].Status) {
									items[j].Status = $.t('ico_failed');
								} else if (1 == items[j].Status) {
									items[j].Status = $.t('success');
								} else if (2 == items[j].Status) {
									items[j].Status = $.t('ico_party');
								} else if (4 == items[j].Status) {
									items[j].Status = '等待分配';
								} else if (8 == items[j].Status) {
									items[j].Status = $.t('ico_success');
								} else if (16 == items[j].Status) {
									items[j].Status = $.t('ico_return');
								}
								html1 += '<tr>\
                                       <td>' + items[j].Id + '</td>\
                                       <td>' + items[j].CreateTime + '</td>\
                                       <td>' + items[j].AllocateVolume + ' ' + items[j].IcoCurrency.toUpperCase() + '</td>\
                                       <td>' + items[j].Volume + ' ' + items[j].Currency.toUpperCase() + '</td>\
                                       <td>' + items[j].Status + '</td>\
                                    </tr>';
								// $('.table-two>thead').html(html1);
							}
							html += '<table class="log-table table-one">\
                                 <thead>\
                                    <tr>\
                                       <th>' + $.t("ico_name") + '</th>\
                                       <th>' + $.t("ico_repay") + '</th>\
                                       <th>' + $.t("ico_pay") + '</th>\
                                       <th>' + $.t("state") + '</th>\
                                    </tr>\
                                 </thead>\
                                 <tbody>\
                                    <tr>\
                                       <td>' + list[i].Ico.IcoName + '</td>\
                                       <td>' + refunds + '</td>\
                                       <td>' + allocate + '</td>\
                                       <td>' + list[i].Ico.Status + '</td>\
                                    </tr>\
                                 </tbody>\
                              </table>\
                              <table class="log-table table-two">\
                                 <thead>\
                                    <tr>\
                                       <th>' + $.t("ico_order") + '</th>\
                                       <th>' + $.t("ico_time") + '</th>\
                                       <th>' + $.t("ico_repay1") + '</th>\
                                       <th>' + $.t("ico_pay1") + '</th>\
                                       <th>' + $.t("ico_status") + '</th>\
                                    </tr>\
                                 </thead>\
                                 <tbody>' + html1 + '</tbody>\
                              </table>';
						}
						$('.support-list').html(html);
					} else {

					}
				}
			});
		},
		getSimpleData1: function (id) {
			obj.ajaxFn('/ico/GetSimpleDataById', {
				data: {
					id: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data.ItemList,
							item = res.Data.AdvanceItemList,
							_people = 0,
							_invest = 0,
							_total = 0;
						if (item[0].GroupId == 0 && res.Data.Status == 5) {
							$('.ahead-locked').removeClass('hide');
						} else {
							$('.ahead-locked').addClass('hide');
						}
						for (var i = 0; i < list.length; i++) {
							_people += list[i].Participants;
							// _invest += list[i].InvestVolume;
							// _total += list[i].TotalVolume;
							$('.onbar').eq(i).removeClass('hide');
							$('.processbar').eq(i).removeClass('hide');
							$('.coin-num').eq(i).text(obj.getFloatValue(list[i].InvestVolume,2) + ' ' + list[i].Currency.toUpperCase());
							// if (res.Data.Id == '5a445e5cd6f8013d045da9d2') {
							// 	$('.coin-num').eq(i).text(list[i].InvestVolume * 3 + ' ' + list[i].Currency.toUpperCase());
							// }
							var _schedule = ((list[i].InvestVolume / (list[i].TotalVolume || 1)) * 100).toFixed(2)
							$('.schedule').eq(i).text(_schedule + '%');
							$('.processbar').eq(i).prop('value', obj.getFloatValue(list[i].InvestVolume,2));
							$('.processbar').eq(i).prop('max', obj.getFloatValue(list[i].TotalVolume,2));
							if (id != '5a6e9442d6f80143405dfc4c') {
								//个人上线
								$('.limit-indivi').removeClass('hide');
								$('.limit-indivi').eq(i + 1).text(list[i].Limited + ' ' + list[i].Currency.toUpperCase());
							} else {
								$('.limit-low ').removeClass('hide');
							}
						}
						$('.join-num').text(_people);
						// if (res.Data.Id == '5a445e5cd6f8013d045da9d2') {
						// 	$('.join-num').text(_people * 3);
						// }
					} else {

					}
				}
			});
		},
		//获取活动id
		getActivityIds: function (id) {
			obj.ajaxFn('/Activity/GetActivityIds', {
				data: {
					status: 1,
					index: 1,
					size: 1
				},
				callback: function (res) {
					if (res.IsSuccess) {
						if (res.Data) {
							var _id = res.Data[0];
							tobj.getCanyaTrade(id);
						}
					} else {

					}
				}
			});
		},
		//获得个人交易量、排名信息
		getCanyaRanking: function (id, num) {
			obj.ajaxFn('/Activity/GetActivityUserInfo', {
				data: {
					activityId: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						if (res.Data) {
							$('.can-volume').text(res.Data.TradeVolume);
							$('.can-rank').text(res.Data.Num);
							if (0 == res.Data.Num) {
								$('.can-rank').text('> 30');
								$('.can-last').removeClass('hide');
							}
							if (num) {
								$('.can-differ').text(obj.getFloatSub(num, res.Data.TradeVolume));
							} else {
								$('.can-differ').text('0');
							}
						} else {
							$('.can-volume').text('0');
							$('.can-rank').text('> 30');
							$('.can-last').removeClass('hide');
							$('.can-differ').text(num);
						}

					} else {

					}
				}
			});
		},
		//获得前50名交易量信息
		getCanyaTrade: function (id) {
			obj.ajaxFn('/Activity/GetActivityRankList', {
				data: {
					activityId: id
				},
				callback: function (res) {
					if (res.IsSuccess) {
						var list = res.Data,
							html = '',
							_num = 0;
						for (var i = 0; i < list.length; i++) {
							html += '<tr>\
										<td>' + list[i].Num + '</td>\
										<td>' + list[i].Email + '</td>\
										<td>' + list[i].TradeVolume + '</td>\
									</tr>'
						}
						if (html) {
							$('.tal-canya>tbody').html(html);
						} else {
							$('.tal-canya>tbody').html('<td colspan="3" style="text-align:center;">' + $.t('no_data') + '</td>');
						}
						if (30 <= list.length) {
							_num = list[29].TradeVolume;
						} else {
							_num = 0;
						}
						if (obj.sign) {
							tobj.getCanyaRanking(id, _num);
						}
					} else {

					}
				}
			});
		},
		//提交限价设置
		// setLimitSet:function(){
		//    obj.ajaxFn('/user/SetUserConfig',{
		//       data: data,
		//       callback: function(res){

		//          if(res.IsSuccess){
		//             console.log(res);
		//          }else{
		//             msg = res.ErrorMsg||$.T('cancellation');
		//             $('#mod-buz .error-tips').html(msg);
		//          }
		//       }
		//    });
		// },
	};
	if (0 != $('.my-order').length) {
		obj.resizeHeight();
		tobj.getBaseMarketList();
		if (tobj.getMarketId()) {
			tobj.getOrders();
			tobj.timer = setInterval(function () {
				tobj.getOrders();
			}, 1000 * 30);
		}
		// 撤销挂单
		$('.table-order').on('click', '>tbody>tr>td>a', function () {
			var _id = $(this).attr('data-id'),
				_type = $(this).attr('data-type'),
				_order = $(this).attr('data-order'),
				$td = $('.table-order.show').find('tr>td').eq(1).text().toLowerCase(),
				marketId;
			$('#to-addr').attr('data-sign', 'cancel');
			if (-1 != $td.indexOf('/')) {
				marketId = $td.split('/');
				tobj.cancelObj = {
					marketId: marketId[0] + '_' + marketId[1],
					category: _type,
					orderType: _order,
					orderId: _id,
					tradePassword: ''
				};
				tobj.cancelOrder();
			} else {
				obj.hideTips($.t('market_id'), 'green');
			}
			//tobj.isNeedPwd();
		});
		// 批量撤销挂单
		$('.table-order').on('click', '>thead>tr>th>.batch-back', function () {
			var that = $(this),
				category = that.attr('data-type'),
				$tr = $('.table-order.show>tbody>tr');
			if (0 != $tr.length) {
				tobj.cancelAllObj = {
					marketId: tobj.marketId,
					orderCategory: category,
					tradePassword: ''
				};
				if (tobj.marketId == '') {
					$('#mod-cancel .tips-txt').html($.t('cancel_order'));
				} else {
					var _market = tobj.marketId.split('_').join('/').toUpperCase();
					$('#mod-cancel .tips-txt').html($.t('Whether_with') + _market + $.t('order_market'));
				}
				$('#mod-cancel').on('click', '>.mod-body>.tips-btn>.btn-default', function () {
					tobj.cancelAllOrder();
				});
				obj.modShow('#mod-cancel');
				// tobj.cancelAllOrder();
			} else {
				obj.hideTips($.t('pend_order'), 'green');
			}
			//tobj.isNeedPwd(1);
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
				tobj.setTradePwdType($form, data, 'modify');
			});
		}
	} else if (0 != $('.order-history').length) {
		tobj.getBaseMarketList();
		// $('.check').on('click',function(){
		//    var table = $('.actionArrow');
		//    if(table.css('display')=='none'){
		//       table.css('display','table-row');
		//    }else{
		//       table.css('display','none');
		//    }
		// })
		var that = {
			sign: null,
			type: ''
		};
		$('.table-order').on('click', '.operate-capital a[data-type]', function () {
			var type = $(this).attr('data-type'),
				$tr = $(this).closest('.operate-capital'),
				_sign = $tr.attr('data-id').toLowerCase(),
				$arrow = $('.actionArrow'),
				orderId = $tr.attr('data-id'),
				orderType = $tr.attr('data-type'),
				marketId = $tr.attr('data-sign'),
				// targetTop = $tr.offset().top-($(window).innerHeight()-$('.mod-'+type).height()/2),
				$btn;
			tobj.getTradeOrder(marketId, orderType, orderId);
			if (1 == type) {
				$('.actionArrow').eq(0).insertAfter($tr);
			} else {
				$('.actionArrow').eq(1).insertAfter($tr);
			}

			// for(var i=0;i<tobj.assetList.length;i++){
			//    if(tobj.assetList[i].CurrencyId.toLowerCase()===_sign){
			//       tobj.detail = tobj.assetList[i];
			//       break;
			//    }
			// }
			// clearInterval(tobj.addrTimer);
			if (that.sign != _sign) {
				$arrow.addClass('show');
			} else if (that.sign == _sign && that.type != type) {
				$arrow.addClass('show');
			} else {
				if ($arrow.hasClass('show')) {
					$arrow.removeClass('show');
				} else {
					$arrow.addClass('show');
				}
			}
			$('.operate-capital a').each(function () {
				$(this).removeClass('on');
			});
			if (!$(this).hasClass('on')) {
				$(this).addClass('on');
			}
			$('.operate-capital').removeClass('active');
			if (!$tr.hasClass('active')) {
				$tr.addClass('active');
			} else if (!$('.actionArrow').hasClass('show')) {
				$('.operate-capital').removeClass('active');
			}
			that.type = type;
			that.sign = _sign;
		});
		if (tobj.getMarketId()) {
			tobj.getHistoryOrders();
			// tobj.timer = setInterval(function(){
			//    tobj.getHistoryOrders();
			// },1000*30);
		}
	} else if (0 != $('.my-realname').length) {
		tobj.getCertification();
		tobj.GetCertificationCount();
		tobj.birthday();
		setTimeout(function () {
			if (!$('.default-txt').length) {
				tobj.getType();
			}
		}, 500);
		if (!obj.account) {
			location.href = './login.html';
		}
		$('#realname').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('realname2') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		$('#certificate-num').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('id_passport1') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		// 提交认证信息
		$('#submit-info').on('click', function (e) {
			e.preventDefault();
			var that = $(this),
				data = {},
				type = 1,
				_name = '',
				_cty = $('.default-txt').length,
				_ctyNum = '',
				_state = $('#state').val().trim() || '',
				_city = $('#city').val().trim() || '',
				_street = $('#street').val().trim() || '',
				_buildingNum = $('#buildingNum').val().trim() || '',
				_apartmentNum = $('#apartmentNum').val().trim() || '',
				_postcode = $('#postcode').val().trim() || '',
				_forename = $('#forename').val().trim() || '',
				_surname = $('#surname').val().trim() || '',
				_birthday = '',
				_month = '',
				_day = '',
				$span = $('.sel_area>span'),
				_country = '',
				_countryNum = '',
				_livingAddress = {},
				_number = '',
				_version = '',
				_identityDoc = {},
				flag = true,
				_empty = $.t('cannot_empty'),
				_isAuto = true,
				_imgs = '';
			if (!$('.upload-pic').hasClass('hide')) {
				_isAuto = false;
				_imgs = tobj.imgs;
				if (3 != tobj.imgs.length) {
					flag = false;
					obj.hideTips($.t('handheld'), 'green');
				}
			}
			if (_cty) {
				flag = false;
				tobj.getTips2($('.sel_area'), $.t('certificate_area') + _empty);
			} else {
				_cty = $span.eq(0).text().replace(/[^a-z ]/ig, "").trim();
				_ctyNum = $span.eq(0).data('val');
				_country = $span.eq(1).text().replace(/[^a-z ]/ig, "").trim();
				_countryNum = $span.eq(1).data('val');
			}

			if (1 == $('select[name=month]').val().length) {
				_month = 0 + $('select[name=month]').val();
			} else {
				_month = $('select[name=month]').val();
			}
			if (1 == $('select[name=day]').val().length) {
				_day = 0 + $('select[name=day]').val();
			} else {
				_day = $('select[name=day]').val();
			}
			_birthday = $('select[name=year]').val() + _month + _day;
			_livingAddress = {
				"Country": _country,
				"City": _city,
				"BuildingNum": _buildingNum,
				"State": _state,
				"Street": _street,
				"ApartmentNum": _apartmentNum
			};
			_livingAddress = JSON.stringify(_livingAddress);
			_name = {
				"ForeName": _forename,
				"SurName": _surname
			};
			_name = JSON.stringify(_name);
			if (001 == _ctyNum) {
				_type = 4;
				_number = $('#fund-num').val().trim() || '';
				_identityDoc = JSON.stringify({
					"Number": _number
				});
				if (!_number) {
					flag = false;
					tobj.getTips2($('#fund-num'), $.t('ssn') + _empty);
				}
				data = {
					type: _type,
					country: _ctyNum,
					countryName: _cty,
					livingAddress: _livingAddress,
					livingCode: _countryNum,
					name: _name,
					birthday: _birthday,
					postcode: _postcode,
					identityDoc: _identityDoc,
					isAuto: _isAuto,
					images: _imgs
				};
			} else if (64 == _ctyNum) {
				_type = 3;
				_number = $('#number').val().trim() || '';
				_version = $('#version').val().trim() || '';
				_identityDoc = JSON.stringify({
					"Number": _number,
					"Version": _version
				});
				if (!_number) {
					flag = false;
					tobj.getTips2($('#number'), $.t('license_num') + _empty);
				}
				if (!_version) {
					flag = false;
					tobj.getTips2($('#version'), $.t('codeversion') + _empty);
				}
				data = {
					type: _type,
					country: _ctyNum,
					countryName: _cty,
					livingAddress: _livingAddress,
					livingCode: _countryNum,
					name: _name,
					birthday: _birthday,
					postcode: _postcode,
					identityDoc: _identityDoc,
					isAuto: _isAuto,
					images: _imgs
				};
			} else if (61 == _ctyNum || 44 == _ctyNum) {
				_type = 0;
				data = {
					type: _type,
					country: _ctyNum,
					countryName: _cty,
					livingAddress: _livingAddress,
					livingCode: _countryNum,
					name: _name,
					birthday: _birthday,
					postcode: _postcode,
					isAuto: _isAuto,
					images: _imgs
				};
			} else {
				_type = 0;
				data = {
					type: _type,
					country: _ctyNum,
					countryName: _cty,
					livingAddress: _livingAddress,
					livingCode: _countryNum,
					name: _name,
					birthday: _birthday,
					postcode: _postcode,
					isAuto: _isAuto,
					images: _imgs
				};
			}
			if (44 == _ctyNum) {
				_livingAddress = {
					"Country": _country,
					"City": _city,
					"BuildingNum": _buildingNum,
					"State": "",
					"Street": _street,
					"ApartmentNum": _apartmentNum
				};
				_livingAddress = JSON.stringify(_livingAddress);
				data = {
					type: _type,
					country: _ctyNum,
					countryName: _cty,
					livingAddress: _livingAddress,
					livingCode: _countryNum,
					name: _name,
					birthday: _birthday,
					postcode: _postcode,
					isAuto: _isAuto,
					images: _imgs
				};
			} else {
				if (!_state) {
					flag = false;
					tobj.getTips2($('#state'), $.t('state_city') + _empty);
				}
			}
			if (!_imgs) {
				delete data.images;
			}
			if (!_forename) {
				flag = false;
				tobj.getTips2($('#forename'), $.t('realname2') + _empty);
			}
			if (!_surname) {
				flag = false;
				tobj.getTips2($('#surname'), $.t('realname2') + _empty);
			}
			if (!_city) {
				flag = false;
				tobj.getTips2($('#city'), $.t('city2') + _empty);
			}
			if (!_street) {
				flag = false;
				tobj.getTips2($('#street'), $.t('street') + _empty);
			}
			if (!_buildingNum) {
				flag = false;
				tobj.getTips2($('#buildingNum'), $.t('build_num') + _empty);
			}
			if (!_ctyNum) {
				flag = false;
				tobj.getTips2($('.sel_area'), $.t('choose_area'));
			}
			// if(!_apartmentNum){
			//    flag = false;
			//    tobj.getTips2($('#apartmentNum'),$.t('apart_num')+_empty);
			// }
			if (!$('select[name=year]').val() || !$('select[name=month]').val() || !$('select[name=day]').val()) {
				flag = false;
				tobj.getTips2($('select[name=day]'), $.t('date_day') + _empty);
			}
			if (!_postcode) {
				flag = false;
				tobj.getTips2($('#postcode'), $.t('postcode') + _empty);
			}
			if (flag) {
				tobj.getType();
				// that.prop('disabled',false).find('span').text($.t('commit'));
				$('#mod-area').val(_cty);
				$('#mode-birth').val(_birthday);
				$('#mod-forename').val(_forename);
				$('#mod-surname').val(_surname);
				$('#mod-country').val(_country);
				$('#mod-state').val(_state);
				$('#mod-city').val(_city);
				$('#mod-street').val(_street);
				$('#mod-buildingNum').val(_buildingNum);
				$('#mod-apartmentNum').val(_apartmentNum);
				$('#mod-postcode').val(_postcode);
				$('#mod-fund-num').val(_number);
				$('#mod-version').val(_version);
				$('#mod-number').val(_number);
				obj.modShow('#mod-prompt3');
				$('#btn-certify').off('click');
				$('#btn-certify').on('click', function () {
					tobj.realnameFromAbroad(data, that);
					obj.modHide('#mod-prompt3');
					obj.modShow('#mod-prompt2');
				})
			}
		});

		// 图片上传
		$('.upload-pic').on('click', 'label', function () {

			var that = $(this);
			that.closest('.upload-pic').find('li').each(function () {
				$(this).find('img').removeClass('on');
			})
			that.siblings('img').addClass('on');
		});
		$('#upload-name').on('change', function (e) {
			$('.upload-pic>li>img.on').prop({
				'src': './imgs/loading.gif'
			});
			var files = $(this).prop('files')[0],
				that = $(this),
				allowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
			if (files) {
				if (-1 == allowed.indexOf(files.type)) {
					obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').text($.t('format'));
				} else {
					obj.ajaxUpload($('#upload-img'), {
						callback: function (res) {
							obj.modHide('#mod-prompt2');
							if ('SUCCESS' == res.state) {
								// setTimeout(function () {
								$('.upload-pic>li>img.on').prop({
									'src': res.url
								});
								// }, 3300);
								tobj.imgs.push(res.url);
								// tobj.imgs.push({name: files.name,url: res.url});
							} else {
								obj.hideTips($.t('upload_limit') + 'jpg,jpeg,png,gif');
							}
						},
						_errorCallback: function (error) {
							obj.hideTips('上传失败，请重试！');
						}
					});
				}
			} else {
				obj.hideTips($.t('upload_limit') + 'jpg,jpeg,png,gif');
			}
		});
	} else if (0 != $('.my-realname2').length) {
		tobj.getUserPhone();
		tobj.getCertification();
		tobj.GetCertificationCount();
		tobj.getAllBankCardList();
		tobj.birthday();

		obj.getAuthType({
			callback: function (res) {
				var type = null;
				if (res.IsSuccess) {
					type = res.Data;
					/*if((1==type) ||(4==type)||(5==type)){
					   $('.code-box').eq(0).removeClass('hide');
					   $('.code-box').eq(1).removeClass('hide');
					}else */
					if ((2 == type) || (3 == type) || (6 == type) || (7 == type)) {
						$('.code-box').addClass('hide');
					}
				}
			}
		});

		if (!obj.account) {
			location.href = './login.html';
		}
		$('#submit-info').on('click', function () {
			var that = $(this),
				_area = $('.default-txt').length,
				_country = '',
				_cName = '',
				$span = $('.txt-info .sel_area>span'),
				_livingAddress = $('#province').val().trim() + '-' + $('#city').val().trim() + '-' + $('#address').val().trim(),
				_postcode = $('#postcode').val().trim(),
				_surName = $('#surname').val().trim(),
				_foreName = $('#forename').val().trim(),
				_birthday = $('select[name=year]').val() + '-' + $('select[name=month]').val() + '-' + $('select[name=day]').val(),
				_card = $('#certificate-num').val().trim(),
				_branch = '',
				_bank = $('#bank-num').val().trim(),
				_bankType = $('.open-account').length,
				data = {},
				flag = true,
				_empty = $.t('cannot_empty');

			if (!tobj.pass) {
				if (_area) {
					flag = false;
					tobj.getTips2($('.sel_area'), $.t('certificate_area') + _empty);
				} else {
					_area = $span.text();
					_country = $span.data('val');
				}
				if (!_surName) {
					flag = false;
					tobj.getTips2($('#surname'), $.t('realname2') + _empty);
				}
				if (!_foreName) {
					flag = false;
					tobj.getTips2($('#forename'), $.t('realname2') + _empty);
				}
				if (!_card) {
					flag = false;
					tobj.getTips2($('#certificate-num'), $.t('id_card2') + _empty);
				}
				if (!_bank) {
					flag = false;
					tobj.getTips2($('#bank-num'), $.t('bank_num') + _empty);
				}
				if (!_postcode) {
					flag = false;
					tobj.getTips2($('#postcode'), $.t('postcode') + _empty);
				}
				if (!$('#address').val()) {
					flag = false;
					tobj.getTips2($('#address'), $.t('addres') + _empty);
				}
				if (!$('#province').val() || !$('#city').val()) {
					flag = false;
					tobj.getTips2($('#city'), $.t('city1') + _empty);
				}
				if (!$('select[name=year]').val() || !$('select[name=month]').val() || !$('select[name=day]').val()) {
					flag = false;
					tobj.getTips2($('select[name=day]'), $.t('date_day') + _empty);
				}
				// if(!_branch){
				//    flag=false;
				//    tobj.getTips2($('#branch'),$.t('bank_branch2')+_empty);
				// }
				if (_bankType) {
					flag = false;
					tobj.getTips2($('.bank-type'), $.t('open_bank') + _empty);
				} else {
					_bankType = $('.bank-type>span').attr('data-val');
				}
			} else {}
			if (flag) {
				if (!tobj.pass) {
					data = {
						country: _country,
						countryName: _area,
						livingAddress: _livingAddress,
						postcode: _postcode,
						surName: _surName,
						foreName: _foreName,
						birthday: _birthday,
						cardNumber: _card,
						branchBank: _branch,
						bankcardNumber: _bank,
						bankType: _bankType /*,province: _province,cityName: _city*/
					};
				}
				// that.prop('disabled',true).find('span').text($.t('commit'));
				$('#mod-area').val(_area);
				$('#mod-name').val(_surName + _foreName);
				$('#mod-city').val($('#province').val().trim() + '-' + $('#city').val().trim());
				$('#mod-address').val($('#address').val().trim());
				$('#mod-postcode').val(_postcode);
				$('#mod-card').val(_card);
				$('#mod-birthday').val(_birthday);
				$('#mod-bank').val($('.bank-type>span').text().trim());
				$('#mod-num').val(_bank);
				obj.modShow('#mod-prompt3');
				$('#btn-certify').off('click');
				$('#btn-certify').on('click', function () {
					tobj.realnameFromInternal(data, that);
					obj.modHide('#mod-prompt3');
					obj.modShow('#mod-prompt4');
				})
			}
		});
		$('#realname').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('realname2') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		$('#certificate-num').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('id_card2') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		$('#bank-num').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('bank_num') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		$('#branch').on('blur', function () {
			var that = $(this),
				_val = that.val().trim(),
				msg = '';

			if (!_val) {
				msg = $.t('open_bank') + $.t('cannot_empty');
			}
			tobj.getTips2($(this), msg);
		});
		$('#pic_code,#phone').on('input', function () {
			var _val = $('#pic_code').val(),
				_phone = $('#phone').val(),
				$box = $('.code-box'),
				$box1 = $($box[1]),
				$box2 = $($box[2]);
			if (!!_val && !!_phone) {
				$box2.removeClass('hide');
			} else {
				$box2.addClass('hide');
			}
			if (!!_phone) {
				$box1.removeClass('hide');
			} else {
				$box1.addClass('hide');
			}
		});
		$('#phone').on('focus', function () {
			$('#pic-captcha').trigger('click');
		});
		$('#phone').on('blur', function () {
			var val = $(this).val();
			if (val && (val.length != 11)) {
				tobj.getTips2($('#phone'), $.t('phone_equal'));
			} else {
				tobj.getTips2($('#phone'), null);
			}
		});
		$('.btn-validate').on('click', function () {
			var that = $(this),
				_phone = $('#phone').val(),
				_code = $('#pic_code').val(),
				data = {},
				_type = that.attr('data-type');

			if (!!_phone && !!_code) {
				data = {
					phoneNumber: _phone,
					captchaCode: _code
				};
				if ('voice' == _type) {
					data = {
						phoneNumber: _phone,
						captchaCode: _code,
						isVoice: true
					};
				}
			}
			if (11 == _phone.length) {
				obj.getCaptcha(data, that, null, function (opts) {
					var $pic = $('#pic-captcha'),
						$code = $('#code');
					if (opts.type) {
						if (-3 == opts.code) {
							$pic.trigger('click');
							$pic.focus();
							tobj.getTips2($pic, opts.msg);
						} else if (-1 == opts.code) {
							$code.focus();
							tobj.getTips2($code, opts.msg);
						}
					} else {
						$pic.parent().find('.error').remove();
						$pic.parent().find('.box-tips.show').remove();
						$('#code').parent().find('.box-tips.show').remove();
					}
				});
			} else {
				tobj.getTips2($('#phone'), $.t('phone_equal'));
			}

		});
	} else if (0 != $('.my-gugValidate').length) {
		tobj.getOtpSecretKey();
		tobj.getAuthTypes();
		obj.submitForm('.my-gugValidate', '#otp-btn');
		// opt认证
		$('#otp-btn').on('click', function () {
			var that = $(this),
				data = {},
				_captcha = $('#otp-captcha').val().trim(),
				_code = $('#otp-code').val().trim(),
				flag = true;
			_bool = $('#otp-captcha').parent().hasClass('hide');
			if (!_code) {
				flag = false;
				$('#otp-code').focus();
				tobj.getTips($('#otp-code'), $.t('empty_opt'));
			} else {
				tobj.getTips($('#otp-code'), null);
			}
			if (!_captcha && !_bool) {
				flag = false;
				$('#otp-captcha').focus();
				tobj.getTips($('#otp-captcha'), $.t('empty_phone'));
			} else {
				tobj.getTips($('#otp-captcha'), null);
			}
			if (flag) {
				that.prop('disabled', true).text($.t('commit'));
				data = {
					code: _code,
					captcha: _captcha
				};
				tobj.bindOtp(data, that);
			}
		});
	} else if (0 != $('.my-safeStrategy').length) {
		tobj.getTradePwdType(0);
		tobj.getUserCofig();
		// 交易类型选择
		$('.operate-option').on('click', function () {
			var _sign = parseInt($(this).attr('data-sign')),
				$li = $(this).closest('ul').parent();
			if (!!_sign) {
				if ($li.hasClass('show')) {
					$li.removeClass('show');
				} else {
					$li.addClass('show');
				}
			}
		});
		$('.operate-radio').on('click', '>li>button', function () {
			var _txt = $(this).prev().text(),
				$radio = $(this).closest('.operate-radio'),
				that = $(this);

			tobj.that = that;

			$('#mod-setTradeType .txt-tip.error').remove();
			obj.modShow('#mod-setTradeType');
			// 设置交易类型
		});
		$('#set-type').on('click', function () {
			var val = $(this).closest('form').find('#trade-pwd').val().trim(),
				data = {
					password: val,
					auditType: tobj.that.attr('data-val')
				};
			tobj.setTradePwdType(tobj.that, data);
		});
	} else if (0 != $('.my-safeset').length) {
		obj.submitForm('.mod-form', '.unbind-btn');
		tobj.getTradePwdType(1);
		tobj.getAuthType(1);
		tobj.isPhoneRegistered();
		obj.ajaxFn('/user/GetCountryCode', {
			callback: function (res) {
				var $phone = $('#set-phone');
				if (res.IsSuccess) {
					if (res.Data && (86 != res.Data)) {
						$phone.css('display', 'none');
					} else {
						$phone.css('display', 'table-row');
					}
				} else {

				}
			}
		});
	} else if (0 != $('.my-limitset').length) {
		tobj.getLimitSet();
		$('.btn-submit').on('click', function () {
			var data = {
					key: 'MarketOrderPriceLimit',
					value: ''
				},
				box = $('.slide-box');
			val = $('.price').val() / 100;
			if (val <= 0 || val >= 1) {
				obj.hideTips($.t('limit_set'), 'green');
			} else {
				data.value = 'ON,' + val;
				tobj.setUserInfo(data, 'limit');
			}
		});
		$('.price').on('input', function () {
			if ($(this).val()) {
				$('.btn-submit').css('background-color', '#238afe');
				$('.btn-submit').css('boeder-color', '#238afe');
				$('.btn-submit').prop('boeder-color', '#238afe');
				$('.btn-submit').removeAttr('disabled');

			} else {
				$('.btn-submit').css('background-color', '#d4d7e2');
				$('.btn-submit').css('boeder-color', '#d4d7e2');
				$('.btn-submit').prop('disabled', true);
			}
		})
	} else if (0 != $('.modify-box').length) {
		if (0 != $('.my-buzPwd').length) {
			tobj.getTradePwdType(2);
		}
		obj.submitForm('.login-form', '.modify-btn');
		$('.modify-btn').on('click', function () {
			var that = $(this),
				oldPwd = $('#oldPwd').val(),
				newPwd = $('#newPwd').val(),
				gug = $('#gug').val(),
				type = that.attr('data-type'),
				flag = false,
				data = {},
				lv = obj.pwdValidate(newPwd);
			$('#rePwd').blur();
			$('#oldPwd').blur();
			$('#newPwd').on('blur', function () {
				var val = $(this).val().trim(),
					flag = true;
				if (6 != val.length) {
					obj.formValidate('#pwd', $.t('trade_six'));
					obj.flag = false;
				} else {
					obj.formValidate('#pwd', null, true);
				}
			});
			if (tobj.oldPwdFn($('#oldPwd')) && tobj.twoPwdFn($('#rePwd'))) {
				if (1 === lv && 'buz' != type) {
					obj.formValidate('#newPwd', $.t('Registration'));
				} else if (oldPwd == newPwd) {
					return;
				} else if ('buz' == type && 6 != newPwd.length) {
					obj.formValidate('#newPwd', $.t('six_digits'));
				} else if ('buz' == type && isNaN(Number(newPwd))) {
					obj.formValidate('#newPwd', $.t('six_digits'));
				} else if (!gug) {
					obj.formValidate('#gug', $.t('empty_opt'));
				} else {
					that.prop('disabled', true).text($.t('commit'));
					data = {
						oldPassword: oldPwd.trim(),
						newPassword: newPwd.trim(),
						otpCode: gug.trim()
					};
					if ('buz' == type) {
						flag = true;
					}
					tobj.updatePwd(that, data, flag);
				}
			}
		});

		// 原密码判空
		$('#oldPwd').on('blur', function () {
			tobj.oldPwdFn($('#oldPwd'));
		});
		//愿密码与新密码是否一致
		$('#newPwd').on('blur', function () {
			tobj.oldNewPwdFn($('#newPwd'));
		});
		// 重复密码判空
		$('#rePwd').on('blur', function () {
			tobj.twoPwdFn($('#rePwd'));
		});
	} else if (0 != $('.my-userinfo').length) {
		tobj.getUserInfo();
		// 修改昵称
		$('.modify-cg').on('click', function (e) {
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var that = $(this),
				$input = that.parent().find('#nickname');
			$input.removeClass('hide');
			that.parent().find('span').addClass('hide');
			that.addClass('hide').next().removeClass('hide');
		});
		// 提交确认
		$('#nickname').on('keypress', function (e) {
			e = e || window.event;
			if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
				$('.modify-ok').trigger('click');
			}
		});
		// 提交确认
		$('.modify-ok').on('click', function (e) {
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();

			var that = $(this),
				_val = that.parent().find('#nickname').val().trim(),
				$label = that.parent().find('label');
			if ('' == _val) {
				msg = $.t('nickname_empty');
				sel = 'red';
				obj.hideTips(msg, sel);
			} else if (20 <= _val.length) {
				msg = $.t('昵称长度不能超过20位！')
				sel = 'red';
				obj.hideTips(msg, sel);
			} else {
				$label.removeClass('show');
				tobj.modifyNickName(that, _val);
			}
		});
		$('#nickname').on('click', function (e) {
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
		});
		$('#nickname').on('input', function () {
			var val = $(this).val().trim(),
				$label = $(this).parent().find('label');
			setTimeout(function () {
				if (val && '' != val) {
					$label.removeClass('show');
				}
			}, 500);
		});
		$(window).on('click', function () {
			var that = $('.modify-ok');
			$('#nickname').addClass('hide');
			that.parent().find('span').removeClass('hide');
			that.addClass('hide').prev().removeClass('hide');
		});
	} else if (0 != $('.news-list').length) {
		tobj.newsList();
	} else if (0 != $('.news-detail').length) {

		tobj.newsDetail(obj.getParam().id || 1);
	} else if (0 != $('.my-loginLog').length) {
		tobj.getLoginLog();
		//tobj.
	} else if (0 != $('.my-vote').length) {
		var lang = localStorage.getItem('i18next_lng');
		if ('en' == lang) {
			$('.vote-en').removeClass('hide');
			$('.vote-zh').addClass('hide');
		} else {
			$('.vote-zh').removeClass('hide');
			$('.vote-en').addClass('hide');
		}
		tobj.getVoteLog();
		//tobj.
	} else if (0 != $('.new-saibo').length) {
		// tobj.getNewSaibo();
	} else if (0 != $('.commission').length) {
		tobj.getCommission();
	} else if (0 != $('.inviter').length) {
		tobj.getInviter();
	} else if (0 != $('.recharge-cash').length) {
		tobj.getCoinRechargeList();
		$('.table-log').on('click', '>tbody>tr>td>[data-action]', function (e) {
			var that = $(this),
				type = that.attr('data-action'),
				id = that.attr('data-id'),
				dId = that.attr('data-dId'),
				cId = that.attr('data-cId'),
				num = that.attr('data-num'),
				vId = that.attr('data-vId');
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();

			if ('question' == type) {
				that.next().addClass('show');
				$(window).one('click', function () {
					$('.bail-tip').removeClass('show');
				});
			} else if ('quick' == type) {
				obj.modShow('#mod-bail');
				tobj.getExchange(cId, num);
				$('#to-bail').one('click', function () {
					var that = $(this),
						cId = $('.currency-list>li.on').text().toLowerCase();
					that.prop('disabled', true);
					// tobj.toMortgage(dId,cId,that);
				});
				$('.tab-change').one('click', '>li', function () {
					var that = $(this);
					tobj.getExchange(cId, num);
				});
			} else if ('cancel' == type) {
				obj.modShow('#mod-prompt');
				$('#to-cancel').one('click', function () {
					var that = $(this);
					that.prop('disabled', true);
					tobj.cancelCnyCash(dId, that);
				});
			} else if ('bail' == type) {
				// tobj.cancelMortgage(id);
			} else if ('vcancel' == type) {
				obj.modShow('#mod-prompt');
				$('#to-cancel').one('click', function () {
					var that = $(this);
					that.prop('disabled', true);
					tobj.cancelCoinCash(vId, that);
				});
			}
		});

		// 充值提现记录tab
		$('.tab-logs').on('click', '>li', function () {
			var that = $(this),
				index = that.index(),
				$box = that.closest('.log-table'),
				$log_table = null,
				$table = $box.find('.table-log');

			if (!that.hasClass('on')) {
				that.addClass('on').siblings('li').removeClass('on');
				$table.eq(index).removeClass('hide').siblings('.table-log').addClass('hide');
				$log_table = that.closest('.other-tables').find('.log-table.show');
				if (0 != index) {
					if (0 != $log_table.index()) {
						tobj.getCoinCashList();
					} else {
						tobj.getCnyCashList();
					}
				} else {
					if (0 != $log_table.index()) {
						tobj.getCoinRechargeList();
					} else {
						tobj.getCnyRechargeList();
					}
				}
			}
		});
	} else if (0 != $('.my-turnover').length) {
		// $('.other-wrap').trigger();
		tobj.getActiveList();
		tobj.getBaseMarketList();
		if (tobj.getMarketId()) {
			tobj.getTradeProfit();
			tobj.getTradeList();
		}
	} else if (0 != $('.my-modify').length) {
		tobj.getUserInfo();
		tobj.isCreatedOpenKey();
		tobj.getAuthType(1);
		//tobj.isNeedPwd(2);
		$('#create-key').on('click', function () {
			var that = $(this),
				data = {},
				_tag = $('#tag').val().trim(),
				_pwd = $('#buzPwd').val().trim(),
				_ip = $('#ip').val().trim(),
				_ips = !!_ip ? _ip.split(',') : [],
				flag = true,
				_val = '',
				_sign = true,
				_gug = $('#input-gug').parent().parent();
			if (_gug.hasClass('on')) {
				_val = $('#input-gug').val();
			} else {
				_sign = false;
				_val = $('#input-phone').val();
			}

			data = {
				lable: _tag,
				limits: [0],
				tradePassword: _pwd,
				ip: _ip,
				secondIsOtp: _sign,
				secondCode: _val
			};
			if (!_tag || !_pwd) {
				flag = false;
			}
			if (_ip) {
				for (var i = 0; i < _ips.length; i++) {
					if (!obj.validate(obj.reg_ip, _ips[i])) {
						flag = false;
						tobj.getTips($('#ip'), $.t('ip_format'));
						break;
					}
				}
			}
			$('.box-input>input[type="text"],.box-input>input[type="password"]').trigger('blur');
			if (flag) {
				that.prop('disabled', true).text($.t('establish') + '...');
				tobj.createOpenKey(data, that);
			}
		});
		$('.box-input,.mod-form').on('blur', 'input[type="text"],input[type="password"]', function () {
			var that = $(this),
				msg = '',
				_ips = [],
				$error = that.parent().find('.error');
			if (!that.val()) {
				if ('ip' == that.prop('id') || 'bindIp' == that.prop('id')) {
					return false;
				}
				if (0 == $error.length) {
					tobj.getTips(that, $.t('cannot_empty'));
				} else {
					$error.removeClass('hide');
				}
			} else {
				$error.addClass('hide');
				if ('ip' == that.prop('id') || 'bindIp' == that.prop('id')) {
					_ips = that.val().split(',');
					if (0 < _ips.length) {
						for (var i = 0; i < _ips.length; i++) {
							if (!obj.validate(obj.reg_ip, _ips[i])) {
								msg = $.t('ip_format');
								tobj.getTips(that, msg);
								break;
							}
						}
					} else {
						if (!obj.validate(obj.reg_ip), that.val()) {
							msg = $.t('ip_format');
							tobj.getTips(that, msg);
						}
					}
					$error.html(msg);
				}
			}
		});

		$('#btn-operate').on('click', function () {
			var that = $(this),
				$form = that.closest('.mod-form'),
				$error = that.parent().find('.error'),
				_pwd = $form.find('#o-buzPwd').val().trim(),
				data = {},
				_gug = $('#input-gug').val().trim(),
				_code = $('#input-phone').val().trim(),
				flag = true,
				_sign = true,
				gug = $('.input-gug').parent();

			if (!_pwd) {
				$error.removeClass('hide');
				flag = false;
			}
			if (gug.hasClass('on')) {
				_val = $('.input-gug').eq(1).val();
			} else {
				_sign = false;
				_val = $('.input-phone').eq(1).val();
			}
			data = {
				tradePassword: _pwd,
				ip: tobj.ip_id,
				secondIsOtp: _sign,
				secondCode: _val
			};
			if (flag) {
				data = {
					id: tobj.ip_id,
					tradePassword: _pwd,
					secondIsOtp: _sign,
					secondCode: _val
				};
				if (that.hasClass('del')) {
					tobj.delOpenKey(data, that);
				} else {
					//tobj.showIpList();
					tobj.getOpenKeyList(data);
				}
			}
		});
		$('#to-edit').on('click', function () {
			var that = $(this),
				$form = $('.mod-form'),
				_pwd = $form.find('#e-buzPwd').val().trim(),
				_ip = $form.find('#bindIp').val().trim(),
				data = {},
				flag = true,
				_sign = true,
				gug = $('.input-gug').parent();

			$('.mod-form input[type="text"],.mod-form input[type="password"]').trigger('blur');
			if (!_pwd) {
				flag = false;
			}
			if (gug.hasClass('on')) {
				_val = $('.input-gug').eq(0).val();
			} else {
				_sign = false;
				_val = $('.input-phone').eq(0).val();
			}
			// data={tradePassword: _pwd,ip: tobj.ip_id,secondIsOtp: _sign, secondCode: _val};
			if (flag) {
				data = {
					ip: _ip,
					id: tobj.ip_id,
					tradePassword: _pwd,
					secondIsOtp: _sign,
					secondCode: _val
				};
				tobj.bindOpenKeyIp(data, that);
			}
		});
		$('.api-table').on('click', '[data-type]', function () {
			var that = $(this),
				type = that.data('type'),
				_id = that.closest('tr').data('id'),
				tmp = '';

			tobj.ip_id = _id;
			if ('edit' == type) {
				for (var i = 0; i < tobj.ipList.length; i++) {
					if (_id == tobj.ipList[i].Id) {
						tmp = tobj.ipList[i].IPs && tobj.ipList[i].IPs.join(',');
						break;
					}
				}
				$('#bindIp').val(tmp);
				obj.modShow('#mod-edit');
			} else if ('del' == type) {
				$('#mod-operate .mod-title>span').html($.t('del_api'));
				$('#mod-operate #btn-operate').addClass('del');
				obj.modShow('#mod-operate');
			}
		});
		$(document).on('keypress', function (e) {
			e = e || window.event;
			var that = $(e.target),
				$form = that.closest('form'),
				type = $form.data('form');
			if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
				if (1 == type) {
					$('#create-key').trigger('click');
				} else if (2 == type) {
					$('#to-edit').trigger('click');
				} else if (3 == type) {
					$('#btn-operate').trigger('click');
				}
			}
		});
		//点击跳转到设置交易密码页
		/*$('#ok-tip').on('click',function(){
		   location.href = './set-buzpwd.html'
		});*/
	} else if (0 != $('.my-integral').length) {
		obj.getVipgrade();
		tobj.getIntegral();
		tobj.getTotalIntegral();
	} else if (0 != $('.generalize').length) {
		tobj.getGeneralizeProfit();
		tobj.getPromotion();
		tobj.getGeneralLevel();
		var userId = localStorage.getItem('userId'),
			_host = window.location.host;
		$('.box-input>input').val('https://' + _host + '/r.html?p=' + userId);
		$('#btn-address').on('click', function () {
			var ele = document.getElementById("text");
			ele.select();
			document.execCommand("Copy");
			obj.hideTips($.t('duplicated'));
		});
		$('#qrcode').qrcode({
			width: 132,
			height: 132,
			correctLevel: 0,
			text: _host + '/r.html?p=' + userId
		});
	} else if (0 != $('.ico-apply').length) {
		tobj.icoBirthday();
		//富文本编辑框
		var quill = new Quill('#editor-container', {
		    modules: {
		        toolbar: [
		            [{ header: [1, 2, false] }],
		            ['bold', 'italic', 'underline'],
		            ['image', 'code-block'],
		            ['link']
		        ]
		    },
		    placeholder: 'Compose an epic...',
		    theme: 'snow' 
			});
		

		//通过ID获取ico内容
		if (location.search) {
			var _id = location.search.split('=')[1];
			tobj.getApplyItem(_id);
		}
		// 图片上传
		$('.upload-pic').on('click', 'label', function () {
			var that = $(this);
			that.closest('.upload-pic').find('li').each(function () {
				$(this).find('label').removeClass('on');
			})
			that.addClass('on');
		});
		$('#upload-name').on('change', function (e) {
			var files = $(this).prop('files')[0],
				that = $(this),
				allowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

			if (files) {
				if (-1 == allowed.indexOf(files.type)) {
					obj.modShow('#mod-prompt');
					$('#mod-prompt .tips-txt').text($.t('format'));
				} else {
					obj.ajaxUpload($('#upload-img'), {
						callback: function (res) {
							if ('SUCCESS' == res.state) {
								$('.upload-pic>li>label.on').text(res.name);
								tobj.icoImages.push(res.url);
							} else {
								obj.hideTips($.t('upload_limit') + 'jpg,jpeg,png,gif');
							}
						}
					});
				}
			} else {
				obj.hideTips($.t('upload_limit') + 'jpg,jpeg,png,gif');
			}
		});
		//添加删除早鸟奖励
		$('.bonus-add').on('click', function () {
			$('.section').removeClass('hide').addClass('on');
		});
		$('.bonus-del').on('click', function () {
			var that = $(this),
				_sign = that.data('sign');
			$('.' + _sign).addClass('hide').removeClass('on');
		});
		$('.support-coin').on('click', '>li', function () {
			var that = $(this);
			that.toggleClass('active');
			var _items = $('.support-coin>li.active');
			$('.li-rate').addClass('hide');
			for (var i = 0; i < _items.length; i++) {
				var _class = _items.eq(i).children('span').text().toLowerCase();
				$('.' + _class + '-rate').removeClass('hide');
			}
		});
		$('.support-lock').on('click', '>li', function () {
			var that = $(this);
			$('.support-lock>li').removeClass('active');
			that.addClass('active');
			if (0 != $('.locked.active').length) {
				$('.link-lock').removeClass('hide');
			} else {
				$('.link-lock').addClass('hide');
			}
		});
		$('.support-bonus').on('click', '>li', function () {
			var that = $(this);
			$('.support-bonus>li').removeClass('active');
			that.addClass('active');
			if (0 != $('.bonus-stage.active').length) {
				$('.ico-bonus').removeClass('hide');
				$('.all-rate').addClass('hide');
				$('.section-one').addClass('on');
			} else {
				$('.ico-bonus').addClass('hide');
				$('.all-rate').removeClass('hide');
				$('.section-one').removeClass('on');
			}
		});
		$('#currency').on('blur', function () {
			var that = $(this);
			$('.link-currency').text(that.val().trim());
		});
		$('.limited').on('click', '>li', function () {
			var that = $(this);
			$('.limited>li').removeClass('active');
			that.addClass('active');
			if (0 != $('.limit.active').length) {
				$('.person-limit').removeClass('hide');
			} else {
				$('.person-limit').addClass('hide');
			}
		});
		// $('.set-bouns').on('click', function () {
		// 	var that = $(this);
		// 	that.toggleClass('active');
		// 	if (0 != $('.set-bouns.active').length) {
		// 		$('.set-bouns>span').text($.t('ico_delete'));
		// 		$('.ico-bonus').removeClass('hide');
		// 	} else {
		// 		$('.set-bouns>span').text($.t('ico_add'));
		// 		$('.ico-bonus').addClass('hide');
		// 	}
		// });
		//提交ico
		$('.ico-submit').on('click', function () {
			var that = $(this),
				_sign = that.data('sign');
			_title = $('#title').val().trim() || '',
				_image = '',
				_currency = $('#currency').val().trim() || '',
				_contactPersion = $('#contactPersion').val().trim() || '',
				_contactEmail = $('#contactEmail').val().trim() || '',
				_totalAmount = $('#totalAmount').val().trim() || '',
				_icoAmount = $('#icoAmount').val().trim() || '',
				_introduce = $('#introduce').val().trim() || '',
				_content = $('#ico-content').val().trim() || '',
				_docLinks = $('#docLinks').val().trim() || '',
				_startTime = '',
				_endTime = '',
				_Id = '',
				_itemList = [],
				_advanceItemList = [],
				_isDraft = false;
			if (2 == _sign) {
				_isDraft = true;
			}
			if (0 != $('.locked.active').length) {
				var _selects = $('.link-lock>.txt-info>select');
				var _advanceStart = _selects.eq(0).val() + '-' + _selects.eq(1).val() + '-' + _selects.eq(2).val() + ' ' + _selects.eq(3).val() + ':00:00';
				var _advanceEnd = _selects.eq(4).val() + '-' + _selects.eq(5).val() + '-' + _selects.eq(6).val() + ' ' + _selects.eq(7).val() + ':00:00';
				var _lockBonusRate = 0,
					_lockTotal = 0;
			}
			_startTime = $('#ico-by').val() + '-' + $('#ico-bm').val() + '-' + $('#ico-bd').val() + ' ' + $('#ico-bh').val() + ':00:00';
			_endTime = $('#ico-ey').val() + '-' + $('#ico-em').val() + '-' + $('#ico-ed').val() + ' ' + $('#ico-eh').val() + ':00:00';
			var list = $('.active.item-currency');
			for (var i = 0; i < list.length; i++) {
				var cur = list.eq(i).children('span').text();
				//提前锁定的数据
				var locks = $('.lock-TotalVolume');
				for (var j = 0; j < locks.length; j++) {
					if (locks.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
						_lockTotal = locks.eq(j).val().trim();
						_lockBonusRate = $('.lock-ExchangeRate').eq(j).val().trim();
					}
				}
				if (0 != $('.locked.active').length) {
					_advanceItemList.push({
						"Currency": cur,
						"BonusRate": _lockBonusRate,
						"TotalVolume": _lockTotal,
						"StartTime": _advanceStart,
						"EndTime": _advanceEnd,
						"GroupId": 0
					});
				}
			}
			//奖励设置阶段的数据
			if (0 < $('.bonus-stage.active').length) {
				var _lis = $('.section-one>.form-group>.txt-info>select');
				var _lisStart = _lis.eq(0).val() + '-' + _lis.eq(1).val() + '-' + _lis.eq(2).val() + ' ' + _lis.eq(3).val() + ':00:00';
				var _lisEnd = _lis.eq(4).val() + '-' + _lis.eq(5).val() + '-' + _lis.eq(6).val() + ' ' + _lis.eq(7).val() + ':00:00';
				var _lisBonusRate = 0;
				var _stage1 = $('.one-ExchangeRate');
				for (var i = 0; i < list.length; i++) {
					var cur = list.eq(i).children('span').text();
					for (var j = 0; j < _stage1.length; j++) {
						if (_stage1.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
							_lisBonusRate = _stage1.eq(j).val().trim();
						}
					}
					_advanceItemList.push({
						"Currency": cur,
						"BonusRate": _lisBonusRate,
						"TotalVolume": 0,
						"StartTime": _lisStart,
						"EndTime": _lisEnd,
						"GroupId": 1
					});
				}
				if (0 == $('.section-two.hide').length) {
					var _lis2 = $('.section-two>.form-group>.txt-info>select');
					var _lisStart2 = _lis2.eq(0).val() + '-' + _lis2.eq(1).val() + '-' + _lis2.eq(2).val() + ' ' + _lis2.eq(3).val() + ':00:00';
					var _lisEnd2 = _lis2.eq(4).val() + '-' + _lis2.eq(5).val() + '-' + _lis2.eq(6).val() + ' ' + _lis2.eq(7).val() + ':00:00';
					var _lisBonusRate2 = 0;
					var _stage2 = $('.two-ExchangeRate');
					for (var i = 0; i < list.length; i++) {
						var cur = list.eq(i).children('span').text();
						for (var j = 0; j < _stage2.length; j++) {
							if (_stage2.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
								_lisBonusRate2 = _stage2.eq(j).val().trim();
							}
						}
						_advanceItemList.push({
							"Currency": cur,
							"BonusRate": _lisBonusRate2,
							"TotalVolume": 0,
							"StartTime": _lisStart2,
							"EndTime": _lisEnd2,
							"GroupId": 2
						});
					}
				}
				if (0 == $('.section-three.hide').length) {
					var _lis3 = $('.section-three>.form-group>.txt-info>select');
					var _lisStart3 = _lis3.eq(0).val() + '-' + _lis3.eq(1).val() + '-' + _lis3.eq(2).val() + ' ' + _lis3.eq(3).val() + ':00:00';
					var _lisEnd3 = _lis3.eq(4).val() + '-' + _lis3.eq(5).val() + '-' + _lis3.eq(6).val() + ' ' + _lis3.eq(7).val() + ':00:00';
					var _lisBonusRate3 = 0;
					var _stage3 = $('.three-ExchangeRate');
					for (var i = 0; i < list.length; i++) {
						var cur = list.eq(i).children('span').text();
						for (var j = 0; j < _stage3.length; j++) {
							if (_stage3.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
								_lisBonusRate3 = _stage3.eq(j).val().trim();
							}
						}
						_advanceItemList.push({
							"Currency": cur,
							"BonusRate": _lisBonusRate3,
							"TotalVolume": 0,
							"StartTime": _lisStart3,
							"EndTime": _lisEnd3,
							"GroupId": 3
						});
					}
				}
				if (0 == $('.section-four.hide').length) {
					var _lis4 = $('.section-four>.form-group>.txt-info>select');
					var _lisStart4 = _lis4.eq(0).val() + '-' + _lis4.eq(1).val() + '-' + _lis4.eq(2).val() + ' ' + _lis4.eq(3).val() + ':00:00';
					var _lisEnd4 = _lis4.eq(4).val() + '-' + _lis4.eq(5).val() + '-' + _lis4.eq(6).val() + ' ' + _lis4.eq(7).val() + ':00:00';
					var _lisBonusRate4 = 0;
					var _stage4 = $('.four-ExchangeRate');
					for (var i = 0; i < list.length; i++) {
						var cur = list.eq(i).children('span').text();
						for (var j = 0; j < _stage4.length; j++) {
							if (_stage4.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
								_lisBonusRate4 = _stage4.eq(j).val().trim();
							}
						}
						_advanceItemList.push({
							"Currency": cur,
							"BonusRate": _lisBonusRate4,
							"TotalVolume": 0,
							"StartTime": _lisStart4,
							"EndTime": _lisEnd4,
							"GroupId": 4
						});
					}
				}
				if (0 == $('.section-five.hide').length) {
					var _lis5 = $('.section-five>.form-group>.txt-info>select');
					var _lisStart5 = _lis4.eq(0).val() + '-' + _lis5.eq(1).val() + '-' + _lis5.eq(2).val() + ' ' + _lis5.eq(3).val() + ':00:00';
					var _lisEnd5 = _lis4.eq(4).val() + '-' + _lis5.eq(5).val() + '-' + _lis5.eq(6).val() + ' ' + _lis5.eq(7).val() + ':00:00';
					var _lisBonusRate5 = 0;
					var _stage5 = $('.five-ExchangeRate');
					for (var i = 0; i < list.length; i++) {
						var cur = list.eq(i).children('span').text();
						for (var j = 0; j < _stage5.length; j++) {
							if (_stage5.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
								_lisBonusRate5 = _stage5.eq(j).val().trim();
							}
						}
						_advanceItemList.push({
							"Currency": cur,
							"BonusRate": _lisBonusRate5,
							"TotalVolume": 0,
							"StartTime": _lisStart5,
							"EndTime": _lisEnd5,
							"GroupId": 5
						});
					}
				}
				if (0 == $('.section-six.hide').length) {
					var _lis6 = $('.section-six>.form-group>.txt-info>select');
					var _lisStart6 = _lis6.eq(0).val() + '-' + _lis6.eq(1).val() + '-' + _lis6.eq(2).val() + ' ' + _lis6.eq(3).val() + ':00:00';
					var _lisEnd6 = _lis6.eq(4).val() + '-' + _lis6.eq(5).val() + '-' + _lis6.eq(6).val() + ' ' + _lis6.eq(7).val() + ':00:00';
					var _lisBonusRate6 = 0;
					var _stage6 = $('.six-ExchangeRate');
					for (var i = 0; i < list.length; i++) {
						var cur = list.eq(i).children('span').text();
						for (var j = 0; j < _stage6.length; j++) {
							if (_stage6.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
								_lisBonusRate6 = _stage6.eq(j).val().trim();
							}
						}
						_advanceItemList.push({
							"Currency": cur,
							"BonusRate": _lisBonusRate6,
							"TotalVolume": 0,
							"StartTime": _lisStart6,
							"EndTime": _lisEnd6,
							"GroupId": 6
						});
					}
				}
			}
			//支持币种的数据
			if (0 == $('.bonus-stage.active').length) {
				//支持币种的数据
				for (var i = 0; i < list.length; i++) {
					var cur = list.eq(i).children('span').text().toUpperCase(),
						exc = 0,
						tol = 0,
						limit = 0;
					var _items = $('.all-ExchangeRate');
					for (var j = 0; j < _items.length; j++) {
						if (_items.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
							exc = _items.eq(j).val().trim(),
								tol = $('.item-TotalVolume').eq(j).val().trim();
							if (0 < $('.limit.active').length) {
								limit = $('.limit-TotalVolume').eq(j).val().trim();
							}
						}
					}
					_itemList.push({
						"Currency": cur,
						"ExchangeRate": exc,
						"TotalVolume": tol,
						"Limited": limit
					});
				}
			} else {
				//支持币种的数据
				var _secs = $('.section.on'),
					_length = _secs.length;
				for (var i = 0; i < list.length; i++) {
					var cur = list.eq(i).children('span').text().toUpperCase(),
						exc = 0,
						tol = 0,
						limit = 0;
					var _items = _secs.eq(_length - 1).find('input');
					for (var j = 0; j < _items.length; j++) {
						if (_items.eq(j).data('sign') == list.eq(i).prop('id').split('-')[1]) {
							exc = _items.eq(j).val().trim(),
								tol = $('.item-TotalVolume').eq(j).val().trim();
							if (0 < $('.limit.active').length) {
								limit = $('.limit-TotalVolume').eq(j).val().trim();
							}
						}
					}
					_itemList.push({
						"Currency": cur,
						"ExchangeRate": exc,
						"TotalVolume": tol,
						"Limited": limit
					});
				}
			}
			_itemList = JSON.stringify(_itemList);
			_advanceItemList = JSON.stringify(_advanceItemList);
			_image = tobj.icoImages[tobj.icoImages.length - 2] + ',' + tobj.icoImages[tobj.icoImages.length - 1];
			var _data = {
				"title": _title,
				"image": _image,
				"currency": _currency,
				"contactPersion": _contactPersion,
				"contactEmail": _contactEmail,
				"totalAmount": _totalAmount,
				"icoAmount": _icoAmount,
				"introduce": _introduce,
				"content": _content,
				"docLinks": _docLinks,
				"startTime": _startTime,
				"endTime": _endTime,
				"Id": _Id
			};
			_data = JSON.stringify(_data);

			var data = {
				"ico": _data,
				"isDraft": _isDraft,
				"itemList": _itemList,
				"advanceItemList": _advanceItemList
			};
			tobj.applyItem(data, _sign);
		});
	} else if (0 != $('.ico-publish').length) {
		tobj.getIcoPublish('all');
		//切换状态
		$('.piblish-status').on('click', '>li', function () {
			var that = $(this);
			$('.piblish-status>li').removeClass('active');
			that.addClass('active');
			var _sign = that.data('sign');
			tobj.getIcoPublish(_sign);
		});
	} else if (0 != $('.ico-show').length) {
		tobj.showIcoList(1, 1);
		$('.status-list').on('click', '>li', function () {
			var that = $(this);
			$('.status-list>li').removeClass('active');
			that.addClass('active');
			var _status = that.data('id');
			tobj.showIcoList(1, _status);
		});
	} else if (0 != $('.ico-details').length) {
		var _id = location.search.split('=')[1];
		if ('5a445e5cd6f8013d045da9d1' == _id) {
			var _html = '<h3 data-i18n="ico_intro"></h3>\
				<iframe height="498" width="630" style="margin: 50px 76px" src="https://player.youku.com/embed/XMzI1ODU3MzAxNg==" frameborder="0" allowfullscreen></iframe>\
				<img data-i18n="[src]ico_item" alt="">\
				<iframe height="498" width="630"  style="margin-left: 76px" src="https://player.youku.com/embed/XMzI1NTUyNTkyMA==" frameborder="0" allowfullscreen></iframe>\
				<img data-i18n="[src]ico_team" alt="">';
			$('.project').html(_html);
			var html = '<span data-i18n="ico_website"></span>\
			<a href="http://www.bottos.org/" target="_blank">http://www.bottos.org/</a>'
			$('.link-websit').html(html);
		} else if ('5a445e5cd6f8013d045da9d2' == _id) {
			var _html = '<h3 data-i18n="ico_intro"></h3>\
			<img data-i18n="[src]seer_item" style="width: 100%;" alt="">';
			$('.project').html(_html);
			var html = '<span data-i18n="ico_website"></span>\
			<a href="http://www.seer.best/" target="_blank">http://seer.best/</a>'
			$('.link-websit').html(html);
		} else if ('5a5ebfc3d6f80120e446e1ad' == _id) {
			var _html = '<h3 data-i18n="ico_intro"></h3>\
			<img data-i18n="[src]dhc_item" style="width: 100%;" alt="">';
			$('.project').html(_html);
			var html = '<span data-i18n="ico_website"></span>\
			<a href="https://www.dh.life/" target="_blank">https://www.dh.life/</a>'
			$('.link-websit').html(html);
		} else if ('5a6e9442d6f80143405dfc4c' == _id) {
			var _html = '<h3 data-i18n="ico_intro"></h3>\
			<img data-i18n="[src]sharder_item" style="width: 100%;" alt="">';
			$('.project').html(_html);
			var html = '<span data-i18n="ico_website"></span>\
			<a href="https://www.sharder.org/" target="_blank">https://www.sharder.org/</a>'
			$('.link-websit').html(html);
		} else if ('5a445e5cd6f8013d045da9dd' == _id) {
			var _html = '<h3 data-i18n="ico_intro"></h3>\
			<img data-i18n="[src]drc_item" style="width: 100%;" alt="">';
			var _html = '<h3 data-i18n="ico_intro"></h3>\
				<iframe height="498" width="630"  style="margin-left: 76px" data-i18n="[src]drc_video" frameborder="0" allowfullscreen></iframe>\
				<img data-i18n="[src]drc_item" style="width: 100%;" alt="">';
			$('.project').html(_html);
			var html = '<span data-i18n="ico_website"></span>\
			<a href="http://www.drc.info/" target="_blank">http://www.drc.info/</a>'
			$('.link-websit').html(html);
		}
		if (!obj.sign) {
			$('.btn-join').on('click', function () {
				location.href = '/login.html';
				return false;
			});
		} else {
			$('.btn-join').on('click', function () {
				obj.modShow('#mod-protocol');
			});
		}
		tobj.getIcoDetails(_id);
		tobj.getSimpleData1(_id);
	} else if (0 != $('.ico-invest').length) {
		var _id = location.search.split('=')[1];
		tobj.getSimpleData(_id);
		// if('5a6e9442d6f80143405dfc4c' == _id){

		// }
		$('.ico-currency').on('change', function () {
			var that = $(this),
				_currency = that.val();
			tobj.getBalance(_currency);

			for (var i = 0; i < tobj.simpleData.length; i++) {
				if (_currency == tobj.simpleData[i].currency) {
					$('.remain').text(tobj.simpleData[i].asset + ' ' + _currency.toUpperCase());
					// if (location.search.split('=')[1] == '5a445e5cd6f8013d045da9d2') {
					// 	$('.remain').text(tobj.simpleData[i].asset * 3 + ' ' + _currency.toUpperCase());
					// }
				}
				$('.per-limit').text(tobj.simpleData[i].limited + ' ' + _currency.toUpperCase());
				if ('5a6e9442d6f80143405dfc4c' == _id) {
					$('.per-limit').text('1 ETH');
					$('.invest-limit').text($.t('per_min'));
				}
			}
		});
		$('.ico-num').on('keyup', function () {
			var that = $(this),
				_val = that.val(),
				_asset = $('.remain').text().split(' ')[0],
				_account = $('.account').text().split(' ')[0];
			if (_val / 1 > _account / 1) {
				$('.ico-tips').removeClass('hide').text($.t('ico_insuffy'));
				$('.btn-invest').prop('disabled', true);
			} else if (_val / 1 > _asset / 1) {
				$('.ico-tips').removeClass('hide').text($.t('ico_allocation'));
				$('.btn-invest').prop('disabled', true);
			} else {
				$('.ico-tips').addClass('hide');
				$('.btn-invest').prop('disabled', false);
			}
		});
		$('.btn-invest').on('click', function () {
			if ('5a6e9442d6f80143405dfc4c' == _id) {
				var _volume = $('.ico-num').val();
				if (1 <= _volume) {
					obj.modShow('#mod-prompt');
				} else {
					var msg = $.t('person_min');
					obj.modHide('#mod-prompt');
					obj.modShow('#mod-prompt1');
					$('#mod-prompt1 .tips-txt').html(msg);
				}
			} else {
				obj.modShow('#mod-prompt');
			}
			// $('#mod-operate .mod-title>span').html($.t('prompt'));
			$('.pay-currency').text($('.ico-currency').val());
			$('.pay-num').text($('.ico-num').val());
			$('.ico-title').text($('#ico-title').val());
		});
		$('.submit-invest').on('click', function () {
			var _currency = $('.ico-currency').val().toLowerCase(),
				_volume = $('.ico-num').val(),
				_tradepwd = $('#pwd-trade').val().trim(),
				_otpCode = $('#optcode').val().trim();
			var data = {
				"id": _id,
				"currency": _currency,
				"volume": _volume,
				"tradepwd": _tradepwd,
				"otpCode": _otpCode
			};
			tobj.submitInvest(data);
			obj.modHide('#mod-prompt');
		});
	} else if (0 != $('.ico-support').length) {
		tobj.getSupportItem("all");
		$('.dropdown-list').on('click', '>li', function (e) {
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var that = $(this),
				_span = that.find('span').text();
			// if(that.hasClass('on')){return false;}
			that.addClass('on').siblings().removeClass('on');
			that.closest('.dropdown-box').find('.dropdown-txt').html('<span>' + _span + '</span><i class="icon icon-down2"></i>');
			that.parent().removeClass('show');
			that.parent().prev().removeClass('show');
			var _status = that.data('sign');
			tobj.getSupportItem(_status);
		});
	} else if (0 != $('.pst').length) {
		if (obj.sign) {
			$('.log-pst').addClass('hide');
		} else {
			$('.log-pst').removeClass('hide');
		}
		tobj.getActivityIds(4);
	}
	if (0 != $('.news-list').length || 0 != $('.news-detail').length) {
		$(window).on('scroll', function (e) {
			e = e || window.event;
			if (50 < $(this).scrollTop()) {
				$('.goback').addClass('show');
			} else {
				$('.goback').removeClass('show');
			}
		});
	}
	// 下拉
	$('.other-wrap').on('click', '.dropdown-txt', function (e) {
		e = e || window.event;
		e.stopPropagation();
		e.preventDefault();
		var that = $(this),
			$ul = that.parent().find('.dropdown-list');

		if (that.hasClass('show')) {
			that.removeClass('show');
			$ul.removeClass('show');
		} else {
			that.addClass('show');
			$ul.addClass('show');
		}
		$('.search-box>ul').removeClass('show');
	});

	// 选择市场
	if (0 == $('.ico-support').length) {
		$('.other-wrap').on('click', '.dropdown-list>li', function (e) {
			e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var that = $(this),
				_span = that.find('span').text(),
				$box = that.closest('.dropdown-box'),
				_id = that.attr('data-value') || that.attr('data-id'),
				$input = $box.find('.search-box>input'),
				sign = false;
			if (that.hasClass('on')) {
				return false;
			}
			_id = _id ? _id.substr(_id.indexOf('+') + 1) : '';
			that.addClass('on').siblings().removeClass('on');
			that.closest('.dropdown-box').find('.dropdown-txt').html('<span data-val=' + _id + '>' + _span + '</span><i class="icon icon-down2"></i>');
			that.parent().removeClass('show');
			that.parent().prev().removeClass('show');
			//tobj.getBaseMarketList(that.text().toLowerCase());
			$box.parent().find('.warn').addClass('hide');
			if ($input.val()) {
				tobj.marketId = (that.text() + '_' + $input.val()).toLowerCase();
			}
			tobj.getBaseMarketList(that.text().toLowerCase());
			if (0 != $('.my-order').length) {
				tobj.getOrders();
			} else if (0 != $('.my-turnover').length) {
				tobj.getTradeProfit();
				tobj.getTradeList();
			} else if (0 != $('.order-history').length) {
				tobj.getHistoryOrders();
			} else if (0 != $('.my-realname').length) {
				flag = true;
				if (that.attr('data-value') && (_id == 86)) {
					obj.setCookie('country', _id + ';' + _span, 1);
					location.href = './torealnameinland.html';
				} else {
					sign = true;
				}
				tobj.getType();
			} else if (0 != $('.my-realname2').length) {
				if (that.attr('data-value') && (_id != 86)) {
					obj.setCookie('country', _id + ';' + _span, 1);
					location.href = './torealname.html';
				} else {
					sign = true;
				}
			}
			if (0 != $('.my-realname').length || 0 != $('.my-realname2').length) {
				if (!tobj.phone) {
					$($('.code-box')[0]).removeClass('hide');
				}
			}
			if (sign) {
				$('.form-group').each(function () {
					var that = $(this);
					if (!that.hasClass('code-box')) {
						that.removeClass('hide');
					}
				});
				$('.upload-box').removeClass('hide');
				$('.realname-explain').removeClass('hide');
				var cType = $('.sel_area>span').eq(0).data('val');
				if (001 == cType) {
					$('#version').parent().parent().addClass('hide');
					$('#number').parent().parent().addClass('hide');
					$('#fund-num').parent().parent().removeClass('hide');
				} else if (64 == cType) {
					$('#fund-num').parent().parent().addClass('hide');
					$('#version').parent().parent().removeClass('hide');
					$('#number').parent().parent().removeClass('hide');
				} else {
					$('#version').parent().parent().addClass('hide');
					$('#number').parent().parent().addClass('hide');
					$('#fund-num').parent().parent().addClass('hide');
				}
			}
		});
	}


	// 检索中
	$('.other-wrap').on('input', '.search-box>input', function () {
		var that = $(this),
			$next = that.next(),
			val = that.val();
		$next.addClass('show');
		$('.dropdown-list').removeClass('show');
		tobj.getMarketList(that, val);
	});
	$('.other-wrap').on('click', '.search-box>input', function (e) {
		var that = $(this),
			$next = that.next(),
			val = that.val();
		e = e || window.event;
		e.stopPropagation();
		e.preventDefault();

		$next.addClass('show');
		that.unbind('keydown');
		that.css('boeder', '1px solid #238afe');
		that.on('keydown', function (e) {
			e = e || window.event;

			var $li = $next.find('li'),
				index = $next.find('li.on').index(),
				_i = 0;

			if ((40 == e.which) || (40 == e.keyCode)) {
				if (-1 != index) {
					_i = index + 1;
				}
				if (_i >= ($li.length - 1)) {
					_i = $li.length - 1;
				}
				$li.eq(_i).addClass('on').siblings('li').removeClass('on');
			} else if ((38 == e.which) || (38 == e.keyCode)) {
				if (-1 != index) {
					_i = index - 1;
				}
				if (_i <= 0) {
					_i = 0;
				}
				$li.eq(_i).addClass('on').siblings('li').removeClass('on');
			} else if ((13 == e.which) || (13 == e.keyCode)) {
				that.val($next.find('li.on').text());
				$('.other-wrap .search-box>ul>li.on').trigger('click');
			}
		});
		$('.dropdown-list').removeClass('show');
		tobj.getMarketList(that, val);
	});
	// 选中检索内容
	$('.other-wrap').on('click', '.search-box>ul>li', function (e) {
		e = e || window.event;
		e.stopPropagation();
		e.preventDefault();

		var that = $(this),
			$box = that.closest('.dropdown-box'),
			val = that.find('.search-txt').text(),
			$input = that.closest('.search-box').find('input');
		$input.val(val);
		that.parent().removeClass('show');
		if ($input.val()) {
			tobj.marketId = ($box.find('.dropdown-txt>span').text() + '_' + $input.val()).toLowerCase();
		}
		if (0 != $('.my-order').length) {
			tobj.getOrders();
		} else if (0 != $('.my-turnover').length) {
			tobj.getTradeProfit();
			tobj.getTradeList();
		} else if (0 != $('.order-history').length) {
			tobj.getHistoryOrders();
		}
	});

	// 切换谷歌/手机验证
	$('.code-tab').on('click', function () {
		var _type = $(this).attr('data-type'),
			$box = $(this).closest('.form-group');
		$box.addClass('hide').removeClass('on').siblings().removeClass('hide').addClass('on');;
	});
	// 倒计时
	$('.send-code').on('click', '>button', function () {
		var that = $('#mod-phone #input-phone'),
			sign = $(this).attr('data-sign'),
			_id = $(this).attr('class'),
			flag = false,
			flag2 = true;

		if (_id == 'btn-validate') {
			flag2 = false;
		}
		if ('email' == sign) {
			flag = true;
			that = $('#mod-email #input-phone');
		} else if ('msg-gug' == sign) {
			that = $('#mod-gug #input-phone');
		} else if ('addr-code' == sign) {
			that = $('#otp-captcha');
		}
		if (flag2) {
			obj.sendPhoneCaptcha($(this), flag, function (opts) {
				if (opts.type) {
					if (opts.msg && '' != opts.msg) {
						// obj.modShow('#mod-prompt');
						// $('#mod-prompt .tips-txt').html(opts.msg);
						// tobj.getTips(that,opts.msg,'span');
						tobj.getTips(that, opts.msg);
					}
				} else {
					tobj.getTips(that, null);
				}
			});
		}
	});
	// 解除谷歌绑定
	$('.unbind-btn').on('click', function () {
		var that = $(this),
			sign = that.attr('data-sign'),
			$box = that.closest('.mod-box'),
			$form = $box.find('.mod-form'),
			$input = $form.find('.form-group.on input'),
			type = $form.find('.form-group.on .code-tab').attr('data-type'),
			data = {
				captcha: ''
			},
			flag = false,
			code = '';

		if ('phone' == sign || 'email' == sign) {
			code = that.closest('.mod-form').find('input').val().trim();
		}
		if ('gug' == sign) {
			data.captcha = $input.val().trim();
			if ('gug' == type) {
				flag = true;
			}
			//obj.modHide('#mod-gug');
			tobj.unbindOtp(data, flag);
		} else if ('phone' == sign) {
			//obj.modHide('#mod-phone');
			tobj.unbindOther({
				code: code
			});
		} else if ('email' == sign) {
			//obj.modHide('#mod-email');
			tobj.unbindOther({
				code: code
			}, true);
		}
	});

	// 按钮
	obj.btnFn(function (that) {
		var sign = that.attr('data-sign'),
			data = {
				key: '',
				value: ''
			},
			flag = that.hasClass('off');
		if (flag) {
			data.value = 'OFF';
		} else {
			data.value = 'ON';
		}
		if (1 == sign) {
			data.key = 'LoginEmailNotice';
		} else if (2 == sign) {
			data.key = 'DistanceLoginNotice';
		} else if (3 == sign) {
			data.key = 'TopUpNotice';
		} else if (4 == sign) {
			data.key = 'WithrawalNotice';
		} else if (5 == sign) {
			data.key = 'NeedSecondaryAuth';
		} else if (6 == sign) {
			data.key = 'MarketOrderPriceLimit';
			var value = $('.price').val();
			if (data.value == 'OFF') {
				// $('input').prop('disabled',true);
				// $('button').prop('disabled',true);
				// $('button').css('background','#b8c3cc');
				$('.form-default').css('display', 'none');
				if (value) {
					data.value = 'OFF,' + value / 100;
				} else {
					data.value = 'OFF,' + '';
				}
			} else {
				// $('input').prop('disabled',false);
				// $('button').prop('disabled',false);
				// $('button').css('background','#0e7dcc');
				$('.form-default').css('display', 'block');
				if (value) {
					data.value = 'ON,' + value / 100;
				} else {
					data.value = 'ON,' + '';
				}
			}
		}
		tobj.setUserInfo(data, sign);
	});

	// 解除绑定弹窗
	$('.safeset-table').on('click', '[data-bind]', function () {
		var sign = $(this).attr('data-bind');
		if ('phone' == sign) {
			obj.modShow('#mod-phone');
		} else if ('email' == sign) {
			obj.modShow('#mod-email');
		} else if ('gug' == sign) {
			obj.modShow('#mod-gug');
		}
	});

	$(window).on('click', function () {
		if ($('.search-box>ul').hasClass('show') || $('.dropdown-list').hasClass('show')) {
			$('.search-box>ul').removeClass('show');
			$('.dropdown-list').removeClass('show');
			$('.dropdown-txt').removeClass('show');
			$('.other-wrap').unbind('keydown');
		}
	});
};