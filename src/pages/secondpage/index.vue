<template>
    <div id="gameContainer">
        <div id="info">
            速度：{{speed}} , 分数：{{score}} 
            <el-button :disabled="gameStart" @click="reStart">开始 / 重新开始</el-button>
        </div>
        <div id="game">
            <div id="snake" :style="{top: item.top +'px', left: item.left +'px'}" v-for="(item,index) in snake" :key="index"></div>
            <div id="food" :style="{top: food.top +'px', left: food.left +'px'}" v-if="gameStart"></div>
        </div>
    </div>
    
</template>

<script>
    export default {
        data: function(){
            let _x = 20;
            return {
                x: 20,
                y: _x,
                width: _x*20,
                height: _x*20,
                speed: 6,
                snake: [
                    {left:20, top:0},
                    {left:0, top:0},
                ],
                food:{left:null,top:null},
                score: 0,
                timer: null,
                gameStart: false,
                direction: 'ArrowRight',
                directionTemp: 'ArrowRight',
                directionOption:{
                    'ArrowRight': {witch: 'left', another: 'top', how: _x},
                    'ArrowLeft': {witch: 'left', another: 'top', how: -_x},
                    'ArrowDown': {witch: 'top', another: 'left', how: _x},
                    'ArrowUp': {witch: 'top', another: 'left', how: -_x},
                }
            }
        },
        mounted:function(){
            this.initEvent();
        },
        watch:{

        },
        methods: {
            reStart(){
                if(!!this.gameStart)return;
                this.gameStart = true;
                this.speed = 6;
                this.snake = [
                    {left:20, top:0},
                    {left:0, top:0},
                ];
                this.score = 0;
                this.direction = this.directionTemp = 'ArrowRight';
                this.$nextTick(()=>{
                    this.createFood();
                    this.move();
                })
            },
            initEvent(){
                window.addEventListener('keydown',(e)=>{
                    let eve = e||window.event;
                    if(eve.code == this.direction){return;}
                    if(eve.keyCode<37||eve.keyCode>40){return;}
                    if(eve.code.match(/ArrowRight|ArrowLeft/i)!=null && this.direction.match(/ArrowRight|ArrowLeft/i)!=null){return;}
                    if(eve.code.match(/ArrowDown|ArrowUp/i)!=null && this.direction.match(/ArrowDown|ArrowUp/i)!=null){return;}
                    this.directionTemp = eve.code;//缓存方向变量
                });
            },
            move(){
                this.timer = setTimeout(() => {
                    if(!this.gameStart)return;
                    this.direction = this.directionTemp;//采用已缓存的方向
                    let temp = this.directionOption[this.direction];//获取snake变向的相关参数
                    let last = {...this.snake[this.snake.length-1]};//删除之前，保存snake数组的最后一项
                    this.snake.unshift(this.snake[this.snake.length-1]);//将蛇尾克隆到数组[0]位置
                    this.snake.pop();//删除多余的蛇尾
                    //根据方向，改变蛇头sanke[0]的left或者top，模拟蛇移动
                    this.snake[0][temp.witch] = temp.how + this.snake[1][temp.witch];
                    this.snake[0][temp.another] = this.snake[1][temp.another];
                    //撞墙
                    if(this.snake[0][temp.witch]>=this.width || this.snake[0][temp.witch]<0){
                        this.$alert('<p style="font-size:15px;">撞墙了</p>', '游戏结束', {
                            dangerouslyUseHTMLString: true
                        });
                        this.gameStart = false;
                        return;
                    }
                    //撞自己
                    if(this.snake.find((item,index)=>index!=0 && item.left==this.snake[0].left && item.top==this.snake[0].top) !== undefined){
                        this.$alert('<p style="font-size:15px;">撞到自己了</p>', '游戏结束', {
                            dangerouslyUseHTMLString: true
                        });
                        this.gameStart = false;
                        return;
                    }
                    //吃东西，判断food和snake重叠了
                    //find 成功返回子项，失败返回undefined
                    if(this.snake.find((item)=>item.left==this.food.left && item.top==this.food.top) !== undefined){
                        this.snake.push(last)
                        this.score++;
                        this.createFood();
                    }
                    //执行下一次移动
                    this.move();
                }, 1000/this.speed);
            },
            createFood(){
                let a = ~~(this.width/this.x * Math.random()) * this.x;
                let b = ~~(this.width/this.x * Math.random()) * this.x;
                if(this.snake.find((item)=>item.left==a && item.top==b) !== undefined){
                    this.createFood();
                    return;
                }
                this.speed+=0.5;
                this.food.left = a;
                this.food.top = b;
            }
        }

    }
</script>

<style scoped>
#gameContainer{height: 100%;}
#game{height: 400px;width: 400px;background: #000000;box-shadow: 0 0 10px 0 rgba(0, 0, 0, .3);position: relative; overflow: hidden;}
#game #snake{height: 20px;width: 20px;background: #fff;position: absolute;}
#game #food{position: absolute;height: 20px;width: 20px; background: rgb(60, 211, 238);}

#info{padding-bottom: 8px;}
</style>