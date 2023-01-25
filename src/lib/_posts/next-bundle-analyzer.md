---
title: next/bundle-analyzer
date: 2022-02-22
description: next/bundle-analyzer로 번들 크기 확인하기
category: javaScript
titleImage: /been-blog/postIcon/logo192.png
---


####
**bundle-analyzer**는 빌드된 파일을 트리맵 형식으로 종류와 크기를 보여준다.

next에서 제공하는 bundle-analyzer

next.config.js

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, {webpack}) {
    const prod = process.env.NODE_ENV === 'production'
    const plugins = [...config.plugins]
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins
    }
  }
})
```

package.json / script

```
"build": "ANALYZE=true next build",
```

<img src="/been-blog/blog/javaScript/bundle-analyzer.png" width="100%" alt="bundle-analyzer"/>


이런식으로 html이 실행된다.

서버와 클라이언트 두개의 창이 실행되는데 클라이언트 부분인 사용자에게 직접 보여질 부분이라, 서버 부분보다는 클라이언트 부분을 줄이는게 더 효과적이라고 한다.

아이콘으로 쓰일 이미지를 두개쓰기싫어 svg를 컴포넌트화시켜 props로 색상을 변경시키게 했는데, 용량이 꽤 크다고 나왔다 거슬린다 🤔

줄일수있는 방법을 찾아봐야겠다.

또 나중에 최종 배포때는 번들된 JS 파일을 gz로 압축시켜 브라우저 쪽으로 보내주는 방법도 있다고 하는데, 나중에 시도해봐야겠다.
