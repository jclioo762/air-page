<template>
    <div>
        <BFormInput v-model="selectedText" placeholder="Enter your name" />
        <BButton variant="primary" @click="submit">Submit</BButton>
    </div>
</template>
<script>
import { ref,defineComponent } from "vue";
import { getPosts } from '@/api';

export default defineComponent({
   name: "Home",
   setup() {
    const selectedText = ref("");
    const submit = () => {
        getPosts().then(result => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    return {
        selectedText,
        submit
    };
   }
});
</script>
<style scoped lang="less">
    
</style>