package com.jy.modules.common;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.MessageDigest;



/**
 * 
 * @author chengang
 *
 */
public final class Encoder {

    private static MessageDigest md5 = null ;

    protected static final byte[] encodingTable ={
            (byte)'0', (byte)'1', (byte)'2', (byte)'3', (byte)'4', (byte)'5', (byte)'6', (byte)'7',
            (byte)'8', (byte)'9', (byte)'a', (byte)'b', (byte)'c', (byte)'d', (byte)'e', (byte)'f'
        };

    protected static final byte[] decodingTable = new byte[128];

    static
    {
        for (int i = 0; i < encodingTable.length; i++)
        {
            decodingTable[encodingTable[i]] = (byte)i;
        }

        decodingTable['A'] = decodingTable['a'];
        decodingTable['B'] = decodingTable['b'];
        decodingTable['C'] = decodingTable['c'];
        decodingTable['D'] = decodingTable['d'];
        decodingTable['E'] = decodingTable['e'];
        decodingTable['F'] = decodingTable['f'];

        try
        {
            md5 = MessageDigest.getInstance("MD5");
        }catch(java.security.NoSuchAlgorithmException ex_){
        }
    }

    public static int encode(
        byte[]                data,
        int                    off,
        int                    length,
        OutputStream    out)
        throws IOException
    {
        for (int i = off; i < (off + length); i++)
        {
            int    v = data[i] & 0xff;

            out.write(encodingTable[(v >>> 4)]);
            out.write(encodingTable[v & 0xf]);
        }

        return length * 2;
    }
    /**
     * 对二进制编码成16进制字串.
     * @param b
     * @return
     */
    public static String toHexString( byte []b  )
    {
        if ( b==null || b.length==0 )
            return "" ;
        try
        {
            ByteArrayOutputStream aout = new ByteArrayOutputStream( 512 ) ;
            encode(b,0,b.length,aout) ;

            String rtn = new String(aout.toByteArray()).toUpperCase() ;

            aout.close();
            return rtn ;
        }
        catch(Exception ex)
        {
            return "" ;
        }
    }
    /**
     *
     * @param data
     * @param out
     * @return
     * @throws IOException
     */
    public static int decode( String data, OutputStream out) throws IOException
    {
        byte b1, b2 ;
        int  length = 0;
        int  end = data.length();

        while (end > 0)
        {
            if (!ignore(data.charAt(end - 1)))
            {
                break;
            }

            end--;
        }

        int i = 0;
        while (i < end)
        {
            while (i < end && ignore(data.charAt(i)))
            {
                i++;
            }

            b1 = decodingTable[data.charAt(i++)];

            while (i < end && ignore(data.charAt(i)))
            {
                i++;
            }

            b2 = decodingTable[data.charAt(i++)];

            out.write((b1 << 4) | b2);

            length++;
        }

        return length;
    }
    /**
     * 对16进制字串转成二进制数组.
     * @param hexStr
     * @return
     */
    public static byte[] hexToBytes( String hexStr  ){
        if ( hexStr==null || hexStr.length()==0 )
            return new byte[0] ;
        try
        {
            ByteArrayOutputStream aout = new ByteArrayOutputStream( 512 ) ;
            decode( hexStr,aout) ;
            aout.flush();
            return aout.toByteArray() ;
        }catch(Exception ex){
            return new byte[0] ;
        }
    }

    private static boolean ignore(char    c){
        return (c == '\n' || c =='\r' || c == '\t' || c == ' ');
    }
    /**
     * 做MD5杂凑.
     * @param text String
     * @return
     */
    public static String md5Encode(String text){
        if ( text==null )
            return null ;
        try{
            byte[] result = md5.digest( text.getBytes("UTF8") ) ;
            return toHexString(result) ;
        }
        catch(Exception ex_){
            return "" ;
        }
    }
    /**
     * 做MD5杂凑.
     * @param input byte[]
     * @return
     */
    public static byte[] md5Encode( byte[] input ){
        if ( input==null )
            return null ;
        if ( md5==null ){
            throw new RuntimeException(  );
        }

        return md5.digest( input ) ;
    }
}
