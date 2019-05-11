require(['require.config'],()=>{
    require(['url','jquery'],(url,$)=>{
        class Register{
            constructor(){
                this.usernameInput=$("#username");
                this.passwordInput=$("#password");
                this.btn=$("#submit");
                this.bindEvents();
            }

            bindEvents(){
                this.btn.on("click",()=>{
                    //取用户品和密码传输到后台
                    let username=this.usernameInput.val(),
                        password=this.passwordInput.val();
                        console.log(1)
                    $.ajax({
                        url:url.phpBaseUrl+"/register.php",
                        type:"post",
                        data:{username,password},
                    success:data=>{
                        if(data.res_code===1){
                            alert(data.res_message+",即将跳转登录页");
                            location.href='login.html';
                        }
                    },
                    dataType:'json'
                
                    })
                })
            }
        }
        new Register();
    })
})