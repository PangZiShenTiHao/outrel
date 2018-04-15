package com.portal.tools;

import javax.swing.*;
/**
 * @description: 打开浏览器
 * @author
 * @date: 2015年11月25日 下午1:31:10
 */
public class TestJPanel extends JPanel {
	/*private static final long serialVersionUID = 1L;
	// 行分隔符
	final static public String LS = System.getProperty("line.separator", "/n");
	// 文件分割符
	final static public String FS = System.getProperty("file.separator", "//");
	//以javascript脚本获得网页全屏后大小
	final static StringBuffer jsDimension;
	static {
		jsDimension = new StringBuffer();
		jsDimension.append("var width = 0;").append(LS);
		jsDimension.append("var height = 0;").append(LS);
		jsDimension.append("if(document.documentElement) {").append(LS);
		jsDimension
				.append(
						"  width = Math.max(width, document.documentElement.scrollWidth);")
				.append(LS);
		jsDimension
				.append(
						"  height = Math.max(height, document.documentElement.scrollHeight);")
				.append(LS);
		jsDimension.append("}").append(LS);
		jsDimension.append("if(self.innerWidth) {").append(LS);
		jsDimension.append("  width = Math.max(width, self.innerWidth);")
				.append(LS);
		jsDimension.append("  height = Math.max(height, self.innerHeight);")
				.append(LS);
		jsDimension.append("}").append(LS);
		jsDimension.append("if(document.body.scrollWidth) {").append(LS);
		jsDimension.append(
				"  width = Math.max(width, document.body.scrollWidth);")
				.append(LS);
		jsDimension.append(
				"  height = Math.max(height, document.body.scrollHeight);")
				.append(LS);
		jsDimension.append("}").append(LS);
		//jsDimension.append("if(document.readyState==\"complete\"){").append(LS);
		//jsDimension.append("alert(\"当前页面已加载完成！\");").append(LS);
		jsDimension.append("return width + ':' + height;").append(LS);
		//jsDimension.append("}").append(LS);
		
		System.out.println("----------jsDimension："+jsDimension.toString());
	}

	public TestJPanel(final String url, final int maxWidth, final int maxHeight) {
		super(new BorderLayout());
		JPanel webBrowserPanel = new JPanel(new BorderLayout());
		final JWebBrowser webBrowser = new JWebBrowser(null);
		webBrowser.setBarsVisible(false);
		webBrowser.navigate(url);
		webBrowserPanel.add(webBrowser, BorderLayout.CENTER);
		add(webBrowserPanel, BorderLayout.CENTER);
		
		JPanel panel = new JPanel(new FlowLayout(FlowLayout.CENTER, 4, 4));
		webBrowser.addWebBrowserListener(new WebBrowserAdapter() {
			// 监听加载进度
			public void loadingProgressChanged(WebBrowserEvent e) {
				// 当加载完毕时
				System.out.println("---------e.getWebBrowser().getLoadingProgress():"+e.getWebBrowser().getLoadingProgress());
				if (e.getWebBrowser().getLoadingProgress() == 100) {
					try {
					String html = webBrowser.getHTMLContent();
					//System.out.println("-----------------页面代码："+html);
					// 具体的秒数需要根据网速等调整   
					//Thread.sleep(2* 1000);
					//执行JS
					String result = (String) webBrowser.executeJavascriptWithResult(jsDimension.toString());
					int index = result == null ? -1 : result.indexOf(":");
					NativeComponent nativeComponent = webBrowser.getNativeComponent();
					
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				}
			}
		}

		);
		add(panel, BorderLayout.SOUTH);

	}

	public static void init(String host, int port, final String username, final String password) {
		  System.setProperty("http.proxyType", "4");
		  System.setProperty("http.proxyPort", Integer.toString(port));
		  System.setProperty("http.proxyHost", host);
		  System.setProperty("http.proxySet", "true");
	 }
	 
	public static void main(String[] args) {
		  //init(proxy, port, username, password);
		System.out.println("---------------start----------");
		NativeInterface.open();
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				for(int i =0;i < 100;i ++){
					// SWT组件转Swing组件，不初始化父窗体将无法启动webBrowser
					JFrame frame = new JFrame("DJ_"+i);
					frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); //禁用close功能
					String url = "";
					UUID uuid = UUID.randomUUID();
					url = "http://192.168.64.12:8080/pushlet/chat.html?nick=chen_"+i;
					Dimension d = Toolkit.getDefaultToolkit().getScreenSize();
					TestJPanel test = new TestJPanel (url, 1024,768);
					frame.getContentPane().add(test, BorderLayout.CENTER);
					// 仅初始化，但不显示
					//frame.invalidate();
					frame.pack();
					frame.setVisible(true);//设置是否可见
					frame.setSize(800, 600);
					//frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
					System.out.println("---------------end----------");
				}
			}
		});
		NativeInterface.runEventPump();
	}*/

}
