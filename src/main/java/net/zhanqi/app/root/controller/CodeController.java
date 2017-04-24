package net.zhanqi.app.root.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.Writer;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.jfinal.core.Controller;
import com.jfinal.log.Log;
import net.zhanqi.app.root.core.ImageRender;
import net.zhanqi.app.root.plugin.code.MatrixToImageWriter;

import java.awt.image.BufferedImage;

/**
 * 条形码
 */
public class CodeController extends Controller {

    private static final Log log = Log.getLog(CodeController.class);

    public void qrCode() {
        Writer writer = new QRCodeWriter();
        try {
            String content = "http://zhanqi.net/blog/";
            BitMatrix matrix = writer.encode(content, BarcodeFormat.QR_CODE, 200, 200);
            BufferedImage image = MatrixToImageWriter.toBufferedImage(matrix);

            render(new ImageRender(image));
        } catch (WriterException e) {
            log.error(e.getMessage(), e);
        }
    }


}