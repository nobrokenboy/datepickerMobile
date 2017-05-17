<template>
    <div id="example">
        <h1 align="center">关于datetimePicker组件的使用例子</h1>
        <form class="app-modal-common-form">
            <h2>1.选择年月日 时分秒</h2>
            <div class="form-text">
                <input type="text" placeholder="请选择日期" @click="datetimePickerObj.isShow=true"
                       readonly v-model="datetimePickerObj.comfirmDate" />
            </div>
            <h2>2.选择年月日</h2>
            <div class="form-text">
                <input type="text" placeholder="请选择日期" @click="datetimePickerObj1.isShow=true"
                       readonly v-model="datetimePickerObj1.comfirmDate" />
            </div>
            <h2>3.选择年月</h2>
            <div class="form-text">
                <input type="text" placeholder="请选择日期" @click="datetimePickerObj2.isShow=true"
                       readonly v-model="datetimePickerObj2.comfirmDate" />
            </div>
            <h2>4.选择时分秒</h2>
            <div class="form-text">
                <input type="text" placeholder="请选择时间" @click="datetimePickerObj3.isShow=true"
                       readonly v-model="datetimePickerObj3.comfirmDate" />
            </div>
            <h2>5.选择时分</h2>
            <div class="form-text">
                <input type="text" placeholder="请选择时间" @click="datetimePickerObj4.isShow=true"
                       readonly v-model="datetimePickerObj4.comfirmDate" />
            </div>
        </form>
        <!--显示年月日，时分秒的-->
        <datetime-picker  :isShowSelector="datetimePickerObj.isShow" :transition-type="datetimePickerObj.transitionType"
                           beginYear="2015" endYear="2020"  datepickerType="common" dateValue="2016-10-10 12:12:10" v-on:getdate="changeDateSelector"></datetime-picker>
        <!--显示年月日的-->
        <datetime-picker  :isShowSelector="datetimePickerObj1.isShow" :transition-type="datetimePickerObj1.transitionType"
                          beginYear="2015" endYear="2017" themeColor="#8600ff"  datepickerType="date" v-on:getdate="changeDateSelector1">
        </datetime-picker>
        <!--显示年月的-->
        <datetime-picker  :isShowSelector="datetimePickerObj2.isShow" :transition-type="datetimePickerObj2.transitionType"
                          themeColor="#00e3e3" datepickerType="month"  dateValue="2012-01" v-on:getdate="changeDateSelector2">
        </datetime-picker>
        <!--显示时分秒的-->
        <datetime-picker  :isShowSelector="datetimePickerObj3.isShow" :transition-type="datetimePickerObj3.transitionType"
                          themeColor="#AE51A4" datepickerType="time"  v-on:getdate="changeDateSelector3">
        </datetime-picker>
        <!--显示时分的-->
        <datetime-picker  :isShowSelector="datetimePickerObj4.isShow" :transition-type="datetimePickerObj4.transitionType"
                          shadeZIndex="99" themeColor="#FF0000" datepickerType="minute" v-on:getdate="changeDateSelector4">
        </datetime-picker>

    </div>
</template>

<script type="text/ecmascript-6">
    import DatetimePicker from "../src/datetimePicker.vue";
    export default {
        props: [],
        data(){
        return {
            datetimePickerObj:{
                isShow:false,
                transitionType:"slide-fade",
                comfirmDate:""
            },
            datetimePickerObj1:{
                isShow:false,
                transitionType:"slide-fade",
                comfirmDate:""
            },
            datetimePickerObj2:{
                isShow:false,
                transitionType:"slide-fade",
                comfirmDate:""
            },
            datetimePickerObj3:{
                isShow:false,
                transitionType:"slide-fade",
                comfirmDate:""
            },
            datetimePickerObj4:{
                isShow:false,
                transitionType:"slide-fade",
                comfirmDate:""
            }
        }
    },
    mounted(){
        const self=this;

    },
    methods:{
        changeDateSelector(data){
            const self=this;
            if(data){
                self.datetimePickerObj.comfirmDate=data;
            }
            self.datetimePickerObj.isShow=false;
        },
        changeDateSelector1(data){
            const self=this;
            if(data){
                self.datetimePickerObj1.comfirmDate=data;
            }
            self.datetimePickerObj1.isShow=false;
        },
        changeDateSelector2(data){
            const self=this;
            if(data){
                self.datetimePickerObj2.comfirmDate=data;
            }
            self.datetimePickerObj2.isShow=false;
        },
        changeDateSelector3(data){
            const self=this;
            if(data){
                self.datetimePickerObj3.comfirmDate=data;
            }
            self.datetimePickerObj3.isShow=false;
        },
        changeDateSelector4(data){
            const self=this;
            if(data){
                self.datetimePickerObj4.comfirmDate=data;
            }
            self.datetimePickerObj4.isShow=false;
        }
    },
    components:{
        DatetimePicker
    }
    }
</script>

<style lang="scss" scoped>
    h1{
        font-size:18px;
    }
    h2{
        font-size:16px;
    }
    #example{
        padding:10px;
        background-color:#fff;
    }
</style>