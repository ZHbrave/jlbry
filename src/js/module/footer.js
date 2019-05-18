define(['jquery'],$=>{
    function Footer(){
        this.container=$("#footer-container");
        this.load()
    }

   //对象合并
$.extend(Footer.prototype,{
    //es6对象增强写法
    load(){
        //把footer.htnl加载到container里
        return new Promise(resolve=>{
            this.container.load('/html/module/footer.html',()=>{
                //load异步执行结束
                resolve();
            });
        })
    }
}) 
return new Footer()
})
  

