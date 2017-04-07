package net.zhanqi.app.root.core;

import com.jfinal.core.ActionException;
import com.jfinal.render.RenderFactory;

public class CustomException extends ActionException {

    public CustomException(String errorMsg) {
        super(400, new CustomErrorRender(errorMsg));
    }

}
