package net.zhanqi.app.root.config;

import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.FreeMarkerRender;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import freemarker.template.Configuration;
import freemarker.template.TemplateModelException;
import net.zhanqi.app.root.controller.weixin.WeixinApiController;
import net.zhanqi.app.root.controller.weixin.WeixinMsgController;
import net.zhanqi.app.root.controller.zh.InputController;
import net.zhanqi.app.root.core.Slf4jLogFactory;
import net.zhanqi.app.root.model.WxZhInput;

/**
 * API引导式配置
 */
public class AppConfig extends JFinalConfig {

    /**
     * 配置常量
     */
    public void configConstant(Constants me) {
        loadPropertyFile("config.properties");

        ApiConfigKit.setDevMode(getPropertyToBoolean("devMode", false));

        me.setDevMode(getPropertyToBoolean("devMode", false));
        me.setBaseViewPath(getProperty("baseViewPath"));
        me.setError401View("/common/401.ftl");
        me.setError403View("/common/403.ftl");
        me.setError404View("/common/404.ftl");
        me.setError500View("/common/500.ftl");
        me.setErrorView(400, "/common/400.ftl");
        me.setFreeMarkerViewExtension(".ftl");
//        me.setUploadedFileSaveDirectory(getProperty("uploadDir"));
        me.setLogFactory(new Slf4jLogFactory());

//        JsonRender.addExcludedAttrs("_paramList", "_configList");

        try {
            Configuration config = FreeMarkerRender.getConfiguration();
            config.setSharedVariable("viewPath", getProperty("baseViewPath"));

            String ctxPath = JFinal.me().getContextPath();
            if (ctxPath.equals("/")) {
                ctxPath = "";
            }

            config.setSharedVariable("ctx", getProperty("serverName") + ctxPath);
        } catch (TemplateModelException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * 配置路由
     */
    public void configRoute(Routes me) {
        me.add("/zh", InputController.class, "/zh");

        me.add("/weixin/msg", WeixinMsgController.class);
        me.add("/weixin/api", WeixinApiController.class, "/weixin");
    }

    /**
     * 配置插件
     */
    public void configPlugin(Plugins me) {
        DruidPlugin druidPlugin = new DruidPlugin(getProperty("url"), getProperty("username"),
                getProperty("password"));
        me.add(druidPlugin);

        ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
        me.add(arp);

        arp.addMapping("wx_zh_input", WxZhInput.class);

        //  arp.addMapping("test_user", TestUser.class);
    }

    /**
     * 配置全局拦截器
     */
    public void configInterceptor(Interceptors me) {
        // 控制层
        // me.addGlobalActionInterceptor(new OptionInterceptor());
//        me.addGlobalActionInterceptor(new FlagInterceptor());
//        me.addGlobalActionInterceptor(new ParamInterceptor());
        // me.add(new TxByRegex(".*", false));

        // 业务层
        me.addGlobalServiceInterceptor(new Tx());
    }

    /**
     * 配置处理器
     */
    public void configHandler(Handlers me) {
//        me.add(new PermanentRedirectHandler());
//        me.add(new UrlSkipHandler(".+\\.\\w{1,4}", false));
//        me.add(new ServerNameRedirect301Handler(getProperty("originalServerName"),
//                getProperty("targetServerName")));
    }

    @Override
    public void afterJFinalStart() {
//        JFinal.me().getServletContext().setAttribute("permList", SysPerm.me.queryPermList());
    }
}
