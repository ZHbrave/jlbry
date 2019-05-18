require(['require.config'],()=>{
    require(["swiper",'header','footer'],(Swiper)=>{

        class Index{
            constructor(){
                this.banner()
                
            }


            banner(){
                //首页轮播图
                var mySwiper= new Swiper('.swiper-container',{

                    autoplay:true,
                    loop:true,  //循环模式选项
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                      }
                })
            }

            bindEvents(){
                $("#header-container").on('click',"#login-btn",()=>{

                })
            }
            
        }
        new Index();

    })
})