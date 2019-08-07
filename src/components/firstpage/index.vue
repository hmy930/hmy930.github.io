<template>
    <div id="comment-container">
        <el-row class="textarea-row">
            <el-col :span="24">
                <div class="comment-send">
                    <div class="comment-textarea">
                        <a class="user-face" href="javascript:;"><img src="//static.hdslb.com/images/member/noface.gif"></a>
                        <textarea name="reply_msg" class="reply-msg" rows="3" v-model="myCommentText" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></textarea>
                        <button class="comment-submit" @click="sendComment">发表评论</button>
                    </div>
                </div>
            </el-col>
        </el-row>
        
        <el-row class="list-row">
            <el-col :span="24" class="list-col comment-list">
                <el-row class="list-item" :commentid="item.commentId" :data-pid="item.id" :data-index="index" v-for="(item, index) in commentListData.comment" :key="index">
                    <a class="user-face" href="javascript:;"><img :src="item.userface" alt=""></a>
                    <div class="item-main">
                        <div class="user-name"><a class="user-name-a" href="javascript:;">{{item.name}}</a> <a :class="'user-level user-level-'+item.level" href="javascript:;">lv5</a></div>
                        <p class="user-comment">{{item.text}}</p>
                        <div class="info">
                            <span class="time">{{item.time}}</span>
                            <span :class="'like'+(idIndexof('like',item.commentId)?' liked':'')" @click="likeOrHate('like', item.commentId)">like: {{item.like}}</span>
                            <span :class="'hate'+(idIndexof('hate',item.commentId)?' hated':'')" @click="likeOrHate('hate', item.commentId)">hate: {{item.hate}}</span>
                            <span class="reply" @click="replyBtnClick(item, null)">回复</span>
                        </div>
                        <div class="reply-box">
                            <div class="reply-item" :commentid="item2.commentId" :data-id="item2.id" :toid="item2.toId" :toname="item2.toName" :data-index="index2" v-for="(item2, index2) in item.replyList" :key="index2">
                                <a class="reply-face" href="javascript:;"><img :src="item2.userface" alt=""></a>
                                <div class="reply-con">
                                    <a class="reply-name" href="javascript:;">{{item2.name}}</a>
                                    <a :class="'user-level user-level-'+item2.level" href="javascript:;">lv{{item2.level}}</a>
                                    <p class="reply-text"><template v-if="item.id!=item2.toId">回复：<a class="at" href="javascript:;">@{{item2.toName}}</a></template>{{item2.text}}</p>
                                    <div class="info">
                                        <span class="time">{{item2.time}}</span>
                                        <span :class="'like'+(idIndexof('like',item2.commentId)?' liked':'')" @click="likeOrHate('like', item.commentId, item2.commentId)">like: {{item2.like}}</span>
                                        <span :class="'hate'+(idIndexof('hate',item2.commentId)?' hated':'')" @click="likeOrHate('hate', item.commentId, item2.commentId)">hate: {{item2.hate}}</span>
                                        <span class="reply" @click="replyBtnClick(item, item2)">回复</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="page-box"></div>
                        <div class="comment-send" v-if="reply.parentCommentId == item.commentId">
                            <div class="comment-textarea">
                                <div class="user-face"><img :src="item.userface"></div>
                                <textarea :ref="'textarea'+item.commentId" name="reply_msg" class="reply-msg" rows="3" :placeholder="'回复：'+reply.toName" v-model="reply.text"></textarea>
                                <button class="comment-submit" :pid="reply.pid" :rid="reply.rid" @click="sendReply($event)">发表评论</button>
                            </div>
                        </div>
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data: function() {	
        return {
            my: {
                id: 564541,
                name: 'hmy',
                level: 5,
                face: '//static.hdslb.com/images/member/noface.gif',
                like: localStorage.getItem('like')||'',
                hate: localStorage.getItem('hate')||'',
            },
            myCommentText: '',
            reply: {
                commentId: null,
                parentCommentId: null,
                pid: null,
                rid: null,
                toName: '',
                text: '',
            },
            commentListData: { comment: [] }
        }
    },
    created: function(){
        this.getInitData();
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        //判断是否点击过like和hate
        idIndexof: function(type,id){
            return this.my[type].indexOf('|'+id+'|')>-1;
        },
        //点击like和hate
        likeOrHate: function(type, id1, id2){
            id2 = id2 || '';
            let action = 1;
            let id = id2 || id1;
            if(this.my[type].indexOf('|'+id+'|')>=0){
                this.my[type] = this.my[type].replace('|'+id+'|','');
                action = -1;
            }else{
                this.my[type] += '|'+id+'|';
            }
            let com = this.commentListData.comment;
            for(let i=0,length=com.length;i<length;i++){
                if(com[i].commentId == id1){
                    if(!id2){
                        com[i][type] += action;
                        break;
                    }else{
                        let rep = com[i].replyList;
                        for(let j=0, length2=rep.length; j<length2; j++){
                            if(rep[j].commentId==id2){
                                rep[j][type] += action;
                                break;
                            }
                        }
                    }
                }
            }
            this.$nextTick(()=>{
                localStorage.setItem('commentListData', JSON.stringify(this.commentListData))
                localStorage.setItem('like', this.my.like)
                localStorage.setItem('hate', this.my.hate)
            })
        },
        //新评论
        sendComment: function(){
            var ls = localStorage.getItem('commentListData');
            if(ls.match(/^\{.*\}$/) === null){
                this.$message('localStorage不存在commentListData');
                return;
            }
            ls = JSON.parse(ls);
            ls.comment.push({
                commentId: this.setCommentID(),
                id: this.my.id,
                name: this.my.name,
                time: this.timeFormat(new Date()),
                like: 0,
                hate: 0,
                level: this.my.level,
                userface: this.my.face,
                text: this.myCommentText,
                replyList: [],
                replyCount: 0
            })
            this.myCommentText = '';
            localStorage.setItem('commentListData', JSON.stringify(ls));
            this.commentListData = ls;
        },
        //回复评论
        sendReply: function(e){
            if(!this.reply.rid){
                this.$message('请选择你要回复的用户')
                return;
            }else if(!this.reply.text){
                this.$message('请输入内容')
                return;
            }else if(!this.reply.commentId){
                this.$message('没有commentId')
                return;
            }
            var ls = localStorage.getItem('commentListData');
            if(ls.match(/^\{.*\}$/) === null){
                this.$message('localStorage不存在commentListData');
                return;
            }
            ls = JSON.parse(ls);
            ls.comment.find((item,i)=>{
                if(item.commentId == this.reply.parentCommentId){
                    ls.comment[i].replyList.push({
                        commentId: this.setCommentID(),
                        id: this.my.id,
                        name: this.my.name,
                        toId: this.reply.rid,
                        toName: this.reply.toName,
                        time: this.timeFormat(new Date()),
                        like: 0,
                        hate: 0,
                        level: this.my.level,
                        userface: this.my.face,
                        text: this.reply.text,
                    });
                    localStorage.setItem('commentListData', JSON.stringify(ls))
                    this.commentListData = ls;
                    for(let i in this.reply){
                        this.reply[i] = '';
                    }
                    return true;
                }
            })
        },
        //点击 回复 按钮，设置this.reply对象
        replyBtnClick: function(item1, item2){
            if(!item1.commentId || !item1.id) return;
            if(!!item2 && (!item2.commentId || !item2.id)) return;
            //回复层主
            if(!item2){
                this.reply.commentId = item1.commentId;
                this.reply.rid = item1.id;
                this.reply.toName = item1.name;
            }else{
                //回复他人
                this.reply.commentId = item2.commentId;
                this.reply.rid = (item2.id == this.my.id) ? item1.id : item2.id;
                this.reply.toName = item2.name;
            }
            this.reply.pid = item1.id;
            this.reply.parentCommentId = item1.commentId; //层主评论id
            //聚焦到输入框
            this.$nextTick(()=>{
                if(!!this.$refs['textarea'+item1.commentId]){ this.$refs['textarea'+item1.commentId][0].focus(); }
            });
        },
        //格式化时间
        timeFormat: function(t){
            t = new Date(t)
            return t.getFullYear()+'-'+((t.getMonth()+1)<10?'0':'')+(t.getMonth()+1)+'-'+(t.getDate()<10?'0':'')+t.getDate()+' '+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds()
        },
        //返回用于设置评论的随机commentId
        setCommentID: function(){
            return ((~~(Math.random()*900000 +100000)) +''+ new Date().getTime())*1;
        },
        //模拟初始化
        getInitData: function(){
            var ls = localStorage.getItem('commentListData');
            if(!!ls && ls.match(/^\{.*\}$/) !== null){
                this.commentListData = JSON.parse(ls);
            }else{
                var d = {
                    comment:[
                        {
                            commentId: this.setCommentID(),
                            id: 111111,
                            name: '啦啦啦abc',
                            time: '2019-05-12 12:12:12',
                            like: 999,
                            hate: 12,
                            level: 5,
                            userface: '//static.hdslb.com/images/member/noface.gif',
                            text: '这款云健身app这么好看还不要会员，也太良心了，大家且看且珍惜啊1',
                            replyList: [
                                {
                                    commentId: this.setCommentID(),
                                    id: 125421,
                                    name: 'u据哈市了',
                                    toId: 111111,
                                    toName: '啦啦啦abc',
                                    time: '2019-06-11 12:12:12',
                                    like: 20,
                                    hate: 1,
                                    level: 4,
                                    userface: '//static.hdslb.com/images/member/noface.gif',
                                    text: '这款云健身app这么好看还不要会员，也太良心了，大家且看且珍惜啊2',
                                },
                                {
                                    commentId: this.setCommentID(),
                                    id: 135245,
                                    name: '阿萨德发生',
                                    toId: 125421,
                                    toName: 'u据哈市了',
                                    time: '2019-06-13 12:12:12',
                                    like: 15,
                                    hate: 2,
                                    level: 3,
                                    userface: '//static.hdslb.com/images/member/noface.gif',
                                    text: '这款云健身app这么好看还不要会员，也太良心了，大家且看且珍惜啊3',
                                },
                            ],
                            replyCount: 12,
                        }
                    ]
                };
                localStorage.setItem('commentListData', JSON.stringify(d));
                this.commentListData = d;
            }
            
        }
    }
}
</script>

