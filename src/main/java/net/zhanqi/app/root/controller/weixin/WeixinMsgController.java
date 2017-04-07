package net.zhanqi.app.root.controller.weixin;

import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.jfinal.MsgController;
import com.jfinal.weixin.sdk.msg.in.*;
import com.jfinal.weixin.sdk.msg.in.event.*;
import com.jfinal.weixin.sdk.msg.in.speech_recognition.InSpeechRecognitionResults;
import com.jfinal.weixin.sdk.msg.out.OutCustomMsg;
import com.jfinal.weixin.sdk.msg.out.OutMsg;
import com.jfinal.weixin.sdk.msg.out.OutNewsMsg;
import com.jfinal.weixin.sdk.msg.out.OutTextMsg;

/**
 * Created by zhanqi on 2015/8/5.
 */
public class WeixinMsgController extends MsgController {

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

    @Override
    protected void processInVerifyFailEvent(InVerifyFailEvent inVerifyFailEvent) {

    }

    @Override
    protected void processInShakearoundUserShakeEvent(InShakearoundUserShakeEvent inShakearoundUserShakeEvent) {

    }

    @Override
    protected void processInVerifySuccessEvent(InVerifySuccessEvent inVerifySuccessEvent) {

    }

    @Override
    protected void processInTextMsg(InTextMsg inTextMsg) {
       // System.out.println(inTextMsg);




        OutNewsMsg newsMsg = new OutNewsMsg(inTextMsg);
        newsMsg.addNews("测试标题","简单描述",
                "http://mmbiz.qpic.cn/mmbiz/Kx8MwxTHvfBO3Z6xPYIWX30Nkgu7docncUtytJ3OMowMyicC8WgP2oH51zgmos9mncgfRQgdRcJorS0QukmgyJQ/0",
                "http://year20.yearcon.cn");

        render(newsMsg);

    }

    @Override
    protected void processInImageMsg(InImageMsg inImageMsg) {
        renderNull();
    }

    @Override
    protected void processInVoiceMsg(InVoiceMsg inVoiceMsg) {
        renderNull();
    }

    @Override
    protected void processInVideoMsg(InVideoMsg inVideoMsg) {
        renderNull();
    }

    @Override
    protected void processInShortVideoMsg(InShortVideoMsg inShortVideoMsg) {
        renderNull();
    }

    @Override
    protected void processInLocationMsg(InLocationMsg inLocationMsg) {
        renderNull();
    }

    @Override
    protected void processInLinkMsg(InLinkMsg inLinkMsg) {
        renderNull();
    }

    @Override
    protected void processInCustomEvent(InCustomEvent inCustomEvent) {
        renderNull();
    }

    @Override
    protected void processInFollowEvent(InFollowEvent inFollowEvent) {
        renderNull();
    }

    @Override
    protected void processInQrCodeEvent(InQrCodeEvent inQrCodeEvent) {
        renderNull();
    }

    @Override
    protected void processInLocationEvent(InLocationEvent inLocationEvent) {
        renderNull();
    }

    @Override
    protected void processInMassEvent(InMassEvent inMassEvent) {
        renderNull();
    }

    @Override
    protected void processInMenuEvent(InMenuEvent inMenuEvent) {
        renderNull();
    }

    @Override
    protected void processInSpeechRecognitionResults(InSpeechRecognitionResults inSpeechRecognitionResults) {
        renderNull();
    }

    @Override
    protected void processInTemplateMsgEvent(InTemplateMsgEvent inTemplateMsgEvent) {
        renderNull();
    }
}
