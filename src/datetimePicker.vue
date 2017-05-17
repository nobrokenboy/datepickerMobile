<template >
    <transition :name="transitionType" >
        <div class="shade-panel" v-if="isShowSelector" v-on:click.self="undoEvent" v-bind:style="{zIndex:shadeZIndex||10}">
            <div class="date-select-lists" >
                <!--header-->
                <div class="select-list area-header">
                    <div v-on:click="undoEvent()">取消</div>
                    <div class="title" v-if="datepickerType=='date'">选择日期</div>
                    <div class="title" v-if="datepickerType=='common'">选择日期时间</div>
                    <div class="title" v-if="datepickerType=='month'">选择月份</div>
                    <div class="title" v-if="datepickerType=='time'||datepickerType=='minute'">选择时间</div>
                    <div v-on:click="comfirmEvent()" class="btn-sure" :style="{'color':themeColor||'#f80'}">确定</div>
                </div>
                <!--content-->
                <div class="select-list area-content clearfix date-slider-wrapper">
                    <!--年-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='date'||datepickerType=='month'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)"  data-attr="0" ref="0">
                            <li class="swiper-slide" v-for="(i,index) in yearLists" :class="{'swiper-active':i==activeYear.name}" >{{i+"年"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                    <!--月-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='date'||datepickerType=='month'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)"   data-attr="1" ref="1">
                            <li class="swiper-slide" v-for="(item,index) in monthLists" :class="{'swiper-active':item==activeMonth.name}">{{item+"月"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                    <!--日-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='date'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)"   data-attr="2" >
                            <li class="swiper-slide"  v-for="(i,index) in dateLists" :class="{'swiper-active':i==activeDate.name}">{{i+"日"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                    <!--时-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='time'||datepickerType=='minute'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)"  data-attr="3" >
                            <li class="swiper-slide"  v-for="(i,index) in hourLists" :class="{'swiper-active':i==activeHour.name}">{{i+"时"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                    <!--分-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='time'||datepickerType=='minute'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)" data-attr="4" >
                            <li class="swiper-slide"  v-for="(i,index) in minuteLists" :class="{'swiper-active':i==activeMinute.name}">{{i+"分"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                    <!--秒-->
                    <div class="swiper-container" v-if="datepickerType=='common'||datepickerType=='time'">
                        <ul class="date-lists swiper-wrapper" @touchstart.prevent="touchStartEvent($event)" @touchmove.prevent="touchMoveEvent($event)"
                            @touchend.prevent="touchEndEvent($event)"   data-attr="5" >
                            <li class="swiper-slide"  v-for="(i,index) in secondLists" :class="{'swiper-active':i==activeSecond.name}">{{i+"秒"}}</li>
                        </ul>
                        <div class="active-area"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        /*
         * @param datepickerType
         * 结果如下：1.common:年月日时分秒（6）
         *           2.date:年月日（3）
         *           3.time:时分秒(3)
         *           4.month:年月（2）
         *           5.minute:时分（2）
         * */
        props: ["isShowSelector","transitionType","shadeZIndex","beginYear","endYear","dateValue","datepickerType","themeColor"],
        data(){
            const self=this;
            let curDate=new Date();
            console.log(self.beginYear);
            return {
                curYear:curDate.getFullYear(),
                curMonth:curDate.getMonth()+1,
                curDate:curDate.getDate(),
                curHour:curDate.getHours(),
                curMinute:curDate.getMinutes(),
                curSecond:curDate.getSeconds(),
                atBeginYear:parseInt(self.beginYear)||1900,
                initDateObj:{},
                activeYear:{
                    name:"",
                    index:0
                },
                activeMonth:{
                    name:"",
                    index:0
                },
                activeDate:{
                    name:"",
                    index:0
                },
                activeHour:{
                    name:"",
                    index:0
                },
                activeMinute:{
                    name:"",
                    index:0
                },
                activeSecond:{
                    name:"",
                    index:0
                },
                dateItemsHeight:40,
                activeItemIndex:[],
                initActiveIndex:2,
                isMoveStart:false,
                startPosition:{},
                endPosition:{},
                direction:0,
                sliderDistance:"",
                sliderBlockNums:0,
                activeElement:"",
                currentY:0,
                backDateValue:""
            }
        },
        watch:{
            isShowSelector(newVal,oldVal){
                const self=this;
                if(newVal){
                    self.setDatePickerData(self.activeYear.name,self.activeMonth.name);
                }
            }
        },
        computed:{
            atEndYear(){
                const self=this;
                return parseInt(self.endYear)||self.curYear;
            },
            yearLists(){
                var diffYear=this.atEndYear-this.atBeginYear+1;
                console.log(diffYear);
                return Array.from({length:diffYear},(value,index) =>{
                    return this.atEndYear-index;
                }).reverse();
            },
            monthLists(){
                return Array.from({length:12},(value,index) =>{
                    return index+1<=9?"0"+(index+1):index+1;
                });
            },
            hourLists(){1
                return Array.from({length:24},(value,index)=>{
                    return index<=9?"0"+index:index;
                });
            },
            minuteLists(){
                return Array.from({length:60},(value,index)=>{
                    return index<=9?"0"+index:index;
                });
            },
            secondLists(){
                return Array.from({length:60},(value,index)=>{
                    return index<=9?"0"+index:index;
                });
            },
            computedWidth(){
                const self=this;
                let result;
                if(self.datepickerType=="common"){
                    result="15%";
                }else if(self.datepickerType=="date"||self.datepickerType=="time"){
                    result="32%";
                }else if(self.datepickerType=="month"||self.datepickerType=="minute"){
                    result="48%";
                }
                return result;
            }
        },
        mounted(){
            const self=this;
            self.getInitDate();
            self.init();
            console.log(self.hourLists);
            console.log(self.minuteLists);
            console.log(self.secondLists);
        },
        methods:{
            getInitDate(){
                const self=this;;
                //处理日期
                if(self.dateValue){
                    const tempArr=self.dateValue.replace(/:/g, "-").replace(" ", "-").split("-");
                    console.log(tempArr);
                    self.initDateObj.initYear=tempArr[0];
                    self.initDateObj.initMonth=tempArr[1];
                    self.initDateObj.initDate=tempArr[2];
                    self.initDateObj.initHour=tempArr[3];
                    self.initDateObj.initMinute=tempArr[4];
                    self.initDateObj.initSecond=tempArr[5];
                }else{
                    self.initDateObj.initYear=self.curYear;
                    self.initDateObj.initMonth=self.curMonth>9?self.curMonth:"0"+self.curMonth;
                    self.initDateObj.initDate=self.curDate>9?self.curDate:"0"+self.curDate;
                    self.initDateObj.initHour=self.curHour>9?self.curHour:"0"+self.curHour;
                    self.initDateObj.initMinute=self.curMinute>9?self.curMinute:"0"+self.curMinute;
                    self.initDateObj.initSecond=self.curSecond>9?self.curSecond:"0"+self.curSecond;
                }
                console.log(self.initDateObj);

            },
            init(){
                const self=this;
                //初始化年月日
                self.activeYear.name=self.initDateObj.initYear;
                self.activeYear.index=self.getIndexInArr(self.activeYear.name,self.yearLists);
                self.activeMonth.name=self.initDateObj.initMonth;
                self.activeMonth.index=self.getIndexInArr(self.activeMonth.name,self.monthLists);;
                self.activeDate.name=self.initDateObj.initDate;

                //初始化时分秒
                self.activeHour.name=self.initDateObj.initHour;
                self.activeHour.index=self.getIndexInArr(self.activeHour.name,self.hourLists);
                self.activeMinute.name=self.initDateObj.initMinute;
                self.activeMinute.index=self.getIndexInArr(self.activeMinute.name,self.minuteLists);
                self.activeSecond.name=self.initDateObj.initSecond;
                self.activeSecond.index=self.getIndexInArr(self.activeSecond.name,self.secondLists);
            },
            setDatePickerData(activeYear,activeMonth){
                const self=this;
                //对天数进行设置
                self.dateLists=self.setDate(activeYear,activeMonth);
                self.activeDate.index=self.getIndexInArr(self.activeDate.name,self.dateLists);
                console.log(self.activeDate.index);
                //设置滑动的位置
                self.$nextTick(self.setItemsWidth);
                self.$nextTick(self.setDistance);

            },
            setDate(activeYear,activeMonth){
                //根据年份以及月份，算出天数
                var dayNums=new Date(activeYear,activeMonth,0).getDate();
                return Array.from({length:dayNums},(value,index) =>{
                    return index+1<=9?"0"+(index+1):index+1;
                });
            },
            getIndexInArr(value,arr){
                var result=0;
                for(var i= 0,j=arr.length;i<j;i++){
                    if(value==arr[i]){
                        result=i;
                    }
                }
                return result;
            },
            setItemsWidth(){
                const self=this;
                Array.from(document.querySelectorAll(".swiper-container")).forEach((value,index,arr)=>{
                    arr[index].style.width=self.computedWidth;
                });
            },
            setDistance(){
                //激活位置刚好在中间
                const self=this;
                //根据类型
                if(self.datepickerType=="common"){
                    self.activeItemIndex=[self.activeYear.index,self.activeMonth.index,self.activeDate.index,self.activeHour.index,
                        self.activeMinute.index,self.activeSecond.index];
                }else if(self.datepickerType=="date"){
                    self.activeItemIndex=[self.activeYear.index,self.activeMonth.index,self.activeDate.index];
                }else if(self.datepickerType=="month"){
                    self.activeItemIndex=[self.activeYear.index,self.activeMonth.index];
                }else if(self.datepickerType=="time"){
                    self.activeItemIndex=[self.activeHour.index,self.activeMinute.index,self.activeSecond.index];
                }else if(self.datepickerType=="minute"){
                    self.activeItemIndex=[self.activeHour.index,self.activeMinute.index];
                }
                /*console.log(self.activeItemIndex);
                 console.log(self.activeYear.name);
                 console.log(self.activeMonth.name);
                 console.log(self.activeDate.name);
                 console.log(self.activeHour.name);
                 console.log(self.activeMinute.name);
                 console.log(self.activeSecond.name);*/
                Array.from(document.querySelectorAll(".date-lists")).forEach((value,index,arr)=>{
                    let containerEle=arr[index];
                    if(self.activeItemIndex[index]-self.initActiveIndex>0){
                        containerEle.style.webkitTransform ="translate3d(0,-"+(self.activeItemIndex[index]-self.initActiveIndex)*self.dateItemsHeight+"px,0)";
                        containerEle.style.MozTransform ="translate3d(0,-"+(self.activeItemIndex[index]-self.initActiveIndex)*self.dateItemsHeight+"px,0)";
                        containerEle.style.msTransform ="translate3d(0,-"+(self.activeItemIndex[index]-self.initActiveIndex)*self.dateItemsHeight+"px,0)";
                        containerEle.style.OTransform ="translate3d(0,-"+(self.activeItemIndex[index]-self.initActiveIndex)*self.dateItemsHeight+"px,0)";
                        containerEle.style.transform="translate3d(0,-"+(self.activeItemIndex[index]-self.initActiveIndex)*self.dateItemsHeight+"px,0)";
                    }else{
                        containerEle.style.webkitTransform ="translate3d(0,"+(self.initActiveIndex-self.activeItemIndex[index])*self.dateItemsHeight+"px,0)";
                        containerEle.style.MozTransform ="translate3d(0,"+(self.initActiveIndex-self.activeItemIndex[index])*self.dateItemsHeight+"px,0)";
                        containerEle.style.msTransform ="translate3d(0,"+(self.initActiveIndex-self.activeItemIndex[index])*self.dateItemsHeight+"px,0)";
                        containerEle.style.OTransform ="translate3d(0,"+(self.initActiveIndex-self.activeItemIndex[index])*self.dateItemsHeight+"px,0)";
                        containerEle.style.transform="translate3d(0,"+(self.initActiveIndex-self.activeItemIndex[index])*self.dateItemsHeight+"px,0)";
                    }

                    console.log(containerEle.style.transform);
                });

            },
            touchStartEvent(e){
                const self=this;
                console.log(e);
                self.startPosition.x=e.touches[0].pageX;
                self.startPosition.y=e.touches[0].pageY;
                self.isMoveStart=true;

            },
            touchMoveEvent(e){
                const self=this;
                self.endPosition.x=e.changedTouches[0].pageX;
                self.endPosition.y=e.changedTouches[0].pageY;

                if(self.isMoveStart){//避免横屏
                    console.log("hello");
                    self.getBasicParams();
                }
            },
            touchEndEvent(e){
                const self=this
                if(self.isMoveStart){
                    //更新日期数据
                    self.updateDateData();
                    //设置日期
                    self.setDatePickerData(self.activeYear.name,self.activeMonth.name);
                }

            },
            getBasicParams(){
                const self=this;
                //获取方向以及距离
                self.direction=self.getDirection(self.startPosition.x,self.startPosition.y,self.endPosition.x,self.endPosition.y);
                self.sliderDistance=self.getSliderDistance(self.startPosition.x,self.startPosition.y,self.endPosition.x,self.endPosition.y);
                console.log(self.direction);
                console.log(self.sliderDistance);
                //获取要滑动的块的个数
                self.sliderBlockNums=Math.ceil(self.sliderDistance/self.dateItemsHeight);
                console.log(self.sliderBlockNums);
                //获取滑动的元素，进行判断
                self.activeElement=event.currentTarget.getAttribute("data-attr");
                console.log(self.activeElement);
            },
            updateDateData(){
                const self=this;
                if(self.direction==1){//向上
                    if(self.activeElement==0){
                        if(self.sliderBlockNums<self.yearLists.length-self.activeYear.index){
                            self.activeYear.index+=self.sliderBlockNums;
                        }else{
                            self.activeYear.index=self.yearLists.length-1;
                        }
                        console.log(self.activeYear.index);
                        //重新设置激活年份
                        self.activeYear.name=self.yearLists[self.activeYear.index];
                        //设置默认月份为第一个月和第一天
                        self.activeMonth.name="01";
                        self.activeMonth.index=0;
                        self.activeDate.name="01";

                    }else if(self.activeElement==1){
                        if(self.sliderBlockNums<self.monthLists.length-self.activeMonth.index){
                            self.activeMonth.index+=self.sliderBlockNums;
                        }else{
                            self.activeMonth.index=self.monthLists.length-1;
                        }
                        console.log(self.activeMonth.index);
                        //重新设置激活月
                        self.activeMonth.name=self.monthLists[self.activeMonth.index];
                        //默认设置第一天
                        self.activeDate.name="01";
                    }else if(self.activeElement==2){
                        if(self.sliderBlockNums<self.dateLists.length-self.activeDate.index){
                            self.activeDate.index+=self.sliderBlockNums;
                        }else{
                            self.activeDate.index=self.dateLists.length-1;
                        }
                        self.activeDate.name=self.dateLists[self.activeDate.index];
                        self.setDistance();
                        return;
                    }else if(self.activeElement==3){
                        if(self.sliderBlockNums<self.hourLists.length-self.activeHour.index){
                            self.activeHour.index+=self.sliderBlockNums;
                        }else{
                            self.activeHour.index=self.hourLists.length-1;
                        }
                        self.activeHour.name=self.hourLists[self.activeHour.index];
                    }else if(self.activeElement==4){
                        if(self.sliderBlockNums<self.minuteLists.length-self.activeMinute.index){
                            self.activeMinute.index+=self.sliderBlockNums;
                        }else{
                            self.activeMinute.index=self.minuteLists.length-1;
                        }
                        self.activeMinute.name=self.minuteLists[self.activeMinute.index];
                    }else if(self.activeElement==5){
                        if(self.sliderBlockNums<self.secondLists.length-self.activeSecond.index){
                            self.activeSecond.index+=self.sliderBlockNums;
                        }else{
                            self.activeSecond.index=self.secondLists.length-1;
                        }
                        self.activeSecond.name=self.secondLists[self.activeSecond.index];
                    }

                }else if(self.direction==3){//向下
                    if(self.activeElement==0){
                        if(self.sliderBlockNums<self.activeYear.index){
                            self.activeYear.index-=self.sliderBlockNums;
                        }else{
                            self.activeYear.index=0;
                        }
                        console.log(self.activeYear.index);
                        //重新设置激活年份
                        self.activeYear.name=self.yearLists[self.activeYear.index];
                        //设置默认月份为第一个月和第一天
                        self.activeMonth.name="01";
                        self.activeMonth.index=0;
                        self.activeDate.name="01";

                    }else if(self.activeElement==1){
                        if(self.sliderBlockNums<self.activeMonth.index){
                            self.activeMonth.index-=self.sliderBlockNums;
                        }else{
                            self.activeMonth.index=0;
                        }
                        console.log(self.activeMonth.index);
                        //重新设置激活月
                        self.activeMonth.name=self.monthLists[self.activeMonth.index];
                        //默认设置第一天
                        self.activeDate.name="01";
                    }else if(self.activeElement==2){
                        if(self.sliderBlockNums<self.activeDate.index){
                            self.activeDate.index-=self.sliderBlockNums;
                        }else{
                            self.activeDate.index=0;
                        }
                        self.activeDate.name=self.dateLists[self.activeDate.index];
                        self.setDistance();
                        return;
                    }else if(self.activeElement==3){
                        if(self.sliderBlockNums<self.activeHour.index){
                            self.activeHour.index-=self.sliderBlockNums;
                        }else{
                            self.activeHour.index=0;
                        }
                        self.activeHour.name=self.hourLists[self.activeHour.index];
                    }else if(self.activeElement==4){
                        if(self.sliderBlockNums<self.activeMinute.index){
                            self.activeMinute.index-=self.sliderBlockNums;
                        }else{
                            self.activeMinute.index=0;
                        }
                        self.activeMinute.name=self.minuteLists[self.activeMinute.index];
                    }else if(self.activeElement==5){
                        if(self.sliderBlockNums<self.activeSecond.index){
                            self.activeSecond.index-=self.sliderBlockNums;
                        }else{
                            self.activeSecond.index=0;
                        }
                        self.activeSecond.name=self.secondLists[self.activeSecond.index];
                    }
                }
            },
            undoEvent(){
                const self=this;
                //触发事件
                self.$emit("getdate");
            },
            comfirmEvent(){
                const self=this;
                //根据类型进行赋值
                if(self.datepickerType=="common"){
                    self.backDateValue=self.activeYear.name+"-"+self.activeMonth.name+"-"+self.activeDate.name
                            +" "+self.activeHour.name+":"+self.activeMinute.name+":"+self.activeSecond.name;
                }else if(self.datepickerType=="date"){
                    self.backDateValue=self.activeYear.name+"-"+self.activeMonth.name+"-"+self.activeDate.name;
                }else if(self.datepickerType=="month"){
                    self.backDateValue=self.activeYear.name+"-"+self.activeMonth.name;
                }else if(self.datepickerType=="time"){
                    self.backDateValue=self.activeHour.name+":"+self.activeMinute.name+":"+self.activeSecond.name;
                }else if(self.datepickerType=="minute"){
                    self.backDateValue=self.activeHour.name+":"+self.activeMinute.name;
                }

                self.$emit("getdate", self.backDateValue);
            },
            getAngle(dx,dy){//获取滑动的角度
                return Math.atan2(dy, dx) * 180 / Math.PI;
            },
            getSliderDistance(x1,y1,x2,y2){
                var calX=x2-x1,
                        calY=y2-y1;
                return Math.pow((calX *calX + calY * calY), 0.5);
            },
            getDirection(x1,y1,x2,y2){//获取滑动的方向
                const self=this;
                var differX=x2-x1;
                var differY=y1-y2;//y轴向下为正方形
                var result=0,angle;
                /*距离太短考虑*/
                if(Math.abs(differX)<2&&Math.abs(differY)<2){
                    return result;
                }
                /*获取角度并传回result*/
                angle=self.getAngle(differX,differY);
                if(angle >= 45 && angle < 135){//向上
                    result=1;
                }else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){//向左
                    result=2;
                }else if(angle>=-135&& angle < -45){//向下
                    result=3;
                }else if(angle >= -45 && angle < 45){//向右
                    result=4;
                }

                return result;
            },
            destory:function(){
                const self=this;
                self.init();
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    .shade-panel{
        position:fixed;
        bottom:0;
        left:0;
        z-index:12;
        width:100%;
        height:100%;
        background: rgba(1,1,1,0.3);
    }
    .date-select-lists{
        position:absolute;
        bottom:0;
        left:0;
        z-index:15;
        width:100%;
        height:200px;
        background-color:#fff;
        border:1px solid #ccc;
        border-radius:3px;
        color:#C3C3C3;
        overflow: hidden;
    }
    .date-select-lists .select-list{
        height:100%;
    }
    .date-select-lists .select-list>div{
        position:relative;
        float:left;
        height:100%;
        line-height:40px;
        text-align:center;
    }
    .date-select-lists .select-list>div~div{
        margin-left:2%;
    }
    .active-area{
        position:absolute;
        left:2px;
        top:40%;
        bottom:35%;
        z-index:10;
        width:99%;
        height:40px;
        line-height:40px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;

    }
    .date-select-lists .area-header{
        position:absolute;
        top:0;
        left:0;
        z-index:2;
        width:100%;
        height:40px;
        line-height:40px;
        background-color:#fff;
        border-bottom:1px solid #C4C3C3;
    }
    .date-select-lists .title{
        color:#000;
    }
    .date-select-lists .area-header>div{
        width:32%;
        height:40px;
    }
    .date-select-lists .date-lists{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        width: 100%;
        height: 100%;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-transform: translate3d(0,0,0);
        -moz-transform: translate3d(0,0,0);
        -o-transform: translate(0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform;
        transition: all .5s ease-in;
        text-align: center;
    }
    .date-select-lists .date-lists>li{
        list-style:none;
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width:100%;
        height:40px;

    }
    .swiper-container{
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-wrapper{
        height:auto;
    }
    .swiper-active{
        color:#2b2b2b;
    }

    /*过渡样式*/
    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateY(100px);
        opacity: 0;
    }

    /*兼容各种分辨率*/
    @media all and (max-width:350px){
        .date-select-lists{
            font-size:14px;
        }
    }

</style>