<style>
textarea{outline: none;resize: none;}

.comment-textarea .el-form-item__content{display: flex;align-items: stretch;height: 70px;;}
.comment-textarea .el-form-item__content button{margin-left: 15px;flex: none;width: 70px;font-size: 14px;line-height: 1.3;letter-spacing: 1px;background-color: #00a1d6;color: #fff;}
#comment-container{height: 100%;}
#comment-container .textarea-row{border-bottom: 1px solid #eee;}
#comment-container .textarea-row textarea{height: 100%;}
#comment-container .list-row{margin-top: 15px; height: calc(100% - 91px);overflow-y: scroll;}
#comment-container .list-col{padding: 10px 0;}
#comment-container .list-item{color: #555;padding: 15px 0;font-size: 14px;}
.comment-list .item-main{margin-left: 90px;}

#comment-container .list-item .user-name{padding-bottom: 4px;}
#comment-container .list-item .user-name-a:hover,
#comment-container .reply-box .reply-item .reply-con .reply-name:hover {color: rgb(0, 161, 214)}
#comment-container .user-name-a{margin-right: 10px;}
#comment-container .list-item .user-comment{padding: 2px 0;}
#comment-container .list-item .info{line-height: 26px;color: #999;font-size: 12px;}
#comment-container .list-item .info span{margin-right: 15px;display: inline-block;padding: 0 5px;border-radius: 3px;}
#comment-container .list-item .info span:hover:not(.time){color: rgb(0, 161, 214);cursor: pointer;background-color: #e5e5e5;}

#comment-container .reply-box .reply-item{display:flex;justify-content: flex-start;align-items: flex-start;padding: 10px 0;}
#comment-container .reply-box .reply-item .reply-face{flex: none;margin-right: 15px;}
#comment-container .reply-box .reply-item .reply-face img{display: block;width: 24px;height: 24px;overflow: hidden;border-radius: 24px;}
#comment-container .reply-box .reply-item .reply-con{line-height: 22px;}
#comment-container .reply-box .reply-item .reply-con .reply-name{margin-right: 10px;}
#comment-container .reply-box .reply-item .reply-con .reply-text{display: inline;}

.at{color:#1389bf;padding-right: 15px;}
.at:hover{color: #2faee3;}
.user-level{margin-right: 15px;padding: 0 3px;color: #fff;font-size: 12px;position: relative;top: -1px;border-radius: 2px;}
.user-level-1{background: rgba(255, 108, 0, 0.2);}
.user-level-2{background: rgba(255, 108, 0, 0.4);}
.user-level-3{background: rgba(255, 108, 0, 0.6);}
.user-level-4{background: rgba(255, 108, 0, 0.8);}
.user-level-5{background: rgba(255, 108, 0, 1);}
.user-level-6{background: rgba(255, 51, 0, 1);}


.user-face{width: 90px;overflow: hidden;flex:none;display: block;padding: 10px 0 0 10px;float: left;}
.user-face>img{width: 50px;height: 50px;border-radius: 60px;overflow: hidden;}
.comment-list .user-face{padding: 0 0 0 10px;}
.comment-list .liked{color: #00A1D6;}
.comment-list .hate:hover{color: #ff7f9d;}
.comment-list .hated{color: #ff7f9d;}
.comment-send{margin: 10px 0;}
.comment-send .comment-textarea{height: 70px;width: 100%;margin-bottom: 10px;padding: 0 80px 0 85px;position: relative;}
.comment-send .user-face{position: absolute;left: 0;top: 0;padding: 10px 0 0 10px;}
.comment-send textarea{height: 100%;width: 100%;padding: 5px 10px;font-size: 12px;color: #555;background: #f4f5f7;border: 1px solid #e5e9ef;border-radius: 4px;}
.comment-send textarea:hover,.comment-send textarea:focus{background: #fff;border-color: #00a1d6;}
.comment-send button{position: absolute;right: 0;top: 0;height: 100%;width: 70px;border: 0;outline: none;background: #00A1D6;color: #fff;font-size: 14px;letter-spacing: 2px;padding: 0 15px;line-height: normal;border-radius: 4px;flex: none;cursor: pointer;}
</style>
<style scoped>

</style>
