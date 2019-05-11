define(['jquery','cookie'],$=>{
    function Header(){
        this.container=$("#header-container");
        this.load().then(()=>{
            this.search();
            this.isLogin();
        })
    }
    //对象合并
    $.extend(Header.prototype,{
        //ES6对象增强写法
        load(){
        //把header.html加载到container里
            return new Promise(resolve=>{
                this.container.load('/html/model/header.html',()=>{
                    resolve()
                })
            })
        },
        search (){
            //搜索框功能
            //container内部所有的search-form
            $('#search-input').on('keyup',function(){
                let keyWords= $(this).val();
                //带上关键字请求jsop接口
                $getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords,data=>{
    
                })
            })
        },
        isLogin(){
            this.loginBtn=$("#login-btn");
            this.register=$("#register");
            this.afterLogin=$("#after-login");
            this.nameSpan=$("#name");
            this.logout=$("#exit");
            let username=$.cookie("username");
            if(username){
                this.loginBtn.hide();
                this.register.hide();
                this.afterLogin.show();
                this.nameSpan.html(username);
            }
            this.logout.on("click",()=>{
                //退出登录
                if(confirm("确定要退出吗？")){
                    $.removeCookie("username",{path:"/"});
                    this.loginBtn.show();
                    this.register.show();
                    this.afterLogin.hide();
                }
            })
        }
     })
    return new Header()
})