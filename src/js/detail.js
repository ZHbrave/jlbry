require(['require.config'],()=>{
    require(['url','template','header','footer','fly','zoom'],(url,template,header)=>{
        class Detail{
            constructor(){
                
                this.init()
                this.addCart();
            }

            init(){
                //从URL中取到id
                let id=Number(location.search.slice(4));
                $.get(url.rapBaseUrl+"detail/type",{id},res=>{
                    console.log(res)
                    if(res.res_code===1){


                        let{data}=res.res_body;
                        data={...data,id};
                        console.log(data)
                        //把当前数据存下来；
                        this.data = data ;
                        this.render(data);
                    }
                })
            }


            //用返回的数据渲染页面
            render(data){
                console.log(data)

                $("#detail").html(template("detail-template",{data}));
                this.zoom();
                // $("#quantify").on('click',()=>{
                // this.numValue=Number($("#quantity").val());
                //     console.log(numValue)
                //     console.log(1)
                // })
            }


            addCart(){
                //事件委托

                $("#detail").on("click",'#add-car',e=>{

                    //完成抛物线加购物车动画

                    $(`<img src='${this.data.img[0]}' style='width:30px;height:30px;'>`).fly({
                        start:{
                            left: e.clientX,
                            top:e.clientY
                        },
                        end:{
                            left:$(".car-num").offset().left,
                            top:$(".car-num").offset().top
                        },
                        onEnd:function(){
                            this.destroy(); //销毁抛物体
                            header.calcCartNum();//调用一次计算购物车数量的方法
                        }
                    });


                    //无论本地数据储存有没有存过cart，都先取一下，如果取到了走IF，没取到，ELSE
                    let cart=localStorage.getItem('cart');
                    if(cart){
                        cart=JSON.parse(cart);

                        //已经存过购物车了，判断存过的购物车里有没有当前一样的商品
                        let index=0;
                        if(cart.some((shop,i)=>{

                            //some找到满足条件的就不会再找了
                            //所以index的值是等于找到满足条件的哪一个索引
                            index=i;
                            return shop.id===this.data.id;
                        })){
                            //在这条商品上的数据的数量+一个
                            cart[index].num++;
                        }else{
                            //如果是不一样的商品，没有这条数据
                            cart.push({...this.data,num:1})
                        }
                    
                    
                    
                    }else{
                        //购物车为空的时候
                        //设置之歌数据，把这条data存到数组里面去
                        cart=[{...this.data,num:1}];
                    
                    }


                    //把cart存进去
                    localStorage.setItem('cart',JSON.stringify(cart));
                })
            }

            zoom(){
                //放大镜
                $(".zoom-img").elevateZoom({
                    gallery:"gal1",
                    cursor: "pointer",
                    galleryActiveClass: 'active',
                    borderSize: "1",
                    borderColor: "#888"
                });
            }
        }
        new Detail();
    })
})