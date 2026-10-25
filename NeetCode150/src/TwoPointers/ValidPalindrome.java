package TwoPointers;

public class ValidPalindrome {

    public static boolean isPalindromeDup(String s) {

        int i = 0;
        int j = s.length() - 1;
        s = s.toLowerCase();

        while (i < j) {
            char left = s.charAt(i);
            char right = s.charAt(j);

            if (!((left >= 'a' && left <= 'z') || (left >= '0' && left <= '9'))) {
                i++;
                continue;
            }

            if (!((right >= 'a' && right <= 'z') || (right >= '0' && right <= '9'))) {
                j--;
                continue;
            }

            if (left != right) {
                return false;
            }

            i++;
            j--;
        }

        return true;
    }

    public static boolean isPalindromeTest(String s) {

        int i = 0;
        int j = s.length() - 1;

        while (i < j) {
            char left = s.charAt(i);
            char right = s.charAt(j);

            if (!((left >= 'a' && left <= 'z') || (left >= 'A' && left <= 'Z') || (left >= '0' && left <= '9'))) {
                i++;
                continue;
            }

            if (left >= 'A' && left <= 'Z'){
                left += 32;
            }

            if (!((right >= 'a' && right <= 'z') || (right >= 'A' && right <= 'Z') || (right >= '0' && right <= '9'))) {
                j--;
                continue;
            }

            if (right >= 'A' && right <= 'Z') {
                right += 32;
            }

            if (left != right) {
                return false;
            }

            i++;
            j--;
        }

        return true;
    }

    public static boolean isPalindrome(String s) {
        int l = 0;
        int r = s.length() - 1;
        s = s.toLowerCase();
        while (l < r) {
            while (l < r && isNonAlphaNumeric(s.charAt(l))) {
                l++;
            }
            while (r > l && isNonAlphaNumeric(s.charAt(r))) {
                r--;
            }
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }

    public static boolean isNonAlphaNumeric(char c) {
        return (c < 'a' || c > 'z') && (c < '0' || c > '9');
    }

    public static void main(String[] args) {

        String s = "0P";
        System.out.println(isPalindrome(s));

    }

}
