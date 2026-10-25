package ArrayAndHashing;

import java.util.*;

public class GroupAnagrams {

    public static List<List<String>> groupAnagrams(String[] strs) {

        List<List<String>> list = new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();

        for(String str : strs) {

            int[] freq = new int[26];
            for(char ch : str.toCharArray()) {
                freq[ch - 'a']++;
            }

            char[] charArray = new char[str.length()];
            int charidx = 0;
            for(int i = 0; i < freq.length; i++) {
                while(freq[i] > 0){
                    charArray[charidx++] = (char) ('a' + i);
                    freq[i]--;
                }
            }

            String st = new String(charArray);
            map.computeIfAbsent(st, key -> new ArrayList<>()).add(str);
        }

        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {

        String[] strList = {"act","pots","tops","cat","stop","hat"};
        System.out.println(groupAnagrams(strList));

    }

}
