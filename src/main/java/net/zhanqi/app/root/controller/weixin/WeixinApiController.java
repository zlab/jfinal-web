package net.zhanqi.app.root.controller.weixin;

import com.jfinal.aop.Before;
import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.CustomServiceApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;
import net.zhanqi.jfinal.ext.plugin.jssdk.BaseOauthInterceptor;
import net.zhanqi.jfinal.ext.plugin.jssdk.JsApiSignature;

/**
 * Created by zhanqi on 2015/8/5.
 */
public class WeixinApiController extends ApiController {

    @Override
    public ApiConfig getApiConfig() {
        ApiConfig ac = new ApiConfig();

        // 配置微信 API 相关常量
        ac.setToken(PropKit.get("token"));
        ac.setAppId(PropKit.get("appId"));
        ac.setAppSecret(PropKit.get("appSecret"));

        /**
         *  是否对消息进行加密，对应于微信平台的消息加解密方式：
         *  1：true进行加密且必须配置 encodingAesKey
         *  2：false采用明文模式，同时也支持混合模式
         */
        ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
        ac.setEncodingAesKey(PropKit.get("encodingAesKey", "setting it in config file"));
        return ac;
    }

    /**
     * jssdk 签名
     */
    public void signature() {
        String url = getPara("url");
        renderJson(JsApiSignature.signature(url));
    }

    @Before(BaseOauthInterceptor.class)
    public void test() {
        render("weixin.ftl");
    }

    public void testZh() {
        String str = "{\n" +
                "    \"endtime\" : 987654321,\n" +
                "    \"pageindex\" : 1,\n" +
                "    \"pagesize\" : 10,\n" +
                "    \"starttime\" : 123456789\n" +
                " }";
        ApiResult apiResult = CustomServiceApi.getRecord(str);
        renderText(apiResult.getJson());
    }
}
