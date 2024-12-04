const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
      process.env.BRANCH === 'develop'
          ? '/assignment2-vue2/develop/' // develop 브랜치: /develop/ 경로로 배포
          : '/assignment2-vue2/',        // main 브랜치: 루트 경로로 배포
});
