/**
 * postcss： 将 px转换为rem
 */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 192, // 基数 效果图尺寸/10
      propList: ['*'], // 设置需要转换的属性，*代表所有属性 如果不需要的可以用['*','!属性']
    },
  },
};
