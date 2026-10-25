package ArrayAndHashing;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LongestConsecutiveSequence {

    public static int longestConsecutive(int[] nums) {

        if (nums.length == 0) {
            return 0;
        }

        Set<Integer> set = new HashSet<>();
        Map<Integer, Set<Integer>> map = new HashMap<>();

        for (int num : nums) {
            set.add(num);
        }

        int max = 1;
        for (int num : set) {
            int tempMax = 1;
            int target = num + 1;
            if(!set.contains(num - 1)) {
                while(set.contains(target)){
                    tempMax++;
                    target++;
                }
            }
            max = Integer.max(max, tempMax);
        }

        return max;
    }

    public static void main(String[] args) {

        int[] nums = {2,20,4,10,3,4,5};
        System.out.println(longestConsecutive(nums));
    }
}
