<template>
  <body>
    <div class="relative">
      <section>
      <h1>食事記録アプリ「●●」</h1>
      <p>説明</p>
      <ul>
        <li>体重を記録する</li>
        <li>体重をグラフ化する</li>
        <li>食事内容を記録する</li>
        <li>食事内容を確認する</li>
      </ul>
      </section>
      <section>
      <v-btn depressed elevation="2" outlined>ログイン</v-btn>
      <v-btn depressed elevation="2" outlined>会員登録</v-btn>
      </section>
    </div>
  </body>
</template>

<script>
export default {
  head() {
    return {
      title: "ホーム"
    };
  }
};
</script>

<style scoped></style>
