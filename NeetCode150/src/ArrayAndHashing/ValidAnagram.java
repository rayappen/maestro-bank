package ArrayAndHashing;

import java.util.HashSet;
import java.util.Set;

public class ValidAnagram {

    public static boolean isAnagramFinal(String s, String t) {

        if(s.length() != t.length())
            return false;

        int[] freq = new int[26];
        for(int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for(int num : freq) {
            if(num != 0)
                return false;

        }

        return true;
    }

    public static boolean isAnagramTest(String s, String t) {

        if(s.length() != t.length())
            return false;

        Set<Character> set = new HashSet<>();

        for(int i = 0; i < s.length(); i++) {
            set.add(s.charAt(i));
            set.remove(t.charAt(i));
        }

        System.out.println(set);
        return set.isEmpty();
    }

    public static boolean isAnagram(String s, String t) {

        if(s.length() != t.length())
            return false;

        Set<Character> set = new HashSet<>();

        for(char ch : s.toCharArray()) {
            set.add(ch);
        }

        for(char ch : t.toCharArray()) {
            set.remove(ch);
        }

        return set.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isAnagramTest("racecar", "carrace"));
    }

}
