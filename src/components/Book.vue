<template>
    <div class="user">
        <i-table :columns="columns" :data="formatData" :height="619" :loading="fetch" stripe></i-table>
        <div style="margin: 15px;overflow: hidden">
        <div style="float: right;">
            <Page 
                :total="total" 
                :current="current" 
                @on-change="changePage"
                @on-page-size-change="pageSizeChange"	
                :page-size="pageSize"
                :page-size-opts="[6, 12, 18, 24]"
                show-sizer 
                show-elevator 
                show-total 
                prev-text="上一页" 
                netx-text="下一页"
            />
        </div>
    </div>
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
                                    this.$router.push({
                                        name: 'detail',
                                        params: {
                                            book: params.row,
                                        },
                                    });
                                }
                            }
                        }, '详细信息'),
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
                                    this.$router.push({
                                        name: 'chapters',
                                        params: {
                                            book: params.row,
                                        },
                                    });
                                }
                            }
                        }, '章节管理'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    console.log('row:', params.row);
                                    this.removeBook(params.row);
                                }
                            }
                        }, '删除'),
                    ]);
                }
            }],
            data: [],
            fetch: false,
            current: 1,
            pageSize: 12,
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
        total() {
            return Math.ceil(this.data.length);
        },
        formatData() {
            // 当前页数 
            // item/页
            const start = (this.current - 1) * this.pageSize;
            const end = this.current * this.pageSize;
            console.log('start: ', start, 'end: ', end);

            return this.comData.slice(start, end);
        }
    },
    created() {
        this.fetch = true;
        ajax({
            url: '/book',
        }).then((res) => {
            this.data = res.data;
            this.fetch = false;
            console.log('data: ', this.data);
        });
    },
    methods: {
        linkToDetail() {
        },
        changePage(now) {
            this.current = now;
        },
        pageSizeChange(now) {
            this.pageSize = now;
        },
        removeBook(book) {
            console.log('book: ', book);
            console.log('bookid: ', book._id);
            this.$Modal.confirm({
                title: '操作确认',
                content: `
                    <p>您确认将《${book.bookname}》从数据库中删除?</p>
                `,
                onOk: () => {
                    ajax({
                        url: '/delBook',
                        method: 'post',
                        data: {
                            bookid: book._id,
                        },
                    }).then(res => {
                        console.log(res);
                        if(res.data.code === 0) {
                            this.$Message.info('删除成功');
                        }else {
                            this.$Message.error(res.data.des);
                        } 
                    }).catch(err => {
                        this.$Message.error(err);
                    });
                },
                onCancel: () => {
                    this.$Message.info('操作已取消');
                }
            });
        }
    },
}
</script>
<style lang="less" scoped>
    .table {
        height: 600px;
        overflow-y: auto;
    }
</style>
