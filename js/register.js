$(function () {

    //关闭注册页面
    // if(0!=$('.close-register').length){
    //    var url = location.search;
    //    if(url=='?XBrickregister'){
    //       $('.close-register').removeClass('hide');
    //       obj.modHide('#mod-bind');
    //    }else{
    //       $('.close-register').addClass('hide');
    //       obj.modShow('#mod-bind');
    //       setTimeout(function(){
    //          $('#mod-bind .mod-body').html('<p>'+$.t('public_test')+'</p>');
    //       },500);
    //    }
    // }

    $('.box-checkbox').on('mouseover', '.bind_ip', function () {
        $('.cont-tips').css("display", "block");
    });
    $('.box-checkbox').on('mouseout', '.bind_ip', function () {
        $('.cont-tips').css("display", "none");
    });

    if (0 != $('#login-box').length || 0 != $('#register-box').length) {
        // 监听手机号/邮箱
        $('#account').on('input', function () {
            var account = $(this).val();
            if ('' != $(this).val()) {
                // if(!Number.isNaN($(this).val())){
                if (!obj.validate(obj.reg_email, account)) {
                    // $('.btn-dropdown').addClass('show');
                    // $('.msg-show').addClass('show').removeClass('hide');
                    $('.email-show').removeClass('show');
                } else {
                    // $('.btn-dropdown').removeClass('show');
                    // $('.msg-show').removeClass('show');
                    $('.email-show').addClass('show').removeClass('hide');
                }
            } else {
                // $('.btn-dropdown').removeClass('show');
                // $('.msg-show').removeClass('show');
                $('.email-show').addClass('show').removeClass('hide');
            }
        });

        var tobj = {
            // 登录密码次数
            count: 5,
            // 国内/国外注册
            isLocal: true,
            // 发送手机/邮箱验证码
            getCaptcha: function (that, data, flag) {
                var url = '/user/PhoneActiveApply',
                    type = that.attr('data-type');
                if (flag) {
                    url = '/user/EmailActiveApply';
                }
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = '',
                            s = 59;
                        if (res.IsSuccess) {
                            that.next().removeClass('show');
                            if (flag) {
                                s = 59;
                            }
                            obj.countDown(that, s, $.t('click_send'));
                            if (type == 'msg') {
                                msg = $.t('send_phone');
                            } else if ('voice' == type) {
                                msg = $.t('send_code1');
                            } else {
                                msg = $.t('send_email');
                            }
                            obj.hideTips(msg);
                            obj.formValidate('.btn-msg', null, true);
                            obj.formValidate('#phone', null, true);
                            obj.formValidate('#email', null, true);
                        } else {
                            if (164 == res.Code) {
                                msg = $.t('phone_used');
                                obj.formValidate('#phone', msg);
                                if (flag) {
                                    msg = $.t('mail_used');
                                    obj.formValidate('#email', msg);
                                }
                            } else if (203 == res.Code) {
                                msg = $.t('captcha_send');
                                if (flag) {
                                    msg = $.t('captcha_sent');
                                }
                                that.next().addClass('show').find('span').html(msg);
                                obj.formValidate('.btn-msg', msg);
                            } else if (404 == res.Code) {
                                msg = $.t('phone_number');
                                if (flag) {
                                    msg = $.t('email');
                                } else {

                                }
                                msg = $.t("is_bind") + msg + $.t("set_first") + '<a href="./toSafeSet.html">' + $.t("unbind") + '</a>' + $.t("operation");
                            }
                            if (203 != res.Code) {
                                if (flag) {
                                    $('#email').parent().find('box-tips').addClass('show').find('span').html(msg);
                                } else {
                                    $('#phone').parent().find('box-tips').addClass('show').find('span').html(msg);
                                }
                            }
                        }
                    }
                });
            },
            // 发送手机/邮箱验证码
            getCaptchaCode: function (that, data, flag) {
                var url = '/account/SendForgotPasswordCaptcha';
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = $.t('send_phone'),
                            s = 59;
                        if ('voice' == that.attr('data-type')) {
                            msg = $.t('send_code1');
                        }
                        if (res.IsSuccess) {
                            that.next().removeClass('show');
                            if (flag) {
                                s = 59;
                                msg = $.t('send_email');
                            }
                            obj.countDown(that, s, $.t('click_send'));
                            obj.hideTips(msg);
                        } else {
                            if (0 == res.Code) {
                                msg = $.t('picture');
                                // $('#code').next().addClass('show').find('span').html(msg);
                                obj.formValidate('#code', msg);
                            } else if (-3 == res.Code) {
                                msg = $.t('picture');
                                // $('#code').next().addClass('show').find('span').html(msg);
                                $('#pic-captcha').trigger('click');
                                obj.formValidate('#code', msg);
                            } else if (203 == res.Code) {
                                msg = $.t('captcha_send');
                                if (flag) {
                                    msg = $.t('captcha_sent');
                                }
                                that.next().addClass('show').find('span').html(msg);
                            } else if (404 == res.Code) {
                                msg = $.t('phone_number');
                                if (flag) {
                                    msg = $.t('email');
                                }
                                msg = $.t("is_bind") + msg + $.t("set_first") + '<a href="./toSafeSet.html">' + $.t("unbind") + '</a>' + $.t("operation");
                                that.next().addClass('show').find('span').html(msg);
                            } else if (406 == res.Code) {
                                msg = $.t('id_error');
                                that.next().addClass('show').find('span').html(msg);
                            }
                        }
                    }
                });
            },
            // 绑定手机/邮箱
            bindSomething: function (that, data, flag) {
                var url = '/user/BindPhone';
                if (flag) {
                    url = '/user/BindEmail';
                }
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = '';
                        if (res.IsSuccess) {

                            if (!flag) {
                                obj.getAuthType({
                                    callback: function (res) {
                                        var $phone = $('#input-phone').parent(),
                                            $gug = $('#input-gug').parent(),
                                            local = window.location,
                                            wUrl = local.pathname.toLowerCase();
                                        if (res.IsSuccess) {
                                            if (0 == res.Data) { // 未绑定

                                            } else if (1 == res.Data) { // 绑定邮箱
                                            } else if (2 == res.Data) { // 绑定手机
                                            } else if (3 == res.Data) { // 邮箱+手机
                                                obj.modShow('#mod-prompt');
                                                $('#mod-prompt .mod-body').html('<p>' + $.t('to_Auth') + '</p>');
                                            } else if (4 == res.Data) { // 绑定otp
                                            } else if (5 == res.Data) { // 邮箱+otp
                                            } else if (6 == res.Data) { // 手机+otp
                                            } else if (7 == res.Data) { // 邮箱+手机+otp
                                                $('#google').next().removeClass('show');
                                                obj.modShow('#mod-bind');
                                            }
                                        }
                                    }
                                });
                            } else {
                                $('.btn-msg').next().removeClass('show');
                                obj.modShow('#mod-bind');
                                that.closest('.bind-box')[0].reset();
                            }
                        } else {
                            if (201 == res.Code) {
                                msg = $.t('verify_error');
                                if (flag) {
                                    msg = $.t('email_error');
                                }
                                $('.btn-msg').next().addClass('show').find('span').text(msg);
                            } else if (202 == res.Code) {
                                msg = $.t('expired');
                                $('.btn-msg').next().addClass('show').find('span').text(msg);
                            } else if (-1 == res.Code) {
                                msg = $.t('otp');
                                $('#google').next().addClass('show').find('span').text(msg);
                            }
                            // $('.btn-msg').next().addClass('show').find('span').text(msg);
                        }
                        that.prop('disabled', false);
                        that.text($.t('bind'));
                    },
                    errorCallback: function (res) {
                        obj.modShow('#mod-error');
                        $('#mod-error .errorMsg').html($.t('operate_fail'));
                        that.prop('disabled', false);
                        that.text($.t('bind'));
                    }
                });
            },
            // 二次登陆验证
            secondVerify: function (that, data) {
                obj.ajaxFn('/user/SecondVerify', {
                    data: data,
                    callback: function (res) {
                        var msg = '',
                            $tips = that.closest('form').find('.box-auth.on .box-tips');
                        $tips.removeClass('show');
                        if (res.IsSuccess) {
                            // window.location.href = '/';
                            if (obj.getCookie('local_href')) {
                                local_href = obj.getCookie('local_href');
                            } else {
                                local_href = '/';
                            }
                            window.location.href = local_href;
                        } else {
                            if (201 == res.Code) {
                                msg = $.t('verify_error1');
                            } else if (202 == res.Code) {
                                msg = $.t('expired');
                            }
                            $tips.addClass('show');
                            $tips.find('span').text(msg);
                        }
                        that.prop('disabled', false);
                        that.text($.t('Submit_verified'));
                    },
                    errorCallback: function () {
                        that.prop('disabled', false);
                        that.text($.t('Submit_verified'));
                    }
                });
            },
            // 获取用户绑定认证类型
            getAuthType: function () {
                obj.getAuthType({
                    callback: function (res) {
                        var $phone = $('#input-phone').parent(),
                            $gug = $('#input-gug').parent(),
                            local = window.location,
                            wUrl = local.pathname.toLowerCase();
                        if (res.IsSuccess) {
                            if (0 == res.Data) { // 未绑定

                            } else if (1 == res.Data) { // 绑定邮箱
                                if (0 != $('.validate-box').length || 0 != $('#register-box').length) {
                                    local.href = './bind-validate.html';
                                }
                            } else if (2 == res.Data) { // 绑定手机
                                // if('/register.html'===wUrl){
                                //    local.href='/';
                                // }
                            } else if (3 == res.Data) { // 邮箱+手机
                            } else if (4 == res.Data) { // 绑定otp
                            } else if (5 == res.Data) { // 邮箱+otp
                            } else if (6 == res.Data) { // 手机+otp
                            } else if (7 == res.Data) { // 邮箱+手机+otp
                            }
                            if (0 != $phone.length && 0 != $gug.length) {
                                if (2 == res.Data || 3 == res.Data) {
                                    $phone.find('.code-tab').addClass('hide');
                                    $phone.addClass('on').removeClass('hide');
                                } else if (4 == res.Data || 5 == res.Data) {
                                    $gug.find('.code-tab').addClass('hide');
                                    $gug.addClass('on').removeClass('hide');
                                } else if (6 == res.Data || 7 == res.Data) {
                                    $gug.addClass('on').removeClass('hide');
                                }
                            }
                        }
                    }
                });
            }
        };

        // 验证手机号/邮箱是否存在
        $('#account,#email').on('blur', function (e) {
            var that = $(this),
                val = that.val().trim(),
                flag = true;
            $(this).trigger('input');
            if (isNaN(val)) {
                if (val.length >= 6 && val.length <= 50) {
                    if (obj.validate(obj.reg_email, val)) {
                        if (0 != $('#register-box').length && 0 != $('#btn-submit').length) {
                            obj.ajaxFn('/account/EmailIsUsed', {
                                data: {
                                    emailAddress: val
                                },
                                callback: function (res) {
                                    if (res.IsSuccess) {
                                        obj.formValidate('#account', null, true);
                                        if (res.Data) {
                                            obj.formValidate('#account', $.t('registered'));
                                            flag = false;
                                        }
                                    }
                                }
                            });
                        } else {
                            obj.formValidate('#account', null, true);
                        }
                    } else {
                        obj.formValidate('#account', $.t('email_format'));
                        flag = false;
                    }
                } else {
                    setTimeout(function () {
                        obj.formValidate('#account', $.t('mail_length'));
                    }, 100);
                    flag = false;
                }
            } else if (!isNaN(val)) {
                // setTimeout(function(){
                //      obj.formValidate('#account',$.t('email_format'));
                //   },100);
                //var num = $('.dropdown-num').text();
                if (val.length == 11) {
                    val = /*num + '-' + */ val;
                    if (0 != $('#register-box').length && 0 != $('#btn-submit').length) {
                        obj.ajaxFn('/account/PhoneIsUsed', {
                            data: {
                                phoneNumber: val
                            },
                            callback: function (res) {
                                if (res.IsSuccess) {
                                    obj.formValidate('#account', null, true);
                                    if (res.Data) {
                                        obj.formValidate('#account', $.t('phone_been'));
                                        flag = false;
                                    }
                                }
                            }
                        });
                    } else {
                        obj.formValidate('#account', null, true);
                    }
                } else if (0 != val.length) {
                    setTimeout(function () {
                        obj.formValidate('#account', $.t('email_format'));
                    }, 100);
                    flag = false;
                }
            }
            if (0 == val.length) {
                obj.formValidate('#account', $.t('content_empty'));
                flag = false;
            } else {
                obj.formValidate('#account', null, true);
            }
            obj.flag = flag;
        });

        // 图片验证码判空
        $('#code').on('blur', function () {
            var val = $(this).val().trim(),
                flag = true;
            if (0 == val.length) {
                obj.formValidate('#code', $.t('code_empty'));
                flag = false;
            } else {
                obj.formValidate('#code', null, true);
            }
            obj.flag = flag;
        });

        // 下拉国际区号列表
        $('.box-input').on('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
        });
        $('.list-dropdown').on('click', '>li', function () {
            var that = $(this),
                _txt = that.find('span').text(),
                _id = that.attr('data-value'),
                pathname = location.pathname,
                $form = $('.my-register'),
                account = '';

            _id = (_id || '86').substr(_id.indexOf('+') + 1);
            $('.dropdown-num').text(_id);
            that.addClass('on').siblings('li').removeClass('on');
            that.parent().removeClass('show');
            if (0 != $('.box-area').length) {
                $('.box-area .dropdown-txt').html('<span data-id="' + _id + '">' + _txt + '</span><i class="icon icon-down4"></i>');
                if ('/r.html' == pathname) {
                    if (_id != 86) {
                        sessionStorage.setItem('country', "" + _id + ';' + _txt);
                        tobj.isLocal = false;
                        $form.find('.r1').removeClass('show').addClass('hide');
                        $form.find('.r2').addClass('show').removeClass('hide');
                        $('#email').on('blur', function () {
                            var val = $(this).val().trim();
                            flag = obj.validate(obj.reg_email, val);
                            if (!val) {
                                obj.formValidate('#email', $.t('enter_email'));
                            } else if (!flag && val) {
                                obj.formValidate('#email', $.t('email_format'));
                            } else {
                                obj.formValidate('#email', null, true);
                            }
                            account = $('#email').val();
                            if (!!account) {
                                if (obj.validate(obj.reg_email, account)) {
                                    $('.email-show').addClass('show').removeClass('hide');
                                } else {
                                    $('.email-show').removeClass('show');
                                }
                            } else {
                                $('.email-show').removeClass('show').addClass('hide');
                            }
                        });
                    } else {
                        tobj.isLocal = true;
                        $form.find('.r1').removeClass('show hide');
                        $form.find('.r2').removeClass('show').addClass('hide');
                    }
                    if (!tobj.isLocal) {
                        account = $('#email').val();
                    } else {
                        account = $('#account').val();
                    }
                    if (!!account) {
                        if (obj.validate(obj.reg_email, account)) {
                            $('.email-show').addClass('show').removeClass('hide');
                            // $('.msg-show').removeClass('show');
                        } else {
                            $('.email-show').removeClass('show');
                            // $('.msg-show').addClass('show').removeClass('hide');
                        }
                    } else {
                        $('.email-show,.msg-show').removeClass('show').addClass('hide');
                    }
                }
            }
            obj.formValidate('.dropdown-txt', null, true);
        });
        $(window).on('click', function (e) {
            e = e || window.event;
            $('.list-dropdown').removeClass('show');
        });

        if (0 != $('#register-box').length) {
            var _href = window.location.search;
            if (_href) {
                if(_href.split('=')[0] == '?email'){
                    var _email = _href.split('=')[1];
                    $('#email').val(decodeURIComponent(_email));
                }else{
                    var promoterId = _href.split('&')[0].split('=')[1];
                    if (promoterId) {
                        localStorage.setItem("promoterId", promoterId);
                    }
                }
            }
            setTimeout(function () {
                $('#pic-captcha').trigger('click');
            }, 100);
            $('.box-area .dropdown-txt,.btn-dropdown').on('click', function () {
                var that = $(this),
                    $list = that.parent().find('.list-dropdown');
                if ($list.hasClass('show')) {
                    $list.removeClass('show');
                } else {
                    $list.addClass('show');
                }
            });
            $('#register-box').on('keypress', function (e) {
                e = e || window.event;
                if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
                    $('#btn-submit').trigger('click');
                }
            });
            $('#apply').on('click', function () {
                var that = $(this),
                    flag = that.prop('checked'),
                    $btn = that.closest('form').find('#btn-submit');

                $btn.prop('disabled', !flag);
            });
            // 手机号/邮箱注册
            $('#btn-submit').on('click', function () {
                var account = $('#email').val().trim(),
                    pwd = $('#pwd').val().trim(),
                    repwd = $('#repwd').val().trim(),
                    code = $('#code').val().trim(),
                    msgCode = $('#msg-code').val().trim(),
                    emailCode = $('#email-code').val().trim(),
                    _country = '',
                    lv = obj.pwdValidate(pwd),
                    sel = '',
                    type = 'msg',
                    that = $(this);

                $('#pwd').trigger('blur');
                $('#repwd').trigger('blur');
                $('#code').trigger('blur');
                if (tobj.isLocal) {
                    $('#account').trigger('blur');
                    if ($('.msg-show').hasClass('show')) {
                        $('#msg-code').trigger('blur');
                    }
                    if (obj.validate(obj.reg_email, account)) {
                        if (6 > account.length || account.length > 50) {
                            obj.formValidate('#account', $.t('mail_length'));
                            obj.flag = false;
                        }
                    } else {
                        // if(6>account.length||account.length>30){
                        // if(11!=account.length){
                        //    obj.formValidate('#account',$.t('phone_equal'));
                        //    obj.flag=false;
                        // }
                        obj.formValidate('#account', $.t('email_format'));
                    }
                } else {
                    account = $('#email').val().trim();
                    $('#email').trigger('blur');
                    if (6 > account.length || account.length > 50) {
                        obj.formValidate('#email', $.t('mail_length'));
                        obj.flag = false;
                    }
                }
                if ($('.email-show').hasClass('show')) {
                    $('#email-code').trigger('blur');
                    type = 'email';
                }
                // if(_country){
                //    obj.flag=false;
                //    obj.formValidate('.dropdown-txt',$.t('choose_area'));
                // }else{
                //    obj.formValidate('.dropdown-txt',null,true);
                //    _country=$('.dropdown-txt>span').data('id');
                // }
                if (8 > pwd.length || 20 < pwd.length) {
                    obj.flag = false;
                    obj.formValidate('#pwd', $.t('pwd_require'));
                } else if (8 <= pwd.length && 20 >= pwd.length) {
                    if (1 >= lv) {
                        obj.flag = false;
                        obj.formValidate('#pwd', $.t('Registration'));
                    } else {
                        obj.flag = true;
                        obj.formValidate('#pwd', null, true);
                    }
                }
                if (pwd != repwd) {
                    obj.flag = false;
                }
                if (obj.flag) {
                    var _href = window.location.search,
                        _promoter = '';
                    if (_href) {
                        _href = _href.split('&')[0].split('=')[1];
                        if (_href) {
                            _promoter = _href;
                        }
                    } else if (localStorage.getItem("promoterId")) {
                        _promoter = localStorage.getItem("promoterId");
                    }
                    that.prop('disabled', true).text($.t('registering'));
                    var data = {
                            password: pwd,
                            validCaptcha: msgCode,
                            picCaptcha: code,
                            countryCode: _country,
                            promoter: _promoter
                        },
                        sign = false;
                    if ('msg' == type) {
                        /*var prev = $('.dropdown-num').text().substr(1);
                        account = prev + '-'+account;*/
                        data.phoneNumber = account;
                        obj.ajaxFn('/account/RegisterByPhone', {
                            data: data,
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    sign = true;
                                    localStorage.setItem('account', account.substr(account.indexOf('-') + 1));
                                    tobj.getAuthType();
                                    //window.location.href = './bind-validate.html';
                                    obj.modShow('#mod-prompt');
                                    $('#mod-prompt .mod-body').html('<p>' + $.t('to_Auth') + '</p>');
                                    obj.setCookie('country', _country + ';' + $('.dropdown-txt>span').text(), 1);
                                } else {
                                    if (-1 == res.Code) {
                                        msg = $.t('verify_error');
                                        obj.formValidate('.btn-msg', msg);
                                    } else if (-2 == res.Code) {
                                        msg = $.t('error_fail');
                                        obj.formValidate('#msg-code', msg);
                                    }
                                    $('#pic-captcha').trigger('click');
                                }
                                localStorage.setItem('sign', sign);
                                that.prop('disabled', false).text($.t('register3'));
                            },
                            errorCallback: function () {
                                that.prop('disabled', false).text($.t('register3'));
                            }
                        });
                    } else {
                        data.email = account;
                        data.validCaptcha = emailCode;
                        obj.ajaxFn('/account/RegisterByEmail', {
                            data: data,
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    sign = true;
                                    localStorage.setItem('account', account);
                                    obj.setCookie('country', _country + ';' + $('.dropdown-txt>span').text(), 1);
                                    // obj.modShow('#mod-prompt');
                                    // $('#mod-prompt .mod-body').html('<p>'+$.t('to_Auth')+'</p>');
                                    window.location.href = './bind-validate.html';
                                } else {
                                    if (-1 == res.Code) {
                                        msg = $.t('email_error');
                                        obj.formValidate('.btn-msg', msg);
                                    } else if (-2 == res.Code) {
                                        msg = $.t('error_fail');
                                        obj.formValidate('#email-code', msg);
                                    }
                                    $('#pic-captcha').trigger('click');
                                }
                                localStorage.setItem('sign', sign);
                                that.prop('disabled', false).text($.t('register3'));
                            },
                            errorCallback: function () {
                                that.prop('disabled', false).text($.t('register3'));
                            }
                        });
                    }
                }
            });

            // 密码强度
            $('#pwd').on('focus', function (e) {
                e = e || window.event;
                e.preventDefault();
                e.stopPropagation();

                var $warn = $('.box-warn');
                if (!$warn.hasClass('show')) {
                    $('.box-warn').addClass('show');
                }
            });
            $('#pwd').on('blur', function (e) {
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
                    obj.formValidate('#pwd', null, true);
                }
                if (0 === val.length) {
                    obj.formValidate('#pwd');
                    flag = false;
                }
                obj.flag = flag;
            });
            $('#pwd').on('input', function (e) {
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

            // 重复密码判空
            $('#repwd').on('blur', function () {
                var repwd = $(this).val().trim(),
                    val = $('#pwd').val().trim(),
                    flag = true;

                if (val != repwd) {
                    obj.formValidate('#repwd', $.t('consist'));
                    flag = false;
                } else {
                    obj.formValidate('#repwd', null, true);
                }
                obj.flag = flag;
            });
            //邮箱格式判断
            // $('#email').on('blur',function(){
            //    var _email = $(this).val().trim(),
            //        flag = obj.validate(obj.reg_email,_email);
            //        console.log(_email);
            //        console.log(flag);
            //    if(!flag){
            //       obj.formValidate('#email',$.t('email_format'));
            //    }else{
            //       obj.formValidate('#email',null,true);
            //    }
            // });

            function msgCodeFn(opt) {
                var url = '',
                    data = {},
                    type = opt.that.attr('data-type');
                if (type == 'email') {
                    url = '/account/SendRegisterEmail';
                    data = {
                        emailAddress: opt.account,
                        captchaCode: opt.code
                    };
                } else if ('voice' == type) {
                    url = '/account/SendRegisterSms';
                    data = {
                        phoneNumber: opt.account,
                        captchaCode: opt.code,
                        isVoice: true
                    };
                } else {
                    url = '/account/SendRegisterSms';
                    data = {
                        phoneNumber: opt.account,
                        captchaCode: opt.code
                    };
                }
                obj.ajaxFn(url, {
                    data: data,
                    callback: function (res) {
                        var msg = '';
                        if (res.IsSuccess) {
                            obj.countDown(opt.that, opt.s);
                            if (type == 'msg') {
                                msg = $.t('send_code');
                            } else if ('voice' == type) {
                                msg = $.t('send_code1');
                            } else {
                                msg = $.t('check_email');
                            }
                            obj.hideTips(msg);
                        } else {
                            if (type == 'msg' || 'voice' == type) {
                                if (-1 == res.Code) {
                                    msg = $.t('minute_sms');
                                    obj.formValidate('.btn-msg', msg);
                                } else if (-2 == res.Code) {
                                    msg = $.t('phone_been');
                                    obj.formValidate('.account,#account', msg);
                                } else if (-3 == res.Code) {
                                    msg = $.t('picture');
                                    obj.formValidate('#code', msg);
                                }
                            } else {
                                if (-1 == res.Code) {
                                    msg = $.t('minute_mail');
                                    obj.formValidate('.btn-msg', msg);
                                } else if (-2 == res.Code) {
                                    msg = $.t('email_been');
                                    sel = '#email';
                                    if (!tobj.isLocal) {
                                        sel = '#email';
                                    }
                                    obj.formValidate(sel, msg);
                                } else if (-3 == res.Code) {
                                    msg = $.t('picture');
                                    obj.formValidate('#code', msg);
                                }
                            }
                            if (-3 == res.Code) {
                                $('#pic-captcha').trigger('click');
                            }
                            flag = false;
                        }
                    }
                });
            }

            var opens = null;
            $('.account').text(obj.account || '');
            if (0 != $('#btn-submit').length) {
                // 获取短信/邮件验证码
                $('.btn-msg').on('click', function () {
                    var that = $(this),
                        type = that.attr('data-type'),
                        account = $('#account').val().trim(),
                        email = $('#email').val().trim(),
                        code = $('#code').val().trim(),
                        codeTimer = null,
                        flag = true;

                    $('#account').trigger('blur');
                    $('#code').trigger('blur');
                    if ('msg' == type || 'voice' == type) {
                        if (!Number.isNaN(account) && account.length == 11) {
                            account = /*$('.dropdown-num').text().substr(1)+'-'+*/ account;
                            msgCodeFn({
                                account: account,
                                code: code,
                                that: that,
                                s: 59
                            });
                        }
                    } else if ('email' == type) {
                        if (obj.validate(obj.reg_email, account || email)) {
                            msgCodeFn({
                                account: account || email,
                                code: code,
                                that: that,
                                s: 59
                            });
                        }
                    }
                    obj.flag = flag;
                });
            } else if (0 != $('.setPwd-box').length) {
                obj.submitForm('.setPwd-box', '#btn-set');
                $('#btn-set').on('click', function () {
                    var pwd = $('#tradepwd').val().trim(),
                        rePwd = $('#traderepwd').val().trim(),
                        $msg = $('.errorMsg'),
                        msg = '',
                        type = $('input[name="validate"]:checked').val(),
                        flag = true;
                    // lv = obj.pwdValidate(pwd);
                    $('#tradepwd').on('blur', function () {
                        var val = $(this).val().trim(),
                            flag = true;
                        if (6 != val.length) {
                            obj.formValidate('#tradepwd', $.t('trade_six'));
                            obj.flag = false;
                        } else {
                            obj.formValidate('#tradepwd', null, true);
                        }
                    });
                    $('#traderepwd').on('blur', function () {
                        var repwd = $(this).val().trim(),
                            val = $('#tradepwd').val().trim(),
                            flag = true;

                        if (val != repwd) {
                            obj.formValidate('#traderepwd', $.t('consist'));
                            flag = false;
                        } else {
                            obj.formValidate('#traderepwd', null, true);
                        }
                        obj.flag = flag;
                    });
                    if (6 != pwd.length || isNaN(pwd)) {
                        obj.formValidate('#tradepwd', $.t('trade_six'));
                        obj.flag = false;
                    } else {
                        obj.formValidate('#tradepwd', null, true);
                    }
                    if (6 != rePwd.length || isNaN(rePwd)) {
                        obj.formValidate('#traderepwd', $.t('trade_six'));
                        obj.flag = false;
                    } else {
                        obj.formValidate('#traderepwd', null, true);
                    }
                    if (pwd != rePwd) {
                        obj.formValidate('#traderepwd', $.t('consist'));
                        flag = false;
                    } else {
                        obj.formValidate('#traderepwd', null, true);
                    }
                    if (obj.flag && (pwd === rePwd) && flag && (6 == pwd.length)) {
                        obj.ajaxFn('/user/SetTradePassword', {
                            data: {
                                password: pwd,
                                type: type
                            },
                            callback: function (res) {
                                if (res.IsSuccess) {
                                    obj.modShow('#mod-setBuzPwd');
                                } else {
                                    if (-1000 == res.Code) {
                                        msg = $.t('user_log');
                                    } else if (211 == res.Code) {
                                        msg = $.t('trade_been');
                                    } else if (213 == res.Code) {
                                        msg = $.t('tran_same');
                                    }
                                    $msg.text(msg);
                                    obj.modShow('#mod-error');
                                }
                            }
                        });
                    }
                });
                $('#btn-certain').on('click', function () {
                    window.location.href = './toSafeSet.html';
                });
            } else if (0 != $('.commit-box').length) {
                //enter键提交表单验证
                obj.submitForm('.commit-box', '#btn-commit');
                //验证tab栏切换
                $('.code-verity').on('click', function (e) {
                    var value = e.target.value,
                        phone = $('.commit-box>.box-input').eq(3),
                        email = $('.commit-box>.box-input').eq(4)
                    google = $('.commit-box>.box-input').eq(5);
                    if (!Number.isNaN(value)) {
                        $(e.target).prop('checked', true);
                    }
                    if (value == 1) {
                        google.attr("class", "box-input hide");
                        // code.attr("class","box-input msg-show show");
                        // code.find('i').eq(0).attr("class","icon icon-bubble");
                        phone.addClass('show').removeClass('hide');
                        email.addClass('hide').removeClass('show');
                    } else if (value == 2) {
                        // $('.btn-msg').attr('data-type',"email");
                        // code.find('i').eq(0).attr("class","icon icon-email");
                        google.attr("class", "box-input hide");
                        // code.attr("class","box-input msg-show show");
                        email.addClass('show').removeClass('hide');
                        phone.addClass('hide').removeClass('show');
                    } else if (value == 3) {
                        // code.attr("class","box-input msg-show hide");
                        email.addClass('hide').removeClass('show');
                        phone.addClass('hide').removeClass('show');
                        google.attr("class", "box-input show");
                    }
                });
                //获取用户安全工具绑定状态
                $('.certify-type').on('blur', function () {
                    var account = $('#user').val().trim();
                    if (account) {
                        obj.ajaxFn('/account/GetAuthType', {
                            data: {
                                account: account
                            },
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    var code = res && res.Code,
                                        type = res.Data && res.Data.Type,
                                        // code = $('.commit-box>.box-input').eq(3),
                                        phone = $('.commit-box>.box-input').eq(3),
                                        email = $('.commit-box>.box-input').eq(4),
                                        card = $('.commit-box>.box-input').eq(1),
                                        google = $('.commit-box>.box-input').eq(5),
                                        labels = $('.code-verity>label');
                                    if (res.Data.IsBindIdNo) {
                                        card.removeClass('hide');
                                    }
                                    if (code == 0) {
                                        obj.formValidate('#user', null, true);
                                    }
                                    if (type == 0) {

                                    } else if (type == 1) {
                                        // code.attr("class","box-input msg-show show");
                                        // code.find('i').eq(0).attr("class","icon icon-email");
                                        email.removeClass('hide').addClass('show');
                                    } else if (type == 2) {
                                        // code.attr("class","box-input msg-show show");
                                        // code.find('i').eq(0).attr("class","icon icon-bubble");
                                        phone.removeClass('hide').addClass('show');
                                    } else if (type == 3) {
                                        labels.eq(0).removeClass('hide');
                                        labels.eq(1).removeClass('hide');
                                        labels.eq(0).find('input').attr('checked', true);
                                        // code.attr("class","box-input msg-show show");
                                        // code.find('i').eq(0).attr("class","icon icon-bubble");
                                        phone.removeClass('hide').addClass('show');
                                    } else if (type == 4) {
                                        labels.eq(2).find('input').attr('checked', true);
                                        google.attr("class", "box-input show");
                                    } else if (type == 5) {
                                        labels.eq(1).removeClass('hide');
                                        labels.eq(2).removeClass('hide');
                                        labels.eq(2).find('input').attr('checked', true);
                                        google.attr("class", "box-input show");
                                    } else if (type == 6) {
                                        labels.eq(0).removeClass('hide');
                                        labels.eq(2).removeClass('hide');
                                        labels.eq(2).find('input').attr('checked', true);
                                        google.attr("class", "box-input show");
                                    } else if (type == 7) {
                                        labels.eq(0).removeClass('hide');
                                        labels.eq(1).removeClass('hide');
                                        labels.eq(2).removeClass('hide');
                                        labels.eq(2).find('input').attr('checked', true);
                                        google.attr("class", "box-input show");
                                    }
                                    // 获取短信/邮件验证码
                                    $('.btn-msg').on('click', function (e) {
                                        var that = $(this),
                                            flag = false,
                                            _type = that.attr('data-type'),
                                            type = '',
                                            userId = res.Data && res.Data.UserId,
                                            idNo = $('#card').val().trim(),
                                            captchaCode = $('.input-validate').val().trim();
                                        if ('msg' == _type || 'voice' == _type) {
                                            type = 2;
                                        } else if ('email' == _type) {
                                            type = 1;
                                            flag = true;
                                        }
                                        if ('voice' == _type) {
                                            tobj.getCaptchaCode(that, {
                                                Type: type,
                                                UserId: userId,
                                                idNo: idNo,
                                                captchaCode: captchaCode,
                                                isVoice: true
                                            }, flag);
                                        } else {
                                            tobj.getCaptchaCode(that, {
                                                Type: type,
                                                UserId: userId,
                                                idNo: idNo,
                                                captchaCode: captchaCode
                                            }, flag);
                                        }
                                    });
                                    //找回登录密码提交
                                    $('#btn-commit').on('click', function () {
                                        var type = $('.msg-show.show [data-type]').attr('data-type'),
                                            account = $('#user').val().trim(),
                                            userId = res.Data && res.Data.UserId,
                                            idNo = $('#card').val().trim(),
                                            code = $('#msg-code').val().trim(),
                                            // google = $('.commit-box>.box-input').eq(4),
                                            labels = $('.code-verity>label'),
                                            captchaCode = $('.input-validate').val().trim();
                                        if ('msg' == type) {
                                            type = 2;
                                        } else if ('email' == type) {
                                            type = 1;
                                            code = $('#email-code').val().trim();
                                        }
                                        if (labels.eq(2).find('input').prop('checked')) {
                                            // code = google.val().trim();
                                            code = $('#google').val().trim();
                                            type = 4;
                                        }
                                        obj.ajaxFn('/account/ForgotPasswordVerify', {
                                            data: {
                                                Type: type,
                                                UserId: userId,
                                                idNo: idNo,
                                                code: code,
                                                captchaCode: captchaCode
                                            },
                                            callback: function (res) {
                                                var msg = '';
                                                if (res.IsSuccess) {;
                                                    localStorage.setItem('UserId', userId);
                                                    localStorage.setItem('account', account);
                                                    window.location.href = './resetPwd.html?account=' + account;
                                                    // if(2===(type&2)){
                                                    //    window.location.href = './resetPwd.html?account='+account;
                                                    // }else if(1===(type&1)){
                                                    //    window.location.href = './email-updatePwd.html?account='+account;
                                                    // }
                                                } else {
                                                    $('#pic-captcha').trigger('click');
                                                    if (406 == res.Code) {
                                                        msg = $.t('id_error');
                                                        obj.formValidate('#card', msg);
                                                    } else if (202 == res.Code) {
                                                        msg = $.t('phone_expires');
                                                        if (labels.eq(2).find('input').prop('checked')) {
                                                            msg = $.t('google_expires');
                                                            obj.formValidate('#google', msg);
                                                        } else if (labels.eq(0).find('input').prop('checked')) {
                                                            obj.formValidate('#msg-code', msg);
                                                        } else if (labels.eq(1).find('input').prop('checked')) {
                                                            msg = $.t('email_expires');
                                                            obj.formValidate('#email-code', msg);
                                                        } else {
                                                            obj.formValidate('#msg-code', msg);
                                                        }
                                                    } else if (-3 == res.Code) {
                                                        msg = $.t('picture');
                                                        $('#pic-captcha').trigger('click');
                                                        obj.formValidate('#code', msg);
                                                    } else if (201 == res.Code) {
                                                        msg = $.t('otp');
                                                        if (labels.eq(2).find('input').prop('checked')) {
                                                            obj.formValidate('#google', msg);
                                                        } else if (labels.eq(0).find('input').prop('checked')) {
                                                            msg = $.t('verify_error');
                                                            obj.formValidate('#msg-code', msg);
                                                        } else if (labels.eq(1).find('input').prop('checked')) {
                                                            msg = $.t('email_error');
                                                            obj.formValidate('#email-code', msg);
                                                        } else {
                                                            msg = $.t('verify_error');
                                                            obj.formValidate('#msg-code', msg);
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    if (32 == res.Code) {
                                        msg = $.t('account_exist');
                                        obj.formValidate('#user', msg);
                                    } else if (-1 == res.Code) {
                                        msg = $.t('verify_error');
                                        $('#pic-captcha').trigger('click');
                                        obj.formValidate('#code', msg);
                                    }
                                }
                            }
                        });
                    }
                });
                // $('#btn-commit').on('click',function(){
                //    var account = $('#user').val().trim(),
                //       code = $('#code').val().trim();
                //       //prev = $('.dropdown-num').text().substr(1);

                //    if(obj.flag){
                //       /*if(!Number.isNaN(account)){
                //          account = prev + '-'+account;
                //       }*/
                //       obj.ajaxFn('/account/GetAuthType',{
                //          data: {account: account,picCaptcha: code},
                //          callback: function(res){
                //             var msg = '',type = 0,id = '';
                //             if(res.IsSuccess){
                //                type = res.Data.Type;
                //                id = res.Data.UserId;
                //                localStorage.setItem('UserId',id);
                //                localStorage.setItem('account',account);
                //                if(2===(type&2)){
                //                   window.location.href = './resetPwd.html?account='+account;
                //                }else if(1===(type&1)){
                //                   window.location.href = './email-updatePwd.html?account='+account;
                //                }
                //             }else{
                //                $('#pic-captcha').trigger('click');
                //                if(32==res.Code){
                //                   msg = $.t('account_exist');
                //                   obj.formValidate('#account',msg);
                //                }else if(-1==res.Code){
                //                   msg = $.t('verify_error');
                //                   $('#pic-captcha').trigger('click');
                //                   obj.formValidate('#code',msg);
                //                }
                //             }
                //          }
                //       });
                //    }
                // });
            } else if (0 != $('.reset-box').length) {
                obj.submitForm('.reset-box', '#btn-reset');
                var sobj = obj.getStorage() || {},
                    pobj = obj.getParam() || {},
                    that = $('.btn-msg'),
                    $btn = $('#btn-reset'),
                    _code = null,
                    _id = null,
                    isEmail = !!pobj.code;
                //$('#account').val(obj.getParam().account || obj.account);
                if (pobj.Userid) {
                    _code = pobj.code;
                    _id = pobj.Userid;
                } else {
                    _id = sobj.Id;
                }

                if (!isEmail) {
                    //$('.box-hide').addClass('show');
                    // $('.msg-show').addClass('show');
                }
                that.on('click', function () {
                    //var account = $('#account').val().trim();
                    //prev = $('.dropdown-num').text().trim().substr(1);

                    if (obj.flag) {
                        //account = prev + '-'+account;
                        obj.ajaxFn('/account/ForgotPasswordApply', {
                            data: {
                                userId: _id,
                                account: pobj.account
                            },
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    obj.countDown(that, 59);
                                } else {
                                    if (203 == res.Code) {
                                        msg = $.t('sms_often');
                                        obj.formValidate('#msg-code', msg);
                                    } else if (1001 == res.Code) {
                                        msg = $.t('not_regist');
                                        obj.formValidate('#account', msg);
                                    }
                                    localStorage.clear();
                                }
                            }
                        });
                    }
                });
                $btn.on('click', function () {
                    var data = {},
                        code = _code,
                        msg = '',
                        pwd = $('#pwd').val().trim(),
                        repwd = $('#repwd').val().trim(),
                        $show = that.closest('.msg-show');
                    if (!pwd) {
                        obj.formValidate('#pwd', $.t('enter_password'));
                        obj.flag = false;
                    }

                    $('#msg-code').on('blur', function () {
                        var val = $(this).val();
                        if (!val) {
                            obj.formValidate('#msg-code', $.t('enter_code'));
                            obj.flag = false;
                        } else {
                            obj.formValidate('#msg-code', null, true);
                        }
                    });
                    $('#repwd').on('blur', function () {
                        var flag = true,
                            repwd = $(this).val().trim();
                        if (!repwd) {
                            obj.formValidate('#repwd', $.t('passd_empty'));
                            flag = false;
                        } else {
                            if (pwd != repwd) {
                                obj.formValidate('#repwd', $.t('consist'));
                                flag = false;
                            } else {
                                obj.formValidate('#repwd', null, true);
                            }
                        }
                        obj.flag = flag;
                    });
                    $('#msg-code').trigger('blur');
                    $('#repwd').trigger('blur');
                    if (1 == obj.pwdValidate(pwd)) {
                        obj.formValidate('#pwd', $.t('Registration'));
                        obj.flag = false;
                    }
                    if (obj.flag) {
                        $btn.prop('disabled', true).text($.t('Modifying'));
                        if ($show.hasClass('show')) {
                            code = $('#msg-code').val().trim();
                        }
                        obj.ajaxFn('/account/ForgotPassword', {
                            data: {
                                userId: _id,
                                password: pwd,
                                code: code
                            },
                            callback: function (res) {
                                if (res.IsSuccess) {
                                    obj.modShow('#mod-tips');
                                } else {
                                    if (0 == res.Code) {
                                        msg = $.t('pwd_format');
                                    } else if (-1 == res.Code) {
                                        msg = $.t('Unmodified');
                                        window.location.href = './forgotPwd.html';
                                    }
                                    if (that.hasClass('show')) {
                                        obj.formValidate('#msg-code', msg);
                                    } else {
                                        $('.errorText').text(msg);
                                        obj.modShow('#mod-error');
                                    }
                                }
                                $btn.prop('disabled', false).text($.t('modify'));
                                localStorage.clear();
                            },
                            errorCallback: function (res) {
                                $btn.prop('disabled', false).text($.t('modify'));
                            }
                        });
                    }
                });
            } else if (0 != $('.email-box').length) {
                var pobj = obj.getParam(),
                    sobj = obj.getStorage(),
                    _code = null,
                    _id = null;
                $('#email').val(pobj.account || '');
                /*if(0 !=Object.keys(pobj).length){
                   _code = pobj.code;
                   _id = pobj.Userid;
                }else{
                   _id = sobj.Id;
                }*/

                /*$('#btn-commit').on('click',function(){
                   var email = $('#email').val().trim(),
                      code = $('#code').val().trim();

                   $('#email').trigger('input');
                   $('#code').trigger('blur');
                   if(obj.flag && obj.validate(obj.reg_email,email)){
                      obj.ajaxFn('/account/ForgotPasswordApply',{
                         data: {userId: sobj.Id,account: email},
                         callback: function(res){
                            var msg = '';
                            if(res.IsSuccess){
                               $('.getLoginEmail').prop('href','./resetPwd.html?account='+email+'&code='+_code+'&Userid='+sobj.Id);
                               obj.modShow('#mod-tips');
                            }else{
                               $('#pic-captcha').click();
                               if(203 == res.Code){
                                  msg = $.t('frequently');
                               }else if(1001 == res.Code){
                                  msg = $.t('mail_error');
                               }
                               localStorage.clear();
                               $('#mod-error .errorText').text(msg);
                               obj.modShow('#mod-error');
                            }
                         }
                      });
                   }
                });*/
            }
            /*else if(0!=$('.forgotBuzPwd-box').length){
                        obj.submitForm('.forgotBuzPwd-box','#btn-commit');
                        $('#btn-commit').on('click',function(){
                           var account = $('#account').val().trim(),
                              code = $('#code').val().trim(),
                              prev = $('.dropdown-num').text();

                           $('#account').trigger('blur');
                           $('#code').trigger('blur');
                           if(obj.flag){
                              /*if(!Number.isNaN(account)){
                                 account = prev + '-'+account;
                              }*/
            /*obj.getAuthType({
                     callback: function(res){
                        var type = null,msg='';
                        if(res.IsSuccess){
                           type = res.Data;
                           id = res.Data.UserId;
                           localStorage.setItem('Type',type);
                           if(2==(type&2)){
                              window.location.href = './resetBuzPwd.html';
                           }else if(1==(type&1)){
                              window.location.href = './email-updateBuzPwd.html';
                           }
                        }else{
                           if(-1==res.Data){
                              msg = $.t('verify_error');
                              obj.formValidate('#code',msg);
                           }else if(32==res.Data){
                              msg = $.t('account_exist');
                              obj.formValidate('#account',msg);
                           }
                        }
                     }
                  });
               }
            });
         }*/
            else if (0 != $('.resetBuz-box').length) {
                obj.submitForm('.resetBuz-box', '#btn-reset');
                var that = $('.btn-msg'),
                    account = null,
                    //prev = $('.dropdown-num').text(),
                    pobj = obj.getParam(),
                    _code = null,
                    _id = null;
                $('#account').val(obj.account || '');
                account = $('#account').val();
                if (account) {
                    account = account.trim();
                }
                /*if(isEmail){

                }else{
                   $('.box-hide').addClass('show');
                   //$('.msg-show').addClass('show');
                }*/
                //重置交易密码的展示
                obj.getAuthType({
                    callback: function (res) {
                        var $phone = $('.login-box>.box-input').eq(2);
                        var $gug = $('.login-box>.box-input').eq(3);
                        if (res.IsSuccess) {
                            if (2 == res.Data || 3 == res.Data) {
                                $phone.addClass('show').removeClass('hide');
                                $gug.addClass('hide').removeClass('show');
                            } else if (4 == res.Data || 5 == res.Data) {
                                $gug.addClass('show').removeClass('hide');
                                $phone.addClass('hide').removeClass('show');
                            } else if (6 == res.Data || 7 == res.Data) {
                                $gug.addClass('show').removeClass('hide');
                                $phone.addClass('hide').removeClass('show');
                                $('.code-tab').eq(1).addClass('show').removeClass('hide');
                            }
                        }
                        $('.code-tab').on('click', function () {
                            if ($(this).attr('data-type') == 'gug') {
                                $('.code-tab').eq(0).addClass('hide').removeClass('show');
                                $('.code-tab').eq(1).addClass('show').removeClass('hide');
                                $gug.addClass('show').removeClass('hide');
                                $phone.addClass('hide').removeClass('show');
                            } else if ($(this).attr('data-type') == 'phone') {
                                $('.code-tab').eq(0).addClass('show').removeClass('hide');
                                $('.code-tab').eq(1).addClass('hide').removeClass('show');
                                $gug.addClass('hide').removeClass('show');
                                $phone.addClass('show').removeClass('hide');
                            }
                        });
                    }
                });
                that.on('click', function () {
                    var account = obj.account,
                        isEmail = false,
                        data = {},
                        that = $(this);
                    //prev = $('.dropdown-num').text().trim().substr(1);
                    if ('voice' == that.attr('data-type')) {
                        data = {
                            isVoice: true
                        };
                    }
                    isEmail = obj.validate(obj.reg_email, account);
                    $('#account').trigger('blur');
                    if (obj.flag) {
                        //account = prev + '-'+account;
                        obj.ajaxFn('/user/SendForgotTradePasswordCaptcha', {
                            // data: {account: account},
                            data: data,
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    obj.countDown(that, 59);
                                    obj.formValidate('#msg-code', null, true);
                                } else {
                                    if (203 == res.Code) {
                                        msg = isEmail ? $.t('frequently') : $.t('sms_often');
                                        obj.formValidate('#msg-code', msg);
                                    } else if (1001 == res.Code) {
                                        msg = isEmail ? $.t('mail_error') : $.t('phone_error');
                                        obj.formValidate('#account', msg);
                                    }
                                }
                            }
                        });
                    }
                });
                $('#btn-reset').on('click', function () {
                    var pwd = $('#tradepwd').val().trim(),
                        repwd = $('#traderepwd').val().trim(),
                        code = _code || $('#google').val().trim(),
                        type = $('.box-input.show').attr('data-type');
                    // lv=obj.pwdValidate(pwd);
                    if (type == 'gug') {
                        type = 4;
                    } else {
                        type = 2;
                    }
                    $('#tradepwd').on('blur', function () {
                        var val = $(this).val().trim(),
                            flag = true;
                        if (6 != val.length) {
                            obj.formValidate('#tradepwd', $.t('trade_six'));
                            obj.flag = false;
                        } else {
                            obj.formValidate('#tradepwd', null, true);
                        }
                    });
                    $('#traderepwd').on('blur', function () {
                        var repwd = $(this).val().trim(),
                            val = $('#tradepwd').val().trim(),
                            flag = true;
                        if (val != repwd) {
                            obj.formValidate('#traderepwd', $.t('consist'));
                            obj.flag = false;
                        } else {
                            obj.formValidate('#traderepwd', null, true);
                        }
                        obj.flag = flag;
                    });
                    if (!code) {
                        code = $('#msg-code').val().trim();
                    }
                    if (repwd != pwd) {
                        obj.formValidate('#traderepwd', $.t('consist'));
                        obj.flag = false;
                    } else {
                        obj.flag = true;
                    }
                    if (pwd.length != 6 || isNaN(Number(pwd))) {
                        // console.log(1);
                        obj.formValidate('#tradepwd', '交易密码必须是6为有效数字！');
                        obj.flag = false;
                    } else {
                        obj.formValidate('#traderepwd', null, true);
                    }
                    if (obj.flag && (6 == pwd.length) && !isNaN(Number(pwd))) {
                        /*if(!Number.isNaN(account)){
                           account = prev + '-'+account;
                        }*/
                        obj.ajaxFn('/User/ForgotTradePassword', {
                            data: {
                                type: type,
                                password: pwd,
                                code: code
                            },
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    obj.modShow('#mod-tips');
                                } else {
                                    if (201 == res.Code) {
                                        if (2 == type) {
                                            msg = $.t('verify_error');
                                        } else {
                                            msg = $.t('otp');
                                        }
                                    } else if (202 == res.Code) {
                                        msg = $.t('expired');
                                    } else if (213 == res.Code) {
                                        msg = '交易密码不能与登录密码相同'
                                        obj.formValidate('#pwd', msg);
                                    }
                                    $('#mod-error .errorText').text(msg);
                                    obj.modShow('#mod-error');
                                }
                            }
                        });
                    }
                });
            } else if (0 != $('.email-buz-box').length) {
                $('#btn-commit').on('click', function () {
                    var email = $('#email').val().trim(),
                        pobj = obj.getParam(),
                        _code = null,
                        _id = null;

                    if (0 != Object.keys(pobj).length) {
                        _code = pobj.code;
                        _id = pobj.Userid;
                    }

                    $('#email').trigger('blur');
                    if (obj.flag && obj.validate(obj.reg_email, email)) {
                        obj.ajaxFn('/User/ForgotTradePasswordApply', {
                            data: {
                                account: email
                            },
                            callback: function (res) {
                                var msg = '';
                                if (res.IsSuccess) {
                                    window.location.href = './resetBuzPwd.html?code=' + _code + '&Userid=' + _id;
                                } else {
                                    if (203 == res.Code) {
                                        msg = $.t('frequently');
                                    } else if (1001 == res.Code) {
                                        msg = $.t('mail_error');
                                    }
                                    $('#mod-error .errorText').text(msg);
                                    obj.modShow('#mod-error');
                                    localStorage.clear();
                                }
                            }
                        });
                    }
                });
            } else if (0 != $('.bind-box').length) {
                obj.submitForm('.bind-box', '#btn-bind');

                $('#btn-bind').on('click', function () {
                    var that = $(this),
                        _type = that.attr('data-type'),
                        code = $('#msg-code').val().trim(),
                        otp = $('#google').val(),
                        msg = '';
                    if (otp) {
                        otp = otp.trim()
                    }
                    if ('msg' == _type) {
                        var flag = $('#google').parent().hasClass('hide');
                        if (otp && !flag) {
                            tobj.bindSomething(that, {
                                code: code,
                                otp: otp
                            });
                            $('#google').next().removeClass('show')
                        } else if (flag) {
                            tobj.bindSomething(that, {
                                code: code
                            });
                            $('#google').next().removeClass('show')
                        } else {
                            msg = $.t('empty_opt');
                            $('#google').next().addClass('show').find('span').text(msg);
                        }
                    } else {
                        tobj.bindSomething(that, {
                            secretValue: code
                        }, true);
                    }
                    $(this).text($.t('binding'));
                    $(this).prop('disabled', true);
                });
                // 获取短信/邮件验证码
                $('.btn-msg').on('click', function () {
                    var that = $(this),
                        type = that.attr('data-type'),
                        account = '',
                        email = '',
                        codeTimer = null,
                        flag = '';
                    $('#email').trigger('blur');
                    $('#email').on('blur', function () {
                        var val = $(this).val().trim();
                        if (!val) {
                            obj.formValidate('#email', $.t('enter_email'));
                        }
                        flag = obj.validate(obj.reg_email, val);
                        if (!flag) {
                            obj.formValidate('#email', null, true);
                        }
                    });
                    if (0 != $('#phone').length) {
                        account = $('#phone').val().trim();
                    }
                    if (0 != $('#email').length) {
                        email = $('#email').val().trim();
                    }
                    if ('msg' == type) {
                        if (!Number.isNaN(account) && account.length == 11) {
                            account = /*$('.dropdown-num').text().substr(1)+'-'+*/ account;
                            tobj.getCaptcha(that, {
                                phoneNumber: account
                            });
                        }
                    } else if ('voice' == type) {
                        if (!Number.isNaN(account) && account.length == 11) {
                            account = /*$('.dropdown-num').text().substr(1)+'-'+*/ account;
                            tobj.getCaptcha(that, {
                                phoneNumber: account,
                                isVoice: true
                            });
                        }
                    } else if ('email' == type) {
                        if (obj.validate(obj.reg_email, email)) {
                            tobj.getCaptcha(that, {
                                email: email
                            }, true);
                        }
                    }
                });
                $('#email').on('blur', function () {
                    var val = $(this).val().trim();
                    flag = obj.validate(obj.reg_email, val);
                    if (!val) {
                        obj.formValidate('#email', $.t('enter_email'));
                    } else if (!flag && val) {
                        obj.formValidate('#email', $.t('email_format'));
                    } else {
                        obj.formValidate('#email', null, true);
                    }
                });
            } else if (0 != $('.validate-box').length) {
                tobj.getAuthType();
                obj.submitForm('.validate-box', '#btn-auth');
                // 切换谷歌/手机验证
                $('.box-input').on('click', '.code-tab', function () {
                    var $box = $(this).parent();
                    $('.box-auth').removeClass('hide').addClass('on');
                    $box.addClass('hide').removeClass('on');
                });
                // 倒计时
                $('.send-code').on('click', '>button', function () {
                    that = $(this);
                    obj.sendPhoneCaptcha(that, false, function (otp) {
                        if (otp.msg && '' != otp.msg) {
                            obj.formValidate('button', otp.msg);
                        }
                    });
                });
                // 提交验证
                $('#btn-auth').on('click', function () {
                    var $auth = $('.box-auth .on'),
                        that = $(this),
                        _type = $auth.find('p').attr('data-type'),
                        _val = $auth.find('input').val().trim(),
                        data = {
                            isOtp: false,
                            code: _val
                        },
                        $tips = that.closest('form').find('.box-auth.on .box-tips'),
                        msg = '';

                    that.prop('disabled', true);
                    that.text($.t('commit'));
                    if ('phone' == _type) {
                        data.isOtp = true;
                    }
                    if (_val) {
                        tobj.secondVerify(that, data);
                    } else {
                        msg = $.t('code_empty');
                        $tips.addClass('show');
                        $tips.find('span').text(msg);
                    }
                });
            } else if (0 != $('.choose-validate').length) {
                obj.getAuthType({
                    callback: function (res) {
                        var $phone = $('.bind-btn').eq(1);
                        if (res.IsSuccess) {
                            if ((res.Data & 2) != 0) {
                                if (!$phone.hasClass('hide')) {
                                    $phone.addClass('hide');
                                }
                            } else {
                                $phone.addClass('hide');
                            }
                            obj.ajaxFn('/user/GetCountryCode', {
                                callback: function (res) {
                                    var $phone = $('.bind-btn').eq(1),
                                        $h2 = $('.box-title'),
                                        $p = $('.box-tip');
                                    if (res.IsSuccess) {
                                        if (res.Data && (86 != res.Data)) {
                                            $phone.addClass('hide');
                                            $h2.text($.t('bind_google'));
                                            $p.text($.t('security_opt'));
                                        } else {
                                            $phone.addClass('hide');
                                        }
                                    } else {

                                    }
                                }
                            });
                        }
                    }
                });
            }
            if (0 != $('.email-box').length || 0 != $('.email-buz-box').length) {
                $('#email').on('input', function () {
                    var val = $(this).val().trim();
                    if (0 != val.length) {
                        if (!obj.validate(obj.reg_email, val)) {
                            obj.formValidate('#email', $.t('email_format'));
                        } else {
                            obj.formValidate('#email', null, true);
                        }
                    } else if (0 == val.length) {
                        obj.formValidate('#email', $.t('empty'));
                    }
                });
            }
            if (0 != $('.bind-phone').length) {
                obj.getAuthType({
                    callback: function (res) {
                        if (res.IsSuccess) {
                            var input = $('#register-box>.box-input').eq(3);
                            if (0 == res.Data) { // 未绑定
                                input.addClass('hide');
                            } else if (1 == res.Data) { // 绑定邮箱
                                input.addClass('hide');
                            } else if (2 == res.Data) { // 绑定手机
                                input.addClass('hide');
                            } else if (3 == res.Data) { // 邮箱+手机
                                input.addClass('hide');
                            } else if (4 == res.Data) { // 绑定otp
                                input.removeClass('hide');
                            } else if (5 == res.Data) { // 邮箱+otp
                                input.removeClass('hide');
                            } else if (6 == res.Data) { // 手机+otp
                                input.removeClass('hide');
                            } else if (7 == res.Data) { // 邮箱+手机+otp
                                input.removeClass('hide');
                            }
                        }
                    }
                });
                // $('#phone').on('blur',function(){
                //    var val = $(this).val().trim(),
                //       msg = '';
                //    if(!val){
                //       msg = $.t('empty_num');
                //       $('.list-dropdown').next().addClass('show').find('span').text(msg);
                //    }else{
                //       $('.list-dropdown').next().removeClass('show');
                //       if(11!=val.length){
                //          $('.list-dropdown').next().addClass('show').find('span').text($.t('phone_equal'));
                //       }else{
                //          $('.list-dropdown').next().removeClass('show');
                //       }
                //    }
                // });
                $('#msg-code').on('blur', function () {
                    var val = $(this).val().trim(),
                        msg = '';
                    if (!val) {
                        msg = $.t('code_empty');
                        $('.btn-msg').next().addClass('show').find('span').text(msg);
                    } else {
                        $('.btn-msg').next().removeClass('show');
                    }
                });
                $('#google').on('blur', function () {
                    var val = $(this).val().trim(),
                        msg = '';
                    if (!val) {
                        msg = $.t('empty_opt');
                        $('#google').next().addClass('show').find('span').text(msg);
                    } else {
                        $('#google').next().removeClass('show');
                    }
                });
            }
        } else if (0 != $('#login-box').length) {
            $('#login-box').on('keypress', function (e) {
                e = e || window.event;
                if ((e.keyCode && 13 == e.keyCode) || (e.which && 13 == e.which)) {
                    $('#btn-submit').trigger('click');
                }
            });
            /*if(0!=$('#remember').length){
               if(obj.getCookie('account')){
                  $('#account').val(obj.getCookie('account'));
                  $('#remember').prop('checked',true);
               }
            }*/
            $('#btn-submit').on('click', function () {
                // obj.getLanguageType();
                var account = $('#account').val().trim(),
                    pwd = $('#pwd').val().trim(),
                    //prev = $('.dropdown-num').text().substr(1),
                    that = $(this),
                    sign = false,
                    sign = $('#remember').prop('checked'),
                    checked = $('#remember').prop('checked'),
                    exp = new Date();
                if (checked) {
                    var data = {
                        account: account,
                        password: pwd,
                        Name: 'bindIp'
                    };
                } else {
                    data = {
                        account: account,
                        password: pwd
                    };
                }
                exp.setDate(exp.getDate() + 7);

                $('#account').trigger('blur');
                $('#pwd').trigger('blur');
                /*if(sign){
                   obj.setCookie('account',$('#account').val().trim(),exp.toGMTString());
                }else{
                   obj.delCookie('account');
                }*/
                if (obj.flag) {
                    that.prop('disabled', true).text($.t('Log_in'));
                    /*if(!Number.isNaN(account)){
                       account = prev + '-'+account;
                    }*/
                    obj.ajaxFn('/account/Login', {
                        // data: {account: account,password: pwd},
                        data: data,
                        callback: function (res) {
                            var msg = '';
                            if (res.IsSuccess) {
                                obj.getLanguageType();
                                localStorage.setItem('sign', 1);
                                localStorage.setItem('account', account);

                               
                                $('#support>a').prop('href', '//v2web.XBrick.com/KF5/KF5Login?lang=zh_cn');
                                window.KF5SupportBoxAPI.ready(function () {
                                    // 传递用户信息给组件使用
                                    var datas = {
                                        name: ''
                                    };
                                    if (obj.validate(obj.reg_email, account)) {
                                        datas.email = account;
                                    } else {
                                        datas.phone = account;
                                    }
                                    window.KF5SupportBoxAPI.identify(datas);
                                });
                            } else {
                                if (2 == res.Code) {
                                    msg = $.t('incorrect_pwd') + $.t('surplus') + (5 - res.ErrorMsg) + $.t('chance') + '！' + $.t('more_wrong');
                                    obj.formValidate('#pwd', msg);
                                    $('#pwd').focus();
                                    tobj.count--;
                                } else if (8 == res.Code) {
                                    msg = $.t('account_lock');
                                    obj.formValidate('#account', msg);
                                } else if (16 == res.Code) {
                                    msg = $.t('more_wrong');
                                    obj.formValidate('#pwd', msg);
                                } else if (32 == res.Code) {
                                    msg = $.t('account_exist');
                                    obj.formValidate('#account', msg);
                                    $('#account').focus();
                                }
                                localStorage.removeItem('sign');
                            }
                            that.prop('disabled', false).text($.t('login'));
                        },
                        errorCallback: function () {
                            localStorage.removeItem('sign');
                            that.prop('disabled', false).text($.t('login'));
                        }
                    });
                }

            });
            $('#pwd').on('blur', function () {
                var val = $(this).val().trim(),
                    flag = true;
                if (0 == val.length) {
                    obj.formValidate('#pwd', $.t('password_null'));
                    flag = false;
                } else {
                    if (6 > val.length || 20 < val.length) {
                        obj.formValidate('#pwd', $.t('login_bit'));
                        flag = false;
                    } else if (6 <= val.length || 20 >= val.length) {
                        obj.formValidate('#pwd', null, true);
                    }
                }
                obj.flag = flag;
            });
        }
    }
});