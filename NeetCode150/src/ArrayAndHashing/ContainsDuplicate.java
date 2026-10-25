package ArrayAndHashing;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class ContainsDuplicate {

    public static boolean hasDuplicate(int[] nums) {

        Set<Integer> set = new HashSet<>();

        for(int num : nums) {

            if(!set.add(num)){
                return true;
            }

        }

        return false;
    }

    public static void main(String[] args) {

        System.out.println(hasDuplicate(new int[]{1, 2, 3, 0}));

    }
}
