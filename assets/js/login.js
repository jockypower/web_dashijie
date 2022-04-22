// 定义一个入口函数 
$(function() {
    // 点击去注册账号的链接 
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录账号的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义密码鉴证规则 
    // 从Layui种获取form对象 
    var form = layui.form
        // 通过form.verify()函数自定义校验规则 
    form.verify({
        // 自定义pwd的校验规则
        'pwd': [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验二次密码是否一致的规则 
        repwd: function(value) {
            // 通过行参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容 
            // 然后进行一次等于的判断 
            // 如果判断失败， 则return一个提示 
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '二次密码不一致！'
            }
        }
    })


    // 监听注册表单的提交事件 
    $('#form_reg').on('submit', function(e) {
        //1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起AjaxPOST请求，
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $('#form_reg [name=usename]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为 
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        //1. 阻止默认的提交行为
        e.preventDefault()
        $.Ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'post',
            // 快速获取表单中的数据 
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                // 跳转到后台主页
                // location.href = '/index.html'
            }
        })
    })

})