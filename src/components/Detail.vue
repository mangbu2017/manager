<template>
    <div class="book-detail">
        <Row>
            <i-col span="8" class="col-item">
                {{book.cover}}
                <!-- <img :src="book.cover" /> -->
                <img src="https://m.x23us.com/modules/article/images/nocover.jpg" />
            </i-col>
            <i-col span="8" class="col-item">
                <h2>书名: {{ book.bookname }}</h2>
                <h2>作者: {{ book.author }}</h2>
                <h2>分类: {{ book.category }}</h2>
            </i-col>
            <i-col span="8" class="col-item">
                <h2>更新状态: {{ book.writeState }}</h2>
                <h2>最新章节: {{ book.lastChapter }}</h2>
                <h2>章节总数: {{ book.cpLen }}</h2>
            </i-col>
        </Row>
        <Row class="info">
            <i-col span="24">
                <h2>简介: {{ book.intro }}</h2>
            </i-col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            book: {},
        }
    },
    beforeRouteEnter (to, from, next) {
        // detail 不允许url直接访问 需要从book跳转
        
        // 重定向
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
    created() {
        this.book = this.$route.params.book;
        console.log('detail.created: ', this.book);
    },
}
</script>
<style lang="less" scoped>
    .book-detail {
        .col-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-Content: center;
            height: 180px;
        }
        .info {
            padding: 0px 100px;
        }
    }
</style>