package ArrayAndHashing;

public class ProductsOfArrayExceptSelf {

    public static int[] productExceptSelf(int[] nums) {

        if(nums.length <= 1)
            return nums;

        int len = nums.length;
        int[] result = new int[len];

        result[0] = 1;
        int prefix = 1;
        for(int i = 1; i < len; i++) {
            prefix *= nums[i - 1];
            result[i] = prefix;
        }

        for(int num : result)
            System.out.print(num + " ");

        int suffix = 1;
        for(int j = len - 1; j >= 0; j--){
            result[j] *= suffix;
            suffix *= nums[j];
        }

        return result;
    }

    public static void main(String[] args) {

        int[] nums = {1,2,4,6};
        for(int num : productExceptSelf(nums)){
//            System.out.print(num + " ");
        }

    }
}
