package net.zhanqi.app.root.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.Writer;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.jfinal.core.Controller;
import com.jfinal.log.Logger;
import net.zhanqi.jfinal.ext.core.ImageRender;
import net.zhanqi.jfinal.ext.plugin.code.MatrixToImageWriter;

import java.awt.image.BufferedImage;

/**
 * 条形码
 */
public class CodeController extends Controller {

    private static final Logger log = Logger.getLogger(CodeController.class);

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