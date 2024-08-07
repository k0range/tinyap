// こん中からさらにファイル分け
// 基本機能・必須機能はcoreモジュール
// そういや今EventEmitter機能する？

import Elysia from "elysia";
import lodash from "lodash"

import eventEmitter from '../../src/eventEmitter';

export default function testPlugin(app: Elysia) {
  // 新しいエンドポイントを追加
  app.get('/my-plugin-endpoint', () => {
    let result = lodash.capitalize('hello world');
    return result
  });

  app.get('/my-plugin-endpoint2', () => {
    return "marked"
  });

  eventEmitter.on('test', async ({ hikisuu }) => {
    console.log(`aa ${hikisuu}`)
  });
}