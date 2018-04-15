package com.portal.tools;

import com.fintech.platform.tools.pwdhash.util.RC4;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			System.out.println(RC4.decrypt("111111aA", "qhcjr01234567890"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
