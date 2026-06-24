/**
 * 拦截粘贴事件，用 File 方式插入图片
 */
export function setupPasteInterceptor(editorIframe: HTMLIFrameElement | null) {
    //   const editorIframe = document.querySelector('iframe');
    if (!editorIframe) return;

    // 监听 iframe 的 paste 事件
    const iframeDoc = editorIframe.contentDocument || editorIframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.addEventListener('paste', async (e: ClipboardEvent) => {
        debugger
        const items = e.clipboardData?.items;
        if (!items) return;

        const imageItems = Array.from(items).filter(item =>
            item.type.startsWith('image/')
        );

        if (imageItems.length === 0) return;

        // 阻止默认粘贴行为
        e.preventDefault();
        e.stopPropagation();

        for (const item of imageItems) {
            const blob = item.getAsFile();
            if (!blob) continue;

            // 转为 File 对象（模拟本地文件）
            const fileName = `pasted-image-${Date.now()}.png`;
            const file = new File([blob], fileName, { type: blob.type });

            const objectUrl = URL.createObjectURL(file);
            // 使用 ONLYOFFICE 的 InsertImage 方法（原生支持）
            // insertImageAsFile(file);
            window.editor?.insertImage({
                c: "add",                    // 操作类型：add | change | fill | watermark | slide
                images: [                    // 图片数组（核心参数）
                    {
                        fileType: "png",         // 图片格式：bmp, gif, jpe, jpeg, jpg, png, tif, tiff
                        url: objectUrl
                    }
                ]
            })
        }
    }, true); // useCapture: true 确保先于 ONLYOFFICE 处理
}
