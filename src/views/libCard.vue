<template>
    <div class="card-area">
        <router-link
            tag="div"
            class="info"
            :to="{
                name: 'detail',
                params: {
                    bookId: item.id
                }
            }"
        >
            <div class="img">
                <el-image
                    style="width: 100%; height: 100%"
                    :src="item.imgUrls[0]"
                    :fit="fit"
                ></el-image>
            </div>

            <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="price">
                    <span class="now">￥{{ item.price }}</span>
                    <span class="last">￥200</span>
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
        to: {
            type: String,
            default: '/'
        }
    },
    data() {
        return {
            fit: 'fill'
        };
    },
    methods: {}
};
</script>

<style>
.img {
    width: 100%;
    height: 65%;
    overflow: hidden;
}

.el-image {
    border-radius: 3px !important;
    /* overflow: hidden; */
}
.card-area {
    margin-top: 40px;
    -moz-user-select: none; /* Firefox私有属性 */
    -webkit-user-select: none; /* WebKit内核私有属性 */
    -ms-user-select: none; /* IE私有属性(IE10及以后) */
    -khtml-user-select: none; /* KHTML内核私有属性 */
    -o-user-select: none; /* Opera私有属性 */
    user-select: none; /* CSS3属性 */
    width: 15%;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
}

.info {
    width: 90%;
    height: 90%;
}

.card-area:hover {
    transition: all 0.5s;
    transform: translateY(-10px);
    box-shadow: 0 0 20px 5px #ccc;
}

.card-area .text {
    width: 100%;
    height: 100px;
    position: relative;
    top: 5%;
}

.name {
    width: 100%;
    font-size: 14px;
    color: #000;
    margin: 12px 0 0;
    height: 32px;
    line-height: 32px;
    color: #1e1e1e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.name:hover {
    color: #c62e2d;
}

.price .now {
    color: #c62e2d;
    margin-left: -10px;
    margin-right: 20px;
    font-size: 14px;
}

.price .last {
    text-decoration: line-through;
    color: #666;
    font-size: 12px;
}

@media only screen and (max-width: 768px) {
    .card-area {
        width: 28%;
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .card-area {
        width: 23%;
    }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
    .card-area {
        width: 18%;
    }
}
</style>
