package ArrayAndHashing;

import java.util.HashMap;
import java.util.Map;

public class TwoSum {

    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < nums.length; i++) {
            int remainder = target - nums[i];
            if(map.containsKey(remainder)){
                return new int[]{map.get(remainder), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {

        int[] nums = {1,2,3,4,5};
        int target = 9;
        int[] result = twoSum(nums, target);

        for(int num : result) {
            System.out.print(num + " ");
        }
    }

}
