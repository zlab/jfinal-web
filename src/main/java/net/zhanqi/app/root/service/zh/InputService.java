package net.zhanqi.app.root.service.zh;

import com.jfinal.aop.Enhancer;

/**
 * Created by zhanqi on 2015/8/20.
 */
public class InputService {

    public static final InputService me = Enhancer.enhance(InputService.class);
}
