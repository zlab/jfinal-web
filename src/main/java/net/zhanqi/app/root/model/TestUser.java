package net.zhanqi.app.root.model;

import com.jfinal.plugin.activerecord.Model;

public class TestUser extends Model<TestUser> {

    private static final long serialVersionUID = 1L;

    public static final TestUser me = new TestUser();
}
