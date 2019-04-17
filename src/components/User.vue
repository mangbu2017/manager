<template>
    <div class="user">
        <i-table :columns="columns" :data="data"></i-table>
    </div>
</template>
<script>
import ajax from '../http/index';

export default {
    data() {
        return {
            columns: [{
                title: '用户名',
                key: '_id',
            }, {
                title: '创建时间',
                key: 'createTime',
            }, {
                title: '操作',
            }],
            data: [],
        }
    },
    created() {
        ajax({
            url: '/user',
        }).then((res) => {
            console.log(res);
            this.data = res.data;
        });
    }
}
</script>
<style lang="less">
    
</style>