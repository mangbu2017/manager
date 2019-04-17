<template>
    <div class="user">
        <i-table :columns="columns" :data="comData"></i-table>
    </div>
</template>
<script>
import ajax from '../http/index';

export default {
    data() {
        return {
            columns: [{
                title: '名称',
                key: 'bookname',
            }, {
                title: '作者',
                key: 'author',
            }, {
                title: '分类',
                key: 'category',
            }, {
                title: '章节长度',
                key: 'cpLen',
            }, {
                title: '操作',
                key: 'action',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.show(params.index)
                                }
                            }
                        }, 'View'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, 'Delete')
                    ]);
                }
            }],
            data: [],
        }
    },
    computed: {
        comData() {
            return this.data.map(item => {
                return Object.assign(item, {
                    cpLen: item.chapters.length,
                    name: '删除',
                });
            });
        },
    },
    created() {
        ajax({
            url: '/book',
        }).then((res) => {
            console.log(res);
            this.data = res.data;
        });
    }
}
</script>
<style lang="less">
    
</style>
