## 开发调试

公司对数据库有一套安全规范，本地开发只能通过 BOE TCE 访问 BOE ByteDoc, 所以在开发之前需要完成授权.

<!-- 1. 录入个人邮箱

   [kerberos 配置手册](https://bytedance.feishu.cn/docs/fUsddenz4OGS06NM2VOVWa)

   ```
   // 后缀一定要大写
   kinit xxx@BYTEDANCE.COM
   ```

2. 配置 dios

   [dios 工具使用说明](https://bytedance.feishu.cn/wiki/wikcnOcSbODdGuXbpSsUAiwQhgc#)

   ```
   dios -p inspire.editor.catelog env | grep SEC_TOKEN_STRING
   export SEC_TOKEN_STRING = xxxx
   ``` -->

1. 安装 dps

   ```bash
   npm i @ies/node-doas -g
   ```

````

2. 录入邮箱

    ```bash
    # 注意使用你自己的 ID
    kinit zhangsong.loves@BYTEDANCE.COM
    ```

3. run

    可通过命令行快速启动开发服务器

    ```bash
    npm run dev:dps
    ```


````
