package ArrayAndHashing;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TopKFrequentElements {

    public static int[] topKFrequent(int[] nums, int k) {

        Map<Integer, Integer> map = new HashMap<>();
        List<Integer>[] bucket = new ArrayList[nums.length + 1];
        int[] result = new int[k];
        int max = 0;

        for(int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
            max = Integer.max(max, map.get(num));
        }

        for(Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if(bucket[entry.getValue()] == null) {
                bucket[entry.getValue()] = new ArrayList<>();
            }

            bucket[entry.getValue()].add(entry.getKey());
        }

        int counter = 0;
        for(int i = max; i >= 0; i--){

            if(counter == k)
                break;

            if(null != bucket[i]) {
                for(int j = 0; j < bucket[i].size(); j++) {
                    result[counter] = bucket[i].get(j);
                    counter++;
                }
            }
        }


        return result;
    }

    public static void main(String[] args) {

        int[] nums = {3,3,3,1,2,2,2};
        int k = 2;

        int[] result = topKFrequent(nums, k);

        for(int num : result) {
            System.out.print(num + " ");
        }

    }

}
