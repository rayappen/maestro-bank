package ArrayAndHashing;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class EncodeAndDecode {

    public static String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for(String str : strs) {
            sb.append(str.length());
            sb.append("#");
            sb.append(str);
        }
        return sb.toString();
    }

    public static List<String> decode(String str) {

        List<String> decode = new ArrayList<>();
        for(int i = 0; i < str.length(); i++) {
            StringBuilder strLen = new StringBuilder();
            while(str.charAt(i) != '#') {
                strLen.append(str.charAt(i++));
            }
            int len = Integer.parseInt(strLen.toString());
            decode.add(str.substring(++i, i + len));
            i += len - 1;
        }

        return decode;
    }

    public static void main(String[] args) {

        List<String> str = Arrays.asList("we","say",":","yes","!@#$%^&*()");
        String st = encode(str);
        System.out.println("Encode: " + st);
        System.out.println(st.charAt(0));
        System.out.println(decode(st));

    }
}
