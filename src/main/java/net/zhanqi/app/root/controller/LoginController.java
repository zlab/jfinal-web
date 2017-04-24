package net.zhanqi.app.root.controller;

import com.jfinal.core.Controller;
import com.jfinal.log.Log;

/**
 * LoginApiController
 */
public class LoginController extends Controller {

    private static final Log log = Log.getLog(LoginController.class);

    public void index() {
        log.warn("login");
    }

    public void github() {
        //Object profile = SecurityUtils.getSubject().getPrincipals().asList();
        //log.info(profile.toString());
        // GitHubProfile profile = (GitHubProfile) SecurityUtils.getSubject()
        // .getPrincipals().asList().get(1);
        // System.out.println(profile.getAccessToken());
        // System.out.println(profile.getGravatarId());
    }

}