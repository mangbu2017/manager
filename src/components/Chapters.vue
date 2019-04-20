<template>
    <div class="book-chapters">
        <Card class="control-card">
            <span :style="{ marginRight: '10px',}">章节数: {{this.chapterNums}} (存库) / {{this.data.chapters.length}} (总数)</span>
            <i-button type="primary" @click="getChapterList" :style="{ marginRight: '10px',}">爬取(更新)章节列表</i-button>
            <i-button type="primary" @click="getChapters">爬取选中章节</i-button>
            <div class="percent">
                <Progress :percent="percent" />
            </div>
        </Card>
        <i-table 
            ref="selection"
            :columns="columns" 
            :data="formatData" 
            :height="555" 
            :loading="fetch" 
            stripe 
            border
            @on-select="select"
            @on-select-all="selectAll"
            @on-selection-change="selectChange"
        ></i-table>
        <div style="margin: 15px;overflow: hidden">
            <div style="float: right;">
                <Page 
                    :total="total" 
                    :current="current" 
                    @on-change="changePage"
                    @on-page-size-change="pageSizeChange"	
                    :page-size="pageSize"
                    :page-size-opts="[6, 12, 18, 24, data.chapters.length]"
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
import axios from 'axios';
import ajax from '../http/index';

export default {
    data() {
        return {
            columns: [{
                type: 'selection',
                width: 60,
                align: 'center',
            }, {
                title: '章节id',
                key: '_id',
            }, {
                title: '章节名称',
                key: 'chaptername',
            }, {
                title: '章节内容',
                key: 'hasContent',
            }, {
                title: '操作',
                key: 'action',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                disabled: params.row.disabled,
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    const index = params.row.index; 
                                    axios({
                                        method: 'get',
                                        url: `http://127.0.0.1:9999/api/book/${this.data._id}/${index}`, 
                                    }).then(res => {
                                        console.log(res);
                                        this.$Spin.show();
                                        if(res.data.code === 0) {
                                            this.$set(this.data.chapters[index], 'content', res.data.data);
                                            this.$Spin.hide();
                                            this.$Message.success('章节内容获取成功');
                                        }else {
                                            this.$Message.error(res.data.data.des);
                                        }
                                    }).catch(err => {
                                        this.$Message.error(err);
                                    });
                                }
                            }
                        }, '爬取内容'),
                        // h('Button', {
                        //     props: {
                        //         type: 'error',
                        //         size: 'small'
                        //     },
                        //     on: {
                        //         click: () => {
                        //             console.log('row:', params.row);
                        //             this.removeBook(params.row);
                        //         }
                        //     }
                        // }, '删除'),
                    ]);
                }
            }],
            data: [],
            fetch: false,
            current: 1,
            pageSize: 12,
            split: 0.5,
            selectArr: [],
            failreqs: [],
        }
    },
    computed: {
        percent() {
            const len = this.data.chapters.length;
            
            return Math.ceil(this.chapterNums / len * 100);
        },
        chapterNums() {
            return this.data.chapters.filter(item => {
                return item.content;
            }).length;
        },
        comData() {
            return this.data.chapters.map((item, index) => {
                return Object.assign(item, {
                    hasContent: item.content ? '有' : '无',
                    disabled: item.content ? true : false,
                    _disabled: item.content ? true : false,
                    index,
                });
            });
        },
        total() {
            return Math.ceil(this.data.chapters.length);
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
        this.data = this.$route.params.book;
    },
    beforeRouteEnter (to, from, next) {
        if(!to.params.book) {
            console.log(this);
            next(vm => {
                vm.$router.push({
                    name: 'book',
                });
            });
        }
        next();
    },
    methods: {
        getChapterList() {
            this.$Modal.confirm({
                title: '操作确认',
                content: `
                    <p>您确认爬取(更新)《${this.data.bookname}》的章节列表并插库?</p>
                `,
                onOk: () => {
                    console.log(this.data._id);
                    this.$Spin.show();
                    ajax({
                        url: `/updateChapters?bookid=${this.data._id}`,
                        method: 'get',
                    }).then(res => {
                        console.log(res);
                        this.$Spin.hide();
                        if(res.data.code === 0) {
                            this.data.chapters = res.data.data;
                            this.$Message.info('爬取成功');
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
        },
        select(a) {
            this.selectArr = a;
        },
        selectAll(a) {
            this.selectArr = a;
        },
        getCp(index) {
            const promise = axios({
                method: 'get',
                url: `http://127.0.0.1:9999/api/book/${this.data._id}/${index}`, 
            }).then(res => {
                console.log(res);
                this.$Spin.show();
                if(res.data.code === 0) {
                    this.$set(this.data.chapters[index], 'content', res.data.data);
                    this.$Spin.hide();
                    this.$Message.success('章节内容获取成功');
                }else {
                    this.$Message.error(res.data.data.des);
                    this.failreqs.push(item);
                }
            }).catch(err => {
                this.$Message.error(err);
            });

            return promise;
        },
        getChapters() {
            const select = this.selectArr,
                  len = select.length,
                  getCp = this.getCp;

            let current = 0;

            console.log('select: ', select);

            function fn() {
                console.log('current: ', current);
                const arr = [];

                for(let i = current; i < current + 5; i ++) {
                    const cp = select[i];
                    console.log(cp);

                    if(cp)  {
                        arr.push(getCp(cp.index));
                    }
                }

                console.log('arr: ', arr);

                Promise.all(arr).then(res => {

                    if(current < len) {
                        current += 5;
                        fn();
                    }
                });
            }

            
            fn();
        },
        selectChange(a, b) {
            console.log('selectChange:', a, b)
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
    .book-chapters {
        background-color: #f5f7f9;
    }
    .control-card {
        width: 100%;
        // display: flex;
        height: 70px;
        margin-bottom: 10px;
        .percent {
            width: 400px;
            height: 100px;
            margin-left: 30px;
            display: inline-block;
        }
    }
    .demo-split-pane {
        width: 100%;
        height: 200px;
        background-color: red;
    }
    .table {
        // height: 600px;
        // overflow-y: auto;
    }
</style>
