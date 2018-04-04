$(function () {
    window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop,
            top_div = $('#header');
        if (t >= 100) {
            top_div.css('background', 'rgba(255,255,255,1)')
        } else {
            top_div.css('background', 'rgba(255,255,255,' + (t + 30) / 100 + ')');
        }
    }
    $('#aside-tab').on('click', 'li', function () {
        var _this = $(this),
            _id = _this.attr('data-id');
        $('#aside-tab>li').css('color', '#7d7d7d');
        _this.css('color', '#0a8eeb')
        $('.article').addClass('hide');
        $('.article').eq(_id).removeClass('hide');
    });

    if (0 != $('.rate').length) {
        //切换交易费率
        $('.tab-change').on('click', '>li', function () {
            $('.tab-change>li').removeClass('on');
            $(this).addClass('on');
            var basicid = $(this).attr('data-id');
            var index = $(this).attr('data-type');
            $('.other-tables>table').removeClass('active');
            $('.other-tables>table').eq(index).addClass('active');
            getlist(basicid);
        });
        getlist('mbtc');
        // getRatelist('cny');
    }
    if (0 != $('.document-index').length) {
        var _search = location.search;
        _search = _search.split('=')[1];
        if (_search) {
            $('#aside-tab>li').css('color', '#7d7d7d');
            $('.article').addClass('hide');
            if (1 == _search) {
                $('#aside-tab>li').eq(1).css('color', '#0a8eeb')
                $('.article').eq(1).removeClass('hide');
            } else if (2 == _search) {
                $('#aside-tab>li').eq(2).css('color', '#0a8eeb')
                $('.article').eq(2).removeClass('hide');
            }
        }
    }

    function getlist(basicid) {
        var url = '/Common/GetVipRateList',
            html = '',
            html1 = '',
            basicid = basicid;
        obj.ajaxFn(url, {
            callback: function (res) {
                if (res.IsSuccess) {
                    var list = res.Data;
                    localStorage.setItem('list', list);
                    for (var i = 0; i < list.length; i++) {
                        html += '<tr>\
                        <td>VIP-' + list[i].Id + '</td>\
                        <td>A&times;' + list[i].MakerRate + '</td>\
                        <td>B&times;' + list[i].TakerRate + '</td>\
                     </tr>';
                        html1 += '<tr>\
                        <td>VIP-' + list[i].Id + '</td>\
                        <td>0</td>\
                        <td>A&times;' + list[i].WithdrawRate + '</td>\
                     </tr>';

                    }
                    // 筛选市场
                    $('#market-search').on('input', function () {
                        var txt = $(this).val();
                        setTimeout(function () {
                            updateRechargeList(basicid, list, txt);
                        }, 500);
                    });
                    getRatelist(basicid, list);
                    getRechargeList(basicid, list);
                    $('.vipgrade').find('tbody').html(html);
                    $('.recharge-rate').find('tbody').html(html1);
                }
            }
        });
    };

    function getRatelist(basicid, list) {
        var url = '/Market/GetRateListByBasicid',
            data = {
                basicid: basicid
            },
            html = '',
            select = '.table-1th';
        if ('eth' == basicid) {
            select = '.table-2th';
        } else if ('bitcny' == basicid) {
            select = '.table-3th';
        } else if ('usdt' == basicid) {
            select = '.table-4th';
        }
        obj.ajaxFn(url, {
            data: data,
            callback: function (res) {
                if (res.IsSuccess) {
                    // var list = localStorage.getItem('list');
                    var item = res.Data;
                    if (0 != item.length) {
                        for (var i = 0; i < item.length; i++) {
                            var text = '',
                                text1 = '';
                            for (var j = 0; j < list.length; j++) {
                                text += '<td>' + list[j].MakerRate * (item[i].MakerFeeRate * 100000) / 1000 + '%</td>\
                           <td>' + list[j].TakerRate * (item[i].TakerFeeRate * 100000) / 1000 + '%</td>';
                            }
                            html += '<tr>\
                        <td>' + item[i].Id.split('_')[1].toUpperCase() + '</td>' + text + '\
                        </tr>';
                        }
                    } else {
                        html = '<tr>\
                  <td colspan="13">暂无数据</td>\
                  </tr>';
                    }
                    $(select).find('tbody').html(html);
                }
            }
        });
    };

    function getRechargeList(basicid, list) {
        var url = '/currency/GetFeeRateList',
            data = {
                basicid: basicid
            },
            html = '';
        obj.ajaxFn(url, {
            callback: function (res) {
                if (res.IsSuccess) {
                    // var list = localStorage.getItem('list');
                    var item = res.Data;
                    if (0 != item.length) {
                        for (var i = 0; i < item.length; i++) {
                            var text = '',
                                text1 = '';
                            for (var j = 0; j < list.length; j++) {
                                text += '<td>' + list[j].DepositRate * (item[i].DepositFeeRate * 100000) / 1000 + '%</td>\
                           <td>' + list[j].WithdrawRate * (item[i].WithdrawFeeRate * 100000) / 1000 + '%</td>';
                            }
                            html += '<tr>\
                        <td>' + item[i].Id.toUpperCase() + '</td>' + text + '\
                        </tr>';
                        }
                    } else {
                        html = '<tr>\
                  <td colspan="13">暂无数据</td>\
                  </tr>';
                    }
                    $('.deposit-rate').find('tbody').html(html);
                }
            }
        });
    };

    function updateRechargeList(basicid, list, coin) {
        if (!coin) {
            getlist('mbtc');
            return false;
        }
        var url = '/Market/GetRateListByBasicid',
            data = {
                basicid: basicid
            },
            html = '',
            select = '.table-1th';
        if ('eth' == basicid) {
            select = '.table-2th';
        } else if ('bitcny' == basicid) {
            select = '.table-3th';
        } else if ('usdt' == basicid) {
            select = '.table-4th';
        }
        obj.ajaxFn(url, {
            data: data,
            callback: function (res) {
                if (res.IsSuccess) {
                    // var list = localStorage.getItem('list');
                    var item = res.Data;
                    if (0 != item.length) {
                        for (var i = 0; i < item.length; i++) {
                            if (coin == item[i].Id.split('_')[1]) {
                                var text = '',
                                    text1 = '';
                                for (var j = 0; j < list.length; j++) {
                                    text += '<td>' + list[j].MakerRate * (item[i].MakerFeeRate * 1000000) / 10000 + '%</td>\
                              <td>' + list[j].TakerRate * (item[i].TakerFeeRate * 1000000) / 10000 + '%</td>';
                                }
                                html += '<tr>\
                           <td>' + item[i].Id.split('_')[1].toUpperCase() + '</td>' + text + '\
                           </tr>';
                            }
                        }
                    } else {
                        html = '<tr>\
                  <td colspan="13">暂无数据</td>\
                  </tr>';
                    }
                    $(select).find('tbody').html(html);
                }
            }
        });
    };
});