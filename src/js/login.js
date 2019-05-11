require(['require.config'],()=>{
    require(['url','jquery','cookie'],(url,$)=>{
        class Login{
            constructor(){
                this.usernameInput=$("#username");
                this.passwordInput=$("#password");
                this.checkBtn=$("#checkBtn");
                this.btn=$("#login-btn1");
                this.bindEvents();
                console.log(2)
            }


            bindEvents(){
                this.btn.on("click",()=>{
                    let username=this.usernameInput.val(),
                    password=this.passwordInput.val();


                    //请求数据.
                    $.ajax({
                        url:url.phpBaseUrl+"/login.php",
                        type:"POST",
                        data:{username,password},
                        success:data=>{
                            if(data.res_code===1){
                                console.log(1)
                                this.loginSucc(username);
                            }
                        },
                        dataType:'json'
                    })
                })
            }


            loginSucc(username){
                //存cookie
                let expires=this.checkBtn.prop('checked')?{expires:10}:{};
                expires=Object.assign({path:"/"},expires);
                $.cookie('username',username,expires);
                alert('登录成功，即将跳转首页');
                //跳转回首页
                location.href="/"
            }
        }
        new Login()
    })
})